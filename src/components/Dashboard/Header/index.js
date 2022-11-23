import React from "react";
import style from "./index.module.scss";

const Header = ({ leftNav, RightNav }) => {
  return (
    <div className={style.header}>
      {leftNav}
      {RightNav}
    </div>
  );
};

export default Header;
