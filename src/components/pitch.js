// fft-js에서 FFT를 명명된 내보내기로 제공하는 경우
import { fft as FFT } from 'fft-js';

const PitchAnalyzer = (function () {
    const pi = Math.PI,
          pi2 = pi * 2,
          cos = Math.cos,
          pow = Math.pow,
          log = Math.log,
          max = Math.max,
          min = Math.min,
          abs = Math.abs,
          LN10 = Math.LN10,
          sqrt = Math.sqrt,
          atan2 = Math.atan2,
          round = Math.round,
          inf = Infinity, // 수정: 1/0 대신 Infinity 사용
          FFT_P = 10,
          FFT_N = 1 << FFT_P,
          BUF_N = FFT_N * 2;

    function remainder(val, div) {
        return val - round(val / div) * div;
    }

    function extend(obj, ...args) {
        args.forEach(arg => {
            for (let n in arg) {
                if (arg.hasOwnProperty(n)) {
                    obj[n] = arg[n];
                }
            }
        });
        return obj;
    }

    function Tone() {
        this.harmonics = new Float32Array(Tone.MAX_HARM);
        this.freq = 0.0;
        this.db = -inf;
        this.stabledb = -inf;
        this.age = 0;
    }

    Tone.prototype.matches = function(freq) {
        return abs(this.freq / freq - 1.0) < 0.05;
    };

    Tone.MIN_AGE = 2;
    Tone.MAX_HARM = 48;

    function Peak(freq, db) {
        this.freq = typeof freq === 'undefined' ? 0.0 : freq;
        this.db = typeof db === 'undefined' ? -inf : db;
        this.harm = new Array(Tone.MAX_HARM).fill(-inf);
    }

    Peak.prototype.clear = function() {
        this.freq = 0.0;
        this.db = -inf;
    };

    Peak.match = function(peaks, pos) {
        let best = pos;
        if (peaks[pos - 1] && peaks[pos - 1].db > peaks[best].db) best = pos - 1;
        if (peaks[pos + 1] && peaks[pos + 1].db > peaks[best].db) best = pos + 1;
        return peaks[best];
    };

    function Analyzer(options) {
        extend(this, options);
        this.data = new Float32Array(FFT_N);
        this.buffer = new Float32Array(BUF_N);
        this.fftLastPhase = new Float32Array(FFT_N);
        this.tones = [];
        this.wnd = Analyzer.calculateWindow();
        this.setupFFT();
    }

    Analyzer.prototype.setupFFT = function() {
        this.fft = new FFT(FFT_N);
    };

    Analyzer.prototype.processFFT = function(data) {
        let wnd = this.wnd,
            fftInput = new Float32Array(FFT_N);
        for (let i = 0; i < FFT_N; i++) {
            fftInput[i] = data[i] * wnd[i];
        }
        return this.fft.calculate(fftInput);
    };

    Analyzer.calculateWindow = function() {
        let w = new Float32Array(FFT_N);
        for (let i = 0; i < FFT_N; i++) {
            w[i] = 0.53836 - 0.46164 * cos(pi2 * i / (FFT_N - 1));
        }
        return w;
    };

    // 메소드 정의 방식 수정
    Analyzer.prototype.input = function(data) {
        let overflow = false;
        let w = (this.bufWrite + data.length) % this.BUF_N;
        if (w < this.bufWrite) overflow = true; // 버퍼 오버플로 체크
        this.buffer.set(data, this.bufWrite); // 데이터를 버퍼에 복사
        this.bufWrite = w;
        if (overflow) this.bufRead = (this.bufWrite + 1) % this.BUF_N;
    };

    Analyzer.prototype.process = function() {
        while (this.calcFFT()) {
            let maxMagnitude = 0;
            let dominantFrequencyIndex = null;
            for (let i = 0; i < this.FFT_N / 2; i++) {
                const magnitude = Math.sqrt(this.fft[2 * i] ** 2 + this.fft[2 * i + 1] ** 2);
                if (magnitude > maxMagnitude) {
                    maxMagnitude = magnitude;
                    dominantFrequencyIndex = i;
                }
            }
            if (dominantFrequencyIndex !== null) {
                const dominantFrequency = dominantFrequencyIndex * this.sampleRate / this.FFT_N;
                console.log(`Dominant Frequency: ${dominantFrequency} Hz, Magnitude: ${maxMagnitude}`);
            }
        }
    };
    
    Analyzer.prototype.findTone = function(minFreq = 65.0, maxFreq = 1000.0) {
        this.process(); // 먼저, FFT 데이터를 처리하여 피크를 찾습니다.
        let maxMagnitude = 0;
        let toneFrequency = null;
        const minIndex = Math.ceil(minFreq / (this.sampleRate / this.FFT_N));
        const maxIndex = Math.floor(maxFreq / (this.sampleRate / this.FFT_N));
        for (let i = minIndex; i <= maxIndex; i++) {
            const magnitude = Math.sqrt(this.fft[2 * i] ** 2 + this.fft[2 * i + 1] ** 2);
            if (magnitude > maxMagnitude) {
                maxMagnitude = magnitude;
                toneFrequency = i * this.sampleRate / this.FFT_N;
            }
        }
        if (toneFrequency !== null) {
            console.log(`Found tone: ${toneFrequency} Hz with magnitude: ${maxMagnitude}`);
            return { frequency: toneFrequency, magnitude: maxMagnitude };
        } else {
            console.log('No tone found within the specified frequency range.');
            return null;
        }
    };
    
    Analyzer.prototype.calcFFT = function() {
        if ((this.BUF_N + this.bufWrite - this.bufRead) % this.BUF_N < this.FFT_N) return false;
        const input = new Float32Array(this.FFT_N);
        for (let i = 0; i < this.FFT_N; i++) {
            input[i] = this.buffer[(this.bufRead + i) % this.BUF_N] * this.wnd[i];
        }
        this.fft = FFT(input); // 가정: FFT는 FFT 결과를 반환하는 함수입니다.
        this.bufRead = (this.bufRead + this.FFT_N) % this.BUF_N;
        return true;
    };
    

    return Analyzer;
})();

export default PitchAnalyzer;
