'use client';

import { useAccount } from 'wagmi';
import { useReadContract, useReadContracts } from 'wagmi';
import { TRACKER_ABI, TRACKER_ADDRESS, EXPLORER_BASE } from '@/lib/contract';

export function OnChainStats() {
  const { address, isConnected } = useAccount();

  // Read global stats
  const { data: totalPlayers } = useReadContract({
    address: TRACKER_ADDRESS,
    abi: TRACKER_ABI,
    functionName: 'totalPlayers',
  });

  const { data: totalAnswers } = useReadContract({
    address: TRACKER_ADDRESS,
    abi: TRACKER_ABI,
    functionName: 'totalAnswersRecorded',
  });

  // Read player stats
  const { data: playerStats, isLoading } = useReadContract({
    address: TRACKER_ADDRESS,
    abi: TRACKER_ABI,
    functionName: 'getPlayerStats',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const playerScore   = playerStats ? Number(playerStats[0]) : 0;
  const playerAnswers = playerStats ? Number(playerStats[1]) : 0;

  return (
    <section style={{
      padding: '64px 24px',
      maxWidth: '900px',
      margin: '0 auto',
      width: '100%',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)',
          borderRadius: '100px', padding: '6px 16px', marginBottom: '16px',
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34D399', display: 'inline-block', boxShadow: '0 0 8px #34D399' }} />
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: '#34D399', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Live On-Chain Data
          </span>
        </div>
        <h2 style={{
          fontFamily: 'Space Grotesk', fontWeight: 700,
          fontSize: 'clamp(24px, 3vw, 36px)', color: 'white', margin: 0,
        }}>
          Your Blockchain Proof
        </h2>
        <p style={{ fontFamily: 'Inter', color: '#64748B', fontSize: '15px', marginTop: '10px' }}>
          Every answer you submit is permanently recorded on Arbitrum Sepolia
        </p>
      </div>

      {/* Global Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <StatCard
          label="Total Players"
          value={totalPlayers !== undefined ? Number(totalPlayers).toLocaleString() : '—'}
          icon="🌍"
          color="#A78BFA"
          sub="across all wallets"
        />
        <StatCard
          label="Total Answers"
          value={totalAnswers !== undefined ? Number(totalAnswers).toLocaleString() : '—'}
          icon="⛓️"
          color="#38BDF8"
          sub="recorded on-chain"
        />
      </div>

      {/* Player Stats */}
      <div style={{
        borderRadius: '20px',
        border: '1px solid rgba(124,58,237,0.2)',
        background: 'rgba(124,58,237,0.04)',
        padding: '32px',
      }}>
        <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '16px', color: 'white', marginBottom: '24px' }}>
          🏆 Your On-Chain Record
        </div>

        {!isConnected ? (
          <div style={{
            textAlign: 'center', padding: '32px',
            fontFamily: 'Inter', color: '#475569', fontSize: '15px',
          }}>
            Connect your wallet to see your personal on-chain stats
          </div>
        ) : isLoading ? (
          <div style={{ textAlign: 'center', padding: '32px', color: '#475569', fontFamily: 'Inter' }}>
            Loading your stats from the blockchain...
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <StatCard
                label="Your Score"
                value={playerScore.toLocaleString()}
                icon="✨"
                color="#34D399"
                sub="points recorded"
              />
              <StatCard
                label="Answers Submitted"
                value={playerAnswers.toLocaleString()}
                icon="📝"
                color="#FBBF24"
                sub="on-chain entries"
              />
            </div>

            {/* Wallet + links */}
            <div style={{
              borderRadius: '14px',
              background: 'rgba(15,12,40,0.6)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '16px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '12px',
            }}>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: '11px', color: '#475569', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Your Wallet
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '13px', color: '#94A3B8', fontWeight: 500 }}>
                  {address ? `${address.slice(0, 10)}...${address.slice(-8)}` : '—'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href={`${EXPLORER_BASE}/address/${address}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: 600,
                    color: '#A78BFA', textDecoration: 'none',
                    background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)',
                    borderRadius: '10px', padding: '8px 14px',
                  }}
                >
                  View Wallet ↗
                </a>
                <a
                  href={`${EXPLORER_BASE}/address/${TRACKER_ADDRESS}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: 600,
                    color: '#38BDF8', textDecoration: 'none',
                    background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)',
                    borderRadius: '10px', padding: '8px 14px',
                  }}
                >
                  View Contract ↗
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function StatCard({ label, value, icon, color, sub }: {
  label: string; value: string; icon: string; color: string; sub: string;
}) {
  return (
    <div style={{
      borderRadius: '16px',
      background: 'rgba(15,12,40,0.6)',
      border: `1px solid ${color}22`,
      padding: '20px 24px',
      borderTop: `2px solid ${color}`,
    }}>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>
      <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '28px', color, marginBottom: '4px' }}>
        {value}
      </div>
      <div style={{ fontFamily: 'Inter', fontSize: '13px', color: 'white', fontWeight: 600, marginBottom: '2px' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#475569' }}>
        {sub}
      </div>
    </div>
  );
}
