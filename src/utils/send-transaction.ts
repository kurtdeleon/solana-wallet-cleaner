import {
  ConfirmOptions,
  Connection,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";

export async function sendAndConfirmRawTransaction(
  connection: Connection,
  transaction: Transaction,
  options?: ConfirmOptions
): Promise<TransactionSignature> {
  const sendOptions = options && {
    skipPreflight: options.skipPreflight,
    preflightCommitment: options.preflightCommitment || options.commitment,
    maxRetries: options.maxRetries,
    minContextSlot: options.minContextSlot,
  };

  const signature = await connection.sendRawTransaction(
    transaction.serialize(),
    sendOptions
  );

  const { value: status } = await connection.confirmTransaction(
    {
      signature: signature,
      blockhash: transaction.recentBlockhash!,
      lastValidBlockHeight: transaction.lastValidBlockHeight!,
    },
    options && options.commitment
  );

  if (status.err) {
    throw new Error(
      `Transaction ${signature} failed (${JSON.stringify(status)})`
    );
  }

  return signature;
}
