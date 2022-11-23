import { Checkbox } from "antd";
import React from "react";
import style from "./index.module.scss";

const RegisterEvent = ({ readonly = true }) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={submitHandler}>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_inline}>
          <div className={style.form__input_box}>
            <label className={style.form__input_label} htmlFor="firstName">
              First Name
              <span style={{ color: "#ef3125", marginLeft: ".5px" }}>
                &nbsp; *
              </span>
            </label>
            <div className={style.input__date}>
              <input
                className={`${style.form__input} ${style.form__input_date}`}
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                readOnly={readonly}
              />
            </div>
          </div>
          <div className={style.form__input_box}>
            <label htmlFor="endDate" className={style.form__input_label}>
              Last Name <span style={{ color: "#ef3125" }}> &nbsp; *</span>
            </label>
            <div className={style.input__date}>
              <input
                className={`${style.form__input} ${style.form__input_date}`}
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                readOnly={readonly}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="question" className={style.form__input_label}>
            Email Address
            <span style={{ color: "#EF3125", marginLeft: ".5rem" }}>
              &nbsp; *
            </span>
          </label>
          <input
            className={style.form__input}
            type="email"
            placeholder="Enter your email address"
            name="question"
            readOnly={readonly}
          />
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="question" className={style.form__input_label}>
            Phone Number
            <span style={{ color: "#EF3125", marginLeft: ".5rem" }}>
              &nbsp; *
            </span>
          </label>
          <input
            className={style.form__input}
            type="number"
            placeholder="Enter your phone number"
            name="question"
            min={10}
            readOnly={readonly}
            max={13}
          />
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="question" className={style.form__input_label}>
            Company
            <span style={{ color: "#EF3125", marginLeft: ".5rem" }}>
              &nbsp; *
            </span>
          </label>
          <input
            className={style.form__input}
            type="text"
            placeholder="Enter Company name"
            name="question"
            readOnly={readonly}
          />
        </div>
      </div>

      <div className={style.form__input_wrap}>
        <div className={style.form__input_inline}>
          <div className={style.form__input_box}>
            <label className={style.form__input_label} htmlFor="position">
              Postion at Company
            </label>
            <div className={style.input__date}>
              <input
                className={`${style.form__input} ${style.form__input_date}`}
                type="text"
                name="position"
                placeholder="Enter Position"
                readOnly={readonly}
              />
            </div>
          </div>
          <div className={style.form__input_box}>
            <label htmlFor="endDate" className={style.form__input_label}>
              Location
            </label>
            <div className={style.input__date}>
              <input
                className={`${style.form__input} ${style.form__input_date}`}
                type="text"
                name="lastName"
                placeholder="Enter Location"
                readOnly={readonly}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="firstName" className={style.form__input_label}>
            <Checkbox>
              <div className={style.form__label_text}>
                <div className={style.form__label_title}>
                  Subscribe me to next and upcoming events
                </div>
                <p className={style.form__label_content}>
                  You will get notifications to when new and upcoming events
                  related to this event when organised by the event organisers.
                </p>
              </div>
            </Checkbox>
          </label>
        </div>
      </div>
      <button type="submit" disabled={readonly} className="btn-gray">
        {" "}
        Register
      </button>
    </form>
  );
};

export default RegisterEvent;
