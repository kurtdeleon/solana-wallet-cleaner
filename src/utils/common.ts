import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { InstructionPayload, TransactionPayload } from "../types";

export function shortenAddress(address: string) {
  if (address.length > 4) {
    return (
      address.substring(0, 4) + "..." + address.substring(address.length - 4)
    );
  }
  return address;
}

export async function finalizeTransactions(
  connection: Connection,
  transactions: TransactionPayload[],
  feePayer: PublicKey
) {
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();

  transactions.forEach((payload) => {
    payload.transaction.feePayer = feePayer;
    payload.transaction.recentBlockhash = blockhash;
    payload.transaction.lastValidBlockHeight = lastValidBlockHeight;
  });

  return transactions;
}

export function bundleIxsIntoTxArray(
  instructions: InstructionPayload[],
  maxPerTransaction: number
) {
  const transactions: TransactionPayload[] = [];

  while (instructions.length > 0) {
    const ixs = instructions.splice(0, maxPerTransaction);
    const payload: TransactionPayload = ixs.reduce(
      (txPayload, ix) => {
        txPayload.transaction.add(...ix.instructions);
        txPayload.addresses.push(...ix.addresses);
        return txPayload;
      },
      {
        transaction: new Transaction(),
        addresses: [] as string[],
      }
    );
    transactions.push(payload);
  }

  return transactions;
}

export async function filterInitializedAddresses(
  connection: Connection,
  addresses: PublicKey[]
) {
  const promises = [];

  // getMultipleAccountInfo in chunks of 20
  for (let i = 0; i < addresses.length; i += 20) {
    promises.push(
      connection.getMultipleAccountsInfo(addresses.slice(i, i + 20), {
        commitment: "processed",
      })
    );
  }
  const accountData = await Promise.all(promises);

  if (accountData)
    return accountData.reduce((data, value) => data.concat(value), []);

  return [];
}
