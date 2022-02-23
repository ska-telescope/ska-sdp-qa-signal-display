import React from 'react';
import PropTypes from 'prop-types';
import './TextEntry.scss';
import FieldLabel from '../FieldLabel/FieldLabel';

function TextEntry({ id, encrypt, label, name, onChange, value }) {
  const inputType = encrypt ? 'password' : 'text';
  const fieldId = `${id}Label`;

  const onChangeHandler = (event) => {
    const newEvent = {
      target: {
        name,
        type: 'select',
        value: event.target.value,
      },
    };
    onChange(newEvent);
  };

  return (
    <>
      <FieldLabel id={fieldId} label={label} name={id} />
      <input id={id} type={inputType} value={value} onChange={onChangeHandler} />
    </>
  );
}

TextEntry.propTypes = {
  id: PropTypes.string.isRequired,
  encrypt: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

TextEntry.defaultProps = { encrypt: false, label: '', name: '', onChange: null, value: null };

export default TextEntry;
