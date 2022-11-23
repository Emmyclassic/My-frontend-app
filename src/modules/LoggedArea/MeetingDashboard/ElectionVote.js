import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import moment from "moment";
import { BiAlarm } from "react-icons/bi";
import style from "./index.module.scss";

const ElectionVote = ({ children, item }) => {
  console.log({ item });
  const { seconds, minutes, hours, days, pause, start } = useStopwatch({
    autoStart: false,
    expiryTimestamp: moment(item.duration),
    onExpire: () => console.warn("onExpire called"),
  });
  const [timer, setTimer] = useState("start");

  const timeHandler = (val) => {
    if (val === "start") {
      pause();
    } else {
      start();
    }
    setTimer(val);
  };
  const eventInfo = localStorage.getItem("eventInfo");
  return (
    <div className={style.electionType}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ color: "#fff" }}>{item.position}</h4>
        {item.duration && eventInfo && JSON.parse(eventInfo).role === 1 ? (
          timer === "start" ? (
            <div
              style={{
                gap: "5px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => timeHandler("stop")}
            >
              <BiAlarm color="#2F89FE" />
              <span className={style.startResolution}>Start Time</span>
            </div>
          ) : (
            <div
              style={{
                gap: "5px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => timeHandler("start")}
            >
              <BiAlarm color="#2F89FE" />
              <span className={style.startResolution}>
                Stop Time <span>{days}</span>:<span>{hours}</span>:
                <span>{minutes}</span>:<span>{seconds}</span>
              </span>
            </div>
          )
        ) : null}
      </div>
      <div className={style.electionCand}>{children}</div>
    </div>
  );
};

export default ElectionVote;
