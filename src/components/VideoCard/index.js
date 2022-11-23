import { Modal } from "antd";
import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import style from "./index.module.scss";

const VideoCard = ({
  containerStyle,
  image = "https://res.cloudinary.com/solomonfrank/image/upload/v1655940341/apems/consert5_b5bxzw.jpg",
  showIcon = true,
  sectionBanner,
  item,
  deleteResourceHandler,
}) => {
  const videoRef = useRef();
  const [visible, setVisible] = useState(false);
  const styles = {
    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url(${sectionBanner})`,
    position: "relative",
    backgroundRrepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "120px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const videoHandler = () => {
    if (videoRef.current.paused) videoRef.current.play();
    else videoRef.current.pause();
  };
  return (
    <>
      <Modal
        onCancel={() => setVisible(false)}
        destroyOnClose
        // closable={true}
        bodyStyle={{ backgroundColor: "rgba(0,0,0, 0.45)", padding: 0 }}
        visible={visible}
        // onOk={() => setVisible(false)}

        footer={null}
        header={null}
      >
        <div className={style.youtubeContainer}>
          <video
            style={{ width: "100%" }}
            ref={videoRef}
            onClick={videoHandler}
          >
            <source src={item?.url} type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal>
      <div className={style.container} style={{ ...styles, ...containerStyle }}>
        <div className={style.videoContainer_wrap}>
          <video
            style={{ width: "100%", height: "100px" }}
            ref={videoRef}
            onClick={() => setVisible(true)}
          >
            <source src={item?.url} type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
          {showIcon && (
            <span
              className={style.videoContainer_wrap_iconBox}
              onClick={() => setVisible(true)}
            >
              <FaPlay
                size={14}
                color="gray"
                className={style.videoContainer_wrap_iconBox_icon}
              />
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoCard;
