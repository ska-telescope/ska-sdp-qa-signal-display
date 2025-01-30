export const amplitudeAxisY = ['linear', 'db', 'log'];
export const phaseAxisY = ['radians', 'degrees'];
export const spectrumWaterfallToggle = ['spectrumPlot', 'waterfallPlot'];
export const amplitudeReal = ['real', 'amplitude'];
export const phaseImaginary = ['imaginary', 'phase'];

export const QASettings = {
  showStatisticsDetailed: true,
  showStatisticsReceiver: true,
  //
  showSpectrumPlotXX: true,
  showSpectrumPlotXY: true,
  showSpectrumPlotYX: true,
  showSpectrumPlotYY: true,
  showSpectrumPlotXXaxisY: amplitudeAxisY[2],
  showSpectrumPlotXYaxisY: amplitudeAxisY[2],
  showSpectrumPlotYXaxisY: amplitudeAxisY[2],
  showSpectrumPlotYYaxisY: amplitudeAxisY[2],
  //
  showSpectrumWaterfallPlotXX: spectrumWaterfallToggle[0],
  showSpectrumWaterfallPlotXY: spectrumWaterfallToggle[0],
  showSpectrumWaterfallPlotYX: spectrumWaterfallToggle[0],
  showSpectrumWaterfallPlotYY: spectrumWaterfallToggle[0],
  //
  gridView: true,
  //
  showPolarizationRealXXaxisY: amplitudeReal[1],
  showPolarizationRealXYaxisY: amplitudeReal[1],
  showPolarizationRealYXaxisY: amplitudeReal[1],
  showPolarizationRealYYaxisY: amplitudeReal[1],
  //
  showPolarizationImaginaryXXaxisY: phaseImaginary[1],
  showPolarizationImaginaryXYaxisY: phaseImaginary[1],
  showPolarizationImaginaryYXaxisY: phaseImaginary[1],
  showPolarizationImaginaryYYaxisY: phaseImaginary[1],
  //
  showPolarizationAmplitudeXX: true,
  showPolarizationAmplitudeXY: true,
  showPolarizationAmplitudeYX: true,
  showPolarizationAmplitudeYY: true,
  showPolarizationAmplitudeXXaxisY: amplitudeAxisY[2],
  showPolarizationAmplitudeXYaxisY: amplitudeAxisY[2],
  showPolarizationAmplitudeYXaxisY: amplitudeAxisY[2],
  showPolarizationAmplitudeYYaxisY: amplitudeAxisY[2],
  //
  showPolarizationPhaseXX: true,
  showPolarizationPhaseXY: true,
  showPolarizationPhaseYX: true,
  showPolarizationPhaseYY: true,
  showPolarizationPhaseXXaxisY: phaseAxisY[0],
  showPolarizationPhaseXYaxisY: phaseAxisY[0],
  showPolarizationPhaseYXaxisY: phaseAxisY[0],
  showPolarizationPhaseYYaxisY: phaseAxisY[0],
  //
  showBandAvXCorrXX: true,
  showBandAvXCorrXY: true,
  showBandAvXCorrYX: true,
  showBandAvXCorrYY: true,
  showBandAvXCorrXXaxisY: amplitudeAxisY[1],
  showBandAvXCorrXYaxisY: amplitudeAxisY[1],
  showBandAvXCorrYXaxisY: amplitudeAxisY[1],
  showBandAvXCorrYYaxisY: amplitudeAxisY[1],
  //
  showGainStabilityXX: true,
  showGainStabilityXY: true,
  showGainStabilityYX: true,
  showGainStabilityYY: true,
  //
  showSpectrograms: true,
  //
  showLagPlots: true,
  //
  showPointingOffsets: true,
  gridPointingOffsets: true,

  showcrossElevationOffset: true,
  showelevationOffset: true,
  showcrossElevationFittedWidth: true,
  showelevationFittedWidth: true,
  showfittedHeight: true,

  showcrossElevationOffsetaxisY: amplitudeAxisY[2],
  showelevationOffsetaxisY: amplitudeAxisY[2],
  showcrossElevationFittedWidthaxisY: amplitudeAxisY[2],
  showelevationFittedWidthaxisY: amplitudeAxisY[2],
  showfittedHeightaxisY: amplitudeAxisY[2],

  showGainCalibration: true,

  showGainCalibrationAmplitudeH: true,
  showGainCalibrationAmplitudeV: true,
  showGainCalibrationPhaseH: true,
  showGainCalibrationPhaseV: true,

  showUVCoverage: true,

  showWeightDistributionXX: true,
  showWeightDistributionXY: true,
  showWeightDistributionYX: true,
  showWeightDistributionYY: true
};
