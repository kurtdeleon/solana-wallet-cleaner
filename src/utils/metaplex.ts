import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { utils } from "@project-serum/anchor";

const _metadata = Buffer.from(utils.bytes.utf8.encode("metadata"));
const _mpl = Buffer.from(PROGRAM_ID.toBytes());
const _edition = Buffer.from(utils.bytes.utf8.encode("edition"));

// can be either mint or collection address
export function getMetadataPda(mint: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [_metadata, _mpl, Buffer.from(mint.toBytes())],
    PROGRAM_ID
  )[0];
}

export function getMasterEditionPda(mint: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [_metadata, _mpl, Buffer.from(mint.toBytes()), _edition],
    PROGRAM_ID
  )[0];
}
