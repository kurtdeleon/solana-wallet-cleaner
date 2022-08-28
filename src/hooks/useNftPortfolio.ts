import { PublicKey } from "@solana/web3.js";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getNftPortfolio } from "../api";
import { HeliusNftCollection, HeliusNFTPortfolio } from "../types";
import { RATE_LIMIT_WARNING } from "../utils";

// TODO add retry in the future?
export const useNftPortfolio = (wallet: PublicKey | null | undefined) => {
  const [isFetchingNfts, setIsFetchingNfts] = useState<boolean>(false);
  const [nftPortfolio, setNftPortfolio] = useState<HeliusNftCollection>({});
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Fetches NFTs from Helius
   * @param wallet
   */
  const fetchNftPortfolio = async (wallet: string) => {
    try {
      setIsFetchingNfts(true);
      // fetch first page of user's NFT portfolio
      const nftData = await getNftPortfolio(wallet);
      if (!nftData) throw Error("Error fetching NFTs.");

      if (nftData.numberOfPages > 1) {
        // if portfolio has multiple pages,
        // get all data from other pages starting from page 2
        // and then filter only the successful requests
        const successfulFetches = (
          await Promise.allSettled(
            Array.from({ length: nftData.numberOfPages }, (_, i) => ++i)
              .slice(1)
              .map(async (page) => await getNftPortfolio(wallet, page))
          )
        ).filter(
          (data) =>
            data.status === "fulfilled" && data.value.hasOwnProperty("nfts")
        ) as PromiseFulfilledResult<HeliusNFTPortfolio>[];

        // add the rest of the nft data to the initial fetch
        successfulFetches.forEach((data) => {
          nftData.nfts.push(...data.value.nfts);
        });

        // if there are any failed fetches, let users know via a warning
        if (successfulFetches.length + 1 < nftData.numberOfPages) {
          enqueueSnackbar(RATE_LIMIT_WARNING, { variant: "warning" });
        }
      }

      // group NFTs by collection address
      const portfolio = nftData.nfts.reduce((group, value) => {
        if (!group[value.collectionAddress])
          group[value.collectionAddress] = [];
        group[value.collectionAddress].push(value);
        return group;
      }, {} as HeliusNftCollection);

      setNftPortfolio(portfolio);
    } catch (error) {
      console.log("useNftPortfolio error:", error);
      enqueueSnackbar("Error fetching NFTs.", { variant: "error" });
    } finally {
      setIsFetchingNfts(false);
    }
  };

  const refreshNftPortfolio = async (wallet: PublicKey | null | undefined) => {
    if (wallet && PublicKey.isOnCurve(wallet)) {
      await fetchNftPortfolio(wallet.toBase58());
    } else {
      setNftPortfolio({});
    }
  };

  useEffect(() => {
    refreshNftPortfolio(wallet);
  }, [wallet]);

  const removeNftsFromPortfolio = (
    portfolioData: HeliusNftCollection,
    mints: string[]
  ) => {
    if (mints.length > 0) {
      const clonedData = structuredClone(portfolioData) as HeliusNftCollection;
      const newPortfolio = Object.keys(clonedData).reduce((newData, key) => {
        const newArray = clonedData[key].filter(
          (nft) => !mints.includes(nft.tokenAddress)
        );
        if (newArray.length > 0) newData[key] = newArray;
        return newData;
      }, {} as HeliusNftCollection);
      setNftPortfolio(newPortfolio);
    }
  };

  return {
    nftPortfolio,
    isFetchingNfts,
    refreshPortfolio: () => refreshNftPortfolio(wallet),
    clearNftsFromPortfolio: (mints: string[]) =>
      removeNftsFromPortfolio(nftPortfolio, mints),
  };
};
