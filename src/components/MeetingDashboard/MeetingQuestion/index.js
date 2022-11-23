import React from "react";
import style from "./index.module.scss";
import { FaTimes } from "react-icons/fa";
import { MdSend } from "react-icons/md";

function Question({ setShowQuestion }) {
  return (
    <div className={style.container_question}>
      <div className={style.question_body}>
        <div className={style.question_body_content}>
          <div className={style.question_header}>
            <h5 className={style.question_header_title}>Questions</h5>
            <div
              className={style.close_question}
              onClick={() => setShowQuestion(false)}
            >
              <FaTimes />
            </div>
          </div>
        </div>
      </div>
      <div className={style.question_footer}>
        <div className={style.question_footer_container}>
          <div className={style.question_footer_content}>
            <input placeholder="Type to write a message..." />
          </div>
          <div className={style.question_footer_send}>
            <MdSend color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
