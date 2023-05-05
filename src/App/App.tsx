import React from 'react';
import { CssBaseline, Grid, ThemeProvider, Typography } from '@mui/material';
import { Header, Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import theme, { THEME_DARK, THEME_LIGHT } from '../services/theme/theme';
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
        <Header themeToggle={themeToggle}>
          <Grid item />
          <Grid item>
            <Typography variant='h4'>Signal Display</Typography>
          </Grid>
          <Grid item />
        </Header>
        <>
          <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
          <Container /> 
        </>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
