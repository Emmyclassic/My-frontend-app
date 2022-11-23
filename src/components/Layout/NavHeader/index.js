import React from "react";
import cx from "classnames";
import { openPopupWidget } from "react-calendly";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import ApemsLogo from "../../ApemLogo/ApemsLogo";
import { togglePublicSidebar } from "../../../actions/uiAction";

import A from "../../A/A";
import GoogleTranslateButton from "../../Buttons/GoogleTranslate/GoogleTranslate";
import style from "./NavHeader.module.scss";
import "./navHeader.scss";

const NavHeader = ({
  toggleSignup,
  toggleLogin,
  customStyle = {},
  customClass,
  customSignin,
  customSignUp,
  navMenuBlack,
}) => {
  const classNames = cx(style.header__nav, customClass);
  const dispatch = useDispatch();
  const CustomButton = ({ url, prefill, pageSettings, utm }) => {
    const onClick = () => openPopupWidget({ url, prefill, pageSettings, utm });

    return (
      <A
        customStyle={[style.nav__link, style.nav__link__signup, customSignUp]}
        handleRoute={onClick}
      >
        <span className={`${style.link__text} join_text`}> Book A Demo</span>
      </A>
    );
  };

  return (
    <nav className={`${classNames} nav_top`} style={customStyle}>
      <Link to="/" className={style.header__nav__left__mobile}>
        <ApemsLogo style={{ width: "100px" }} />
      </Link>
      <A href="/" customStyle={[style.header__nav__left]}>
        <ApemsLogo />
      </A>
      <div className={style.header__nav__right}>
        <A
          href="/GeneralMeeting"
          customStyle={[
            style.nav__link,
            style.nav_link_underline,
            navMenuBlack && style.nav__link_black,
          ]}
        >
          Annual general meeting
        </A>
        <A
          href="/Corperate"
          customStyle={[
            style.nav__link,
            style.nav_link_underline,
            navMenuBlack && style.nav__link_black,
          ]}
        >
          Corporate events
        </A>
        <A
          href="/ShowEvent"
          customStyle={[
            style.nav__link,
            style.nav_link_underline,
            navMenuBlack && style.nav__link_black,
          ]}
        >
          Shows
        </A>
        <A
          href="/About"
          customStyle={[
            style.nav__link,
            style.nav_link_underline,
            navMenuBlack && style.nav__link_black,
          ]}
        >
          About
        </A>
        <A
          href="/ContactUs"
          customStyle={[
            style.nav__link,
            style.nav_link_underline,
            navMenuBlack && style.nav__link_black,
          ]}
        >
          Contact Us
        </A>
        <A
          href="#"
          customStyle={[
            style.nav__link,
            { customSignin: true },
            navMenuBlack && style.nav__link_black,
          ]}
          handleRoute={toggleLogin}
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
        <div className="desktop_mobile_none">
          <GoogleTranslateButton googleTrans={false} />
        </div>
        <Link
          className={style.nav__menu}
          to="#"
          onClick={() => dispatch(togglePublicSidebar(true))}
        >
          <FiMenu
            className={
              navMenuBlack ? "sidebarMenu_icon_black" : "sidebarMenu_icon"
            }
            size="33"
          />
        </Link>
      </div>
    </nav>
  );
};

export default NavHeader;
