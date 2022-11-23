import React from "react";
import style from "./Features.module.scss";

const Features = () => {
  return (
    <section className={style.third__main}>
      <div className={style.third__main__wrapper}>
        <div className={style.third__main__title_box}>
          <h4 className={style.third__main__title}>
            Empowering event organizers create the most engaging and reliable
            virtual events
          </h4>
          <p className={style.third__main__subtitle}>
            Create events with unlimited possibilities and enjoy a unique
            experience each time
          </p>
        </div>
        <div className={style.third__main__features}>
          <div className={style.third__main__features__wrap}>
            <div className={style.third__main__features__card}>
              <div className={style.third__main__features__card_icon}>
                <img
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940350/apems/message_qt9wv2.svg"
                  className={style.main__feature_icon_logo}
                  alt="Schedule Track Events"
                />
              </div>
              <h5 className={style.third__main__features__card_title}>
                Schedule Track Events
              </h5>
              <div className={style.third__main__features__card_content}>
                Remain updated about events, meeting times, and ongoing sessions
              </div>
            </div>

            <div
              className={`${style.third__main__features__card} ${style.third__main__features__card_ps}`}
            >
              <div className={style.third__main__features__card_icon}>
                <img
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940350/apems/options_qqsfvj.svg"
                  className={style.main__feature_icon_logo}
                  alt="Hybrid Events"
                />
              </div>
              <h5 className={style.third__main__features__card_title}>
                Hybrid Events
              </h5>
              <div className={style.third__main__features__card_content}>
                Host online guests and physical guests simultaneously in one
                synchronized event
              </div>
            </div>
            <div className={style.third__main__features__card}>
              <div className={style.third__main__features__card_icon}>
                <img
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940355/apems/verified_vjylcf.svg"
                  className={style.main__feature_icon_logo}
                  alt="Live Questions"
                />
              </div>
              <h5 className={style.third__main__features__card_title}>
                Live Questions & Polls
              </h5>
              <div className={style.third__main__features__card_content}>
                Ask opinions and get instant responses from all your guests in
                real-time
              </div>
            </div>

            <div className={style.third__main__features__card}>
              <div className={style.third__main__features__card_icon}>
                <img
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940341/apems/credit-card_dprwtr.png"
                  className={style.main__feature_icon_logo}
                  alt="Sell Tickets"
                />
              </div>
              <h5 className={style.third__main__features__card_title}>
                Sell Tickets & Collect Payment
              </h5>
              <div className={style.third__main__features__card_content}>
                Sell tickets and get paid directly into your bank account.
              </div>
            </div>

            <div
              className={`${style.third__main__features__card} ${style.third__main__features__card_ps}`}
            >
              <div className={style.third__main__features__card_icon}>
                <img
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940353/apems/speech-bubble_wr44pp.png"
                  className={style.main__feature_icon_logo}
                  alt="Analytics"
                />
              </div>
              <h5 className={style.third__main__features__card_title}>
                Analytics & Report
              </h5>
              <div className={style.third__main__features__card_content}>
                View real-time analytics and reports of your events on the go
              </div>
            </div>
            <div className={style.third__main__features__card}>
              <div className={style.third__main__features__card_icon}>
                <img
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940347/apems/location_ejhdjg.png"
                  className={style.main__feature_icon_logo}
                  alt="Easy Setup"
                />
              </div>
              <h5 className={style.third__main__features__card_title}>
                Easy Setup
              </h5>
              <div className={style.third__main__features__card_content}>
                Set up your event in 3-5 easy steps and create a memorable
                experience for your participants
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
