import { Transaction, TransactionInstruction } from "@solana/web3.js";

export interface TransactionPayload {
    transaction: Transaction;
    addresses: string[];
}

export interface InstructionPayload {
    instructions: TransactionInstruction[];
    addresses: string[];
}