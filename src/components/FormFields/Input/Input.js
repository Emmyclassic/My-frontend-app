import React from "react";
import proTypes from "prop-types";
import className from "classnames";

import style from "./Input.module.scss";

const Input = (props) => {
  const classNames = className(style.meeting__input, props.customStyle);

  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className={`btn_meeting ${classNames}`}
      onChange={props.onChange}
      // style={props.customStyle}
    />
  );
};
Input.defaultProps = {
  type: "text",
  placeholder: "Enter meeting code",
  onChange: () => {},
};

Input.proTypes = {
  type: proTypes.string,
  onChange: proTypes.func,
};

export default Input;
