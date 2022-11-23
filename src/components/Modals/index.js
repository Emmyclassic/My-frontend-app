import { Modal } from "antd";
import React from "react";
import { MdClose } from "react-icons/md";
import style from "./index.module.scss";

const CustomModal = ({ closeModal, visible, children }) => {
  return (
    <Modal
      style={{
        width: "100%",
        maxWidth: "100%",
        position: "absolute",
        left: "10%",
        top: 0,
      }}
      visible={visible}
      onCancel={() => closeModal(false)}
      width={"80%"}
      bodyStyle={{
        height: "110vh",
        position: "relative",
      }}
      footer={null}
      header={null}
      position="relative"
      closeIcon={
        <span
          className={style.closeModal}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#CED0D5",
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            marginTop: "3rem",
          }}
        >
          <MdClose color="#000" />
        </span>
      }
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
