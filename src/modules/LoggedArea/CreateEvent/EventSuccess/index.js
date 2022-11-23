import React from "react";
import { useHistory } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import InviteLink from "../../../../components/InviteLink";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import style from "./index.module.scss";

const PreviewEvent = () => {
  const history = useHistory();

  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));

  console.log("data => ", currentEvent);

  const redirectToDetail = () => {
    history.push(`/event/${currentEvent.id}`);
  };
  return (
    <PrivateGenericLayout
      leftNav={<DashboardLeftHeaderNav title="" subtitle="" />}
    >
      <section className={style.container}>
        <div className={style.feedbackBox}>
          <div className={style.iconWrap}>
            <div className={style.iconBox}>
              <img
                src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940342/apems/fireworks_wlr8nr.png"
                className={style.congratImg}
              />
            </div>
          </div>

          <h1 className={style.feedbackType}>Successful</h1>
          <p className={style.description}>
            Use this link to invite people to your event:
          </p>
          <div className={style.inviteBox}>
            <InviteLink
              placeholder="https://apems.com/events/agems-meeting"
              link={`${window.location.origin}/Event/publish/preview/${currentEvent?.id}`}
            />
          </div>

          <hr className={style.sucessRuler} />
          <div
            className={`${style.footer__contact_social} ${style.footer__short_desc}`}
          >
            <ul className={style.social__list}>
              <li className={style.social__list_item}>
                <LinkedinShareButton
                  url={`https://apems-frontend-dev.apems.co/Event/publish/preview/${currentEvent?.id}`}
                  title={currentEvent.title}
                >
                  <LinkedinIcon size={30} round={true} className="icon-tab" />
                </LinkedinShareButton>
                {/* <Link to="#" className={style.social__list__link}>
                  <span className={style.social__icon}>
                    <FaFacebookF color="#5C6574" size="15" />
                  </span>
                </Link> */}
              </li>
              <li className={style.social__list_item}>
                <FacebookShareButton
                  url={`https://apems-frontend-dev.apems.co/Event/publish/preview/${currentEvent?.id}`}
                  quote={currentEvent.title}
                >
                  <FacebookIcon size={30} round={true} className="icon-tab" />
                </FacebookShareButton>
                {/* <Link to="#" className={style.social__list__link}>
                  <span className={style.social__icon}>
                    <FaInstagram color="#5C6574" size="15" />
                  </span>
                </Link> */}
              </li>
              <li className={style.social__list_item}>
                <TwitterShareButton
                  url={`https://apems-frontend-dev.apems.co/event/concert/overview/${currentEvent?.id}`}
                  title={currentEvent.title}
                >
                  <TwitterIcon size={30} round={true} className="icon-tab" />
                </TwitterShareButton>
                {/* <Link to="#" className={style.social__list__link}>
                  <span className={style.social__icon}>
                    <FaTwitter color="#5C6574" size="15" />
                  </span>
                </Link> */}
              </li>
              {/* <li className={style.social__list_item}>
                <Link to="#" className={style.social__list__link}>
                  <span className={style.social__icon}>
                    <FaLinkedinIn color="#5C6574" size="15" />
                  </span>
                </Link>
              </li> */}
            </ul>
          </div>
          <button
            className={style.feedback_btn}
            type="button"
            onClick={redirectToDetail}
          >
            {"Continue >>>"}
          </button>
        </div>
      </section>
    </PrivateGenericLayout>
  );
};

export default PreviewEvent;
