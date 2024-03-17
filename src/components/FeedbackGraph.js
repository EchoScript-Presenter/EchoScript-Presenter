import React, { useState, useEffect } from 'react';
import useStore from './Store';
import {
  CBar_volume,
  CBar_speed,
  CBar_pitch,
  CBars,
  Containers,
} from './FeedbackGraphStyled';
import * as PitchFinder from 'pitchfinder';

function VolumeBar({ volume }) {
  const n = 8;
  return (
    <CBars>
      {[...Array(n)].map((no, index) => (
        <CBar_volume
          key={Symbol(index).toString()}
          volume={volume}
          no={index}
        />
      ))}
    </CBars>
  );
}

function SpeedBar() {
  const n = 8;
  const { duration, setIndex: setStoreIndex, index: storeIndex } = useStore();
  const [toggleIndex, setToggleIndex] = useState(true); // true일 때는 4, false일 때는 5

  let intervalId;
  //console.log("storeIndex",storeIndex);
  useEffect(() => {
    if (duration === 0) {
      setToggleIndex(!toggleIndex);
      setStoreIndex(toggleIndex ? 3 : 5);
    }
  }, [duration, toggleIndex, setStoreIndex]);

  return (
    <CBars>
      {[...Array(n)].map((_, idx) => (
        <CBar_speed key={Symbol(idx).toString()} speed={storeIndex} no={idx} />
      ))}
    </CBars>
  );
}

function PitchBar({ pitch }) {
  const n = 8;
  return (
    <CBars>
      {[...Array(n)].map((no, index) => (
        <CBar_pitch
          key={Symbol(index).toString()}
          pitch={pitch / 5}
          no={index}
        />
      ))}
    </CBars>
  );
}

const normalize_pitch = (
  value,
  minOriginal,
  maxOriginal,
  minNew = 0,
  maxNew = 80
) => {
  return (
    ((value - minOriginal) / (maxOriginal - minOriginal)) * (maxNew - minNew) +
    minNew
  );
};

function FeedbackGraph() {
  const [volume, setVolume] = useState(1);
  const { duration, index, pitch, setPitch } = useStore();
  const [before_pitch, setBeforePitch] = useState();
  const [before_speed, setBeforeSpeed] = useState(0);

  // volume bar의 index (3/8)의 값도 서버로 넘겨서 한꺼번에 json에 저장할 것임!
  const [coloredVolumeBars, setColoredVolumeBars] = useState(0);
  const [coloredSpeedBars, setColoredSpeedBars] = useState(0);
  const [coloredPitchBars, setColoredPitchBars] = useState(0);

  const data = [
    { name: 'Volume', value: volume },
    { name: 'Pitch', value: pitch },
    { name: 'Speed', value: index },
    { name: 'Before_Pitch', value: before_pitch },
    { name: 'Before_Speed', value: duration },
  ];
  //console.log(data);
  const volumeData = data.find((item) => item.name === 'Volume');
  if (volumeData) {
    //console.log('Volume:', volumeData.value);
  }
  const speedData = data.find((item) => item.name === 'Speed');
  if (speedData) {
    //console.log('data 안에 Speed:', speedData.value);
  }
  const pitchData = data.find((item) => item.name === 'Pitch');
  if (pitchData) {
    //console.log('Pitch:', pitchData.value);
  }

  const calculateBarsToColor = (value, totalBars) => {
    const barsToColor = Math.ceil(value / (100 / totalBars));
    return barsToColor;
  };

  useEffect(() => {
    setColoredVolumeBars(calculateBarsToColor(volume, 8));
    setColoredSpeedBars(index);
    setColoredPitchBars(calculateBarsToColor(pitch, 8));
    //console.log('ColoredSpeedBars:', coloredSpeedBars);
  }, [volume, duration, pitch, index]);

  useEffect(() => {
    const setupMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 2048; // 피치 감지에 적합한 fftSize 설정
        const bufferLength = analyser.fftSize;
        const buffer = new Float32Array(bufferLength);
        const detectPitch = PitchFinder.YIN();

        const calculatePitch = () => {
          analyser.getFloatTimeDomainData(buffer);
          const detectedPitch = detectPitch(buffer);
          // 주파수가 null이거나 17000Hz 이상인 경우 "Not detected"로 설정
          if (detectedPitch === null || detectedPitch > 17000) {
            setPitch(null);
          } else {
            setPitch(detectedPitch);
          }
        };

        // 100ms마다 피치 계산
        const intervalId = setInterval(calculatePitch, 100);

        return () => {
          clearInterval(intervalId);
          audioContext.close();
        };
      } catch (error) {
        console.error('Error accessing the microphone', error);
      }
    };

    setupMicrophone();
  }, [setPitch]);

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
          //let normalizedVolume = normalize(average, 0, 128, 0, 70);
          //setVolume(normalizedVolume);
          setVolume(average);
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
    const now = new Date();
    const koreaTime = new Date(
      now.getTime() + now.getTimezoneOffset() * 60000 + 9 * 3600000
    ); // 한국 시간으로 조정

    // 한국 시간으로 직접 포맷
    const year = koreaTime.getFullYear();
    const month = ('0' + (koreaTime.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더함
    const day = ('0' + koreaTime.getDate()).slice(-2);
    const hours = ('0' + koreaTime.getHours()).slice(-2);
    const minutes = ('0' + koreaTime.getMinutes()).slice(-2);
    const seconds = ('0' + koreaTime.getSeconds()).slice(-2);

    // YYYY-MM-DD HH:MM:SS 형태로 조합
    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const feedbackData = {
      timestamp: timestamp,
      volumeData: volume,
      speedData: index,
      pitchData: pitch,
      before_speed: duration,
      before_pitch: before_pitch,
      volumeBarsColored: coloredVolumeBars,
      speedBarsColored: coloredSpeedBars,
      pitchBarsColored: coloredPitchBars,
    };
    sendFeedbackToServer(feedbackData);
  }, [duration, volume, pitch]); // 속도, 볼륨, 피치가 변경될 때마다 트리거됨

  const sendFeedbackToServer = async (feedbackData) => {
    try {
      // await axios.post('http://localhost:8000/data_feedback', feedbackData);
      //console.log('Feedback sent successfully');
    } catch (error) {
      //console.error('Error sending feedback to server:', error);
    }
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
    textAlign: 'left',
    // marginTop: '10px',
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

  const Containers = {
    display: 'flex',
    flexDirection: 'column' /* 요소들을 수직으로 배치 */,
    justifyContent: 'center' /* 요소들을 수직으로 가운데 정렬 */,
    gap: '1.5rem',
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
          <div style={Containers}>
            <div style={labelStyle}>Volume</div>
            <div style={labelStyle}>Speed</div>
            <div style={labelStyle}>Pitch</div>
          </div>
          <div style={Containers}>
            <VolumeBar volume={volume} />
            <SpeedBar />
            <PitchBar pitch={pitch} />
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackGraph;
