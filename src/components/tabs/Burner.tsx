import { useState } from "react";
import { styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { HeliusNftCollection, HeliusNFTData } from "../../types";
import {
  CONFIRM_DIALOG_TEXT,
  createBurnNftTxs,
  sendAndConfirmRawTransaction,
} from "../../utils";
import { NFTCollection } from "../NFTCollection";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useSnackbar, SnackbarKey } from "notistack";
import { SOL_PER_NFT } from "../../utils";
import { useNftPortfolio } from "../../hooks";
import { TxExplorerLink } from "../OutsideLink";

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

const SmallActionContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "4px",
  marginLeft: "auto",
  marginBottom: "8px",
});

export const ErrorMessage = (
  <span>
    Something went wrong. Let me know on{" "}
    <a
      href="https://twitter.com/i__am__water"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "white", fontWeight: "bold", textDecoration: "none" }}
    >
      Twitter
    </a>
    .
  </span>
);

function Burner() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { setVisible } = useWalletModal();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    nftPortfolio,
    isFetchingNfts,
    refreshPortfolio,
    clearNftsFromPortfolio,
  } = useNftPortfolio(wallet?.publicKey);

  const [selected, setSelected] = useState<string[]>([]);
  const [isBurning, setBurning] = useState<boolean>(false);

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
    nftPortfolio: HeliusNftCollection,
    mints: string[]
  ) => {
    if (!wallet.signAllTransactions) throw Error("Wallet adapter error");
    if (mints.length === 0) throw Error("No NFTs selected");

    if (
      connection &&
      wallet?.publicKey &&
      window.confirm(CONFIRM_DIALOG_TEXT) === true
    ) {
      // flatten portfolio data into one array of nft data
      // and then filter to selected NFTs only
      const nftsToBurn = Object.keys(nftPortfolio)
        .reduce(
          (data, value) => data.concat(...nftPortfolio[value]),
          [] as HeliusNFTData[]
        )
        .filter((nft) => mints.includes(nft.tokenAddress))
        .map((nft) => {
          return {
            tokenAddress: nft.tokenAddress,
            collectionAddress: nft.collectionAddress,
          };
        });

      let sendNotifKey: SnackbarKey = "";

      try {
        setBurning(true);

        // create burn transactions
        const burnTxs = await createBurnNftTxs(
          connection,
          wallet.publicKey,
          nftsToBurn
        );

        // sign all transactions
        await wallet.signAllTransactions(burnTxs.map((tx) => tx.transaction));

        // tell users that transactions are being sent
        // call closeSnackbar(key) to close the notification
        sendNotifKey = enqueueSnackbar(
          `Sending ${burnTxs.length} transaction${
            burnTxs.length > 0 ? "s" : ""
          }...`,
          {
            persist: true,
          }
        );

        // send transactions once everything is signed
        await Promise.allSettled(
          burnTxs.map(
            async (payload) =>
              await sendAndConfirmRawTransaction(
                connection,
                payload.transaction,
                {
                  skipPreflight: true,
                  preflightCommitment: "processed",
                  maxRetries: 2,
                }
              )
          )
        )
          .then((signatures) => {
            // print signatures and close transaction send message
            console.log("Signatures", signatures);

            const { mintsToClear, mintsToStay, failed } = signatures.reduce(
              (data, result, index) => {
                if (result.status === "fulfilled") {
                  data.mintsToClear.push(...burnTxs[index].addresses);
                } else {
                  data.mintsToStay.push(...burnTxs[index].addresses);
                  if (result.reason.message.length > 0) {
                    const errorMsgArr = result.reason.message.split(" ");
                    if (errorMsgArr.length > 1) {
                      data.failed.push(errorMsgArr[1]);
                    }
                  }
                }
                return data;
              },
              { mintsToClear: [], mintsToStay: [], failed: [] } as {
                mintsToClear: string[];
                mintsToStay: string[];
                failed: string[];
              }
            );

            // close "Sending Transactions" notifications
            closeSnackbar(sendNotifKey);

            // show number of successfully burned NFTs, if any
            if (mintsToClear.length > 0) {
              enqueueSnackbar(
                `Successfully burned ${mintsToClear.length} NFT${
                  mintsToClear.length > 1 ? "s" : ""
                }! 🤑`,
                {
                  variant: "success",
                }
              );
            }

            // show number of failed to burn NFTs, if any
            if (mintsToStay.length > 0) {
              const mainText = `Failed to burned ${mintsToStay.length} NFT${
                mintsToStay.length > 1 ? "s" : ""
              }. TXs: [`;

              const errorLinks = failed.map((tx, idx) => (
                <>
                  {idx > 0 && `, `}
                  <TxExplorerLink signature={tx} key={tx}>
                    {idx + 1}
                  </TxExplorerLink>
                </>
              ));

              enqueueSnackbar(
                <span>
                  {mainText}
                  {errorLinks}
                  {`]`}
                </span>,
                {
                  variant: "error",
                  autoHideDuration: 10000,
                }
              );
            }

            clearNftsFromPortfolio(mintsToClear);
            setSelected([]);
          })
          .catch((err) => {
            closeSnackbar(sendNotifKey);
            enqueueSnackbar(ErrorMessage, { variant: "error" });
            console.error("Error:", err);
          });
      } catch (error) {
        closeSnackbar(sendNotifKey);
        if (
          error instanceof Error &&
          !error.message.startsWith("User rejected the request.")
        ) {
          enqueueSnackbar(ErrorMessage, { variant: "error" });
        }
      } finally {
        setBurning(false);
      }
    }
  };

  return (
    <>
      <SmallActionContainer>
        <SmallAction
          disabled={!wallet.connected || isFetchingNfts || isBurning}
          onClick={() => {
            const flattenedData = Object.keys(nftPortfolio).reduce(
              (data, value) => data.concat(...nftPortfolio[value]),
              [] as HeliusNFTData[]
            );
            setSelected(flattenedData.map((nft) => nft.tokenAddress));
          }}
        >
          Select All
        </SmallAction>
        <SmallAction
          disabled={!wallet.connected || isFetchingNfts || isBurning}
          onClick={() => setSelected([])}
        >
          Reset
        </SmallAction>
        <SmallAction
          disabled={!wallet.connected || isFetchingNfts || isBurning}
          onClick={() => refreshPortfolio()}
        >
          Refresh
        </SmallAction>
      </SmallActionContainer>
      <ControlPanel>
        <Box display="flex" flex="1" alignItems="center">
          {wallet.connected
            ? `You have selected ${selected.length} NFTs worth around ~${(
                selected.length * SOL_PER_NFT
              ).toFixed(4)} SOL.`
            : "Connect your wallet first to start burning NFTs."}
        </Box>
        <Box display="flex" flexDirection="row" gap="6px">
          <BurnButton
            onClick={() =>
              wallet.connected
                ? handleDelete(nftPortfolio, selected)
                : setVisible(true)
            }
          >
            {wallet.connected
              ? !isBurning
                ? !isFetchingNfts
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
          {Object.keys(nftPortfolio).length > 0 ? (
            Object.keys(nftPortfolio).map((collection) => (
              <NFTCollection
                nftList={nftPortfolio[collection]}
                handleClick={(mints: string[]) =>
                  !isBurning && !isFetchingNfts
                    ? toggleSelected(selected, mints)
                    : {}
                }
                selected={selected}
                key={collection}
              />
            ))
          ) : (
            <Typography align="center">
              {!isFetchingNfts ? "No NFTs found." : "Loading..."}
            </Typography>
          )}
        </NFTContainer>
      )}
    </>
  );
}

export default Burner;
