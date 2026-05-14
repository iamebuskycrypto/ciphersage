import { NextRequest, NextResponse } from 'next/server';
import { createWalletClient, createPublicClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { arbitrumSepolia } from 'viem/chains';
import { TRACKER_ABI, TRACKER_ADDRESS } from '@/lib/contract';

export async function POST(req: NextRequest) {
  try {
    const { topicId, levelId, questionId, correct, points } = await req.json();

    const privateKey = process.env.DEPLOYER_PRIVATE_KEY as `0x${string}`;
    if (!privateKey) {
      return NextResponse.json({ error: 'No relayer key configured' }, { status: 500 });
    }

    const account = privateKeyToAccount(privateKey);

    const publicClient = createPublicClient({
      chain: arbitrumSepolia,
      transport: http('https://sepolia-rollup.arbitrum.io/rpc'),
    });

    const walletClient = createWalletClient({
      account,
      chain: arbitrumSepolia,
      transport: http('https://sepolia-rollup.arbitrum.io/rpc'),
    });

    const hash = await walletClient.writeContract({
      address: TRACKER_ADDRESS,
      abi: TRACKER_ABI,
      functionName: 'recordAnswer',
      args: [topicId, levelId, questionId, correct, points],
    });

    console.log(`[CipherSage Relayer] Answer recorded: ${hash}`);

    return NextResponse.json({ success: true, hash });
  } catch (err: any) {
    console.error('[CipherSage Relayer] Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
