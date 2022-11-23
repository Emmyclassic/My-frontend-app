import React from "react";
import style from "./index.module.scss";

const CircularAvatar = ({
  title = "John Doe",
  imageUrl = "https://res.cloudinary.com/solomonfrank/image/upload/v1655940353/apems/tahiti_qonivx.webp",
  item,
}) => {
  return (
    <div className={style.container}>
      <img src={imageUrl} alt="panelist" className={style.container_img} />
      <div className={style.container_title}>{title}</div>
    </div>
  );
};

export default CircularAvatar;
