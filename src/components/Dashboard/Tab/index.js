import React from "react";
import propTypes from "prop-types";
import style from "./index.module.scss";

const Tab = ({ list, handleTabClick, active }) => {
  return (
    <div className={style.tab_container}>
      {list.map((tab) => (
        <div
          className={tab.title === active ? style.tab_active : style.tab}
          key={tab.id}
          onClick={() => handleTabClick(tab.title)}
        >
          {tab.title}
        </div>
      ))}
    </div>
  );
};

Tab.propTypes = {
  handleTabClick: propTypes.func,
  list: propTypes.array,
  active: propTypes.string,
};

export default Tab;
