import React from 'react';
import { CssBaseline, Paper, ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Header, Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import { storageObject, Telescope } from '@ska-telescope/ska-gui-local-storage';
import Container from '../Container/Container';
import Loader from '../Loader/Loader';
import theme from '../../services/theme/theme';
import SKAOFooter from '../Footer/Footer';

const HEADER_HEIGHT = 70;
const FOOTER_HEIGHT = 30;

function App() {
  const { t } = useTranslation('signalDisplay');
  const {
    help,
    helpToggle,
    telescope,
    themeMode,
    toggleTheme,
    updateTelescope
  } = storageObject.useStore();

  const skao = t('toolTip.button.skao');
  const mode = t('toolTip.button.mode');
  const toolTip = { skao, mode };
  const version = process.env.VERSION;
  const getDocs = () => {
    const headerTip = t('toolTip.button.docs');
    const headerURL = t('toolTip.button.docsURL');
    return { tooltip: headerTip, url: headerURL };
  };

  const telescopeFunction = (e: Telescope) => {
    updateTelescope(e);
  };
  const theStorage = {
    help,
    helpToggle,
    telescope,
    themeMode: themeMode.mode,
    toggleTheme,
    updateTelescope: telescopeFunction
  };

  const [data, setData] = React.useState(null);

  const childToParent = childData => {
    setData(childData);
  };

  return (
    <ThemeProvider theme={theme(themeMode.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={<Loader />}>
        <Header
          docs={getDocs()}
          testId="headerId"
          title={t('label.signalDisplay')}
          storage={theStorage}
          toolTip={toolTip}
        />
        <Paper>
          <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
          <Container data-testid="containerId" childToParent={childToParent} />
          <Spacer size={FOOTER_HEIGHT} axis={SPACER_VERTICAL} />
        </Paper>
        <SKAOFooter data-testid="footerId" version={version} config={data} />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
