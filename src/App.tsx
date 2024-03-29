import { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
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
import { SnackbarProvider } from "notistack";
import { InitialWarning } from "./components/modals";
import Home from "./Home";

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
      <ConnectionProvider
        endpoint={`https://mainnet-beta.solflare.network/`}
        config={{
          confirmTransactionInitialTimeout: 30000,
          commitment: "processed",
          disableRetryOnRateLimit: true,
        }}
      >
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <SnackbarProvider maxSnack={5}>
              <InitialWarning
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
