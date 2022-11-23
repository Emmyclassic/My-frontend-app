import React, { useState } from "react";
// import NavHeader from "../../components/Layout/PricingNavHeader/NavHeader";
import AuthModal from "../../components/CustomModals/AuthModal/AuthModal";
import LoginForm from "../Login/LoginForm/LoginForm";
import StepOne from "../Signup/SignupForm/StepOne";
import IndividualSignup from "../Signup/SignupForm/SignupForm";
import BusinessSignupForm from "../Signup/SignupForm/BusinessSignupForm";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ForgotPassword/ResetPassword";

const AuthModalForm = ({ component: Component, navMenuBlack }) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupTypeVisible, setSignupTypeVisible] = useState(false);
  const [individualSignupType, setIndividualSignupType] = useState(false);
  const [bizSignupType, setBizSignupType] = useState(false);
  const [fpassword, setFpassword] = useState(false);
  const [rpassword, setRpassword] = useState(false);

  const signupType = {
    individual: (status) => {
      setSignupTypeVisible(false);
      setTimeout(() => setIndividualSignupType(status), 500);
    },
    business: (status) => {
      setSignupTypeVisible(false);
      setTimeout(() => setBizSignupType(status), 500);
    },
  };

  const toggleSignupType = (signupTypeName, status) => {
    signupType[signupTypeName](status);
  };
  return (
    <>
      <Component
        toggleSignup={() => setSignupTypeVisible(true)}
        toggleLogin={() => setLoginVisible(true)}
        navMenuBlack={navMenuBlack}
      />
      <AuthModal
        visible={signupTypeVisible}
        closeModal={() => setSignupTypeVisible(false)}
      >
        <StepOne toggleSignupType={toggleSignupType} />
      </AuthModal>
      <AuthModal
        visible={individualSignupType}
        closeModal={() => signupType.individual(false)}
      >
        <IndividualSignup
          toggleLogin={() => setLoginVisible(true)}
          closeModal={() => signupType.individual(false)}
        />
      </AuthModal>
      <AuthModal
        visible={bizSignupType}
        closeModal={() => signupType.business(false)}
      >
        <BusinessSignupForm
          toggleLogin={() => setLoginVisible(true)}
          closeModal={() => signupType.business(false)}
        />
      </AuthModal>
      <AuthModal
        visible={loginVisible}
        closeModal={() => setLoginVisible(false)}
      >
        <LoginForm
          toggleSignup={() => setSignupTypeVisible(true)}
          toggleLogin={() => setLoginVisible(false)}
          toggleFPassword={() => setFpassword(true)}
        />
      </AuthModal>
      <AuthModal visible={fpassword} closeModal={() => setFpassword(false)}>
        <ForgotPassword
          toggleResetPassword={() => setRpassword(true)}
          toggleLogin={() => setLoginVisible(false)}
          toggleFPassword={() => setFpassword(false)}
        />
      </AuthModal>
      <AuthModal visible={rpassword} closeModal={() => setRpassword(false)}>
        <ResetPassword toggleLogin={() => setLoginVisible(false)} />
      </AuthModal>
    </>
  );
};

export default AuthModalForm;
