'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(5,5,15,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(124,58,237,0.15)' : 'none',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '11px', background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 0 20px rgba(124,58,237,0.4)', flexShrink: 0 }}>🔒</div>
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '17px', color: 'white', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Cipher<span style={{ color: '#34D399' }}>Sage</span>
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '9px', color: '#334155', letterSpacing: '0.1em' }}>LEARN · PLAY · EARN</div>
          </div>
        </a>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {[['About','#about'],['Game','#game'],['Fhenix.io ↗','https://fhenix.io']].map(([label, href]) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = label.includes('Fhenix') ? '#34D399' : 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}>
              {label}
            </a>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="#game" className="btn-glow" style={{ fontSize: '14px', padding: '10px 20px', borderRadius: '11px' }}>🎮 Play Now</a>
          <ConnectButton accountStatus="avatar" chainStatus="none" showBalance={false} />
        </div>
      </div>
    </nav>
  );
}
