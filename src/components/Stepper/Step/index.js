import classNames from "classnames";
import React from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import "./index.scss";

const Step = (props) => {
  const { title, onStepClick, stepIndex, onClick, active, status, icon } =
    props;

  const handleClick = (...args) => {
    if (onClick) {
      onClick(...args);
    }

    console.log("args", args);

    onStepClick(stepIndex);
  };
  const classString = classNames(
    "steps-item-container",
    `steps-item-container-${status}`,
    {
      [`steps-item-container-active`]: active,
    }
  );

  const iconClassString = classNames("steps-item-icon", {
    [`steps-item-icon-${status}`]: status === "finish",
    [`steps-item-icon-${status}`]: status === "wait",
  });
  return (
    <div className={classString} onClick={handleClick}>
      <div className={iconClassString}>
        <RiCheckboxCircleFill color="#09974D" size={18} />
      </div>
      <div className="step-item-list">
        <span className="step-item-icon-box">{icon}</span>
        <span className="step-item-title">{title}</span>
      </div>
    </div>
  );
};

export default Step;
