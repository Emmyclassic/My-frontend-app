import React from "react";
import { MdModeEdit } from "react-icons/md";
import { ApLogo } from "../ApemLogo/ApemsLogo";
import IconButton from "../Buttons/IconButton";
import style from "./index.module.scss";

const EditableBanner = ({
  handleClick,
  showIcon = true,
  bannerUrl,
  logoUrl,
}) => {
  const styles = {
    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bannerUrl})`,
  };

  return (
    <div className={style.container} style={styles}>
      <ApLogo logoUrl={logoUrl} customStyle={{ width: "100%" }} />

      {showIcon && (
        <div className={style.card__editBox} onClick={handleClick}>
          <IconButton
            containerStyle={style.btnBg}
            rightIcon={<MdModeEdit color="#09974D" />}
          />
        </div>
      )}
    </div>
  );
};

export default EditableBanner;
