import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import speakerIcon from './speaker.png';
import axios from 'axios';

function FeedbackGraph() {
  const [volume, setVolume] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [filler, setFiller] = useState(0);

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

      console.log('Volume:', responseVolume.data.volume); // 데이터 설정 전 로깅
      setVolume(responseVolume.data.volume);
      console.log('Pitch:', responsePitch.data.pitch); // 데이터 설정 전 로깅
      setPitch(responsePitch.data.pitch);
      console.log('Speed:', responseSpeed.data.speed); // 데이터 설정 전 로깅
      setSpeed(responseSpeed.data.speed);
      console.log('Filler:', responseFiller.data.filler); // 데이터 설정 전 로깅
      setFiller(responseFiller.data.filler);
    } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
    const interval = setInterval(fetchData, 1000); 

    return () => clearInterval(interval); 
  }, []); 

  const barColor = (value) => {
    if (value <= 50) return 'red';
    else if (value <= 300) return 'green';
    else return 'red';
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '70%' }}>
      <div style={{ width: '100%' }}>
        <h2 style={{ width: '100%', marginLeft: '10px' }}>Real-time Feedback</h2>
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
              background={{ fill: '#eee' }}
              fill="#8884d8"
              style={{ fontWeight: 'bold' }}
              barSize={20}
              shape={(props) => (<Rectangle {...props} fill={barColor(props.value)} />)}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '70px' }}>
        {volume === 0 && (
          <div style={{ textAlign: 'center' }}>
            <img src={speakerIcon} alt="Pause" style={{ width: '50px', height: '50px' }} />
            <div style={{ marginTop: '10px', fontWeight: 'bold' }}>PAUSE</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackGraph;
