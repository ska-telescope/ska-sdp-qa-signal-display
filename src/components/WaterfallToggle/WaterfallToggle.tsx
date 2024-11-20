/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonToggle } from '@ska-telescope/ska-gui-components';
import { QASettings, spectrumWaterfallToggle } from '../Settings/qaSettings';

export interface WaterfallToggleProps {
  data-testid: string;
  type: string;
  disabled: boolean;
  displaySettings: typeof QASettings;
  value: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setValue: Function;
}

function WaterfallToggle({
  data-testid,
  type,
  value,
  disabled,
  displaySettings,
  setValue
}: WaterfallToggleProps): React.JSX.Element {
  const { t } = useTranslation('signalDisplay');

  const toggleOptions = () => {
    const results: { id: string; label: string; value: string }[] = [];
    if (type === 'spectrum') {
      spectrumWaterfallToggle.forEach((el: string): void => {
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
      ariaDescription={t(`toolTip.spectrumWaterfall.${type}`)}
      ariaTitle="ariaTitle"
      disabled={disabled}
      options={toggleOptions()}
      setValue={update}
      data-testid={data-testid}
      toolTip={t(`toolTip.spectrumWaterfall.${type}`)}
      value={displaySettings[value]}
      current={displaySettings[value]}
    />
  );
}

export default WaterfallToggle;
