import React from "react";
// import { TiFolder } from "react-icons/ti";
import { RiCloseCircleFill } from "react-icons/ri";
// import { FcOpenedFolder } from "react-icons/fc";

import style from "./index.module.scss";
import "./index.scss";

const DocumentItem = ({
  icon,
  title = "AGM Documents",
  date = "2017",
  handleClick,
  imageUrl,
  deleteFolder,
  showSetting,
  showDelete,
}) => {
  return (
    <div className={style.container}>
      {showDelete && (
        <span className={style.removeIconBox} onClick={deleteFolder}>
          <RiCloseCircleFill size={20} className={style.removeIcon} />
        </span>
      )}

      <img src={imageUrl} className="folder_close" onClick={handleClick} />
      <span className={style.container_icon}>
        {/* <FcOpenedFolder size={100} color="#ccc" /> */}
        {/* <Folder className="folder_close" /> */}
      </span>
      <div className={style.container_footer}>
        <div className={style.container_footerTitle}>{title}</div>
        {/* <div className={style.container_footerSub}>({date})</div> */}
      </div>
    </div>
  );
};

export default DocumentItem;
