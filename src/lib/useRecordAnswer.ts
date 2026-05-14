'use client';

import { useWriteContract, useAccount, useSwitchChain } from 'wagmi';
import { TRACKER_ABI, TRACKER_ADDRESS, COFHE_CHAIN, EXPLORER_BASE } from './contract';

export type AnswerPayload = {
  topicId:    number;
  levelId:    number;   // 0=beginner 1=intermediate 2=master
  questionId: number;
  correct:    boolean;
  points:     number;
};

/**
 * Records a quiz answer on Arbitrum Sepolia (CoFHE chain).
 * Fire-and-forget — game never waits for tx confirmation.
 * No-op if contract address is still the zero placeholder.
 */
export function useRecordAnswer() {
  const { writeContract } = useWriteContract();
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  async function record(payload: AnswerPayload, onTxSent?: (hash: string) => void) {
    if (TRACKER_ADDRESS === '0x0000000000000000000000000000000000000000') return;
    if (!isConnected) return;

    // Auto-switch to Arbitrum Sepolia if needed
    if (chainId !== COFHE_CHAIN.id) {
      try { switchChain({ chainId: COFHE_CHAIN.id }); } catch { return; }
    }

    try {
      writeContract(
        {
          address: TRACKER_ADDRESS,
          abi: TRACKER_ABI,
          functionName: 'recordAnswer',
          args: [
            payload.topicId,
            payload.levelId,
            payload.questionId,
            payload.correct,
            payload.points,
          ],
        },
        {
          onSuccess(hash) {
            console.log('[CipherSage] Answer on Arbitrum Sepolia:', hash);
            console.log(`[CipherSage] ${EXPLORER_BASE}/tx/${hash}`);
            onTxSent?.(hash);
          },
          onError(err) {
            console.warn('[CipherSage] Could not record answer:', err.message);
          },
        }
      );
    } catch {
      // Never crash the game
    }
  }

  return { record };
}
