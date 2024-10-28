/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { Card, CardContent } from '@mui/material';
import Config from '../../services/types/Config';
import Plotly from '../Plotly/Plotly';
import SignalCard from '../SignalCard/SignalCard';
import YAxisToggle from '../YAxisToggle/YAxisToggle';
import WaterfallToggle from '../WaterfallToggle/WaterfallToggle';
import { COLOR, DATA_LOCAL, WATERFALL_PLOT_TYPES } from '../../utils/constants';
import { calculateChannels, calculateDB } from '../../utils/calculate';
import { amplitudeAxisY, QASettings } from '../Settings/qaSettings';
import {
  MISSING_DATA_COLOR,
  INVALID_DATA_COLOR,
  createRectangle
} from '../../utils/masksCalculator';
import SpectrumWaterfallPlotImage from '../SpectrumWaterfallImage/SpectrumWaterfallImage';
import SKAOModal from '../Modal/Modal';
import WaterfallPlot from '../WaterfallPlot/WaterfallPlot';

interface SpectrumPlotProps {
  data: object;
  displaySettings: typeof QASettings;
  polarization: string;
  redraw: boolean;
  resize: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setSettings: Function;
  socketStatus: string;
  config: Config;
  subArray: string;
  missingData?: number[][];
}

const RATIO = 2;

const SpectrumPlot = ({
  data,
  displaySettings,
  polarization,
  redraw,
  resize,
  setSettings,
  socketStatus,
  config,
  subArray,
  missingData = null
}: SpectrumPlotProps) => {
  const { t } = useTranslation('signalDisplay');

  const [chartData, setChartData] = React.useState(null);
  const [maskedData, setMaskedData] = React.useState([]);
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const { darkMode } = storageObject.useStore();

  const chartTitle = () => '';

  const settingElement = () => `showSpectrumPlot${polarization}axisY`;
  const waterfallToggleElement = () => `showSpectrumWaterfallPlot${polarization}`;
  const setting = () => displaySettings[settingElement()];
  const settingWaterfall = () => displaySettings[waterfallToggleElement()];

  const xLabel = () => `${t('label.frequency')} (${t('units.frequency')})`;

  const yLabel = () => `${t('label.amplitude')} (${t(`units.${setting()}`)})`;

  const canShow = () => data !== null;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  function parentWidth() {
    const width = window.innerWidth;
    return displaySettings.gridView ? Math.min(700, width) : Math.min(1400, width);
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

  function getYData(inData: any, polar: string) {
    return calculateYData(
      inData.filter(spectrumPayload => spectrumPayload.polarisation === polar)[0].power
    );
  }
  function getChartData(usedData: any) {
    const xValues = calculateChannels(usedData.spectral_window);
    const chartDataTmp = [
      {
        x: xValues,
        y: getYData(usedData.data, polarization),
        marker: {
          color: COLOR[2]
        },
        line: { shape: 'hvh' }
      }
    ];
    return chartDataTmp;
  }

  function canShowChart() {
    switch (polarization) {
      case 'XX':
        return displaySettings.showSpectrumPlotXX;
      case 'XY':
        return displaySettings.showSpectrumPlotXY;
      case 'YX':
        return displaySettings.showSpectrumPlotYX;
      case 'YY':
        return displaySettings.showSpectrumPlotYY;
      default:
        return false;
    }
  }

  function checkForInvalidData(usedData: any) {
    const xValues = calculateChannels(usedData.spectral_window);
    const y = getYData(usedData.data, polarization);

    for (let i = 0; i < y.length; i++) {
      if (!Number.isFinite(y[i])) {
        const x0 = xValues[i] - 0.5 * (xValues[1] - xValues[0]);
        const x1 = xValues[i] + 0.5 * (xValues[1] - xValues[0]);
        maskedData.push(createRectangle(x0, x1, INVALID_DATA_COLOR));
      }
    }

    return maskedData;
  }

  function checkForMissingData(masksData: number[][]) {
    function rectangle(item: number[]) {
      maskedData.push(createRectangle(item[0], item[1], MISSING_DATA_COLOR));
    }
    masksData.forEach(rectangle);
    return maskedData;
  }

  function imageClick(item: string) {
    setOpen(true);
    setSelected(DATA_LOCAL ? 'THUMBNAIL' : item);
  }

  React.useEffect(() => {
    if (config === null) {
      return;
    }

    if (DATA_LOCAL) {
      setShowContent(true);
    } else if (config !== null) {
      setShowContent(true);
    }
  }, [config]);

  React.useEffect(() => {
    const firstRender = chartData === null;
    if (data) {
      setChartData(getChartData(data));
      setMaskedData(checkForInvalidData(data));
      if (missingData) {
        setMaskedData(checkForMissingData(missingData));
      }
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
      disabled={settingWaterfall() === 'waterfallPlot'}
    />
  );

  const waterfallToggle = () => (
    <WaterfallToggle
      // eslint-disable-next-line react/jsx-no-bind
      setValue={setValue}
      testId={`${waterfallToggleElement()}ButtonTestId`}
      type="spectrum"
      value={waterfallToggleElement()}
      displaySettings={displaySettings}
      disabled={false}
    />
  );

  if (settingWaterfall() === 'spectrumPlot') {
    return (
      <>
        {canShowChart() && (
          <SignalCard
            action={chartToggle()}
            action2={waterfallToggle()}
            data-testid="signalCardId"
            title={`${t('label.spectrumPlot')} ${polarization}`}
            socketStatus={socketStatus}
            showContent={showContent}
            setShowContent={showToggle}
            showInfoModal="true"
            infoTitle={t('modalInfo.spectrumPlot.title')}
            infoContent={t('modalInfo.spectrumPlot.content')}
            infoSite={t('modalInfo.spectrumPlot.site')}
          >
            <Plotly
              darkMode={darkMode}
              data={showContent ? chartData : null}
              height={parentWidth() / RATIO}
              title={chartTitle()}
              width={parentWidth()}
              xLabel={xLabel()}
              yLabel={yLabel()}
              masked={maskedData}
            />
          </SignalCard>
        )}
      </>
    );
  }
  return (
    <>
      {selected && (
        <SKAOModal open={open} onClose={() => setOpen(false)}>
          <Card variant="outlined" className="removeBorder:focus">
            <CardContent>
              <WaterfallPlot
                type={WATERFALL_PLOT_TYPES.SPECTRUM}
                item={selected}
                config={config}
                subArray={subArray}
              />
            </CardContent>
          </Card>
        </SKAOModal>
      )}
      <SignalCard
        action={null}
        action2={waterfallToggle()}
        data-testid="signalCardId"
        title={`${t('label.spectrumPlot')} ${polarization}`}
        socketStatus={socketStatus}
        showContent={showContent}
        setShowContent={showToggle}
        showInfoModal="true"
        infoTitle={t('modalInfo.spectrumPlot.title')}
        infoContent={t('modalInfo.spectrumPlot.content')}
        infoSite={t('modalInfo.spectrumPlot.site')}
      >
        <SpectrumWaterfallPlotImage
          element={polarization}
          config={config}
          onClick={() => imageClick(polarization)}
        />
      </SignalCard>
    </>
  );
};
export default SpectrumPlot;
