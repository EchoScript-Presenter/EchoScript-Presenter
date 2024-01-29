from __future__ import division
import asyncio
import websockets
import json
import pyaudio
from google.cloud import speech

FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000
CHUNK = int(RATE / 10)

audio = pyaudio.PyAudio()

stream = audio.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)


async def microphone_client():
    async with websockets.connect(
            'ws://127.0.0.1:8000/') as websocket:
        await websocket.send(json.dumps({
            "rate": RATE,
            "format": speech.RecognitionConfig.AudioEncoding.LINEAR16,
            "language": 'ko-KR'
        }))
        while True:
            data = stream.read(CHUNK)
            await websocket.send(data)


asyncio.get_event_loop().run_until_complete(microphone_client())
