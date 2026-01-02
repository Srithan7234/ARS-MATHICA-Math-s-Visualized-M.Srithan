
import { AudioAnalysis, AudioSource } from '../types';

class AudioService {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private currentStream: MediaStream | null = null;
  private dataArray: Uint8Array | null = null;
  private timeDataArray: Float32Array | null = null;
  private isEnabled: boolean = false;
  private beatThreshold: number = 0.18;
  private prevVolume: number = 0;
  private activeSource: AudioSource | null = null;

  async start(sourceType: AudioSource = 'MICROPHONE'): Promise<boolean> {
    try {
      // Close previous session if exists
      this.stop();

      let stream: MediaStream;
      
      if (sourceType === 'BROWSER_TAB') {
        // navigator.mediaDevices.getDisplayMedia is used for tab/system audio
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: true, // Required for audio selection in many browsers
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false
          }
        });

        // Verify audio was actually shared
        if (stream.getAudioTracks().length === 0) {
          stream.getTracks().forEach(t => t.stop());
          throw new Error("No audio track found. Ensure 'Share Audio' was checked.");
        }

        // Stop the video track as we only need audio
        stream.getVideoTracks().forEach(track => track.stop());
      } else {
        stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          } 
        });
      }

      this.currentStream = stream;
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Safety check for suspended state (common in browsers)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 1024; // Balanced for performance and resolution
      this.analyser.smoothingTimeConstant = 0.8;
      
      this.sourceNode = this.audioContext.createMediaStreamSource(stream);
      this.sourceNode.connect(this.analyser);
      
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.timeDataArray = new Float32Array(this.analyser.fftSize);
      
      this.isEnabled = true;
      this.activeSource = sourceType;
      
      // Auto-stop if user stops sharing from browser UI
      stream.getAudioTracks()[0].onended = () => {
        this.stop();
      };

      return true;
    } catch (error) {
      console.error('Audio access failed:', error);
      this.isEnabled = false;
      this.activeSource = null;
      return false;
    }
  }

  stop() {
    this.isEnabled = false;
    this.activeSource = null;
    
    if (this.currentStream) {
      this.currentStream.getTracks().forEach(track => track.stop());
      this.currentStream = null;
    }
    
    if (this.sourceNode) {
      this.sourceNode.disconnect();
      this.sourceNode = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    this.analyser = null;
    this.dataArray = null;
    this.timeDataArray = null;
  }

  getAnalysis(): AudioAnalysis {
    if (!this.isEnabled || !this.analyser || !this.dataArray || !this.timeDataArray) {
      return { 
        volume: 0, bass: 0, mids: 0, treble: 0, isBeat: false, 
        waveform: new Float32Array(0), spectrum: new Uint8Array(0) 
      };
    }

    this.analyser.getByteFrequencyData(this.dataArray);
    this.analyser.getFloatTimeDomainData(this.timeDataArray);

    // Volume calculation (RMS)
    let sum = 0;
    for (let i = 0; i < this.timeDataArray.length; i++) {
      sum += this.timeDataArray[i] * this.timeDataArray[i];
    }
    const volume = Math.sqrt(sum / this.timeDataArray.length);

    // Frequency bands (assuming 44.1k/48k sample rate)
    const binCount = this.dataArray.length;
    const getBandAverage = (startRatio: number, endRatio: number) => {
      const startIndex = Math.floor(startRatio * binCount);
      const endIndex = Math.floor(endRatio * binCount);
      let bandSum = 0;
      let count = 0;
      for (let i = startIndex; i <= endIndex && i < binCount; i++) {
        bandSum += this.dataArray![i];
        count++;
      }
      return count > 0 ? (bandSum / count) / 255 : 0;
    };

    // Mapping ranges to indices (approximate ratios for FFT 1024)
    const bass = getBandAverage(0, 0.05);     // 0 - ~250Hz
    const mids = getBandAverage(0.05, 0.2);   // ~250Hz - ~2kHz
    const treble = getBandAverage(0.2, 0.5); // ~2kHz - ~5kHz+

    // Enhanced Beat Detection (Spike relative to smoothed average)
    const smoothedVolume = this.prevVolume * 0.9 + volume * 0.1;
    const isBeat = volume > smoothedVolume + this.beatThreshold;
    this.prevVolume = smoothedVolume;

    return {
      volume,
      bass,
      mids,
      treble,
      isBeat,
      waveform: this.timeDataArray,
      spectrum: this.dataArray
    };
  }

  getIsActive(): boolean {
    return this.isEnabled;
  }

  getSourceType(): AudioSource | null {
    return this.activeSource;
  }
}

export const audioService = new AudioService();
