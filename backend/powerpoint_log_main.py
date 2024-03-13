# 기존 PowerPoint UI testing 할 main.py
# 실험 시작 시 Timestamp, 대본, Pitch, Intensity, Speed(혹시 모를)을 json으로 저장하게 됨
# 단, 정확한 Speed는 화면 녹화 후 타이머를 통해 수동으로 작업해서 json에 추가해야 함.

import os
import pandas as pd
from config import Config
import glob
from sklearn.preprocessing import minmax_scale
import sys
import json

import parselmouth
from parselmouth.praat import call
import numpy as np

from pydub import AudioSegment
import speech_recognition as sr
import librosa
import numpy as np
from decimal import Decimal, ROUND_HALF_UP
from scipy.fftpack import fft, ifft
from scipy.signal import find_peaks

import random
import time
import parselmouth
import pyaudio
import speech_recognition as sr


participant_name = "eunseo"

def speech_analyze_log_to_json_file(data):
    file_name = f"/Users/yang-eunseo/Desktop/이화-석사/UIST/analysis_log/powerpoint_speech_analysis_log_{participant_name}.json"
    with open(file_name, "a", encoding='utf8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4) 
        file.write('\n')


def measurePitch(wav_file, f0min, f0max, unit):
    sound = parselmouth.Sound(wav_file)
    pitch = call(sound, "To Pitch", 0.0, f0min, f0max) 
    meanF0 = call(pitch, "Get mean", 0, 0, unit) 
    stdevF0 = call(pitch, "Get standard deviation", 0 ,0, unit) 
    return meanF0, stdevF0

def measureIntensity(wav_file, minPitch, timeStep, dB):
    sound = parselmouth.Sound(wav_file)
    intensity = call(sound, 'To Intensity', minPitch, timeStep, dB)
    mean_intensity = call(intensity, "Get mean", 0, 0)
    return mean_intensity

def calculate_pitch_intensity(wav_file):
    sound = parselmouth.Sound(wav_file)
    (meanF0, stdevF0) = measurePitch(sound, 100, 800, "Hertz")
    (mean_intensity) = measureIntensity(sound,75.0, 0.0, True)
    return meanF0, mean_intensity

def calculate_speed(text, time):
    if text is not None:
        words = len(text.split())
        syllables = sum(1 for char in text if char.lower() in 'aeiou')
        speech_rate_words_per_second = round((words / time) * 60, 2)
        speech_rate_syllables_per_second = round((syllables / time) * 60, 2)
        return speech_rate_words_per_second, speech_rate_syllables_per_second

    else:
        return False, False 

def count_fillers(text, filler_words, threshold=5):
    if text is not None:
        lowercase_text = text.lower()
        return sum(lowercase_text.count(word) for word in filler_words)
    else:
        return 0

def recognize_speech_from_mic(recognizer, microphone, audio_file_path="./temp.wav"):
    
    if not isinstance(recognizer, sr.Recognizer):
        raise TypeError("`recognizer` must be `Recognizer` instance")
    if not isinstance(microphone, sr.Microphone):
        raise TypeError("`microphone` must be `Microphone` instance")
    with microphone as source:
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
        
        with open(audio_file_path, "wb") as f:
            f.write(audio.get_wav_data())

    response = {
        "success": True,
        "error": None,
        "transcription": None
    }
    try:
        response["transcription"] = recognizer.recognize_google(audio)
    except sr.RequestError:
        response["success"] = False
        response["error"] = "API unavailable"
    except sr.UnknownValueError:
        response["error"] = "Unable to recognize speech"
    return response, audio_file_path

if __name__ == "__main__":
    
    count = 1
    filler_words = ["like", "um", "uh", "you know","well"]
    
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()
    
    instructions = ("대본을 말해보세요:")
    print(instructions)

    try:
        while True:
            start_time = time.time()
            count = count + 1
            
            guess, audio_file_path = recognize_speech_from_mic(recognizer, microphone)

            if guess["success"]:
                print("대본: {}".format(guess["transcription"]))

                end_time = time.time() - start_time
                print("소요 시간: {} 초".format(end_time))

                filler_words_count = count_fillers(guess["transcription"], filler_words)
                if filler_words_count >= 5:
                    print("Too much filler words!")

                speech_rate_words_per_minute, speech_rate_syllables_per_minute = calculate_speed(guess["transcription"], end_time)
                if speech_rate_words_per_minute is not False:
                    print(f"Speech Rate (Words/Minute): {speech_rate_words_per_minute:.2f}")
                    print(f"Speech Rate (Syllables/Minute): {speech_rate_syllables_per_minute:.2f}")
                else:
                    print("No input text.")
                    
                audio = AudioSegment.from_file(audio_file_path)
                audio_duration = audio.duration_seconds
                print("Audio_duration for temp.wav:",audio_duration)
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
  

    except KeyboardInterrupt:
        print("\n프로그램을 종료합니다.")

    