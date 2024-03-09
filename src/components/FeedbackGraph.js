import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import speakerIcon from './speaker.png';
import axios from 'axios';
import { PitchDetector } from 'pitchy';


const normalize = (value, minOriginal, maxOriginal, minNew = 0, maxNew = 300) => {
  return ((value - minOriginal) / (maxOriginal - minOriginal)) * (maxNew - minNew) + minNew;
};

function FeedbackGraph() {
  const [volume, setVolume] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [speed, setSpeed] = useState(0);

  const data = [
    { name: 'Volume', value: volume },
    { name: 'Pitch', value: pitch },
    { name: 'Speed', value: speed },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePitch = await axios.get('http://localhost:8000/data_pitch');
        const responseSpeed = await axios.get('http://localhost:8000/data_speed');

      console.log('Pitch:', responsePitch.data); // 데이터 설정 전 로깅
      setPitch(responsePitch.data.pitch);
      console.log('Speed:', responseSpeed.data); // 데이터 설정 전 로깅
      setSpeed(responseSpeed.data.speed);
      const normalizedPitch = normalize(responsePitch.data.pitch, 0, 400);
      const normalizedSpeed = normalize(responseSpeed.data.speed, 0, 100);

      console.log('Pitch:', normalizedPitch); // 데이터 설정 전 로깅
      setPitch(normalizedPitch);
      console.log('Speed:', normalizedSpeed); // 데이터 설정 전 로깅
      setSpeed(normalizedSpeed);
    } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
    const interval = setInterval(fetchData, 1000); 

    return () => clearInterval(interval); 
  }, []); 

/// [Volume data js에서 받아오기]
useEffect(() => {
  const setupMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
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
        for(let i = 0; i < bufferLength; i++) {
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

  useEffect(() => {
    const feedbackData = {
      timestamp: new Date().toISOString(),
      speedText: getSpeedText(speed),
      volumeText: getVolumeText(volume),
      pitchText: getPitchText(pitch),
    };
    sendFeedbackToServer(feedbackData);
  }, [speed, volume, pitch]); // 속도, 볼륨, 피치가 변경될 때마다 트리거됨

  const sendFeedbackToServer = async (feedbackData) => {
    try {
      await axios.post('http://localhost:8000/data_feedback', feedbackData);
      console.log('Feedback sent successfully');
    } catch (error) {
      console.error('Error sending feedback to server:', error);
    }
  };

  // 내일 테스트해보고 volume도 문장 단위로 받을지 체크해보기 (너무 번잡스러움)
  const getSpeedText = (speed, volume) => {
    console.log('Speed:', speed, 'Volume:', volume);
    if (speed === 0 || isNaN(speed)) return '💬';
    if (speed > 250) return 'SLOWER';
    if (speed < 100) return 'FASTER';
    return '👍';
  };
  
  const getVolumeText = (volume) => {
    if (volume < 50) return '💬';
    if (volume > 220) return 'SOFTER';
    if (volume > 0 && volume < 80) return 'LOUDER';
    return '👍';
  };
  
  const getPitchText = (pitch, volume) => {
    console.log('pitch:', pitch, 'Volume:', volume);
    if (pitch === 0 || isNaN(pitch) || pitch < 20) return '💬';
    if (pitch >= 180 && pitch <= 350) return '👍';
    if (pitch > 300) return 'MONOTONE'
    return '👍';
  };
  
  const textStyle = (content) => {
    let style = { fontWeight: 'normal', color: 'black' };
  
    if (['GOOD'].includes(content)) {
      style.fontWeight = 'normal';
      style.color = 'green'
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
    marginTop:'0',
  };

  const labelStyle = {
    textAlign: 'center',
    marginTop: '5px',
    fontWeight: 'bold'
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
      <h2 style={{ marginBottom: '10px', marginTop: '0px', textAlign: 'left', marginLeft: '20px' }}>Real-time Feedback</h2>
      <div style={wrapperStyle}>
        <div style={feedbackRowStyle}>
          <div>
            <div style={boxStyle}>
              <span style={textStyle(getSpeedText(speed, volume))}>{getSpeedText(speed, volume)}</span>
            </div>
            <div style={labelStyle}>Speed</div>
          </div>
          <div>
            <div style={boxStyle}>
              <span style={textStyle(getVolumeText(volume))}>{getVolumeText(volume)}</span>
            </div>
            <div style={labelStyle}>Volume</div>
          </div>
          <div>
            <div style={boxStyle}>
              <span style={textStyle(getPitchText(pitch, volume))}>{getPitchText(pitch, volume)}</span>
            </div>
            <div style={labelStyle}>Pitch</div>
          </div>
        </div>
      </div>
    </>
  );
};


export default FeedbackGraph;