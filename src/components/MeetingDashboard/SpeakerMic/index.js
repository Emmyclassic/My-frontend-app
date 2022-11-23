import React from "react";
import style from "./index.module.scss";
import { RiMicOffFill } from "react-icons/ri";

function SpeakerMic({ name }) {
  return (
    <div className={style.speaker_mic}>
      <div className={style.speaker_mic_name}>
        <div className={style.speaker_mic_dot}></div>
        <span className={style.mr_2}>{name || "Yemisi Otesanya"}</span>
      </div>
      <div className={style.speaker_mic_icon}>
        <RiMicOffFill />
      </div>
    </div>
  );
}

export default SpeakerMic;
