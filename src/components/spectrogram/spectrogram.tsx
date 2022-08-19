import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Container, ImageList, ImageListItem, ImageListItemBar, Grid, Modal, Typography } from '@mui/material';
import { Protocol } from 'src/models/protocol';
import { MessageTopic } from 'src/models/message-topic';
import { decodeJson, decodeSpectrogram } from 'src/libs/decoder';
import SpectrogramPlotTable from 'src/libs/spectrogram-plot-table'; 

const WIDTH = 1200;
const HEIGHT = 300;
const CELL_WIDTH = 150;
const CELL_HEIGHT = 75;
const PROTOCOL = (process.env.REACT_APP_MESSAGE_TYPE === "protobuf") ? Protocol.PROTOBUF : Protocol.JSON;
const MESSAGE_TOPIC = MessageTopic.SPECTROGRAMS;
const WS_API = `${process.env.REACT_APP_WS_API}/${PROTOCOL}_${MESSAGE_TOPIC}`;
const SWITCH_D3_IMAGE_CREATION_ON_OFF = process.env.REACT_APP_SWITCH_D3_IMAGE_CREATION_ON_OFF;
const DATA_API_URL = process.env.REACT_APP_DATA_API_URL



const Spectrogram = () => {
  const [socketStatus, setSocketStatus] = useState('disconnected');
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [chartData, setChartData] = useState(null);

  const handleOpen = () => setOpen(true);  
  const handleClose = () => setOpen(false);


  async function retrieveChartData() {
      await fetch(`${DATA_API_URL}/stats/baselines`)
          .then((response) => response.json())
          .then((data)=> {
          setChartData(data.baselines);
    }).catch(()=>null);
  }
  const connectWebSocket = useCallback(async () => {
    const spectrogramPlotTable = new SpectrogramPlotTable(
      'spectrogramId',
      WIDTH,
      HEIGHT,
      CELL_WIDTH,
      CELL_HEIGHT
    );      

    const ws = new WebSocket(WS_API);

    ws.onerror = function onError(e) {
      /* eslint no-console: ["error", { allow: ["error"] }] */
      console.error('SpectrogramsPage: ws onerror, error = ', e);
    };

    ws.onclose = function onClose() {
      // DEBUG console.log("SpectrogramsPage: ws onclose");
    };

    ws.onopen = function onOpen() {
      // DEBUG console.log("SpectrogramsPage: ws onopen");
      // ws.send("status: ws open");
    };

    ws.onmessage = function onMessage(msg) {
      const data = msg?.data;
      if (SWITCH_D3_IMAGE_CREATION_ON_OFF === "on"){
        try {
          if (data instanceof ArrayBuffer) {
            // DEBUG console.log("SpectrogramsPage: received, type = ArrayBuffer, data = ", data);
          } else if (data instanceof Blob) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            decodeSpectrogram(data).then((decoded: any) => {
              // DEBUG console.log("SpectrogramsPage: received type = Blob, decoded = ", decoded);
              window.requestAnimationFrame(() => {
                spectrogramPlotTable.draw(decoded.spectrogram);
              });
            });
          } else {
            const decoded = decodeJson(data);
            // DEBUG console.log( "SpectrogramsPage: received type = string, decoded = ", decoded, );
            if (decoded && decoded.status) {
              setSocketStatus(decoded.status);
            } else {
              // DEBUG console.log("SpectrogramsPage: received type = text, decoded = ", decoded);
              window.requestAnimationFrame(() => {
                spectrogramPlotTable.draw(decoded.spectrogram);
              });
            }
          }
        } catch (e) {
          /* eslint no-console: ["error", { allow: ["error"] }] */
          console.error('SpectrogramsPage: received, decoding error = ', e);
        }
      }
    }
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    connectWebSocket();
    retrieveChartData();
  }, [connectWebSocket, retrieveChartData]);

  function getImageUrl(item: string){
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  function imageClick(item: string) {
    handleOpen();
    setImageUrl(getImageUrl(item));
  }

  if(SWITCH_D3_IMAGE_CREATION_ON_OFF === "on"){
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ minWidth: WIDTH }}>
              <CardHeader
                title="Spectrograms"
                subheader={`Socket: ${socketStatus}, Serialisation: ${PROTOCOL}`}
              />

              <CardContent sx={{ pt: '8px' }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Click on the baseline and polarisation label to see a detailed spectrogram
                </Typography>

                <div id="spectrogramId" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
    return (
      <Container>
        <Modal open={open} onClose={handleClose} style={{display:'flex',alignItems:'center',justifyContent:'center', border:'none'}}>
          <Card sx={{ minWidth: WIDTH, border:'none'}} >
            <CardContent style={{border:'none'}}>
              <img src={imageUrl} 
              loading="lazy"
              alt=""/>
            </CardContent>
          </Card>
      </Modal>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ minWidth: WIDTH }}>
              <CardHeader
                title="Spectrograms"
                subheader={`Socket: ${socketStatus}, Serialisation: ${PROTOCOL}`}
              />

              <CardContent sx={{ pt: '8px' }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Click on the baseline and polarisation label to see a detailed spectrogram
                </Typography>

                <div id="spectogram-image-list-Id" >
                  <ImageList sx={{ width: 1150 }} cols={6} rowHeight={164}>
                    {chartData && chartData.length &&  chartData.map((item) => (
                      <ImageListItem key={item}>
                        <ImageListItemBar title={item} position="top" />
                        <img
                          src={getImageUrl(item)}
                          alt={item}
                          loading="lazy"
                          onClick={() =>imageClick(item)}
                          style={{maxWidth: '100%', display:'flex',alignItems:'center',justifyContent:'center'}}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
                <div id="spectrogramId" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
};

export default Spectrogram;
