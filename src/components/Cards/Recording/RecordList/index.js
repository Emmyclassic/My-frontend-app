import React from "react";
import Time from "../../../../utils/Time";
import RecordingCard from "../RecordCard";
import style from "./index.module.scss";

const RecordList = ({ list }) => {
  return (
    <div className={style.container}>
      {list.map((item) => (
        <RecordingCard
          key={item.id}
          recordId={item.id}
          title={item.topic}
          shareUrl={item.shareUrl}
          imageUrl={item.imageUrl}
          download_url={item.download_url}
          password={item.password}
          play_url={item.play_url}
          duration={Time.convertHMS(
            Time.getDateDiff(item.recording_start, item.recording_end)
          )}
          // duration={Time.getDateDiff(item.recording_start, item.recording_end)}
          size={`${(Math.round(+item.file_size / 1024) / 1000).toFixed(2)} Mb`}
          date={new Date(item.recording_start).toDateString()}
        />
      ))}
    </div>
  );
};

export default RecordList;
