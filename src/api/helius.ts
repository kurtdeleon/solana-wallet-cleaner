export async function getNftMetadata(mintAccounts: string[]) {
  return fetch(
    `https://api.helius.xyz/v0/tokens/metadata?api-key=${process.env.REACT_APP_HELIUS_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mintAccounts }),
    }
  ).then((data) => data.json());
}

export async function getNftPortfolio(wallet: string) {
  return fetch(
    `https://api.helius.xyz/v0/addresses/${wallet}/nfts?api-key=${process.env.REACT_APP_HELIUS_API_KEY}`
  ).then((data) => data.json());
}
