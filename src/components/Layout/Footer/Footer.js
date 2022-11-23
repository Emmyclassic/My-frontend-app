import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { Modal } from "antd";

import ApemsLogo from "../../ApemLogo/ApemsLogo";
import style from "./footer.module.scss";
import ContactForm from "../RequestDemo/ContactUsForm";

const Footer = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  return (
    <footer className={style.footer}>
      <div className={style.footer__main__wrapper}>
        <div className={style.footer__container}>
          <div
            className={`${style.logo__container} ${style.logo__container_trademark}`}
          >
            <ApemsLogo style={{ width: "100px" }} />
          </div>
          <div
            className={`${style.logo__container} ${style.logo__container_address}`}
          >
            <h5
              className={`${style.footer__address} ${style.footer__list__header}`}
            >
              Our Address
            </h5>
            <div
              className={`${style.footer__address_desc} ${style.footer__short_desc}`}
            >
              <a
                className={style.partner__list_link}
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(
                  "Infinity House, 30 Ilupeju Byepass, Ilupeju, Lagos"
                )}`}
              >
                Infinity House, 30 Ilupeju Byepass, Ilupeju, Lagos.
              </a>
            </div>
          </div>

          <div
            className={`${style.logo__container} ${style.logo__container_help}`}
          >
            <h5
              className={`${style.footer__help_center} ${style.footer__list__header}`}
            >
              Help Centers
            </h5>
            <div
              className={`${style.footer__help_desc} ${style.footer__short_desc}`}
            >
              <ul className={style.partner__list}>
                <li className={style.partner__list_item}>
                  <Link
                    to="/FrequentlyAsked"
                    className={style.partner__list_link}
                  >
                    Frequently Asked Question
                  </Link>
                </li>
                <li className={style.partner__list_item}>
                  <a
                    href="mailto:enquiries@apems.co"
                    className={style.partner__list_link}
                  >
                    enquiries@apems.co
                  </a>
                </li>
                <li className={style.partner__list_item}>
                  <Link
                    to="/PrivacyPolicy"
                    className={style.partner__list_link}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className={style.partner__list_item}>
                  <Link to="/TermsOfUse" className={style.partner__list_link}>
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={style.logo__container}>
            <h5
              className={`${style.footer__partner} ${style.footer__list__header}`}
            >
              Partner With APEMS
            </h5>
            <div
              className={`${style.footer__partner_item} ${style.footer__short_desc}`}
            >
              <ul className={style.partner__list}>
                <li className={style.partner__list_item}>
                  <Link
                    to="#"
                    onClick={() => setShowContactModal(true)}
                    className={style.partner__list_link}
                  >
                    Become a Partner
                  </Link>
                </li>
                {/* <li className={style.partner__list_item}>
                  <Link to="#" className={style.partner__list_link}>
                    Team up as an ambassador
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div
            className={`${style.logo__container} ${style.logo__container_social}`}
          >
            <h5
              className={`${style.footer__contact_us} ${style.footer__list__header}`}
            >
              Get In touch
            </h5>
            <div
              className={`${style.footer__contact_social} ${style.footer__short_desc}`}
            >
              <ul className={style.social__list}>
                <li className={style.social__list_item}>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://web.facebook.com/Apems-113706474152909"
                    className={style.social__list__link}
                  >
                    <span className={style.social__icon}>
                      <FaFacebookF color="#000" size="15" />
                    </span>
                  </a>
                </li>
                <li className={style.social__list_item}>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://www.instagram.com/useapems/"
                    className={style.social__list__link}
                  >
                    <span className={style.social__icon}>
                      <FaInstagram color="#000" size="15" />
                    </span>
                  </a>
                </li>
                <li className={style.social__list_item}>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://twitter.com/useapems/"
                    className={style.social__list__link}
                  >
                    <span className={style.social__icon}>
                      <FaTwitter color="#000" size="15" />
                    </span>
                  </a>
                </li>
                <li className={style.social__list_item}>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="http://www.linkedin.com/company/apems-co"
                    className={style.social__list__link}
                  >
                    <span className={style.social__icon}>
                      <FaLinkedinIn color="#000" size="15" />
                    </span>
                  </a>
                </li>
                <li className={style.social__list_item}>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://www.youtube.com/channel/UCi0-No0WAYUXu8wndw8Jmyg"
                    className={style.social__list__link}
                  >
                    <span className={style.social__icon}>
                      <FaYoutube color="#000" size="15" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Modal
        style={{
          width: "100%",
          maxWidth: "100%",
        }}
        width="50%"
        destroyOnClose={true}
        centered
        footer={null}
        onCancel={() => setShowContactModal(false)}
        visible={showContactModal}
        closable={true}
        bodyStyle={{
          backgroundColor: "#fff",
          // minHeight: "100vh",
          width: "100%",
        }}
      >
        <div>
          <ContactForm />
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;
