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
import {
  calculateDB,
  calculateLog
} from '../../utils/calculate';
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

  function getBaseData( inData: array, polarisation: string, amplitude: boolean) {
    const tmp = inData
      .filter(dataPayLoad => dataPayLoad.polarisation === polarisation)
      .map(dataPayLoad => ({
          name: dataPayLoad.baseline,
          data: calculateYData([dataPayLoad.data], amplitude)
      }));
    if (!legend || legend.length === 0) {
        return tmp;
        }
    const arr = [];
    for (let i = 0; i < tmp.length; i += 1) {
        if (tmp[i].name === legend[i].text && legend[i].active) {
        arr.push(tmp[i]);
        }
    }

    return arr;
  }

  function getLegendColor(name: string) {
    if (legend) {
      for (let i = 0; i < legend.length; i++) {
        if (legend[i].text === name) {
          return legend[i].color;
        }
      }
    }
    return COLOR[0]; // Only here for completeness.
  }


  function getChartData(usedData: any, amplitude: boolean) {

    console.log(usedData)

    const traces = [];
    if (!legend) {
        return traces;
      }

    if (usedData.length === 0) {
        return traces;
    }


    for (let k = 0; k < usedData[0].data.filter(dataPayload => dataPayload.polarisation===polarization).length; k++) {
        traces.push({
            x: [],
            y: [],
            mode: 'markers+lines',
            name: '',
            marker: []
        });
    }

    const newTraces = [...traces]


    for (let j = 0; j < usedData.length; j++) {
        const baseData = getBaseData(usedData[j].data, polarization, amplitude)
        for (let i = 0; i < baseData.length; i++) {
            newTraces[i].x.push(usedData[j].timestamp)
            newTraces[i].y.push(baseData[i].data[0])
            newTraces[i].name = baseData[i].name
            newTraces[i].marker.push({color: getLegendColor(baseData[i].names)})
        }
    }
    
    return newTraces;
  }


  const canShow = () => data !== null;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  function parentWidth() {
    // TODO : Make this responsive
    if (displaySettings.gridView) {
      return 700;
    }
    return 1400;
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
