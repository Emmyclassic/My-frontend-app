import React from "react";
import { Modal } from "antd";
import { MdClose } from "react-icons/md";
import proTypes from "prop-types";

import "antd/dist/antd.css";
import style from "./AuthModal.module.scss";

const AuthModal = ({ children, visible, closeModal }) => {
  return (
    <Modal
      style={{}}
      visible={visible}
      // onOk={() => setVisible(false)}
      onCancel={() => closeModal(false)}
      width={"100vw"}
      className={style.modal_open}
      // bodyStyle={{ height: "100vh" }}
      footer={null}
      header={null}
      zIndex="12000"
      position="relative"
      closeIcon={
        <span
          className={style.closeModal}
          style={{
            position: "absolute",
            top: "-70%",
            right: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            zIndex: 100000,
          }}
        >
          <MdClose color="#5C6574" />
        </span>
      }
    >
      {" "}
      {children}
    </Modal>
  );
};
AuthModal.defaultProps = {
  visible: false,
};
AuthModal.proTypes = {
  visible: proTypes.bool,
  children: proTypes.node.isRequired,
  closeModal: proTypes.func,
};
export default AuthModal;
