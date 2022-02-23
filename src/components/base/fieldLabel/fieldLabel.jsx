import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './FieldLabel.scss';

function FieldLabel({ id, label, name }) {
  const { t } = useTranslation();

  const outputLabel = t(label);

  return (
    <>
      {outputLabel && (
        <label htmlFor={name} id={id}>
          {outputLabel}
        </label>
      )}
      {!outputLabel}
    </>
  );
}

FieldLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
};
FieldLabel.defaultProps = { label: '', name: '' };

export default FieldLabel;
