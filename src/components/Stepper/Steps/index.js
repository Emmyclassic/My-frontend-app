import React, { Children, cloneElement } from "react";
import "./index.scss";

const Steps = ({
  children,
  initial = 0,
  current = 0,
  status = "process",
  onChange,
  nextStep,
  backStep,
  currentHandler,
}) => {
  const onStepClick = (next) => {
    if (onChange && current !== next) {
      //  onChange(next);
      console.log("next val", next, status);
      if (next < current) {
        // currentHandler(next);
        onChange(next);
      }
    }
  };
  return (
    <div className="stepContainer">
      {Children.toArray(children).map((child, index) => {
        const stepNumber = initial + index;
        const composedChildProps = {
          stepNumber: `${stepNumber + 1}`,
          stepIndex: stepNumber,
          key: stepNumber,
          onStepClick: onChange && onStepClick,
          ...child.props,
        };
        if (!child.props.status) {
          if (stepNumber === current) {
            composedChildProps.status = "process";
          } else if (stepNumber < current) {
            composedChildProps.status = "finish";
          } else {
            composedChildProps.status = "wait";
          }
        }
        composedChildProps.active = stepNumber === current;
        return cloneElement(child, composedChildProps);
      })}
    </div>
  );
};
Steps.defaultProps = {
  initial: 0,
  current: 0,
  status: "process",
  type: "default",
};
export default Steps;
