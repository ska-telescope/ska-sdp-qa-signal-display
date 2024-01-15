import React from 'react';
import { useTranslation } from 'react-i18next';
import Plotly from '../Plotly/Plotly';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';

import SignalCard from '../SignalCard/SignalCard';
import YAxisToggle from '../YAxisToggle/YAxisToggle';
import {QASettings} from '../Settings/qaSettings';
import { COLOR } from '../../utils/constants';



interface PointingOffsetsProps {
    data: object;
    displaySettings: any;
    offset: string;
    redraw: boolean;
    resize: number;
    socketStatus: string;
}

const RATIO = 2;

const PointingOffsets = ({
    data,
    displaySettings,
    offset,
    redraw,
    resize,
    socketStatus
}: PointingOffsetsProps) => {
    const { t } = useTranslation('signalDisplay');
    const [chartData, setChartData] = React.useState(null);
    const [showContent, setShowContent] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const { darkMode } = storageObject.useStore();

    const chartTitle = () => '';


    const settingElement = () => `showPointingOffsets`;
    const setting = () => displaySettings[settingElement()];
    const xLabel = () => `${t('label.antennas')}`;

    const yLabel = () => `${t('label.amplitude')} (arcmin)`;


    const canShow = () => data !== null;

    const showToggle = () => {
        setShowContent(showContent ? false : canShow());
    };

    function parentWidth() {
        // TODO : Make this responsive
        if (displaySettings.gridView) {
        return 700;
        } else {
          return 1400
        }
      }

    function canShowChart() {
        switch (offset) {
          case 'cross':
            return displaySettings.showCrossElevationOffset;
          case 'elevation':
            return displaySettings.showElevationOffset;
          case 'expectedH':
            return displaySettings.showHBeamWidths;
          case 'expectedV':
            return displaySettings.showVBeamWidths;
          case 'tolerance':
            return displaySettings.showToleranceVHWidths;
          case 'height':
            return displaySettings.showFittedHeight;
          default:
            return false;
        }
      }

      function getChartData(usedData: any) {
        const xValues = usedData.crossElevationOffset.x;
        const chartDataTmp = [
            {
                x: xValues,
                y: usedData.crossElevationOffset.y,
                error_y: {
                    type: 'data',
                    array: usedData.crossElevationOffset.uncertainties,
                    visible: true
                },
                type: "scatter",
                mode: "markers",
                marker: {
                  color: COLOR[0],
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


    return (
        <>
            {canShowChart() && (
                <SignalCard
                action={<></>}
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
            </SignalCard>)
            }
                
        </>
    );
};
export default PointingOffsets;