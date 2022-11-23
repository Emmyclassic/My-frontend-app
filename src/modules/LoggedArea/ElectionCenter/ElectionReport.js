import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import style from "./index.module.scss";
import Pusher from "pusher-js";
import elctReport from "../../../assets/icons/elct-report.svg";
import elect from "../../../assets/icons/elect.svg";
import GoogleTranslateButton from "../../../components/Buttons/GoogleTranslate/GoogleTranslate";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { fetchEvent } from "../../../api/eventHandler";
import {
  hostElectionDataFetch,
  observerElectionDataFetch,
  downloadReport,
  electionDataFetch,
} from "../../../api/electionObserverHandler";

const ElectionReport = ({ isHost, eventId, token }) => {
  const history = useHistory();
  const [eventDetail, setEventDetail] = useState();
  const [loadingReport, setLoadingReport] = useState();
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [electionReports, setelectionReports] = useState();
  const [elections, setElections] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const [electionData, setElectionData] = useState();
  // const [refreshReport, setRefreshReport] = useState(false);

  // let copyElection = [];
  const [pusher, setPusher] = useState();

  console.log(
    { electionReports, isHost, eventId, token },
    "isHost eventId token"
  );

  useEffect(() => {
    getEventById(eventId);
    getElectionData(eventId);
    fetchReport();
  }, []);

  // useEffect(() => {
  //   fetchReport();
  // }, [refreshReport]);

  useEffect(() => {
    const pusher = new Pusher("f2d97c4c2c843342fbb5", {
      cluster: "eu",
      enabledTransports: ["ws", "wss"],
      authEndpoint: "https://apems-votes-dev.apems.co/broadcasting/auth",
      forceTLS: true,
    });
    pusher.connection.bind("connected", (e) => {
      console.log("connected", e);
    });
    pusher.connection.bind("error", function (err) {
      console.log("push error", err);
    });
    setPusher(pusher);
  }, []);

  useEffect(() => {
    if (pusher) {
      if (elections.length) {
        elections.forEach((election) => {
          console.log("resolution scope", pusher);
          const voteModelStatusEventChannel = pusher.subscribe(
            `ElectionCenterChannel.${election.id}`
          );
          voteModelStatusEventChannel.bind(
            "ElectionCenterBC",
            function (election) {
              console.log("VoteModelStatusEvent", election);
              if (election.data.message) {
                // setRefreshReport((prev) => !prev);
                setElections(election.data.analytics.election_stats);
                console.log(election, "election pusher log");
              }
              // if (elections && elections.data.status !== "initial") {
              //   const resolutionIdx = copyElection.findIndex(
              //     (item) => item.id === electionReports.elections.data.id
              //   );
              //   const copyRes = [...copyElection];
              //   copyRes[resolutionIdx] = {
              //     ...copyRes[resolutionIdx],
              //     status: electionReports.elections.data.status,
              //   };
              //   copyElection = copyRes;
              //   setElections(copyElection);
              // }
            }
          );
        });
      }
    }
  }, [elections.length]);

  const getEventById = async (eventId) => {
    try {
      setLoadingEvent(true);
      const {
        data: { data },
      } = await fetchEvent(eventId);
      setEventDetail(data);
      console.log("hsshhshshshshs", data);
      setLoadingEvent(false);
    } catch (err) {
      setLoadingEvent(false);
    }
  };

  const getElectionData = async (eventId) => {
    try {
      setLoadingEvent(true);
      const {
        data: { data },
      } = await electionDataFetch(eventId);
      setElectionData(data);
      console.log("hsshhshshshshs", data);
      setLoadingEvent(false);
    } catch (err) {
      setLoadingEvent(false);
    }
  };

  const fetchReport = async () => {
    try {
      setLoadingReport(true);
      let data;
      if (isHost) {
        data = await hostElectionDataFetch(eventId);
      } else {
        data = await observerElectionDataFetch(eventId, token);
      }
      setelectionReports(data.data.data);
      setElections(data.data.data.elections);
      setLoadingReport(false);
    } catch (err) {
      setLoadingReport(false);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const result = await downloadReport(eventId);
      const url = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Election-Report.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setDownloading(false);
    } catch (err) {
      console.log(err);
      setDownloading(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.logo_wrapper}>
        <div className={style.logo}>
          {loadingEvent ? (
            "Loading ..."
          ) : (
            <img src={eventDetail?.logo} alt="" />
          )}
        </div>
        <div className={style.language}>
          <div>Language</div>
          <span className={style.lang}>
            <GoogleTranslateButton googleTrans={false} />
          </span>
        </div>
      </div>
      <div className={style.head}>
        <span onClick={() => history.goBack()}>
          <MdKeyboardArrowLeft size={25} />
        </span>
        <h2>Elections Centre</h2>
      </div>
      <div className={style.body_wrapper}>
        <div className={style.box1}>
          <img src={elctReport} alt="elctReport" />
          <div>
            <p>Total No of Attendee:</p>
            <span>
              {loadingReport ? "Loading..." : electionData?.total_attendee}
            </span>
          </div>
          <div>
            <p>Overall Total of Voters:</p>
            <span>
              {loadingReport
                ? "Loading..."
                : electionData?.total_election_count}
            </span>
          </div>
          <button onClick={handleDownload}>
            {downloading ? "Downloading ..." : " Download Election Report"}
          </button>
        </div>
        <div className={style.box2}>
          <h2>Election Report</h2>
          {elections && elections.length > 0 ? (
            elections.map((election, index) => (
              <div key={index} className={style.electionType}>
                <p>
                  {election.position}
                  <br />
                  <p className={style.total}>
                    <p>Total Voters: </p>
                    <span>{election.total_vote}</span>
                  </p>
                </p>
                <div className={style.card_wrapper}>
                  {election.candidate.map((candidatee, index) => (
                    <div key={index} className={style.card}>
                      <div className={style.user_card}>
                        <img src={candidatee.photo} alt="" />
                        <p>{candidatee.name}</p>
                      </div>
                      <div className={style.user_result}>
                        <div>
                          <div>
                            <img src={elect} alt="elect" />
                            <h3 className={style.red}>{candidatee.count}</h3>
                          </div>
                          <p>Percentage of votes casted</p>
                          <h3>{candidatee.percentage}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : loadingReport ? (
            <div className={style.noElection}>
              <p>Loading ...</p>
            </div>
          ) : (
            <div className={style.noElection}>
              <p>No Election Report</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectionReport;
