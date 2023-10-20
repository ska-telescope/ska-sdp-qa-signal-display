/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Grid } from '@mui/material';
import SKAOModal from '../Modal/Modal';
import SignalCard from '../SignalCard/SignalCard';
import LagPlotImage from '../LagPlotImage/LagPlotImage';
import { DATA_LOCAL, DATA_API_URL } from '../../utils/constants';

interface LagPlotProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  displaySettings: any;
}


const LagPlot = ({ config, legend, displaySettings }: LagPlotProps) => {
    const { t } = useTranslation('signalDisplay');
  
    const [showContent, setShowContent] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);
    const [baseData, setBaseData] = React.useState(null);
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
      await fetch(`${DATA_API_URL}${config.paths.processing_blocks}${PATH_SUFFIX}`, {
        signal: abortController.signal
      })
        .then(response => response.json())
        .then(data => {
          setShowContent(true);
          setBaseData(data.baselines);
          abortController.abort();
        })
        .catch(() => {
          // TODO : Should we put something in here ?
          abortController.abort();
        });
    }

    if (DATA_LOCAL) {
      setShowContent(true);
      setBaseData('DATA_LOCAL');
    } else if (config !== null) {
      retrieveBaseData();
    }
  }, [config]);

  React.useEffect(() => {
    if (DATA_LOCAL) {
      setChartData(['DUMMY_DATA']);
    }
    if (baseData === null) {
      setChartData([]);
      return;
    }
    if (legend?.length > 0 && baseData?.length === legend.length * 4) {
      const newData = [];
      for (let i = 0; i < legend.length; i += 1) {
        if (`${legend[i].text}_XX` === baseData[i * 4] && legend[i].active) {
          newData.push(baseData[i * 4 + 0]);
          newData.push(baseData[i * 4 + 1]);
          newData.push(baseData[i * 4 + 2]);
          newData.push(baseData[i * 4 + 3]);
        }
      }
      setChartData(newData);
    } else {
      setChartData(baseData);
    }
  }, [baseData, legend]);

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
              <LagPlotImage config={config} element={selected} full />
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
        >
          <>
            <Grid data-testid="jacob5" container direction="row" justifyContent="space-evenly">
              {DATA_LOCAL && (
                <>
                  <Grid data-testid="LagPlot1Id" item>
                    <LagPlotImage
                      config={config}
                      element={null}
                      onClick={() => imageClick(null)}
                    />
                  </Grid>
                  <Grid data-testid="LagPlot2Id" item>
                    <LagPlotImage
                      config={config}
                      element={null}
                      onClick={() => imageClick(null)}
                    />
                  </Grid>
                  <Grid data-testid="LagPlot3Id" item>
                    <LagPlotImage
                      config={config}
                      element={null}
                      onClick={() => imageClick(null)}
                    />
                  </Grid>
                  <Grid data-testid="LagPlot4Id" item>
                    <LagPlotImage
                      config={config}
                      element={null}
                      onClick={() => imageClick(null)}
                    />
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