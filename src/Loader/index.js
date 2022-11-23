import React from "react";
import Loader from "react-loader-spinner";
import "./index.scss";

const Spinner = ({ visibe, type = "TailSpin" }) => {
  if (visibe) {
    return (
      <div className="loader">
        <Loader type={type} color="#ffc107" height={50} width={50} />
      </div>
    );
  }
  return null;
};
export default Spinner;
