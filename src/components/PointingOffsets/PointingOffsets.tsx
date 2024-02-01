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
    displaySettings: any;
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
    const [showContent, setShowContent] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const { darkMode } = storageObject.useStore();

    const chartTitle = () => '';

    const settingElement = () => `show${dataSelect()}axisY`;
    const setting = () => displaySettings[settingElement()];

    const xLabel = () => `${t('label.antennas')}`;

    const yLabel = () => `${t('label.amplitude')} (${t(`units.${setting()}`)})`;


    const canShow = () => data !== null;

    const showToggle = () => {
        setShowContent(showContent ? false : canShow());
    };

    function parentWidth() {
        // TODO : Make this responsive
        if (displaySettings.gridView) {
        return 700;
        } 
          return 1400
        
      }

    function dataSelect() {
      switch (offset) {
        case 'cross':
            return "crossElevationOffset";
          case 'elevation':
            return "elevationOffset";
          case 'expectedH':
            return "fittedHBeamWidths";
          case 'expectedV':
            return "fittedVBeamWidths";
          case 'tolerance':
            return "toleranceVHWidths";
          case 'height':
            return "fittedHeight";
      }
    }

    function canShowChart() {
        switch (offset) {
          case 'cross':
            return displaySettings.showcrossElevationOffset;
          case 'elevation':
            return displaySettings.showelevationOffset;
          case 'expectedH':
            return displaySettings.showHBeamWidths;
          case 'expectedV':
            return displaySettings.showVBeamWidths;
          case 'tolerance':
            return displaySettings.showtoleranceVHWidths;
          case 'height':
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
        const selection = dataSelect()
        const xValues = usedData[selection].x;
        const chartDataTmp = [
            {
                x: xValues,
                y: calculateYData(usedData[selection].y),
                error_y: {
                    type: 'data',
                    array: usedData[selection].uncertainties,
                    visible: true
                },
                type: "scatter",
                mode: "markers",
                marker: {
                  color: COLOR[2],
                  size: 8
                }
            }

        ];
        return chartDataTmp
      }

      React.useEffect(() => {
        const firstRender = chartData === null;
        if (data) {
          setChartData(getChartData(data));
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
          showInfoModal='true'
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
          />
        </SignalCard>
)}
                
      </>
    );
};
export default PointingOffsets;