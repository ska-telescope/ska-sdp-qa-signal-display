/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonToggle } from '@ska-telescope/ska-gui-components';
import {
  QASettings,
  amplitudeAxisY,
  phaseAxisY,
  amplitudeReal,
  phaseImaginary
} from '../Settings/qaSettings';

export interface YAxisToggleProps {
  testId: string;
  type: string;
  disabled: boolean;
  displaySettings: typeof QASettings;
  value: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setValue: Function;
}

function YAxisToggle({
  testId,
  type,
  value,
  disabled,
  displaySettings,
  setValue
}: YAxisToggleProps): React.JSX.Element {
  const { t } = useTranslation('signalDisplay');

  const toggleOptions = () => {
    const results: { id: string; label: string; value: string }[] = [];
    if (type === 'amplitude') {
      amplitudeAxisY.forEach((el: string): void => {
        results.push({ id: el, label: t(`label.${el}`), value: el });
      });
    } else if (type === 'phase') {
      phaseAxisY.forEach((el: string): void => {
        results.push({ id: el, label: t(`label.${el}`), value: el });
      });
    } else if (type === 'Real') {
      amplitudeReal.forEach((el: string): void => {
        results.push({ id: el, label: t(`label.${el}`), value: el });
      });
    } else {
      phaseImaginary.forEach((el: string): void => {
        results.push({ id: el, label: t(`label.${el}`), value: el });
      });
    }
    return results;
  };

  function update(e) {
    const tmp = displaySettings;
    tmp[value] = e.target.id;
    // setSetting(e.target.id);
    setValue(tmp);
  }

  return (
    <ButtonToggle
      ariaDescription={t(`toolTip.settings.${type}`)}
      ariaTitle="ariaTitle"
      disabled={disabled}
      options={toggleOptions()}
      setValue={update}
      testId={testId}
      toolTip={t(`toolTip.settings.${type}`)}
      value={displaySettings[value]}
      current={displaySettings[value]}
    />
  );
}

export default YAxisToggle;
