import React from "react";

import style from "./index.module.scss";

const PeopleEvent = ({
  people,
  meetingEvent,
  imageContainer,
  descContainer,
  descContainer2,
  descContainer_wrapper,
  imageUrl,
  title,
  description,
}) => {
  return (
    <div className={style.meetingEvent} style={meetingEvent}>
      <section className={style.people} style={people}>
        <div className={style.imageContainer} style={imageContainer}>
          <img src={imageUrl} className={style.imageContainer_img} />
        </div>
        <div
          className={`${style.descContainer} ${
            descContainer2 && style.descContainer2
          }`}
          style={descContainer}
        >
          <div
            className={style.descContainer_wrapper}
            style={descContainer_wrapper}
          >
            <div className={style.descContainer_title}>{title}</div>
            <div className={style.descContainer_desc}>{description}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PeopleEvent;
