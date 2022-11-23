import React from "react";
import GoogleLogin from "react-google-login";
import { FaGoogle } from "react-icons/fa";
import SocialButton from "../SocialButton";
import style from "./Google.module.scss";

const GoogleSocialLogin = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <GoogleLogin
      clientId="872232631932-8vvdbc9eek405pc249cfkv1n7i48treb.apps.googleusercontent.com"
      render={(renderProps) => (
        <GoogleButton
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        />
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export const GoogleButton = ({ onClick }) => {
  return (
    <SocialButton
      onClick={onClick}
      socialName="Google"
      customClass={[style.social_btn_bg]}
      socialIcon={<FaGoogle color="#DA3A25" size="30" />}
    />
  );
};

export default GoogleSocialLogin;
