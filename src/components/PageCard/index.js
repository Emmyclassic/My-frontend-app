import React from "react";

import style from "./index.module.scss";

const PageCard = ({
  backgroundUrl,
  title,
  description,
  pageName,
  containerStyle,
  pageNameStyle,
  containerTitleStyle,
  containerDescStyle,
  leftSideStyle,
  footerTitle,
}) => {
  const styles = {
    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(${backgroundUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <section
      className={style.container_introd}
      style={{ ...styles, ...containerStyle }}
    >
      <div className={style.leftSide} style={{ ...leftSideStyle }}>
        <div className={style.container_pageName} style={pageNameStyle}>
          {pageName}
        </div>
        <h1 className={style.container_title} style={containerTitleStyle}>
          {title}
        </h1>
        <div className={style.container_desc} style={containerDescStyle}>
          {description}
        </div>

        <div className={style.footerTitle}>{footerTitle}</div>
      </div>

      <div className={style.rightSide}>
        <img
          src={
            "https://res.cloudinary.com/solomonfrank/image/upload/v1655940344/apems/Group43_b0uq89.svg"
          }
          className={style.rightSide_img}
        />
      </div>
    </section>
  );
};

export default PageCard;
