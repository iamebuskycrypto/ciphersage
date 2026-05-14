// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * CipherSageTracker — deployed on Fhenix Nitrogen Testnet
 *
 * Records every quiz answer as an on-chain event.
 * Tracks per-player scores and answer counts.
 *
 * UPGRADE PATH → FHE version:
 *   Replace `bool correct` with `inEuint8 encryptedAnswer`
 *   Use TFHE.add() to accumulate score on encrypted data.
 *   Nobody can see individual answers — only the final decrypted score.
 */
contract CipherSageTracker {

    // ── Events ──────────────────────────────────────────────────
    event AnswerRecorded(
        address indexed player,
        uint8   topicId,
        uint8   levelId,      // 0=beginner 1=intermediate 2=master
        uint8   questionId,
        bool    correct,
        uint16  pointsEarned,
        uint256 timestamp
    );

    event QuestCompleted(
        address indexed player,
        uint256 totalScore,
        uint256 answersCount,
        uint256 timestamp
    );

    // ── State ────────────────────────────────────────────────────
    mapping(address => uint256) public playerScore;
    mapping(address => uint256) public playerAnswerCount;
    mapping(address => bool)    public questCompleted;

    address public immutable deployer;
    uint256 public totalPlayers;
    uint256 public totalAnswersRecorded;

    constructor() {
        deployer = msg.sender;
    }

    // ── Write ────────────────────────────────────────────────────

    /**
     * Called each time a player answers a question.
     * Fires an on-chain event and updates their score.
     */
    function recordAnswer(
        uint8  topicId,
        uint8  levelId,
        uint8  questionId,
        bool   correct,
        uint16 points
    ) external {
        address player = msg.sender;

        // First answer ever — count as new player
        if (playerAnswerCount[player] == 0) {
            totalPlayers++;
        }

        if (correct) {
            playerScore[player] += points;
        }

        playerAnswerCount[player]++;
        totalAnswersRecorded++;

        emit AnswerRecorded(
            player,
            topicId,
            levelId,
            questionId,
            correct,
            correct ? points : 0,
            block.timestamp
        );
    }

    /**
     * Called when a player finishes all 63 questions.
     */
    function recordQuestComplete() external {
        address player = msg.sender;
        require(!questCompleted[player], "Already completed");
        questCompleted[player] = true;

        emit QuestCompleted(
            player,
            playerScore[player],
            playerAnswerCount[player],
            block.timestamp
        );
    }

    // ── Read ─────────────────────────────────────────────────────

    function getPlayerStats(address player)
        external view
        returns (uint256 score, uint256 answers, bool completed)
    {
        return (
            playerScore[player],
            playerAnswerCount[player],
            questCompleted[player]
        );
    }

    function getGlobalStats()
        external view
        returns (uint256 players, uint256 answers)
    {
        return (totalPlayers, totalAnswersRecorded);
    }
}
