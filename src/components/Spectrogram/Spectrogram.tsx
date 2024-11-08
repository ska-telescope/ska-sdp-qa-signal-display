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

const SpectrogramImage = React.lazy(() => import('../SpectrogramImage/SpectrogramImage'));

interface SpectrogramProps {
  config: Config;
  legend: Legend[];
  displaySettings: typeof QASettings;
  subArray: string;
  subarrayDetails: any;
  redraw: boolean;
}

const Spectrogram = ({ config, legend, displaySettings, subArray, subarrayDetails, redraw }: SpectrogramProps) => {
  const { t } = useTranslation('signalDisplay');

  const [showContent, setShowContent] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [baselineData, setBaselineData] = React.useState(null);
  const [chartData, setChartData] = React.useState(null);

  const PATH_SUFFIX = `/${subarrayDetails?.execution_block?.key}/baselines`;

  const spectrogramImageRef = React.useRef<HTMLDivElement>(null);
  const spectrogramImageInView = inView(spectrogramImageRef, '100px');

  const showToggle = () => {
    setShowContent(showContent ? false : chartData !== null);
  };

  React.useEffect(() => {
    if (config === null) {
      return;
    }

    const abortController = new AbortController();
    async function retrieveBaselineData() {
      await fetch(`${DATA_API_URL}/config/execution_blocks${PATH_SUFFIX}`, {
        signal: abortController.signal
      })
        .then(response => response.json())
        .then(data => {
          setShowContent(true);
          setBaselineData(data.baselines);
          abortController.abort();
        })
        .catch(() => {
          // TODO : Should we put something in here ?
          abortController.abort();
        });
    }

    if (DATA_LOCAL) {
      setShowContent(true);
      setBaselineData('DATA_LOCAL');
    } else if (config !== null) {
      retrieveBaselineData();
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
    <div ref={spectrogramImageRef}>
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
      {displaySettings.showSpectrograms && (
        <SignalCard
          title={t('label.spectrograms')}
          showContent={showContent}
          setShowContent={showToggle}
          showInfoModal="true"
          infoTitle={t('modalInfo.spectrogram.title')}
          infoContent={t('modalInfo.spectrogram.content')}
          infoSite={t('modalInfo.spectrogram.site')}
        >
          <Grid container direction="row" justifyContent="space-evenly">
            {DATA_LOCAL && (
              <>
                <Grid data-testid="spectrogram1Id" item>
                  <SpectrogramImage
                    config={config}
                    element={null}
                    onClick={() => imageClick(null)}
                    subarrayDetails={subarrayDetails}
                  />
                </Grid>
                <Grid data-testid="spectrogram2Id" item>
                  <SpectrogramImage
                    config={config}
                    element={null}
                    onClick={() => imageClick(null)}
                    subarrayDetails={subarrayDetails}
                  />
                </Grid>
                <Grid data-testid="spectrogram3Id" item>
                  <SpectrogramImage
                    config={config}
                    element={null}
                    onClick={() => imageClick(null)}
                    subarrayDetails={subarrayDetails}
                  />
                </Grid>
                <Grid data-testid="spectrogram4Id" item>
                  <SpectrogramImage
                    config={config}
                    element={null}
                    onClick={() => imageClick(null)}
                    subarrayDetails={subarrayDetails}
                  />
                </Grid>
              </>
            )}

            {!DATA_LOCAL && chartData && chartData.length && spectrogramImageInView ? (
              chartData.map(item => (
                <Grid key={item} item>
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <SpectrogramImage
                      config={config}
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

export default Spectrogram;
