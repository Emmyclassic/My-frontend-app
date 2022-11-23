import moment from "moment";
import React from "react";
import { MdModeEdit } from "react-icons/md";
import style from "./index.module.scss";

const ResolutionItem = ({
  item,
  count,
  onClick,
  closeTemplate,
  keyword = "Resolution",
}) => {
  console.log({ item });
  const handleClick = () => {
    if (closeTemplate) {
      closeTemplate();
    }

    if (onClick) {
      onClick();
    }
  };
  return (
    <>
      <div className={style.pollContainer} onClick={handleClick}>
        <div className={style.pollDesc}>
          <div className={style.pollDesc_header}>
            <span className={style.pollDesc_header_title}>
              {`${keyword} ${count}`}
            </span>
            <span className={style.pollDesc_header_icon}>
              <MdModeEdit color="#09974D" />
            </span>
          </div>
          <div className={style.pollDesc_body}>{item.title}</div>
          {item.duration ? (
            <div className={style.pollDate}>
              {moment(item.duration, "HH:mm:ss").format("LT")}
            </div>
          ) : (
            <div className={style.pollDate}>
              {moment(item.starts_at, "DD-MM-YYYY").format("DD MMMM YYYY")}
            </div>
          )}
        </div>
      </div>
      {item.candidates && item.candidates.length
        ? item.candidates.map((item) => (
            <div className={style.candidWrap} key={item.id}>
              <img src={item.photo} className={style.candidPhoto} />
              <div className={style.candInfoCont}>
                <span className={style.candidName}>{item.name}</span>
                <span className={style.editProf} onClick={handleClick}>
                  Edit Profile
                </span>
              </div>
            </div>
          ))
        : null}
    </>
  );
};

export default ResolutionItem;
