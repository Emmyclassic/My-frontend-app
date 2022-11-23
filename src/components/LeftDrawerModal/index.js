import { Modal } from "antd";
import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import style from "./index.module.scss";

const closeIcon = ({ left = "-960%", top = "50%" }) => {
  return (
    <span
      className={style.closeModal}
      style={{
        position: "absolute",
        top,
        left,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        height: "40px",
        width: "40px",
        borderRadius: "50%",
        zIndex: 100000,
      }}
    >
      <MdClose color="#fff" />
    </span>
  );
};

const LeftDrawerModal = ({
  visible,
  closeModal,
  drawerWidth = "38%",
  tagName = "",
  headerTitle,
  destroyOnClose,
  deleteResource,
  closeIcon: CloseIcon = closeIcon,
  children,
  resourceTitle = "Document",
  deleteAllHandler,
  modalHeight = "100%",
  top,
  left,
}) => {
  const [screen, setScreen] = useState(window.innerWidth);
  const checkMobile = () => {
    if (screen < 1200) {
      return true;
    } else {
      return false;
    }
  };
  const [mobile, setMobile] = useState(checkMobile);

  useEffect(() => {
    function handleResize() {
      setScreen(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    setMobile(checkMobile());
    return () => window.removeEventListener("resize", handleResize);
  }, [screen]);

  return (
    <Modal
      style={{
        width: "100%",
        maxWidth: "100%",
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: "99999999",
      }}
      visible={visible}
      destroyOnClose={destroyOnClose}
      onCancel={closeModal}
      width={mobile ? "100%" : drawerWidth}
      bodyStyle={{
        height: modalHeight,
        position: "relative",
        zIndex: "99999999",
      }}
      footer={null}
      header={null}
      height={modalHeight}
      position="relative"
      closeIcon={<CloseIcon top={top} left={left} />}
    >
      <section className={style.container}>
        <span className={style.container_badge}>{tagName}</span>
        <div className={style.mainHeader}>
          {headerTitle && (
            <h3 className={style.container_header}>{headerTitle} </h3>
          )}

          {deleteResource && (
            <p className={style.paraBox} onClick={deleteAllHandler}>
              <span className={style.removeTrash}>
                <FaRegTrashAlt size={16} />
              </span>
              <span className={style.deleteIcon}>Delete {resourceTitle}</span>
            </p>
          )}
        </div>

        <div className={style.container_formWrapper}>{children}</div>
      </section>
    </Modal>
  );
};

export default LeftDrawerModal;
