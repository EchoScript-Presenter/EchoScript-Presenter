# uvicorn main:app --reload
# python -m uvicorn main:app --reload
#npm install react-scripts --save

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import speech_recognition as sr
from typing import Optional
import parselmouth
from parselmouth.praat import call
import time
import json
from pydub import AudioSegment
import threading
import datetime
import os
import pyaudio
import wave


is_recording = False  # 녹음 상태를 관리하는 변수
recording_thread = None  # 녹음을 처리하는 스레드

participant_name = "eunseo"

def speech_analyze_log_to_json_file(data):
    file_name = f"/Users/yang-eunseo/Desktop/이화-석사/UIST/analysis_log/speech_analysis_log_{participant_name}.json"
    with open(file_name, "a", encoding='utf8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4) 
        file.write('\n')

def speech_feedback_log_to_json_file(data):
    file_name = f"/Users/yang-eunseo/Desktop/이화-석사/UIST/analysis_log/feedback_analysis_log_{participant_name}.json"
    with open(file_name, "a", encoding='utf8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4) 
        file.write('\n')

def save_scroll_data_to_file(scroll_data): ##????????왜 스크롤 저장 안돼
    with open('./scroll_log_.txt', 'a') as file:
        file.write(str(scroll_data) + '\n')

def measurePitch(sound, f0min=75, f0max=500, unit="Hertz"): 
    pitch = call(sound, "To Pitch", 0.0, f0min, f0max)
    meanF0 = call(pitch, "Get mean", 0, 0, unit)
    meanF0 = round(meanF0,2)
    return meanF0

def measureIntensity(sound, minPitch=75.0, timeStep=0.0, dB=True): 
    intensity = call(sound, 'To Intensity', minPitch, timeStep, dB)
    mean_intensity = call(intensity, "Get mean", 0, 0)
    mean_intensity = round(mean_intensity,2)
    return mean_intensity

def calculate_speed(text, duration_seconds):
    words = len(text.split())
    syllables = sum(1 for char in text if char.lower() in 'aeiou')
    speech_rate_words_per_minute = round((words / duration_seconds) * 60,2)
    speech_rate_syllables_per_minute = round((syllables / duration_seconds) * 60,2)
    return speech_rate_words_per_minute, speech_rate_syllables_per_minute

def calculate_pitch_intensity(wav_file):
    sound = parselmouth.Sound(wav_file)
    meanF0 = measurePitch(sound, 75, 500, "Hertz")
    mean_intensity = measureIntensity(sound, 75.0, 0.0, True)
    mean_intensity = round(mean_intensity,2)
    return meanF0, mean_intensity

def recognize_speech_from_mic(recognizer, microphone, audio_file_path="./temp.wav"):
    if not isinstance(recognizer, sr.Recognizer) or not isinstance(microphone, sr.Microphone):
        raise TypeError("Invalid types for `recognizer` or `microphone`")
    print("연결 안되는 중....")
    with microphone as source:
        print("연결중....")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
    with open(audio_file_path, "wb") as f:
        f.write(audio.get_wav_data())
    response = {"success": True, "error": None, "transcription": None}
    try:
        response["transcription"] = recognizer.recognize_google(audio)
    except sr.RequestError:
        response["success"] = False
        response["error"] = "API unavailable"
    except sr.UnknownValueError:
        response["error"] = "Unable to recognize speech"
    return response, audio_file_path

def recognize_and_analyze():
    global is_recording, intensity_values, pitch_values, speech_rate_syllables_per_minute, speech_rate_words_per_minute
    count = 1
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()

    instructions = "대본을 말해보세요:"
    print(instructions)

    while is_recording:
        start_time = time.time()
        count += 1

        guess, audio_file_path = recognize_speech_from_mic(recognizer, microphone)

        if guess["success"] and guess["transcription"] is not None:  # transcription이 None이 아닌지 추가 확인
            print("대본: {}".format(guess["transcription"]))

            end_time = time.time() - start_time
            print("소요 시간: {} 초".format(end_time))

            speech_rate_words_per_minute, speech_rate_syllables_per_minute = calculate_speed(guess["transcription"], end_time)
            print(f"Speech Rate (Words/Minute): {speech_rate_words_per_minute:.2f}")
            print(f"Speech Rate (Syllables/Minute): {speech_rate_syllables_per_minute:.2f}")
            
            audio = AudioSegment.from_file(audio_file_path)
            audio_duration = audio.duration_seconds
            print("Audio_duration for temp.wav:", audio_duration)
            pitch_values, intensity_values = calculate_pitch_intensity(audio_file_path)
            print(f"Pitch = {pitch_values:.2f} Hz, Intensity = {intensity_values:.2f} dB\n\n")

            log_data = {
                "timestamp": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
                "transcription": guess.get("transcription", ""),
                "speech_rate": {
                    "words_per_minute": speech_rate_words_per_minute,
                    "syllables_per_minute": speech_rate_syllables_per_minute,
                    "pitch": pitch_values,
                    "intensity": intensity_values,
                }
            }

            speech_analyze_log_to_json_file(log_data)

        else:
            # 대본 인식 실패 시 모든 값을 0으로 처리
            print("오류: {}".format(guess["error"]))
            intensity_values = 0
            pitch_values = 0
            speech_rate_words_per_minute = 0
            speech_rate_syllables_per_minute = 0

            # 로깅 함수 호출로 로그 파일에 기록
            log_data = {
                "timestamp": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
                "transcription": guess.get("transcription", ""),
                "speech_rate": {
                    "words_per_minute": speech_rate_words_per_minute,
                    "syllables_per_minute": speech_rate_syllables_per_minute,
                    "pitch": pitch_values,
                    "intensity": intensity_values,
                }
            }
            speech_analyze_log_to_json_file(log_data)


def record_audio(filename, duration):
    chunk = 1024  
    format = pyaudio.paInt16  
    channels = 1  
    rate = 44100  
    
    p = pyaudio.PyAudio()
    
    stream = p.open(format=format,
                    channels=channels,
                    rate=rate,
                    input=True,
                    frames_per_buffer=chunk)

    print("* recording")

    frames = []
    recorded_frames = 0
    while recorded_frames < rate * duration:
        data = stream.read(chunk)
        frames.append(data)
        recorded_frames += len(data)

    print("* done recording")

    stream.stop_stream()
    stream.close()
    p.terminate()

    wf = wave.open(filename, 'wb')
    wf.setnchannels(channels)
    wf.setsampwidth(p.get_sample_size(format))
    wf.setframerate(rate)
    wf.writeframes(b''.join(frames))
    wf.close()

def calculate_pitch(filename):
    sound = parselmouth.Sound(filename)
    pitch = sound.to_pitch()
    pitch_values = pitch.selected_array['frequency']
    mean_pitch = sum(pitch_values) / len(pitch_values)
    return mean_pitch

def main():
    while True:
        record_audio("./temp2.wav", 5)
        pitch = calculate_pitch("./temp2.wav")
        print(f"Detected Pitch: {pitch:.2f} Hz")
        time.sleep(5)

# 전역 변수 초기화
intensity_values = None
pitch_values = None
pitch = 0
