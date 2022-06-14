import { theme } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Spectrogram from "../spectrogram/spectrogram";
import SpectrumPlot from "../spectrumPlot/spectrumPlot";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SpectrumPlot />
      <Spectrogram />
    </ThemeProvider>
  );
}

export default App;
