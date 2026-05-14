import { arbitrumSepolia } from 'viem/chains';

// ── Network ──────────────────────────────────────────────────────
// CoFHE runs on Arbitrum Sepolia — no separate Fhenix chain needed.
// Users already have Arbitrum Sepolia in MetaMask from standard Web3.
export const COFHE_CHAIN = arbitrumSepolia; // chainId: 421614

// ── Contract address ─────────────────────────────────────────────
// Deploy CipherSageCoFHE.sol then run:  npm run deploy
// Paste the printed address here.
export const TRACKER_ADDRESS = '0x1165E75477E93a7dB9A8089e223ba47912dAfC22' as `0x${string}`;

export const EXPLORER_BASE = 'https://sepolia.arbiscan.io';

// ── ABI ──────────────────────────────────────────────────────────
// Matches deployed CipherSageTracker.sol
export const TRACKER_ABI = [
  {
    name: 'recordAnswer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'topicId',    type: 'uint8'  },
      { name: 'levelId',    type: 'uint8'  },
      { name: 'questionId', type: 'uint8'  },
      { name: 'correct',    type: 'bool'   },
      { name: 'points',     type: 'uint16' },
    ],
    outputs: [],
  },
  {
    name: 'getPlayerStats',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'player', type: 'address' }],
    outputs: [
      { name: 'score',   type: 'uint256' },
      { name: 'answers', type: 'uint256' },
    ],
  },
  {
    name: 'playerScore',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'totalPlayers',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'totalAnswersRecorded',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'AnswerRecorded',
    type: 'event',
    inputs: [
      { name: 'player',       type: 'address', indexed: true  },
      { name: 'topicId',      type: 'uint8',   indexed: false },
      { name: 'levelId',      type: 'uint8',   indexed: false },
      { name: 'questionId',   type: 'uint8',   indexed: false },
      { name: 'correct',      type: 'bool',    indexed: false },
      { name: 'pointsEarned', type: 'uint16',  indexed: false },
      { name: 'timestamp',    type: 'uint256', indexed: false },
    ],
  },
] as const;
