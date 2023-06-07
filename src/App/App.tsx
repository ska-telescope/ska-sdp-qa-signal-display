import React from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline, Grid, ThemeProvider, Typography } from '@mui/material';
import { Header, Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import { storageObject } from '../Services/stateStorage';
import theme from '../Services/theme/theme';
import Container from '../Components/Container/Container';

export interface AppProps {
  user?: { username: string };
  telescope?: { name: string };
}

function App() {
  const { t } = useTranslation();
  const { themeMode, toggleTheme } = storageObject.useStore();

  const HEADER_HEIGHT = 70;

  return (
    <ThemeProvider theme={theme(themeMode.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={t('isLoading')}>
        <Header data-testid="skaHeader" themeToggle={toggleTheme}>
          <Grid item />
          <Grid item>
            <Typography variant="h4">{t('label.signalDisplay')}</Typography>
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
