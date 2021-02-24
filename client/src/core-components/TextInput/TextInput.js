import React from "react";
import PropTypes from "prop-types";

import './TextInput.css'

const TextInput = ({ name, placeholder, value, onChange, errors, label, id, defaultValue, onKeyPress }) => {

  return (
    <div className="textinput">
      {label && (<label htmlFor={id} className="textinput__label">{label}</label>)}
      <input
        className="textinput__input-text"
        name={name}
        defaultValue={defaultValue}
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      {errors.message && <span className="textinput__error">{errors.message}</span>}
    </div>
  );
};

export default TextInput;

TextInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func
};

TextInput.defaultProps = {
  errors: {}
};
