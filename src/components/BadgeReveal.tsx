'use client';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { getBadgeInfo } from '@/data/questions';

interface Props { totalScore: number; maxScore: number; scorePercent: number; }

const GRADIENTS: Record<string, string> = {
  'Fhenix Master':   'linear-gradient(135deg, #F59E0B, #EF4444)',
  'Cipher Agent':    'linear-gradient(135deg, #6C3CE1, #22D3EE)',
  'FHE Explorer':    'linear-gradient(135deg, #22D3EE, #00E676)',
  'Privacy Newcomer':'linear-gradient(135deg, #475569, #94A3B8)',
};

export function BadgeReveal({ totalScore, maxScore, scorePercent }: Props) {
  const { address, isConnected } = useAccount();
  const badge = getBadgeInfo(scorePercent);
  const grad = GRADIENTS[badge.rank] ?? GRADIENTS['Privacy Newcomer'];

  return (
    <section className="py-24 px-6">
      <div className="max-w-xl mx-auto text-center">

        {/* Celebration */}
        <div className="text-7xl mb-4 animate-float">🎊</div>
        <h2 className="font-bold mb-2 text-center" style={{ fontFamily: 'Space Grotesk', fontSize: '40px', color: 'white', letterSpacing: '-0.02em' }}>
          Quest Complete!
        </h2>
        <p style={{ color: '#94A3B8', fontFamily: 'Inter', fontSize: '17px', marginBottom: '40px' }}>
          You&apos;ve mastered all 7 topics on CipherSage.
        </p>

        {/* Badge card */}
        <div
          className="glass p-10 mb-6 relative overflow-hidden"
          style={{ borderColor: `${badge.color}50`, boxShadow: `0 0 80px ${badge.color}20` }}
        >
          {/* Bg glow */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ background: grad }} />

          {/* Badge circle */}
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 animate-pulse-glow relative"
            style={{ background: grad }}
          >
            {badge.emoji}
          </div>

          <h3 className="font-bold mb-2 text-center" style={{ color: badge.color, fontFamily: 'Space Grotesk', fontSize: '28px' }}>{badge.rank}</h3>
          <p style={{ color: '#94A3B8', fontFamily: 'Inter', fontSize: '15px', marginBottom: '24px' }}>{badge.description}</p>

          {/* Score row */}
          <div className="flex items-center justify-center gap-8 py-5 rounded-2xl mb-4"
            style={{ background: 'rgba(108,60,225,0.08)', border: '1px solid rgba(108,60,225,0.2)' }}>
            {[
              { v: String(totalScore), l: 'Points' },
              { v: `${scorePercent}%`, l: 'Score' },
              { v: '7', l: 'Topics' },
            ].map((item, i) => (
              <div key={item.l} className="flex items-center gap-8">
                {i > 0 && <div style={{ width: '1px', height: '36px', background: 'rgba(108,60,225,0.3)' }} />}
                <div className="text-center">
                  <div className="font-bold" style={{ color: i === 1 ? badge.color : 'white', fontFamily: 'Space Grotesk', fontSize: '26px' }}>{item.v}</div>
                  <div style={{ color: '#475569', fontFamily: 'Inter', fontSize: '12px' }}>{item.l}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="progress-bar mb-2"><div className="progress-fill" style={{ width: `${scorePercent}%` }} /></div>
          <p style={{ color: '#475569', fontFamily: 'Inter', fontSize: '12px', textAlign: 'center' }}>{totalScore} / {maxScore} points</p>
        </div>

        {/* Wallet / Mint */}
        <div className="glass p-8 mb-5" style={{ borderColor: 'rgba(0,230,118,0.2)' }}>
          <h3 className="font-bold mb-2 text-center" style={{ fontFamily: 'Space Grotesk', fontSize: '20px', color: 'white' }}>
            Mint Your Soulbound Badge
          </h3>
          <p style={{ color: '#94A3B8', fontFamily: 'Inter', fontSize: '14px', marginBottom: '20px', textAlign: 'center', lineHeight: 1.7 }}>
            Connect your wallet to mint your <strong style={{ color: '#00E676' }}>{badge.rank}</strong> badge as a
            soulbound NFT on the Fhenix testnet. It&apos;s yours forever — and can never be transferred.
          </p>

          {!isConnected ? (
            <div className="flex flex-col items-center gap-4">
              <ConnectButton />
              <div className="flex flex-col gap-2 items-center">
                <a href="https://faucet.arbitrum.io" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#22D3EE', fontFamily: 'Inter', fontSize: '13px' }}>
                  Get free Arbitrum Sepolia ETH (for gas) →
                </a>
                <a href="https://faucet.circle.com" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#A78BFA', fontFamily: 'Inter', fontSize: '13px' }}>
                  Get free USDC (Circle Faucet) →
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="badge-pill" style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', color: '#00E676' }}>
                ✓ Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
              <button
                className="btn w-full"
                style={{
                  background: grad, color: 'white',
                  boxShadow: `0 0 30px ${badge.color}40`,
                  fontSize: '16px', padding: '16px', borderRadius: '16px', justifyContent: 'center',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 60px ${badge.color}60`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${badge.color}40`; }}
                onClick={() => alert('🚀 Smart contract deployment in progress. Minting coming very soon!')}
              >
                🏅 Mint {badge.rank} Badge
              </button>
              <div className="flex gap-4">
                <a href="https://faucet.arbitrum.io" target="_blank" rel="noopener noreferrer" style={{ color: '#22D3EE', fontFamily: 'Inter', fontSize: '13px' }}>
                  ETH Faucet →
                </a>
                <a href="https://faucet.circle.com" target="_blank" rel="noopener noreferrer" style={{ color: '#A78BFA', fontFamily: 'Inter', fontSize: '13px' }}>
                  USDC Faucet →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Share + links */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '𝕏 Share on X', href: `https://twitter.com/intent/tweet?text=I%20just%20earned%20%22${encodeURIComponent(badge.rank)}%22%20on%20CipherSage!%20${scorePercent}%25%20score%20%F0%9F%94%92%20%40fhenix%0Ahttps%3A%2F%2Ffhenix.io`, color: '#1DA1F2' },
            { label: '🔒 Try Redact', href: 'https://redact.fhenix.io', color: '#A78BFA' },
            { label: '📖 CoFHE Docs', href: 'https://docs.fhenix.io', color: '#00E676' },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="py-3 px-3 rounded-xl text-center text-sm font-semibold transition-all duration-200"
              style={{ border: `1px solid ${l.color}35`, color: l.color, background: `${l.color}08`, fontFamily: 'Space Grotesk', fontSize: '13px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${l.color}15`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${l.color}08`; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
