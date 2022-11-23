import React from "react";
import style from "./index.module.scss";

const FooterCard = ({
  headerIcon,
  title,
  containerStyle,
  containerTitleStyle,
  containerDescStyle,
  description,
}) => {
  const styles = {
    // background: `linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    // url(${backgroundUrl})`,
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
  };

  return (
    <section
      className={style.container_introd}
      style={{ ...styles, ...containerStyle }}
    >
      <div className={style.container_wrapper}>
        <div className={style.content_container}>
          <h1 className={style.container_title} style={containerTitleStyle}>
            {title}
          </h1>
          <div className={style.container_desc} style={containerDescStyle}>
            {description}
          </div>
          <div className={style.icon_image}>
            <img src={headerIcon} alt="icon" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterCard;
