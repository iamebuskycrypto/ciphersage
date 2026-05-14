// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Deploy this on Fhenix Nitrogen via Remix:
//   1. Go to remix.ethereum.org
//   2. Install @fhenixprotocol/contracts via npm plugin or import directly
//   3. Compile & deploy to Fhenix Nitrogen (chain 8008148)

import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/access/Permissioned.sol";

/**
 * CipherSageTrackerFHE
 *
 * The privacy-native version of CipherSageTracker.
 *
 * HOW PRIVACY WORKS HERE:
 * ─────────────────────────────────────────────
 * • The player encrypts their answer (correct/wrong) CLIENT-SIDE using fhenixjs
 *   before it ever touches the blockchain.
 *
 * • The contract receives an ENCRYPTED boolean — it never knows if you got
 *   the question right or wrong. It just accumulates encrypted values.
 *
 * • FHE.add() computes your score ON ENCRYPTED DATA — no decryption needed.
 *
 * • Only the player themselves can call getMyScore() with their permit key
 *   to decrypt and see their own result.
 *
 * • Nobody else — not other players, not the contract owner, not even
 *   a blockchain explorer — can read individual answers.
 *
 * This is exactly what Fhenix is built for.
 */
contract CipherSageTrackerFHE is Permissioned {

    // ── Encrypted state ───────────────────────────────────────────
    // Nobody can read these directly — they're encrypted on-chain
    mapping(address => euint32) private _encScore;
    mapping(address => euint32) private _encAnswerCount;
    mapping(address => bool)    public  questCompleted;

    uint256 public totalPlayers;
    uint256 public totalAnswersRecorded;

    // ── Events ────────────────────────────────────────────────────
    // Note: we do NOT emit whether the answer was correct — that stays private
    event AnswerRecorded(
        address indexed player,
        uint8   topicId,
        uint8   levelId,
        uint8   questionId,
        uint256 timestamp
    );

    event QuestCompleted(address indexed player, uint256 timestamp);

    // ── Write ─────────────────────────────────────────────────────

    /**
     * @param topicId        Topic number (1–7)
     * @param levelId        0=beginner 1=intermediate 2=master
     * @param questionId     Question index within the level
     * @param encCorrect     FHE-encrypted uint8: 1 if correct, 0 if wrong
     *                       Encrypted CLIENT-SIDE by the player using fhenixjs.
     *                       The contract NEVER sees the plaintext value.
     * @param maxPoints      Points possible (10/20/30) — public, not sensitive
     */
    function recordAnswer(
        uint8          topicId,
        uint8          levelId,
        uint8          questionId,
        inEuint8 calldata encCorrect,
        uint16         maxPoints
    ) external {
        address player = msg.sender;

        if (!FHE.isInitialized(_encScore[player])) {
            // First answer — init encrypted accumulators to 0
            _encScore[player]       = FHE.asEuint32(0);
            _encAnswerCount[player] = FHE.asEuint32(0);
            totalPlayers++;
        }

        // Convert encrypted correct (0 or 1) to euint32
        euint8  encBool = FHE.asEuint8(encCorrect);
        euint32 encPts  = FHE.mul(FHE.asEuint32(encBool), FHE.asEuint32(uint32(maxPoints)));

        // Add to player's encrypted score — no decryption happens here
        _encScore[player]       = FHE.add(_encScore[player], encPts);
        _encAnswerCount[player] = FHE.add(_encAnswerCount[player], FHE.asEuint32(1));

        totalAnswersRecorded++;

        // Event reveals WHAT topic/question was answered, NOT whether it was correct
        emit AnswerRecorded(player, topicId, levelId, questionId, block.timestamp);
    }

    function recordQuestComplete() external {
        require(!questCompleted[msg.sender], "Already completed");
        questCompleted[msg.sender] = true;
        emit QuestCompleted(msg.sender, block.timestamp);
    }

    // ── Read (FHE-sealed — only the player can decrypt) ───────────

    /**
     * Returns your encrypted score, sealed with your public key.
     * Only YOU can decrypt this using fhenixjs on your device.
     * Anyone else calling this gets useless ciphertext.
     */
    function getMyScore(Permission calldata perm)
        external view
        onlySender(perm)
        returns (string memory)
    {
        return FHE.sealoutput(_encScore[msg.sender], perm.publicKey);
    }

    function getMyAnswerCount(Permission calldata perm)
        external view
        onlySender(perm)
        returns (string memory)
    {
        return FHE.sealoutput(_encAnswerCount[msg.sender], perm.publicKey);
    }

    // ── Public stats (aggregates only, no individual data) ────────
    function getGlobalStats()
        external view
        returns (uint256 players, uint256 answers)
    {
        return (totalPlayers, totalAnswersRecorded);
    }
}
