import { Progress } from "antd";
import React from "react";

import style from "./index.module.scss";

export const ProgressVote = ({ title }) => {
  return (
    <div className={style.resolutionProgessContainer}>
      <div className="resolution-progress">
        <span className="resolution-action">{title}</span>
        <Progress
          percent={60}
          strokeColor="#363636"
          strokeWidth="30px"
          trailColor="rgba(0, 0, 0, 0.3)"
          strokeLinecap="square"
          className="customResult"
          format={(percent) => "1100 units " + percent + "%"}
        />
      </div>
    </div>
  );
};

export const StatutoryProgressVote = ({ title, isStatutory }) => {
  return (
    <div className={style.resolutionProgessContainer}>
      <div className="resolution-progress">
        <div className="resolution-action">
          {isStatutory && (
            <img
              src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
              width={20}
              height={20}
              className={style.handlewave}
            />
          )}

          <span>{title}</span>
        </div>
        <Progress
          percent={0}
          // strokeColor="#363636"
          strokeColor="#363636"
          strokeWidth="30px"
          trailColor="#363636"
          strokeLinecap="square"
          className="customResult"
          style={{ borderRadius: 0 }}
          // format={(percent) => "1100 units " + percent + "%"}
          format={(percent) => ""}
        />
      </div>
    </div>
  );
};
