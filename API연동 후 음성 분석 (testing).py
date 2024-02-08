import pyaudio
import queue
import wave
import time
import re
import sys
from google.cloud import speech
import pyaudio
import parselmouth
from parselmouth.praat import call
import numpy as np

RATE = 16000
CHUNK = int(RATE / 10)

class MicrophoneStream:
    def __init__(self, rate=RATE, chunk=CHUNK, save_interval_seconds=5):
        self.rate = rate
        self.chunk = chunk
        self.buff = queue.Queue()
        self.closed = True
        self.filename = "recorded_audio.wav"
        self.current_buffer = b""
        self.current_duration = 0
        self.current_filename = None
        self.save_interval_seconds = save_interval_seconds

    def __enter__(self):
        self.audio_interface = pyaudio.PyAudio()
        self.audio_stream = self.audio_interface.open(
            format=pyaudio.paInt16,
            channels=1,
            rate=self.rate,
            input=True,
            frames_per_buffer=self.chunk,
            stream_callback=self.fill_buffer,
        )
        self.closed = False
        return self

    def __exit__(self, type, value, traceback):
        self.audio_stream.stop_stream()
        self.audio_stream.close()
        self.closed = True
        self.buff.put(None)
        self.audio_interface.terminate()

    def fill_buffer(self, in_data, frame_count, time_info, status_flags):
        self.buff.put(in_data)
        return None, pyaudio.paContinue

    def generator(self):
        while not self.closed:
            chunk = self.buff.get()
            if chunk is None:
                return 
            self.current_buffer += chunk
            self.current_duration += len(chunk) / (2 * self.rate)  # 2는 샘플 크기(16비트)를 나타냄
            
            # 주어진 시간 간격이 지나거나 버퍼 크기가 일정 이상이면 파일에 저장
            if self.current_duration >= self.save_interval_seconds or len(self.current_buffer) >= self.chunk * 1000:
                self.save_buffer_to_file()
                self.current_buffer = b""
                self.current_duration = 0

            yield chunk

    def save_buffer_to_file(self):
        with wave.open(self.filename, 'wb') as wf:
            wf.setnchannels(1)
            wf.setsampwidth(self.audio_interface.get_sample_size(pyaudio.paInt16))
            wf.setframerate(self.rate)
            wf.writeframes(self.current_buffer)
            #print(f"Saved audio to {self.filename}")
            meanF0, stdevF0, mean_intensity = self.analyze_audio(self.filename)
            print("Mean Pitch:", round(meanF0, 2), ", Stdev Pitch:", round(stdevF0, 2), ", dB:", round(mean_intensity, 2))
            
    def analyze_audio(self, wav_file):
        sound = parselmouth.Sound(wav_file)
        pitch = call(sound, "To Pitch", 0.0, 100, 800) 
        meanF0 = call(pitch, "Get mean", 0, 0, "Hertz") 
        stdevF0 = call(pitch, "Get standard deviation", 0 ,0, "Hertz") 
        
        intensity = call(sound, 'To Intensity',75.0, 0.0, True)
        mean_intensity = call(intensity, "Get mean", 0, 0)
        return meanF0, stdevF0, mean_intensity
      

def check_filler_words(transcript):
    filler_words = ["um", "ah", "like", "you know", "well"]
    word_counts = {word: 0 for word in filler_words}

    for word in transcript.split():
        if word.lower() in filler_words:
            word_counts[word.lower()] += 1

    if any(count >= 3 for count in word_counts.values()):
        print("Too many filler words")

def listen_print_loop(responses, audio_generator):
    num_chars_printed = 0
    start_time = None  # 말을 시작한 시간
    duration = 0.0  # 문장의 duration
    audio_chunks = []  # 문장의 오디오 청크를 저장할 리스트

    for response in responses:
        if not response.results:
            continue

        result = response.results[0]
        if not result.alternatives:
            continue

        transcript = result.alternatives[0].transcript
        overwrite_chars = ' ' * (num_chars_printed - len(transcript))

        if not result.is_final:
            sys.stdout.write(transcript + overwrite_chars + '\r')
            sys.stdout.flush()
            num_chars_printed = len(transcript)
            if start_time is None:
                start_time = time.time()  # 말을 시작한 시간 기록
        else:
            print(transcript + overwrite_chars)
            if re.search(r'\b(이상입니다.|goodbye)\b', transcript, re.I):
                print('Exiting..')
                break
            num_chars_printed = 0
            check_filler_words(transcript)

            if start_time is not None:
                duration = time.time() - start_time
                print(f"Duration: {round(duration,2)} s")

                words = len(transcript.split())
                words_per_second = round((words / duration) * 60, 2)
                syllables = sum(1 for char in transcript if char.lower() in 'aeiou')
                speech_rate_syllables_per_second = round((syllables / duration) * 60, 2)
                if words_per_second:
                        print(f"Words per Second: {words_per_second} w/s, Syllables per Second: {speech_rate_syllables_per_second} s/s \n")

            start_time = None  # 다음 문장을 위해 초기화     
            print("\n")
            
def main():
    language_code = 'en-US'
    client = speech.SpeechClient()
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=RATE,
        language_code=language_code,
    )
    streaming_config = speech.StreamingRecognitionConfig(config=config, interim_results=True)

    with MicrophoneStream(RATE, CHUNK) as stream:
        audio_generator = stream.generator()
        requests = (speech.StreamingRecognizeRequest(audio_content=content) for content in audio_generator)
        responses = client.streaming_recognize(streaming_config, requests)
        listen_print_loop(responses, stream.generator())

if __name__ == "__main__":
    main()
