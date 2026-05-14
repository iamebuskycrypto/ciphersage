'use client';

/**
 * useRecordAnswerFHE — CoFHE edition
 *
 * Encrypts quiz answers client-side using @cofhe/sdk before they
 * hit the Arbitrum Sepolia blockchain. The contract never sees
 * plaintext — only ciphertext hashes + ZK proofs.
 */

import { useRef } from 'react';
import { useWriteContract, useAccount, useSwitchChain, usePublicClient, useWalletClient } from 'wagmi';
import { TRACKER_ABI, TRACKER_ADDRESS, COFHE_CHAIN, EXPLORER_BASE } from './contract';

// CoFHE SDK — loaded lazily to avoid SSR issues
type CofheSDK = typeof import('@cofhe/sdk');
let sdkCache: CofheSDK | null = null;
async function getSDK(): Promise<CofheSDK> {
  if (sdkCache) return sdkCache;
  sdkCache = await import('@cofhe/sdk');
  return sdkCache;
}

export type FHEAnswerPayload = {
  topicId:    number;
  levelId:    number;
  questionId: number;
  correct:    boolean;
  points:     number;
};

export function useRecordAnswerFHE() {
  const { writeContract }  = useWriteContract();
  const { isConnected, chainId, address } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const publicClient  = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const cofheClientRef = useRef<unknown>(null);

  async function getCofheClient() {
    if (cofheClientRef.current) return cofheClientRef.current;
    if (!publicClient || !walletClient) return null;

    try {
      const { createCofheClient, createCofheConfig } = await getSDK();
      const { chains } = await import('@cofhe/sdk/chains');

      const config = createCofheConfig({
        supportedChains: [chains.arbSepolia],
      });
      const client = createCofheClient(config);

      // Connect with viem clients directly
      await (client as any).connect(publicClient, walletClient);

      // Create permit so user can later decrypt their own score
      await (client as any).permits.getOrCreateSelfPermit();

      cofheClientRef.current = client;
      return client;
    } catch (err) {
      console.warn('[CipherSage CoFHE] Client init failed:', err);
      return null;
    }
  }

  async function record(payload: FHEAnswerPayload, onTxSent?: (hash: string) => void) {
    if (TRACKER_ADDRESS === '0x0000000000000000000000000000000000000000') return;
    if (!isConnected || !address) return;

    // Switch to Arbitrum Sepolia if needed
    if (chainId !== COFHE_CHAIN.id) {
      try { await switchChainAsync({ chainId: COFHE_CHAIN.id }); }
      catch { return; }
    }

    try {
      // ── 1. Encrypt answer client-side ───────────────────────────
      // plainValue: 1 = correct, 0 = wrong
      // This value is encrypted in the browser using CoFHE SDK.
      // The blockchain only receives a ciphertext hash + ZK proof.
      const sdk    = await getSDK();
      const client = await getCofheClient();
      if (!client) return;

      const plainValue = payload.correct ? 1 : 0;
      const [encryptedCorrect] = await (client as any)
        .encryptInputs([sdk.Encryptable.uint8(BigInt(plainValue))])
        .execute();

      // ── 2. Send encrypted tx to contract ────────────────────────
      writeContract(
        {
          address: TRACKER_ADDRESS,
          abi: TRACKER_ABI,
          functionName: 'recordAnswer',
          args: [
            payload.topicId,
            payload.levelId,
            payload.questionId,
            encryptedCorrect,
            payload.points,
          ],
        },
        {
          onSuccess(hash) {
            console.log('[CipherSage CoFHE] Private answer on Arbitrum Sepolia:', hash);
            console.log(`[CipherSage CoFHE] Explorer: ${EXPLORER_BASE}/tx/${hash}`);
            onTxSent?.(hash);
          },
          onError(err) {
            console.warn('[CipherSage CoFHE] tx failed:', err.message);
          },
        }
      );
    } catch (err) {
      console.warn('[CipherSage CoFHE] Encryption failed:', err);
    }
  }

  return { record };
}
