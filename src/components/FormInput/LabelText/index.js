import React from "react";
import style from "./index.module.scss";

const LabelText = ({
  forName,
  labelTitle,
  isRequired = true,
  isRequiredColor = "#ef3125",
  hasError = false,
}) => {
  return (
    <label htmlFor={forName} className={style.form__input_label}>
      {labelTitle} &nbsp;
      {isRequired && (
        <span style={{ color: hasError ? isRequiredColor : "#8d8d8d" }}>*</span>
      )}
    </label>
  );
};

export default LabelText;
