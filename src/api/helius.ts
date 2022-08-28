import { HeliusNftCollection, HeliusNFTPortfolio } from "../types";

export async function getNftMetadata(mintAccounts: string[]) {
  return fetch(
    `https://api.helius.xyz/v0/tokens/metadata?api-key=${process.env.REACT_APP_HELIUS_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mintAccounts }),
      referrerPolicy: "origin-when-cross-origin",
    }
  ).then((data) => data.json());
}

export async function getNftPortfolio(
  wallet: string,
  page: number = 1
): Promise<HeliusNFTPortfolio> {
  return fetch(
    `https://api.helius.xyz/v0/addresses/${wallet}/nfts?api-key=${process.env.REACT_APP_HELIUS_API_KEY}&pageNumber=${page}`,
    { referrerPolicy: "origin-when-cross-origin" }
  ).then((data) => data.json());
}
