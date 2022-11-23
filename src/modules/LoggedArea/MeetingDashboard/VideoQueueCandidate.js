import React from "react";
import style from "./index.module.scss";

const VideoQueueCandidate = ({ avatar }) => {
  return (
    <div className={style.videoQueueCandidate}>
      <div className={style.videoQueueCandidate_group}>
        <div className={style.videoQueueCandidate_avatar}>A</div>
        <span>Ayodeji Fasore</span>
      </div>
      <button>Add to Speaker</button>
    </div>
  );
};

export default VideoQueueCandidate;
