import React from "react";
import { Modal } from "antd";
import style from "../Election0Observer/index.module.scss";
export const CreateObservers = () => {
  return (
    <div>
      <form className={style.form}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" id="" placeholder="email" />
        <input type="number" name="number" id="" placeholder="number" />
        <input type="text" name="organization" placeholder="organization" />
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

const ObserverModal = ({ openObserverModal, setOpenObserverModal }) => {
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenObserverModal(false);
  };
  return (
    <Modal
      title="Create Observer"
      visible={openObserverModal}
      onCancel={handleCancel}
      footer={null}
    >
      <CreateObservers />
    </Modal>
  );
};

export default ObserverModal;
