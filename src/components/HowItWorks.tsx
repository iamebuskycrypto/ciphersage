'use client';

const STEPS = [
  { n:'01', icon:'📚', title:'Learn', color:'#A78BFA', desc:'7 topics. Plain English. Even a complete noob gets it. Each topic builds on the last — from the problem to the solution to the future.', tags:['7 Topics','Real Analogies','No Jargon'] },
  { n:'02', icon:'🎮', title:'Play & Level Up', color:'#60A5FA', desc:'3 difficulty levels per topic: Beginner → Intermediate → Master. Earn 10, 20, or 30 points per question. Wrong answers teach — they never punish.', tags:['3 Levels Each','63 Questions','Instant Feedback'] },
  { n:'03', icon:'🏅', title:'Mint Your Badge', color:'#34D399', desc:'Connect wallet. Mint a soulbound NFT on Fhenix testnet. Your rank is permanent, on-chain, and can never be faked or transferred.', tags:['4 Badge Ranks','Soulbound NFT','Arbitrum Sepolia'] },
];

const BADGES = [
  { rank:'Privacy Newcomer', emoji:'🌱', color:'#94A3B8', range:'0–40%' },
  { rank:'FHE Explorer',     emoji:'🔭', color:'#60A5FA', range:'41–70%' },
  { rank:'Cipher Agent',     emoji:'🔮', color:'#A78BFA', range:'71–90%' },
  { rank:'Fhenix Master',    emoji:'🏆', color:'#FBBF24', range:'91–100%' },
];

export function HowItWorks() {
  return (
    <section id="about" style={{ padding: '80px 24px', background: '#05050f' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="pill" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', color: '#A78BFA', marginBottom: '20px', display: 'inline-flex' }}>
            ✨ How It Works
          </span>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '-0.025em', color: 'white', marginBottom: '16px' }}>
            From Zero to{' '}
            <span className="text-purple-grad">Fhenix Native</span>
          </h2>
          <p style={{ color: '#64748B', fontFamily: 'Inter', fontSize: '17px', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
            Three steps. An on-chain credential at the end. And you'll actually understand how FHE works.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="card"
              style={{ padding: '32px', textAlign: 'center', transition: 'all 0.28s ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-6px)'; el.style.borderColor = `${s.color}45`; el.style.boxShadow = `0 20px 60px ${s.color}18`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.borderColor = 'rgba(124,58,237,0.2)'; el.style.boxShadow = 'none'; }}
            >
              {/* Step number */}
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${s.color}20`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontFamily: 'JetBrains Mono', fontSize: '12px', fontWeight: 600, color: s.color }}>
                {i + 1}
              </div>

              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{s.icon}</div>

              <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '22px', color: s.color, marginBottom: '12px' }}>{s.title}</h3>
              <p style={{ color: '#94A3B8', fontFamily: 'Inter', fontSize: '14px', lineHeight: 1.75, marginBottom: '20px' }}>{s.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {s.tags.map(tag => (
                  <span key={tag} className="pill" style={{ background: `${s.color}12`, border: `1px solid ${s.color}30`, color: s.color, fontSize: '11px' }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="card" style={{ padding: '48px 40px' }}>
          <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '26px', color: 'white', textAlign: 'center', marginBottom: '8px' }}>4 Ranks to Earn 🏅</h3>
          <p style={{ color: '#64748B', fontFamily: 'Inter', fontSize: '14px', textAlign: 'center', marginBottom: '36px' }}>Your score decides your rank. Each rank is a unique soulbound NFT — yours forever.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {BADGES.map((b, i) => (
              <div
                key={b.rank}
                style={{
                  background: `${b.color}08`, border: `1px solid ${b.color}22`,
                  borderRadius: '16px', padding: '24px 16px', textAlign: 'center',
                  transition: 'all 0.28s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-5px) scale(1.02)'; el.style.borderColor = `${b.color}55`; el.style.boxShadow = `0 12px 40px ${b.color}18`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0) scale(1)'; el.style.borderColor = `${b.color}22`; el.style.boxShadow = 'none'; }}
              >
                <div className="float" style={{ fontSize: '36px', marginBottom: '12px', animationDelay: `${i * 0.4}s` }}>{b.emoji}</div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '13px', color: b.color, marginBottom: '4px' }}>{b.rank}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#475569' }}>{b.range}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
