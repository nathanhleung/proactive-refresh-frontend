import "@/styles/globals.css";
import "@safe-global/safe-react-components/dist/fonts.css";

import { Theme, ThemeProvider } from "@mui/material/styles";
import SafeProvider from "@safe-global/safe-apps-react-sdk";
import { SafeThemeProvider } from "@safe-global/safe-react-components";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "@/config/wagmi";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "black",
      },
      a: {
        color: 'blue.700',
        _hover: {
          textDecoration: 'underline',
        },
      },
      h1: {
        fontSize: '4xl',
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '2xl',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: 'xl',
        fontWeight: 'bold',
      },
      h4: {
        fontSize: 'lg',
        fontWeight: 'bold',
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <SafeProvider>
          <SafeThemeProvider mode="dark">
            {(safeTheme: Theme) => (
              <ThemeProvider theme={safeTheme}>
                <Component {...pageProps} />
              </ThemeProvider>
            )}
          </SafeThemeProvider>
        </SafeProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}
