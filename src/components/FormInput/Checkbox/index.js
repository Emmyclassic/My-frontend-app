import { Checkbox } from "antd";
import React from "react";
import style from "./index.module.scss";

const SettingsCheckbox = ({
  settingPicker,
  title,
  description,
  name,
  checked,
}) => {
  return (
    <div className={style.form__input_wrap}>
      <div className={style.form__input_box}>
        <label htmlFor={name} className={style.form__input_label}>
          <Checkbox
            onChange={settingPicker}
            name={name}
            defaultChecked={checked}
          >
            <div className={style.form__label_text}>
              <div className={style.form__label_title}>{title}</div>
              <p className={style.form__label_content}>{description}</p>
            </div>
          </Checkbox>
        </label>
        {/* <label htmlFor={name} className={style.form__input_label}>
          <input
            className={`${style.form__input} ${style.form__input_setting}`}
            type="checkbox"
            onChange={settingPicker}
            name={name}
          />
          <div className={style.form__label_text}>
            <div className={style.form__label_title}>{title}</div>
            <p className={style.form__label_content}>{description}</p>
          </div>
        </label> */}
      </div>
    </div>
  );
};

export default SettingsCheckbox;
