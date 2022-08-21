import { FC } from "react";
import { HeliusNFTData } from "../types";
import { NFT } from "./NFT";
import { styled } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { shortenAddress } from "../utils";

const NFTGrid = styled("div")({
  height: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
  gridGap: "8px",
  flexDirection: "row",
  flexFlow: "wrap",
  justifyContent: "center",
  "@media (max-width: 940px)": {
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
  },
  "@media (max-width: 768px)": {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  },
  "@media (max-width: 568px)": {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
  "@media (max-width: 480px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
});

const Label = styled("span")({
  userSelect: "none",
});

interface Props {
  nftList: HeliusNFTData[];
  selected: string[];
  handleClick: (id: string[]) => void;
}

export const NFTCollection: FC<Props> = ({
  nftList,
  selected,
  handleClick,
}) => {
  const handleCheckbox = (nftList: HeliusNFTData[], selected: string[]) => {
    const list = nftList.map((nft) => nft.tokenAddress);

    if (
      list.every((address) => selected.includes(address)) ||
      list.every((address) => !selected.includes(address))
    ) {
      // if either none or all NFTs are selected, toggle all NFTs
      handleClick(list);
    } else {
      // else, toggle only those that are not already selected
      handleClick(list.filter((address) => !selected.includes(address)));
    }
  };

  return (
    <div>
      <FormGroup sx={{ marginBottom: "4px" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={nftList.every((nft) =>
                selected.includes(nft.tokenAddress)
              )}
              onChange={() => handleCheckbox(nftList, selected)}
            />
          }
          label={
            <Label>{`${nftList[0].collectionName}${
              nftList[0].collectionName === "Unknown"
                ? ` (${shortenAddress(nftList[0].collectionAddress)})`
                : ""
            }`}</Label>
          }
        />
      </FormGroup>
      <NFTGrid>
        {nftList.map((nft) => (
          <NFT
            data={nft}
            selected={selected.includes(nft.tokenAddress)}
            handleClick={(mint) => handleClick([mint])}
            key={nft.tokenAddress}
          />
        ))}
      </NFTGrid>
    </div>
  );
};
