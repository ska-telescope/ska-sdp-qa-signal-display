import React from 'react';
import PropTypes from 'prop-types';
import FieldLabel from '../../base/FieldLabel/FieldLabel';
import Table from '../../base/Table/Table';

function TableDisplay({ id }) {
  return (
    <div id={id}>
      <div className="menuSpacer" />

      <div className="metricsBox">
        <div className="metricsTitle">
          <FieldLabel id="metricsTitleTableDisplay" label="label.tableDisplay" />
        </div>
        <Table id="pdTableId" />
      </div>
    </div>
  );
}

TableDisplay.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TableDisplay;
