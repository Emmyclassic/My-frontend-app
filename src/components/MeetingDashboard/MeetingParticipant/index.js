import React from "react";
import style from "./index.module.scss";
import { FaTimes } from "react-icons/fa";

function Participant({ setShowQuestion }) {
  return (
    <div className={style.container_participant}>
      <div className={style.participant_body}>
        <div className={style.participant_body_content}>
          <div className={style.participant_header}>
            <h5 className={style.participant_header_title}>Participants</h5>
            <div
              className={style.close_participant}
              onClick={() => setShowQuestion(false)}
            >
              <FaTimes />
            </div>
          </div>
          <p>Particant Cards....</p>
        </div>
      </div>
    </div>
  );
}

export default Participant;
