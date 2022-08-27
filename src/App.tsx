import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Home from "./Home";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  GlowWalletAdapter,
  SlopeWalletAdapter,
  TorusWalletAdapter,
  ExodusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { InitialWarningDialog } from "./components/Modals";

import "./App.css";

function App() {
  const [showWarning, setShowWarning] = useState<boolean>(
    localStorage.getItem("solanaWalletCleanerDialog") === null
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: "#364277",
      },
      secondary: {
        main: "#f3f3f3",
      },
      background: {
        default: "#ffffff",
        paper: "#fafafa",
      },
    },
  });

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new GlowWalletAdapter(),
      new SolletWalletAdapter(),
      new TorusWalletAdapter(),
      new ExodusWalletAdapter(),
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint="https://ssc-dao.genesysgo.net/">
        <WalletProvider wallets={wallets} autoConnect={true}>
          <WalletModalProvider>
            <SnackbarProvider maxSnack={5}>
              <InitialWarningDialog
                open={showWarning}
                handleClose={() => setShowWarning(false)}
              />
              <CssBaseline />
              <Home />
            </SnackbarProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
}

export default App;
