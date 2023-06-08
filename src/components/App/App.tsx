import React from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline, Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import { Footer, Header, Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import Container from '../container/Container';
import { storageObject } from '../../services/stateStorage';
import theme from '../../services/theme/theme';

const HEADER_HEIGHT = 70;
const FOOTER_HEIGHT = 70;

function App() {
  const { t } = useTranslation();
  const { themeMode, toggleTheme } = storageObject.useStore();

  return (
    <ThemeProvider theme={theme(themeMode.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback="...is loading">
        {
          // Header container :
          // Even distribution of the children is built in
          // Logo with URL link included
          // Button for light/dark mode included, and sample implementation provided.
        }
        <Header data-testid="skaHeader" themeToggle={toggleTheme}>
          <Grid item />
          <Grid item>
            <Typography variant="h4">{t('label.signalDisplay')}</Typography>
          </Grid>
          <Grid item />
        </Header>
        <Paper>
          <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
          <Container data-testid="containerId" />
          <Spacer size={FOOTER_HEIGHT} axis={SPACER_VERTICAL} />
        </Paper>
        <Footer />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
