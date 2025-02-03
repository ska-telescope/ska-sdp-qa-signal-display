/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Grid } from '@mui/material';
import Config from 'src/services/types/Config';
import Legend from 'src/services/types/Legend';
import SKAOModal from '../Modal/Modal';
import SignalCard from '../SignalCard/SignalCard';
import WaterfallPlot from '../WaterfallPlot/WaterfallPlot';
import { DATA_LOCAL, DATA_API_URL, WATERFALL_PLOT_TYPES } from '../../utils/constants';
import { QASettings } from '../Settings/qaSettings';
import inView from '../InView/InView';

const LagPlotImage = React.lazy(() => import('../LagPlotImage/LagPlotImage'));

interface LagPlotProps {
  config: Config;
  legend: Legend[];
  displaySettings: typeof QASettings;
  subArray: string;
  subarrayDetails: any;
  redraw: boolean;
  hiResWindows?: any;
}

const LagPlot = ({
  config,
  legend,
  displaySettings,
  subArray,
  subarrayDetails,
  redraw,
  hiResWindows
}: LagPlotProps) => {
  const { t } = useTranslation('signalDisplay');

  const [showContent, setShowContent] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [baselineData, setBaselineData] = React.useState(null);
  const [chartData, setChartData] = React.useState(null);

  const PATH_SUFFIX = `/${subarrayDetails?.execution_block?.key}/baselines`;

  const lagPlotImageRef = React.useRef<HTMLDivElement>(null);
  const lagPlotImageInView = inView(lagPlotImageRef, '100px');

  const showToggle = () => {
    if (chartData !== null) {
      setShowContent(!showContent);
    }
  };  

  React.useEffect(() => {
    if (config === null) {
      return;
    }

    const abortController = new AbortController();
    async function retrieveBaseData() {
      try {
        const response = await fetch(`${DATA_API_URL}/config/execution_blocks${PATH_SUFFIX}`, {
          signal: abortController.signal
        });
        const data = await response.json();

        const filteredBaselines = data.baselines.filter((baseline: string) => {
          const [part1, part2] = baseline.split('_');
          return part1 !== part2;
        });

        setBaselineData(filteredBaselines);
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
  }, [config, redraw]);

  React.useEffect(() => {
    if (DATA_LOCAL) {
      setChartData(['DUMMY_DATA']);
    }
    if (baselineData === null) {
      setChartData([]);
      return;
    }

    setChartData(baselineData);
  }, [baselineData, legend]);

  function imageClick(item: string) {
    setOpen(true);
    setSelected(DATA_LOCAL ? 'THUMBNAIL' : item);
  }

  return (
    <div ref={lagPlotImageRef}>
      {selected && (
        <SKAOModal open={open} onClose={() => setOpen(false)}>
          <Card variant="outlined" className="removeBorder:focus">
            <CardContent>
              <WaterfallPlot
                type={WATERFALL_PLOT_TYPES.LAG_PLOT}
                item={selected}
                config={config}
                subArray={subArray}
                hiResWindows={hiResWindows}
              />
            </CardContent>
          </Card>
        </SKAOModal>
      )}
      {displaySettings.showLagPlots && (
        <SignalCard
          title={t('label.lagplots')}
          showContent={showContent}
          setShowContent={showToggle}
          showInfoModal="true"
          infoTitle={t('modalInfo.lagPlot.title')}
          infoContent={t('modalInfo.lagPlot.content')}
          infoSite={t('modalInfo.lagPlot.site')}
        >
          <Grid container direction="row" justifyContent="space-evenly">
            {DATA_LOCAL && (
              [0,1,2,3].map((content) => (
                <Grid data-testid={`lagplot-${content}`} item>
                  <LagPlotImage
                    APIconfig={config}
                    element={null}
                    onClick={() => imageClick(null)}
                    subarrayDetails={subarrayDetails}
                  />
                </Grid>
              ))
            )}

            {!DATA_LOCAL && chartData && chartData.length && lagPlotImageInView ? (
              chartData.map(item => (
                <Grid key={item} item>
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <LagPlotImage
                      APIconfig={config}
                      element={item}
                      onClick={() => imageClick(item)}
                      subarrayDetails={subarrayDetails}
                    />
                  </React.Suspense>
                </Grid>
              ))
            ) : (
              <div />
            )}
          </Grid>
        </SignalCard>
      )}
    </div>
  );
};

export default LagPlot;
