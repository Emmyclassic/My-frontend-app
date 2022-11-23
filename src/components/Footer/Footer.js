import React from "react";

import style from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__main__wrapper}>
        <div className={style.footer__container}>
          <div
            className={`${style.logo__container} ${style.logo__container_trademark}`}
          >
            <Logo className={style.company__logo} />

            <span className={style.company__trademark}>
              By{" "}
              <span className={style.company__small_logo}>
                <Logo className={style.company__logo} />
              </span>
              <span>Africa Prudential</span>
            </span>
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
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet.
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
                  <Link to="#" className={style.social__list__link}>
                    Facebook
                  </Link>
                </li>
                <li className={style.social__list_item}>
                  <Link to="#" className={style.social__list__link}>
                    Instagram
                  </Link>
                </li>
                <li className={style.social__list_item}>
                  <Link to="#" className={style.social__list__link}>
                    Twitter
                  </Link>
                </li>
                <li className={style.social__list_item}>
                  <Link to="#" className={style.social__list__link}>
                    Medium
                  </Link>
                </li>
              </ul>
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
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet.
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
                  <Link to="#" className={style.partner__list_link}>
                    Become a Partner
                  </Link>
                </li>
                <li className={style.partner__list_item}>
                  <Link to="#" className={style.partner__list_link}>
                    Become a Partner
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
