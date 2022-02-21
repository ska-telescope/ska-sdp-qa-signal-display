/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './QAMetrics.scss';
import Header from '../Header/Header';
import SideMenu from '../SideMenu/SideMenu';
import PhaseDisplay from './PhaseDisplay/PhaseDisplay';
import SpectrumPlot from './SpectrumPlot/SpectrumPlot';

function QAMetrics() {
  return (
    <div>
      <Header className="header" />
      <SideMenu />
      <div className="pageContainer">
        <div className="metricContainer">
          <SpectrumPlot />
        </div>
        <div className="metricContainer">
          <PhaseDisplay />
        </div>
      </div>
    </div>
  );
}

export default QAMetrics;
