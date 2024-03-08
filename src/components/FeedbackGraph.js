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
  const [filler, setFiller] = useState(false);

  const data = [
    { name: 'Volume', value: volume },
    { name: 'Pitch', value: pitch },
    { name: 'Speed', value: speed },
  ];
  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSpeed = await axios.get('http://localhost:8000/data_speed');
        const responseFiller = await axios.get('http://localhost:8000/data_filler');

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
    const interval = setInterval(fetchData, 1000); 

    return () => clearInterval(interval); 
  }, []); 

  useEffect(() => {
    const adjustInterval = setInterval(() => {
      setSpeed(s => s !== 0 ? Math.max(s + Math.floor(Math.random() * 5) - 2, 0) : 0);
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
  useEffect(() => {
  const updatePitch = async () => {
    try {
      const audioContext = new window.AudioContext();
      const analyserNode = audioContext.createAnalyser();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext.createMediaStreamSource(stream).connect(analyserNode);
      const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
      detector.minVolumeDecibels = -15;
      const input = new Float32Array(detector.inputLength);

      const getPitch = (analyserNode, detector, input, sampleRate) => {
        analyserNode.getFloatTimeDomainData(input);
        const [pitch, clarity] = detector.findPitch(input, sampleRate);
        // let normalizePitch = Math.round(pitch * 10) / 10 개발자분이 사용하던 정규화 식인데 일단 넣음
        setPitch(pitch);
      };

      getPitch(analyserNode, detector, input, audioContext.sampleRate);

      const interval = setInterval(() => {
        getPitch(analyserNode, detector, input, audioContext.sampleRate);
      }, 100);

      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error accessing the microphone', error);
    }
  };

  updatePitch();
}, []);
  

  useEffect(() => {
    let hideTimer;
    if (filler) {
      hideTimer = setTimeout(() => {
        setFiller(false);
      }, 3000);
    }
    return () => clearTimeout(hideTimer);
  }, [filler]);

  const barColor = (value) => {
    if (value <= 50) return 'red';
    else if (value <= 300) return 'green';
    else return 'red';
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '70%' }}>
      <div style={{ width: '85%', height: '100%' }}>
        <h2 style={{ width: '100%', marginLeft: '20px' }}>Real-time Feedback</h2>
        <ResponsiveContainer width="85%" height="80%">
          <BarChart
            layout="vertical"
            width={300}
            height={100}
            data={data}
            margin={{
              top: 0,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <XAxis
              type="number"
              ticks={[0, 150, 300]} 
              domain={[0, 'dataMax']}
              tickFormatter={(tick) => {
                if (tick === 0) return 'Low';
                if (tick === 150) return 'Avg'; 
                if (tick === 300) return 'High'; 
                return '';
              }}
              style={{ fontWeight: 'bold' }}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={60}
              style={{ fontWeight: 'bold' }}
              tick={{ fontSize: '12px' }}
            />

            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="value"
              background={{ fill: '#eee'}} // #B98AF2
              fill="#8884d8"
              style={{ fontWeight: 'bold' }}
              barSize={20}
              shape={(props) => (<Rectangle {...props} fill={barColor(props.value)} />)}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '20%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {volume === 0 && (
        <div style={{ width: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <img src={speakerIcon} alt="Speaker.png" style={{ width: '70px', height: '70px',  marginRight:'70px',  marginTop:'80px' }} />
        <p style={{ marginTop: '10px', color: 'black', fontSize: '16px', marginRight:'80px', fontWeight: 'bold' }}>Speak!</p>
      </div>
      )}

      {filler && (
        <div style={{ width: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src={speakerIcon} alt="Speaker.png" style={{ width: '70px', height: '70px',  marginRight:'70px',  marginTop:'80px' }} />
          <p style={{ marginTop: '10px', color: 'black', fontSize: '16px', marginRight:'80px', fontWeight: 'bold' }}>Filler!</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default FeedbackGraph;