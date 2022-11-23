import React from "react";
import style from "./index.module.scss";
import { FaEllipsisV } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillPlayCircle } from "react-icons/ai";
import { download } from "../../../../utils/download";
import { Menu, Dropdown } from "antd";
// import { Link } from "react-router-dom";

// const jwt =
//   "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkZxNnhRZzltU2RHUnBuVElwaV9kdXciLCJleHAiOjE2NDg4MzY2NzQsImlhdCI6MTY0ODgzMTI3NH0.86LVV7NATnlPX4iRyNPDIq73K_pl5cmj-4enYnNkwBg";

const RecordingCard = ({
  title,
  duration,
  shareUrl,
  size,
  date,
  recordId,
  imageUrl,
  download_url,
  play_url,
}) => {
  console.log(" download_url", download_url);
  const dropdownList = (recordId) => {
    const notifyCopied = () =>
      toast("Copied record link", {
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
      <Menu className={style.menu_container}>
        <Menu.Item key="1">
          <CopyToClipboard text={shareUrl} onCopy={() => notifyCopied()}>
            <span className={style.menu_container_desc}>Copy Link</span>
          </CopyToClipboard>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <span
            onClick={() => download(download_url, title)}
            className={style.menu_container_desc}
          >
            Download
          </span>
        </Menu.Item>
        <Menu.Divider />
        {/* <Menu.Item key="3">
          <span className={style.menu_container_desc}>Rename</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <a href={shareUrl}>
            <span className={style.menu_container_desc}>Share</span>
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="5">
          <span className={style.menu_container_desc}>Delete</span>
        </Menu.Item> */}
      </Menu>
    );
  };

  console.log("imageUrl", play_url);

  const recordImage = {
    background: `url(${imageUrl})`,
  };
  return (
    <div className={style.container}>
      <ToastContainer />
      <div className={style.recording_avatar} style={{ ...recordImage }}>
        {/* <div className={style.recording_avatar_play}>p</div> */}
        <AiFillPlayCircle
          size="36"
          color="#fff"
          className={style.recording_desc_ellipse}
        />
      </div>
      <div className={style.recording_detail}>
        <p className={style.recording_detail_title}>{title}- </p>
        <p className={style.recording_detail_title}>Meeting Recording</p>
        <div className={style.recording_desc}>
          <p>Duration: {duration}</p>
          <p>File Size: {size}</p>
          <div className={style.flex}>
            <p>Date: {date}</p>
            <Dropdown
              overlay={() => dropdownList(recordId)}
              trigger={["click"]}
              placement="bottomRight"
            >
              <FaEllipsisV size="14" className={style.recording_desc_ellipse} />
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingCard;
