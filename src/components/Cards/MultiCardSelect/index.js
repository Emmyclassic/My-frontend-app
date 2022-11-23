import classNames from "classnames";
import React, { Children, cloneElement, useEffect, useState } from "react";
import "./index.scss";

const MultiCardSelect = ({
  children,
  onChange,
  customClass,
  ontoggle,
  type = "checkbox",
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleSelected = (child, isSelected) => {
    if (onChange) {
      onChange(child.item, isSelected);
    }
  };
  const handleToggle = (value) => {
    setIsSelected();
  };
  const classString = classNames(`attendContainer`, customClass);
  useEffect(() => {
    console.log("miy", isSelected);
  }, [isSelected]);
  return (
    <div className={classString}>
      {Children.toArray(children).map((child) => {
        const composedChildProps = {
          onStepClick: (isSelected) => handleSelected(child.props, isSelected),
          onStepToggle: () => handleToggle(),
          isSelected,
          type,
          ...child.props,
        };
        return cloneElement(child, composedChildProps);
      })}
    </div>
  );
};

export const Card = ({
  prefixCls = "card-item",
  item,
  onStepClick,
  icon,
  cardStyle,
  customClass,
  onStepToggle,
  type,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const classString = classNames(`${prefixCls}`, customClass, {
    [`${prefixCls}_selected`]: type === "checkbox" && isSelected,
  });

  const selectHandle = () => {
    if (type === "checkbox") {
      setIsSelected((prev) => !prev);
    } else {
      onStepToggle();
    }
  };

  useEffect(() => {
    onStepClick(isSelected);
  }, [isSelected]);

  return (
    <div
      className={classString}
      onClick={selectHandle}
      style={{ ...cardStyle }}
    >
      {icon && (
        <span className={`${prefixCls}_item_icon}`}>
          <icon.name size={icon.size} />
        </span>
      )}
      <span className={`${prefixCls}_item_title`}>{item.title}</span>
    </div>
  );
};

export default MultiCardSelect;
