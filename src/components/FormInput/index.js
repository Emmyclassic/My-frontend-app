import React from "react";
import style from "./index.module.scss";
import LabelText from "./LabelText";

const FormInput = ({
  labelTitle,
  inputType,
  placeholder,
  errors,
  isRequired,
  rows,
  isTextArea,
  watch,
  register,
  showCount,
  pattern,
  ...otherProps
}) => {
  return (
    <div className={style.form__input_wrap}>
      <div className={style.form__input_box}>
        <LabelText
          isRequired={isRequired}
          labelTitle={labelTitle}
          forName={labelTitle}
          hasError={errors && errors[`${otherProps?.name}`]}
        />

        {isTextArea ? (
          <textarea
            {...register}
            {...otherProps}
            className={style.form__input}
            type={inputType}
            rows={rows}
            placeholder={placeholder}
          />
        ) : (
          <input
            {...register}
            {...otherProps}
            className={style.form__input}
            type={inputType}
            placeholder={placeholder}
          />
        )}
        {showCount && (
          <span className={style.inputCount}>
            {watch(otherProps.name)?.length ?? 0}/ {otherProps.maxLength}
          </span>
        )}
      </div>
      <span className={style.validation__error}>
        {errors && errors[`${otherProps?.name}`]?.message}
      </span>
    </div>
  );
};

export default FormInput;
