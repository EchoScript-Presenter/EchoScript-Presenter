# Speech-to-Text
음성 인식 모델 <br>
- Google Cloud Platform Speech-to-Text API


## 사용 전 준비 단계
Googel Cloud Platform API KEY 발급 <br>
이메일 권한 설정 -> 소유자

1 환경 변수 설정

    set GOOGLE_APPLICATION_CREDENTIALS={json 파일 경로}

2 Google Cloud SDK Tool 다운로드 - https://cloud.google.com/sdk?hl=ko

3 Google Cloud 계정 활성화

    gcloud init
    gcloud auth activate-service-account --key-file="{json 파일 경로}"

4 Requirement dependency

    sudo pip install --upgrade google-api-python-client
    pip install --upgrade google-cloud-storage
    pip install google-cloud-speech
    pip install pyaudio
   
