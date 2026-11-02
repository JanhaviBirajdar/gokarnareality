// Pure browser Web Audio API ambient sound generator
// Synthesizes a soothing 432Hz ambient chord and low resonant warm ocean wind

class SanctuaryAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.oscillators = [];
    this.isPlaying = false;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm chords in F# minor / 432Hz harmonic scale
    const frequencies = [108, 162, 216, 324];

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Low pass filter for velvety warm sound
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + idx * 80, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      // Subtle LFO for breathing swell
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      lfo.connect(oscGain.gain);
      lfo.start();

      oscGain.gain.setValueAtTime(0.08 / (idx + 1), this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.masterGain);

      osc.start();
      this.oscillators.push(osc);
    });
  }

  play() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 3);
    this.isPlaying = true;
  }

  stop() {
    if (!this.ctx || !this.masterGain) return;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
    this.isPlaying = false;
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }
}

export const sanctuaryAudio = new SanctuaryAudioEngine();

