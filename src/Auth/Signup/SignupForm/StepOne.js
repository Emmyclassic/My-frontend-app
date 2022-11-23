import React from "react";
import { Link } from "react-router-dom";
import { FcBusinessman, FcBriefcase } from "react-icons/fc";

import style from "./StepOne.module.scss";

const StepOne = ({ toggleSignupType }) => {
  return (
    <section className={style.form__container}>
      <div className={style.blur_block}></div>
      <div className={style.form__wrapper}>
        <div className={style.header_form}>
          <h4 className={style.form__signup_event_header}>Join for free</h4>
          <p className={style.form__signup_event_para}>
            Join for free as an individual or a Business and start getting the
            best of APEMS
          </p>
          <div className={style.form__signup_type}>
            <div
              className={style.form__signup_type_indvd}
              onClick={() => toggleSignupType("individual", true)}
            >
              <div className={style.icon__box__container}>
                <span className={style.icon__box}>
                  <FcBusinessman size="60" />
                </span>
              </div>
              <div className={style.form__detail}>
                <div className={style.account__type}>A Personal Account</div>
                <div className={style.account__type_desc}>
                  Create a personal account on APEMS
                </div>
              </div>
            </div>
            <div
              className={style.form__signup_type_business}
              onClick={() => toggleSignupType("business", true)}
            >
              <div className={style.icon__box__container}>
                <span className={style.icon__box}>
                  <FcBriefcase size="60" />
                </span>
              </div>
              <div className={style.form__detail}>
                <div className={style.account__type}>A Business Account</div>
                <div className={style.account__type_desc}>
                  Create a personal account on APEMS
                </div>
              </div>
            </div>
          </div>
          <div className={`${style.blur_block_green}`}></div>
          <div className={style.form__signup_subtitle}>
            Already have an account?{" "}
            <Link to="#" className={style.navLink}>
              Sign In
            </Link>
          </div>
          {/* <div className={`${style.blur_block_green}`}></div> */}
        </div>
      </div>
    </section>
  );
};

export default StepOne;
