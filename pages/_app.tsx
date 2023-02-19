import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';
import { wagmiClient } from '@config/wagmi';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  styles: {
    global: {
      body: {
        bg: 'blackAlpha.900',
        color: 'whiteAlpha.800',
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
      p: {},
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.ethers = ethers;
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ChakraProvider>
  );
}
