/* eslint-disable react/prop-types */
import React from 'react';
import './textEntry.scss';
import FieldLabel from '../fieldLabel/fieldLabel';

const TextEntry = ({ id, encrypt, label, name, onChange, value }) => {
  const inputType = encrypt ? 'password' : 'text';

  const onChangeHandler = event => {
    const newEvent = {
      target: {
        name,
        type: 'select',
        value: event.target.value
      }
    };
    onChange(newEvent);
  };

  return (
    <>
      <FieldLabel label={label} name={id} />
      <input id={id} type={inputType} value={value} onChange={onChangeHandler} />
    </>
  );
};

export default TextEntry;
