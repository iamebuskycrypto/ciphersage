'use client';

import { EXPLORER_BASE } from './contract';

export type AnswerPayload = {
  topicId:    number;
  levelId:    number;
  questionId: number;
  correct:    boolean;
  points:     number;
};

/**
 * Records a quiz answer via server-side relayer.
 * No wallet popup — fully automatic, zero friction for the user.
 */
export function useRecordAnswerAuto() {
  async function record(payload: AnswerPayload, onTxSent?: (hash: string) => void) {
    try {
      const res = await fetch('/api/record-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.hash) {
        console.log('[CipherSage] Auto-recorded on Arbitrum Sepolia:', data.hash);
        console.log(`[CipherSage] ${EXPLORER_BASE}/tx/${data.hash}`);
        onTxSent?.(data.hash);
      }
    } catch (err) {
      // Never crash the game
    }
  }

  return { record };
}
