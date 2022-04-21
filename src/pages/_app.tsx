import React, { ReactElement, ReactNode, StrictMode } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { NextPage } from "next";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider
} from "@mui/material";
import { createEmotionCache } from "src/utils/create-emotion-cache";
import { theme } from "src/theme";
// Import all the css files created for d3 charts
import "src/libs/css/spectrogram-plot-table.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <title>QA Display</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <StrictMode>
        <StyledEngineProvider injectFirst>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </LocalizationProvider>
        </StyledEngineProvider>
      </StrictMode>
    </CacheProvider>
  );
}

export default App;
