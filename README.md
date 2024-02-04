# Solana Wallet Cleaner
This dapp allows users to clean out useless NFTs and tokens from Solana wallets. Standard NFTs aren't the norm anymore since cNFTs came out but this can still clean out empty token accounts just fine. Inspired by [Sol-Incinerator](https://sol-incinerator.com/) as I wanted to create an alternative that didn't take any fees.

## Disclaimer
Most of the Helius API calls are probably outdated by now as this is almost a year old project. That being said, I chose to upload this anyway in case anyone finds the transaction generation codeblocks useful.

## Getting Started

### Prerequisites
- Node v18.2.0 or higher
- yarn v1.22.19

### Installation
1. Clone the repository: `git clone <repo-url>`
2. Create an .env file on the root folder and populate with these environment variables:
	```REACT_APP_HELIUS_API_KEY="YOUR_API_KEY_HERE"```
3. Install dependencies: `yarn`
4. Start development server: `yarn run dev`