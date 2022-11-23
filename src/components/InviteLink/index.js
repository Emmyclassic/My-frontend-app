import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./index.module.scss";

const InviteLink = ({
  containerStyle,
  placeholder = "https://apems.com/events/agems-meeting",
  title = "Copy Link",
  buttonStyle,
  link,
}) => {
  const notifyCopied = () =>
    toast("Copied meeting link", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "info",
      theme: "colored",
    });
  return (
    <>
      <div className={style.searchInputBox} style={{ ...containerStyle }}>
        <input
          placeholder={placeholder}
          className={style.searchInput}
          value={link}
        />
        <CopyToClipboard text={link} onCopy={() => notifyCopied()}>
          <span className={style.searchIcon} style={{ ...buttonStyle }}>
            {title}
          </span>
        </CopyToClipboard>
      </div>
      <ToastContainer />
    </>
  );
};

export default InviteLink;
