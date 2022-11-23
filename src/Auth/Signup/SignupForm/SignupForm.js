import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { regSchema } from "../../../utils/Validation/AuthValidation";

import style from "./SignupForm.module.scss";
import FaceBookSocialLogin from "../../../components/SocialButton/Facebook/FaceBook";
import GoogleSocialLogin from "../../../components/SocialButton/Google/Google";
import AlertResponse from "../../AuthModalForm/AlertResponse";

import { pageLoaded } from "../../../actions/uiAction";
import resolver from "../../../utils/promiseWrapper";
import { registerUser } from "../../../api/authHandler";

const SignupForm = ({ toggleLogin, closeModal }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const formRef = useRef();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(regSchema),
  });

  const signupHandler = async (payload) => {
    setLoading(true);
    const [result, error] = await resolver(registerUser(payload));
    setLoading(false);
    if (result) {
      setResponse({ data: "Registered Successfully", status: "success" });
    } else {
      const err = error.response?.data ?? error.toJSON().message;
      setResponse({ data: err, status: "fail" });
    }
  };

  const onSubmit = (data) => {
    signupHandler({
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      email: data.email,
      password_confirmation: data.confirmPassword,
      user_type: "personal",
    });
  };

  useEffect(() => {
    dispatch(pageLoaded());
  }, [dispatch]);

  const onClose = () => setResponse();

  const formToggle = () => {
    closeModal();
    toggleLogin();
  };

  return (
    <section className={style.form__container}>
      <div className={style.blur_block}></div>
      <div className={style.form__wrapper}>
        <div className={style.header_form}>
          <h4 className={style.form__signup_header}>
            Create a free Personal account
          </h4>
          <div className={style.form__signup_subtitle}>
            Already have an account?{" "}
            <Link to="#" className={style.navLink} onClick={formToggle}>
              Sign In
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <div className={style.form__input_wrap}>
            <div className={style.form__input_inline}>
              <div className={style.form__input_box}>
                <label className={style.form__input_label} htmlFor="firstName">
                  First name (required)
                </label>
                <input
                  className={style.form__input}
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  {...register("firstName")}
                />
                <span className={style.validation__error}>
                  {errors.firstName?.message}
                </span>
              </div>
              <div className={style.form__input_box}>
                <label htmlFor="firstName" className={style.form__input_label}>
                  Last name (required)
                </label>
                <input
                  className={style.form__input}
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
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
                Email (required)
              </label>
              <input
                className={style.form__input}
                type="email"
                placeholder="Email"
                name="email"
                {...register("email")}
              />
              <span className={style.validation__error}>
                {errors.email?.message}
              </span>
            </div>
          </div>
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <label htmlFor="firstName" className={style.form__input_label}>
                Password (required)
              </label>
              <input
                className={style.form__input}
                type="password"
                placeholder="Password"
                name="password"
                {...register("password")}
              />
              <span className={style.validation__error}>
                {errors.password?.message}
              </span>
            </div>
          </div>
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <label htmlFor="firstName" className={style.form__input_label}>
                Confirm Password (required)
              </label>
              <input
                className={style.form__input}
                type="password"
                placeholder="Confirm Password"
                name="password"
                {...register("confirmPassword")}
              />
              <span className={style.validation__error}>
                {errors.confirmPassword?.message}
              </span>
            </div>
          </div>
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <label htmlFor="firstName" className={style.form__input_label}>
                <input
                  className={style.form__input}
                  type="checkbox"
                  {...register("agreeTerms")}
                />
                <span className={style.form__label_text}>
                  {"I've read and agree to the "}
                  <Link className={[style.signup_term]} to="#">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className={[style.signup_privacy]}>
                    privacy policy
                  </Link>
                </span>
              </label>
              <span className={style.validation__error}>
                {errors.agreeTerms?.message}
              </span>
            </div>
          </div>
          <div className={style.form__input_wrap}>
            <button
              type="submit"
              disabled={loading}
              className={style.form__input_submit_request}
            >
              {loading ? (
                <Spin size="large" color="#fff" />
              ) : (
                "Create an account"
              )}
            </button>
          </div>
          {response && (
            <AlertResponse
              status={response.status}
              data={response.data}
              onClose={onClose}
            />
          )}
        </form>

        <div className={style.form_options}>or continue with</div>
        <div className={`${style.blur_block_green}`}></div>
        <div className={style.form__social_media}>
          <FaceBookSocialLogin />
          <GoogleSocialLogin />
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
