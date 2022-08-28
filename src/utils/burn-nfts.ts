import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { getMetadataPda, getMasterEditionPda } from "./metaplex";
import {
  createBurnNftInstruction,
  PROGRAM_ADDRESS,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createBurnInstruction,
  createCloseAccountInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  HeliusNFTData,
  InstructionPayload,
  TransactionPayload,
} from "../types";
import {
  bundleIxsIntoTxArray,
  filterInitializedAddresses,
  finalizeTransactions,
} from "./common";

const _mplProgramId = new PublicKey(PROGRAM_ADDRESS);

async function getVerifiedAddresses(
  connection: Connection,
  nfts: Pick<HeliusNFTData, "tokenAddress" | "collectionAddress">[]
) {
  // collate all addresses needed to be queried
  const collectionAddresses = nfts
    .reduce((addresses, value) => {
      if (!addresses.includes(value.collectionAddress))
        addresses.push(value.collectionAddress);
      return addresses;
    }, [] as string[])
    .map((address) => getMetadataPda(new PublicKey(address)));

  const editionAddresses = nfts.map((nft) =>
    getMasterEditionPda(new PublicKey(nft.tokenAddress))
  );

  // get account data of compiled addresses
  const accountData = await filterInitializedAddresses(connection, [
    ...collectionAddresses,
    ...editionAddresses,
  ]);

  const collectionData = accountData.slice(0, collectionAddresses.length);
  const editionData = accountData.slice(
    collectionAddresses.length,
    collectionAddresses.length + editionAddresses.length
  );

  return {
    collection: collectionAddresses.filter(
      (_, idx) => collectionData[idx] !== null
    ),
    edition: editionAddresses.filter((_, idx) => editionData[idx] !== null),
  };
}

export async function createBurnNftTxs(
  connection: Connection,
  payer: PublicKey,
  nfts: Pick<HeliusNFTData, "tokenAddress" | "collectionAddress">[]
): Promise<TransactionPayload[]> {
  const { collection, edition } = await getVerifiedAddresses(connection, nfts);

  // create burn nft ixs per nft selected
  const burnNftPayloads: InstructionPayload[] = [];
  const burnTokenPayloads: InstructionPayload[] = [];

  for (let i = 0; i < nfts.length; i++) {
    const mint = new PublicKey(nfts[i].tokenAddress);
    const editionPda = getMasterEditionPda(mint);
    const tokenAccount = await getAssociatedTokenAddress(mint, payer);

    // if master edition pda is initialized, then its a verified nft
    // which means we can full burn via metaplex contract
    if (edition.findIndex((value) => value.equals(editionPda)) > -1) {
      const collectionPda = getMetadataPda(
        new PublicKey(nfts[i].collectionAddress)
      );

      const burnIx = burnNft(
        payer,
        mint,
        editionPda,
        tokenAccount,
        collection.findIndex((address) => address.equals(collectionPda)) > -1
          ? collectionPda
          : undefined
      );

      burnNftPayloads.push({
        instructions: [burnIx],
        addresses: [nfts[i].tokenAddress],
      });
    } else {
      // else, we can only burn it the traditional way
      // via burning the token and closing the account manually
      burnTokenPayloads.push({
        instructions: burnToken(payer, tokenAccount, mint),
        addresses: [nfts[i].tokenAddress],
      });
    }
  }

  return await finalizeTransactions(
    connection,
    [
      ...bundleIxsIntoTxArray(burnNftPayloads, 6),
      ...bundleIxsIntoTxArray(burnTokenPayloads, 11),
    ],
    payer
  );
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
export function burnNft(
  owner: PublicKey,
  mint: PublicKey,
  masterEditionPda: PublicKey,
  tokenAccount: PublicKey,
  collectionMetadataPda?: PublicKey
) {
  const mintMetadataPda = getMetadataPda(mint);
  // const masterEditionPda = getMasterEditionPda(mint);
  // const tokenAccount = await getAssociatedTokenAddress(mint, owner);
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

export function burnToken(
  owner: PublicKey,
  account: PublicKey,
  mint: PublicKey
): TransactionInstruction[] {
  return [
    createBurnInstruction(account, mint, owner, 1),
    createCloseAccountInstruction(account, owner, owner),
  ];
}
