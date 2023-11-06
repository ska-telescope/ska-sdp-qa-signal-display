import React from 'react';
import { CssBaseline, Paper, ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Footer, Header, Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import Container from '../Container/Container';
import Loader from '../Loader/Loader';
import theme from '../../services/theme/theme';

const HEADER_HEIGHT = 70;
const FOOTER_HEIGHT = 30;

function App() {
  const { t } = useTranslation('signalDisplay');
  const { themeMode } = storageObject.useStore();

  const skao = t('toolTip.button.skao');
  const mode = t('toolTip.button.mode');
  const toolTip = { skao, mode };
  const version = process.env.VERSION;

  return (
    <ThemeProvider theme={theme(themeMode.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={<Loader />}>
        <Header
          testId="headerId"
          title={t('label.signalDisplay')}
          toolTip={toolTip}
        />
        <Paper>
          <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
          <Container data-testid="containerId" />
          <Spacer size={FOOTER_HEIGHT} axis={SPACER_VERTICAL} />
        </Paper>
        <Footer testId="footerId" version={version} />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
