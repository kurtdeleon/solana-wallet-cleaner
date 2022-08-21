import { useEffect, useState } from "react";
import { styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  HeliusNftCollection,
  HeliusNFTData,
  HeliusNFTPortfolio,
} from "../../types";
import { getNftPortfolio } from "../../api";
import {
  CONFIRM_DIALOG_TEXT,
  createBurnNftTxs,
  sendAndConfirmRawTransaction,
} from "../../utils";
import { NFTCollection } from "../NFTCollection";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useSnackbar } from "notistack";

const NFTContainer = styled("div")({
  height: "100%",
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const ControlPanel = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  padding: "12px 12px",
  backgroundColor: "#ffffff",
  marginBottom: "16px",
  border: "6px solid #2e153443",
  borderRadius: "6px",
  "@media (max-width: 480px)": {
    flexDirection: "column",
  },
});

const BurnButton = styled("button")({
  background: "#ba0000",
  padding: "12px 16px",
  color: "white",
  outline: "none",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
  width: "160px",
  fontWeight: "bold",
});

const SmallAction = styled("button")({
  fontSize: "12px",
  fontWeight: "bold",
  padding: "4px 12px",
  color: "#fff",
  background: "#1d05237d",
  outline: "none",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
});

export const ErrorMessage = (
  <span>
    Something went wrong. Feel free to send the failed transaction links to{" "}
    <a
      href="https://twitter.com/i__am__water"
      target="_blank"
      rel="noopener noreferrer"
    >
      me on Twitter
    </a>
    .
  </span>
);

const solPerNft = 0.010508;

