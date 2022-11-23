import { yupResolver } from "@hookform/resolvers/yup";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { pageLoaded } from "../../actions/uiAction";
import { loginSchema } from "../../utils/Validation/AuthValidation";
import style from "./ForgotPassword.module.scss";

const ResetPassword = ({ toggleSignup, toggleLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data) => {
    // dispatch(
    //   loginAction({
    //     email: data.email,
    //     password: data.password,
    //     grantType: "password",
    //   })
    // );
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const { status } = useSelector((state) => state.login);

  console.log(watch("password")); // watch input value by passing the name of it
  useEffect(() => {
    dispatch(pageLoaded());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success") {
      history.push("/dashboard");
    }
  }, [status]);

  return (
    <section className={style.form__container}>
      <div className={style.blur_block}></div>
      <div className={style.form__wrapper}>
        <div className={style.header_form}>
          <div>
            <h4 className={style.form__signup_header}>Reset Password</h4>
            <div className={style.form__signup_subtitle}>
              Reset your password with a new password.
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <label htmlFor="firstName" className={style.form__input_label}>
                Password
              </label>
              <div className={style.passwordWrap}>
                <input
                  className={style.form__input}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
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
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <label htmlFor="firstName" className={style.form__input_label}>
                Confirm Password
              </label>
              <div className={style.passwordWrap}>
                <input
                  className={style.form__input}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  {...register("password")}
                />
              </div>
            </div>
            <span className={style.validation__error}>
              {errors.password?.message}
            </span>
          </div>

          <div className={style.form__input_wrap}>
            <button
              type="submit"
              disabled={loading}
              className={style.form__input_submit_request}
            >
              {loading ? <Spin size="large" color="#fff" /> : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
