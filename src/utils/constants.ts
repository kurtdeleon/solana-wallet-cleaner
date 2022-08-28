export const SOL_PER_NFT = 0.010508;
export const SOL_PER_ACC = 0.00203428;

export const RATE_LIMIT_WARNING =
  "Couldn't fetch all NFTs because of rate-limiting.";

export const CONFIRM_DIALOG_TEXT =
  "The creator is not liable for any accidental losses. Once the transaction is sent and confirmed, the process is irreversible. Are you sure you want to continue?";

export const FAQ_LIST = [
  {
    question: "I found a bug. How do I contact you?",
    answer:
      'Send me a message over on <a href="https://twitter.com/i__am__water" target="_blank" rel="noopener noreferrer">Twitter</a>, or on Discord at <strong>water#2222</strong>. I will never message you first.',
  },
  {
    question:
      "Can I lose NFTs or other tokens like USDC from closing token accounts?",
    answer:
      "No, only empty token accounts can be closed. dApps you interact with in the future will automatically handle the creation of these token accounts again in the future if needed.",
  },
  {
    question: "How do I get SOL from closing empty accounts?",
    answer:
      "Token accounts require rent (about 0.00204 SOL) to open. This is something you pay for when you interact with dApps that make use of these accounts. Rent is stored inside the accounts, which when closed allow you to get the SOL back.",
  },
  {
    question:
      "How do I get 0.01 SOL for burning NFTs? And why did I only get 0.002 SOL for some?",
    answer:
      "Previously, the only way to burn NFTs was to reduce the burn the mint itself and close its token account. This process gives 0.002 SOL as you're essentially only getting the rent from closing the account. Fortunately, Metaplex recently released a full burn instruction which not only closes the token account, but also closes the Metadata account (this holds your NFT's on-chain metadata) as well as the MasterEdition account (allows you to create editions of your minted NFT).",
  },
  {
    question: "I can't seem to burn a specific NFT. Why is that?",
    answer:
      'It\'s possible that the account that holds the NFT was frozen. <a href="https://github.com/solana-labs/solana-program-library/issues/3295" target="_blank" rel="noopener noreferrer">You can read more about it here</a>. Either that, or I might have messed something up. Feel free to let me know about it.',
  },
  {
    question: "Why am I sending multiple transactions at the same time?",
    answer:
      "Transactions have max data sizes to be considered valid. For burning NFTs, the max is 6 instructions. As for closing empty token accounts, the max is 27.",
  },
  {
    question:
      "I accidentally burned an NFT that I didn't want to burn. Could I still get it back?",
    answer:
      "No. If someone claims they can get back a burned NFT for you, then <strong>it's a scam</strong>. Doesn't matter who it is.",
  },
  {
    question: "Are there other alternatives to Solana Wallet Tools?",
    answer:
      '<a href="https://www.sol-incinerator.com/" target="_blank" rel="noopener noreferrer">Sol-Incinerator</a> can also fully burn NFTs. <a href="https://www.draffle.io/tools" target="_blank" rel="noopener noreferrer">dRaffle Tools</a> allows closing of empty token accounts. <a href="https://famousfoxes.com/tmi" target="_blank" rel="noopener noreferrer">Famous Fox Federation\'s TMI</a> allows closing of both empty and non-empty token accounts.',
  },
];

export const CHANGELOG = [
  {
    date: "August 21, 2022",
    changes: [
      "Initial launch with basic functionalities.",
      "Added traditional burn NFT instruction.",
      "Added FAQs modal.",
      "Added placeholder image for IPFS images that failed to load.",
    ],
  },
  {
    date: "August 28, 2022",
    changes: [
      "Combined Changelogs with FAQs modal.",
      "Updated initial on-screen modal.",
      "Rate-limiting from Helius now made more lenient (Thanks guys!).",
      "Actions now create TransactionPayloads so the dApp can keep track of NFTs that didn't failed to burn.",
      "Created nftPortfolio React hook to clean up code, as well as to prepare for multi-send NFTs feature.",
      "On error, explorer transaction signatures are now linked.",
      "Fixed bug with transactions not ending properly, which causes the dApp to get stuck in a loading state.",
      "Fixed bug with bigger wallets that caused rate-limiting. The dApp now lets users know if the query is incomplete.",
      'Fixed bug with "Sending transactions..." notification not persisting until all transactions are settled.',
    ],
  },
];

export const TODO_LIST = [
  "Make sending of transactions more optimal by allowing transactions of different instructions to be combined. Currently transactions are sent by type (metaplex burns vs normal burns are separated)",
  "Implement multi-send NFT feature (include closing of token account or not?)",
  "Token burner (with a way to check last transaction date)",
  "CMID scraper",
  "Mint your own NFT / send NFT message",
  "Move away from Material UI (it's shit)",
];
