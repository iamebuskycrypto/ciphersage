'use client';

import { useEffect, useRef, useState } from 'react';

const CHARS = '01ABCDabcd#@█▓';

function Decrypt({ text, delay = 0, style = {} }: { text: string; delay?: number; style?: React.CSSProperties }) {
  const [out, setOut] = useState(text.replace(/[^ ]/g, '█'));
  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        setOut(text.split('').map((c, idx) => {
          if (c === ' ') return ' ';
          if (idx < i) return c;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join(''));
        if (i++ >= text.length) { clearInterval(iv); setOut(text); }
      }, 36);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  return <span style={style}>{out}</span>;
}

const STATS = [
  { v: '$22M', l: 'Total Raised', sub: 'Series A+', c: '#A78BFA', bg: 'rgba(167,139,250,0.06)', icon: '💜' },
  { v: '20,000×', l: 'Throughput', sub: 'vs baseline', c: '#38BDF8', bg: 'rgba(56,189,248,0.06)', icon: '⚡' },
  { v: '37×', l: 'Latency Gain', sub: 'faster FHE', c: '#34D399', bg: 'rgba(52,211,153,0.06)', icon: '🚀' },
  { v: '$100T', l: 'Opportunity', sub: 'addressable', c: '#F59E0B', bg: 'rgba(245,158,11,0.06)', icon: '🌐' },
];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => { setTimeout(() => setShow(true), 150); }, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    const setSize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    setSize();

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 2 + .4, a: Math.random() * 0.5 + .15,
      col: ['#7C3AED','#60A5FA','#34D399','#C4B5FD','#A78BFA'][Math.floor(Math.random() * 5)],
    }));

    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x = (p.x + p.vx + c.width) % c.width;
        p.y = (p.y + p.vy + c.height) % c.height;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col; ctx.globalAlpha = p.a; ctx.fill();
      });
      ctx.globalAlpha = 1;
      id = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', setSize);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', setSize); };
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 24px 60px',
      overflow: 'hidden',
      background: '#05050f',
    }}>

      {/* ── LIGHT EFFECTS ── */}

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(124,58,237,0.2) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      }} />

      {/* Center spotlight beam — main dramatic light */}
      <div style={{
        position: 'absolute', top: '-120px', left: '50%',
        transform: 'translateX(-50%)',
        width: '700px', height: '700px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.45) 0%, rgba(96,165,250,0.15) 40%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Secondary purple halo behind headline */}
      <div style={{
        position: 'absolute', top: '15%', left: '50%',
        transform: 'translateX(-50%)',
        width: '900px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, rgba(167,139,250,0.08) 45%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* Bottom-left teal glow */}
      <div style={{
        position: 'absolute', bottom: '5%', left: '-80px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 65%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
      }} />

      {/* Bottom-right blue glow */}
      <div style={{
        position: 'absolute', bottom: '5%', right: '-80px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 65%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
      }} />

      {/* Thin horizontal light streak across middle */}
      <div style={{
        position: 'absolute', top: '42%', left: '0', right: '0',
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.4) 30%, rgba(167,139,250,0.6) 50%, rgba(96,165,250,0.4) 70%, transparent 100%)',
        pointerEvents: 'none',
        opacity: 0.5,
      }} />

      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.7 }} />

      {/* ── CONTENT ── */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '820px', width: '100%' }}>

        {/* Live badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '5px 14px', borderRadius: '99px', marginBottom: '28px',
          background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.3)', color: '#34D399',
          fontFamily: 'Inter', fontSize: '12px', fontWeight: 500,
          opacity: show ? 1 : 0, transition: 'opacity 0.5s',
          boxShadow: '0 0 20px rgba(52,211,153,0.15)',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34D399', display: 'inline-block', animation: 'pulse-ring 2s infinite', boxShadow: '0 0 6px #34D399' }} />
          Live on Ethereum · Arbitrum · Base
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'Space Grotesk', fontWeight: 800, letterSpacing: '-0.03em',
          lineHeight: 1.08, marginBottom: '18px',
          opacity: show ? 1 : 0, transition: 'opacity 0.5s 0.1s',
        }}>
          {/* Line 1 — monospace decrypt */}
          <span style={{
            display: 'block',
            fontSize: 'clamp(18px, 2.8vw, 36px)',
            color: '#94A3B8',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 500,
            marginBottom: '8px',
            letterSpacing: '-0.01em',
            textShadow: '0 0 30px rgba(167,139,250,0.3)',
          }}>
            <Decrypt text="Your on-chain life is fully public." delay={400} />
          </span>

          {/* Line 2 — big gradient */}
          <span style={{
            display: 'block',
            fontSize: 'clamp(34px, 5.5vw, 72px)',
            background: 'linear-gradient(90deg, #C4B5FD 0%, #60A5FA 45%, #34D399 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            backgroundSize: '200%', animation: 'grad-shift 4s ease infinite',
            filter: 'drop-shadow(0 0 40px rgba(124,58,237,0.4))',
          }}>
            Time to Close the Curtain.
          </span>
        </h1>

        {/* Sub */}
        <p style={{
          color: '#64748B', fontFamily: 'Inter', fontSize: 'clamp(14px, 1.7vw, 16px)',
          lineHeight: 1.75, maxWidth: '540px', margin: '0 auto 32px',
          opacity: show ? 1 : 0, transition: 'opacity 0.5s 0.3s',
        }}>
          Play through <strong style={{ color: '#CBD5E1' }}>7 topics</strong> on{' '}
          <strong style={{ color: '#A78BFA' }}>Fhenix & FHE</strong>. Level up Beginner → Master.
          Mint a <strong style={{ color: '#34D399' }}>soulbound NFT badge</strong> that lives on-chain forever.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: '44px',
          opacity: show ? 1 : 0, transition: 'opacity 0.5s 0.5s',
        }}>
          <a href="#game" className="btn-glow" style={{ fontSize: '15px', padding: '13px 28px' }}>🎮 Start the Quest</a>
          <a href="https://fhenix.io" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '15px', padding: '12px 24px' }}>Explore Fhenix ↗</a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px',
          marginBottom: '28px',
          opacity: show ? 1 : 0, transition: 'opacity 0.5s 0.7s',
        }}>
          {STATS.map(s => (
            <div key={s.l}
              style={{
                position: 'relative', overflow: 'hidden',
                padding: '18px 12px 14px',
                borderRadius: '16px',
                background: s.bg,
                border: `1px solid ${s.c}22`,
                textAlign: 'center',
                transition: 'all 0.25s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-5px)';
                el.style.border = `1px solid ${s.c}55`;
                el.style.boxShadow = `0 12px 40px ${s.c}20, 0 0 0 1px ${s.c}10`;
                el.style.background = s.bg.replace('0.06', '0.1');
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.border = `1px solid ${s.c}22`;
                el.style.boxShadow = 'none';
                el.style.background = s.bg;
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px',
                background: `linear-gradient(90deg, transparent, ${s.c}, transparent)`,
                borderRadius: '99px',
              }} />

              {/* Icon */}
              <div style={{ fontSize: '18px', marginBottom: '8px', lineHeight: 1 }}>{s.icon}</div>

              {/* Value */}
              <div style={{
                fontFamily: 'Space Grotesk', fontWeight: 800,
                fontSize: 'clamp(16px, 2.2vw, 26px)',
                color: s.c, lineHeight: 1,
                textShadow: `0 0 24px ${s.c}70`,
                marginBottom: '5px',
                letterSpacing: '-0.02em',
              }}>{s.v}</div>

              {/* Label */}
              <div style={{
                fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
                color: '#94A3B8', letterSpacing: '0.08em',
                textTransform: 'uppercase', marginBottom: '2px',
              }}>{s.l}</div>

              {/* Sub-label */}
              <div style={{
                fontFamily: 'Inter', fontSize: '9px',
                color: `${s.c}80`, letterSpacing: '0.04em',
              }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div style={{ opacity: show ? 0.75 : 0, transition: 'opacity 0.5s 0.9s' }}>
          <div style={{ fontFamily: 'Inter', fontSize: '9px', color: '#1E293B', letterSpacing: '0.16em', marginBottom: '10px', textTransform: 'uppercase' }}>Backed By & Partnered With</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
            {['Multicoin Capital','Hack VC','Amber Group','EigenLayer','Arbitrum','Celestia','Optalysys'].map(p => (
              <span key={p} style={{
                padding: '3px 10px', borderRadius: '99px',
                fontFamily: 'Inter', fontSize: '10px', color: '#334155',
                background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.12)',
              }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
