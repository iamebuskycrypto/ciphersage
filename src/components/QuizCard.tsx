'use client';

import { useState } from 'react';
import { Question, Level, getPointsForLevel } from '@/data/questions';
import { playCorrect, playWrong } from '@/lib/sounds';
import { useRecordAnswerAuto } from '@/lib/useRecordAnswerAuto';

const META = {
  beginner:     { label: '🟢 Beginner',    color: '#34D399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.3)' },
  intermediate: { label: '🟡 Intermediate', color: '#FBBF24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)' },
  master:       { label: '🔴 Master',       color: '#F87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.3)' },
};

const LEVEL_ID: Record<Level, number> = { beginner: 0, intermediate: 1, master: 2 };

interface Props {
  question: Question; level: Level;
  questionNumber: number; totalQuestions: number;
  topicId: number;
  onAnswer: (correct: boolean, pts: number) => void;
}

export function QuizCard({ question, level, questionNumber, totalQuestions, topicId, onAnswer }: Props) {
  const [sel, setSel]       = useState<number | null>(null);
  const [shown, setShown]   = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [toastMsg, setToast]= useState<string | null>(null);

  const pts  = getPointsForLevel(level);
  const m    = META[level];
  const correct = sel === question.correctIndex;
  const pct  = (questionNumber / totalQuestions) * 100;

  const { record } = useRecordAnswerAuto();

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  }

  function pick(i: number) {
    if (sel !== null) return;
    setSel(i);
    setShown(true);
    const isCorrect = i === question.correctIndex;

    // Sound effect
    if (isCorrect) playCorrect(); else playWrong();

    // Fire on-chain tx (non-blocking)
    record(
      {
        topicId,
        levelId:    LEVEL_ID[level],
        questionId: questionNumber - 1,
        correct:    isCorrect,
        points:     isCorrect ? pts : 0,
      },
      (hash) => {
        setTxHash(hash);
        showToast(`🔒 Privately recorded on Fhenix! ${hash.slice(0, 8)}…`);
      }
    );
  }

  function next() {
    onAnswer(sel === question.correctIndex, correct ? pts : 0);
    setSel(null); setShown(false); setTxHash(null);
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>

      {/* Fhenix tx toast */}
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 999,
          background: 'rgba(8,6,26,0.95)',
          border: '1px solid rgba(124,58,237,0.4)',
          borderRadius: '14px', padding: '12px 18px',
          display: 'flex', alignItems: 'center', gap: '10px',
          boxShadow: '0 8px 32px rgba(124,58,237,0.25)',
          animation: 'fadeUp 0.3s ease',
          maxWidth: '320px',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34D399', flexShrink: 0, boxShadow: '0 0 8px #34D399' }} />
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '13px', color: 'white', marginBottom: '2px' }}>
              🔒 Privately recorded on Fhenix
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#64748B', marginBottom: '2px' }}>
              Encrypted with FHE · nobody can see your answer
            </div>
            <a
              href={`https://sepolia.arbiscan.io/tx/${txHash}`}
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'Inter', fontSize: '11px', color: '#A78BFA', textDecoration: 'none' }}
            >
              {toastMsg.split('!')[1]?.trim()} · View on explorer ↗
            </a>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="pill" style={{ background: m.bg, border: `1px solid ${m.border}`, color: m.color, fontSize: '12px' }}>{m.label}</span>
        <span style={{ color: '#475569', fontFamily: 'Inter', fontSize: '13px' }}>Q{questionNumber} of {totalQuestions}</span>
        <span className="pill" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', color: '#A78BFA', fontSize: '12px' }}>+{pts} pts</span>
      </div>

      {/* Card */}
      <div
        className="card"
        style={{
          padding: '36px 32px',
          borderColor: shown ? (correct ? 'rgba(52,211,153,0.4)' : 'rgba(248,113,113,0.4)') : 'rgba(124,58,237,0.2)',
          transition: 'border-color 0.3s ease',
        }}
      >
        {/* Illustration */}
        <div style={{ textAlign: 'center', fontSize: '56px', marginBottom: '24px', filter: 'drop-shadow(0 0 24px rgba(124,58,237,0.5))' }} className="float">
          {question.illustration}
        </div>

        {/* Question */}
        <p style={{ color: 'white', fontFamily: 'Inter', fontSize: '17px', lineHeight: 1.75, textAlign: 'center', marginBottom: '28px', fontWeight: 500 }}>
          {question.question}
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {question.options.map((opt, i) => {
            const isRight = shown && i === question.correctIndex;
            const isWrong = shown && i === sel && i !== question.correctIndex;
            return (
              <button
                key={i}
                className={`answer-btn ${isRight ? 'correct' : isWrong ? 'wrong' : ''}`}
                onClick={() => pick(i)}
                disabled={shown}
              >
                <span style={{
                  flexShrink: 0, width: '30px', height: '30px', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '12px',
                  background: isRight ? 'rgba(52,211,153,0.2)' : isWrong ? 'rgba(248,113,113,0.2)' : 'rgba(124,58,237,0.15)',
                  color: isRight ? '#34D399' : isWrong ? '#F87171' : '#A78BFA',
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span style={{ flex: 1 }}>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {shown && (
        <div
          className="fade-up"
          style={{
            borderRadius: '16px', padding: '20px 24px',
            background: correct ? 'rgba(52,211,153,0.06)' : 'rgba(251,191,36,0.06)',
            border: `1px solid ${correct ? 'rgba(52,211,153,0.3)' : 'rgba(251,191,36,0.3)'}`,
          }}
        >
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '22px', flexShrink: 0 }}>{correct ? '✅' : '💡'}</span>
            <div>
              <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '14px', color: correct ? '#34D399' : '#FBBF24', marginBottom: '8px' }}>
                {correct ? 'Correct! Great work.' : "Not quite — here's the insight:"}
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#94A3B8', lineHeight: 1.75 }}>
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next */}
      {shown && (
        <button
          onClick={next}
          className="btn-glow fade-up"
          style={{ width: '100%', fontSize: '16px', padding: '16px', borderRadius: '14px' }}
        >
          {questionNumber === totalQuestions ? '🏁 See My Results' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}
