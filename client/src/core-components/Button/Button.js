import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = ({ children, variant, handleFunc }) => {
  return <div className={`Button Button__${variant}`} onClick={handleFunc}>{children}</div>;
};

export default Button;

Button.propTypes = {
  variant: PropTypes.string,
  handleFunc: PropTypes.func
};

Button.defaultProps = {
  variant: "default",
};
