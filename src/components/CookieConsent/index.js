import React, { useState } from "react";
import { Modal, Collapse, Switch } from "antd";
import CookieConsent from "react-cookie-consent";
import { FiMinus, FiPlus } from "react-icons/fi";
import testTool from "../../utils/tool";

import style from "./index.module.scss";

const { Panel } = Collapse;

const genExtra = () => (
  <span
    onClick={(event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  >
    Always Enabled
  </span>
);
const CookieSwitch = ({ type, checked, setAdvert, setAnalytic }) => {
  const onChange = (data) => {
    if (type === "advert") {
      setAdvert(data);
    } else {
      setAnalytic(data);
    }
  };
  return (
    <span
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    >
      Enabled <Switch defaultChecked onChange={onChange} checked={checked} />
    </span>
  );
};

const CookieConsentWrapper = () => {
  const [preferenceModal, setPreferenceModal] = useState(false);
  const [advert, setAdvert] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  const storeCookieValue = () => {
    testTool.setCookie("advert", advert);
    testTool.setCookie("analytics", analytics);
    setPreferenceModal(false);
  };

  return (
    <>
      <Modal
        title="Privacy Overview"
        visible={preferenceModal}
        onCancel={() => setPreferenceModal(false)}
        width={700}
        okText="Save & Accept"
        onOk={storeCookieValue}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{
          style: {
            backgroundColor: "rgb(217, 11, 44)",
            color: "#fff",
            outline: "none",
            border: "none",
          },
        }}
      >
        <p>
          {`This website uses cookies to improve your experience while you
          navigate through the website. The cookies that are categorized as
          'necessary' are stored on your browser as they are essential for the
          basic functionalities of the website. We also use th...`}
        </p>
        <div className={style.content_container}>
          <Collapse
            bordered={false}
            expandIconPosition="left"
            expandIcon={({ isActive }) =>
              isActive ? (
                <span>
                  <FiMinus color="red" size={15} />{" "}
                </span>
              ) : (
                <span>
                  <FiPlus color="red" size={15} />
                </span>
              )
            }
            className="site-collapse-custom-collapse site-collapse-custom-collapse-faq"
          >
            <Panel
              header="Necessary"
              extra={genExtra()}
              key="1"
              className="site-collapse-custom-panel site-collapse-custom-panel-faq"
            >
              <p>
                Necessary cookies enable core functionality such as security,
                network management and accessibility. You may disable these by
                changing your browser settings, however, this may affect how the
                website functions.
              </p>
            </Panel>
            <Panel
              header="Advertising Cookies"
              key="2"
              extra={
                <CookieSwitch
                  type="advert"
                  setAdvert={(data) => setAdvert(data)}
                  checked={advert}
                />
              }
              className="site-collapse-custom-panel site-collapse-custom-panel-faq"
            >
              <p>
                We use advertising cookies to ensure we can provide you with the
                most relevant information about our services and products.
              </p>
            </Panel>
            <Panel
              header="Analytics and Performance"
              key="3"
              extra={
                <CookieSwitch
                  type="analytics"
                  checked={analytics}
                  setAnalytic={(data) => setAnalytics(data)}
                />
              }
              className="site-collapse-custom-panel site-collapse-custom-panel-faq"
            >
              <p>
                Google Analytics cookies help us improve our website by
                collecting and reporting information on how you use it. The
                cookies collect information in a way that does not directly
                identify anyone. Functional and performance cookies are required
                in order for certain parts of the website to work such as video
                and audio content.
              </p>
            </Panel>
          </Collapse>
        </div>
      </Modal>
      <CookieConsent
        location="bottom"
        cookieName="apemCookie"
        declineButtonText="Preference"
        style={{
          background: "#fff",
          zIndex: 10000000000,
          fontFamily: "ttnorms",
          color: "rgb(217, 11, 44)",
          boxShadow: "0 -1px 10px 0 #acabab4d",
        }}
        buttonStyle={{
          color: "#fff",
          fontSize: "13px",
          backgroundColor: "rgb(217, 11, 44)",
          padding: "10px 15px ",
          borderRadius: "30px",
        }}
        declineButtonStyle={{
          borderRadius: "30px",
          padding: "10px 15px ",
          border: "1px solid  rgb(217, 11, 44)",
          color: "rgb(217, 11, 44)",
          background: "none",
        }}
        expires={150}
        enableDeclineButton
        onDecline={() => setPreferenceModal(true)}
      >
        {` We use cookies to enhance your browsing experience, serve personalized
      content. By clicking "I understand", you consent
      to our use of cookies`}
      </CookieConsent>
    </>
  );
};

export default CookieConsentWrapper;
