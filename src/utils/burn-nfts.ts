import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { getMetadataPda, getMasterEditionPda } from "./metaplex";
import {
  createBurnNftInstruction,
  PROGRAM_ADDRESS,
} from "@metaplex-foundation/mpl-token-metadata";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { HeliusNFTData } from "../types";
import { bundleIxsIntoTxArray, finalizeTransactions } from "./common";

const _mplProgramId = new PublicKey(PROGRAM_ADDRESS);

// TODO Remove this once Helius fixes their API
export async function verifyCollectionAddresses(
  connection: Connection,
  nfts: Pick<HeliusNFTData, "tokenAddress" | "collectionAddress">[]
) {
  const addresses = nfts
    .reduce((addresses, value) => {
      if (!addresses.includes(value.collectionAddress))
        addresses.push(value.collectionAddress);
      return addresses;
    }, [] as string[])
    .map((address) => getMetadataPda(new PublicKey(address)));

  const accountData = await connection.getMultipleAccountsInfo(addresses);

  const verifiedAddresses: PublicKey[] = [];

  // filter initialized accounts
  if (accountData) {
    addresses.forEach((address, index) => {
      if (accountData[index] !== null) verifiedAddresses.push(address);
    });
  }

  return verifiedAddresses;
}

export async function createBurnNftTxs(
  connection: Connection,
  payer: PublicKey,
  nfts: Pick<HeliusNFTData, "tokenAddress" | "collectionAddress">[]
): Promise<Transaction[]> {
  const verifiedAddresses = await verifyCollectionAddresses(connection, nfts);

  // create burn nft ixs per nft selected
  const burnNftIxs = await Promise.all(
    nfts.map(async (nft) => {
      const collectionMetadataPda = getMetadataPda(
        new PublicKey(nft.collectionAddress)
      );

      return await burnNft(
        payer,
        new PublicKey(nft.tokenAddress),
        verifiedAddresses.findIndex((address) =>
          address.equals(collectionMetadataPda)
        ) > -1
          ? collectionMetadataPda
          : undefined
      );
    })
  );

  const transactions: Transaction[] = bundleIxsIntoTxArray(burnNftIxs, 6);
  return await finalizeTransactions(connection, transactions, payer);
}

/**
 * Creates a transaction that burns an NFT
 * and unverifies it from the collection, if needed.
 *
 * @param owner current owner of the nft provided
 * @param mint mint address of the nft
 * @param collectionMint collection mint of the nft, if any
 * @returns
 */
export async function burnNft(
  owner: PublicKey,
  mint: PublicKey,
  collectionMetadataPda?: PublicKey
) {
  const mintMetadataPda = getMetadataPda(mint);
  const masterEditionPda = getMasterEditionPda(mint);
  const tokenAccount = await getAssociatedTokenAddress(mint, owner);
  // const collectionMetadataPda = collectionMint
  //   ? getMetadataPda(collectionMint)
  //   : undefined;

  // main burn transaction that deletes the NFT
  return createBurnNftInstruction(
    {
      metadata: mintMetadataPda,
      owner: owner,
      mint: mint,
      tokenAccount: tokenAccount,
      masterEditionAccount: masterEditionPda,
      splTokenProgram: TOKEN_PROGRAM_ID,
      collectionMetadata: collectionMetadataPda,
    },
    _mplProgramId
  );
}
