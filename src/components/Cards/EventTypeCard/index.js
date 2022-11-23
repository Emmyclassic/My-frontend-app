import React from "react";
import { useHistory } from "react-router";
import style from "./index.module.scss";

const EventTypeCard = ({ icon, title, subtitle, containerStyle, id }) => {
  const history = useHistory();

  const pageName = {
    conf: "event/corperate",
    agm: "event/create",
    concert: "event/concert",
  };

  const pageUrl = (name) => {
    console.log("name", name);
    if (name === "Concerts/Shows/Festivals") {
      return pageName.concert;
    } else if (name === "Annual-General-Meetings") {
      return pageName.agm;
    } else {
      return pageName.conf;
    }
  };
  return (
    <div
      className={style.meeting_btn_box}
      style={{ ...containerStyle }}
      onClick={() => history.push(`/${pageUrl(title)}/${id}`)}
    >
      <span className={style.meeting_btn_icon}>{icon}</span>
      <div className={style.meeting_btn_text_box}>
        <h5 className={style.meeting_btn_text_header}>{title}</h5>
        <p className={style.meeting_btn_text_para}>{subtitle}</p>
      </div>
    </div>
  );
};

export default EventTypeCard;
