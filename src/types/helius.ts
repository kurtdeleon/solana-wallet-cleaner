interface Trait {
  trait_type: string;
  value: string;
}

interface Creator {
  address: string;
  share: string;
  verified: boolean;
}

interface Attribute {
  traitType: string;
  value: string;
}

interface File {
  uri: string;
  type: string;
}

export interface HeliusNftCollection {
  [key: string]: HeliusNFTData[];
}

export interface HeliusNFTData {
  name: string;
  tokenAddress: string;
  collectionAddress: string;
  collectionName: string;
  imageUrl: string;
  traits: Trait[];
}

export interface HeliusNFTPortfolio {
  numberOfPages: number;
  nfts: HeliusNFTData[];
}

export interface HeliusNFTMetadata {
  mint: string;
  onChainData: {
    key: string;
    mint: string;
    updateAuthority: string;
    data: {
      name: string;
      symbol: string;
      uri: string;
      sellerFeeBasisPoints: number;
      creators: Creator[];
    };
    tokenStandard: string;
    primarySaleHappened: true;
    isMutable: true;
    editionNonce: 0;
    collection: {
      key: string;
      verified: true;
    };
    collectionDetails: {
      size: number;
    };
  };
  offChainData: {
    name: string;
    symbol: string;
    attributes: Attribute[];
    sellerFeeBasisPoints: number;
    image: string;
    properties: {
      category: string;
      files: File[];
      creators: Pick<Creator, "address" | "share">[];
    };
  };
}
