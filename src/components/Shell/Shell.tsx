import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMsal, MsalAuthenticationTemplate } from '@azure/msal-react';
import { Header } from '@ska-telescope/ska-gui-components';
import { storageObject, Telescope } from '@ska-telescope/ska-gui-local-storage';

import MSEntraSignInButton from '@components/Auth/MSEntraAuth/MSEntraSignInButton/MSEntraSignInButton';
import { InteractionType } from '@azure/msal-browser';
import { IconButton, Paper, Tooltip, Typography } from '@mui/material';
import User from './User/User';

function TheHeader(setOpenUser: {
  (newOpen: boolean): () => void;
  (arg0: boolean): React.MouseEventHandler<HTMLButtonElement> | undefined;
}): React.JSX.Element {
  const { t } = useTranslation();
  const skao = t('toolTip.button.skao', { ns: 'signalDisplay' });
  const mode = t('toolTip.button.mode', { ns: 'signalDisplay' });
  const toolTip = { skao, mode };
  const getDocs = () => {
    const headerTip = t('toolTip.button.docs', { ns: 'signalDisplay' });
    const headerURL = t('toolTip.button.docsURL', { ns: 'signalDisplay' });
    return { tooltip: headerTip, url: headerURL };
  };
  const {
    help,
    helpToggle,
    telescope,
    themeMode,
    toggleTheme,
    updateTelescope
  } = storageObject.useStore();

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
  const { accounts } = useMsal();
  const username = accounts.length > 0 ? accounts[0].name : '';

  const signIn = () => (
    <>
      <MsalAuthenticationTemplate interactionType={InteractionType.None} />
      {username && (
        <Tooltip title={t('toolTip.button.user', { ns: 'authentication' })} arrow>
          <IconButton
            data-testid="userName"
            role="button"
            aria-label={username}
            sx={{ '&:hover': { backgroundColor: 'primary.dark' }, ml: 1 }}
            color="inherit"
            onClick={setOpenUser(true)}
            size="small"
          >
            <Typography variant="h6">{username}</Typography>
          </IconButton>
        </Tooltip>
      )}
      {!username && <MSEntraSignInButton />}
    </>
  );

  return (
    <Header
      docs={getDocs()}
      title={t('label.signalDisplay', { ns: 'signalDisplay' })}
      data-testid="skaHeader"
      toolTip={toolTip}
      storage={theStorage}
    >
      {signIn()}
    </Header>
  );
}

export interface LayoutProps {
  children: JSX.Element;
}

export function Shell({ children }: LayoutProps) {
  const [openUser, setOpenUser] = React.useState(false);
  const { accounts } = useMsal();
  const username = accounts.length > 0 ? accounts[0].name : '';

  React.useEffect(() => {
    if (username === '') {
      setOpenUser(false);
    }
  }, [username]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenUser(newOpen);
  };

  return (
    <Paper elevation={0} sx={{ height: '100%', backgroundColor: 'primary.main' }}>
      {TheHeader(toggleDrawer)}
      <User open={openUser} toggleDrawer={toggleDrawer} />
      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'primary.main',
          width: '100vw',
          minHeight: '100vh'
        }}
      >
        <div>
          {/* <Spacer size={SPACER_HEADER} axis={SPACER_VERTICAL} /> */}
          <main>{children}</main>
          {/* <Spacer size={SPACER_FOOTER} axis={SPACER_VERTICAL} /> */}
        </div>
      </Paper>
    </Paper>
  );
}
