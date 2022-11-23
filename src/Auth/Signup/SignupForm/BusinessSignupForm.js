import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { regBusinessSchema } from "../../../utils/Validation/AuthValidation";
import AlertResponse from "../../AuthModalForm/AlertResponse";
import { pageLoaded } from "../../../actions/uiAction";
import { registerUser } from "../../../api/authHandler";
import resolver from "../../../utils/promiseWrapper";

import style from "./SignupForm.module.scss";

const BusinessSignupForm = ({ closeModal, toggleLogin }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(regBusinessSchema),
  });

  const signupHandler = async (payload) => {
    setLoading(true);
    const [result, error] = await resolver(registerUser(payload));
    setLoading(false);
    if (result) {
      setResponse({ data: "Login Successfully", status: "success" });
    } else {
      const err = error.response?.data ?? error.toJSON().message;
      setResponse({ data: err, status: "fail" });
    }
  };
  const onSubmit = (data) => {
    signupHandler({
      name: data.companyName,
      email: data.email,
      password: data.password,

      password_confirmation: data.confirmPassword,
      user_type: "company",
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
            Create a business account on APEMS
          </h4>
          <div className={style.form__signup_subtitle}>
            Already have an account?{" "}
            <Link to="#" className={style.navLink} onClick={formToggle}>
              Sign In
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <label htmlFor="companyName" className={style.form__input_label}>
                Company name (required)
              </label>
              <input
                className={style.form__input}
                type="text"
                placeholder="Enter company name"
                name="companyName"
                {...register("companyName")}
              />
              <span className={style.validation__error}>
                {errors.companyName?.message}
              </span>
            </div>
          </div>
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <label htmlFor="email" className={style.form__input_label}>
                Email (required)
              </label>
              <input
                className={style.form__input}
                type="email"
                placeholder="Enter email"
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
              className={style.form__input_submit_request}
              disabled={loading}
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
        <div className={`${style.blur_block_green}`}></div>
      </div>
    </section>
  );
};

export default BusinessSignupForm;
