import React, { useEffect, useState } from "react";
import resolver from "../../../utils/promiseWrapper";
import Skeleton from "react-loading-skeleton";
import { getMeetingRecords } from "../../../api/eventHandler";
import PrivateGenericLayout from "../../../components/PrivateGenericLayout/PrivateGenericLayout";
import RecordList from "../../../components/Cards/Recording/RecordList";
import style from "./index.module.scss";
import DashboardLeftHeaderNav from "../../../components/Dashboard/LeftHeaderNav";
import { useSelector } from "react-redux";

function Recordings() {
  const [recordings, setRecordings] = useState([]);
  const profile = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);

  const fetchAllRecording = async (userId) => {
    setLoading(true);
    const [result, error] = await resolver(getMeetingRecords(profile.id));
    setLoading(false);
    const meetingsValues = Object.values(result?.data?.details);
    const copyMeeting = meetingsValues.pop();

    console.log("meetingsValues", copyMeeting);
    console.log("result.data", result?.data, meetingsValues);
    const meetings = meetingsValues.filter((x) => x);

    console.log("meetings meetings", meetings);
    const records = meetings.map((meeting) => {
      return {
        topic: meeting.topic,
        shareUrl: meeting.share_url,
        imageUrl: meeting.image_url,
        password: meeting.password,
        ...meeting.recording_files[1],
      };
    });
    console.log("records", records);
    setRecordings(records);
    console.log("error", error);
  };

  useEffect(() => {
    fetchAllRecording();
  }, []);
  return (
    <PrivateGenericLayout
      leftNav={
        <DashboardLeftHeaderNav
          title="Recordings"
          subtitle="Find and manage all your recorded sessions here."
        />
      }
    >
      <div className={style.main}>
        <CardLoader visible={loading} />
        {recordings.length ? <RecordList list={recordings} /> : null}
      </div>
    </PrivateGenericLayout>
  );
}
const CardLoader = ({ visible }) => {
  if (visible)
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          marginTop: "3rem",
        }}
      >
        <div style={{ width: "30%", marginRight: "2%", marginBottom: "2rem" }}>
          <Skeleton height={150} width={"100%"} />
        </div>
        <div style={{ width: "30%", marginRight: "2%", marginBottom: "2rem" }}>
          <Skeleton height={150} width={"100%"} />
        </div>
      </div>
    );
  return null;
};

export default Recordings;
