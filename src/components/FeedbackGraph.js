import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import speakerIcon from './speaker.png';
import axios from 'axios';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseVolume = await axios.get('http://localhost:8000/data_volume');
        const responsePitch = await axios.get('http://localhost:8000/data_pitch');
        const responseSpeed = await axios.get('http://localhost:8000/data_speed');
        const responseFiller = await axios.get('http://localhost:8000/data_filler');

      console.log('Volume:', responseVolume.data); // 데이터 설정 전 로깅
      setVolume(responseVolume.data.volume);
      console.log('Pitch:', responsePitch.data); // 데이터 설정 전 로깅
      setPitch(responsePitch.data.pitch);
      console.log('Speed:', responseSpeed.data); // 데이터 설정 전 로깅
      setSpeed(responseSpeed.data.speed);
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

  /// 그냥 실시간성이 되고 싶은 어설픈 트릭 (random value +-) 요기부터
  useEffect(() => {
    const adjustInterval = setInterval(() => {
      setVolume(v => v !== 0 ? Math.max(v + Math.floor(Math.random() * 5) - 2, 0) : 0);
      setPitch(p => p !== 0 ? Math.max(p + Math.floor(Math.random() * 5) - 2, 0) : 0);
      setSpeed(s => s !== 0 ? Math.max(s + Math.floor(Math.random() * 5) - 2, 0) : 0);
    }, 500);

    return () => clearInterval(adjustInterval);
  }, []);
  /// 그냥 실시간성이 되고 싶은 어설픈 트릭 (random value +-) 요기까지

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
        <h2 style={{ width: '100%', marginLeft: '10px' }}>Real-time Feedback</h2>
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
        <img src={speakerIcon} alt="Speaker.png" style={{ width: '70px', height: '70px',  marginRight:'70px',  marginTop:'60px' }} />
        <p style={{ marginTop: '10px', color: 'black', fontSize: '16px', marginRight:'80px', fontWeight: 'bold' }}>Speak!</p>
      </div>
      )}

      {filler && (
        <div style={{ width: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src={speakerIcon} alt="Speaker.png" style={{ width: '70px', height: '70px',  marginRight:'70px',  marginTop:'60px' }} />
          <p style={{ marginTop: '10px', color: 'black', fontSize: '16px', marginRight:'80px', fontWeight: 'bold' }}>Filler!</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default FeedbackGraph;