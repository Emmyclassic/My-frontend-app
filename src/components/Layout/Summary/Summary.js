import React from "react";
// import { FaCaretRight } from "react-icons/fa";
// import { AiOutlineLike } from "react-icons/ai";

import style from "./Summary.module.scss";
const Summary = () => {
  return (
    <section className={style.second__main}>
      <div className={style.second__main__wrapper}>
        <div className={style.second__main__header}>
          <h3 className={style.second__main__header__title}>
            Create amazing virtual and hybrid events
          </h3>
          <div className={style.second__main__text__box}>
            Make organizing conferences, meetings, and trade shows easy with
            APEMS. Our platform guarantees a high level of engagement through
            features such as
          </div>
        </div>
        <div className={style.second__main__body}>
          <div className={style.left__aside}>
            <h6 className={style.left__aside__subtitle}>
              Most interactive event yet
            </h6>
            <h4 className={style.left__aside__title}>
              The first all-in-one event platform optimized for connecting
            </h4>
            <p className={style.left__aside__content}>
              Virtual event experience is so much more than just a live video.
              That’s why you can build a full agenda on our platform, where
              multiple sessions are running simultaneously and attendees are
              interacting with your specified content. Speakers are provided
              with a lot of features, for a smooth and successful experience.
            </p>
          </div>

          <div className={style.right__aside__box}>
            <div className={style.right__aside__people_box}>
              <div className={style.right__aside__behind_box}></div>
              <div className={style.second__base__perspective_first}>
                <h5 className={style.second__placeholder_title}>
                  AfricaPrudential Meeting
                </h5>

                <div className={style.second__placeholder_item1}></div>
                <div className={style.second__placeholder_item2}></div>
              </div>
            </div>

            <img
              src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940336/apems/conf-people1_qnvsyl.webp"
              alt="photo one"
              className={`${style.right__aside__user__list} ${style.right__aside__user__list_left}`}
            />

            <img
              src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940352/apems/photo2_ueuxtt.webp"
              alt="avatar"
              className={`${style.right__aside__user__list} ${style.right__aside__user__list_right}`}
            />
            <img
              src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940357/apems/wilson_rngkbh.webp"
              alt="wilson"
              className={`${style.right__aside__user__list} ${style.right__aside__user__list_top}`}
            />
          </div>
        </div>
        <div className={style.second__main__body_second}>
          <div className={style.right__aside}>
            <div className={style.second__aside__photo__box}>
              <img
                src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940353/apems/tahiti_qonivx.webp"
                alt="Tahili"
                className={style.right__aside__photo_second}
              />
              <div className={style.name__avatar__box}>
                <span className={style.name__avatar__box__avatar}>AD</span>
                <span className={style.name__avatar__box__avatar}>AD</span>
                <span className={style.name__avatar__box__avatar}>AD</span>
              </div>
            </div>
            <div className={style.right__aside__photo__box_second}>
              <div className={style.second__base__perspective}>
                <h5 className={style.second__placeholder_title}>
                  AfricaPrudential Meeting
                </h5>

                <div className={style.second__placeholder_item1}></div>
                <div className={style.second__placeholder_item2}></div>
              </div>
            </div>
            <div className={style.right__aside__photo__box_second_wrap}>
              <div className={style.right__aside__photo__box_second_hide}>
                <h5 className={style.second__placeholder_title}>2 Co-ask</h5>
                <div className={style.second__group__avatar_box}>
                  <div className={style.second__group__avatar}>
                    <img
                      src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940357/apems/wilson_rngkbh.webp"
                      className={style.second__aside__photo_round}
                      alt="wilson"
                    />
                    <span
                      className={style.second__placeholder_item1_round}
                    ></span>
                  </div>
                  <div className={style.second__group__avatar}>
                    <img
                      src={
                        "https://res.cloudinary.com/solomonfrank/image/upload/v1655940336/apems/conf-people1_qnvsyl.webp"
                      }
                      className={style.second__aside__photo_round}
                      alt="wilson"
                    />
                    <span
                      className={style.second__placeholder_item1_round}
                    ></span>
                  </div>
                </div>
              </div>
              <div className={style.right__aside__photo__box_second_hide}>
                <h5 className={style.second__placeholder_title}>
                  Ticket Price
                </h5>
                <div className={style.second__placeholder_wrap}>
                  <span className={style.left__third__placeholder}></span>{" "}
                  <span className={style.left__third__placeholder_amt}>
                    NGN 10,000
                  </span>
                </div>
                <div className={style.left__third__placeholder1}></div>
              </div>
            </div>
          </div>
          <div className={`${style.left__aside} ${style.left__aside_next}`}>
            <h6 className={style.left__aside__subtitle}>
              A next-generation virtual event platform
            </h6>
            <h4 className={`${style.left__aside__title}`}>
              Everything you need in one place
            </h4>
            <p
              className={`${style.left__aside__content} ${style.left__aside__title_dash}`}
            >
              Just like we always delivered at Africaprudential, our platform
              guarantees a high level of engagement. Through features such as
              ticketing, live Q&As and polls, one-on-one & peer chats, the
              social feed, and quick surveys, everyone at your event will be
              interacting together while you can monitor all of that on your own
              real-time analytics dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
