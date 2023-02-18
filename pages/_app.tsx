import "@/styles/globals.css";
import "@safe-global/safe-react-components/dist/fonts.css";

import { Theme, ThemeProvider } from "@mui/material/styles";
import SafeProvider from "@safe-global/safe-apps-react-sdk";
import { SafeThemeProvider } from "@safe-global/safe-react-components";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "@/config/wagmi";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <SafeProvider>
        <SafeThemeProvider mode="light">
          {(safeTheme: Theme) => (
            <ThemeProvider theme={safeTheme}>
              <Component {...pageProps} />
            </ThemeProvider>
          )}
        </SafeThemeProvider>
      </SafeProvider>
    </WagmiConfig>
  );
}
