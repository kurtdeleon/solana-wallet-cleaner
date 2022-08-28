import { createCloseAccountInstruction } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { InstructionPayload, TransactionPayload } from "../types";
import { bundleIxsIntoTxArray, finalizeTransactions } from "./common";

export async function createCloseAccountTxs(
  connection: Connection,
  accounts: PublicKey[],
  payer: PublicKey
) {
  // create close instructions per account in array
  const closeIxPayloads: InstructionPayload[] = accounts.map((account) => {
    return {
      instructions: [createCloseAccountInstruction(account, payer, payer)],
      addresses: [account.toBase58()],
    };
  });

  const transactions: TransactionPayload[] = bundleIxsIntoTxArray(
    closeIxPayloads,
    27
  );
  return await finalizeTransactions(connection, transactions, payer);
}
