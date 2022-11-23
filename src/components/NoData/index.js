import React from "react";
import Svg from "react-inlinesvg";

import styles from "./index.module.scss";

const NoData = ({ description = "No Data available", containerStyle }) => {
  return (
    <div className={styles.notFound} style={containerStyle}>
      <Svg
        src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940341/apems/empty_zwtiyi.svg"
        style={{ width: "60%", height: "60%" }}
      />
      <div className={styles.desc}>{description}</div>
    </div>
  );
};

export default NoData;
