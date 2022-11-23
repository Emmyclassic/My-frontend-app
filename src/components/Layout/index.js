import React, { useState, useEffect, lazy } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "react-sidebar";
import { openPopupWidget } from "react-calendly";
import { togglePublicSidebar } from "../../actions/uiAction";
// import GoogleTranslateMobile from "../Buttons/GoogleTranslate/GoogleTranslateMobile";
import A from "../A/A";

import icon1 from "../../assets/icons/nav-icon1.svg";
import icon2 from "../../assets/icons/nav-icon2.svg";
import icon3 from "../../assets/icons/nav-icon3.svg";
import icon4 from "../../assets/icons/nav-icon4.svg";
import icon5 from "../../assets/icons/nav-icon5.svg";
import icon6 from "../../assets/icons/nav-icon6.svg";
import icon7 from "../../assets/icons/nav-icon7.svg";

// import "antd/dist/antd.css";
import style from "./index.module.scss";
import "./layout.scss";

const AuthModalForm = lazy(() => import("../../Auth/AuthModalForm"));
const GoogleTranslateMobile = lazy(() =>
  import("../Buttons/GoogleTranslate/GoogleTranslateMobile")
);

const Layout = (props) => {
  const sidebarStatus = useSelector((state) => state.publicSidebar);
  const dispatch = useDispatch();
  const closeSidebar = () => {
    dispatch(togglePublicSidebar(false));
  };

  const styles = {
    root: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowX: "hidden",
      // height: "100%",
    },
    sidebar: {
      zIndex: 100,
      position: "fixed",
      top: 0,
      bottom: 0,
      transition: "transform .3s ease-out",
      WebkitTransition: "-webkit-transform .3s ease-out",
      willChange: "transform",
      overflowY: "auto",
      overflowX: "hidden",

      width: "100%",
    },
    overlay: {},
    dragHandle: {
      zIndex: 1,
      position: "fixed",
      top: 0,
      bottom: 0,
      transition: "opacity .3s ease-out, visibility .3s ease-out",
    },
  };

  const sidebar = <AuthModalForm component={Asidebar} />;
  const sidebarProps = {
    sidebar,
    open: sidebarStatus,
    onSetOpen: closeSidebar,
    styles: styles,
    transitions: true,
    pullRight: true,
    rootClassName: "rootSidebar",
    contentClassName: "sidebarContent",
  };
  console.log({ sidebarProps });
  return <Sidebar {...sidebarProps}>{props.children}</Sidebar>;
};

export const Asidebar = (props) => {
  // const history = useHistory();
  const sidebarStatus = useSelector((state) => state.publicSidebar);
  const dispatch = useDispatch();

  const [screen, setScreen] = useState(window.innerWidth);
  const checkMobile = () => {
    if (screen < 1200) {
      return true;
    } else {
      return false;
    }
  };
  const [mobile, setMobile] = useState(checkMobile);

  useEffect(() => {
    function handleResize() {
      setScreen(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    setMobile(checkMobile());
    return () => window.removeEventListener("resize", handleResize);
  }, [screen]);

  const closeSidebar = () => {
    dispatch(togglePublicSidebar(false));
  };

  const toggleAuthModal = (name) => {
    if (sidebarStatus) dispatch(togglePublicSidebar(false));
    if (name === "signin") props.toggleLogin();
    if (name === "signup") props.toggleSignup();
  };
  const url = "https://calendly.com/apems/demo";
  const onClick = () => openPopupWidget({ url });

  return (
    <div>
      <div className={style.desktop_mobile_nav}>
        <div
          className={style.desktop_mobile_nav_box1}
          onClick={() => closeSidebar(false)}
        ></div>
        <div className={style.desktop_mobile_nav_box2}>
          <div className={style.desktop_mobile_nav_logo_wrapper}>
            <p>
              <Link to="/" onClick={() => closeSidebar(false)}>
                <img
                  style={{ width: "40%" }}
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/apemWhiteLogo_wqpwq1.png"
                  alt="logo"
                />
              </Link>
            </p>
            <span onClick={() => closeSidebar(false)}>
              <MdClose color="#fff" size={25} />
            </span>
          </div>
          <ul className={style.desktop_mobile_nav_ul}>
            <Link
              to="/GeneralMeeting"
              onClick={() => closeSidebar(false)}
              className={style.desktop_mobile_nav_li}
            >
              <img
                style={{
                  width: "16px",
                  marginRight: "10px",
                }}
                src={icon1}
                alt=""
              />
              <span> Annual general meeting</span>
            </Link>
            <Link
              to="/Corperate"
              onClick={() => closeSidebar(false)}
              className={style.desktop_mobile_nav_li}
            >
              <img
                style={{
                  width: "16px",
                  marginRight: "10px",
                }}
                src={icon2}
                alt=""
              />
              <span>Coperate events</span>
            </Link>
            <Link
              to="/ShowEvent"
              onClick={() => closeSidebar(false)}
              className={style.desktop_mobile_nav_li}
            >
              <img
                style={{
                  width: "16px",
                  marginRight: "10px",
                }}
                src={icon3}
                alt=""
              />
              <span>Shows</span>
            </Link>
            <Link
              to="/About"
              onClick={() => closeSidebar(false)}
              className={style.desktop_mobile_nav_li}
            >
              <img
                style={{
                  width: "16px",
                  marginRight: "10px",
                }}
                src={icon3}
                alt=""
              />
              <span>About</span>
            </Link>
            <Link
              to="/ContactUs"
              onClick={() => closeSidebar(false)}
              className={style.desktop_mobile_nav_li}
            >
              <img
                style={{
                  width: "16px",
                  marginRight: "10px",
                }}
                src={icon4}
                alt=""
              />
              <span>Contact Us</span>
            </Link>
            <Link
              onClick={() => {
                closeSidebar(false);
                toggleAuthModal("signin");
              }}
              className={style.desktop_mobile_nav_li}
            >
              <img
                style={{
                  width: "16px",
                  marginRight: "10px",
                }}
                src={icon5}
                alt=""
              />
              <span>Sign in</span>
            </Link>
            <div onClick={() => closeSidebar(false)}>
              <A
                handleRoute={onClick}
                customStyle={[
                  style.desktop_mobile_nav_li,
                  style.desktop_mobile_nav_li_book_demo,
                ]}
              >
                <img
                  style={{
                    width: "16px",

                    marginRight: "10px",
                  }}
                  src={icon6}
                  alt=""
                />
                <span>Book a Demo</span>
              </A>
            </div>
            {mobile && (
              <div className={`${style.desktop_mobile_nav_li} language`}>
                <img
                  style={{
                    width: "16px",

                    marginRight: "10px",
                  }}
                  src={icon7}
                  alt=""
                />
                <span>Language</span>
                <p>
                  <GoogleTranslateMobile googleTrans={false} />
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Layout;
