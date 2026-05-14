// Web Audio API sound effects — no external files needed

function getCtx(): AudioContext {
  return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
}

/** 🎉 Correct answer — bright ascending chime arpeggio */
export function playCorrect() {
  try {
    const ctx = getCtx();

    // C5 → E5 → G5 → C6  (major chord arpeggio, feels triumphant)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const delays = [0, 0.1, 0.2, 0.31];
    const durations = [0.35, 0.35, 0.35, 0.55];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Slight warmth — blend sine with a touch of triangle
      osc.type = 'sine';
      osc.frequency.value = freq;

      osc.connect(gain);
      gain.connect(ctx.destination);

      const t = ctx.currentTime + delays[i];
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.015); // quick attack
      gain.gain.exponentialRampToValueAtTime(0.001, t + durations[i]); // smooth decay

      osc.start(t);
      osc.stop(t + durations[i]);
    });

    // Subtle sparkle layer — high shimmer on top
    const shimmer = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    shimmer.type = 'sine';
    shimmer.frequency.value = 2093; // C7 — airy high note
    shimmer.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);
    const ts = ctx.currentTime + 0.3;
    shimmerGain.gain.setValueAtTime(0, ts);
    shimmerGain.gain.linearRampToValueAtTime(0.08, ts + 0.02);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, ts + 0.6);
    shimmer.start(ts);
    shimmer.stop(ts + 0.6);

    setTimeout(() => ctx.close(), 2000);
  } catch (e) {
    // Silently fail if audio not supported
  }
}

/** ❌ Wrong answer — descending thud buzz */
export function playWrong() {
  try {
    const ctx = getCtx();

    // First hit — low descending buzz
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(260, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.25);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    gain1.gain.setValueAtTime(0.28, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.28);

    // Second hit — shorter lower echo thud
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(180, ctx.currentTime + 0.18);
    osc2.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.42);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    const t2 = ctx.currentTime + 0.18;
    gain2.gain.setValueAtTime(0, t2);
    gain2.gain.linearRampToValueAtTime(0.18, t2 + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.3);
    osc2.start(t2);
    osc2.stop(t2 + 0.3);

    setTimeout(() => ctx.close(), 1500);
  } catch (e) {
    // Silently fail if audio not supported
  }
}
