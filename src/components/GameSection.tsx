'use client';

import { useState } from 'react';
import { topics, Topic, LevelData, getMaxScore, getBadgeInfo } from '@/data/questions';
import { QuizCard } from './QuizCard';
import { BadgeReveal } from './BadgeReveal';

type View = 'topics' | 'levels' | 'playing' | 'level-done' | 'complete';

const LVL_COLORS: Record<string, string> = { beginner: '#34D399', intermediate: '#FBBF24', master: '#F87171' };

export function GameSection() {
  const [view, setView]         = useState<View>('topics');
  const [topic, setTopic]       = useState<Topic | null>(null);
  const [lvData, setLvData]     = useState<LevelData | null>(null);
  const [qIdx, setQIdx]         = useState(0);
  const [total, setTotal]       = useState(0);
  const [lvScore, setLvScore]   = useState(0);
  const [doneKeys, setDoneKeys] = useState<Set<string>>(new Set());
  const [doneTops, setDoneTops] = useState<Set<number>>(new Set());

  const maxScore = getMaxScore();
  const pct  = Math.round((total / maxScore) * 100);
  const badge = getBadgeInfo(pct);

  const k    = (tid: number, lv: string) => `${tid}-${lv}`;
  const done = (tid: number, lv: string) => doneKeys.has(k(tid, lv));
  const lvUnlocked = (tid: number, li: number) => {
    if (li === 0) return true;
    const prev = topics.find(t => t.id === tid)?.levels[li - 1];
    return !!prev && done(tid, prev.level);
  };
  const topUnlocked = (tid: number) => tid === 1 || doneTops.has(tid - 1);

  function startLevel(lv: LevelData, li: number) {
    if (!topic || !lvUnlocked(topic.id, li)) return;
    setLvData(lv); setQIdx(0); setLvScore(0); setView('playing');
  }

  function onAnswer(correct: boolean, pts: number) {
    const ns = lvScore + pts, nt = total + pts;
    setLvScore(ns); setTotal(nt);
    if (qIdx < (lvData?.questions.length ?? 0) - 1) { setQIdx(q => q + 1); return; }
    const nd = new Set(doneKeys); nd.add(k(topic!.id, lvData!.level)); setDoneKeys(nd);
    const allDone = topic!.levels.every(l => nd.has(k(topic!.id, l.level)));
    let ndt = doneTops;
    if (allDone) { ndt = new Set(doneTops); ndt.add(topic!.id); setDoneTops(ndt); }
    const totalLvls = topics.reduce((s, t) => s + t.levels.length, 0);
    setView(nd.size === totalLvls ? 'complete' : 'level-done');
  }

  /* ─── TOPICS ─── */
  if (view === 'topics') return (
    <section id="game" style={{ padding: '80px 24px', background: 'linear-gradient(180deg, #05050f 0%, #08061a 100%)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="pill" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', color: '#A78BFA', marginBottom: '20px', display: 'inline-flex' }}>🎮 The Quest</span>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 'clamp(28px,4vw,50px)', color: 'white', letterSpacing: '-0.025em', marginBottom: '14px' }}>
            Choose Your <span className="text-purple-grad">Topic</span>
          </h2>
          <p style={{ color: '#64748B', fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.7 }}>
            7 topics · 3 levels each · 63 questions total. Complete in order to unlock the next.
          </p>

          {/* Score pill */}
          {total > 0 && (
            <div className="card" style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', padding: '12px 24px', marginTop: '20px', borderColor: `${badge.color}40` }}>
              <span style={{ fontSize: '24px' }}>{badge.emoji}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '14px', color: badge.color }}>{badge.rank}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#475569' }}>{total} / {maxScore} pts · {pct}%</div>
              </div>
              <div style={{ width: '80px' }}>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
              </div>
            </div>
          )}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {topics.map(t => {
            const unlocked = topUnlocked(t.id);
            const completed = doneTops.has(t.id);
            const doneLvl = t.levels.filter(l => done(t.id, l.level)).length;
            return (
              <div
                key={t.id}
                className={`topic-card ${completed ? 'completed' : ''} ${!unlocked ? 'locked' : ''}`}
                onClick={() => { if (unlocked) { setTopic(t); setView('levels'); } }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', background: `${t.color}15`, color: t.color }}>
                    {String(t.id).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '20px' }}>{!unlocked ? '🔒' : completed ? '✅' : t.emoji}</span>
                </div>

                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '16px', color: unlocked ? 'white' : '#334155', marginBottom: '6px' }}>{t.title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: '13px', color: unlocked ? '#64748B' : '#1E293B', lineHeight: 1.55, marginBottom: '18px' }}>{t.subtitle}</p>

                {/* Level bars */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                  {t.levels.map((l, li) => (
                    <div key={l.level} style={{ flex: 1, height: '3px', borderRadius: '99px', background: done(t.id, l.level) ? l.color : lvUnlocked(t.id, li) ? 'rgba(124,58,237,0.3)' : 'rgba(30,41,59,0.5)' }} />
                  ))}
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: '11px', color: '#334155' }}>
                  {!unlocked ? `🔒 Complete Topic ${t.id - 1} first` : `${doneLvl}/${t.levels.length} levels`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  /* ─── LEVELS ─── */
  if (view === 'levels' && topic) return (
    <section style={{ padding: '80px 24px', background: '#05050f', minHeight: '70vh' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <button onClick={() => setView('topics')} style={{ color: '#64748B', fontFamily: 'Inter', fontSize: '14px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'white')} onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}>
          ← All Topics
        </button>

        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className="float" style={{ fontSize: '48px', marginBottom: '12px' }}>{topic.emoji}</div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '30px', color: 'white', marginBottom: '6px' }}>{topic.title}</h2>
          <p style={{ color: '#64748B', fontFamily: 'Inter', fontSize: '15px' }}>{topic.subtitle}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {topic.levels.map((lv, li) => {
            const ld = done(topic.id, lv.level);
            const lu = lvUnlocked(topic.id, li);
            const c = LVL_COLORS[lv.level];
            const ptsEach = lv.level === 'beginner' ? 10 : lv.level === 'intermediate' ? 20 : 30;
            return (
              <div
                key={lv.level}
                className="card"
                style={{ padding: '20px 24px', cursor: lu ? 'pointer' : 'not-allowed', opacity: lu ? 1 : 0.4, borderColor: ld ? `${c}35` : 'rgba(124,58,237,0.18)', transition: 'all 0.25s' }}
                onClick={() => startLevel(lv, li)}
                onMouseEnter={e => { if (!lu) return; const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-3px)'; el.style.borderColor = `${c}50`; el.style.boxShadow = `0 10px 40px ${c}15`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.borderColor = ld ? `${c}35` : 'rgba(124,58,237,0.18)'; el.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontSize: '22px' }}>{lv.emoji}</span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '16px', color: c }}>{lv.label}</span>
                        {ld && <span className="pill" style={{ background: `${c}15`, border: `1px solid ${c}30`, color: c, fontSize: '10px', padding: '2px 8px' }}>✓ Done</span>}
                      </div>
                      <p style={{ fontFamily: 'Inter', fontSize: '12px', color: '#475569' }}>
                        {lv.level === 'beginner' && '3 Qs · Plain English · Noob-friendly'}
                        {lv.level === 'intermediate' && '3 Qs · Deeper concepts · Crypto-native'}
                        {lv.level === 'master' && '3 Qs · Technical depth · For builders'}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '17px', color: c }}>+{ptsEach}<span style={{ fontSize: '11px' }}>pts</span></div>
                    <div style={{ color: '#334155', fontSize: '11px', fontFamily: 'Inter', marginTop: '2px' }}>{!lu ? '🔒' : ld ? 'replay' : 'start →'}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  /* ─── PLAYING ─── */
  if (view === 'playing' && lvData) return (
    <section style={{ padding: '80px 24px', background: '#05050f', minHeight: '80vh' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
          <button onClick={() => setView('levels')} style={{ color: '#64748B', fontFamily: 'Inter', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'white')} onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}>← Exit</button>
          <span style={{ color: '#334155', fontFamily: 'Inter', fontSize: '12px' }}>{topic?.emoji} {topic?.title}</span>
          <span style={{ color: '#A78BFA', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '16px' }}>{total} pts</span>
        </div>
        <QuizCard question={lvData.questions[qIdx]} level={lvData.level} questionNumber={qIdx + 1} totalQuestions={lvData.questions.length} topicId={topic?.id ?? 1} onAnswer={onAnswer} />
      </div>
    </section>
  );

  /* ─── LEVEL DONE ─── */
  if (view === 'level-done') return (
    <section style={{ padding: '80px 24px', background: '#05050f', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <div className="float" style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
        <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '36px', color: 'white', marginBottom: '12px' }}>Level Complete!</h2>
        <p style={{ color: '#94A3B8', fontFamily: 'Inter', fontSize: '16px', marginBottom: '32px' }}>
          +<strong style={{ color: '#A78BFA' }}>{lvScore} points</strong> this round.
        </p>

        <div className="card" style={{ padding: '28px', marginBottom: '28px', borderColor: `${badge.color}40` }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>{badge.emoji}</div>
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '20px', color: badge.color, marginBottom: '4px' }}>{badge.rank}</div>
          <div style={{ color: '#64748B', fontFamily: 'Inter', fontSize: '13px', marginBottom: '16px' }}>{total} / {maxScore} pts · {pct}%</div>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setView('levels')} className="btn-glow" style={{ fontSize: '15px', padding: '13px 28px', borderRadius: '13px' }}>Continue Quest →</button>
          <button onClick={() => setView('topics')} className="btn-ghost" style={{ fontSize: '15px', padding: '12px 28px', borderRadius: '13px' }}>All Topics</button>
        </div>
      </div>
    </section>
  );

  if (view === 'complete') return <BadgeReveal totalScore={total} maxScore={maxScore} scorePercent={pct} />;
  return null;
}
