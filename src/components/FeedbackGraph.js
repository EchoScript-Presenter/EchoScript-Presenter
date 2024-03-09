import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from 'recharts';
import { useSpeech } from './SpeechContext'; //speed js단에서 받아온 final transcript로 해결하기
import speakerIcon from './speaker.png';
import axios from 'axios';
import { PitchDetector } from 'pitchy';

const normalize = (
  value,
  minOriginal,
  maxOriginal,
  minNew = 0,
  maxNew = 300
) => {
  return (
    ((value - minOriginal) / (maxOriginal - minOriginal)) * (maxNew - minNew) +
    minNew
  );
};

function FeedbackGraph() {
  const [volume, setVolume] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [filler, setFiller] = useState(false);
  const { speedValue } = useSpeech();

  const data = [
    { name: 'Volume', value: volume },
    { name: 'Pitch', value: pitch },
    { name: 'Speed', value: speed },
  ];
  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePitch = await axios.get(
          'http://localhost:8000/data_pitch'
        );
        //const responseSpeed = await axios.get('http://localhost:8000/data_speed');
        const responseFiller = await axios.get(
          'http://localhost:8000/data_filler'
        );

        const normalizedPitch = normalize(responsePitch.data.pitch, 0, 400);
        //const normalizedSpeed = normalize(responseSpeed.data.speed, 0, 100);

        console.log('Pitch:', normalizedPitch); // 데이터 설정 전 로깅
        setPitch(normalizedPitch);
        //console.log('Speed:', normalizedSpeed); // 데이터 설정 전 로깅
        //setSpeed(normalizedSpeed);

        const responseSpeed = await axios.get(
          'http://localhost:8000/data_speed'
        );
        //const responseFiller = await axios.get('http://localhost:8000/data_filler');
        //const responsePitch = await axios.get('http://localhost:8000/data_pitch');

        const normalizedSpeed = normalize(responseSpeed.data.speed, 0, 100);

        console.log('Speed:', normalizedSpeed); // 데이터 설정 전 로깅
        setSpeed(normalizedSpeed);

        console.log('Filler:', responseFiller.data); // 데이터 설정 전 로깅
        setFiller(responseFiller.data.filler);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const adjustInterval = setInterval(() => {
      setPitch((p) =>
        p !== 0 ? Math.max(p + Math.floor(Math.random() * 5) - 2, 0) : 0
      );
      //setSpeed(s => s !== 0 ? Math.max(s + Math.floor(Math.random() * 5) - 2, 0) : 0);
      setSpeed((s) =>
        s !== 0 ? Math.max(s + Math.floor(Math.random() * 5) - 2, 0) : 0
      );
    }, 500);

    return () => clearInterval(adjustInterval);
  }, []);

  /// [Volume data js에서 받아오기]
  useEffect(() => {
    const setupMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const getVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          let average = sum / bufferLength;
          let normalizedVolume = normalize(average, 0, 128, 0, 300); // 마이크 볼륨을 정규화
          setVolume(normalizedVolume);
        };

        const interval = setInterval(getVolume, 100);
        return () => {
          clearInterval(interval);
          audioContext.close();
        };
      } catch (error) {
        console.error('Error accessing the microphone', error);
      }
    };

    setupMicrophone();
  }, []);

  /// [Volume data js에서 받아오기]
  useEffect(() => {
    const setupMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const getVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          let average = sum / bufferLength;
          let normalizedVolume = normalize(average, 0, 128, 0, 300); // 마이크 볼륨을 0~70 사이로 정규화
          setVolume(normalizedVolume);
        };

        const interval = setInterval(getVolume, 100);
        return () => {
          clearInterval(interval);
          audioContext.close();
        };
      } catch (error) {
        console.error('Error accessing the microphone', error);
      }
    };
    setupMicrophone();
  }, []);

  // 피치 계산
  // 남자 기준, 여자 기준에 맞추는 normalization 필요
  // 진영 노트북 기준 큰 소리만 인식되는 상태인데 일단 Push 할게요
  // useEffect(() => {
  //   const updatePitch = async () => {
  //     try {
  //       const audioContext = new window.AudioContext();
  //       const analyserNode = audioContext.createAnalyser();
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         audio: true,
  //       });
  //       audioContext.createMediaStreamSource(stream).connect(analyserNode);
  //       const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
  //       detector.minVolumeDecibels = -15;
  //       const input = new Float32Array(detector.inputLength);
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         audio: true,
  //       });
  //       audioContext.createMediaStreamSource(stream).connect(analyserNode);
  //       const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
  //       //detector.minVolumeDecibels = -15;
  //       const input = new Float32Array(detector.inputLength);
  //       const getPitch = (analyserNode, detector, input, sampleRate) => {
  //         analyserNode.getFloatTimeDomainData(input);
  //         const [pitch, clarity] = detector.findPitch(input, sampleRate);
  //         // let normalizePitch = Math.round(pitch * 10) / 10 개발자분이 사용하던 정규화 식인데 일단 넣음
  //         setPitch(pitch);
  //       };

  //       getPitch(analyserNode, detector, input, audioContext.sampleRate);

  //       const interval = setInterval(() => {
  //         getPitch(analyserNode, detector, input, audioContext.sampleRate);
  //       }, 100);

  //       return () => clearInterval(interval);
  //     } catch (error) {
  //       console.error('Error accessing the microphone', error);
  //     }
  //   };

  //   updatePitch();
  // }, []);

  useEffect(() => {
    let hideTimer;
    if (filler) {
      hideTimer = setTimeout(() => {
        setFiller(false);
      }, 3000);
    }
    return () => clearTimeout(hideTimer);
  }, [filler]);

  const getSpeedText = (speed, volume) => {
    //console.log('Speed:', speed, 'Volume:', volume);
    //if (volume < 10) return 'SPEAK';
    if (speed === 0 || isNaN(speed)) return '💬';
    if (speed > 200) return 'SLOWER';
    if (speed < 70) return 'FASTER';
    return '👍';
  };

  const getVolumeText = (volume) => {
    if (volume < 20) return '💬';
    if (volume > 140) return 'SOFTER';
    if (volume > 0 && volume < 70) return 'LOUDER';
    return '👍';
  };

  const getPitchText = (pitch, volume) => {
    //console.log('pitch:', pitch, 'Volume:', volume);
    if (volume < 10) return '💬';
    if (pitch >= 180 && pitch <= 300) return '👍';
    return 'MONOTONE';
  };

  const textStyle = (content) => {
    let style = { fontWeight: 'normal', color: 'black' };

    if (['GOOD'].includes(content)) {
      style.fontWeight = 'normal';
      style.color = 'green';
    } else if (['...'].includes(content)) {
      style.fontWeight = 'normal';
    } else {
      style.fontWeight = 'bold';
      if (['LOUDER', 'FASTER', 'MONOTONE'].includes(content)) {
        style.color = 'red';
      } else if (['SOFTER', 'SLOWER'].includes(content)) {
        style.color = 'red';
      }
    }
    return style;
  };

  const boxStyle = {
    border: '2px solid #f8f9fa',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
    height: '50px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginTop: '0',
  };

  const labelStyle = {
    textAlign: 'center',
    marginTop: '5px',
    fontWeight: 'bold',
  };

  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  };

  // Feedback row style
  const feedbackRowStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    margin: '10px',
  };

  return (
    <>
      <h2
        style={{
          marginBottom: '10px',
          marginTop: '0px',
          textAlign: 'left',
          marginLeft: '20px',
        }}
      >
        Real-time Feedback
      </h2>
      <div style={wrapperStyle}>
        <div style={feedbackRowStyle}>
          <div>
            <div style={boxStyle}>
              <span style={textStyle(getSpeedText(speed, volume))}>
                {getSpeedText(speed, volume)}
              </span>
            </div>
            <div style={labelStyle}>Speed</div>
          </div>
          <div>
            <div style={boxStyle}>
              <span style={textStyle(getVolumeText(volume))}>
                {getVolumeText(volume)}
              </span>
            </div>
            <div style={labelStyle}>Volume</div>
          </div>
          <div>
            <div style={boxStyle}>
              <span style={textStyle(getPitchText(pitch, volume))}>
                {getPitchText(pitch, volume)}
              </span>
            </div>
            <div style={labelStyle}>Pitch</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackGraph;