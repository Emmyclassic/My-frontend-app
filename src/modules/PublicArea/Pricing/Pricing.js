import React, { useState } from "react";
import { useHistory } from "react-router";
import classNames from "classnames";

import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import PublicGenericLayout from "../../../components/GenericLayout/PublicGenericLayout";

import style from "./Pricing.module.scss";

const Pricing = () => {
  const history = useHistory();
  const [tab, setTab] = useState("monthly");
  const toggleTab = (tab) => {
    if (tab === "monthly") {
      setTab("monthly");
    }
    if (tab === "yearly") {
      setTab("yearly");
    }
  };
  return (
    <PublicGenericLayout>
      <section className={`${style.pricing}`}>
        <div className={`${style.pricing_wrapper}`}>
          <div className={style.pricing_header}>
            <div className={style.pricing_header_title}>
              Ready to start with{" "}
              <span className={style.comp_name}>APEMS?</span>
            </div>
            <p className={style.comp_name_pack}>
              Choose the package that suits you
            </p>
            <div className={style.tab_box}>
              <div
                onClick={() => toggleTab("monthly")}
                className={classNames(`${style.comp_button}`, {
                  [`${style.tabType}`]: tab === "monthly",
                })}
                // className={`${style.comp_button} ${style.comp_button_month}`}
              >
                Monthly
              </div>
              <div
                onClick={() => toggleTab("yearly")}
                className={classNames(`${style.comp_button}`, {
                  [`${style.tabType}`]: tab === "yearly",
                })}
                // className={`${style.comp_button} ${style.comp_button_year}`}
              >
                Yearly
              </div>
            </div>
          </div>
        </div>

        {tab === "yearly" && (
          <div
            className={`${style.subscription_wrapper} ${style.pricing_wrapper_border}`}
          >
            <div className={style.subscription_card}>
              <div className={style.card_header}>
                <div className={style.package_name}>Basic</div>
                <div className={style.package_amount}>
                  {" "}
                  <sup>₦</sup>20,000
                </div>
                <div className={style.package_type}>For Personal Events</div>
              </div>
              <div className={style.card_body}>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Host up to 100 participants
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Group meetings for up to 40 minutes
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Unlimited one-on-one Meetings
                  </span>
                </div>
              </div>
              <div className={style.card_bottom}>
                <button
                  className={style.subscription_btn}
                  onClick={() => history.push("/price/cart")}
                >
                  {"Sign Up, It's Free!"}
                </button>
              </div>
            </div>
            <div className={style.subscription_card}>
              <div className={style.card_header}>
                <div className={style.package_name}>Pro</div>
                <div className={style.package_amount}>
                  <sup>₦</sup>65,000
                </div>
                <div className={style.package_type}>For Small Teams</div>
              </div>
              <div className={style.card_body}>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle color="#ef3125" />
                  </span>
                  <span className={style.card_icon_title}>
                    Host up to 100 participants
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle color="#ef3125" />
                  </span>
                  <span className={style.card_icon_title}>
                    Increase participants up to 1,000 with Large Meetings add-on
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle color="#ef3125" />
                  </span>
                  <span className={style.card_icon_title}>
                    Group meetings for up to 30 hours
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle color="#ef3125" />
                  </span>
                  <span className={style.card_icon_title}>
                    Social Media Streaming
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle color="#ef3125" />
                  </span>
                  <span className={style.card_icon_title}>Basic Analytics</span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle color="#ef3125" />
                  </span>
                  <span className={style.card_icon_title}>
                    Send Email & SMS
                  </span>
                </div>
              </div>
              <div className={style.card_bottom}>
                <button
                  className={style.subscription_btn}
                  onClick={() => history.push("/price/cart")}
                >
                  {"Buy Now"}
                </button>
              </div>
            </div>
            <div className={style.subscription_card}>
              <div className={style.card_header}>
                <div className={style.package_name}>Business</div>
                <div className={style.package_amount}>
                  <sup>₦</sup>80,000
                </div>
                <div className={style.package_type}>
                  For Small and Medium Businesses
                </div>
              </div>
              <div className={style.card_body}>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaPlusCircle
                      color="#09974D"
                      className={style.card_icon_type}
                    />
                  </span>
                  <span className={style.card_icon_title}>
                    Everything Off{" "}
                    <span className={style.package_name_subtext}>Pro</span>
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Advanced Data Analytics
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Export Data Reports
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Upto 5 Breakout Rooms
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Custom Event Theme
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Recording Available
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Co-host Functionality
                  </span>
                </div>
              </div>
              <div className={style.card_bottom}>
                <button
                  className={style.subscription_btn}
                  onClick={() => history.push("/price/cart")}
                >
                  {"Sign Up, It's Free!"}
                  {/* <span className={style.pro_subscription_btn_text}>
                  {"Sign Up, It's Free!"}
                </span> */}
                </button>
              </div>
            </div>
            <div className={style.subscription_card}>
              <div className={style.card_header}>
                <div className={style.package_name}>Large Business</div>
                <div className={style.package_amount}>
                  <sup>₦</sup>800,000
                </div>
                <div className={style.package_type}>For Large Businesses</div>
              </div>
              <div className={style.card_body}>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaPlusCircle
                      color="#09974D"
                      className={style.card_icon_type}
                    />
                  </span>
                  <span className={style.card_icon_title}>
                    Everything Off{"  "}
                    <span className={style.package_name_subtext}> Pro</span>
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Live Private Messaging
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Real-time Analytics Data
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Multiple Speech to Text Caption
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Live Video Integration
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Searchable Attendee List
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Import Attendee List
                  </span>
                </div>
              </div>
              <div className={style.card_bottom}>
                <button className={style.subscription_btn}>
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "monthly" && (
          <div
            className={`${style.subscription_wrapper} ${style.pricing_wrapper_border}`}
          >
            <div className={style.subscription_card}>
              <div className={style.card_header}>
                <div className={style.package_name}>Basic</div>
                <div className={style.package_amount}>Free</div>
                <div className={style.package_type}>For Personal Events</div>
              </div>
              <div className={style.card_body}>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Host up to 100 participants
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Group meetings for up to 40 minutes
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Unlimited one-on-one Meetings
                  </span>
                </div>
              </div>
              <div className={style.card_bottom}>
                <button
                  className={style.subscription_btn}
                  onClick={() => history.push("/price/cart")}
                >
                  {"Sign Up, It's Free!"}
                </button>
              </div>
            </div>
            <div className={style.subscription_card}>
              <div className={style.card_header}>
                <div className={style.package_name}>Pro</div>
                <div className={style.package_amount}>
                  <sup>₦</sup>25,000
                </div>
                <div className={style.package_type}>For Small Teams</div>
              </div>
              <div className={style.card_body}>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle color="#ef3125" />
                  </span>
                  <span className={style.card_icon_title}>
                    Host up to 100 participants
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle color="#ef3125" />
                  </span>
                  <span className={style.card_icon_title}>
                    Increase participants up to 1,000 with Large Meetings add-on
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle color="#ef3125" />
                  </span>
                  <span className={style.card_icon_title}>
                    Group meetings for up to 30 hours
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle color="#ef3125" />
                  </span>
                  <span className={style.card_icon_title}>
                    Social Media Streaming
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle color="#ef3125" />
                  </span>
                  <span className={style.card_icon_title}>Basic Analytics</span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle color="#ef3125" />
                  </span>
                  <span className={style.card_icon_title}>
                    Send Email & SMS
                  </span>
                </div>
              </div>
              <div className={style.card_bottom}>
                <button
                  className={style.subscription_btn}
                  onClick={() => history.push("/price/cart")}
                >
                  {"Buy Now"}
                </button>
              </div>
            </div>
            <div className={style.subscription_card}>
              <div className={style.card_header}>
                <div className={style.package_name}>Business</div>
                <div className={style.package_amount}>
                  <sup>₦</sup>50,000
                </div>
                <div className={style.package_type}>
                  For Small and Medium Businesses
                </div>
              </div>
              <div className={style.card_body}>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaPlusCircle
                      color="#09974D"
                      className={style.card_icon_type}
                    />
                  </span>
                  <span className={style.card_icon_title}>
                    Everything Off{" "}
                    <span className={style.package_name_subtext}>Pro</span>
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Advanced Data Analytics
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Export Data Reports
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Upto 5 Breakout Rooms
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Custom Event Theme
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Recording Available
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Co-host Functionality
                  </span>
                </div>
              </div>
              <div className={style.card_bottom}>
                <button className={style.subscription_btn}>
                  {"Sign Up, It's Free!"}
                  {/* <span className={style.pro_subscription_btn_text}>
                  {"Sign Up, It's Free!"}
                </span> */}
                </button>
              </div>
            </div>
            <div className={style.subscription_card}>
              <div className={style.card_header}>
                <div className={style.package_name}>Large Business</div>
                <div className={style.package_amount}>
                  <sup>₦</sup>500,000
                </div>
                <div className={style.package_type}>For Large Businesses</div>
              </div>
              <div className={style.card_body}>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaPlusCircle
                      color="#09974D"
                      className={style.card_icon_type}
                    />
                  </span>
                  <span className={style.card_icon_title}>
                    Everything Off{"  "}
                    <span className={style.package_name_subtext}> Pro</span>
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Live Private Messaging
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Real-time Analytics Data
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Multiple Speech to Text Caption
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Live Video Integration
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Searchable Attendee List
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span className={style.card_icon_title}>
                    Import Attendee List
                  </span>
                </div>
              </div>
              <div className={style.card_bottom}>
                <button className={style.subscription_btn}>
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`${style.pricing_wrapper} ${style.pricing_wrapper_agm}`}
        >
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
              <div className={style.agm__title}>
                Annual General Meeting (AGM)
              </div>
              <div className={style.agm__title_sub}>
                Starting at ₦75,000 per year
              </div>
              <div className={style.agm__main_para}>
                Aliquam faucibus, odio nec commodo aliquam, neque felis placerat
                dui, a porta ante lectus dapibus est. Aliquam a bibendum mi, sed
                condimentum est.
              </div>
              <div className={style.agm__feature_list}>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span
                    className={`${style.card_icon_title} ${style.card_icon_title_agm}`}
                  >
                    Neque felis placerat dui, a porta ante lectus dapibus est.
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span
                    className={`${style.card_icon_title} ${style.card_icon_title_agm}`}
                  >
                    Neque felis placerat dui, a porta ante lectus dapibus est.
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span
                    className={`${style.card_icon_title} ${style.card_icon_title_agm}`}
                  >
                    Neque felis placerat dui, a porta ante lectus dapibus est.
                  </span>
                </div>
              </div>
              <div className={style.addon__button_box}>
                <div className={style.addon__learn_more}>Learn More</div>
                <button className={style.addon__buy_btn}>Buy Now</button>
              </div>
            </div>
            <div className={style.agm__meeting_right}>
              <div className={style.empty__block_success}></div>
              <div className={style.agm__title}>Shows & Concert</div>
              <div className={style.agm__title_sub}>
                Starting at ₦50,000 per year
              </div>
              <div className={style.agm__main_para}>
                Aliquam faucibus, odio nec commodo aliquam, neque felis placerat
                dui, a porta ante lectus dapibus est. Aliquam a bibendum mi, sed
                condimentum est.
              </div>
              <div className={style.agm__feature_list}>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span
                    className={`${style.card_icon_title} ${style.card_icon_title_agm}`}
                  >
                    Neque felis placerat dui, a porta ante lectus dapibus est.
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span
                    className={`${style.card_icon_title} ${style.card_icon_title_agm}`}
                  >
                    Neque felis placerat dui, a porta ante lectus dapibus est.
                  </span>
                </div>
                <div className={style.card_feature_list}>
                  <span className={style.card_icon}>
                    <FaCheckCircle className={style.card_icon_type} />
                  </span>
                  <span
                    className={`${style.card_icon_title} ${style.card_icon_title_agm}`}
                  >
                    Neque felis placerat dui, a porta ante lectus dapibus est.
                  </span>
                </div>
              </div>
              <div className={style.addon__button_box}>
                <div className={style.addon__learn_more}>Learn More</div>
                <button className={style.addon__buy_btn}>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicGenericLayout>
  );
};

export default Pricing;
