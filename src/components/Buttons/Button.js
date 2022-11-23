import classNames from "classnames";
import React from "react";
import proTypes from "prop-types";

import style from "./Button.module.scss";
const Button = ({ children, handleClick, customStyle }) => {
  const className = classNames(customStyle, style.meeting__btn);
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

Button.proTypes = {
  children: proTypes.node.isRequired,
  handleClick: proTypes.func,
  type: proTypes.string,
};

export default Button;
