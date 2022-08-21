import { createCloseAccountInstruction } from "@solana/spl-token";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { bundleIxsIntoTxArray, finalizeTransactions } from "./common";

export async function createCloseAccountTxs(
  connection: Connection,
  accounts: PublicKey[],
  payer: PublicKey
) {
  // create close instructions per account in array
  const closeIxs: TransactionInstruction[] = accounts.map((account) =>
    createCloseAccountInstruction(account, payer, payer)
  );

  const transactions: Transaction[] = bundleIxsIntoTxArray(closeIxs, 27);
  return await finalizeTransactions(connection, transactions, payer);
}
