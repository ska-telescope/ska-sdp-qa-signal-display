/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { ButtonToggle } from '@ska-telescope/ska-gui-components';
import {
  QASettings,
  polarizationAmplitudeAxisY,
  polarizationPhaseAxisY
} from '../../services/types/qaSettings';

export interface YAxisToggleProps {
  testId: string;
  type: string;
  displaySettings: typeof QASettings;
  value: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setValue: Function;
}

function YAxisToggle({
  testId,
  type,
  value,
  displaySettings,
  setValue
}: YAxisToggleProps): React.JSX.Element {
  const { t } = useTranslation('signalDisplay');
  const [setting, setSetting] = React.useState(displaySettings[value]);

  const toggleOptions = () => {
    const results: { id: string; label: string; value: string }[] = [];
    if (type === 'amplitude') {
      polarizationAmplitudeAxisY.forEach((el: string): void => {
        results.push({ id: el, label: t(`label.${el}`), value: el });
      });
    } else {
      polarizationPhaseAxisY.forEach((el: string): void => {
        results.push({ id: el, label: t(`label.${el}`), value: el });
      });
    }
    return results;
  };

  function update(e) {
    const tmp = displaySettings;
    tmp[value] = e.target.id;
    setSetting(e.target.id);
    setValue(tmp);
  }

  return (
    <Box m={2}>
      <ButtonToggle
        ariaDescription={t(`toolTip.settings.${type}`)}
        ariaTitle="ariaTitle"
        options={toggleOptions()}
        setValue={update}
        testId={testId}
        toolTip={t(`toolTip.settings.${type}`)}
        value={setting}
        current={setting}
      />
    </Box>
  );
}

export default YAxisToggle;
