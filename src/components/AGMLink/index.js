import React from "react";
import InviteLink from "../InviteLink";
import VideoCard from "../VideoCard";
import style from "./index.module.scss";

const AGMLink = ({
  title = "AGM Link",
  description = "Use the link below to project your event on YouTube, Facebook etc",
  showFooter,
  link,
}) => {
  return (
    <div className={style.container}>
      <h4>{title}</h4>

      <VideoCard showIcon={false} />
      {!showFooter && (
        <>
          <div className={style.container_desc}>{description}</div>
          <InviteLink
            buttonStyle={{ backgroundColor: "#09974D" }}
            link={link}
          />
        </>
      )}
    </div>
  );
};

export default AGMLink;
