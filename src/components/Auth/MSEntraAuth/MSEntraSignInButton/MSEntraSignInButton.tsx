import React from 'react';
import { useMsal } from '@azure/msal-react';
import { Button, ButtonColorTypes, ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { useTranslation } from 'react-i18next';
import { MSENTRA_CLIENT_ID, MSENTRA_TENANT_ID, MSENTRA_REDIRECT_URI } from '@utils/constants';
import { loginRequest } from '../../../../authConfig';

export default function MSEntraSignInButton() {
  const { instance } = useMsal();
  const { t } = useTranslation('authentication');
  function handleLogin() {
    instance.loginRedirect(loginRequest).catch(e => {
      // eslint-disable-next-line no-console
      console.log(e);
    });
  }
  const [authAvailable, setAuthAvailable] = React.useState(true);

  React.useEffect(() => {
    if (!MSENTRA_CLIENT_ID || !MSENTRA_TENANT_ID || !MSENTRA_REDIRECT_URI) {
      setAuthAvailable(false);
    }
  }, []);

  return (
    <Button
      ariaDescription={t('button.confirm')}
      color={ButtonColorTypes.Success}
      icon={<DoneOutlinedIcon />}
      label={t('button.signIn')}
      onClick={() => handleLogin()}
      testId="loginButton"
      disabled={!authAvailable}
      variant={ButtonVariantTypes.Contained}
    />
  );
}
