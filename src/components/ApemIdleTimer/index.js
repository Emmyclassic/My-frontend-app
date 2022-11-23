import React from "react";
import { Modal } from "antd";
import style from "./index.module.scss";
import { useHistory } from "react-router-dom";

function ApemIdleTimer({ idleModalOpen, setIdleModalOpen }) {
  const history = useHistory();
  const clear = () => {
    if (localStorage.getItem("data")) {
      localStorage.removeItem("data");
      history.push("/");
    }
  };
  return (
    <div className={style.modal}>
      <Modal
        title={
          <div className={style.title}>
            <h1>
              Your have been logged out due to inactivity. Please sign in again
              to continue.
            </h1>
          </div>
        }
        centered
        footer={null}
        onCancel={() => {
          clear();
          setIdleModalOpen(false);
        }}
        visible={idleModalOpen}
        closable={true}
      ></Modal>
    </div>
  );
}
export default ApemIdleTimer;
