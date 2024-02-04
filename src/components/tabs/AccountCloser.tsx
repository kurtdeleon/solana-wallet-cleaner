import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  createCloseAccountTxs,
  sendAndConfirmRawTransaction,
} from "../../utils";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { AccountCard } from "../AccountCard";
import { CONFIRM_DIALOG_TEXT } from "../../utils";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { SnackbarKey, useSnackbar } from "notistack";
import { SOL_PER_ACC } from "../../utils";

const AccountsContainer = styled(Box)({
  height: "100%",
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "100%",
  gap: "16px",
  "@media (max-width: 586px)": {
    alignItems: "normal",
  },
});

const CloseButton = styled("button")({
  background: "#ba0000",
  padding: "12px 16px",
  color: "white",
  outline: "none",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
  fontWeight: "bold",
});

const RefreshButton = styled("button")({
  border: "none",
  outline: "none",
  background: "transparent",
  cursor: "pointer",
});

export const ErrorMessage = (
  <span>
    Something went wrong. Let me know on{" "}
    <a
      href="https://github.com/kurtdeleon"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "white", fontWeight: "bold", textDecoration: "none" }}
    >
      Github
    </a>
    .
  </span>
);

function AccountCloser() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { setVisible } = useWalletModal();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [emptyAccounts, setEmptyAccounts] = useState<PublicKey[]>([]);
  const [isFetching, setFetching] = useState<boolean>(false);
  const [isClosing, setClosing] = useState<boolean>(false);

  // gets all token accounts and filters the empty ones
  const refreshTokenAccounts = async (wallet: PublicKey) => {
    if (connection) {
      setFetching(true);

      const { value: accounts } =
        await connection.getParsedTokenAccountsByOwner(wallet, {
          programId: TOKEN_PROGRAM_ID,
        });

      setEmptyAccounts(
        accounts
          .filter(
            (ta) => ta.account?.data?.parsed?.info?.tokenAmount?.uiAmount === 0
          )
          .map((ta) => ta.pubkey)
      );
      setFetching(false);
    }
  };

  // everytime wallet is changed, refresh portfolio data
  useEffect(() => {
    if (wallet.publicKey) {
      refreshTokenAccounts(wallet.publicKey);
    }
  }, [wallet.publicKey]);

  // handler for "Close All Token Accounts" button
  const handleCloseAccounts = async (emptyAccounts: PublicKey[]) => {
    if (!wallet.signAllTransactions) throw Error("Wallet adapter error");
    if (emptyAccounts.length === 0) throw Error("No accounts selected");

    if (
      connection &&
      wallet.publicKey &&
      window.confirm(CONFIRM_DIALOG_TEXT) === true
    ) {
      // create close account instructions
      const closeTxs = await createCloseAccountTxs(
        connection,
        emptyAccounts,
        wallet.publicKey
      );

      let sendNotifKey: SnackbarKey = "";

      try {
        setClosing(true);

        // sign all transactions
        await wallet.signAllTransactions(closeTxs.map((tx) => tx.transaction));

        // tell users that transactions are being sent
        // call closeSnackbar(key) to close the notification
        sendNotifKey = enqueueSnackbar(
          `Sending ${closeTxs.length} transaction${
            closeTxs.length > 0 ? "s" : ""
          }...`,
          {
            persist: true,
          }
        );

        // send all transactions once signed
        await Promise.allSettled(
          closeTxs.map(
            async (payload) =>
              await sendAndConfirmRawTransaction(
                connection,
                payload.transaction,
                {
                  skipPreflight: false,
                  preflightCommitment: "processed",
                  maxRetries: 2,
                }
              )
          )
        )
          .then((signatures) => {
            console.log("Signatures", signatures);

            const { accountsCleared, accountsFailed, failed } =
              signatures.reduce(
                (data, result, index) => {
                  if (result.status === "fulfilled") {
                    data.accountsCleared.push(...closeTxs[index].addresses);
                  } else {
                    data.accountsFailed.push(...closeTxs[index].addresses);
                    data.failed.push(result.reason);
                  }
                  return data;
                },
                { accountsCleared: [], accountsFailed: [], failed: [] } as {
                  accountsCleared: string[];
                  accountsFailed: string[];
                  failed: string[];
                }
              );

            // close "Sending Transactions" notifications
            closeSnackbar(sendNotifKey);

            // show number of successfully burned NFTs, if any
            if (accountsCleared.length > 0) {
              enqueueSnackbar(
                `Successfully burned ${accountsCleared.length} NFT${
                  accountsCleared.length > 1 ? "s" : ""
                }`,
                {
                  variant: "success",
                }
              );
            }

            // show number of failed to burn NFTs, if any
            if (accountsFailed.length > 0) {
              const mainText = `Failed to burned ${accountsFailed.length} NFT${
                accountsFailed.length > 1 ? "s" : ""
              }. TXs: `;
              //TODO add tx links here
              // failed.map((tx, idx)=><TxExplorerLink signature={tx} key={tx}>{idx}</TxExplorerLink> )
              enqueueSnackbar(<span>{mainText}</span>, {
                variant: "error",
              });
            }
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
        await refreshTokenAccounts(wallet.publicKey!);
        setClosing(false);
      }
    }
  };

  return (
    <>
      <Box textAlign="center">
        <Typography align="center" margin="8px">
          {wallet.connected
            ? `You have ${
                emptyAccounts.length
              } empty token account(s), which should net you around ~${(
                emptyAccounts.length * SOL_PER_ACC
              ).toFixed(4)} SOL.`
            : "Connect your wallet first to start burning NFTs."}
        </Typography>
      </Box>
      <Box display="flex" gap="12px" justifyContent="center">
        <RefreshButton
          disabled={!wallet.connected || isFetching || isClosing}
          onClick={() => refreshTokenAccounts(wallet.publicKey!)}
        >
          <RefreshIcon />
        </RefreshButton>
        <CloseButton
          disabled={
            isFetching ||
            isClosing ||
            (wallet.connected && emptyAccounts.length === 0)
          }
          onClick={() =>
            wallet.connected
              ? handleCloseAccounts(emptyAccounts)
              : setVisible(true)
          }
        >
          {wallet.connected
            ? !isClosing
              ? !isFetching
                ? "🔥 Close all empty token accounts"
                : "⏳ Loading accounts..."
              : "🤑 Closing accounts..."
            : "Connect wallet"}
        </CloseButton>
      </Box>
      {wallet.connected && (
        <AccountsContainer marginTop="24px">
          {emptyAccounts.length > 0 ? (
            <div>
              {emptyAccounts.map((account) => (
                <AccountCard
                  address={account.toBase58()}
                  key={account.toBase58()}
                />
              ))}
            </div>
          ) : (
            <Typography align="center">
              {!isFetching ? "No NFTs found." : "Loading..."}
            </Typography>
          )}
        </AccountsContainer>
      )}
    </>
  );
}

export default AccountCloser;
