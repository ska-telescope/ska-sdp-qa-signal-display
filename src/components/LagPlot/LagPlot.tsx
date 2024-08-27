/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Grid } from '@mui/material';
import Config from 'src/services/types/Config';
import Legend from 'src/services/types/Legend';
import SKAOModal from '../Modal/Modal';
import SignalCard from '../SignalCard/SignalCard';
import LagPlotImage from '../LagPlotImage/LagPlotImage';
import WaterfallPlot from '../WaterfallPlot/WaterfallPlot';
import { DATA_LOCAL, DATA_API_URL, WATERFALL_PLOT_TYPES } from '../../utils/constants';
import { QASettings } from '../Settings/qaSettings';

interface LagPlotProps {
  config: Config;
  legend: Legend[];
  displaySettings: typeof QASettings;
  subArray: string;
}

const LagPlot = ({ config, legend, displaySettings, subArray }: LagPlotProps) => {
  const { t } = useTranslation('signalDisplay');

  const [showContent, setShowContent] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [baselineData, setBaselineData] = React.useState(null);
  const [chartData, setChartData] = React.useState(null);

  const PATH_SUFFIX = '/latest/baselines';

  const showToggle = () => {
    setShowContent(showContent ? false : chartData !== null);
  };

  React.useEffect(() => {
    if (config === null) {
      return;
    }

    const abortController = new AbortController();
    async function retrieveBaseData() {
      try {
        const response = await fetch(`${DATA_API_URL}${config.paths.processing_blocks}${PATH_SUFFIX}`, {
          signal: abortController.signal
        });
        const data = await response.json();
    
        const filteredBaselines = data.baselines.filter((baseline: string) => {
          const [part1, part2] = baseline.split('_');
          return part1 !== part2;
        });
    
        setShowContent(true);
        setBaseData(filteredBaselines);
        abortController.abort();
      } catch (error) {
        abortController.abort();
      }
    }

    if (DATA_LOCAL) {
      setShowContent(true);
      setBaselineData('DATA_LOCAL');
    } else if (config !== null) {
      retrieveBaseData();
    }
  }, [config]);

  React.useEffect(() => {
    if (DATA_LOCAL) {
      setChartData(['DUMMY_DATA']);
    }
    if (baselineData === null) {
      setChartData([]);
      return;
    }
    if (legend?.length > 0 && baselineData?.length === legend.length * 4) {
      const newData = [];
      for (let i = 0; i < legend.length; i += 1) {
        if (`${legend[i].text}_XX` === baselineData[i * 4] && legend[i].active) {
          newData.push(baselineData[i * 4 + 0]);
          newData.push(baselineData[i * 4 + 1]);
          newData.push(baselineData[i * 4 + 2]);
          newData.push(baselineData[i * 4 + 3]);
        }
      }
      setChartData(newData);
    } else {
      setChartData(baselineData);
    }
  }, [baselineData, legend]);

  function imageClick(item: string) {
    setOpen(true);
    setSelected(DATA_LOCAL ? 'THUMBNAIL' : item);
  }

  return (
    <>
      {selected && (
        <SKAOModal open={open} onClose={() => setOpen(false)}>
          <Card variant="outlined" className="removeBorder:focus">
            <CardContent>
              <WaterfallPlot
                type={WATERFALL_PLOT_TYPES.LAG_PLOT}
                item={selected}
                config={config}
                subArray={subArray}
              />
            </CardContent>
          </Card>
        </SKAOModal>
      )}
      {displaySettings.showLagPlots && (
        <SignalCard
          data-testId="jacob2"
          title={t('label.lagplots')}
          showContent={showContent}
          setShowContent={showToggle}
          showInfoModal="true"
          infoTitle={t('modalInfo.lagPlot.title')}
          infoContent={t('modalInfo.lagPlot.content')}
          infoSite={t('modalInfo.lagPlot.site')}
        >
          <>
            <Grid data-testid="jacob5" container direction="row" justifyContent="space-evenly">
              {DATA_LOCAL && (
                <>
                  <Grid data-testid="LagPlot1Id" item>
                    <LagPlotImage config={config} element={null} onClick={() => imageClick(null)} />
                  </Grid>
                  <Grid data-testid="LagPlot2Id" item>
                    <LagPlotImage config={config} element={null} onClick={() => imageClick(null)} />
                  </Grid>
                  <Grid data-testid="LagPlot3Id" item>
                    <LagPlotImage config={config} element={null} onClick={() => imageClick(null)} />
                  </Grid>
                  <Grid data-testid="LagPlot4Id" item>
                    <LagPlotImage config={config} element={null} onClick={() => imageClick(null)} />
                  </Grid>
                </>
              )}
              {!DATA_LOCAL && chartData && chartData.length ? (
                chartData.map(
                  (item): React.JSX.Element => (
                    <Grid key={item} item>
                      <LagPlotImage
                        config={config}
                        element={item}
                        onClick={() => imageClick(item)}
                      />
                    </Grid>
                  )
                )
              ) : (
                <div />
              )}
            </Grid>
            <div id="LagPlotId" />
          </>
        </SignalCard>
      )}
    </>
  );
};

export default LagPlot;
