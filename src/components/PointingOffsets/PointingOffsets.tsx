/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import Plotly from '../Plotly/Plotly';

import SignalCard from '../SignalCard/SignalCard';
import YAxisToggle from '../YAxisToggle/YAxisToggle';
import { COLOR } from '../../utils/constants';
import { calculateDB } from '../../utils/calculate';
import { amplitudeAxisY, QASettings } from '../Settings/qaSettings';

interface PointingOffsetsProps {
  data: object;
  displaySettings: typeof QASettings;
  offset: string;
  redraw: boolean;
  resize: number;
  socketStatus: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setSettings: Function;
}

const RATIO = 2;

const PointingOffsets = ({
  data,
  displaySettings,
  offset,
  redraw,
  resize,
  socketStatus,
  setSettings
}: PointingOffsetsProps) => {
  const { t } = useTranslation('signalDisplay');
  const [chartData, setChartData] = React.useState(null);
  const [invalidData, setInvalidData] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const chartTitle = () => '';

  const settingElement = () => `show${offset}axisY`;
  const setting = () => displaySettings[settingElement()];

  const xLabel = () => `${t('label.antennas')}`;

  const yLabel = () => `${t('label.amplitude')} (${t(`units.${setting()}`)})`;

  const canShow = () => data !== null;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  function parentWidth() {
    const width = window.innerWidth;
    return displaySettings.gridView ? Math.min(700, width) : Math.min(1400, width);
  }

  function canShowChart() {
    switch (offset) {
      case 'crossElevationOffset':
        return displaySettings.showcrossElevationOffset;
      case 'elevationOffset':
        return displaySettings.showelevationOffset;
      case 'crossElevationFittedWidth':
        return displaySettings.showcrossElevationFittedWidth;
      case 'elevationFittedWidth':
        return displaySettings.showelevationFittedWidth;
      case 'fittedHeight':
        return displaySettings.showfittedHeight;
      default:
        return false;
    }
  }

  function calculateYData(inData: any) {
    switch (setting()) {
      case amplitudeAxisY[0]: // amplitude
        return inData;
      case amplitudeAxisY[1]: // db
        return inData.map((item: number) => calculateDB(item));
      case amplitudeAxisY[2]: // log
        return inData.map((item: number) => Math.log10(item));
      default:
        return 0;
    }
  }

  function getChartData(usedData: any) {
    const selection = offset;
    const xValues = usedData.antennas;
    const chartDataTmp = [
      {
        x: xValues,
        y: calculateYData(usedData[selection]),
        error_y: {
          type: 'data',
          array: usedData[`${selection}StandardDeviation`],
          visible: true
        },
        type: 'scatter',
        mode: 'markers',
        marker: {
          color: COLOR[2],
          size: 8
        }
      },
      {
        y: calculateYData(usedData[selection]),
        type: 'histogram',
        xaxis: 'x2',
        opacity: 0.5,
        marker: {
          color: COLOR[2]
        }
      }
    ];
    return chartDataTmp;
  }

  function checkForInvalidData(usedData: any) {
    const y = usedData[offset];

    const shapes = [];

    for (let i = 0; i < y.length; i++) {
      if (!Number.isFinite(y[i])) {
        shapes.push({
          type: 'rect',
          xref: 'x',
          yref: 'paper',
          x0: i - 0.5,
          y0: 0,
          x1: i + 0.5,
          y1: 1,
          fillcolor: '#fc0303',
          opacity: 0.2,
          line: {
            width: 0
          }
        });
      }
    }

    return shapes;
  }

  React.useEffect(() => {
    const firstRender = chartData === null;
    if (data) {
      setChartData(getChartData(data));
      setInvalidData(checkForInvalidData(data));
    }
    if (firstRender) {
      setShowContent(canShow());
    }
  }, [data, redraw]);

  React.useEffect(() => {
    if (!refresh) setShowContent(canShow());
    else setRefresh(false);
  }, [refresh]);

  React.useEffect(() => {
    if (showContent) {
      setShowContent(false);
      setRefresh(true);
    }
  }, [resize]);

  function setValue(e: typeof QASettings) {
    setSettings(e);
  }

  const chartToggle = () => (
    <YAxisToggle
      // eslint-disable-next-line react/jsx-no-bind
      setValue={setValue}
      testId={`${settingElement()}ButtonTestId`}
      type="amplitude"
      value={settingElement()}
      displaySettings={displaySettings}
    />
  );

  return (
    <>
      {canShowChart() && (
        <SignalCard
          action={chartToggle()}
          data-testid="signalCardId"
          title={`${t(`label.${offset}`)}`}
          socketStatus={socketStatus}
          showContent={showContent}
          setShowContent={showToggle}
          showInfoModal="true"
          infoTitle={`${t(`modalInfo.${offset}.title`)}`}
          infoContent={`${t(`modalInfo.${offset}.content`)}`}
          infoSite={`${t(`modalInfo.${offset}.site`)}`}
        >
          <Plotly
            darkMode={darkMode}
            data={showContent ? chartData : null}
            height={parentWidth() / RATIO}
            title={chartTitle()}
            width={parentWidth()}
            xLabel={xLabel()}
            yLabel={yLabel()}
            masked={invalidData}
            marginalHistogram
          />
        </SignalCard>
      )}
    </>
  );
};
export default PointingOffsets;
