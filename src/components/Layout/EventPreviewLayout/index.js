import React, { useEffect } from "react";
import A from "../../../components/A/A";
import ApemsLogo from "../../ApemLogo/ApemsLogo";
import Layout from "../index";
import style from "./index.module.scss";
import "./index.scss";
const EventPreviewLayout = ({ children, eventDetail }) => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        includedLanguages: "en,fr,pt,ar",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element_second"
    );
  };

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <Layout>
      <nav className={style.header__nav}>
        {eventDetail && eventDetail.logo ? (
          <A href="/" customStyle={[style.header__nav__left]}>
            <ApemsLogo logoUrl={eventDetail?.logo} />
          </A>
        ) : (
          <A href="/" customStyle={[style.header__nav__left]}>
            Loading..
          </A>
        )}
        <div className={style.header__nav__right}>
          <div
            id="google_translate_element_second"
            to="#"
            className="nav__link"
          ></div>
        </div>
      </nav>
      <main className={style.mainBody}>{children}</main>
    </Layout>
  );
};

export default EventPreviewLayout;
