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

export const SOLANA_FM =
  "data:image/png;base64,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";
export const SOLANA_EXPLORER =
  "data:image/png;base64,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AAeAAAADwAAAAeAAAADwAAAA////////////////";
export const SOLSCAN =
  "data:image/png;base64,AAABAAMAEBAAAAEAIABoBAAANgAAACAgAAABACAAKBEAAJ4EAAAwMAAAAQAgAGgmAADGFQAAKAAAABAAAAAgAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACz5gAotecAjbXoANK15wD4tOgA/bXoAOG26ACdsucAKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ/fAAi06ACStegA/LXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAMWq/wADAAAAAAAAAAAAAAAAAAAAAKrjAAm06AC/tegA/7XoAP+16AD/tegA/rXoAOe16ADqtegA/7TnAMy77gAPAAAAAKr/AAO/vwAEAAAAAAAAAAC16QCYtegA/7XoAP+26QD6tegAh7rrABoAAAAAAAAAALbtAByz5gAKAAAAAICAAAK06QCgtOgAjwAAAACz6QAvtegA/bXoAP+16AD7s+cASgAAAAAAAAAA5Em/HONMxhsAAAAAAAAAAAAAAAC05wCStegA/7ToAP2z5AAvtecAlbXoAP+16AD/tekAigAAAADcRsEd4krHxONKx//jSsf/4krGwuJFxBoAAAAAtukAi7XoAP+16AD/tekAlLXoANa16AD/tegA/rLuAB4AAAAA4krHxONKx//jSsf/40rH/+NKx//jSse+AAAAALXmAB+16AD+tegA/7ToANS16AD2tegA/7boAOkAAAAA40zGG+NKx//jSsf/40rH/+NKx//jSsf/40rH/txGxRYAAAAAtegA6rXoAP+16ADxtOcA9rXoAP+16ADpAAAAAONMxhvjSsf/40rH/+NKx//jSsf/40rH/+NKyP7cRsUWAAAAALboAOy16AD/tecA7rXoANW16AD/tegA/rntAB0AAAAA4krHxONKx//jSsf/40rH/+NKx//iSce/AAAAALbpACO16AD/tegA/7XnAMy06ACTtegA/7XoAP+16QCJAAAAAOVGwR3jSsfF40rH/+NKx//iSsbC4kXEGgAAAAC16ACOtegA/7XoAP+26QCJseMALrXoAP216AD/tukA+rbnAEkAAAAAAAAAAORJyBzjTMYbAAAAAAAAAAC26ABNtekA+7XoAP+06AD8tesAJgAAAAC15wCXtegA/7XoAP+16QD6tegAh7rrABoAAAAAAAAAALDl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x//jSsf/40rH/ORKx2gAAAAAAAAAAAAAAACA/wACtegAz7XoAP+16AD/tegA/7XoAP+16AD/tekAU7TnAJa16AD/tegA/7XoAP+16AD/tegA/7ToAGMAAAAAAAAAAAAAAADmSchG40rI/eNKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rG/OZIyDwAAAAAAAAAAAAAAAC16ABktegA/7XoAP+16AD/tegA/7XoAP+26ACStekAxbXoAP+16AD/tegA/7XoAP+06AD9ufMAFgAAAAAAAAAAAAAAAORLx83jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/4krGwgAAAAAAAAAAAAAAALHpABe06AD9tegA/7XoAP+16AD/tegA/7boAL+16ADmtegA/7XoAP+16AD/tegA/7XoAOAAAAAAAAAAAAAAAADjR8Yk40rH/uNKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf94EfCGQAAAAAAAAAAAAAAALXoAOG16AD/tegA/7XoAP+16AD/tegA3LTnAPa16AD/tegA/7XoAP+16AD/tegAyAAAAAAAAAAAAAAAAONMyErjSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jScY/AAAAAAAAAAAAAAAAtegAybXoAP+16AD/tegA/7XoAP+16ADqtegA9bXoAP+16AD/tegA/7XoAP+16QDHAAAAAAAAAAAAAAAA40zISuNKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NJxj8AAAAAAAAAAAAAAAC15wDMtegA/7XoAP+16AD/tegA/7XoAOe16ADktegA/7XoAP+16AD/tegA/7XoAN8AAAAAAAAAAAAAAADjR8Yk40rH/uNKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsj94EfMGQAAAAAAAAAAAAAAALXpAOe16AD/tegA/7XoAP+16AD/tegA07XoAMS16AD/tegA/7XoAP+16AD/tekA/LbnABUAAAAAAAAAAAAAAADjSsfO40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NK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ABoAAAAAAAAAAAAAAAC/vwAEtegAmLXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7ToALCv5wAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALXqABi16ACotegA+7XoAP+16AD/tegA/7XoAP+16AD/tegA/7TnAJaAvwAEAAAAAAAAAAC36QAutegA4bXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tekAz7XqABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AeJGyyzjScdl5EnIguRJyILjSsdk5kvHKf8A/wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALXnAIm16AD6tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XnAOG36QAuAAAAAICAAAKz5gBytOcA+bXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16ADqsugAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN9AvxDkSsdW4krGy+NJx/7jSsf/40rH/+NKx//jSsf/40nH/uNJyMbjSMZR607EDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALboADi05wDstegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7TnAPmz5gBygIAAArvuAA+16QCstegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XpAPu16ACQxv8ACQAAAAAAAAAAAAAAAAAAAAAAAAAA503KK+JKx6jjSsf140rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//kSsfy4krGoeJJxSMAAAAAAAAAAAAAAAAAAAAAAAAAALPmAAq26ACTtegA/LXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+15wCsu+4AD7noACG16ADgtegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAOe06QA6AAAAAAAAAAAAAAAAAAAAAAAAAADhTcor40rHzONKx/7jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/5EvI/eJKx8ToS8siAAAAAAAAAAAAAAAAAAAAAAAAAAC06gA9tegA6LXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16ADfsugAIbfoAEO16AD8tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XpALeZzAAFAAAAAAAAAAAAAAAAAAAAAO5EzA/kScin40rH/uNKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx/3jSsec6kC/DAAAAAAAAAAAAAAAAAAAAACZ/wAFtegAurXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD8tucAP7ToAHu16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7bnAF4AAAAAAAAAAAAAAAAAAAAAAAAAAORLyVXjSsf140rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//iScfw40fGSAAAAAAAAAAAAAAAAAAAAAAAAAAAtOcAX7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tOcAdLTpAKq16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tecA+bnoABYAAAAAAAAAAAAAAAAAAAAA/wD/AeNKx8rjSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rHtwAAAAAAAAAAAAAAAAAAAAAAAAAAsekAF7XoAPm16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tecAn7XoAM+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tugA1QAAAAAAAAAAAAAAAAAAAAAAAAAA4kbFLONJx/7jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/4krH+tlCxhsAAAAAAAAAAAAAAAAAAAAAAAAAALToANe16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tugAv7ToAOW16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tugAsQAAAAAAAAAAAAAAAAAAAAAAAAAA40rHZONKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+VKyE8AAAAAAAAAAAAAAAAAAAAAAAAAALTnALW16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tOcA1LToAPO16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tecAoQAAAAAAAAAAAAAAAAAAAAAAAAAA40vIgeNKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx24AAAAAAAAAAAAAAAAAAAAAAAAAALXnAKK16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA3rXoAPK16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tukAoAAAAAAAAAAAAAAAAAAAAAAAAAAA40vIgeNKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKyG8AAAAAAAAAAAAAAAAAAAAAAAAAALXoAKa16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA2rXnAOO16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegAsAAAAAAAAAAAAAAAAAAAAAAAAAAA40rHZONKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+JJxlAAAAAAAAAAAAAAAAAAAAAAAAAAALToALy16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegAyrTnAMy16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tOcA1AAAAAAAAAAAAAAAAAAAAAAAAAAA4kbFLONJx/7jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH+uNM0BsAAAAAAAAAAAAAAAAAAAAA//8AAbboAOK16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tukArrToAKe16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA+LzyABMAAAAAAAAAAAAAAAAAAAAA/wD/AeNKx8rjSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/4krGuQAAAAAAAAAAAAAAAAAAAAAAAAAAtvAAI7XoAPy16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tecAirXoAHi16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAFoAAAAAAAAAAAAAAAAAAAAAAAAAAOFKx1bjSsf140rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsfw40nHSQAAAAAAAAAAAAAAAAAAAAAAAAAAtegAbrXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD+tegAWrPnAEC06AD8tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoALSq/wADAAAAAAAAAAAAAAAAAAAAAN9AvxDkScio40rH/uNKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKyP3jScid6kC/DAAAAAAAAAAAAAAAAAAAAAC/3wAItOcAw7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16ADytegALa/nACC16ADdtegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAOe26AA4AAAAAAAAAAAAAAAAAAAAAAAAAADhR8or4knGzeNKx/7jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jSsf/5EvI/eRKx8TiScwjAAAAAAAAAAAAAAAAAAAAAAAAAAC27ABCtegA6rXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+15wDKuOsAGbbtAA616ACptegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XpAPu06ACPquMACQAAAAAAAAAAAAAAAAAAAAAAAAAA4kbFLORKx6njSsf140rH/+NKx//jSsf/40rH/+NKx//jSsf/40rH/+NKx//jScbz4krIoeNHxiQAAAAAAAAAAAAAAAAAAAAAAAAAALnoAAu16QCYtekA/LXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP606QCWquMACf//AAG16AButecA+LXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16ADqs+wANgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN9QvxDiSsZZ40rHzuNKx/7jSsf/40rH/+NKx//jSsf/40nH/uNJx8fjS8dS20nIDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALPnAEC16QDutegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAPKz6QBbAAAAAAAAAACy5wArtegA37XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tecAzrHpABcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4CAAuRHyS/kSsln4knHheJJxYTjSsdk4UnCKv8A/wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtuQAHLXpANi16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoANWz7AAbAAAAAAAAAACq/wADtugAkrXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7bpAK677gAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC46gAktOcAuLXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XqAHkAAAAAAAAAAAAAAAAAAAAAuusAGrToAOu16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAPu15wCtuegAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALPsABu16QC2tegA/LXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tOgA27btAA4AAAAAAAAAAAAAAAAAAAAAAAAAALfpAGq15wD5tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tugAyrTmADO/3wAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACz5gAKtOkAOrboANS16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD1s+cAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALzkABO16ACytegA/rXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAOe15wCKtOYAM///AAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgL8ABLfpADm16ACRtegA67XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAPy06ACku+4ADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAG06QA6tOgA5bXoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD7tekA5LXpAK2z6QBQttsADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALTwABG26ABXtegAtLXoAOe16QD7tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAN636QAuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAteYAXbXoAPK16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA9LXnAMu16ACltegAkbToAJK15wCotOgAz7XnAPe16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tOgA77jrAEsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIAAArPnAGy16ADqtegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+16AD/tegA/7XoAP+06ADltOcAXwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
