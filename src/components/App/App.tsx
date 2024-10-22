import React from 'react';
import { CssBaseline, Paper, ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import Container from '../Container/Container';
import Loader from '../Loader/Loader';
import theme from '@services/theme/theme';
import SKAOFooter from '../Footer/Footer';
import { Shell } from '@components/Shell/Shell';


const HEADER_HEIGHT = 70;
const FOOTER_HEIGHT = 30;

function App() {
  const { t } = useTranslation('signalDisplay');
  const {
    themeMode,
  } = storageObject.useStore();

  const version = process.env.VERSION;

  const [data, setData] = React.useState(null);

  const childToParent = childData => {
    setData(childData);
  };


  return (
    <ThemeProvider theme={theme(themeMode.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={<Loader />}>
        <Shell >
          <Paper>
            <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
            <Container data-testid="containerId" childToParent={childToParent} />
            <Spacer size={FOOTER_HEIGHT} axis={SPACER_VERTICAL} />
          </Paper>
        </Shell>
        <SKAOFooter data-testid="footerId" version={version} config={data} />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
