import { FC } from "react";
import { styled } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  id: number;
  hidden: boolean;
}

interface PanelProps {
  hidden: boolean;
}

const Panel = styled("div")<PanelProps>(({ hidden }) => ({
  padding: "8px 1rem 1rem 1rem",
  height: "100%",
  display: hidden ? "none" : "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

export const TabPanel: FC<TabPanelProps> = ({ children, id, hidden }) => {
  return (
    <Panel
      role="tabpanel"
      hidden={hidden}
      id={`tabpanel-${id}`}
      aria-labelledby={`simple-tab-${id}`}
      aria-hidden={hidden}
    >
      {children}
    </Panel>
  );
};
