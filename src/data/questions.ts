export type Level = 'beginner' | 'intermediate' | 'master';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  illustration: string; // emoji or concept icon
}

export interface LevelData {
  level: Level;
  label: string;
  color: string;
  emoji: string;
  questions: Question[];
}

export interface Topic {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  levels: LevelData[];
}

export const topics: Topic[] = [
  {
    id: 1,
    title: "The Problem",
    subtitle: "Why Blockchain Privacy is Broken",
    emoji: "🔓",
    color: "#FF4444",
    levels: [
      {
        level: "beginner",
        label: "Beginner",
        color: "#00FF88",
        emoji: "🟢",
        questions: [
          {
            id: "1-b-1",
            question: "Imagine posting your bank statement publicly on Twitter for the whole world to see — your balance, every payment you've made, every person you've paid. That's basically what happens on Ethereum. What's the core problem with this?",
            options: [
              "Transactions cost too much gas fees",
              "Everyone can see your wallet balance, trades, and financial history",
              "Ethereum is too slow for most users",
              "Smart contracts are difficult to write"
            ],
            correctIndex: 1,
            explanation: "On Ethereum, every wallet address, balance, and transaction is permanently visible to anyone on the internet. Unlike your bank, there's zero privacy by default — competitors, bots, and strangers can all see exactly what you're doing.",
            illustration: "🌐"
          },
          {
            id: "1-b-2",
            question: "You're about to buy a token on a DEX. Before your transaction even confirms, a bot sees it, buys the same token first, drives the price up, and sells it back to you at a higher price. You lost money before you even knew what happened. This attack is called:",
            options: [
              "A rug pull",
              "A phishing attack",
              "Front-running (MEV)",
              "A 51% attack"
            ],
            correctIndex: 2,
            explanation: "This is MEV — Miner Extractable Value, also called front-running. Bots watch the public mempool (the waiting room for transactions), spot profitable trades, jump ahead of them, and pocket the difference. It extracts billions from regular DeFi users every year.",
            illustration: "🤖"
          },
          {
            id: "1-b-3",
            question: "A big investment bank wants to put $500 million into DeFi. Their lawyer asks one question: 'Will our trading positions, strategies, and counterparties be publicly visible to our competitors?' The answer on Ethereum today is 'yes.' What do they do?",
            options: [
              "They invest anyway because the yields are too good",
              "They use a VPN to hide their transactions",
              "They walk away — no institution exposes its strategy publicly",
              "They use a different cryptocurrency instead"
            ],
            correctIndex: 2,
            explanation: "This is exactly why trillions in institutional capital haven't entered DeFi. No serious financial institution will expose its trading strategy, positions, or counterparties publicly. Transparency, meant as a feature, became the biggest barrier to adoption.",
            illustration: "🏦"
          },
          {
            id: "1-b-4",
            question: "Your friend finds out your salary just by googling your name. That's embarrassing on social media — but on a blockchain, this happens with your ENTIRE financial life. What does a stranger actually see when they look up your Ethereum wallet on Etherscan?",
            options: [
              "Just your name and profile picture",
              "Every token you own, every trade you've made, your balance, who you've sent money to, and every DeFi protocol you've used",
              "Only your recent transactions from the past 30 days",
              "Nothing — wallets are anonymous by default"
            ],
            correctIndex: 1,
            explanation: "Your Ethereum wallet address is like a glass bank account. Anyone who knows your address — which can often be linked to your identity — can see your complete financial history. Every salary payment, every investment, every donation, every NFT purchase. Permanently. For free. This is the reality of on-chain transparency today.",
            illustration: "👁️"
          },
          {
            id: "1-b-5",
            question: "You use the same Ethereum address to donate to a charity AND to trade on a DEX. A curious person connects your charity donation to your trading wallet. Now they know your identity AND your trading strategy. What is this type of privacy problem called?",
            options: [
              "A hacking attack",
              "Wallet correlation — linking on-chain activity to reveal real-world identity and behavior patterns",
              "A Sybil attack",
              "Address spoofing"
            ],
            correctIndex: 1,
            explanation: "Wallet correlation is the most common privacy threat in crypto. Because all transactions from one address are publicly linked, connecting a wallet to a real identity (via a charity, an exchange KYC, or a public tweet) exposes everything. This is why privacy-conscious users manage multiple wallets — and why even that isn't a complete solution without protocol-level privacy.",
            illustration: "🔗"
          }
        ]
      },
      {
        level: "intermediate",
        label: "Intermediate",
        color: "#FFB800",
        emoji: "🟡",
        questions: [
          {
            id: "1-i-1",
            question: "MEV bots extracted over $1.38 billion from DeFi users in a single year. They can do this because Ethereum transactions sit in a public 'waiting room' before they confirm. What is this waiting room called?",
            options: [
              "The validator queue",
              "The mempool (memory pool)",
              "The gas market",
              "The consensus layer"
            ],
            correctIndex: 1,
            explanation: "The mempool is a public holding area where transactions wait to be included in a block. Anyone — including MEV bots — can see every pending transaction, its size, its target, and its expected outcome. This transparency enables systematic extraction from ordinary users.",
            illustration: "💾"
          },
          {
            id: "1-i-2",
            question: "A sandwich attack is a specific type of MEV. In a sandwich attack, the bot places one transaction BEFORE your trade and one AFTER it, 'sandwiching' you. What is the bot trying to achieve?",
            options: [
              "Validate your transaction faster for a fee",
              "Manipulate the price around your trade to profit from slippage",
              "Copy your trading strategy for future use",
              "Block your transaction from confirming"
            ],
            correctIndex: 1,
            explanation: "In a sandwich attack, the bot buys BEFORE you (pushing the price up), lets your trade execute at the inflated price, then immediately sells AFTER you (capturing the profit). You pay more than you should. The bot pockets the difference. This is pure extraction with zero value created.",
            illustration: "🥪"
          },
          {
            id: "1-i-4",
            question: "Imagine a poker game where everyone plays with their cards face-up on the table. That's what DeFi trading is like today. Which serious trading strategy CANNOT be executed safely on a public blockchain because of this?",
            options: [
              "Buying and holding Bitcoin long-term",
              "Large accumulation orders, arbitrage strategies, and liquidation hunting — because the moment your intent is visible, others front-run or copy it",
              "Sending stablecoins to a friend",
              "Minting an NFT"
            ],
            correctIndex: 1,
            explanation: "Professional trading strategies depend on information asymmetry — knowing something others don't, or executing before they can react. On a public blockchain, your strategy is visible before it executes. Large buy orders get front-run. Liquidation targets get hunted. Arbitrage gets stolen. This is why sophisticated traders avoid on-chain trading for anything sensitive.",
            illustration: "🃏"
          },
          {
            id: "1-i-5",
            question: "Block builders and validators on Ethereum have a privileged view of ALL pending transactions before they confirm. What special power does this give them that regular users don't have?",
            options: [
              "The ability to cancel transactions they don't like",
              "The ability to reorder, insert, or censor transactions within a block to extract maximum value — a practice called MEV (Maximal Extractable Value)",
              "The ability to reduce gas fees for themselves",
              "The ability to see user wallet private keys"
            ],
            correctIndex: 1,
            explanation: "Block builders see everything in the mempool and can arrange transactions in any order they choose. This means they can insert their own profitable transactions between yours, reorder trades to extract value, or even censor specific addresses. MEV is estimated to extract billions from users annually — and it's entirely enabled by the public nature of transaction ordering.",
            illustration: "⛏️"
          },
          {
            id: "1-i-3",
            question: "A hedge fund's on-chain portfolio is fully visible. A competitor can see every position in real-time. Why is this more dangerous in crypto than in traditional finance?",
            options: [
              "Crypto prices are more volatile",
              "On-chain data is permanent, real-time, and queryable by anyone with a free tool",
              "Hedge funds are not allowed in crypto",
              "Traditional finance also has full transparency"
            ],
            correctIndex: 1,
            explanation: "Unlike stock markets where large position disclosures have delays and legal protections, on-chain data is instantly public, permanent, and easily queryable with free tools like Etherscan. Any competitor can watch your entire strategy unfold in real time — permanently recorded for anyone to analyze.",
            illustration: "📊"
          }
        ]
      },
      {
        level: "master",
        label: "Master",
        color: "#FF4444",
        emoji: "🔴",
        questions: [
          {
            id: "1-m-4",
            question: "On-chain data analytics firms like Nansen and Arkham Intelligence make money by tracking and labeling wallet addresses. What does the existence of a thriving 'blockchain surveillance' industry tell us about Ethereum's privacy model?",
            options: [
              "That the blockchain industry is well-regulated",
              "That on-chain privacy is so absent that building a business around de-anonymizing users is trivially profitable — the data is that open",
              "That users consent to being tracked",
              "That surveillance is unique to Ethereum and other chains are private"
            ],
            correctIndex: 1,
            explanation: "When you can build a profitable company doing nothing but analyzing public blockchain data, it reveals how completely open that data is. These firms label wallets, track fund flows, and build identity graphs from freely available on-chain data. The fact that wallet surveillance is a multi-million dollar industry isn't a scandal — it's the expected outcome of building a fully transparent public ledger.",
            illustration: "🔭"
          },
          {
            id: "1-m-5",
            question: "A trader uses a 'privacy coin' like Monero for on-chain transactions. Why is this not a complete solution for DeFi privacy — even if the transactions themselves are private?",
            options: [
              "Monero is too slow for DeFi",
              "Privacy coins hide balances and senders but cannot execute programmable smart contract logic privately — you cannot build a private DEX, lending protocol, or derivatives market on Monero",
              "Monero transactions are too expensive",
              "Privacy coins are banned in all countries"
            ],
            correctIndex: 1,
            explanation: "Privacy coins like Monero shield transaction amounts and addresses — but they cannot run smart contracts. You cannot have a private on-chain DEX, lending protocol, or derivatives market on Monero. DeFi requires programmable logic executed on-chain. FHE is the only approach that enables both: programmable smart contracts AND encrypted data. Privacy coins and FHE solve different problems.",
            illustration: "🪙"
          },
          {
            id: "1-m-1",
            question: "From a cryptographic standpoint, what fundamental property does Ethereum currently lack that would make front-running structurally impossible — not just harder?",
            options: [
              "Faster block times",
              "More validators",
              "Transaction confidentiality at the mempool level",
              "Higher gas limits"
            ],
            correctIndex: 2,
            explanation: "Front-running is only possible because transaction intent is publicly visible before execution. If transactions were encrypted in the mempool — so validators could order them but not read their content — front-running would be cryptographically impossible. This is exactly what FHE-powered confidential mempools enable.",
            illustration: "🔐"
          },
          {
            id: "1-m-2",
            question: "Information asymmetry between MEV searchers and regular users exists because of Ethereum's design. Which statement best describes why this asymmetry is structural, not accidental?",
            options: [
              "MEV bots have faster internet connections",
              "Ethereum prioritizes gas price over transaction privacy, making intent visible before execution",
              "Regular users don't know how to use private mempools",
              "MEV is caused by miners colluding illegally"
            ],
            correctIndex: 1,
            explanation: "Ethereum's mempool is designed to be public and ordered by gas price — a deliberate design choice for decentralization. This makes transaction intent permanently visible to anyone running a node. MEV is not a bug or a hack; it's a natural consequence of building a transparent, public ordering system.",
            illustration: "⚖️"
          },
          {
            id: "1-m-3",
            question: "Why does public blockchain data create a compliance problem for institutions that private databases don't have — even if the institution is fully compliant?",
            options: [
              "Institutions don't have crypto wallets",
              "Regulatory bodies can see all trades without a court order",
              "Permanent, public exposure of trading strategies, counterparties, and positions violates confidentiality obligations to clients regardless of regulatory compliance",
              "Crypto is not legal for institutions"
            ],
            correctIndex: 2,
            explanation: "Institutions have fiduciary and contractual obligations to keep client strategies and positions confidential — separate from regulatory compliance. Even a fully compliant institution cannot put client funds on-chain when doing so permanently exposes client positions to competitors, bad actors, and the entire public. Compliance and confidentiality are different requirements.",
            illustration: "📋"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "What is FHE?",
    subtitle: "Fully Homomorphic Encryption Explained",
    emoji: "🔒",
    color: "#7B3FE4",
    levels: [
      {
        level: "beginner",
        label: "Beginner",
        color: "#00FF88",
        emoji: "🟢",
        questions: [
          {
            id: "2-b-1",
            question: "Imagine you have a locked box with rubber gloves built into the sides. You can reach inside the box and rearrange things WITHOUT ever opening the lock or seeing what's inside. FHE (Fully Homomorphic Encryption) works exactly like this. What does FHE let you do?",
            options: [
              "Encrypt and decrypt data very quickly",
              "Perform computations on encrypted data without ever decrypting it",
              "Share data securely between two parties",
              "Store data on a blockchain permanently"
            ],
            correctIndex: 1,
            explanation: "FHE — Fully Homomorphic Encryption — lets you run calculations on data that stays encrypted the entire time. The data goes in locked. The computation happens on the locked data. The result comes out locked. Nobody in the middle ever sees what's inside — not even the computer doing the work.",
            illustration: "📦"
          },
          {
            id: "2-b-2",
            question: "FHE was proven mathematically possible in 2009 by a PhD student named Craig Gentry. For decades before that, cryptographers thought computing on encrypted data was impossible. Why did it take so long to build after the math was proven?",
            options: [
              "The patent was owned by a corporation that blocked development",
              "Early FHE was millions of times slower than needed — computers weren't fast enough to run it usefully",
              "No one was interested in privacy technology",
              "The math only worked on paper, not in code"
            ],
            correctIndex: 1,
            explanation: "Craig Gentry's 2009 proof was a landmark — but the early implementation was so slow it was practically unusable. A single encrypted operation could take hours. For years, FHE was an academic curiosity. It took decades of optimization and new algorithms (especially TFHE) to make it fast enough for real applications.",
            illustration: "🎓"
          },
          {
            id: "2-b-3",
            question: "In simple terms, what is the key difference between regular encryption and Fully Homomorphic Encryption?",
            options: [
              "Regular encryption uses a key, FHE doesn't need one",
              "Regular encryption must be decrypted before you can do anything with the data; FHE lets you compute on data while it stays encrypted",
              "FHE is faster than regular encryption",
              "Regular encryption is more secure than FHE"
            ],
            correctIndex: 1,
            explanation: "With regular encryption (like your password manager or HTTPS), data must be decrypted before any computation — creating a window where it's exposed. FHE eliminates that window entirely. The data is never decrypted during processing. The computation happens in the encrypted 'dark.'",
            illustration: "🔑"
          },
          {
            id: "2-b-4",
            question: "Think of FHE like a chef cooking a meal inside a sealed, opaque bag. They can feel the ingredients through the bag, mix them, apply heat — and a perfect meal comes out — without ever opening the bag or seeing inside. Which real-world problem does this solve in the cloud computing era?",
            options: [
              "Making cloud servers faster",
              "Allowing cloud providers to process your private data (medical records, financial data, passwords) without ever being able to read it",
              "Reducing the cost of cloud storage",
              "Making cloud backups more reliable"
            ],
            correctIndex: 1,
            explanation: "Today, every cloud service (Google, AWS, Microsoft Azure) must decrypt your data to process it — meaning they can technically read everything you store or compute. FHE makes this unnecessary: the cloud processes your encrypted data and returns an encrypted result. The cloud provider never sees your data at any point. This is a fundamental shift in cloud privacy.",
            illustration: "☁️"
          },
          {
            id: "2-b-5",
            question: "Your doctor needs to run an AI diagnosis algorithm on your medical records. You don't want the AI company to see your records. With FHE, which outcome is possible?",
            options: [
              "The AI company sees your records but promises not to store them",
              "You get a diagnosis AND the AI company never sees your actual medical data — only encrypted inputs",
              "You must trust a neutral third party to handle your records",
              "The diagnosis is less accurate because the data is encrypted"
            ],
            correctIndex: 1,
            explanation: "FHE enables 'blind computation' — the algorithm runs on your encrypted medical data and returns an encrypted result only you can decrypt. The AI company sees only ciphertext at every step. This is what makes FHE revolutionary for healthcare, finance, and any domain where sensitive data must be processed by parties you don't fully trust.",
            illustration: "🏥"
          }
        ]
      },
      {
        level: "intermediate",
        label: "Intermediate",
        color: "#FFB800",
        emoji: "🟡",
        questions: [
          {
            id: "2-i-1",
            question: "TFHE — Fast Fully Homomorphic Encryption over the Torus — was a breakthrough that made FHE practical. What was its key innovation over earlier FHE schemes?",
            options: [
              "It used smaller encryption keys",
              "It dramatically reduced the cost of the 'bootstrapping' operation, making gate-by-gate computation fast enough for real use",
              "It eliminated the need for encryption keys entirely",
              "It worked on GPUs instead of CPUs"
            ],
            correctIndex: 1,
            explanation: "The bottleneck in early FHE was 'bootstrapping' — a noisy refresh operation required after each computation. TFHE optimized bootstrapping to run in milliseconds instead of seconds, making it possible to chain millions of operations in reasonable time. This turned FHE from academic theory into a practical engineering tool.",
            illustration: "⚡"
          },
          {
            id: "2-i-2",
            question: "FHE is called 'homomorphic' because it preserves mathematical structure through encryption. In plain English, what does this mean?",
            options: [
              "The ciphertext looks the same as the plaintext",
              "Mathematical operations on encrypted values produce encrypted results that correspond to the same operations on the original values",
              "The encryption key never changes",
              "Encrypted data can be shared between different encryption systems"
            ],
            correctIndex: 1,
            explanation: "Homomorphic means 'structure-preserving.' If you encrypt 5 and encrypt 3, then add the encrypted values, you get an encrypted result that decrypts to 8. The math works through the encryption layer. This is what makes computation-on-encrypted-data possible — the operations produce meaningful results without ever touching the plaintext.",
            illustration: "🧮"
          },
          {
            id: "2-i-4",
            question: "A hospital in Nigeria wants to run cancer screening AI on patient data, but the AI model is owned by a US company. With FHE, what becomes possible that was previously impossible without a data sharing agreement?",
            options: [
              "The hospital gets free access to the AI model",
              "The hospital encrypts patient data, sends it to the US company's AI, gets encrypted results back — patient data never leaves Nigeria in plaintext, no data sharing agreement needed",
              "The US company moves its servers to Nigeria",
              "Patients must consent to international data transfer"
            ],
            correctIndex: 1,
            explanation: "Cross-border data processing is one of the most legally complex challenges in global healthcare and finance. GDPR, HIPAA, and local data sovereignty laws create massive barriers. FHE dissolves this problem: encrypted patient data can be processed by foreign AI without ever leaving the jurisdiction in usable form. No data sharing agreement needed — the cryptography enforces privacy by default.",
            illustration: "🌍"
          },
          {
            id: "2-i-5",
            question: "FHE lets two competing banks jointly compute fraud detection on their combined transaction data — without either bank seeing the other's customer data. What is this type of FHE application called?",
            options: [
              "Blockchain banking",
              "Privacy-preserving collaborative analytics — jointly computing on combined private datasets without any party seeing the other's raw data",
              "Open banking",
              "Federated learning"
            ],
            correctIndex: 1,
            explanation: "Two banks seeing each other's customer data is competitively and legally impossible. But fraud networks span both banks — cooperation would catch more fraud. FHE enables a third option: both banks encrypt their data, the encrypted datasets are jointly processed, and each bank gets fraud signals without either ever accessing the other's raw records. This is privacy-preserving collaborative analytics.",
            illustration: "🏦"
          },
          {
            id: "2-i-3",
            question: "Why is FHE considered one of the most important cryptographic breakthroughs of the century — even by researchers at Google, Microsoft, and MIT?",
            options: [
              "It makes encryption faster than ever before",
              "It solves the fundamental privacy paradox: enabling computation on sensitive data without exposing it to the party doing the computation",
              "It replaces all existing encryption standards",
              "It makes quantum computers unnecessary"
            ],
            correctIndex: 1,
            explanation: "For centuries, computing on data required possessing it. FHE breaks this link permanently. A cloud server can process your medical data without ever seeing it. A blockchain can compute on your financial position without revealing it. This fundamentally changes what's possible in privacy-preserving computing — which is why the world's top cryptographers consider it a generational breakthrough.",
            illustration: "🌟"
          }
        ]
      },
      {
        level: "master",
        label: "Master",
        color: "#FF4444",
        emoji: "🔴",
        questions: [
          {
            id: "2-m-4",
            question: "In FHE, encrypted data is called a 'ciphertext' and the noise grows with each operation. Why does more noise eventually become a problem even if you can't see it in the encrypted output?",
            options: [
              "Noise makes ciphertexts larger and harder to store",
              "When accumulated noise exceeds the decryption threshold, the decryption algorithm produces a wrong plaintext — the result is silently corrupted without any error signal",
              "Noise slows down FHE computations exponentially",
              "Noise can be detected and removed without bootstrapping"
            ],
            correctIndex: 1,
            explanation: "FHE noise is invisible during computation — the ciphertext looks valid throughout. But if noise accumulates beyond the scheme's tolerance, decryption produces a wrong answer with no indication anything went wrong. This silent corruption is why bootstrapping (noise refreshing) is not optional for deep computations — it's a fundamental correctness requirement, not just a performance optimization.",
            illustration: "📡"
          },
          {
            id: "2-m-5",
            question: "Fhenix uses TFHE (Fast FHE over the Torus) rather than BFV or CKKS. In what class of applications does TFHE's gate-by-gate approach outperform batch-oriented schemes like CKKS?",
            options: [
              "Large matrix multiplications for AI training",
              "Arbitrary boolean logic and branching — programs with if/else conditions, comparisons, and non-linear operations — because TFHE bootstraps per-gate while CKKS cannot handle non-polynomial operations natively",
              "Floating point arithmetic at high precision",
              "Batch processing of many independent values in parallel"
            ],
            correctIndex: 1,
            explanation: "CKKS excels at approximate arithmetic on packed vectors — great for neural network inference with floating-point weights. But CKKS struggles with non-polynomial operations like comparisons and branching. TFHE handles arbitrary boolean circuits gate-by-gate, making it ideal for programs with conditional logic — the kind of general-purpose computation smart contracts require. Fhenix's choice of TFHE reflects smart contract requirements, not pure performance metrics.",
            illustration: "⚙️"
          },
          {
            id: "2-m-1",
            question: "What is 'bootstrapping' in FHE, and why is it necessary?",
            options: [
              "The initial setup of encryption keys before computations begin",
              "A noise-reduction operation that refreshes ciphertext after too many homomorphic operations, preventing decryption failure as accumulated noise exceeds the threshold",
              "The process of converting plaintext to ciphertext before computation",
              "A method of parallelizing FHE operations across multiple processors"
            ],
            correctIndex: 1,
            explanation: "Each homomorphic operation adds noise to the ciphertext. Accumulate too much noise and the ciphertext can no longer be correctly decrypted. Bootstrapping 'refreshes' the ciphertext — reducing noise — so computation can continue indefinitely. Gentry's 2009 proof showed bootstrapping was possible; TFHE made it fast enough to be practical.",
            illustration: "🔄"
          },
          {
            id: "2-m-2",
            question: "TFHE operates over the 'Torus' — a specific algebraic structure. What advantage does this provide compared to earlier LWE-based FHE schemes?",
            options: [
              "It supports larger encryption keys",
              "Torus arithmetic enables gate bootstrapping in ~13ms, allowing arbitrary boolean circuit evaluation with amortized constant overhead per gate",
              "It eliminates the need for public key infrastructure",
              "It makes ciphertexts smaller in storage size"
            ],
            correctIndex: 1,
            explanation: "The RLWE-over-Torus structure in TFHE enables a unique trick: bootstrapping can be performed simultaneously with the homomorphic gate evaluation itself, in ~13ms. This collapses what were two expensive operations into one efficient step, making TFHE asymptotically and practically faster than Ring-LWE schemes for boolean circuit evaluation.",
            illustration: "🔢"
          },
          {
            id: "2-m-3",
            question: "What is the fundamental security assumption underlying TFHE, and why does it matter for long-term cryptographic security?",
            options: [
              "Discrete logarithm hardness — the same as ECDSA",
              "Learning With Errors (LWE) hardness, which is believed to be quantum-resistant because no known quantum algorithm breaks it efficiently",
              "RSA factoring hardness — the same as TLS",
              "AES security — symmetric key strength"
            ],
            correctIndex: 1,
            explanation: "TFHE's security rests on the hardness of Learning With Errors (LWE) and Ring-LWE problems. Crucially, the best known quantum algorithms (including Shor's algorithm) do not efficiently solve LWE. This makes TFHE — and FHE in general — a post-quantum cryptographic primitive, providing long-term security even in a world with powerful quantum computers.",
            illustration: "⚛️"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "FHE vs ZK vs MPC",
    subtitle: "The Privacy Toolkit Explained",
    emoji: "⚔️",
    color: "#00D4FF",
    levels: [
      {
        level: "beginner",
        label: "Beginner",
        color: "#00FF88",
        emoji: "🟢",
        questions: [
          {
            id: "3-b-1",
            question: "A ZK (Zero-Knowledge) proof is like telling someone 'I know the secret password' without actually saying the password out loud — and they can verify you're telling the truth. What is the main use of ZK proofs in blockchain?",
            options: [
              "To make transactions faster",
              "To prove something is true without revealing the underlying information",
              "To store data off-chain cheaply",
              "To create new cryptocurrencies"
            ],
            correctIndex: 1,
            explanation: "ZK proofs let you prove a statement (like 'my balance is above $1000' or 'I'm over 18') without revealing the actual data. They're powerful for verification — but they're designed to prove things happened correctly, not to enable ongoing computation on private data.",
            illustration: "🪄"
          },
          {
            id: "3-b-2",
            question: "MPC (Multi-Party Computation) is like splitting a secret recipe between 3 chefs. No single chef knows the full recipe, but together they can cook the dish. What's the main challenge with MPC in practice?",
            options: [
              "MPC requires too much storage space",
              "All participating parties must be online and communicating simultaneously, creating coordination complexity",
              "MPC only works with 2 parties maximum",
              "MPC cannot handle numerical computations"
            ],
            correctIndex: 1,
            explanation: "MPC distributes computation across multiple parties so no single party sees the full data. But it requires constant coordination — all parties must communicate during every step of the computation. If anyone goes offline or is compromised, the whole process can fail. This coordination overhead makes MPC expensive and complex at scale.",
            illustration: "👥"
          },
          {
            id: "3-b-4",
            question: "Your friend says: 'I already use Tornado Cash to keep my crypto private — why do I need FHE?' What's the key difference between a mixer like Tornado Cash and FHE?",
            options: [
              "Tornado Cash is faster and cheaper",
              "Tornado Cash hides WHERE money goes after withdrawal but doesn't let you compute privately on-chain — FHE lets you trade, lend, and vote with data that stays encrypted throughout the entire operation",
              "There is no difference — both provide the same privacy",
              "Tornado Cash is legal while FHE is not"
            ],
            correctIndex: 1,
            explanation: "Mixers like Tornado Cash break the transaction trail — they hide the link between deposit and withdrawal. But after withdrawal, your on-chain activity is public again. And mixers can't make a DEX trade, a loan, or a vote private. FHE is fundamentally different: it enables private computation, not just private transfers. The data stays encrypted while complex logic executes on it.",
            illustration: "🌀"
          },
          {
            id: "3-b-5",
            question: "A voting system uses ZK proofs to let you prove you're a registered voter without revealing your identity. But there's still a problem: tallying all votes requires decrypting them one by one, and each vote is visible during tallying. What would FHE add to fix this?",
            options: [
              "Faster tallying speed",
              "Homomorphic tallying — votes are added together while encrypted, and only the final total is decrypted, so individual votes are NEVER revealed even during counting",
              "Better voter anonymity at registration",
              "Cheaper deployment of the voting contract"
            ],
            correctIndex: 1,
            explanation: "ZK proves you're eligible to vote without revealing who you are. But if each encrypted vote must be decrypted to count it, vote privacy breaks at tallying time. FHE enables homomorphic tallying: encrypted votes are summed together mathematically while still encrypted. Only the final total is decrypted. Individual votes are permanently private — nobody ever sees them, not even the tally operator.",
            illustration: "🗳️"
          },
          {
            id: "3-b-3",
            question: "You have private medical data and want a doctor to analyze it without seeing the raw data. Which technology is BEST suited for this — allowing full computation on the data while it stays encrypted throughout?",
            options: [
              "ZK Proofs — they hide data during verification",
              "MPC — multiple parties split the computation",
              "FHE — computation happens directly on encrypted data, no decryption ever needed",
              "Regular encryption — just use a strong password"
            ],
            correctIndex: 2,
            explanation: "For computing on private data without any party ever seeing it, FHE is the right tool. ZK proves things about data without revealing it, but isn't designed for arbitrary computation. MPC splits data across parties but requires coordination and trust in the group. FHE enables the computation to happen in the encrypted 'dark' from start to finish.",
            illustration: "🏥"
          }
        ]
      },
      {
        level: "intermediate",
        label: "Intermediate",
        color: "#FFB800",
        emoji: "🟡",
        questions: [
          {
            id: "3-i-1",
            question: "ZK proofs are excellent for rollups (like zkSync, StarkNet) because they compress many transactions into one proof. But ZK has a fundamental limitation for DeFi privacy. What is it?",
            options: [
              "ZK proofs are too expensive to generate",
              "ZK proves a computation was done correctly but doesn't keep the input data private during the computation itself",
              "ZK only works on Ethereum, not other chains",
              "ZK proofs expire after a certain time period"
            ],
            correctIndex: 1,
            explanation: "ZK proofs are about verification of correctness, not confidentiality of computation. In a ZK system, the prover still sees all the data while generating the proof. The verifier doesn't see it — but the computation itself isn't private. For DeFi use cases where even the computing nodes shouldn't see user data, ZK alone isn't enough.",
            illustration: "📝"
          },
          {
            id: "3-i-2",
            question: "Fhenix uses 'Verifiable FHE' — combining FHE with ZK proofs. Why does FHE need ZK proofs added on top?",
            options: [
              "To make FHE faster",
              "Pure FHE provides privacy but no proof that computations were executed correctly — ZK adds verifiability so users can trust the result",
              "ZK makes FHE cheaper to compute",
              "To support more programming languages"
            ],
            correctIndex: 1,
            explanation: "FHE keeps data private during computation — but without verification, how do you know the encrypted result is correct? An FHE node could produce a wrong answer. Adding ZK proofs to FHE gives you both: the data stays encrypted (FHE) AND you can verify the computation was done correctly without seeing the data (ZK). That's Verifiable FHE.",
            illustration: "✅"
          },
          {
            id: "3-i-4",
            question: "A company wants to prove to a regulator that their trades don't violate any sanctions — without showing their entire trading book. Which combination of technologies makes this possible?",
            options: [
              "Just FHE — encrypt everything",
              "ZK proofs generate a proof that the trades satisfy compliance rules without revealing trade details; FHE keeps the underlying data encrypted throughout — together they give regulators what they need without exposing business secrets",
              "MPC — split the data between the regulator and the company",
              "Regular encryption with the regulator holding a decryption key"
            ],
            correctIndex: 1,
            explanation: "Regulators need proof of compliance. Companies need confidentiality. ZK proofs let you prove 'none of my trades involved sanctioned entities' without showing which entities you did trade with. FHE keeps the actual trade data encrypted so even the proof generation never exposes it. This is the compliance-privacy combination that makes institutional DeFi legally viable.",
            illustration: "📜"
          },
          {
            id: "3-i-5",
            question: "Trusted Execution Environments (TEEs) like Intel SGX are used as a privacy solution — they run code in a secure 'enclave.' What is the fundamental trust difference between a TEE and FHE?",
            options: [
              "TEEs are software-based while FHE is hardware-based",
              "TEEs require trusting Intel (or AMD) not to have backdoors or vulnerabilities in their chips; FHE requires trusting only mathematics — the LWE hardness assumption, with no hardware manufacturer in the trust chain",
              "TEEs are faster than FHE for all operations",
              "There is no meaningful difference in practice"
            ],
            correctIndex: 1,
            explanation: "TEE security depends on Intel or AMD chips having no backdoors — and history shows they sometimes do (Spectre, Meltdown, SGX side-channels). FHE's security depends on a mathematical problem — Learning With Errors — which has no hardware attack surface. You're trusting math, not a chip manufacturer. For adversaries with nation-state resources, this distinction is everything.",
            illustration: "💻"
          },
          {
            id: "3-i-3",
            question: "Think of a tax accountant analogy: you show your accountant your financial records, they compute your taxes, and you trust the result. In crypto terms, this is like MPC — you need to trust the computing parties. How does FHE change this?",
            options: [
              "FHE uses more accountants to distribute trust",
              "FHE lets you submit your encrypted records and get the computed result back — the accountant (network) never sees your data at all, eliminating trust requirements",
              "FHE makes the accountant legally liable for data breaches",
              "FHE encrypts the result but not the input"
            ],
            correctIndex: 1,
            explanation: "With MPC (the accountant model), you're distributing trust across multiple parties — but you're still trusting them. With FHE, the computing party never sees your data. The network computes on ciphertext. You decrypt the result with your key. There's no trust requirement because there's nothing for the computing party to betray — they never had access to your data.",
            illustration: "🧾"
          }
        ]
      },
      {
        level: "master",
        label: "Master",
        color: "#FF4444",
        emoji: "🔴",
        questions: [
          {
            id: "3-m-4",
            question: "A DeFi protocol wants to offer 'private limit orders' — orders that execute at a specific price without revealing the target price or amount to other traders. Why can ZK proofs alone not implement this feature?",
            options: [
              "ZK proofs are too slow for real-time order matching",
              "A ZK proof can prove an order is valid but cannot hide the order parameters from the matching engine — the engine must know the price and size to match orders, which exposes the data; FHE lets the matching engine compare encrypted orders without knowing their values",
              "Limit orders require too many ZK proof operations",
              "ZK proofs cannot work with order book protocols"
            ],
            correctIndex: 1,
            explanation: "Private order matching requires the engine to compare prices (is bid ≥ ask?) without knowing the actual prices. ZK can prove the comparison result is correct but still needs to know the values to perform the comparison. FHE enables the comparison on encrypted values — the engine computes 'encrypted_bid ≥ encrypted_ask' and gets an encrypted true/false result without ever seeing bid or ask prices. Only FHE can do this.",
            illustration: "📈"
          },
          {
            id: "3-m-5",
            question: "What is the 'collusion threshold' problem in MPC, and why does FHE completely bypass it?",
            options: [
              "MPC is expensive when many parties are involved",
              "In MPC, if enough parties collude (above the threshold t in a t-of-n scheme), they can reconstruct secret data; FHE has no collusion threshold because the data is NEVER split across parties — it remains encrypted, and no collusion between computing nodes reveals it",
              "MPC parties can be bribed to reveal data",
              "The collusion threshold limits the number of MPC parties"
            ],
            correctIndex: 1,
            explanation: "MPC security depends on fewer than t parties being compromised or colluding simultaneously. Set t too low and small collusions break privacy; set it too high and availability suffers. FHE eliminates this tradeoff: computing nodes never hold secret shares — they operate on ciphertexts throughout. There is no 'enough colluding nodes to recover the secret' scenario because no node ever has a piece of the secret.",
            illustration: "🤝"
          },
          {
            id: "3-m-1",
            question: "In a 'glove box' analogy for FHE: the data is inside a sealed box, the computation happens via gloves built into the sides, and the result stays inside until you unlock it. What does this analogy reveal that MPC and ZK cannot provide?",
            options: [
              "Speed advantage over other privacy methods",
              "The computing party has zero access to plaintext at any point — not during input, not during computation, not during output — which neither MPC nor ZK alone achieves",
              "The ability to compute on multiple datasets simultaneously",
              "Lower computational cost than alternative approaches"
            ],
            correctIndex: 1,
            explanation: "In MPC, parties see their share of the data. In ZK, the prover sees the data. In FHE, NOBODY sees the data during computation — not the network, not the validators, not the protocol. The glove box analogy captures this perfectly: you can manipulate what's inside without ever opening the box or seeing its contents. This is a qualitatively different privacy guarantee.",
            illustration: "🧤"
          },
          {
            id: "3-m-2",
            question: "Why can't ZK proofs alone solve the MEV front-running problem on a decentralized exchange?",
            options: [
              "ZK proofs are too slow for DEX transactions",
              "ZK proofs hide the proof verification data but the transaction intent (what you're trading, how much) must still be visible to generate the proof — validators can still see and exploit it",
              "DEXes don't support ZK proof verification",
              "ZK proofs require centralized proof generation"
            ],
            correctIndex: 1,
            explanation: "For a ZK proof of a DEX transaction, the prover must know the trade details to generate the proof. But if transaction details are visible to any network participant during proof generation or ordering, front-running remains possible. FHE-encrypted transaction intents can be ordered by validators without being read — making front-running impossible even for validators.",
            illustration: "🛡️"
          },
          {
            id: "3-m-3",
            question: "What is the theoretical completeness advantage of Verifiable FHE (FHE + ZK) over either technology alone for building a fully private, trustless smart contract platform?",
            options: [
              "It's faster than FHE or ZK alone",
              "FHE provides input and computation privacy (data never decrypted); ZK provides output correctness verification (result is provably accurate) — together they give a complete trustless privacy guarantee that neither can provide alone",
              "It reduces gas costs for private transactions",
              "It enables cross-chain privacy without bridges"
            ],
            correctIndex: 1,
            explanation: "A complete private computation system needs two guarantees: (1) the data is never exposed during computation (FHE), and (2) the output can be verified as correct without trusting the computing party (ZK). Alone, FHE gives privacy but not verifiability; ZK gives verifiability but not full input privacy. Combined, they form a theoretically complete trustless private computation primitive.",
            illustration: "🏆"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "How CoFHE Works",
    subtitle: "Fhenix's Architecture Deep Dive",
    emoji: "⚙️",
    color: "#9D6FF0",
    levels: [
      {
        level: "beginner",
        label: "Beginner",
        color: "#00FF88",
        emoji: "🟢",
        questions: [
          {
            id: "4-b-1",
            question: "CoFHE is Fhenix's key innovation. Think of it like a privacy plugin that attaches to any Ethereum-compatible blockchain. What does 'CoFHE' stand for?",
            options: [
              "Collaborative Fully Homomorphic Engine",
              "Coprocessor for Fully Homomorphic Encryption",
              "Combined FHE Layer",
              "Cryptographic Off-chain FHE Engine"
            ],
            correctIndex: 1,
            explanation: "CoFHE stands for Coprocessor for Fully Homomorphic Encryption. Just like a GPU is a coprocessor that handles graphics separately from your main CPU, CoFHE is a specialized coprocessor that handles FHE computations alongside any EVM-compatible blockchain — without requiring you to switch chains or rewrite contracts.",
            illustration: "🔌"
          },
          {
            id: "4-b-2",
            question: "A developer wants to add privacy to an existing Ethereum smart contract using Fhenix's CoFHE. How much code do they need to change?",
            options: [
              "They need to rewrite the entire contract from scratch",
              "They need to migrate to a completely new blockchain",
              "They add a single import line to their existing Solidity contract",
              "They need to learn a new programming language"
            ],
            correctIndex: 2,
            explanation: "This is one of CoFHE's most powerful features: developer experience. Adding FHE privacy to an existing smart contract requires just one Solidity import. The contract stays on its existing chain (Ethereum, Arbitrum, Base). The CoFHE coprocessor handles all the encryption automatically in the background.",
            illustration: "👨‍💻"
          },
          {
            id: "4-b-4",
            question: "A Solidity developer wants to add FHE to their existing token contract on Arbitrum. With Fhenix's CoFHE, what does the migration look like?",
            options: [
              "Rewrite the entire contract in a new language and deploy on a new chain",
              "Add one import line: `import '@fhenixprotocol/cofhe-contracts/FHE.sol';` — and use encrypted types like `euint32` instead of `uint32` for sensitive values",
              "Set up a separate FHE server to handle encryption outside the contract",
              "Apply to Fhenix for a special developer license"
            ],
            correctIndex: 1,
            explanation: "Fhenix's developer experience is designed to be as frictionless as possible. Developers import FHE.sol (just like importing OpenZeppelin), replace sensitive variable types with encrypted equivalents (uint32 → euint32, bool → ebool), and use FHE operations (FHE.add, FHE.mul) instead of native operators. The contract stays on Arbitrum. CoFHE handles encryption in the background.",
            illustration: "🛠️"
          },
          {
            id: "4-b-5",
            question: "You're playing an on-chain card game built with CoFHE. You draw a card from the deck. The smart contract needs to know you got a valid card — but your opponents and the game server should NOT see which card you got. How does CoFHE enable this?",
            options: [
              "The game server is trusted to keep cards secret",
              "Your card is stored as an encrypted value (euint8) in the smart contract — only you can decrypt it with your key, while the contract can still verify game rules like 'this is a valid card' without revealing the card to others",
              "Cards are revealed to all players after the round ends",
              "The game runs off-chain and results are submitted on-chain"
            ],
            correctIndex: 1,
            explanation: "In a CoFHE card game, your hand is a set of encrypted values in the contract. The contract can compute game logic (is this a valid play? who wins this round?) on encrypted hands using FHE operations. Only you can decrypt your own cards using your wallet key. Your opponents and the contract validators never see your hand — while still being able to verify the game is being played fairly.",
            illustration: "🃏"
          },
          {
            id: "4-b-3",
            question: "When a user's encrypted data needs to be decrypted in a CoFHE system, who holds the decryption key?",
            options: [
              "Fhenix's central servers hold the master key",
              "No single party holds the key — it's split across multiple independent nodes using threshold decryption",
              "The user's wallet holds the decryption key",
              "The smart contract automatically decrypts when needed"
            ],
            correctIndex: 1,
            explanation: "CoFHE uses threshold decryption — the decryption key is mathematically split across multiple independent nodes. No single node can decrypt anything alone. A majority of nodes must cooperate to produce a decryption. This means no single party — not even Fhenix — can access your data unilaterally.",
            illustration: "🗝️"
          }
        ]
      },
      {
        level: "intermediate",
        label: "Intermediate",
        color: "#FFB800",
        emoji: "🟡",
        questions: [
          {
            id: "4-i-1",
            question: "CoFHE's research was accepted to ACM CCS 2025 — one of the most prestigious cryptography conferences in the world, alongside research from Google, Microsoft, Meta, Stanford, and MIT. What performance milestone did the research demonstrate?",
            options: [
              "10x faster than previous FHE systems",
              "20,000x higher throughput and 37x lower latency than previous threshold FHE decryption approaches",
              "100% reduction in gas costs for FHE operations",
              "1,000x improvement in key generation speed"
            ],
            correctIndex: 1,
            explanation: "Fhenix's CoFHE research showed 20,000x higher throughput and 37x lower latency compared to previous threshold FHE decryption approaches. This leap in performance is what makes CoFHE practically deployable — not just academically interesting. The ACM CCS acceptance validates this is peer-reviewed, production-grade cryptographic engineering.",
            illustration: "📈"
          },
          {
            id: "4-i-2",
            question: "EigenLayer is a key partner in Fhenix's CoFHE architecture. What specific role does EigenLayer play?",
            options: [
              "EigenLayer provides the FHE encryption algorithms",
              "EigenLayer's restaking network provides economic security and verifiability for CoFHE computations through its decentralized validator set",
              "EigenLayer stores encrypted data off-chain",
              "EigenLayer handles the user's key management"
            ],
            correctIndex: 1,
            explanation: "EigenLayer extends Ethereum's security through restaking. CoFHE uses EigenLayer's network of restakers as the decentralized, economically-secured operator set that performs and verifies FHE computations. This gives CoFHE Ethereum-grade security without building a new consensus layer from scratch.",
            illustration: "🏗️"
          },
          {
            id: "4-i-4",
            question: "CoFHE is live on Ethereum mainnet, Arbitrum, and Base. A developer building on Base wants to add private salary payments to their payroll dApp. What does the user experience look like when they connect Fhenix's CoFHE?",
            options: [
              "Users must install a Fhenix wallet and move funds to a Fhenix chain",
              "Users stay on Base, use their existing wallet, and salary amounts are encrypted before the transaction hits the chain — the Base network processes the transaction without seeing the salary amount",
              "Salary amounts are hidden only in the front-end interface",
              "A Fhenix employee manually processes each private transaction"
            ],
            correctIndex: 1,
            explanation: "CoFHE is chain-agnostic. Users on Base don't change wallets or chains. The dApp encrypts salary data client-side using the CoFHE SDK, submits an encrypted transaction to the Base smart contract, and CoFHE processes the FHE logic in the background. From the user's perspective, it feels like any other Base transaction — with privacy added invisibly.",
            illustration: "💸"
          },
          {
            id: "4-i-5",
            question: "FHE ciphertexts are significantly larger than plaintext — an encrypted uint32 is much larger than 4 bytes. How does CoFHE handle this storage cost problem without breaking the bank for developers and users?",
            options: [
              "CoFHE compresses ciphertexts before storing them",
              "Ciphertexts are stored on Celestia's data availability layer (not on the expensive main chain), while only compact commitments and computation proofs are stored on-chain",
              "CoFHE stores ciphertexts in IPFS for free",
              "Developers must pay a monthly subscription fee to Fhenix for storage"
            ],
            correctIndex: 1,
            explanation: "Storing raw FHE ciphertexts on Ethereum mainnet or Arbitrum would cost thousands of dollars per transaction. CoFHE's modular architecture solves this: Celestia provides cheap, specialized data availability storage for large ciphertexts. The EVM chain only stores small commitments and verification proofs. Costs stay reasonable while data remains verifiably accessible.",
            illustration: "💾"
          },
          {
            id: "4-i-3",
            question: "CoFHE maintains EVM compatibility — meaning it works on Ethereum, Arbitrum, Base, and more. How is this possible without modifying the underlying chains?",
            options: [
              "CoFHE replaces the EVM with a new virtual machine",
              "CoFHE operates as an external coprocessor: the EVM chain calls out to CoFHE for FHE operations, receives encrypted results back, and continues execution — the chain itself never changes",
              "CoFHE forks each blockchain to add FHE opcodes",
              "CoFHE wraps all EVM transactions in an FHE layer"
            ],
            correctIndex: 1,
            explanation: "CoFHE works like a specialized external processor. Smart contracts emit calls to CoFHE, which performs the FHE computation off-chain, then returns verifiable encrypted results back to the contract. The underlying EVM chain doesn't change. This is why CoFHE can deploy on any EVM chain without coordination with chain developers.",
            illustration: "🔗"
          }
        ]
      },
      {
        level: "master",
        label: "Master",
        color: "#FF4444",
        emoji: "🔴",
        questions: [
          {
            id: "4-m-4",
            question: "CoFHE uses 'reencryption' to allow users to decrypt their own data privately. Why is a special reencryption step needed rather than just decrypting in the smart contract?",
            options: [
              "Smart contracts cannot execute decryption algorithms",
              "Direct decryption on-chain would output plaintext visible to all nodes — reencryption transforms the ciphertext into one encrypted under the user's public key, so only the user can decrypt it off-chain with their private key",
              "Reencryption is cheaper than regular decryption",
              "The user's private key is stored in the smart contract"
            ],
            correctIndex: 1,
            explanation: "If the smart contract decrypted data and stored the result on-chain, the plaintext would be visible to all validators and forever recorded on the public ledger. Reencryption (or 'proxy re-encryption') transforms the CoFHE ciphertext into a new ciphertext encrypted under the user's specific public key. The user then decrypts it locally with their private key — the plaintext never touches the chain.",
            illustration: "🔄"
          },
          {
            id: "4-m-5",
            question: "What is the 'key ceremony' in CoFHE's threshold decryption setup, and what happens if it's compromised?",
            options: [
              "A ceremony where developers review the FHE code before deployment",
              "A distributed key generation (DKG) protocol where the decryption key is generated collectively so no single party ever sees the full key — compromise during the ceremony would mean a party could reconstruct the key and decrypt all future ciphertexts",
              "An annual audit of CoFHE's security practices",
              "The process of registering new nodes in the CoFHE network"
            ],
            correctIndex: 1,
            explanation: "The threshold key ceremony uses Distributed Key Generation (DKG) — nodes collaboratively generate a shared decryption key where each node gets only a key share, and the full key is never assembled in one place. If the ceremony is compromised (a node is malicious or colluding parties collect enough shares), the attacker could decrypt historical ciphertexts. This is why key ceremony integrity is the most critical security moment in FHE system deployment.",
            illustration: "🗝️"
          },
          {
            id: "4-m-1",
            question: "Threshold decryption in CoFHE uses a (t, n) threshold scheme. Why is this architecture more secure than a single-key FHE system for a public blockchain?",
            options: [
              "It's faster because multiple nodes share the computation load",
              "It eliminates single points of failure: an adversary must compromise at least t-of-n nodes simultaneously to decrypt, making unilateral decryption cryptographically infeasible while preserving liveness as long as t nodes are honest",
              "It allows decryption without any key at all",
              "It makes the encryption keys shorter and easier to manage"
            ],
            correctIndex: 1,
            explanation: "A single-key system has one point of failure: whoever holds the key. Threshold decryption mathematically distributes key shares across n nodes — decryption requires cooperation from t of them. For an adversary to breach privacy, they'd need to compromise at least t nodes simultaneously. With a well-parameterized distributed node set, this is cryptographically infeasible while maintaining availability as long as t honest nodes remain online.",
            illustration: "🛡️"
          },
          {
            id: "4-m-2",
            question: "What is Celestia's role in Fhenix's architecture, and why is a specialized data availability layer necessary for CoFHE?",
            options: [
              "Celestia provides the FHE computation engine",
              "Celestia provides modular data availability — storing CoFHE's ciphertext data efficiently and verifiably off the main chain, reducing costs while maintaining data integrity proofs accessible to all participants",
              "Celestia handles the decryption key distribution",
              "Celestia provides the consensus mechanism for CoFHE nodes"
            ],
            correctIndex: 1,
            explanation: "FHE ciphertexts are significantly larger than plaintext — storing them directly on Ethereum mainnet would be prohibitively expensive. Celestia's modular DA layer lets CoFHE store large ciphertexts cheaply while providing data availability sampling — any participant can verify data is available without downloading it all. This is essential for scalable, decentralized FHE at production volumes.",
            illustration: "🌌"
          },
          {
            id: "4-m-3",
            question: "Fhenix's CoFHE architecture must solve the 'input validity problem': ensuring that encrypted inputs to FHE computations are well-formed and within valid ranges, without decrypting them. How is this achieved?",
            options: [
              "Inputs are decrypted briefly by a trusted node for validation then re-encrypted",
              "ZK proofs accompany each encrypted input, proving properties of the plaintext (valid range, format) to the verifier without revealing the plaintext — this is where Verifiable FHE's ZK component becomes essential",
              "The smart contract validates inputs before they're encrypted",
              "CoFHE nodes run statistical analysis on ciphertexts to detect invalid inputs"
            ],
            correctIndex: 1,
            explanation: "The input validity problem is one of the hardest challenges in practical FHE deployment. If users can submit malformed ciphertexts, they can exploit homomorphic operations to corrupt computation outputs. ZK range proofs and validity proofs attached to each ciphertext let CoFHE nodes verify inputs are well-formed without decrypting them — maintaining full privacy while preventing malformed-input attacks.",
            illustration: "🔍"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Real Use Cases",
    subtitle: "What You Can Build with Fhenix",
    emoji: "🚀",
    color: "#00FF88",
    levels: [
      {
        level: "beginner",
        label: "Beginner",
        color: "#00FF88",
        emoji: "🟢",
        questions: [
          {
            id: "5-b-1",
            question: "Redact is a Fhenix ecosystem app that lets you trade on a DEX without bots seeing your trades before they confirm. In plain English, what problem does Redact solve?",
            options: [
              "High gas fees on Ethereum",
              "MEV front-running — bots can no longer see or exploit your pending trades because they're encrypted",
              "Slow transaction confirmation times",
              "Difficulty connecting wallets to DeFi apps"
            ],
            correctIndex: 1,
            explanation: "Redact uses Fhenix's FHE to encrypt your trade before it enters the mempool. Bots watching the mempool see only encrypted ciphertext — they can't read your trade size, your target token, or your strategy. The trade executes privately. No sandwich attacks, no front-running, no extraction.",
            illustration: "🤫"
          },
          {
            id: "5-b-2",
            question: "In normal DeFi lending, your collateral amount is publicly visible. A liquidation bot watches your position and immediately liquidates you the moment your collateral drops below the threshold. What does FHE-powered confidential lending (like Felend) change?",
            options: [
              "It eliminates the need for collateral entirely",
              "Your collateral amount stays encrypted — liquidation bots can't target your position specifically, protecting you from predatory liquidation",
              "It makes borrowing rates lower",
              "It allows borrowing without connecting a wallet"
            ],
            correctIndex: 1,
            explanation: "In public lending protocols, your collateral is a target. Liquidation bots race to liquidate you at the worst possible moment. With encrypted collateral (Felend's approach), bots can't see your specific position or health factor. Liquidation can still happen when genuinely needed — but you're not being stalked by bots waiting to exploit you.",
            illustration: "💰"
          },
          {
            id: "5-b-4",
            question: "You're playing an online poker game built on Fhenix. You hold a royal flush. In a normal on-chain game, a validator could see your hand and tell your opponents. With FHE, what changes?",
            options: [
              "The game moves off-chain to hide your hand",
              "Your hand is stored as encrypted values on-chain — validators process game logic without seeing cards, opponents see only ciphertext, and only you can decrypt your own hand with your wallet key",
              "A trusted dealer manages all hands off-chain",
              "Cards are stored in a private database instead of the blockchain"
            ],
            correctIndex: 1,
            explanation: "On-chain games have always had a 'hidden information' problem — the blockchain is public, so any data the contract stores is visible to all. FHE solves this fundamentally: your card values are stored as FHE-encrypted integers. The smart contract can run game logic (evaluate hand strength, determine winner) on encrypted cards without validators or opponents ever seeing the actual card values.",
            illustration: "🎰"
          },
          {
            id: "5-b-5",
            question: "A healthcare startup wants to let patients sell their anonymized health data to pharmaceutical companies — privately, on-chain, with cryptographic proof of authenticity. Which Fhenix use case does this represent?",
            options: [
              "Private DeFi trading",
              "Encrypted data marketplaces — patients encrypt their health data, pharma companies compute on it using FHE to extract research insights, and patients get paid without their raw data ever leaving their control",
              "On-chain insurance products",
              "Decentralized electronic health records"
            ],
            correctIndex: 1,
            explanation: "FHE enables a new category: encrypted data marketplaces where data owners monetize their data without losing control of it. The pharma company runs approved computation (statistical analysis, drug response patterns) on encrypted patient data and gets only the computed insights back. The patient's raw data is never exposed. The payment and computation are on-chain and trustless.",
            illustration: "💊"
          },
          {
            id: "5-b-3",
            question: "Coffhee is a Fhenix ecosystem app for private governance voting. Why does it matter that governance votes are private until tallying is complete?",
            options: [
              "It makes voting faster",
              "Seeing how others vote before the deadline creates bandwagon effects and vote manipulation — private voting ensures each vote reflects genuine opinion, not social pressure",
              "It reduces gas costs for voting",
              "It allows people to vote multiple times"
            ],
            correctIndex: 1,
            explanation: "In public on-chain governance, large whales vote first and smaller holders see their votes — creating pressure to follow the 'winning' side. Vote buying and intimidation become easier when votes are visible in real time. Encrypted votes (decrypted only at tally time) ensure each voter acts on their genuine conviction, not on social dynamics.",
            illustration: "🗳️"
          }
        ]
      },
      {
        level: "intermediate",
        label: "Intermediate",
        color: "#FFB800",
        emoji: "🟡",
        questions: [
          {
            id: "5-i-1",
            question: "Real World Asset (RWA) tokenization — putting real estate, credit, and private equity on-chain — is one of the fastest-growing sectors in Web3. What is the single biggest barrier to institutional RWA issuers using public blockchains today?",
            options: [
              "Smart contract security risks",
              "Public exposure of client lists, holdings, and pricing to competitors and the entire market",
              "Regulatory uncertainty around tokenization",
              "Lack of liquidity for tokenized assets"
            ],
            correctIndex: 1,
            explanation: "RWA issuers have fiduciary obligations to clients — they cannot publicly broadcast client portfolios, asset valuations, or counterparty relationships. On a public chain, all of this is visible to everyone. FHE-encrypted RWA tokens let the asset exist on-chain with verifiable ownership and compliance checks, while keeping commercially sensitive details encrypted.",
            illustration: "🏢"
          },
          {
            id: "5-i-2",
            question: "Sealed-bid auctions are a powerful financial mechanism where all bids are submitted privately and revealed simultaneously at close. How does FHE enable this on-chain in a trustless way?",
            options: [
              "A trusted auctioneer holds all bids and reveals them at close",
              "Bids are encrypted using FHE, submitted to the contract, and the smart contract determines the winner by computing on encrypted bids — no party sees any bid until the result is revealed",
              "Bidders commit to bids using hash functions and reveal later",
              "The auction contract randomizes reveal timing to prevent sniping"
            ],
            correctIndex: 1,
            explanation: "Hash-commit schemes require a reveal phase where bids are exposed. FHE sealed auctions never expose bids at all — the smart contract determines the winner by comparing encrypted bid values, and only announces who won. Even the losing bids remain encrypted and private. This is impossible without FHE or a trusted third party.",
            illustration: "🔨"
          },
          {
            id: "5-i-4",
            question: "A remittance startup wants to let Nigerian workers in the UK send money home without their employer seeing the amount or the Nigerian government knowing their UK income. With Fhenix, which design is possible?",
            options: [
              "Route money through multiple wallets to obscure the trail",
              "Encrypt transfer amounts and recipient details on-chain — the smart contract verifies the transfer is valid and routes funds correctly using FHE computation, while the amount and parties remain encrypted to outside observers",
              "Use a centralized exchange as a privacy middleman",
              "Split transfers into many small transactions under reporting limits"
            ],
            correctIndex: 1,
            explanation: "Private cross-border remittance is one of the most impactful real-world uses of FHE. Encrypted transfer amounts mean employers, tax authorities, and blockchain analysts cannot correlate salaries with remittance flows. The smart contract still verifies transfers are legitimate (checking balances, AML compliance via ZK proofs) without revealing amounts. This is financial privacy for everyday people, not just institutional traders.",
            illustration: "🌍"
          },
          {
            id: "5-i-5",
            question: "Decentralized insurance (like crop insurance for African farmers) has failed to scale on public blockchains. Why does FHE change the economics of on-chain insurance?",
            options: [
              "FHE makes smart contract execution cheaper",
              "Insurance requires policyholders to submit sensitive claims data (medical, crop loss, weather records) — FHE lets insurers verify claims using encrypted data without insurers or competitors seeing individual policy terms, making confidential insurance contracts viable on-chain",
              "FHE reduces the insurance premium required",
              "FHE speeds up claims processing time"
            ],
            correctIndex: 1,
            explanation: "Insurance is a data-sensitive business. Policy terms, claim amounts, and loss histories are confidential — revealing them publicly would destroy competitive pricing and expose policyholders to fraud. Public blockchain transparency made sophisticated insurance contracts impossible. FHE enables encrypted policy terms, private claim verification, and confidential payouts — bringing real insurance products to blockchain without sacrificing business model viability.",
            illustration: "🌾"
          },
          {
            id: "5-i-3",
            question: "Silhouette is building private on-chain gaming using Fhenix. Why does gaming particularly need FHE rather than just encryption?",
            options: [
              "Games need faster transaction times than other apps",
              "Game state (card hands, move history, hidden information) must be verifiably correct AND private — FHE lets the blockchain verify game rules without revealing private game state to other players or the game server",
              "Gaming apps need lower gas fees specifically",
              "FHE makes game graphics render faster"
            ],
            correctIndex: 1,
            explanation: "On-chain games face a paradox: the blockchain needs to verify moves are valid (trustless) but shouldn't reveal your hidden game state to opponents. Without FHE, you must trust a server with your private game state. With FHE, the blockchain can verify moves are legal by computing on encrypted game state — without any player, server, or validator seeing the private information.",
            illustration: "🎮"
          }
        ]
      },
      {
        level: "master",
        label: "Master",
        color: "#FF4444",
        emoji: "🔴",
        questions: [
          {
            id: "5-m-4",
            question: "A central bank wants to issue a CBDC (Central Bank Digital Currency) with programmable privacy — transactions are private by default, but regulators can audit specific transactions with a court order. How does Fhenix's Verifiable FHE make this possible without a backdoor?",
            options: [
              "The central bank holds a master decryption key to all transactions",
              "Transactions are encrypted and a ZK-based selective disclosure mechanism lets account holders generate court-order-compliant proofs for specific transactions — regulators verify compliance without the central bank having persistent decryption access to all funds",
              "Transactions are stored in a private database the central bank controls",
              "All CBDC transactions are public by default with optional privacy flags"
            ],
            correctIndex: 1,
            explanation: "A backdoor to all transactions is politically unacceptable and technically dangerous (whoever holds the master key has unlimited power). Verifiable FHE enables a better model: each user can generate selective disclosure proofs for their own transactions when legally required. Regulators receive cryptographic proof of specific transaction details without the central bank having continuous access to all transaction data. Privacy by default, auditability on demand — without a centralized backdoor.",
            illustration: "🏛️"
          },
          {
            id: "5-m-5",
            question: "What makes FHE-based private DeFi composable — able to work with other DeFi protocols — in a way that simple transaction encryption cannot achieve?",
            options: [
              "FHE transactions are just faster, which enables composability",
              "FHE preserves mathematical relationships through encryption — so an encrypted balance in Protocol A can be used as an encrypted input to Protocol B's logic, with both protocols computing on the same encrypted value without either seeing it, enabling private cross-protocol operations",
              "DeFi protocols need to be rewritten to support composability",
              "Only Fhenix-native protocols can compose with each other"
            ],
            correctIndex: 1,
            explanation: "Composability requires protocols to operate on shared state. Regular encryption breaks composability — Protocol B cannot compute on a value encrypted by Protocol A without decrypting it first. FHE's homomorphic property preserves mathematical relationships through encryption, so encrypted values can flow between protocols, and each protocol can perform its logic on encrypted state without decryption. This is what makes a private DeFi stack (private AMM → private lending → private derivatives) possible.",
            illustration: "🔗"
          },
          {
            id: "5-m-1",
            question: "Confidential AI inference on-chain — running AI model computations on encrypted user inputs — is one of FHE's most powerful use cases. What problem does this solve that no other approach fully addresses?",
            options: [
              "It makes AI inference faster on-chain",
              "It allows users to get AI model outputs without revealing their inputs to the model provider, and without trusting the model provider's privacy claims — the cryptography enforces privacy regardless of the provider's intentions",
              "It reduces the cost of storing AI models on-chain",
              "It enables AI to generate better outputs by accessing more data"
            ],
            correctIndex: 1,
            explanation: "Today, using any AI API requires sending your plaintext data to a server you must trust. FHE inference changes this: you encrypt your input, the encrypted data is processed by the model, and you decrypt the output — the model provider never sees your input. This is 'privacy by mathematics, not by policy,' making it the first truly trustless AI inference mechanism.",
            illustration: "🤖"
          },
          {
            id: "5-m-2",
            question: "A confidential AMM (Automated Market Maker) using FHE would encrypt LP positions and order flow. What specific attack vector does this eliminate that standard privacy techniques cannot prevent?",
            options: [
              "Impermanent loss for liquidity providers",
              "Statistical flow analysis and LP sandwiching: even if individual trades are hidden, public LP position changes enable sophisticated actors to infer trade flow and sandwich LP rebalancing events",
              "Smart contract bugs in the AMM logic",
              "Oracle manipulation of price feeds"
            ],
            correctIndex: 1,
            explanation: "Even with transaction-level privacy, public LP positions leak information. A sophisticated adversary can watch LP position changes (which must happen on-chain), infer the direction of trade flow, and exploit that information asymmetry. FHE-encrypted LP positions eliminate this statistical attack surface — the entire AMM state is encrypted, leaving attackers with no signal to exploit.",
            illustration: "📊"
          },
          {
            id: "5-m-3",
            question: "For encrypted RWA tokenization to satisfy institutional compliance requirements, what must be provable WITHOUT revealing the encrypted data itself?",
            options: [
              "The total market value of all tokenized assets",
              "Ownership validity, accredited investor status, regulatory jurisdiction compliance, and transfer restrictions — all verifiable via ZK proofs on encrypted data without exposing underlying PII or portfolio details",
              "The identity of all token holders",
              "The complete transaction history of each token"
            ],
            correctIndex: 1,
            explanation: "Institutional compliance requires proving things like 'this investor is accredited,' 'this transfer doesn't violate sanctions,' and 'this holder is in a permitted jurisdiction' — without exposing KYC data, portfolio holdings, or personal information publicly. ZK proofs on encrypted compliance data (enabled by Verifiable FHE) allow all regulatory requirements to be satisfied cryptographically without any plaintext exposure.",
            illustration: "📋"
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "The Ecosystem",
    subtitle: "Team, Backers & Achievements",
    emoji: "🌐",
    color: "#FFB800",
    levels: [
      {
        level: "beginner",
        label: "Beginner",
        color: "#00FF88",
        emoji: "🟢",
        questions: [
          {
            id: "6-b-1",
            question: "Fhenix has raised $22 million in funding. One of their lead investors is Multicoin Capital — one of the most respected crypto-native investment funds in the world. Why does having Multicoin as an investor matter?",
            options: [
              "It means Fhenix will never run out of money",
              "Multicoin does deep technical research before investing — their backing signals that credible experts believe FHE on-chain is not just possible but inevitable",
              "It guarantees Fhenix's token will increase in price",
              "It means Fhenix is officially endorsed by the US government"
            ],
            correctIndex: 1,
            explanation: "Multicoin Capital is known for making high-conviction bets on infrastructure they've thoroughly researched. Their investment in Fhenix — alongside Hack VC, Amber Group, and Arbitrum's own investment arm — signals that the most technically sophisticated investors in crypto believe Fhenix's approach is sound and the market timing is right.",
            illustration: "💼"
          },
          {
            id: "6-b-2",
            question: "Fhenix's CoFHE is already live on which blockchains today?",
            options: [
              "Only Fhenix's own testnet",
              "Ethereum mainnet, Arbitrum, and Base — with Optimism and Avalanche coming soon",
              "Only Ethereum mainnet",
              "Bitcoin and Ethereum"
            ],
            correctIndex: 1,
            explanation: "CoFHE is already deployed and live on Ethereum mainnet, Arbitrum, and Base — the three largest EVM ecosystems. This isn't a whitepaper promise; it's running production code. Optimism and Avalanche integrations are next, meaning FHE privacy will be available across virtually the entire EVM ecosystem.",
            illustration: "⛓️"
          },
          {
            id: "6-b-4",
            question: "Fhenix's team includes cryptography researchers, former Google and Goldman Sachs engineers, and blockchain veterans. Why does this specific mix of backgrounds matter for building production FHE?",
            options: [
              "It makes for impressive LinkedIn profiles",
              "FHE requires three skill sets simultaneously: deep cryptography research (to implement FHE correctly), systems engineering (to make it fast and reliable), and finance/blockchain expertise (to build the right products for the right market) — no single background provides all three",
              "It helps raise more investment funding",
              "Academic cryptographers are the only ones who understand FHE"
            ],
            correctIndex: 1,
            explanation: "Building production FHE infrastructure is uniquely hard because it spans pure mathematics, high-performance systems engineering, and product-market fit for financial institutions. A team of only cryptographers builds something theoretically correct but impractical. Only engineers build something fast but cryptographically unsound. Only finance people build something that looks good but can't ship. Fhenix's mix of all three is a competitive moat.",
            illustration: "👥"
          },
          {
            id: "6-b-5",
            question: "Fhenix's CoFHE research achieved 20,000x higher throughput than previous threshold FHE systems. To make this concrete: if the old system could process 1 decryption per second, how many can CoFHE process?",
            options: [
              "About 200 decryptions per second",
              "20,000 decryptions per second — enough to support a production financial application with thousands of concurrent users",
              "100,000 decryptions per second",
              "The same speed — throughput doesn't affect decryptions per second"
            ],
            correctIndex: 1,
            explanation: "A 20,000x improvement in throughput means the system can handle 20,000 times more decryption operations in the same time period. This is the difference between a research prototype (handling academic benchmarks) and production infrastructure (handling thousands of DeFi users simultaneously). This performance jump is what crossed the threshold from 'FHE is theoretically interesting' to 'FHE is deployable today.'",
            illustration: "⚡"
          },
          {
            id: "6-b-3",
            question: "Fhenix's research paper on Threshold FHE Decryption was accepted to ACM CCS 2025. ACM CCS is considered one of the top 4 most prestigious cryptography and security conferences in the world. What does this mean for Fhenix?",
            options: [
              "It means Fhenix won a crypto industry award",
              "Their research was peer-reviewed and validated by the world's leading cryptographers — alongside work from Microsoft, Google, Meta, Stanford, and MIT",
              "It means their token is listed on a major exchange",
              "It proves their product is fully audited and bug-free"
            ],
            correctIndex: 1,
            explanation: "Academic peer review at top-4 security conferences is one of the most rigorous forms of technical validation. ACM CCS reviewers are the world's leading cryptographers. Acceptance means Fhenix's core architecture — the 20,000x throughput, 37x latency improvement — has been validated by the same community that reviews research from Google Brain, Microsoft Research, and the world's top universities.",
            illustration: "🎓"
          }
        ]
      },
      {
        level: "intermediate",
        label: "Intermediate",
        color: "#FFB800",
        emoji: "🟡",
        questions: [
          {
            id: "6-i-1",
            question: "Fhenix's partnership with Optalysys is one of their most forward-looking. Optalysys uses photonic (light-based) computing chips for FHE acceleration. Why does hardware acceleration matter so much for FHE?",
            options: [
              "It makes FHE transactions cheaper in gas fees",
              "FHE computations are inherently more expensive than regular computations — dedicated hardware can accelerate FHE by orders of magnitude, making real-time encrypted computation economically viable at scale",
              "It enables Fhenix to run without an internet connection",
              "Hardware chips eliminate the need for blockchain validators"
            ],
            correctIndex: 1,
            explanation: "FHE is computationally heavier than unencrypted computing — even with TFHE optimizations. Software alone can only get so far. Optalysys's photonic FHE chips perform matrix operations (the core of FHE) using light instead of electricity, achieving speeds impossible with silicon. This hardware-software co-design is the path to making FHE as fast as unencrypted computation at scale.",
            illustration: "💡"
          },
          {
            id: "6-i-2",
            question: "zkPass is a partner in the Fhenix ecosystem. zkPass enables privacy-preserving identity verification. How does this combine with Fhenix's FHE to create something neither can achieve alone?",
            options: [
              "zkPass provides cheaper transaction fees",
              "zkPass generates ZK proofs of identity attributes (e.g., age, jurisdiction) that can be used as encrypted inputs to Fhenix's FHE computations — enabling compliance-gated private DeFi where you prove eligibility without revealing identity",
              "zkPass manages private keys for Fhenix users",
              "zkPass provides the consensus mechanism for CoFHE"
            ],
            correctIndex: 1,
            explanation: "zkPass lets users prove facts about themselves (over 18, KYC-verified, not on a sanctions list) without revealing underlying documents. These ZK attestations can gate access to Fhenix's encrypted DeFi protocols. The result: compliance-gated private finance — you prove you're eligible without revealing who you are, and your financial activity remains encrypted.",
            illustration: "🪪"
          },
          {
            id: "6-i-4",
            question: "Fhenix has partnerships with Aztec Network and other privacy projects. Why do privacy-focused blockchain projects collaborate rather than purely compete?",
            options: [
              "They share the same investors who force them to cooperate",
              "Privacy is a rising tide that lifts all boats — every protocol that makes on-chain privacy more normal and user-friendly grows the market for all privacy infrastructure, including Fhenix's FHE layer",
              "They are merging into a single protocol",
              "Privacy projects cannot compete because they all do the same thing"
            ],
            correctIndex: 1,
            explanation: "Aztec focuses on ZK-based transaction privacy; Fhenix focuses on FHE-based computation privacy. They solve different layers of the same problem. When Aztec makes privacy-preserving transactions mainstream, users naturally want private computation too — and vice versa. Privacy is an ecosystem story: growing the overall understanding and adoption of on-chain privacy grows the addressable market for all players.",
            illustration: "🤝"
          },
          {
            id: "6-i-5",
            question: "Fhenix's CoFHE is deployed as an EigenLayer AVS (Actively Validated Service). What makes EigenLayer's restaked ETH security model particularly well-suited for securing FHE computations?",
            options: [
              "EigenLayer makes computations cheaper by sharing infrastructure",
              "Restaked ETH creates economic slashing conditions for CoFHE operators who misbehave (submit wrong FHE results) — giving Ethereum-grade economic security to FHE computation without needing a separate PoS chain with its own token bootstrap problem",
              "EigenLayer provides faster computation than alternative networks",
              "EigenLayer automatically verifies FHE computation correctness"
            ],
            correctIndex: 1,
            explanation: "Bootstrapping a new PoS network for CoFHE would require a token, liquidity, and years of security buildup. EigenLayer's restaking extends Ethereum's existing $40B+ security directly to CoFHE operators. Operators who submit incorrect FHE results can be slashed (lose their restaked ETH). This aligns operator incentives toward honest computation without the cold-start security problem of a new chain.",
            illustration: "⚔️"
          },
          {
            id: "6-i-3",
            question: "Arbitrum's investment arm (Tandem) invested in Fhenix, and CoFHE is already live on Arbitrum. Why is this relationship strategically significant beyond just the investment?",
            options: [
              "It means Fhenix will merge with Arbitrum eventually",
              "Arbitrum's investment aligns incentives: Fhenix's privacy infrastructure drives more sophisticated applications to Arbitrum, increasing Arbitrum's value — it's a strategic bet on FHE making their ecosystem more competitive",
              "It gives Fhenix a guaranteed user base from Arbitrum",
              "It means Arbitrum will switch from its own tech to Fhenix's"
            ],
            correctIndex: 1,
            explanation: "When Arbitrum's own investment arm backs Fhenix AND CoFHE deploys on Arbitrum, it creates a strategic flywheel: FHE privacy enables new DeFi use cases on Arbitrum that were impossible before, driving user growth and TVL to the Arbitrum ecosystem. Both parties benefit from making each other succeed — which creates much stronger alignment than a typical financial investment.",
            illustration: "🤝"
          }
        ]
      },
      {
        level: "master",
        label: "Master",
        color: "#FF4444",
        emoji: "🔴",
        questions: [
          {
            id: "6-m-4",
            question: "Fhenix's fundraise included Hack VC, Multicoin Capital, Amber Group, and strategic investors from traditional finance. What does the diversity of this investor base signal about FHE's market positioning?",
            options: [
              "Fhenix could not get a single lead investor to commit fully",
              "FHE sits at the intersection of multiple converging markets — crypto infrastructure (Multicoin, Hack VC), institutional finance (Amber), and enterprise technology (BIPROGY) — different investor types see different paths to massive returns from the same technology",
              "Having many investors reduces Fhenix's governance control",
              "The diversity reflects that FHE is a niche technology with limited appeal"
            ],
            correctIndex: 1,
            explanation: "When a technology attracts both pure crypto VCs (Multicoin, Hack VC) and institutional/enterprise players (Amber, BIPROGY, Arbitrum), it suggests the technology has multiple distinct multi-billion dollar addressable markets. Crypto VCs see the DeFi privacy market; institutional players see the enterprise FHE and compliant finance market; strategic investors see ecosystem growth. The convergence of these bets in one company is a strong signal of broad market applicability.",
            illustration: "🌐"
          },
          {
            id: "6-m-5",
            question: "Why is Fhenix's ACM CCS 2025 publication specifically about 'threshold FHE decryption' — and not about FHE encryption or computation — the most strategically important research contribution?",
            options: [
              "Decryption is the most computationally expensive part of FHE",
              "Threshold decryption is the bottleneck that determines whether FHE can be decentralized — fast, distributed threshold decryption means no single party controls the keys, which is the prerequisite for FHE to be trustless enough for permissionless blockchain deployment",
              "Encryption and computation had already been solved by other researchers",
              "Threshold decryption is required by financial regulators"
            ],
            correctIndex: 1,
            explanation: "Any centralized server can do FHE encryption and computation. The hard problem for blockchain is making decryption trustless and decentralized — without a central key holder who could abuse their power. Threshold decryption distributes the key so no single party can decrypt unilaterally. Achieving this at 20,000x the throughput of prior work is what makes it a publication-worthy result: it's the missing piece that makes FHE viable for permissionless, trustless systems.",
            illustration: "🔑"
          },
          {
            id: "6-m-1",
            question: "BIPROGY (formerly Nippon Unisys) — a major Japanese enterprise IT company — invested in Fhenix's Series A. What does this signal about FHE's trajectory beyond crypto-native markets?",
            options: [
              "It means Fhenix will build products specifically for Japanese consumers",
              "Enterprise IT firms only invest in technologies they see production deployment paths for — BIPROGY's investment signals that FHE is approaching the maturity threshold for enterprise and traditional finance adoption in Asia",
              "It's purely a financial investment with no strategic implications",
              "It means Fhenix will open-source all their technology"
            ],
            correctIndex: 1,
            explanation: "Enterprise IT firms like BIPROGY are deeply conservative investors who invest in technologies they can sell to clients like banks, insurers, and government agencies. Their Fhenix investment signals they see a near-term path to deploying FHE in traditional financial infrastructure — a market worth orders of magnitude more than the current DeFi ecosystem.",
            illustration: "🏭"
          },
          {
            id: "6-m-2",
            question: "Fhenix has partnerships with both EigenLayer (restaking security) and Celestia (data availability) and Optalysys (hardware). What does this multi-layer architecture reveal about their approach to building production-grade FHE infrastructure?",
            options: [
              "They are building too many dependencies and creating unnecessary complexity",
              "They're adopting a modular architecture: each component (security, DA, compute) is best-in-class for its specific function — reflecting that production FHE requires solving security, scalability, and performance simultaneously with specialized solutions for each",
              "They're preparing to acquire these companies",
              "They are unable to build these capabilities themselves"
            ],
            correctIndex: 1,
            explanation: "Fhenix's architecture is deliberately modular: EigenLayer for decentralized security and verifiability, Celestia for scalable data availability of large ciphertexts, Optalysys for hardware-accelerated computation, zkPass for compliance. Rather than building every component in-house, they've identified the best-in-class solution for each layer — a production engineering philosophy rather than a research one.",
            illustration: "🏛️"
          },
          {
            id: "6-m-3",
            question: "Fhenix's research showed 20,000x throughput improvement over prior threshold FHE decryption. In the context of ACM CCS acceptance, why is this magnitude of improvement significant beyond just performance?",
            options: [
              "It means their system is 20,000 times cheaper to operate",
              "A 20,000x improvement crosses the 'practical threshold' — it's the difference between FHE being theoretically possible and economically viable at production scale, which is what peer-review validates as a genuine engineering breakthrough, not just optimization",
              "It proves quantum computers cannot break their encryption",
              "It means they can process 20,000 transactions per second"
            ],
            correctIndex: 1,
            explanation: "Incremental improvements in cryptographic systems are common. 20,000x improvements are not. In engineering, there are orders of magnitude that change the category — from 'interesting research' to 'deployable infrastructure.' ACM CCS acceptance of a 20,000x improvement signals the committee recognized this as a category-defining result, not just a performance paper. It marks FHE crossing the line from academic to production.",
            illustration: "📐"
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "The Road Ahead",
    subtitle: "Where Fhenix is Going & Why It Matters",
    emoji: "🌅",
    color: "#00D4FF",
    levels: [
      {
        level: "beginner",
        label: "Beginner",
        color: "#00FF88",
        emoji: "🟢",
        questions: [
          {
            id: "7-b-1",
            question: "Experts estimate that over $100 trillion in institutional capital — from pension funds, banks, insurers, and sovereign wealth funds — is sitting on the sidelines, watching DeFi but not participating. What's the one thing they've always required before putting serious money on-chain?",
            options: [
              "Lower transaction fees",
              "Faster block times",
              "Privacy — the ability to operate without exposing their strategies, positions, and clients publicly",
              "More supported cryptocurrencies"
            ],
            correctIndex: 2,
            explanation: "Institutional capital has one non-negotiable requirement: confidentiality. They operate in regulated environments with fiduciary duties to clients. They cannot and will not put capital on systems that publicly broadcast their every move. $100 trillion waits for the one thing DeFi has never had — on-chain privacy. Fhenix is building it.",
            illustration: "💎"
          },
          {
            id: "7-b-2",
            question: "Fhenix says FHE doesn't just improve blockchain — it completes it. What were public blockchains always missing that FHE provides?",
            options: [
              "Faster consensus mechanisms",
              "A private layer — the ability to compute trustlessly on sensitive data without exposing it",
              "Better smart contract languages",
              "Cross-chain bridges"
            ],
            correctIndex: 1,
            explanation: "Public blockchains solved trustlessness and ownership — but they made a tradeoff: everything became public. FHE provides the missing layer: trustless computation on private data. You can have both properties simultaneously — a system nobody controls AND a system where your data stays private. That's what blockchain was always missing, and what Fhenix is adding.",
            illustration: "🧩"
          },
          {
            id: "7-b-4",
            question: "Imagine it's 2030. A small farmer in Kenya can take out a crop loan, hedge against drought using an options contract, and buy insurance — all privately on-chain, without a bank. What makes this scenario possible that wasn't before?",
            options: [
              "Better mobile internet infrastructure in Africa",
              "FHE-powered confidential smart contracts that handle loan terms, derivatives positions, and insurance claims privately — allowing financial primitives that require confidentiality to run trustlessly without any bank or intermediary",
              "Cheaper smartphones making DeFi apps accessible",
              "Government regulation requiring banks to serve rural customers"
            ],
            correctIndex: 1,
            explanation: "Billions of people are excluded from financial services not because of geography or mobile access (which are improving) but because they lack the collateral, credit history, and institutional relationships banks require. FHE-powered DeFi enables private, programmable financial contracts that work for anyone with a wallet — no bank account needed, no data exposed, no middleman required. This is the real financial inclusion opportunity FHE unlocks.",
            illustration: "🌾"
          },
          {
            id: "7-b-5",
            question: "Right now, posting on social media is public. What if you could prove you said something without revealing when, what platform, or who you are — only that the content exists and is authentic? This is called a 'private attestation.' Which Fhenix use case enables this?",
            options: [
              "Private DeFi trading",
              "FHE-powered verifiable credentials — ZK proofs confirm content authenticity and FHE keeps the metadata encrypted, enabling provably real content with private authorship",
              "Encrypted file storage",
              "Anonymous token transfers"
            ],
            correctIndex: 1,
            explanation: "Private attestations combine ZK proofs (this content was signed by a real key) with FHE (the identity and metadata stay encrypted). This enables reputation systems where you prove you're a credible source without revealing who you are, whistleblowing with cryptographic proof without risking identity, and authorship verification without public attribution. It's one of the most important privacy primitives beyond finance.",
            illustration: "🗣️"
          },
          {
            id: "7-b-3",
            question: "As FHE hardware (like Optalysys photonic chips) becomes available, what will happen to the cost of running FHE computations on Fhenix?",
            options: [
              "Costs will stay the same regardless of hardware",
              "Costs will dramatically decrease as hardware acceleration makes FHE computation orders of magnitude more efficient, making private on-chain applications as economical as unencrypted ones",
              "Costs will increase because hardware requires maintenance",
              "Only large institutions will be able to afford FHE hardware"
            ],
            correctIndex: 1,
            explanation: "Today, FHE is more expensive than unencrypted computing. Hardware acceleration changes this equation dramatically. As photonic and ASIC chips optimized for FHE enter production, the cost gap between private and public computation shrinks toward zero — eventually making privacy the default, not the premium option.",
            illustration: "📉"
          }
        ]
      },
      {
        level: "intermediate",
        label: "Intermediate",
        color: "#FFB800",
        emoji: "🟡",
        questions: [
          {
            id: "7-i-1",
            question: "Fhenix's roadmap includes moving toward 'full ZK-MPC verifiable proofs' for CoFHE computations. What does this mean in practical terms for users and developers?",
            options: [
              "Switching from FHE to ZK-MPC entirely",
              "Adding cryptographic proofs that every CoFHE computation was executed correctly — so users don't need to trust the CoFHE nodes, only the mathematics, creating a fully trustless privacy layer",
              "Making the system slower to increase security",
              "Requiring users to run their own nodes to verify computations"
            ],
            correctIndex: 1,
            explanation: "Today's CoFHE requires trusting that the operator set executed computations correctly. Full ZK-MPC verifiable proofs mean every computation comes with a cryptographic proof of correctness that anyone can verify. This eliminates the trust requirement entirely — from 'trust the operators' to 'verify the math.' It's the final step toward a fully trustless private computation layer.",
            illustration: "🔐"
          },
          {
            id: "7-i-2",
            question: "The 'institutional DeFi thesis' at the core of Fhenix's vision argues that the $100 trillion institutional capital market will only enter DeFi when privacy is solved. What's the second-order effect of even 1% of that capital entering DeFi?",
            options: [
              "DeFi protocols would need to handle more transactions",
              "$1 trillion entering DeFi would increase liquidity, reduce slippage, enable entirely new financial products, and trigger a regulatory clarification wave — transforming DeFi from a niche market into the infrastructure layer of global finance",
              "Ethereum would need to increase its block size",
              "More stablecoins would need to be minted"
            ],
            correctIndex: 1,
            explanation: "Current DeFi TVL is ~$100 billion. Institutional capital entering at even 1% would be $1 trillion — 10x the current market. At that scale, DeFi liquidity becomes deep enough for institutional trading strategies, new regulated products become viable, and the regulatory framework crystallizes because the stakes demand clarity. The second-order effects of institutional DeFi dwarf anything the current market has seen.",
            illustration: "🌊"
          },
          {
            id: "7-i-4",
            question: "A major bank says: 'We'll use Fhenix for private on-chain settlement, but only if we can prove to our auditors that computation was correct without giving the auditor access to client data.' Which Fhenix feature addresses this requirement?",
            options: [
              "The bank gives auditors view-only access to the blockchain",
              "ZK proofs of computation correctness attached to each CoFHE operation — auditors verify the mathematical proof without needing to see the underlying encrypted data",
              "Auditors are added as CoFHE nodes with decryption access",
              "The bank exports a monthly report from its internal systems"
            ],
            correctIndex: 1,
            explanation: "This is the 'audit without exposure' property that Verifiable FHE provides. Each CoFHE computation can produce a ZK proof that the operation was performed correctly on valid inputs. Auditors verify these proofs using mathematics, not by accessing data. This separates auditability from data access — a distinction regulators and financial institutions have needed for decades.",
            illustration: "📋"
          },
          {
            id: "7-i-5",
            question: "AI companies today train models on user data. With Fhenix's FHE, what new AI training paradigm becomes possible that protects user privacy completely?",
            options: [
              "AI models are trained faster using FHE's parallel computation",
              "Federated FHE learning — users contribute encrypted data to model training; the AI learns from patterns in ciphertexts; no user's raw data is ever revealed to the model trainer or other users",
              "Users receive royalties automatically when their data improves the model",
              "AI models become open-source by default when trained with FHE"
            ],
            correctIndex: 1,
            explanation: "Today's AI training requires raw data — which means users must trust AI companies with their private information. FHE enables training on encrypted data, so the AI company never sees individual user records while still extracting learning signals from the encrypted dataset. This is the foundation of truly private AI: models that improve from your data without you surrendering it.",
            illustration: "🤖"
          },
          {
            id: "7-i-3",
            question: "Privacy solutions like Tornado Cash were shut down by regulators. Why is FHE-based privacy fundamentally different from mixer-style privacy tools in the eyes of compliance and regulation?",
            options: [
              "FHE is based in a different jurisdiction",
              "FHE enables selective disclosure — users can prove compliance, KYC status, and transaction legitimacy to regulators using ZK proofs while keeping data encrypted from public view; mixers obscure data from everyone including regulators",
              "FHE transactions are faster than mixer transactions",
              "FHE is open source while Tornado Cash was closed source"
            ],
            correctIndex: 1,
            explanation: "Tornado Cash's fatal regulatory problem was that it made transactions opaque to everyone — including legitimate oversight. FHE with ZK-based selective disclosure is the opposite: data is private by default, but users can generate cryptographic proofs for regulators (proving compliance, source of funds, etc.) without revealing anything to the public. This is privacy-with-accountability — exactly what regulators require.",
            illustration: "⚖️"
          }
        ]
      },
      {
        level: "master",
        label: "Master",
        color: "#FF4444",
        emoji: "🔴",
        questions: [
          {
            id: "7-m-4",
            question: "Post-quantum cryptography is becoming urgent as quantum computers advance. Why does Fhenix's choice of TFHE (based on LWE hardness) provide a natural post-quantum security advantage compared to blockchain protocols that use ECDSA signatures?",
            options: [
              "TFHE uses longer encryption keys than ECDSA",
              "ECDSA security relies on elliptic curve discrete logarithm — efficiently broken by Shor's algorithm on a quantum computer; LWE hardness (TFHE's foundation) has no known efficient quantum algorithm, making FHE-based systems naturally quantum-resistant",
              "Quantum computers cannot run FHE computations",
              "TFHE uses symmetric cryptography which is always quantum-safe"
            ],
            correctIndex: 1,
            explanation: "Ethereum's ECDSA signatures and most existing blockchain cryptography are vulnerable to Shor's algorithm — a sufficiently powerful quantum computer could derive private keys from public keys. Fhenix's FHE layer is built on LWE hardness, which the best known quantum algorithms cannot efficiently attack. As quantum computing advances, FHE-based privacy infrastructure becomes not just a privacy layer but a post-quantum security layer for the applications built on it.",
            illustration: "⚛️"
          },
          {
            id: "7-m-5",
            question: "What does 'privacy as a public good' mean in the context of Fhenix, and why is it different from 'privacy as a premium feature'?",
            options: [
              "Fhenix will make their technology free for non-profits",
              "When FHE becomes fast and cheap enough to be the default computation layer, privacy becomes the baseline for all on-chain activity — not an opt-in feature that users pay extra for. Every DeFi user gets privacy automatically, not just those who can afford premium privacy services",
              "Privacy will be enforced by government regulation",
              "Fhenix will open-source all their code for public use"
            ],
            correctIndex: 1,
            explanation: "Today, privacy is a premium: you pay more in fees, complexity, or latency to use private versions of DeFi protocols. As FHE hardware costs drop and performance improves, the cost gap between private and public computation approaches zero. At that point, there's no reason NOT to make all computation private by default. Privacy becomes like HTTPS — the baseline expectation, not the exception. This is the 'privacy as infrastructure' endgame.",
            illustration: "🌍"
          },
          {
            id: "7-m-1",
            question: "FHE represents a different paradigm from off-chain privacy solutions (like trusted execution environments or MPC networks). What is the fundamental paradigm difference?",
            options: [
              "FHE is faster than all off-chain solutions",
              "Off-chain solutions relocate the trust requirement (to an enclave, a set of MPC nodes, a hardware provider) rather than eliminating it; FHE eliminates the trust requirement entirely by making privacy a mathematical property of the computation itself, verifiable without trusting any party",
              "Off-chain solutions are more expensive",
              "FHE works on all chains while off-chain solutions are chain-specific"
            ],
            correctIndex: 1,
            explanation: "TEEs trust Intel or AMD not to have backdoors. MPC networks trust that a threshold of nodes isn't colluding. Trusted setups trust that ceremony participants deleted their toxic waste. FHE trusts only mathematics — specifically the hardness of LWE. This paradigm shift from 'trusted hardware/parties' to 'verifiable mathematics' is what makes FHE a genuinely different category of privacy solution.",
            illustration: "🎯"
          },
          {
            id: "7-m-2",
            question: "What is the significance of FHE hardware acceleration (photonic chips) not just for performance, but for the decentralization of the FHE ecosystem?",
            options: [
              "Hardware makes FHE computations deterministic",
              "As FHE hardware becomes commoditized and cheap, the barrier to running a CoFHE node drops — enabling broader decentralization of the operator set, reducing the trust surface, and making FHE infrastructure as decentralized as Ethereum validator sets eventually became",
              "Hardware acceleration removes the need for the blockchain entirely",
              "It allows FHE to work offline without an internet connection"
            ],
            correctIndex: 1,
            explanation: "Today, FHE computation cost limits who can run CoFHE nodes economically — creating centralizing pressure. As photonic FHE chips commoditize (following a similar trajectory to GPUs for proof generation), the cost drops until running a CoFHE node is as economical as running an Ethereum validator. This decentralization of the compute layer is essential for the long-term security and censorship-resistance of the FHE privacy layer.",
            illustration: "🌐"
          },
          {
            id: "7-m-3",
            question: "If FHE becomes the default privacy layer for public blockchains, what new class of applications becomes possible that is currently impossible in both traditional finance AND public blockchains?",
            options: [
              "Faster payment settlement",
              "Cryptographically private, trustless, programmable financial markets: where complex financial logic executes on encrypted data with verifiable correctness, enabling institutional-grade privacy without custodians, trusted parties, or regulatory arbitrage — combining the trustlessness of crypto with the confidentiality of private finance",
              "Cheaper cross-border payments",
              "Decentralized social media applications"
            ],
            correctIndex: 1,
            explanation: "Traditional finance has privacy but requires trusted intermediaries. Public crypto has trustlessness but no privacy. FHE blockchain combines both: trustless execution (no intermediary needed) with cryptographic privacy (no data exposed). This enables entirely new financial primitives — private clearing, encrypted credit markets, confidential derivatives — that are impossible in a system that must choose between trust and transparency. FHE ends that tradeoff.",
            illustration: "🚀"
          }
        ]
      }
    ]
  }
];

export function getTotalQuestions(): number {
  return topics.reduce((total, topic) =>
    total + topic.levels.reduce((lt, level) => lt + level.questions.length, 0), 0);
}

export function getMaxScore(): number {
  let score = 0;
  topics.forEach(topic => {
    topic.levels.forEach(level => {
      const pts = level.level === 'beginner' ? 10 : level.level === 'intermediate' ? 20 : 30;
      score += level.questions.length * pts;
    });
  });
  return score;
}

export function getPointsForLevel(level: Level): number {
  return level === 'beginner' ? 10 : level === 'intermediate' ? 20 : 30;
}

export function getBadgeInfo(scorePercent: number): { rank: string; color: string; emoji: string; description: string } {
  if (scorePercent >= 91) return { rank: 'Fhenix Master', color: '#FFB800', emoji: '🏆', description: 'You have mastered the full Fhenix ecosystem' };
  if (scorePercent >= 71) return { rank: 'Cipher Agent', color: '#7B3FE4', emoji: '🔮', description: 'You understand FHE at a deep technical level' };
  if (scorePercent >= 41) return { rank: 'FHE Explorer', color: '#00D4FF', emoji: '🔭', description: 'You grasp the core concepts of on-chain privacy' };
  return { rank: 'Privacy Newcomer', color: '#A0ADB8', emoji: '🌱', description: 'Your journey into on-chain privacy has begun' };
}
