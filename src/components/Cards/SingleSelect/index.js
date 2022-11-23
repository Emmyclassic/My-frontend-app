import React, { useState } from "react";
import style from "./index.module.scss";

const SingleSelect = ({
  firstLabel = "Paid",
  secondLabel = "Free",
  handleSelect,
  preSelect,
  clickAble = true,
}) => {
  const [active, setActive] = useState(preSelect);
  // const [clickAble] = useState(true);
  const handleChange = (tab) => {
    setActive(tab);
    handleSelect(tab);
  };
  return (
    <div className={style.container}>
      <div
        className={
          active === firstLabel
            ? `${style.box} ${style.active_box} ${style.border_first}`
            : `${style.box}`
        }
        onClick={() => {
          if (clickAble) {
            handleChange(firstLabel);
          }
        }}
      >
        {firstLabel}
      </div>
      <div
        className={
          active === secondLabel
            ? `${style.box} ${style.active_box} ${style.border_second}`
            : `${style.box}`
        }
        onClick={() => {
          if (clickAble) {
            handleChange(secondLabel);
          }
        }}
      >
        {secondLabel}
      </div>
    </div>
  );
};

export default SingleSelect;
