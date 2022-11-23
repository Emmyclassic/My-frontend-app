import React, { useState } from "react";
import { Modal } from "antd";
import { FaPlay } from "react-icons/fa";

import style from "./index.module.scss";
import "./index.scss";

const Experience = () => {
  const [visible, setVisible] = useState(false);
  return (
    <section className={style.second__main}>
      <div className={style.second__main__wrapper}>
        <div className={style.second__main__header}>
          <h3 className={style.second__main__header__title}>
            Immersive virtual and hybrid events experience
          </h3>
          <div className={style.second__main__text__box}>
            We bring your great and immersive virtual and hybrid event
            experiences in your meetings and events in the best way possible.
          </div>
        </div>
        <div className={style.videoContainer}>
          <div
            className={style.videoContainer_wrap}
            onClick={() => setVisible(true)}
          >
            <span className={style.videoContainer_wrap_iconBox}>
              <FaPlay
                size={20}
                color="gray"
                className={style.videoContainer_wrap_iconBox_icon}
              />
            </span>
          </div>
        </div>
      </div>
      <Modal
        onCancel={() => setVisible(false)}
        destroyOnClose
        closable={false}
        bodyStyle={{ backgroundColor: "rgba(0,0,0, 0.45)", padding: 0 }}
        visible={visible}
        footer={null}
        header={null}
      >
        <div className={style.youtubeContainer}>
          <iframe
            width="100%"
            height="100%"
            src="https://zoom.us/rec/play/eGlMOyvGWUrhbFod7K9DCV7k56Cf9by9UVhszK5hjwot-xeLeirPFN_Cnz9ckWDHcLHDVE7jzP7zoltg.7EovA-VAU_nywiJZ.mp4"
            title="APEMS VIDEO"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </section>
  );
};

export default Experience;
