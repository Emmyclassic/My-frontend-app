import { Alert } from "antd";
import React from "react";
import shortid from "shortid";

const AlertResponse = ({ data, status, onClose, message }) => {
  if (
    data &&
    (typeof data === "string" || typeof data === "object") &&
    status === "success"
  ) {
    const successMsg = typeof data === "object" ? message : data;
    return (
      <Alert
        message={successMsg}
        type="success"
        showIcon
        closable
        onClose={onClose}
      />
    );
  }
  if (data && typeof data === "string" && status === "fail") {
    return (
      <Alert message={data} type="error" showIcon closable onClose={onClose} />
    );
  } else if (data && typeof data === "object" && status === "fail") {
    // return (
    //   <Alert
    //     key={shortid.generate()}
    //     message={data.message}
    //     type="error"
    //     showIcon
    //     closable
    //     onClose={onClose}
    //   />
    // );
    const errors = Object.values(data.errors);
    return errors.map((err) => (
      <Alert
        key={shortid.generate()}
        message={err}
        type="error"
        showIcon
        closable
        onClose={onClose}
      />
    ));
  } else {
    return <div />;
  }
};

export default AlertResponse;
