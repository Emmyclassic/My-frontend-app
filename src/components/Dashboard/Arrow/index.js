import React from "react";
import style from "./index.module.scss";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";

function Arrow({ icon }) {
  const history = useHistory();
  return (
    <div className={style.container}>
      <span
        className={style.container__setting}
        onClick={() => history.goBack()}
      >
        {icon || <RiArrowLeftSLine color="#100F1E" size="18" />}
      </span>
    </div>
  );
}

export default Arrow;
