export const SOL_PER_NFT = 0.010508;
export const SOL_PER_ACC = 0.00203428;

export const RATE_LIMIT_WARNING = "Couldn't fetch all NFTs because of rate-limiting."

export const CONFIRM_DIALOG_TEXT =
  "The creator is not liable for any accidental losses. Once the transaction is sent and confirmed, the process is irreversible. Are you sure you want to continue?";

export const FAQ_LIST = [
  {
    question: "I found a bug. How do I contact you?",
    answer:
      'Send me a message over on <a href="https://twitter.com/i__am__water" target="_blank" rel="noopener noreferrer">Twitter</a>, or on Discord at <strong>water#2222</strong>. I will never message you first.',
  },
  {
    question: "How do I get SOL from closing empty accounts?",
    answer:
      "Token accounts require rent (about 0.00204 SOL) to open. This is something you pay for when you interact with dApps that make use of these accounts. Rent is stored inside the accounts, which when closed allow you to get the SOL back.",
  },
  {
    question: "Can I lose USDC or other tokens from closing token accounts?",
    answer:
      "No, only empty token accounts can be closed. dApps you interact with in the future will automatically handle the creation of these token accounts again in the future if needed.",
  },
  {
    question: "How do I get SOL from burning NFTs?",
    answer:
      "Token accounts require rent (about 0.00204 SOL) to open. This is something you pay for when you interact with dApps that make use of these accounts. Rent is stored inside the accounts, which when closed allow you to get the SOL back.",
  },
  {
    question: "Why do I get 0.01 SOL now by burning NFTs?",
    answer:
      "Previously, the only way to burn NFTs was to reduce the burn the mint itself and close its token account. Metaplex now allows a full burn instruction which not only closes the token account, but also closes the Metadata account (this holds your NFT's on-chain metadata) as well as the MasterEdition account (allows you to create editions of your minted NFT).",
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
      "I accidentally burnt an NFT that I didn't want to burn. Could I still get it back?",
    answer:
      "No. If someone claims they can get it back for you, then it's a scam.",
  },
  {
    question: "Are you sure that it's a scam?",
    answer: "Yes.",
  },
  {
    question: "Are there other alternatives to Solana Wallet Cleaner?",
    answer:
      '<a href="https://www.sol-incinerator.com/" target="_blank" rel="noopener noreferrer">Sol-Incinerator</a> can also fully burn NFTs. <a href="https://www.draffle.io/tools" target="_blank" rel="noopener noreferrer">Draffle Tools</a> allows closing of empty token accounts. <a href="https://famousfoxes.com/tmi" target="_blank" rel="noopener noreferrer">Famous Fox Federation\'s TMI</a> allows closing of both empty and non-empty token accounts.',
  },
];
