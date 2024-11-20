/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import Plotly from '../Plotly/Plotly';
import SignalCard from '../SignalCard/SignalCard';
import YAxisToggle from '../YAxisToggle/YAxisToggle';
import { COLOR } from '../../utils/constants';
import { calculateDB, calculateLog } from '../../utils/calculate';
import { amplitudeAxisY, QASettings } from '../Settings/qaSettings';

interface BandAveragedXCorrProps {
  data: object;
  displaySettings: typeof QASettings;
  legend: any;
  polarization: string;
  redraw: boolean;
  resize: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setSettings: Function;
  socketStatus: string;
}

const RATIO = 2;

const BandAveragedXCorr = ({
  data,
  displaySettings,
  legend,
  polarization,
  redraw,
  resize,
  setSettings,
  socketStatus
}: BandAveragedXCorrProps) => {
  const { t } = useTranslation('signalDisplay');

  const [chartData, setChartData] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const settingElement = (amplitude: boolean) =>
    `showPolarization${amplitude ? 'Amplitude' : 'Phase'}${polarization}axisY`;

  const setting = (amplitude: boolean) => displaySettings[settingElement(amplitude)];

  const xLabel = () => `${t('label.time')}`;

  const yLabel = (amplitude: boolean) =>
    `${t('label.amplitude')} (${t(`units.${setting(amplitude)}`)})`;

  function calculateYData(values: any, amplitude: boolean) {
    switch (setting(amplitude)) {
      case amplitudeAxisY[0]: // amplitude
        return values;
      case amplitudeAxisY[1]: // db
        return values.map((item: number) => calculateDB(item));
      case amplitudeAxisY[2]: // log
        return values.map((item: number) => calculateLog(item));
      default:
        return 0;
    }
  }

  function getBaseData(inData: Array<any>, polarisation: string, amplitude: boolean) {
    return inData
      .filter(
        dataPayLoad =>
          dataPayLoad.polarisation === polarisation &&
          (!legend || legend.some(l => l.text === dataPayLoad.baseline && l.active))
      )
      .map(dataPayLoad => ({
        name: dataPayLoad.baseline,
        data: calculateYData([dataPayLoad.data], amplitude)
      }));
  }

  const legendMap = React.useMemo(() => {
    const map = new Map();
    legend?.forEach(l => map.set(l.text, l.color));
    return map;
  }, [legend]);

  function getLegendColor(name: string) {
    return legendMap.get(name) || COLOR[0];
  }

  function getChartData(usedData: any[], amplitude: boolean) {
    if (!legend || usedData.length === 0) return [];

    const traces = [];

    usedData.forEach(dataSet => {
      const baseData = getBaseData(dataSet.data, polarization, amplitude);

      baseData.forEach((base, index) => {
        if (!traces[index]) {
          traces[index] = {
            x: [],
            y: [],
            mode: 'markers+lines',
            name: base.name,
            marker: { color: getLegendColor(base.name) }
          };
        }

        traces[index].x.push(dataSet.timestamp);
        traces[index].y.push(base.data[0]);
      });
    });

    return traces;
  }

  const canShow = () => data !== null;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  function parentWidth() {
    const width = window.innerWidth;
    return displaySettings.gridView ? Math.min(700, width) : Math.min(1400, width);
  }

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

  React.useEffect(() => {
    const firstRender = chartData === null;
    if (data && legend) {
      setChartData(canShow() ? getChartData(data, true) : null);
    }
    if (firstRender) {
      setShowContent(canShow());
    }
  }, [data, legend, redraw]);

  function setValue(e: typeof QASettings) {
    setSettings(e);
  }

  const chartToggle = (type: boolean) => (
    <YAxisToggle
      // eslint-disable-next-line react/jsx-no-bind
      setValue={setValue}
      testId={`${settingElement(type)}ButtonTestId`}
      type={type ? 'amplitude' : 'phase'}
      value={settingElement(type)}
      displaySettings={displaySettings}
    />
  );

  return (
    <>
      {canShow() && (
        <SignalCard
          action={chartToggle(true)}
          title={`Band Averaged Cross Correlation Power (${polarization})`}
          socketStatus={socketStatus}
          showContent={showContent}
          setShowContent={showToggle}
          showInfoModal="true"
          infoTitle={t('modalInfo.bandAveragedXCorr.title')}
          infoContent={t('modalInfo.bandAveragedXCorr.content')}
          infoSite={t('modalInfo.bandAveragedXCorr.site')}
        >
          {legend && chartData && chartData.length > 0 && (
            <Plotly
              darkMode={darkMode}
              data={showContent ? chartData : null}
              height={parentWidth() / RATIO}
              title=""
              width={parentWidth()}
              xLabel={xLabel()}
              yLabel={yLabel(true)}
            />
          )}
        </SignalCard>
      )}
    </>
  );
};
export default BandAveragedXCorr;
