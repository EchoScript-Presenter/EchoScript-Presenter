# uvicorn main:app --reload
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

# CORS 미들웨어 설정 - 브라우저 보안 정책 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/start_recording")
async def start_recording():
    global feature_process  # 전역 변수 사용

    # start_recording 함수 호출 시 feature.py를 백에서 실행
    feature_process = subprocess.Popen(["python", "-m", "feature"])
    return {"message": "Recording started successfully!"}

@app.post("/stop_recording")
async def stop_recording():
    global feature_process  

    if feature_process:
        feature_process.terminate()
        feature_process = None
    return {"message": "Recording stopped successfully!"}
