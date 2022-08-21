import { FC } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import { SOLANA_FM, SOLANA_EXPLORER, SOLSCAN } from "../utils";

interface Props {
  address: string;
}

const Card = styled(Box)({
  marginBottom: "8px",
  border: "1px solid #2e153443",
  borderRadius: "6px",
  padding: "6px 8px",
});

const Address = styled("div")({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  userSelect: "none",
  opacity: 0.9,
});

const Link = styled("a")({
  background: "transparent",
  border: "none",
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const LinksContainer = styled(Box)({
  marginRight: "16px",
});

export const AccountCard: FC<Props> = ({ address }) => {
  return (
    <Card display="flex">
      <LinksContainer display="flex" gap="8px">
        <Link
          href={`https://solana.fm/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img width="12" height="auto" src={SOLANA_FM} />
        </Link>
        <Link
          href={`https://explorer.solana.com/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img width="16" height="auto" src={SOLANA_EXPLORER} />
        </Link>
        <Link
          href={`https://solscan.io/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img width="16" height="auto" src={SOLSCAN} />
        </Link>
      </LinksContainer>
      <Address>{address}</Address>
    </Card>
  );
};
