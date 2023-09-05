import React from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline, Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import { Footer, Header, Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import Container from '../Container/Container';
import { storageObject } from '../../services/stateStorage';
import theme from '../../services/theme/theme';
import { env } from '../../env'

const HEADER_HEIGHT = 70;
const FOOTER_HEIGHT = 70;

function App() {
  const { t } = useTranslation('signalDisplay');
  const { themeMode, toggleTheme } = storageObject.useStore();
  const version = env.REACT_APP_VERSION;

  const skao = t('toolTip.button.skao');
  const mode = t('toolTip.button.mode');
  const toolTip = { skao, mode };

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
        <Header testId="headerId" themeToggle={toggleTheme} toolTip={toolTip}>
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
        <Footer testId="footerId">
          <Grid item>{version}</Grid>
          <Grid item />
        </Footer>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
