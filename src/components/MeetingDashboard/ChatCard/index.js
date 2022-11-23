import React from "react";
import style from "./index.module.scss";

function ChatCard({ from, name }) {
  return (
    <div className={style.card_container}>
      <div className={style.card_content}>
        {from === "sender" ? (
          <>
            <div className={style.participant_card}>
              <span className={style.participant_card_name}>
                {name || "AA"}
              </span>
            </div>
            <div className={`${style.card_content_wrap} ${style.ml_1}`}>
              <div className={`${style.card_content_desc} ${style.sender_box}`}>
                <span>
                  Hey Guys, are we ready for {`today's`} meeting, I have
                  feedback I need today share with the team.
                </span>
              </div>
              <div
                className={
                  from === "sender" ? style.chat_time : style.chat_time_rec
                }
              >
                <span>10:00 am, Ayodeji F.</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={`${style.card_content_wrap} ${style.mr_1}`}>
              <div
                className={`${style.card_content_desc} ${style.receiver_box}`}
              >
                <span>
                  Hey Guys, are we ready for {`today's`} meeting, I have
                  feedback I need today share with the team.
                </span>
              </div>
              <div className={style.chat_time}>
                <span>10:00 am, Ayodeji F.</span>
              </div>
            </div>
            <div className={style.participant_card}>
              <span className={style.participant_card_name}>
                {name || "AA"}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export function CardGrid({ name, fullName, id, setSingleChat, setShowGrid }) {
  return (
    <div
      className={style.card_container}
      onClick={() => {
        setSingleChat(true);
        setShowGrid(false);
        console.log("ire o", id);
      }}
    >
      <div className={style.grid_container}>
        <div className={style.grid_container_desc}>
          <div className={style.participant_card}>
            <span className={style.participant_card_name}>{name || "AA"}</span>
          </div>
          <div className={style.grid_container_detail}>
            <p>{fullName || "Afrix"}</p>
            <span>Hey, have you been able to update the design?...</span>
          </div>
        </div>
        <div className={style.grid_container_time}>11:44 am</div>
      </div>
    </div>
  );
}
export function SingleChat({ desc, from }) {
  return (
    <div>
      {from === "sender" ? (
        <>
          <div className={`${style.card_content_wrap}`}>
            <div className={`${style.card_content_desc} ${style.sender_box}`}>
              <span>
                Hey Guys, are we ready for {`today's`} meeting, I have feedback
                I need today share with the team.
              </span>
            </div>
            <div className={style.chat_time}>
              <span>10:00 am, Ayodeji F.</span>
            </div>
          </div>
        </>
      ) : (
        <div className={style.flex_end}>
          <div className={`${style.card_content_wrap}`}>
            <div className={`${style.card_content_desc} ${style.receiver_box}`}>
              <span>
                Hey Guys, are we ready for {`today's`} meeting, I have feedback
                I need today share with the team.
              </span>
            </div>
            <div className={style.chat_time_rec}>
              <span>10:00 am, Ayodeji F.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatCard;
