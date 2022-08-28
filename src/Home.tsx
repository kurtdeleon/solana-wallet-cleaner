import { useState } from "react";
import { Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { TabPanel } from "./components/TabPanel";
import Burner from "./components/tabs/Burner";
import AccountCloser from "./components/tabs/AccountCloser";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { styled } from "@mui/material";
import { FAQDialog } from "./components/Modals";

const Link = styled("a")({
  fontWeight: "bold",
  textDecoration: "none",
});

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  marginLeft: "8px",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    backgroundColor: "transparent",
  },
});

interface StyledTabProps {
  label: string;
  disabled?: boolean;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: theme.typography.pxToRem(15),
  marginRight: "6px",
  color: "#a4a9c2d2",
  backgroundColor: "#ffffff1a",
  marginTop: "12px",
  padding: "0 16px",
  borderRadius: "6px 6px 0 0",
  "&.Mui-selected": {
    marginTop: "8px",
    color: "#364277",
    backgroundColor: "#fafafa",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
  ":disabled": {
    color: "#a4a9c26f",
    cursor: "not-allowed",
  },
}));

const FAQSpan = styled("span")({
  cursor: "pointer",
  color: "#364277",
  fontWeight: "bold",
});

function Home() {
  const [page, setPage] = useState<number>(0);
  const [showFaqs, setShowFaqs] = useState<boolean>(false);

  return (
    <Box
      bgcolor="background.default"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      paddingY="1rem"
      marginTop="1rem"
    >
      <FAQDialog open={showFaqs} handleClose={() => setShowFaqs(false)} />
      <Box marginBottom="12px">
        <Typography
          color="primary.dark"
          variant="h1"
          fontWeight="bold"
          fontSize={30}
          align="center"
        >
          Solana Wallet Tools
        </Typography>
        <Typography align="center">
          Burn NFTs and close token accounts for more SOL to mint rugs with.{" "}
          <FAQSpan role="button" onClick={() => setShowFaqs(true)}>
            Read FAQs here.
          </FAQSpan>
        </Typography>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        width="95%"
        maxWidth="900px"
        height="80%"
        maxHeight="600px"
        alignItems="base"
        marginBottom="8px"
      >
        <Box sx={{ flex: 1 }} display="flex" alignItems="end">
          <Typography fontSize={14}>
            Made by{" "}
            <Link href="https://twitter.com/i__am__water">@i__am__water</Link>.
            Powered by{" "}
            <Link href="https://twitter.com/heliuslabs">@heliuslabs</Link>.
          </Typography>
        </Box>
        <Box>
          <WalletMultiButton />
        </Box>
      </Box>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "background.paper",
          width: "95%",
          maxWidth: "900px",
          height: "80%",
          minHeight: "400px",
          maxHeight: "600px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "6px",
        }}
      >
        <Box sx={{ bgcolor: "#2e1534", borderRadius: "6px 6px 0 0" }}>
          <StyledTabs
            value={page}
            onChange={(e, v) => setPage(v)}
            aria-label="incinerator tabs"
          >
            <StyledTab label="Burn NFTs" />
            <StyledTab label="Close token accounts" />
            <StyledTab label="Multi-send NFTs (Soon)" disabled={true} />
          </StyledTabs>
        </Box>
        <TabPanel id={0} hidden={page !== 0}>
          <Burner />
        </TabPanel>
        <TabPanel id={1} hidden={page !== 1}>
          <AccountCloser />
        </TabPanel>
        {/* <TabPanel id={2} hidden={page !== 2}>
          <Burner />
        </TabPanel> */}
      </Paper>
    </Box>
  );
}

export default Home;
