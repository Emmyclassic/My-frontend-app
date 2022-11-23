import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { RiArrowLeftSLine } from "react-icons/ri";
import { FaLongArrowAltRight, FaRegDotCircle } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
import { Modal } from "antd";
import {
  pricingObject,
  emailCampaignList,
  smsCampaignList,
} from "../../LoggedArea/Profile/Pricing/static";

import PublicGenericLayout from "../../../components/GenericLayout/PublicGenericLayout";

import "antd/dist/antd.css";
import style from "./PricingCart.module.scss";

const Pricing = () => {
  // const agmArray = [];
  // const corpEventArray = [];
  // const corpEventSeriesArray = [];
  // const concertShowArray = [];
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState("agm");
  const [tabData, setTabData] = useState(pricingObject[tab]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedPlanPrice, setSelectedPlanPrice] = useState(null);
  const [selectedAGMAddonPrice, setSelectedAGMAddonPrice] = useState(null);
  const [selectedAGMAddon, setSelectedAGMAddon] = useState(null);
  const [showAgmAddons, setShowAgmAddons] = useState(false);
  const [showcorporateEventddons, setShowcorporateEventddons] = useState(false);
  const [showCorporateEventSeries, setShowCorporateEventSeries] =
    useState(false);
  const [showconcertShow, setShowconcertShow] = useState(false);
  console.log({ emailCampaignList, smsCampaignList, pricingObject, tabData });
  const toggleTab = (tab) => {
    if (tab === "agm") {
      setTab("agm");
      setTabData(pricingObject.agm);
    }
    if (tab === "corporateEvent") {
      setTab("corporateEvent");
      setTabData(pricingObject.corporateEvent);
    }
    if (tab === "corporateEventSeries") {
      setTab("corporateEventSeries");
      setTabData(pricingObject.corporateEventSeries);
    }
    if (tab === "concertShow") {
      setTab("concertShow");
      setTabData(pricingObject.concertShow);
    }
  };
  const handleLogin = () => {
    setVisible(false);
  };
  const handleSignup = () => {
    setVisible(false);
  };

  const handleAgmAddons = (plan) => {
    setSelectedAGMAddon(plan.planName);
    setSelectedAGMAddonPrice(plan.price);
  };

  return (
    <PublicGenericLayout>
      <section className={`${style.pricingCart}`}>
        <div className={style.pricingCart__wrapper}>
          <div className={style.pricingCart__wrapper__left}>
            <div className={style.left__header}>
              <div className={style.left__header__left}>
                <span
                  className={style.left__header__left_icon}
                  onClick={() => history.push("/pricing")}
                >
                  <RiArrowLeftSLine size={16} />
                </span>
              </div>
              <div className={style.left__header__right}>
                Checkout & Payment
              </div>
            </div>
            <div className={style.price__section}>
              <div className={style.plan_desc}>
                <div className={style.plan_desc__header}>
                  {" "}
                  <span className={style.plan_desc__header_icon}>
                    {" "}
                    <FaLongArrowAltRight color="#EF3125" size="16" />
                  </span>{" "}
                  <span className={style.plan_desc__header_text}>
                    {" "}
                    Chosen Event
                  </span>
                </div>
                <p className={style.plan_desc__para}>
                  This is a preview of the event you have chosen to purchase.
                </p>
              </div>
              <div className={style.pricing__box}>
                <div className={style.inner_nav_container}>
                  <div
                    className={
                      tab === "agm"
                        ? style.inner_nav_tab_active
                        : style.inner_nav_tab
                    }
                    onClick={() => toggleTab("agm")}
                  >
                    AGM
                  </div>
                  <div
                    className={
                      tab === "corporateEvent"
                        ? style.inner_nav_tab_active
                        : style.inner_nav_tab
                    }
                    onClick={() => toggleTab("corporateEvent")}
                  >
                    Corporate Event
                  </div>
                  <div
                    className={
                      tab === "corporateEventSeries"
                        ? style.inner_nav_tab_active
                        : style.inner_nav_tab
                    }
                    onClick={() => toggleTab("corporateEventSeries")}
                  >
                    Corporate Event (series)
                  </div>
                  <div
                    className={
                      tab === "concertShow"
                        ? style.inner_nav_tab_active
                        : style.inner_nav_tab
                    }
                    onClick={() => toggleTab("concertShow")}
                  >
                    Concert/Show
                  </div>
                </div>
              </div>
            </div>
            <div className={style.price__section}>
              <div className={style.plan_desc}>
                <div className={style.plan_desc__header}>
                  {" "}
                  <span className={style.plan_desc__header_icon}>
                    {" "}
                    <FaLongArrowAltRight color="#EF3125" size="16" />
                  </span>{" "}
                  <span className={style.plan_desc__header_text}>
                    {" "}
                    Chosen Plan
                  </span>
                </div>
                <p className={style.plan_desc__para}>
                  This is a preview of the plan you have chosen to purchase.
                </p>
              </div>
              <div className={style.addon__box}>
                <div
                  className={
                    selectedPlan === tabData[0].planName
                      ? style.addon__card_selected
                      : style.addon__card
                  }
                  onClick={() => {
                    setSelectedPlan(tabData[0].planName);
                    setSelectedPlanPrice(tabData[0].price);
                  }}
                >
                  <div className={style.addon__card_header}>
                    {tabData[0].plan}
                  </div>
                  <div className={style.addon__card_body}>
                    <sup>₦</sup>
                    {tabData[0].price}
                  </div>
                  <div className={style.addon__card_footer}>
                    {tabData[0].subdescription}
                  </div>
                </div>
                <div
                  className={
                    selectedPlan === tabData[1].planName
                      ? style.addon__card_selected
                      : style.addon__card
                  }
                  onClick={() => {
                    setSelectedPlan(tabData[1].planName);
                    setSelectedPlanPrice(tabData[1].price);
                  }}
                >
                  <div className={style.addon__card_header}>
                    {tabData[1].plan}
                  </div>
                  <div className={style.addon__card_body}>
                    <sup>₦</sup>
                    {tabData[1].price}
                  </div>
                  <div className={style.addon__card_footer}>
                    {tabData[1].subdescription}
                  </div>
                </div>
                <div
                  className={
                    selectedPlan === tabData[2].planName
                      ? style.addon__card_selected
                      : style.addon__card
                  }
                  onClick={() => {
                    setSelectedPlan(tabData[2].planName);
                    setSelectedPlanPrice(tabData[2].price);
                  }}
                >
                  <div className={style.addon__card_header}>
                    {tabData[2].plan}
                  </div>
                  <div className={style.addon__card_body}>
                    <sup>₦</sup>
                    {tabData[2].price}
                  </div>
                  <div className={style.addon__card_footer}>
                    {tabData[2].subdescription}
                  </div>
                </div>
              </div>
            </div>
            <div className={style.addon__section}>
              <div className={style.plan_desc}>
                <div className={style.plan_desc__header}>
                  {" "}
                  <span className={style.plan_desc__header_icon}>
                    {" "}
                    <FaLongArrowAltRight color="#EF3125" size="16" />
                  </span>{" "}
                  <span className={style.plan_desc__header_text}>
                    {" "}
                    Select Optional Add-on Plan
                  </span>
                </div>
                <p className={style.plan_desc__para}>
                  Select an optional Add-on plan to add to your purchase.
                </p>
              </div>
              <div>
                {tab !== "agm" && (
                  <div className={style.optional_addon_wrapper}>
                    <div
                      className={style.optional_addon_group}
                      onClick={() => setShowAgmAddons(!showAgmAddons)}
                    >
                      <FaRegDotCircle size="16" />
                      <p>AGM</p>
                    </div>
                    {showAgmAddons && (
                      <div className={style.addon__box_small}>
                        <div
                          className={
                            selectedAGMAddon === pricingObject.agm[0].planName
                              ? style.addon__card_small_selected
                              : style.addon__card_small
                          }
                          onClick={() => handleAgmAddons(pricingObject.agm[0])}
                        >
                          <div className={style.addon__card_body_small}>
                            <sup>₦</sup>
                            {pricingObject.agm[0].price}
                          </div>
                          <hr className={style.addon__card_body_divider} />
                          <div className={style.addon__card_footer_small}>
                            {pricingObject.agm[0].subdescription}
                          </div>
                        </div>
                        <div
                          className={
                            selectedAGMAddon === pricingObject.agm[1].planName
                              ? style.addon__card_small_selected
                              : style.addon__card_small
                          }
                          onClick={() => handleAgmAddons(pricingObject.agm[1])}
                        >
                          <div className={style.addon__card_body_small}>
                            <sup>₦</sup>
                            {pricingObject.agm[1].price}
                          </div>
                          <hr className={style.addon__card_body_divider} />
                          <div className={style.addon__card_footer_small}>
                            {pricingObject.agm[1].subdescription}
                          </div>
                        </div>
                        <div
                          className={
                            selectedAGMAddon === pricingObject.agm[2].planName
                              ? style.addon__card_small_selected
                              : style.addon__card_small
                          }
                          onClick={() => handleAgmAddons(pricingObject.agm[2])}
                        >
                          <div className={style.addon__card_body_small}>
                            <sup>₦</sup>
                            {pricingObject.agm[2].price}
                          </div>
                          <hr className={style.addon__card_body_divider} />
                          <div className={style.addon__card_footer_small}>
                            {pricingObject.agm[2].subdescription}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {tab !== "corporateEvent" && (
                  <div className={style.optional_addon_wrapper}>
                    <div
                      className={style.optional_addon_group}
                      onClick={() =>
                        setShowcorporateEventddons(!showcorporateEventddons)
                      }
                    >
                      <FaRegDotCircle size="16" />
                      <p>Corporate Event</p>
                    </div>
                    {showcorporateEventddons && (
                      <div className={style.addon__box_small}>
                        <div className={style.addon__card_small}>
                          <div className={style.addon__card_body_small}>
                            <sup>₦</sup>
                            {pricingObject.corporateEvent[0].price}
                          </div>
                          <hr className={style.addon__card_body_divider} />
                          <div className={style.addon__card_footer_small}>
                            {pricingObject.corporateEvent[0].subdescription}
                          </div>
                        </div>
                        <div className={style.addon__card_small}>
                          <div className={style.addon__card_body_small}>
                            <sup>₦</sup>
                            {pricingObject.corporateEvent[1].price}
                          </div>
                          <hr className={style.addon__card_body_divider} />
                          <div className={style.addon__card_footer_small}>
                            {pricingObject.corporateEvent[1].subdescription}
                          </div>
                        </div>
                        <div className={style.addon__card_small}>
                          <div className={style.addon__card_body_small}>
                            <sup>₦</sup>
                            {pricingObject.corporateEvent[2].price}
                          </div>
                          <hr className={style.addon__card_body_divider} />
                          <div className={style.addon__card_footer_small}>
                            {pricingObject.corporateEvent[2].subdescription}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {tab !== "corporateEventSeries" && (
                  <div className={style.optional_addon_wrapper}>
                    <div
                      className={style.optional_addon_group}
                      onClick={() =>
                        setShowCorporateEventSeries(!showCorporateEventSeries)
                      }
                    >
                      <FaRegDotCircle size="16" />
                      <p>Corporate Event Series</p>
                    </div>
                    {showCorporateEventSeries && (
                      <div className={style.addon__box_small}>
                        <div className={style.addon__card_small}>
                          <div className={style.addon__card_body_small}>
                            <sup>₦</sup>
                            {pricingObject.corporateEventSeries[0].price}
                          </div>
                          <hr className={style.addon__card_body_divider} />
                          <div className={style.addon__card_footer_small}>
                            {
                              pricingObject.corporateEventSeries[0]
                                .subdescription
                            }
                          </div>
                        </div>
                        <div className={style.addon__card_small}>
                          <div className={style.addon__card_body_small}>
                            <sup>₦</sup>
                            {pricingObject.corporateEventSeries[1].price}
                          </div>
                          <hr className={style.addon__card_body_divider} />
                          <div className={style.addon__card_footer_small}>
                            {
                              pricingObject.corporateEventSeries[1]
                                .subdescription
                            }
                          </div>
                        </div>
                        <div className={style.addon__card_small}>
                          <div className={style.addon__card_body_small}>
                            <sup>₦</sup>
                            {pricingObject.corporateEventSeries[2].price}
                          </div>
                          <hr className={style.addon__card_body_divider} />
                          <div className={style.addon__card_footer_small}>
                            {
                              pricingObject.corporateEventSeries[2]
                                .subdescription
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {tab !== "concertShow" && (
                  <div className={style.optional_addon_wrapper}>
                    <div
                      className={style.optional_addon_group}
                      onClick={() => setShowconcertShow(!showconcertShow)}
                    >
                      <FaRegDotCircle size="16" />
                      <p>Concert/Show</p>
                    </div>
                    {showconcertShow && (
                      <div className={style.addon__box_small}>
                        <div className={style.addon__card_small}>
                          <div className={style.addon__card_body_small}>
                            <sup>₦</sup>
                            {pricingObject.concertShow[0].price}
                          </div>
                          <hr className={style.addon__card_body_divider} />
                          <div className={style.addon__card_footer_small}>
                            {pricingObject.concertShow[0].subdescription}
                          </div>
                        </div>
                        <div className={style.addon__card_small}>
                          <div className={style.addon__card_body_small}>
                            <sup>₦</sup>
                            {pricingObject.concertShow[1].price}
                          </div>
                          <hr className={style.addon__card_body_divider} />
                          <div className={style.addon__card_footer_small}>
                            {pricingObject.concertShow[1].subdescription}
                          </div>
                        </div>
                        <div className={style.addon__card_small}>
                          <div className={style.addon__card_body_small}>
                            <sup>₦</sup>
                            {pricingObject.concertShow[2].price}
                          </div>
                          <hr className={style.addon__card_body_divider} />
                          <div className={style.addon__card_footer_small}>
                            {pricingObject.concertShow[2].subdescription}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className={style.pricingCart__left__middle}>
              <div className={style.email_credit_container}>
                <p>Email Credit</p>
                <EmailCampaignCardList list={emailCampaignList} />
              </div>
              <div className={style.email_credit_container}>
                <p>SMS Credit</p>
                <EmailCampaignCardList list={smsCampaignList} />
              </div>
              <div className={style.cart_condition__section}>
                You’ll be charged ₦100,000 yearly until you cancel your
                subscription. Previous charges won’t be refunded when you cancel
                unless it’s legally required. Your payment data is encrypted and
                secure.
              </div>
              <div className={style.cart_terms_section}>
                <label htmlFor="terms" className={style.form__input_label}>
                  <input className={style.form__input} type="checkbox" />
                  <span className={style.form__label_text}>
                    I agree to the APEMS Terms and the Automatic Renewal Terms
                    above.
                  </span>
                </label>
              </div>
              <div className={style.submit_payment}>
                <button
                  type="button"
                  className={style.makePayment}
                  onClick={() => setVisible(true)}
                >
                  Make Payment
                </button>
              </div>
            </div>
          </div>
          <div className={style.pricingCart__wrapper__middle}>
            <div className={style.cart_condition__section}>
              You’ll be charged ₦100,000 yearly until you cancel your
              subscription. Previous charges won’t be refunded when you cancel
              unless it’s legally required. Your payment data is encrypted and
              secure.
            </div>
            <div className={style.cart_terms_section}>
              <label htmlFor="terms" className={style.form__input_label}>
                <input className={style.form__input} type="checkbox" />
                <span className={style.form__label_text}>
                  I agree to the APEMS Terms and the Automatic Renewal Terms
                  above.
                </span>
              </label>
            </div>
            <div className={style.submit_payment}>
              <button
                type="button"
                className={style.makePayment}
                onClick={() => setVisible(true)}
              >
                Make Payment
              </button>
            </div>
          </div>
          <div className={style.pricingCart__wrapper__right}>
            <div className={style.right__header}>Order Summary</div>
            <div className={style.right__orderSummary}>
              <div className={style.order__header}>
                <div className={style.order__header_title}>Item</div>
                <div className={style.order__header_price}>Price</div>
              </div>
              <div className={style.order__body}>
                <div className={style.order__header_title}>
                  <div className={style.order__header_name}>
                    Pro Plan Subscription
                  </div>
                  <div className={style.order__header_meta}>Yearly payment</div>
                </div>
                <div className={style.order__header_price}>
                  ₦ {selectedPlanPrice}
                </div>
              </div>
              <div className={style.order__subtotal}>
                <div className={style.order__header_title}>Subtotal</div>
                <div className={style.order__header_price}>
                  ₦ {selectedPlanPrice}
                </div>
              </div>
              <div className={style.order__addon}>Add-On</div>
              {selectedAGMAddonPrice && (
                <div className={style.addons_order__body}>
                  <div className={style.order__header_title}>AGM Add-On</div>
                  <div className={style.order__header_price}>
                    ₦ {selectedAGMAddonPrice}
                  </div>
                </div>
              )}
              <div className={style.order__subtotal}>
                <div className={style.order__header_title}>Total</div>
                <div className={style.order__header_price}>₦100,000</div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
          header={null}
          zIndex="12000"
          position="relative"
        >
          <section className={style.modal__container}>
            <div className={style.modal__container_header}>
              {" "}
              <span className={style.icon__box}>
                <FcBusinessman size={50} />
              </span>
            </div>
            <div className={style.modal__body}>
              <div className={style.modal__body_header}>
                Login or create an account
              </div>
              <div className={style.modal__body_desc}>
                Hi there. We noticed you are trying to purchase a plan put you
                are not signed into your account. Sign in to complete your
                purchase or create an account if you don’t have yet.
              </div>
            </div>
            <div className={style.modal__footer}>
              <Link
                to="#"
                className={` ${style.modal__footer_link} ${style.modal__footer_link_login}`}
                onClick={() => handleLogin()}
              >
                Login
              </Link>
              <Link
                to="#"
                className={` ${style.modal__footer_link} ${style.modal__footer_link_signup}`}
                onClick={() => handleSignup()}
              >
                Create Account
              </Link>
            </div>
          </section>
        </Modal>
      </section>
    </PublicGenericLayout>
  );
};

const EmailCampaignCard = ({
  credit,
  amount,
  hanldeCardClick,
  id,
  selectedCard,
}) => {
  return (
    <div className={style.campaign_card} onClick={() => hanldeCardClick(id)}>
      <div className={style.campaign_card_top}>
        <FaRegDotCircle
          size="10"
          className={
            selectedCard === id
              ? style.card_icon_tick
              : style.card_icon_unselected
          }
        />
        <span className={style.campaign_card_credit}>{credit} Credit</span>
      </div>
      <div>
        <span className={style.campaign_card_amount}>₦ {amount} </span>
        <span className={style.campaign_card_sub}>/per month</span>
      </div>
    </div>
  );
};

const EmailCampaignCardList = ({ list = [] }) => {
  const [selectedCard, setSelectedCard] = useState("");
  const hanldeCardClick = (cardId) => {
    setSelectedCard(cardId);
  };
  return (
    <div className={style.campaign_card_list}>
      {list.map((item) => (
        <EmailCampaignCard
          key={item.id}
          id={item.id}
          amount={item.amount}
          credit={item.credit}
          hanldeCardClick={hanldeCardClick}
          selectedCard={selectedCard}
        />
      ))}
    </div>
  );
};

export default Pricing;
