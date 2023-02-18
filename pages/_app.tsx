import "@/styles/globals.css";
import "@safe-global/safe-react-components/dist/fonts.css";
import { Theme, ThemeProvider } from "@mui/material/styles";
import { SafeThemeProvider } from "@safe-global/safe-react-components";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SafeThemeProvider mode="light">
      {(safeTheme: Theme) => (
        <ThemeProvider theme={safeTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      )}
    </SafeThemeProvider>
  );
}
