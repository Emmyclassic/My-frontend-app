import React from "react";
import style from "./index.module.scss";
import { RiMicOffFill, RiUserVoiceLine } from "react-icons/ri";
import { BiVideoRecording } from "react-icons/bi";
import { CgCopyright } from "react-icons/cg";
import { HiUser } from "react-icons/hi";
import { FaRocketchat } from "react-icons/fa";

function MeetingFooter({
  setShowChat,
  showChat,
  setShowQuestion,
  showQuestion,
  setShowParticipant,
  showParticipant,
  setLeaveMeeting,
}) {
  return (
    <div className={style.footer_container}>
      <div className={`${style.mic_container} ${style.mr_2}`}>
        <RiMicOffFill />
      </div>
      <div className={`${style.icon_container} ${style.mr_2}`}>
        <BiVideoRecording />
      </div>
      <div className={`${style.icon_container} ${style.mr_2}`}>
        <CgCopyright />
      </div>
      <div
        className={`${style.leave_meeting} ${style.mr_2}`}
        onClick={() => setLeaveMeeting(true)}
      >
        Leave Meeting
      </div>
      <div
        className={`${style.icon_container} ${style.mr_2}`}
        onClick={() => {
          setShowParticipant(!showParticipant);
          setShowQuestion(false);
          setShowChat(false);
        }}
      >
        <HiUser />
      </div>
      <div
        className={`${style.icon_container} ${style.mr_2}`}
        onClick={() => {
          setShowChat(!showChat);
          setShowQuestion(false);
          setShowParticipant(false);
        }}
      >
        <FaRocketchat />
      </div>
      <div
        className={`${style.icon_container} ${style.mr_2}`}
        onClick={() => {
          setShowQuestion(!showQuestion);
          setShowChat(false);
          setShowParticipant(false);
        }}
      >
        <RiUserVoiceLine />
      </div>
    </div>
  );
}

export default MeetingFooter;
