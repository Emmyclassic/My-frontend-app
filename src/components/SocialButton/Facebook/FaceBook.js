import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { TiSocialFacebook } from "react-icons/ti";
import SocialButton from "../SocialButton";
import style from "./Facebook.module.scss";

const FaceBookSocialLogin = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <FacebookLogin
      appId="174050404666164"
      callback={responseFacebook}
      cssClass={style.form__social_media}
      render={(renderProps) => <FacebookButton onClick={renderProps.onClick} />}
    />
  );
};

export const FacebookButton = ({ onClick }) => {
  return (
    <SocialButton
      onClick={onClick}
      socialName="Facebook"
      socialIcon={<TiSocialFacebook color="#175FFF" size="30" />}
    />
  );
};

export default FaceBookSocialLogin;
