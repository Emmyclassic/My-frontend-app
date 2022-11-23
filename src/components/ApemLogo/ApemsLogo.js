import React from "react";
import style from "./ApemsLogo.module.scss";
import Svg from "react-inlinesvg";

const ApemsLogo = (props) => {
  const styles = {
    ...props.style,
  };
  return (
    <img
      src={
        props.logoUrl ||
        "https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/Apems-logo_iu3uju.webp"
      }
      alt="APEMS logo"
      className={style.header__logo_img}
      style={styles}
    />
  );
};
export const ApemsLogoWhite = (props) => {
  const styles = {
    ...props.style,
  };
  return (
    <img
      src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/apemWhiteLogo_wqpwq1.png"
      alt="APEMS logo"
      className={style.header__logo_img}
      style={styles}
    />
  );
};

export const ApLogo = ({ logoUrl, customStyle, containerStyle }) => {
  return (
    <span className={style.apLogoBox} style={{ ...containerStyle }}>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="logo"
          className={style.header__logo_img}
          style={{ ...customStyle }}
        />
      ) : (
        <Svg src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/logo_uu5c7n.svg" />
      )}
    </span>
  );
};

export default ApemsLogo;
