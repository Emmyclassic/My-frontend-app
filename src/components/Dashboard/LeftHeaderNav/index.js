import React from "react";
import { useDispatch } from "react-redux";

import style from "./index.module.scss";
import { togglePrivateSidebar } from "../../../actions/uiAction";

const DashboardLeftHeaderNav = ({
  title,
  subtitle,
  containerStyle,
  titleStyle,
  subTitleStyle,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={style.container} style={{ ...containerStyle }}>
      <h4
        className={style.container__title}
        style={{ ...titleStyle }}
        onClick={() => dispatch(togglePrivateSidebar(true))}
      >
        {title}
      </h4>
      <div className={style.container__subtitle} style={{ ...subTitleStyle }}>
        {subtitle}
      </div>
    </div>
  );
};

export default DashboardLeftHeaderNav;
