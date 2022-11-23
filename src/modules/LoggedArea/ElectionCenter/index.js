import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import style from "./index.module.scss";
import ElectionReport from "./ElectionReport";
import ElectionAuth from "./ElectionAuth";

const ElectionCenter = () => {
  const { id } = useParams();
  const location = useLocation();
  const [issSignIn, setIssSignIn] = useState(
    localStorage.getItem("hostId") === id || false
  );
  const [isHost] = useState(localStorage.getItem("hostId") === id || false);
  const [token, setToken] = useState("");
  const [observEventId, setObservEventId] = useState("");

  console.log(
    localStorage.getItem("hostId"),
    location,
    "isshodtieventDetail eventDetail",
    id
  );

  // useEffect(() => {
  //   const res = localStorage.getItem("hostId") === id;
  //   console.log(res, "reeessssss");
  // }, []);

  return (
    <div className={style.wrapper}>
      {!issSignIn ? (
        <ElectionAuth
          setObservEventId={setObservEventId}
          setToken={setToken}
          setIssSignIn={setIssSignIn}
        />
      ) : (
        <ElectionReport
          token={token}
          isHost={isHost}
          eventId={isHost ? id : observEventId}
        />
      )}
    </div>
  );
};

export default ElectionCenter;
