import React from "react";
import { Carousel } from "antd";
import TestimonyCard from "./TestimonyCard";
import { testimonies } from "./testimony";

import "react-phone-input-2/lib/style.css";
import style from "./RequestDemo.module.scss";
import ContactForm from "./ContactUsForm";

const RequestDemo = () => {
  return (
    <section className={style.fourth__main}>
      <div className={style.fourth__main__wrapper}>
        <ContactForm />
        <div className={style.fourth__main__wrapper_img}>
          <div className={style.testimonyCont}>
            <Carousel autoplay>
              {testimonies.map((item, idx) => (
                <TestimonyCard key={idx} item={item} />
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      <div className={style.mobile__wrapper}>
        <div className={style.mobile__box1}></div>
        <div className={style.mobile__box2}></div>

        <div className={style.mobile__contents}>
          <ContactForm />
          {/* <div className={style.fourth__main__wrapper_form}>
            <div className={style.fourth__main__wrapper_desc}>
              <h5 className={style.fourth__main__wrapper_title}>
                <span className={style.fourth__main__wrapper_title_1}>
                  Ready to go{" "}
                </span>
                <span className={style.fourth__main__wrapper_title_2}>
                  Virtual?
                </span>
              </h5>
              <div className={style.fourth__main__wrapper_subtitle}>
                Let’s help set up your next virtual event to meet your
                organization’s needs.
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={style.form__input_wrap}>
                <div className={style.form__input_inline}>
                  <div className={style.form__input_box}>
                    <label
                      className={style.form__input_label}
                      htmlFor="firstName"
                    >
                      First name(required)
                    </label>
                    <input
                      className={style.form__input}
                      type="text"
                      placeholder="Enter first name..."
                      {...register("firstName")}
                    />
                    <span className={style.validation__error}>
                      {errors.firstName?.message}
                    </span>
                  </div>
                  <div className={style.form__input_box}>
                    <label
                      htmlFor="lastName"
                      className={style.form__input_label}
                    >
                      Last name(required)
                    </label>
                    <input
                      className={style.form__input}
                      type="text"
                      placeholder="Enter last name..."
                      {...register("lastName")}
                    />
                    <span className={style.validation__error}>
                      {errors.lastName?.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <div className={style.form__input_box}>
                  <label
                    htmlFor="firstName"
                    className={style.form__input_label}
                  >
                    Company Email(required)
                  </label>
                  <input
                    className={style.form__input}
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <span className={style.validation__error}>
                    {errors.email?.message}
                  </span>
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <label htmlFor="firstName" className={style.form__input_label}>
                  Phone number(required)
                </label>
                <PhoneInput
                  country={"us"}
                  enableSearch
                  onChange={phoneHandler}
                  inputStyle={{ width: "100%" }}
                  value={phone}
                />
              </div>
              <div className={style.form__input_wrap}>
                <button
                  type="submit"
                  className={style.form__input_submit_request}
                >
                  {loading ? (
                    <Spin size="large" color="#fff" />
                  ) : (
                    "Send Request"
                  )}
                </button>
                {successResponse && (
                  <Alert
                    message={successResponse.message}
                    type={successResponse.type}
                    showIcon
                    closable
                    onClose={() => setSuccessResponse()}
                  />
                )}
              </div>
            </form>
            <div className={style.testimonyCont}>
              <Carousel autoplay>
                {testimonies.map((item, idx) => (
                  <TestimonyCard key={idx} item={item} />
                ))}
              </Carousel>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default RequestDemo;
