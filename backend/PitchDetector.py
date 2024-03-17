import pyaudio
import wave
import time
import parselmouth

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

if __name__ == "__main__":
    main()
