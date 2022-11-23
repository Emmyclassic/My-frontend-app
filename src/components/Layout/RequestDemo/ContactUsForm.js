import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spin, Alert } from "antd";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { contactUsSchema } from "../../../utils/Validation/contactUsSchema";
import "react-phone-input-2/lib/style.css";
import style from "./RequestDemo.module.scss";
import { contactUsHandler } from "../../../api/smsHandler";

const ContactForm = () => {
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactUsSchema),
  });

  const phoneHandler = (data) => {
    setPhone(data);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: phone,
      };

      await contactUsHandler(payload);
      reset({ firstName: "", lastName: "", email: "" });
      setPhone();
      setSuccessResponse({
        message: "Request sent successfully",
        type: "success",
      });
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successResponse) {
      setTimeout(() => setSuccessResponse(false), 600);
    }
  }, [successResponse]);
  return (
    <div className={style.fourth__main__wrapper_form}>
      <div className={style.fourth__main__wrapper_desc}>
        <h5 className={style.fourth__main__wrapper_title}>
          <span className={style.fourth__main__wrapper_title_1}>
            Ready to go{" "}
          </span>
          <span className={style.fourth__main__wrapper_title_2}>Virtual?</span>
        </h5>
        <div className={style.fourth__main__wrapper_subtitle}>
          Let’s help set up your next virtual event to meet your organization’s
          needs.
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_inline}>
            <div className={style.form__input_box}>
              <label className={style.form__input_label} htmlFor="firstName">
                First name <span style={{ color: "#ef3125" }}>*</span>
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
              <label htmlFor="lastName" className={style.form__input_label}>
                Last name<span style={{ color: "#ef3125" }}>*</span>
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
            <label htmlFor="firstName" className={style.form__input_label}>
              Company Email<span style={{ color: "#ef3125" }}>*</span>
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
            Phone number<span style={{ color: "#ef3125" }}>*</span>
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
          <button type="submit" className={style.form__input_submit_request}>
            {loading ? <Spin size="large" color="#fff" /> : "Send Request"}
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
    </div>
  );
};

export default ContactForm;
