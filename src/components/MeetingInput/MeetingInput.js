import classNames from "classnames";
import React from "react";
import style from "./MeetingInput.module.scss";

const MeetingInput = ({ children, customStyle }) => {
  const className = classNames(style.meeting__box, customStyle);
  return <div className={className}>{children}</div>;
};

export default MeetingInput;
