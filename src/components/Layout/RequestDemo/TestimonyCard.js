import React from "react";
import style from "./RequestDemo.module.scss";

const TestimonyCard = ({ item }) => {
  return (
    <div className={style.about__brandy}>
      <div className={style.about__brandy_box}>
        <div className={style.about__avatar}>
          <span className={style.about__avatar_name}>{item.name}</span>
        </div>
      </div>
      <div className={style.short_brand_desc}>{item.testimony}</div>
    </div>
  );
};
export default TestimonyCard;
