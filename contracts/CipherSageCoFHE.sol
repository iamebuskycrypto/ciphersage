// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// CoFHE FHE library — works on Arbitrum Sepolia (chain 421614)
// TaskManager is already live at 0xeA30c4B8b44078Bbf8a6ef5b9f1eC1626C7848D9
import {FHE, euint32, euint8, InEuint8} from "@fhenixprotocol/cofhe-contracts/FHE.sol";

/**
 * CipherSageCoFHE
 * ─────────────────────────────────────────────────────────────────
 * Records CipherSage quiz answers on Arbitrum Sepolia using CoFHE.
 *
 * PRIVACY MODEL:
 *   • The player encrypts their answer (0 or 1) CLIENT-SIDE using
 *     @cofhe/sdk — the plaintext NEVER touches the blockchain.
 *
 *   • The contract receives an encrypted InEuint8 (ciphertext hash +
 *     ZK proof). It adds to the player's encrypted score without
 *     ever knowing if the answer was correct.
 *
 *   • FHE.add() runs on ciphertexts — CoFHE coprocessor computes
 *     off-chain and settles the result on Arbitrum Sepolia.
 *
 *   • Only the player can decrypt their own score using their permit.
 *
 * WHAT'S PUBLIC:
 *   • That a wallet address answered a specific topic/question
 *   • When they answered (timestamp)
 *   • Global stats (total players, total answers)
 *
 * WHAT'S PRIVATE (FHE-encrypted):
 *   • Whether each answer was correct or wrong
 *   • The player's score
 */
contract CipherSageCoFHE {

    // ── Encrypted state ───────────────────────────────────────────
    mapping(address => euint32) private _encScore;
    mapping(address => euint32) private _encAnswerCount;
    mapping(address => bool)    public  hasCompletedQuest;

    // ── Public state (non-sensitive) ──────────────────────────────
    uint256 public totalPlayers;
    uint256 public totalAnswersRecorded;

    // ── Events ────────────────────────────────────────────────────
    // Intentionally does NOT emit correct/wrong — that stays private
    event AnswerRecorded(
        address indexed player,
        uint8   topicId,
        uint8   levelId,
        uint8   questionId,
        uint256 timestamp
    );

    event QuestCompleted(
        address indexed player,
        uint256 timestamp
    );

    // ── Core function ─────────────────────────────────────────────

    /**
     * @param topicId        1–7
     * @param levelId        0=beginner 1=intermediate 2=master
     * @param questionId     0-indexed within the level
     * @param encCorrect     @cofhe/sdk encrypted uint8: 1=correct 0=wrong
     * @param maxPoints      Points possible (10, 20, or 30) — not sensitive
     */
    function recordAnswer(
        uint8           topicId,
        uint8           levelId,
        uint8           questionId,
        InEuint8 calldata encCorrect,
        uint16          maxPoints
    ) external {
        address player = msg.sender;

        // First ever answer — initialise encrypted accumulators
        if (!FHE.isInitialized(_encScore[player])) {
            _encScore[player]       = FHE.asEuint32(0);
            _encAnswerCount[player] = FHE.asEuint32(0);
            totalPlayers++;
        }

        // Convert encrypted input to euint8 (validates ZK proof on-chain)
        euint8 encBool = FHE.asEuint8(encCorrect);

        // Multiply encrypted (0 or 1) by maxPoints → encrypted points earned
        // CoFHE coprocessor computes this without knowing the plaintext
        euint32 encPts = FHE.mul(
            FHE.asEuint32(encBool),
            FHE.asEuint32(uint32(maxPoints))
        );

        // Accumulate encrypted score — never decrypted here
        _encScore[player] = FHE.add(_encScore[player], encPts);
        _encAnswerCount[player] = FHE.add(
            _encAnswerCount[player],
            FHE.asEuint32(1)
        );

        // Grant the contract ongoing access (needed for future FHE.add calls)
        FHE.allowThis(_encScore[player]);
        FHE.allowThis(_encAnswerCount[player]);

        // Grant the player decrypt access to their own score
        FHE.allow(_encScore[player], player);
        FHE.allow(_encAnswerCount[player], player);

        totalAnswersRecorded++;

        // Event reveals WHAT was answered, NOT whether it was correct
        emit AnswerRecorded(player, topicId, levelId, questionId, block.timestamp);
    }

    function recordQuestComplete() external {
        require(!hasCompletedQuest[msg.sender], "Already completed");
        hasCompletedQuest[msg.sender] = true;
        emit QuestCompleted(msg.sender, block.timestamp);
    }

    // ── Read (encrypted — only the player can decrypt) ────────────

    /**
     * Returns the encrypted score ciphertext hash.
     * The player decrypts it off-chain using @cofhe/sdk + their permit.
     */
    function getMyEncryptedScore(address player)
        external view
        returns (euint32)
    {
        return _encScore[player];
    }

    function getMyEncryptedAnswerCount(address player)
        external view
        returns (euint32)
    {
        return _encAnswerCount[player];
    }

    // ── Global stats (aggregate only, no individual data) ─────────
    function getGlobalStats()
        external view
        returns (uint256 players, uint256 answers)
    {
        return (totalPlayers, totalAnswersRecorded);
    }
}
