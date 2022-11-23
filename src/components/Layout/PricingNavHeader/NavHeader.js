import React, { useEffect } from "react";
import { openPopupWidget } from "react-calendly";
import { FiMenu } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { togglePublicSidebar } from "../../../actions/uiAction";
// import GoogleTranslateButton from "../../Buttons/GoogleTranslate/GoogleTranslate";
import A from "../../../components/A/A";
import ApemsLogo from "../../ApemLogo/ApemsLogo";
import style from "./NavHeader.module.scss";
import "./NavHeader.scss";

const NavHeader = ({ toggleLogin }) => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        includedLanguages: "en,fr,pt,ar,sw",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element_second"
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  // const redirectToDemo = () => {
  //   window.location.href = "https://calendly.com/apems/demo";
  // };
  const CustomButton = ({ url, prefill, pageSettings, utm }) => {
    const onClick = () => openPopupWidget({ url, prefill, pageSettings, utm });

    return (
      <A
        customStyle={[style.nav__link, style.nav__link__signup]}
        handleRoute={onClick}
      >
        <span className={`${style.link__text} join_text`}> Book A Demo</span>
      </A>
    );
  };
  return (
    <nav className={style.header__nav}>
      <Link to="/" className={style.header__nav__left__mobile}>
        <ApemsLogo style={{ width: "100px" }} />
      </Link>
      <A href="/" customStyle={[style.header__nav__left]}>
        <ApemsLogo />
      </A>
      <div className={style.header__nav__right}>
        <A
          href="/GeneralMeeting"
          customStyle={[style.nav__link, style.nav_link_underline]}
        >
          Annual general meeting
        </A>
        <A
          href="/Corperate"
          customStyle={[style.nav__link, style.nav_link_underline]}
        >
          Corporate events
        </A>
        <A
          href="/ShowEvent"
          customStyle={[style.nav__link, style.nav_link_underline]}
        >
          Shows
        </A>
        <A
          href="/About"
          customStyle={[style.nav__link, style.nav_link_underline]}
        >
          About
        </A>
        <A
          href="/ContactUs"
          customStyle={[style.nav__link, style.nav_link_underline]}
        >
          Contact Us
        </A>
        {/* <A href="/download/report" customStyle={[style.nav__link]}>
          Download Report
        </A> */}
        {/* <A href="/pricing" customStyle={[style.nav__link]}>
          Pricing
        </A> */}
        <A
          handleRoute={toggleLogin}
          href="#"
          customStyle={[style.nav__link, style.nav__link_signin]}
        >
          Sign in
        </A>
        <CustomButton
          url="https://calendly.com/apems/demo"
          pageSettings={{
            backgroundColor: "ffffff",
            // hideEventTypeDetails: false,
            // hideLandingPageDetails: false,
            primaryColor: "00a2ff",
            textColor: "4d5055",
            zIndex: 90000,
          }}
        />
        {/* <A
          handleRoute={redirectToDemo}
          href="https://calendly.com/apems/demo"
          customStyle={[style.nav__link, style.nav__link__signup]}
        >
          <span className={style.link__text}> Book a Demo</span>
        </A> */}
        {/* <GoogleTranslateButton /> */}

        <div
          id="google_translate_element_second"
          to="#"
          className="nav__link"
        ></div>

        <Link
          className={style.nav__menu}
          to="#"
          onClick={() => dispatch(togglePublicSidebar(true))}
        >
          <FiMenu color="#000" size="33" />
        </Link>
      </div>
    </nav>
  );
};

export default NavHeader;
