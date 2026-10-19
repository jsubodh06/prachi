// Festive Web Audio Synthesizer for interactive Diwali delight
// Pure Web Audio API: 100% reliable, zero network latency, zero broken audio files.

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const festiveAudio = {
  isMuted: () => isMuted,
  setMuted: (muted: boolean) => {
    isMuted = muted;
    try {
      localStorage.setItem('nutrosa_festive_audio_muted', muted ? 'true' : 'false');
    } catch {
      // ignore
    }
  },
  toggleMute: () => {
    isMuted = !isMuted;
    try {
      localStorage.setItem('nutrosa_festive_audio_muted', isMuted ? 'true' : 'false');
    } catch {
      // ignore
    }
    return !isMuted;
  },

  // Auspicious warm temple bell for diya lighting
  playDiyaLight: (index = 0) => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const baseFreq = 523.25; // C5
      const pentatonic = [1, 1.125, 1.25, 1.5, 1.667]; // auspicious Indian scale ratio
      const freq = baseFreq * (pentatonic[index % pentatonic.length] || 1);

      // Primary bell tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Overtone harmonic for rich brass bell shimmer
      const overtone = ctx.createOscillator();
      const overtoneGain = ctx.createGain();
      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2.76, now);

      // Bell envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      overtoneGain.gain.setValueAtTime(0.001, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      overtone.connect(overtoneGain);
      gain.connect(ctx.destination);
      overtoneGain.connect(ctx.destination);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + 0.95);
      overtone.stop(now + 0.65);
    } catch (e) {
      console.warn('Audio playDiyaLight failed', e);
    }
  },

  // Celestial unboxing shimmer when opening a gift hamper box
  playUnboxChime: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [659.25, 783.99, 987.77, 1318.51]; // E5, G5, B5, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.001, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.06 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.65);
      });
    } catch (e) {
      console.warn('Audio playUnboxChime failed', e);
    }
  },

  // Crisp clink sound for tier quantity updates & budget calculation
  playClink: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, now); // A6
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      console.warn('Audio playClink failed', e);
    }
  },

  // Festive celebration fanfare when unlocking blessings or claiming card fortune
  playFanfare: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.5]; // C major celebratory arpeggio
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0.001, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.15, now + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.85);
      });
    } catch (e) {
      console.warn('Audio playFanfare failed', e);
    }
  },

  // Delicate sparkling sound for admin saves and configuration unlocks
  playSparkle: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const sparkleNotes = [880, 1174.66, 1318.51, 1760]; // A5, D6, E6, A6
      sparkleNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.001, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.04 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.4);
      });
    } catch (e) {
      console.warn('Audio playSparkle failed', e);
    }
  }
};
