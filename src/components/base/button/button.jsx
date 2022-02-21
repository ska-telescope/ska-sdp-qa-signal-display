/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import './button.scss';

function Button({ className, disabled, id, label, onClick }) {
  const { t } = useTranslation();

  return (
    <button className={className} disabled={disabled} id={id} onClick={onClick} type="button">
      {label && <span>{t(label)}</span>}
    </button>
  );
}

export default Button;
