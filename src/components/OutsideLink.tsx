import { FC, ReactNode } from "react";
import { styled } from "@mui/material";

const Link = styled("a")({
  color: "white",
  textDecoration: "underline",
  cursor: "pointer",
});

export const TxExplorerLink: FC<{ signature: string; children: ReactNode }> = ({
  signature,
  children,
}) => {
  return (
    <Link
      href={`https://solscan.io/tx/${signature}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
};
