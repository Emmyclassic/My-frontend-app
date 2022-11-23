import React, { useEffect } from "react";
import { useHistory } from "react-router";
import style from "./index.module.scss";

const WaitingRoom = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/meeting");
    }, 2000);
  }, []);
  return (
    <div className={style.waitingContainer}>
      <div className={style.waitingPeople}>
        <div className={style.content}>
          <div className={style.contentPeople}>
            <div className={style.outRadiusCont}>
              <div className={style.outerRadius}>
                <div className={style.outRadius}>
                  <div className={style.innerRadius}>
                    <img
                      src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940356/apems/waiting-room_lq0bjt.png"
                      alt="waiting room"
                      className={style.waitingImg}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.contentDesc}>
            Please wait a little. The Host will let you in shortly.
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
