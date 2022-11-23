import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { pricingObject, emailCampaignList, smsCampaignList } from "./static";

import { FaCheckCircle } from "react-icons/fa";
import style from "./index.module.scss";

function Pricing() {
  const history = useHistory();
  const [tab, setTab] = useState("agm");
  const [tabData, setTabData] = useState(pricingObject[tab]);
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

  useEffect(() => {
    console.log("rerender...");
  }, [tab]);
  return (
    <section className={`${style.pricing}`}>
      <div className={`${style.pricing_header_wrapper}`}>
        <div className={style.pricing_header}>
          <div className={style.pricing_header_title}>
            Ready to start with <span className={style.comp_name}>APEMS?</span>
          </div>
          <p className={style.comp_name_pack}>
            Choose the package that suits you
          </p>
        </div>
      </div>
      <div className={style.inner_nav_container}>
        <div
          className={
            tab === "agm" ? style.inner_nav_tab_active : style.inner_nav_tab
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

      <div
        className={`${style.subscription_wrapper} ${style.pricing_wrapper_border}`}
      >
        <PricingCardList list={tabData} />
      </div>
      <div className={`${style.pricing_wrapper} ${style.pricing_wrapper_agm}`}>
        <div className={style.pricing__addon_header}>
          <h3 className={style.addon__title}>Optional Add-on Plans</h3>
          <p className={style.addon__title_para}>
            *You must have at least one Licensed user to purchase these Add-on
            plans.
          </p>
        </div>
        <div className={style.addon__agm_container}>
          <div className={style.agm__meeting_left}>
            <div className={style.empty__block}></div>
            <div className={style.agm__title}>Email Credit</div>
            <div className={style.agm__title_sub}>
              Send more Email Campaign to your attendees before, during and
              after your events
            </div>
            <div>
              <CampaignCardList list={emailCampaignList} />
            </div>
            <div className={style.addon__button_box}>
              <div className={style.addon__learn_more}>Learn More</div>
              <button
                className={style.addon__buy_btn}
                onClick={() => history.push("/price/cart")}
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className={style.agm__meeting_right}>
            <div className={style.empty__block_success}></div>
            <div className={style.agm__title}>SMS Credit</div>
            <div className={style.agm__title_sub}>
              Send more SMS Campaign to your attendees before, during and after
              your events
            </div>
            <div>
              <SMSCampaignCardList list={smsCampaignList} />
            </div>
            <div className={style.addon__button_box}>
              <div className={style.addon__learn_more}>Learn More</div>
              <button
                className={style.addon__buy_btn}
                style={{ background: "#19967D" }}
                onClick={() => history.push("/price/cart")}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PricingCardList = ({ list = [] }) => {
  return (
    <React.Fragment>
      {list.map((item, idx) => (
        <PricingCard
          key={idx}
          price={item.price}
          subdescription={item.subdescription}
          details={item.details}
          plan={item.plan}
          isText={item.isText}
        />
      ))}
    </React.Fragment>
  );
};

const PricingCard = ({ price, plan, isText, subdescription, details }) => {
  const history = useHistory();
  return (
    <div className={style.subscription_card}>
      <div className={style.card_header}>
        <div className={style.package_name}>{plan}</div>
        {!isText ? (
          <div className={style.package_amount}>
            <sup>₦</sup>
            {price}
          </div>
        ) : (
          <div className={style.package_title}>{price}</div>
        )}
        <div className={style.package_type}>{subdescription}</div>
      </div>
      <ListFeatureCard list={details} />
      <div className={style.card_bottom}>
        <button
          className={style.subscription_btn}
          onClick={() => history.push("/price/cart")}
        >
          {"Buy Now"}
        </button>
      </div>
    </div>
  );
};

const ListFeatureCard = ({ list = [] }) => {
  return (
    <div className={style.card_body}>
      {list.map((item, idx) => (
        <FeatureCard
          key={idx}
          name={item.name}
          description={item.description}
          available={item.available}
        />
      ))}
    </div>
  );
};

const FeatureCard = ({ name, description, available }) => {
  return (
    <div className={style.card_feature_container}>
      <div className={style.card_feature_list}>
        <span className={style.card_icon}>
          {available ? (
            <FaCheckCircle className={style.card_icon_tick} />
          ) : (
            <FaCheckCircle className={style.card_icon_cancel} />
          )}
        </span>
        <span className={style.card_icon_title}>{name}</span>
      </div>
      <div>
        <span className={style.card_icon_desc}>{description}</span>
      </div>
    </div>
  );
};

const CampaignCard = ({
  credit,
  amount,
  hanldeCardClick,
  id,
  selectedCard,
}) => {
  return (
    <div className={style.campaign_card} onClick={() => hanldeCardClick(id)}>
      <div className={style.campaign_card_top}>
        <FaCheckCircle
          className={
            selectedCard === id
              ? style.card_icon_cancel
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

const CampaignCardList = ({ list = [] }) => {
  const [selectedCard, setSelectedCard] = useState("");
  const hanldeCardClick = (cardId) => {
    setSelectedCard(cardId);
  };
  return (
    <div className={style.campaign_card_list}>
      {list.map((item) => (
        <CampaignCard
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
const SMSCampaignCard = ({
  credit,
  amount,
  hanldeCardClick,
  id,
  selectedCard,
}) => {
  return (
    <div className={style.campaign_card} onClick={() => hanldeCardClick(id)}>
      <div className={style.campaign_card_top}>
        <FaCheckCircle
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

const SMSCampaignCardList = ({ list = [] }) => {
  const [selectedCard, setSelectedCard] = useState("");
  const hanldeCardClick = (cardId) => {
    setSelectedCard(cardId);
  };
  return (
    <div className={style.campaign_card_list}>
      {list.map((item) => (
        <SMSCampaignCard
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
