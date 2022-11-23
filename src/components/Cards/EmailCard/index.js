import React from "react";
import { useHistory } from "react-router-dom";
import style from "./index.module.scss";

function EmailCard({ title, desc }) {
  const history = useHistory();
  return (
    <div
      className={style.container}
      onClick={() => history.push("/Email/edit")}
    >
      <div className={style.top_container}>
        <div className={style.top_container_top}>
          <div className={style.top_container_box}></div>
        </div>
        <div className={style.top_container_bottom}>
          <div className={style.top_container_bottom_box1}></div>
          <div className={style.top_container_bottom_box1}></div>
        </div>
      </div>
      <div className={style.bottom_container}>
        <h6>{title || `Make Announcement`}</h6>
        <p>{desc || `Lorem ipsum dolor sit amet, consectetur adipiscing`}</p>
      </div>
    </div>
  );
}

export default EmailCard;
