import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

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
