import React from 'react';
import { CssBaseline, Paper, ThemeProvider } from '@mui/material';
import { Header, Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import theme, { THEME_DARK, THEME_LIGHT } from '../services/theme/theme';
// Import all the css files created for d3 charts
import '../libs/css/spectrogram-plot-table.css';

import Container from '../components/container/Container';

// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

export interface AppProps {
  user?: { username: string };
  telescope?: { name: string };
}

function App() {

  const HEADER_HEIGHT = 70;
  // Theme related
  const [themeMode, setThemeMode] = React.useState(THEME_LIGHT);

  const themeToggle = () => {
    setThemeMode(themeMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT);
  };

  return (
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback="...is loading">
        <Header themeToggle={themeToggle} />
        <Paper>
          <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
          <Container /> 
        </Paper>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
