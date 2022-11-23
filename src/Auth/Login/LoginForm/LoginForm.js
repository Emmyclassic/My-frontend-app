import { yupResolver } from "@hookform/resolvers/yup";
import { Spin } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../../api/authHandler";
import resolver from "../../../utils/promiseWrapper";
import { globalStorage } from "../../../utils/axios";
import ReCAPTCHA from "react-google-recaptcha";
import { loginSchema } from "../../../utils/Validation/AuthValidation";
import AlertResponse from "../../AuthModalForm/AlertResponse";
import style from "./LoginForm.module.scss";
import { GOOGLE_RECAPTCHA_SITE_KEY } from "../../../constants";
const LoginFormComp = ({ toggleLogin, toggleFPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const [attempts, setAttempts] = useState(3);
  const [reCaptcha, setReCaptcha] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginHandler = async (payload) => {
    setLoading(true);
    const [result, error] = await resolver(login(payload));
    if (result) {
      globalStorage.store("data", result.data.data.access_token);
      setLoading(false);
      setResponse({ data: "Login Successfully", status: "success" });
      history.push("/dashboard");
    } else {
      setLoading(false);
      setAttempts(attempts - 1);
      if (attempts === 1) {
        toggleForgotPassword();
      }

      if (error.response && error.response.data) {
        error.response.data = {
          ...error.response.data,
          errors: { password: ["Invalid Login Attempt"] },
        };
      }
      const err = error.response?.data ?? error.toJSON().message;
      setResponse({ data: err, status: "fail" });
    }
  };

  const onSubmit = (data) => {
    loginHandler({
      email: data.email,
      password: data.password,
      grantType: "password",
    });
  };
  const history = useHistory();

  const onClose = () => setResponse();

  const formToggle = () => {
    toggleLogin();
    // toggleSignup();
    history.push("/ContactUs");
  };

  const toggleForgotPassword = () => {
    toggleLogin();
    toggleFPassword();
    setAttempts(3);
  };

  const handleReCAPTCHA = (val) => {
    console.log(val, "capcha");
    setReCaptcha(true);
  };

  return (
    <section className={style.form__container}>
      <div className={style.blur_block}></div>
      <div className={style.form__wrapper}>
        <div className={style.header_form}>
          <h4 className={style.form__signup_header}>Welcome back!</h4>
          <div className={style.form__signup_subtitle}>
            {"Don't have an account? "}
            <Link to="#" className={style.navLink} onClick={formToggle}>
              Contact Us
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <label htmlFor="firstName" className={style.form__input_label}>
                Email (required)
              </label>
              <input
                className={style.form__input}
                type="email"
                placeholder="Email"
                {...register("email")}
              />
            </div>
            <span className={style.validation__error}>
              {errors.email?.message}
            </span>
          </div>
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <label htmlFor="firstName" className={style.form__input_label}>
                Password (required)
              </label>
              <div className={style.passwordWrap}>
                <input
                  className={style.form__input}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                {showPassword ? (
                  <span
                    className={style.eyeBox}
                    onClick={() => setShowPassword(false)}
                  >
                    <AiFillEye size={18} />
                  </span>
                ) : (
                  <span
                    className={style.eyeBox}
                    onClick={() => setShowPassword(true)}
                  >
                    <AiFillEyeInvisible size={18} />
                  </span>
                )}
              </div>
            </div>
            <span className={style.validation__error}>
              {errors.password?.message}
            </span>
          </div>
          <ReCAPTCHA
            sitekey={GOOGLE_RECAPTCHA_SITE_KEY}
            onChange={handleReCAPTCHA}
          />
          <div className={style.form__forget_password_box}>
            {attempts < 3 && (
              <p>
                {attempts} {attempts === 1 ? "attempt" : "attempts"} remaining
              </p>
            )}

            <Link
              to="#"
              onClick={toggleForgotPassword}
              className={style.form_forget_password}
            >
              Forgot your password?
            </Link>
          </div>
          <div className={style.form__input_wrap}>
            <button
              type="submit"
              disabled={!reCaptcha || loading}
              className={style.form__input_submit_request}
            >
              {loading ? <Spin size="large" color="#fff" /> : "Login  "}
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
        {/* <div className={style.form_options}>or continue with</div> */}
        {/* <div className={`${style.blur_block_green}`}></div> */}
        {/* <div className={style.form__social_media}>
          <FaceBookSocialLogin />
          <GoogleSocialLogin />
        </div> */}
      </div>
    </section>
  );
};

const LoginForm = React.memo(LoginFormComp);

export default LoginForm;
