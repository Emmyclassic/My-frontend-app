import React from "react";
import style from "./index.module.scss";

const IconButton = ({
  iconTitle = "Edit",
  handleClick,
  leftIcon,
  rightIcon,
  containerStyle,
  btnTextStyle,
}) => {
  const classString = `${style.container} ${containerStyle}`;
  const btnTextString = `${style.container_text} ${btnTextStyle}`;
  return (
    <div className={classString} onClick={handleClick && handleClick}>
      {leftIcon && <span className={style.container_icon}>{leftIcon}</span>}

      <span className={btnTextString}>{iconTitle}</span>
      {rightIcon && <span className={style.container_icon}>{rightIcon}</span>}
    </div>
  );
};

export default IconButton;
