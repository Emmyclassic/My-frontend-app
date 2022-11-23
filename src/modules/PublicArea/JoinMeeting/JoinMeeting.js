import React from "react";
import { ImVideoCamera } from "react-icons/im";
import { AiFillAudio } from "react-icons/ai";
import { FaCaretRight } from "react-icons/fa";
import { SiAirplayaudio } from "react-icons/si";

import PublicGenericLayout from "../../../components/GenericLayout/PublicGenericLayout";

import style from "./JoinMeeting.module.scss";

const JoinMeeting = () => {
  return (
    <PublicGenericLayout>
      <section className={style.joinMeeting_container}>
        <div className={style.joinMeeting_wrapper}>
          <div className={style.joinMeeting_wrapper_left}>
            <div className={style.joinMeeting_wrapper_left_box}>
              <div className={style.meeting__text_section}>
                How do you want to join APEMS?
              </div>
              <div className={style.meeting__section_para}>
                {`Don't worry, you can always switch between different modes during
              your meeting.`}
              </div>
              <div className={style.blur_block_red}></div>
            </div>
          </div>
          <div className={style.joinMeeting_wrapper_right}>
            <div className={style.meeting_btn_box}>
              <span className={style.meeting_btn_icon}>
                <ImVideoCamera color="#F6BDBA" size={40} />
              </span>
              <div className={style.meeting_btn_text_box}>
                <h5 className={style.meeting_btn_text_header}>Video View</h5>
                <p className={style.meeting_btn_text_para}>
                  Join meeting with the video enabled.
                </p>
              </div>
            </div>
            <div className={style.meeting_btn_box}>
              <span className={style.meeting_btn_icon}>
                <AiFillAudio color="#F6BDBA" size={40} />
              </span>
              <div className={style.meeting_btn_text_box}>
                <h5 className={style.meeting_btn_text_header}>Podcast View</h5>
                <p className={style.meeting_btn_text_para}>
                  Join meeting with audio only, video and slides will be
                  disabled.
                </p>
              </div>
            </div>
            <div className={style.meeting_btn_box}>
              <span className={style.meeting_btn_icon}>
                <SiAirplayaudio color="#F6BDBA" size={40} />
              </span>
              <div className={style.meeting_btn_text_box}>
                <h5 className={style.meeting_btn_text_header}>
                  Podcast & Slide View
                </h5>
                <p className={style.meeting_btn_text_para}>
                  Join meeting with audio only and slides alone, video will be
                  disabled.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.avatar_help_container}>
          <div className={style.section__support}>
            <div className={style.support__box}>
              <img
                src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940352/apems/photo2_ueuxtt.webp"
                className={style.avatar__image}
              />

              <div className={style.support__right}>
                <span className={style.support__right__span1}>
                  Need Support?
                </span>
                <div className={style.support__right__span2}>
                  <span className={style.support__right__span2_text}>
                    Talk to our experts
                  </span>{" "}
                  <span className={style.support__right__span2_icon}>
                    <FaCaretRight color="red" size={20} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicGenericLayout>
  );
};

export default JoinMeeting;
