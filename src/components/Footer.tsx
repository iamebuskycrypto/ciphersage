'use client';

export function Footer() {
  const cols = [
    { title: 'Ecosystem', links: [
      { name: 'Fhenix.io', href: 'https://fhenix.io', desc: 'Official Website' },
      { name: 'Redact', href: 'https://redact.fhenix.io', desc: 'Private DEX' },
      { name: 'CoFHE Docs', href: 'https://docs.fhenix.io', desc: 'Documentation' },
    ]},
    { title: 'Faucets', links: [
      { name: 'ETH Faucet', href: 'https://faucet.arbitrum.io', desc: 'Arbitrum Sepolia' },
      { name: 'USDC Faucet', href: 'https://faucet.circle.com', desc: 'Circle Testnet USDC' },
    ]},
    { title: 'Community', links: [
      { name: '𝕏 Twitter / X', href: 'https://x.com/fhenix?s=20', desc: 'Follow @fhenix' },
      { name: '💬 Discord', href: 'https://discord.gg/xmq866nh', desc: 'Join the community' },
    ]},
  ];

  return (
    <footer id="ecosystem" style={{ borderTop: '1px solid rgba(124,58,237,0.12)', background: 'rgba(5,5,15,0.95)', padding: '64px 24px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🔒</div>
              <span style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '17px', color: 'white' }}>Cipher<span style={{ color: '#34D399' }}>Sage</span></span>
            </div>
            <p style={{ color: '#334155', fontFamily: 'Inter', fontSize: '13px', lineHeight: 1.75, marginBottom: '16px' }}>
              An interactive game that makes you a master of Fhenix and on-chain privacy — with a soulbound NFT badge to prove it.
            </p>
            <span className="pill" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', color: '#475569', fontSize: '11px' }}>
              Powered by Fhenix · Built for the Ecosystem
            </span>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '11px', color: '#334155', letterSpacing: '0.12em', marginBottom: '20px' }}>
                {col.title.toUpperCase()}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {col.links.map(link => (
                  <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#94A3B8', marginBottom: '2px', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#A78BFA')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}>
                      {link.name} ↗
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#334155' }}>{link.desc}</div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid rgba(124,58,237,0.08)', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '12px' }}>
            © 2025 CipherSage · Community project · Not officially affiliated with Fhenix Protocol
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34D399', animation: 'pulse-ring 2.5s infinite' }} />
            <span style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '12px' }}>Live on Arbitrum Sepolia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
