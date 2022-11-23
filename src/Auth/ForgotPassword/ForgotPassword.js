import { Spin, Alert } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordHandler } from "../../api/authHandler";
import { forgotPasswordSchema } from "../../utils/Validation/AuthValidation";
import style from "./ForgotPassword.module.scss";

const ForgotPassword = ({ toggleFPassword, toggleResetPassword }) => {
  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await forgotPasswordHandler({ email: data.email });
      reset({ email: "" });
      setLoading(false);
      setSuccessResponse(response.data);
      // toggleFPassword();
      //  toggleResetPassword();
    } catch (err) {
      setLoading(false);
      setErrorResponse(err?.response.data);
      console.log("ereee", err?.response.data);
    }

    // dispatch(
    //   loginAction({
    //     email: data.email,
    //     password: data.password,
    //     grantType: "password",
    //   })
    // );
  };

  useEffect(() => {
    if (successResponse) {
      setTimeout(() => {
        setSuccessResponse();
      }, 2000);
    }
  }, [successResponse]);

  console.log(watch("email")); // watch input value by passing the name of it

  return (
    <section className={style.form__container}>
      <div className={style.blur_block}></div>
      <div className={style.form__wrapper}>
        <div className={style.header_form}>
          <div>
            <h4 className={style.form__signup_header}>Forgot Password</h4>
            <div className={style.form__signup_subtitle}>
              Provide your email to reset your password.
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <label htmlFor="firstName" className={style.form__input_label}>
                Email
              </label>
              <input
                className={style.form__input}
                type="email"
                placeholder="Enter email"
                {...register("email")}
              />
            </div>
            <span className={style.validation__error}>
              {errors.email?.message}
            </span>
          </div>

          <div className={style.form__input_wrap}>
            <button
              type="submit"
              disabled={loading}
              className={style.form__input_submit_request}
            >
              {loading ? <Spin size="large" color="#fff" /> : "Continue"}
            </button>
          </div>
          {successResponse && (
            <Alert
              message={successResponse.message}
              type="success"
              showIcon
              closable
              onClose={() => setSuccessResponse(null)}
            />
          )}
          {errorResponse && (
            <Alert
              message={errorResponse.message}
              type="error"
              showIcon
              closable
              onClose={() => setErrorResponse(null)}
            />
          )}
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
