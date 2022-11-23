import React from "react";
import cx from "classnames";
import propTypes from "prop-types";

import style from "./SocialButton.module.scss";

const SocialButton = ({ onClick, socialIcon, socialName, customClass }) => {
  const className = cx(style.social_btn, customClass);
  return (
    <button className={className} onClick={onClick}>
      <span className={style.social_icon}>{socialIcon}</span>
      <span className={style.social_name}>{socialName}</span>
    </button>
  );
};

SocialButton.propTypes = {
  onClick: propTypes.func,
  socialIcon: propTypes.node.isRequired,
  socialName: propTypes.string,
  customClass: propTypes.array,
};

export default SocialButton;
