import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { appendGoogleTranslateScript } from "../../../utils/googleTranslate";
import "./GoogleTranslate.scss";

const GoogleTranslateButton = () => {
  useEffect(() => {
    appendGoogleTranslateScript();
  }, []);
  return <div id="google_translate_element" to="#" className="nav__link"></div>;
};

export default GoogleTranslateButton;
