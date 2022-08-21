import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

export function shortenAddress(address: string) {
  if (PublicKey.isOnCurve(address))
    return (
      address.substring(0, 4) + "..." + address.substring(address.length - 4)
    );
  else throw Error("Invalid address");
}

export async function finalizeTransactions(
  connection: Connection,
  transactions: Transaction[],
  feePayer: PublicKey
) {
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();

  transactions.forEach((tx) => {
    tx.feePayer = feePayer;
    tx.recentBlockhash = blockhash;
    tx.lastValidBlockHeight = lastValidBlockHeight;
  });

  return transactions;
}

export function bundleIxsIntoTxArray(
  instructions: TransactionInstruction[],
  maxPerTransaction: number
) {
  const transactions: Transaction[] = [];

  while (instructions.length > 0) {
    transactions.push(
      new Transaction().add(...instructions.splice(0, maxPerTransaction))
    );
  }

  return transactions;
}
