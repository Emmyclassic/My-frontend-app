import React from "react";

import style from "./UserAvatar.module.scss";

const UserAvatar = ({ imageUrl, upperTitle, lowerTitle }) => {
  return (
    <div className={style.section__support}>
      <div className={style.support__box}>
        <img src={imageUrl} className={style.avatar__image} />

        <div className={style.support__right}>
          <span className={style.support__right__span1}>{upperTitle}</span>
          <span className={style.support__right__span2}>{lowerTitle}</span>
        </div>
      </div>
    </div>
  );
};
UserAvatar.defaultProps = {
  imageUrl:
    "https://res.cloudinary.com/solomonfrank/image/upload/v1655940352/apems/photo2_ueuxtt.webp",
};

export default UserAvatar;
