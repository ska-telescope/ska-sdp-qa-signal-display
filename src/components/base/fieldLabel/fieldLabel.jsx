/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { useTranslation } from 'react-i18next';
import './fieldLabel.scss';

// eslint-disable-next-line react/prop-types
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

export default FieldLabel;
