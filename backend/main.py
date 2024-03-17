# uvicorn main:app --reload
# python -m uvicorn main:app --reload

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


app = FastAPI()

class Position(BaseModel):
    x: int
    y: int

is_recording = False  # 녹음 상태를 관리하는 변수
recording_thread = None  # 녹음을 처리하는 스레드

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

participant_name = "eunseo"

def speech_analyze_log_to_json_file(data):
    file_name = f"/Users/yang-eunseo/Desktop/이화-석사/UIST/analysis_log/{participant_name}_ppt_speech_analysis_log.json"
    with open(file_name, "a", encoding='utf8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4) 
        file.write('\n')

def speech_feedback_log_to_json_file(data):
    file_name = f"/Users/yang-eunseo/Desktop/이화-석사/UIST/analysis_log/{participant_name}_ppt_feedback_analysis_log.json"
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

# 전역 변수 초기화
intensity_values = None
pitch_values = None
speech_rate_syllables_per_minute = None
speech_rate_words_per_minute = None
pause_true = False

@app.post("/start_recording")
async def start_recording():
    global is_recording, recording_thread
    if not is_recording:
        is_recording = True
        recording_thread = threading.Thread(target=recognize_and_analyze)
        recording_thread.start()
        return {"message": "Recording started successfully!"}
    else:
        return {"message": "Recording is already in progress."}

@app.post("/stop_recording")
async def stop_recording():
    global is_recording
    if is_recording:
        is_recording = False
        recording_thread.join()  # 스레드가 완료될 때까지 기다림
        return {"message": "Recording stopped successfully!"}
    else:
        return {"message": "Recording is not in progress."}

@app.get("/data_pitch")
async def get_pitch():
    global pitch_values, is_recording
    if not is_recording:
        return {"error": "Recording has stopped. No current data available."}
    return {"pitch": pitch_values}

@app.get("/data_speed")
async def get_speed():
    global speech_rate_words_per_minute, is_recording
    if not is_recording:
        return {"error": "Recording has stopped. No current data available."}
    return {"speed": speech_rate_words_per_minute}

@app.post("/api/scroll-event")
async def receive_scroll_event(scroll_data: dict):
    print(f"Received scroll data: {scroll_data}")
    save_scroll_data_to_file(scroll_data)
    return {"message": "Scroll event received"}

@app.post("/data_feedback")
async def receive_feedback(feedback: dict):
    print(f"Received feedback data: {feedback}")
    speech_feedback_log_to_json_file(feedback)  
    return {"message": "Feedback data received"}
