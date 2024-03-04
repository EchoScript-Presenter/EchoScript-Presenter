import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle, LabelList } from 'recharts';
import { MdSpeakerNotesOff } from "react-icons/md"; // 일단은 안씀
import { PiProhibitBold } from "react-icons/pi";
import speakerIcon from './speaker.png';
import axios from 'axios';


const dataSets = [
  [
    { name: 'Volume', value: 2400 },
    { name: 'Speed', value: 1398 },
    { name: 'Pitch', value: 9800 },
  ],
  [
    { name: 'Volume', value: 0 },
    { name: 'Speed', value: 4300 },
    { name: 'Pitch', value: 2100 },
  ],
  [
    { name: 'Volume', value: 1200 },
    { name: 'Speed', value: 2900 },
    { name: 'Pitch', value: 0 },
  ],
];

function FeedbackGraph() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [volume, setVolume] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [filler, setFiller] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseVolume = await axios.get('http://localhost:8000/data_volume');
        const responsePitch = await axios.get('http://localhost:8000/data_pitch');
        const responseSpeed = await axios.get('http://localhost:8000/data_speed');
        const responseFiller = await axios.get('http://localhost:8000/data_filler');

        setVolume(responseVolume.data.volume);
        setPitch(responsePitch.data.pitch);
        setSpeed(responseSpeed.data.speed);
        setFiller(responseFiller.data.filler);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % dataSets.length);
    }, 1000); // 1초 간격으로 업데이트
    // 진영: 여기 setInterval(fetchData, 1000); 로 바꿔준 후에, volume/pitch/speecd/filler 로 사용하면 돼요!
    // 숫자 값만 보내느라 포맷 지정(:.2f 반올림)을 못했어요! 참고해 주세용
    // filler word는 카운트 값만 전송되니까 여기서 5회 이상이면 경고 띄워 주는 조건문 다시 생성해주세요!

    return () => clearInterval(interval);
  }, [activeIndex]);

  const data = dataSets[activeIndex];
  const volumeData = data.find(d => d.name === 'Volume');
  const barColor = (value) => {
    if (value <= 3000) return 'red';
    else if (value <= 7000) return 'green';
    else return 'red'; 
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '70%' }}>
      <div style={{ width: '100%' }}>
        <h2 style={{width:'100%', marginLeft:'10px'}}>Real-time Feedback</h2>
        <ResponsiveContainer width="100%" height="80%">
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
                  ticks={[0, 5000, 10000]} // 일단 기준
                  domain={[0, 'dataMax']} 
                  tickFormatter={(tick) => {
                    if (tick === 0) return 'Low';
                    if (tick === 5000) return 'Avg';
                    if (tick === 10000) return 'High';
                    return '';
                  }}
                  style={{ fontWeight: 'bold' }}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={60}
                  style={{ fontWeight: 'bold' }}
                  tick={{ fontSize: '12px' }} // 여기서 폰트 크기를 조정합니다.
                />

                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar 
                  dataKey="value" 
                  background={{ fill: '#eee' }} 
                  fill="#8884d8"
                  style={{ fontWeight: 'bold' }} 
                  barSize={20}
                  shape={(props) => (<Rectangle {...props} fill={barColor(props.value)} />)}
                  />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'70px' }}>
            {volumeData && volumeData.value === 0 && ( // {volumeData && volumeData.value === 0 && <MdSpeakerNotesOff size={50} />}
                <div style={{ textAlign: 'center' }}>
                  <img src={speakerIcon} alt="Pause" style={{ width: '50px', height: '50px' }} />
                <div style={{ marginTop: '10px',fontWeight: 'bold' }}>PAUSE</div>
            </div>
            )}
          </div>
    </div>
  );
}

export default FeedbackGraph;
