import React from "react";
import { BsFillImageFill } from "react-icons/bs";
import style from "./index.module.scss";
const UploadButton = ({
  subTitle = "Supports: jpg, png. Dimension: 2000*1000",
  title = "Drag your image here, or",
}) => {
  return (
    <div className={style.upload_box}>
      <BsFillImageFill size={25} color="#ef3125" />
      <div style={{ marginTop: 8 }}>
        <div className={style.uploadContent}>
          <span className={style.uploadContent_one}>{title}</span>
          <span className={style.uploadContent_two}> browse</span>
        </div>
        <span className={style.uploadDimension}>{subTitle}</span>
      </div>
    </div>
  );
};

export default UploadButton;
