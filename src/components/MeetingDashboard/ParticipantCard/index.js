import React from "react";
// import { RiMicOffFill } from "react-icons/ri";
// import { GiSoundWaves } from "react-icons/gi";
import style from "./index.module.scss";

function ParticipantCard({ micOn, name }) {
  return (
    <div className={style.cardwrap}>
      <div className={style.participant_card}>
        {/* {micOn ? (
        <span className={`${style.participant_card_icon} ${style.mic_on}`}>
          <GiSoundWaves color="#fff" />
        </span>
      ) : (
        <span className={style.participant_card_icon}>
          <RiMicOffFill color="#fff" />
        </span>
      )} */}
        <span className={style.participant_card_name}>{name || "AA"}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}> John Doe</div>
    </div>
  );
}

export default ParticipantCard;
