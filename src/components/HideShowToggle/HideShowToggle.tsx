/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Button, ButtonColorTypes, ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import { QASettings } from '../../services/types/qaSettings';

export interface HideShowToggleProps {
  label: string;
  testId: string;
  displaySettings: QASettings;
  value: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setValue: Function;
}

function HideShowToggle({
  label,
  testId,
  value,
  displaySettings,
  setValue
}: HideShowToggleProps): React.JSX.Element {
  const [setting, setSetting] = React.useState(false);

  React.useEffect(() => {
    setSetting(displaySettings[value]);
  }, []);

  function update() {
    const tmp = displaySettings;
    tmp[value] = !setting;
    setSetting(!setting);
    setValue(tmp);
  }

  return (
    <Button
      label={label}
      testId={testId}
      color={ButtonColorTypes.Secondary}
      variant={setting ? ButtonVariantTypes.Contained : ButtonVariantTypes.Outlined}
      // eslint-disable-next-line react/jsx-no-bind
      onClick={update}
    />
  );
}

export default HideShowToggle;
