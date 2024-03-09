import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import speakerIcon from './speaker.png';
import axios from 'axios';
import { PitchDetector } from 'pitchy';


const normalize = (value, minOriginal, maxOriginal, minNew = 0, maxNew = 100) => {
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
  console.log(data);

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
    } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
    const interval = setInterval(fetchData, 1000); 

    return () => clearInterval(interval); 
  }, []); 

  useEffect(() => {
    const adjustInterval = setInterval(() => {
      setSpeed(s => s !== 0 ? Math.max(s + Math.floor(Math.random() * 5) - 2, 0) : 0);
      setPitch(p => p !== 0 ? Math.max(p + Math.floor(Math.random() * 5) - 2, 0) : 0);
    }, 500);

    return () => clearInterval(adjustInterval);
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
        let normalizedVolume = normalize(average, 0, 128, 0, 100); 
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
    const isoString = new Date().toISOString();

    const timestamp = isoString
      .replace(/T/, ' ') // 'T'를 공백으로 대체
      .replace(/\..+/, ''); // 초 뒤의 소수점 부분을 제거

    const feedbackData = {
      timestamp: timestamp, 
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


  const getSpeedText = (speed, volume) => {
    console.log('Speed:', speed, 'Volume:', volume);
    if (speed === 0 || isNaN(speed)) return '💬';
    if (speed > 85) return 'SLOWER';
    if (speed < 15) return 'FASTER';
    return '👍';
  };
  
  const getVolumeText = (volume) => {
    if (volume < 5) return '💬';
    if (volume > 100) return 'SOFTER';
    if (volume > 10 && volume < 20) return 'LOUDER';
    return '👍';
  };
  
  const getPitchText = (pitch, volume) => {
    console.log('pitch:', pitch, 'Volume:', volume);
    if (pitch === 0 || isNaN(pitch) || pitch < 50) return '💬';
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
