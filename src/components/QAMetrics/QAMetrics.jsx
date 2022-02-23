/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import './QAMetrics.scss';
import Header from '../Header/Header';
import SideMenu from '../SideMenu/SideMenu';
import PhaseDisplay from './PhaseDisplay/PhaseDisplay';
import RFIDisplay from './RFIDisplay/RFIDisplay';
import SpectrumPlot from './SpectrumPlot/SpectrumPlot';
import TableDisplay from './TableDisplay/TableDisplay';

function QAMetrics({ id }) {
  return (
    <div id={id}>
      <Header id="headerId" className="header" />
      <SideMenu />
      <div className="container-fluid pageContainer">
        <div className="row">
          <div className="metricContainer col">
            <SpectrumPlot id="spectrumPlotId" />
          </div>
          <div className="metricContainer col">
            <PhaseDisplay id="phaseDisplayId" />
          </div>
          <div className="metricContainer col">
            <TableDisplay id="TableDisplayId" />
          </div>
          <div className="metricContainer col">
            <RFIDisplay id="RfiDisplayId" />
          </div>
        </div>
      </div>
    </div>
  );
}

QAMetrics.propTypes = {
  id: PropTypes.string.isRequired,
};

export default QAMetrics;