function Burner() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { setVisible } = useWalletModal();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [selected, setSelected] = useState<string[]>([]);
  const [portfolioData, setPortfolioData] = useState<HeliusNftCollection>({});
  const [isFetching, setFetching] = useState<boolean>(false);
  const [isBurning, setBurning] = useState<boolean>(false);

  // refreshes the portfolio of the current wallet
  const refreshPortfolio = async (wallet: string) => {
    setPortfolioData({});
    setFetching(true);
    const nftData: HeliusNFTPortfolio = await getNftPortfolio(wallet);
    if (nftData.nfts) {
      const groupedNftData = nftData.nfts.reduce(function (group, value) {
        if (!group[value.collectionAddress]) {
          group[value.collectionAddress] = [];
        }
        group[value.collectionAddress].push(value);
        return group;
      }, {} as HeliusNftCollection);
      setPortfolioData(groupedNftData);
    }
    setFetching(false);
  };

  // everytime wallet is changed, refresh portfolio data
  useEffect(() => {
    if (wallet.publicKey) {
      refreshPortfolio(wallet.publicKey.toBase58());
    }
  }, [wallet.publicKey]);

  // toggles all mints that are passed down
  const toggleSelected = (selected: string[], mints: string[]) => {
    let clonedArray: string[] = structuredClone(selected);
    for (const mint of mints) {
      if (clonedArray.includes(mint)) {
        clonedArray = clonedArray.filter((mintAddress) => mintAddress !== mint);
      } else {
        clonedArray.push(mint);
      }
    }
    setSelected(clonedArray);
  };

  // handler for "Burn" button
  const handleDelete = async (
    portfolioData: HeliusNftCollection,
    mints: string[]
  ) => {
    if (!wallet.signAllTransactions) throw Error("Wallet adapter error");

    if (
      wallet &&
      connection &&
      wallet.publicKey &&
      window.confirm(CONFIRM_DIALOG_TEXT) === true
    ) {
      // flatten portfolio data into one array of nft data
      const flattenedData = Object.keys(portfolioData).reduce(
        (data, value) => data.concat(...portfolioData[value]),
        [] as HeliusNFTData[]
      );

      // get data of all selected nfts
      const list = flattenedData
        .filter((nft) => mints.includes(nft.tokenAddress))
        .map((nft) => {
          return {
            tokenAddress: nft.tokenAddress,
            collectionAddress: nft.collectionAddress,
          };
        });

      // create burn transactions
      const burnTxs = await createBurnNftTxs(
        connection,
        wallet.publicKey,
        list
      );

      try {
        setBurning(true);

        // sign transactions
        await wallet.signAllTransactions(burnTxs);

        const key = enqueueSnackbar(`Sending transactions...`);

        // send all transactions once signed
        await Promise.all(
          burnTxs.map(
            async (tx) =>
              await sendAndConfirmRawTransaction(connection, tx, {
                skipPreflight: true,
                preflightCommitment: "processed",
                maxRetries: 2,
              })
          )
        )
          .then((signatures) => {
            closeSnackbar(key);
            enqueueSnackbar(`Successfully burned ${mints.length} NFTs. ✨`, {
              variant: "success",
            });
            console.log("Signatures", signatures);
            const cloned = structuredClone(
              portfolioData
            ) as HeliusNftCollection;

            const newPortfolioData: HeliusNftCollection = {};

            // remove all nfts that are already in the mint array
            Object.keys(cloned).forEach((key) => {
              const newArray = cloned[key].filter(
                (nft) => !mints.includes(nft.tokenAddress)
              );
              if (newArray.length > 0) newPortfolioData[key] = newArray;
            });

            // clear data
            setPortfolioData(newPortfolioData);
            setSelected([]);
          })
          .catch((err) => {
            closeSnackbar(key);
            enqueueSnackbar(ErrorMessage, { variant: "error" });
            console.error("Error:", err);
          })
          .finally(() => setBurning(false));
      } catch (error) {
        enqueueSnackbar(ErrorMessage, { variant: "error" });
        setBurning(false);
      }
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        gap="4px"
        marginLeft="auto"
        marginBottom="8px"
      >
        <SmallAction
          disabled={!wallet.connected || isFetching || isBurning}
          onClick={() => {
            const flattenedData = Object.keys(portfolioData).reduce(
              (data, value) => data.concat(...portfolioData[value]),
              [] as HeliusNFTData[]
            );
            setSelected(flattenedData.map((nft) => nft.tokenAddress));
          }}
        >
          Select All
        </SmallAction>
        <SmallAction
          disabled={!wallet.connected || isFetching || isBurning}
          onClick={() => setSelected([])}
        >
          Reset
        </SmallAction>
        <SmallAction
          disabled={!wallet.connected || isFetching || isBurning}
          onClick={() => refreshPortfolio(wallet.publicKey!.toBase58())}
        >
          Refresh
        </SmallAction>
      </Box>
      <ControlPanel>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            background: "transparent",
          }}
        >
          {wallet.connected
            ? `You have selected ${selected.length} NFTs worth around ~${(
                selected.length * solPerNft
              ).toFixed(4)} SOL.`
            : "Connect your wallet first to start burning NFTs."}
        </Box>
        <Box display="flex" flexDirection="row" gap="6px">
          <BurnButton
            onClick={() =>
              wallet.connected
                ? handleDelete(portfolioData, selected)
                : setVisible(true)
            }
          >
            {wallet.connected
              ? !isBurning
                ? !isFetching
                  ? `🔥 Burn ${
                      selected.length > 0 ? selected.length + " " : ""
                    }NFTs`
                  : "⏳ Loading NFTs..."
                : "🤑 Burning..."
              : "Connect wallet"}
          </BurnButton>
        </Box>
      </ControlPanel>
      {wallet.connected && (
        <NFTContainer>
          {Object.keys(portfolioData).length > 0 ? (
            Object.keys(portfolioData).map((collection) => (
              <NFTCollection
                nftList={portfolioData[collection]}
                handleClick={(mints: string[]) =>
                  !isBurning && !isFetching
                    ? toggleSelected(selected, mints)
                    : {}
                }
                selected={selected}
                key={collection}
              />
            ))
          ) : (
            <Typography align="center">
              {!isFetching ? "No NFTs found." : "Loading..."}
            </Typography>
          )}
        </NFTContainer>
      )}
    </>
  );
}

export default Burner;
