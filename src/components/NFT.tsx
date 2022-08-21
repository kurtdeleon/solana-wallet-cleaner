import { styled } from "@mui/material";
import { FC } from "react";
import { HeliusNFTData } from "../types";

interface NFTProps {
  data: HeliusNFTData;
  selected: boolean;
  handleClick: (id: string) => void;
}

const NFTDisplay = styled("div")({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  borderRadius: "4px",
  cursor: "pointer",
});

const DeleteOverlay = styled("div")({
  position: "absolute",
  height: "100%",
  width: "100%",
  background: "#d90000",
  zIndex: 2,
  opacity: 0.8,
});

const Name = styled("div")({
  width: "100%",
  padding: "4px 6px",
  position: "absolute",
  bottom: 0,
  fontSize: "12px",
  fontWeight: "bold",
  background: "#00000095",
  color: "white",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  userSelect: "none",
});

const Image = styled("img")({
  width: "100%",
  height: "auto",
});
//https://bafybeifyxyrw25stdo533ds2if5rl6t5rsh5cmidfj2ivp34kjztefseou.ipfs.nftstorage.link/1384.png
export const NFT: FC<NFTProps> = ({ data, selected, handleClick }) => {
  return (
    <NFTDisplay
      key={data.tokenAddress}
      onClick={() => handleClick(data.tokenAddress)}
    >
      {selected && <DeleteOverlay />}
      <Image
        src={data.imageUrl}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "unreachable.png";
        }}
      />
      <Name>{data.name}</Name>
    </NFTDisplay>
  );
};
