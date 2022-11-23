import { Checkbox, Modal, Progress, Spin, Tabs } from "antd";
import classNames from "classnames";
import moment from "moment";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { BsAlarmFill, BsCaretRightFill } from "react-icons/bs";
import { HiDownload, HiShare } from "react-icons/hi";
import { MdClose, MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { JoinMeetingForm } from "../ConcertPreview";
import resolver from "../../../utils/promiseWrapper";

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import Swal from "sweetalert2";
import {
  browseEventDetail,
  donationPayment,
  fetchDonation,
  verifyDonation,
} from "../../../api/eventHandler";
import {
  getElectionsHandler,
  getResolutionsHandler,
} from "../../../api/resolutionHandler";
import { getProxyTemplateHandler } from "../../../api/attendeeHandler";
import {
  createOnlineVotes,
  getResources,
  getSpeakers,
  createVotes,
} from "../../../api/resourceHandler";

import AlertResponse from "../../../Auth/AuthModalForm/AlertResponse";
import SingleSelect, {
  SingleCard,
  ElectonRadioCard,
} from "../../../components/Cards/SingleCardSelect";
import EventPreviewLayout from "../../../components/Layout/EventPreviewLayout";
import AgmLink from "../../LoggedArea/CreateEvent/Resources/AgmLink";
import DocumentList from "../../LoggedArea/CreateEvent/Resources/DocumentList";
import VideoList from "../../LoggedArea/CreateEvent/Resources/VideoList";
import style from "./index.module.scss";

const { TabPane } = Tabs;
let copyElection = [];

const EventJoinPreview = () => {
  const [, setEventDetail] = useState();
  const [tab, setTab] = useState("eventTab");
  const [openDocument, setOpenDocument] = useState(false);
  const [openMeetingModal, setOpenMeetingModal] = useState(false);
  const [openUserMeetingModal, setOpenUserMeetingModal] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [joinType, setJoinType] = useState("1");
  const [speakers, setSpeakers] = useState();
  const [, setUiLoader] = useState(false);
  const [elections, setElections] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [resolutions, setResolutions] = useState();
  const [votingLoader, setVotingLoader] = useState(false);
  const [responseData, setResponseData] = useState();
  const [, setLoadingElection] = useState(false);
  const [proxyTemplateData, setProxyTemplateData] = useState();
  const [statustoryResolution, setStatustoryResolution] = useState();

  const [videos, setVideos] = useState([]);
  const [attendeeData, setAttendeeData] = useState();
  const [links, setLinks] = useState([]);
  const [votesArr, setVotesArr] = useState([]);
  const [statutoryVotesArr, setStatutoryVotesArr] = useState([]);
  const [, setSpeakerError] = useState();
  const [voteTerms, setVoteTerms] = useState(false);
  const eventResponse = useSelector((state) => state.eventTypes);
  const [currentEventType, setCurrentEventType] = useState();

  const location = useLocation();

  const history = useHistory();
  const { id } = useParams();
  const [, setVideoError] = useState();
  const [, setLinkError] = useState();
  const [, setDocumentError] = useState();
  const [donations, setDonations] = useState();

  const toggleJoinForm = (item) => {
    setJoinType(item.id);
  };
  const fetchElections = async (eventId) => {
    try {
      setLoadingElection(true);
      const {
        data: { data },
      } = await getElectionsHandler(eventId);
      setLoadingElection(false);
      setElections(data);
    } catch (ex) {
      setLoadingElection(false);
    }
  };

  useEffect(() => {
    console.log({ attendeeData });
  });

  const browseEventByid = async (id) => {
    setUiLoader(true);
    const {
      data: { data },
    } = await browseEventDetail(id);

    const currentEventType = eventResponse.data?.find(
      (item) => item.id === data.event_type.id
    );
    console.log("dusbusuxsxsxs", currentEventType);
    setUiLoader(false);
    setCurrentEventType(currentEventType);
    setEventDetail(data);
  };

  useEffect(() => {
    if (responseData) {
      setTimeout(() => {
        setResponseData();
      }, 5000);
    }
  }, [responseData]);
  const onClose = (e) => setResponseData();
  const fetchResolutions = async (eventId) => {
    try {
      const {
        data: { data },
      } = await getResolutionsHandler(eventId);
      const statutoryRes = data.filter((item) => item.allow_physical === true);
      const resolution = data.filter((item) => item.allow_physical === false);
      setResolutions(resolution);
      setStatustoryResolution(statutoryRes);
    } catch (ex) {}
  };
  useEffect(() => {
    fetchResolutions(id);
    fetchElections(id);
  }, [id]);
  useEffect(() => {
    browseEventByid(id);
  }, [id]);

  const fetchDonationHandler = async () => {
    try {
      const {
        data: { data },
      } = await fetchDonation();
      // setTickets(data);
      setDonations(data);
    } catch (ex) {}
  };

  useEffect(() => {
    fetchDonationHandler();
  }, []);

  // const fetchResources = async (filter, setter, errorSetter) => {
  //   try {
  //     const {
  //       data: { data },
  //     } = await getResources(filter, id);

  //     setLinks(data);
  //     setter(data);
  //   } catch (err) {
  //     errorSetter("Something went wrong", err);
  //   }
  // };
  const fetchLinks = async (filter) => {
    try {
      const {
        data: { data },
      } = await getResources(filter);

      setLinks(data);
    } catch (err) {
      setLinkError("Something went wrong", err);
    }
  };
  const fetchDocuments = async (filter) => {
    try {
      const {
        data: { data },
      } = await getResources(filter);

      setDocuments(data);
    } catch (err) {
      setDocumentError("Something went wrong", err);
    }
  };
  const fetchVideos = async (filter) => {
    try {
      const {
        data: { data },
      } = await getResources(filter);

      setVideos(data);
    } catch (err) {
      setVideoError("Something went wrong", err);
    }
  };

  const fetchSpeakers = async () => {
    try {
      const {
        data: { data },
      } = await getSpeakers(id);

      setSpeakers(data);
    } catch (err) {
      setSpeakerError("Something went wrong", err);
    }
  };

  useEffect(() => {
    fetchLinks("link");
    fetchDocuments("document");
    fetchVideos("video");
    fetchSpeakers();
  }, [id]);

  const submitElectionVotes = async (e) => {
    e.preventDefault();

    if (attendeeData) {
      if (copyElection.length === elections.length) {
        try {
          const payload = {
            votes: copyElection,
          };
          setVotingLoader(true);

          const { data } = await createOnlineVotes(payload);
          console.log({ data });

          setVotingLoader(false);
          Swal.fire("Done", "You have successfully voted", "success");
        } catch (err) {
          setVotingLoader(false);

          setElections(elections);
          if (err.response.status === 400) {
            Swal.fire("Error", "You have already voted", "error");
          } else {
            Swal.fire("Error", "Something went wrong.", "error");
          }
        }
      } else {
        Swal.fire(
          "Error",
          "Please select candidate for each position",
          "error"
        );
        //  message.error("Please select candidate for each position");
      }
    } else {
      setOpenMeetingModal(true);
    }
  };

  const submitVotes = async (e) => {
    e.preventDefault();

    if (votesArr.length) {
      if (voteTerms) {
        try {
          const payload = {
            votes: [...votesArr, ...statutoryVotesArr],
          };
          setVotingLoader(true);

          const { data } = await createVotes(payload);
          setVotingLoader(false);
          setResponseData({
            data: data.data,
            status: "success",
            message: "Vote successfully",
          });
        } catch (err) {
          setVotingLoader(false);
          const error = err.response?.data ?? "Something went wrong";
          setResponseData({ data: error, status: "fail", message: error });
        }
      } else {
        Swal.fire(
          "Warning",
          "Please accept terms and conditions to proceed.",
          "warning"
        );
      }
    } else {
      Swal.fire("Warning", "Please select vote to continue", "warning");
    }
  };

  const handleElectionVoteChange = (payload) => {
    const copyVotesArr = [...copyElection];
    console.log({ payload });
    const index = copyVotesArr.findIndex(
      (item) => item.election_id === payload.election_id
    );
    if (index > -1) {
      copyVotesArr.splice(index, 1);
      copyVotesArr.push(payload);
    } else {
      copyVotesArr.push(payload);
    }

    copyElection = copyVotesArr;
    console.log({ copyElection });
    // setVotesArr(copyVotesArr);
  };

  const handleStatutoryVoteChange = (payload, idx) => {
    const copyVotesArr = [...statutoryVotesArr];

    console.log({ payload });

    const index = copyVotesArr.findIndex(
      (item) => item.resolution_id === payload.resolution_id
    );

    if (payload.votes_for === 1) {
      payload.vote_type = "votes_for";
    } else if (payload.votes_against === "Against") {
      payload.vote_type = "votes_against";
    } else {
      payload.vote_type = "votes_abstain";
    }
    if (index > -1) {
      copyVotesArr.splice(index, 1);
      copyVotesArr.push(payload);
    } else {
      copyVotesArr.push(payload);
    }

    setStatutoryVotesArr(copyVotesArr);
  };
  const handleVoteChange = (payload, idx) => {
    const copyVotesArr = [...votesArr];

    console.log({ payload });

    const index = copyVotesArr.findIndex(
      (item) => item.resolution_id === payload.resolution_id
    );

    if (payload.votes_for === 1) {
      payload.vote_type = "votes_for";
    } else if (payload.votes_against === "Against") {
      payload.vote_type = "votes_against";
    } else {
      payload.vote_type = "votes_abstain";
    }
    if (index > -1) {
      copyVotesArr.splice(index, 1);
      copyVotesArr.push(payload);
    } else {
      copyVotesArr.push(payload);
    }

    setVotesArr(copyVotesArr);
  };

  useEffect(() => {
    fetchProxyTemplate(id);
  }, [id]);

  const fetchProxyTemplate = async (id) => {
    console.log({ idssss: id });
    const [result, error] = await resolver(getProxyTemplateHandler(id));

    console.log({ result, error });
    if (result) {
      setProxyTemplateData(result.data.data);
    }
  };

  console.log({ location: JSON.parse(location.state) });

  console.log("bsbsbbsbd two", moment().subtract("2", "days"));

  console.log(
    "bsbsbbsbd",
    moment(new Date(JSON.parse(location.state).start_date)).subtract(
      "2",
      "days"
    )
  );

  return (
    <EventPreviewLayout eventDetail={location.state}>
      <Link to="/">
        <img
          className={style.header__logo}
          src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/Apems-logo_iu3uju.webp"
          alt="logo"
        />
      </Link>
      <section>
        <div className={style.container}>
          <div className={style.containerNav}>
            <div className={style.containerNav_left}>
              <span
                className={style.containerNav_iconBox}
                onClick={history.goBack}
              >
                <MdKeyboardArrowLeft size={20} />
              </span>
              <span className={style.pageTitle}>Resource Centre</span>
            </div>
            {/* <div className={style.containerNav_right}>
              <span
                className={style.editContinue}
                onClick={() =>
                  history.push(
                    `/event/create/${JSON.parse(location.state).event_type?.id}`
                  )
                }
              >
                Continue Edit
              </span>
              <button
                className={style.publishEvent}
                onClick={() => setOpenUserMeetingModal(true)}
              >
                Create and Publish Event
              </button>
            </div> */}
          </div>
          <section>
            <div className={style.resourceNav}>
              <div className={style.resourecLeft}>
                <div className={style.resourceTop}>
                  <div
                    className={style.tabContent}
                    onClick={() => setTab("eventTab")}
                  >
                    <span
                      className={classNames(`${style.eventIndicate}`, {
                        [`${style.selectedTab}`]: tab === "eventTab",
                      })}
                    >
                      <BsCaretRightFill
                        size={18}
                        className={style.eventDirection}
                        color="#EF3125"
                      />
                    </span>
                    <span
                      className={classNames(`${style.indicatorTitle}`, {
                        [`${style.selectedTitleTab}`]: tab === "eventTab",
                      })}
                    >
                      Event Information
                    </span>
                  </div>

                  {videos.length || documents.length || links.length ? (
                    <div
                      className={style.tabContent}
                      onClick={() => setTab("resourceTab")}
                    >
                      <span
                        className={classNames(`${style.eventIndicate}`, {
                          [`${style.selectedTab}`]: tab === "resourceTab",
                        })}
                      >
                        <BsCaretRightFill
                          size={18}
                          className={style.eventDirection}
                          color="#EF3125"
                        />
                      </span>
                      <span
                        className={classNames(`${style.indicatorTitle}`, {
                          [`${style.selectedTitleTab}`]: tab === "resourceTab",
                        })}
                      >
                        Event Resources
                      </span>
                    </div>
                  ) : null}

                  {currentEventType && currentEventType.type !== "agm" && (
                    <>
                      <div
                        className={style.tabContent}
                        onClick={() => setTab("donationTab")}
                      >
                        <span
                          className={classNames(`${style.eventIndicate}`, {
                            [`${style.selectedTab}`]: tab === "donationTab",
                          })}
                        >
                          <BsCaretRightFill
                            size={18}
                            className={style.eventDirection}
                            color="#EF3125"
                          />
                        </span>
                        <span
                          className={classNames(`${style.indicatorTitle}`, {
                            [`${style.selectedTitleTab}`]:
                              tab === "donationTab",
                          })}
                        >
                          Donations
                        </span>
                      </div>
                      <div
                        className={style.tabContent}
                        onClick={() => setTab("speakerTab")}
                      >
                        <span
                          className={classNames(`${style.eventIndicate}`, {
                            [`${style.selectedTab}`]: tab === "speakerTab",
                          })}
                        >
                          <BsCaretRightFill
                            size={18}
                            className={style.eventDirection}
                            color="#EF3125"
                          />
                        </span>
                        <span
                          className={classNames(`${style.indicatorTitle}`, {
                            [`${style.selectedTitleTab}`]: tab === "speakerTab",
                          })}
                        >
                          Meet Speaker, Panelists
                        </span>
                      </div>
                    </>
                  )}

                  <div
                    className={style.tabContent}
                    onClick={() => {
                      setOpenMeetingModal(true);
                      setTab("pollTab");
                    }}
                  >
                    <span
                      className={classNames(`${style.eventIndicate}`, {
                        [`${style.selectedTab}`]: tab === "pollTab",
                      })}
                    >
                      <BsCaretRightFill
                        size={18}
                        className={style.eventDirection}
                        color="#EF3125"
                      />
                    </span>
                    <span
                      className={classNames(`${style.indicatorTitle}`, {
                        [`${style.selectedTitleTab}`]: tab === "pollTab",
                      })}
                    >
                      Proxy Form
                    </span>
                  </div>

                  <div
                    className={style.tabContent}
                    onClick={() => {
                      setOpenMeetingModal(true);
                      setTab("electionTab");
                    }}
                  >
                    <span
                      className={classNames(`${style.eventIndicate}`, {
                        [`${style.selectedTab}`]: tab === "electionTab",
                      })}
                    >
                      <BsCaretRightFill
                        size={18}
                        className={style.eventDirection}
                        color="#EF3125"
                      />
                    </span>
                    <span
                      className={classNames(`${style.indicatorTitle}`, {
                        [`${style.selectedTitleTab}`]: tab === "electionTab",
                      })}
                    >
                      Election
                    </span>
                  </div>
                </div>
                <div className={style.shareSocial}>
                  <div className={style.shareBox}>
                    <span>Share event</span>
                    <span className={style.sharable}>
                      <HiShare />
                    </span>
                  </div>
                  <div
                    className={`${style.footer__contact_social} ${style.footer__short_desc}`}
                  >
                    <ul className={style.social__list}>
                      <li className={style.social__list_item}>
                        <LinkedinShareButton
                          url={`https://apems-frontend-dev.apems.co/event/concert/overview/${
                            JSON.parse(location.state)?.id
                          }`}
                          title={JSON.parse(location.state).title}
                        >
                          <LinkedinIcon
                            size={30}
                            round={true}
                            className="icon-tab"
                          />
                        </LinkedinShareButton>
                      </li>
                      <li className={style.social__list_item}>
                        <FacebookShareButton
                          url={`https://apems-frontend-dev.apems.co/event/concert/overview/${
                            JSON.parse(location.state)?.id
                          }`}
                          quote={JSON.parse(location.state).title}
                        >
                          <FacebookIcon
                            size={30}
                            round={true}
                            className="icon-tab"
                          />
                        </FacebookShareButton>
                      </li>
                      <li className={style.social__list_item}>
                        <TwitterShareButton
                          url={`https://apems-frontend-dev.apems.co/event/concert/overview/${
                            JSON.parse(location.state)?.id
                          }`}
                          title={JSON.parse(location.state).title}
                        >
                          <TwitterIcon
                            size={30}
                            round={true}
                            className="icon-tab"
                          />
                        </TwitterShareButton>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={style.resourecRight}>
                <div className={style.resourceType}>
                  {tab === "eventTab" && (
                    <div className={style.resourceType_content}>
                      <h3 className={style.resourceType_title}>
                        About This Event
                      </h3>

                      <p className={style.resourceType_para}>
                        {/* {eventDetail.description} */}
                        {JSON.parse(location.state).description}
                      </p>
                    </div>
                  )}
                  {tab === "speakerTab" && (
                    <div>
                      <h3 className={style.resourceType_title}>Entertainers</h3>
                      <div className={style.speakerTab}>
                        <h5 className={style.speakerTab_title}>
                          See your Entertainers and/or musicians for this
                          amazing event.
                        </h5>
                        <div className={style.speaker_container}>
                          {speakers &&
                            speakers.length &&
                            speakers.map((item, idx) => (
                              <SpeakerList item={item} key={item.id} />
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {tab === "electionTab" && (
                    <div>
                      <h3 className={style.resourceType_title}>
                        Election Vote
                      </h3>
                      <div className={style.electionTab}>
                        {elections &&
                          elections.length > 0 &&
                          elections.map((item) => (
                            <div className={style.electionType} key={item.id}>
                              <h4>{item.position}</h4>
                              <div className={style.electionCand}>
                                <SingleSelect
                                  containerStyle={{
                                    flexDirection: "row",
                                    justifyContent: "start",
                                    gap: "10px",
                                  }}
                                  onChange={(data) =>
                                    handleElectionVoteChange({
                                      ...data,
                                      candidate_id: data.id,
                                      channel: "web",
                                      account_number: `${attendeeData?.account_number}`,
                                      attendee_name: attendeeData?.name,
                                      attendee_id:
                                        attendeeData?.id ?? "346565656",
                                      attendee_phoneNumber:
                                        attendeeData.phone_number,
                                    })
                                  }
                                >
                                  {item.candidates.map((item) => (
                                    <ElectonRadioCard
                                      key={item.id}
                                      position={item.name}
                                      title={item.name}
                                      id={item.id}
                                      item={item}
                                    />
                                  ))}
                                </SingleSelect>
                              </div>
                            </div>
                          ))}

                        <div
                          className={style.containerNav_right}
                          style={{ justifyContent: "flex-end" }}
                        >
                          <button
                            onClick={submitElectionVotes}
                            className={style.publishEvent}
                            style={{ backgroundColor: "#6D7683" }}
                          >
                            {votingLoader ? (
                              <Spin size="large" color="#fff" />
                            ) : (
                              "Submit Votes"
                            )}
                          </button>
                        </div>
                        {responseData && (
                          <AlertResponse
                            status={responseData.status}
                            data={responseData.data}
                            onClose={onClose}
                            message={responseData.message}
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {tab === "resourceTab" && (
                    <div>
                      <h3 className={style.resourceType_title}>
                        Event Documents and Materials
                      </h3>
                      <div className={style.resourceColl}>
                        <div className={style.uploadedDoc_list}>
                          {documents.length ? (
                            <div className={style.documentWrapper}>
                              <DocumentList
                                items={documents}
                                showDelete={false}
                                showSettings={false}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className={style.uploadLink}>
                        {links.length ? (
                          <div className={style.documentWrapper}>
                            <AgmLink
                              items={links}
                              showSettings={false}
                              showDelete={false}
                            />
                          </div>
                        ) : null}
                      </div>
                      <div className={style.uploadLink}>
                        {videos.length ? (
                          <div className={style.documentWrapper}>
                            <VideoList
                              items={videos}
                              showSetting={false}
                              showDelete={false}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                  {tab === "donationTab" && (
                    <div>
                      <h3 className={style.resourceType_title}>Donations</h3>
                      <div className={style.donationContainer}>
                        {donations &&
                          donations.length &&
                          donations.map((item) => (
                            <DonationPaymentCard item={item} key={item.id} />
                          ))}
                      </div>
                    </div>
                  )}
                  {tab === "pollTab" && (
                    <div>
                      <div className={style.headerTab}>
                        <h3 className={style.resourceType_title}>Proxy Form</h3>
                        <div className={style.headerLeft}>
                          <span className={style.iconBox}>
                            {" "}
                            <BsAlarmFill size={18} />
                          </span>
                          <div className={style.duration}>
                            <span className={style.duration_left}>
                              Time left until form expires
                            </span>
                            <Countdown
                              date={moment(
                                JSON.parse(location.state).start_date
                              )
                                .add("48", "hours")
                                .format("YYYY-MM-DDTHH:MM:ss")}
                            >
                              <span className={style.duration_date}>
                                Expired!
                              </span>
                            </Countdown>
                            {/* <span>
                              {location.state &&
                                moment(JSON.parse(location.state).start_date)}
                            </span> */}
                            {/* <span>
                              {moment(
                                JSON.parse(location.state)?.start_date,
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </span> */}
                          </div>
                        </div>
                      </div>
                      <div className={style.templateContainer}>
                        <Tabs defaultActiveKey="1">
                          <TabPane
                            tab="Resolutions"
                            key="1"
                            className={style.tabStyle}
                          >
                            <div className={style.resolutionTab}>
                              I/We{"  "}
                              <input
                                className={style.stakeHolderBox}
                                placeholder="{ Stakeholder name }"
                                value={attendeeData?.name}
                                readOnly
                              />
                              being a member/ members of Africa Prudential PLC,
                              hereby appoint /{" "}
                              <select className={style.selectHolderTake}>
                                {proxyTemplateData &&
                                  proxyTemplateData.proxy_name_options &&
                                  proxyTemplateData.proxy_name_options.map(
                                    (item) => (
                                      <option key={item} value={item}>
                                        {item}
                                      </option>
                                    )
                                  )}
                              </select>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    proxyTemplateData?.content
                                  ),
                                }}
                              ></div>
                            </div>
                            <div
                              className={style.resolutionWrapper}
                              style={{
                                borderBottom: "1px dashed #6d7683",
                                marginBottom: "5rem",
                                marginTop: "5rem",
                              }}
                            >
                              {resolutions && resolutions.length
                                ? resolutions.map((item, idx) => (
                                    <ResolutionVote
                                      item={item}
                                      idx={idx}
                                      key={item.id}
                                      keyword="Resolution"
                                      attendeeData={attendeeData}
                                      handleVoteChange={handleVoteChange}
                                    />
                                  ))
                                : null}
                            </div>

                            <div className={style.resolutionWrapper}>
                              {statustoryResolution &&
                              statustoryResolution.length
                                ? statustoryResolution.map((item, idx) => (
                                    <ResolutionVote
                                      item={item}
                                      idx={idx}
                                      key={item.id}
                                      show={true}
                                      keyword="Resolution"
                                      attendeeData={attendeeData}
                                      handleVoteChange={
                                        handleStatutoryVoteChange
                                      }
                                    />
                                  ))
                                : null}
                            </div>
                            <div className={style.form__input_wrap}>
                              <div className={style.form__input_box}>
                                <label
                                  htmlFor={name}
                                  className={style.form__input_label}
                                >
                                  <Checkbox
                                    onChange={(e) =>
                                      setVoteTerms(e.target.checked)
                                    }
                                  >
                                    By submitting this form I agree to the
                                    Privacy Policy and Terms Of Use of Apems.
                                  </Checkbox>
                                </label>
                              </div>
                            </div>
                            <div
                              className={style.containerNav_right}
                              style={{ justifyContent: "flex-end" }}
                            >
                              {/* <Link
                                to="/Edit/create"
                                className={style.editContinue}
                              >
                                Ask a Question
                              </Link> */}
                              <button
                                onClick={submitVotes}
                                // disabled={false}
                                className={style.publishEvent}
                                style={{ backgroundColor: "#6D7683" }}
                              >
                                {votingLoader ? (
                                  <Spin size="large" color="#fff" />
                                ) : (
                                  "Submit Votes"
                                )}
                              </button>
                            </div>
                            {responseData && (
                              <AlertResponse
                                status={responseData.status}
                                data={responseData.data}
                                onClose={onClose}
                                message={responseData.message}
                              />
                            )}
                          </TabPane>
                          {/* <TabPane
                            tab="Elections"
                            key="2"
                            className={style.tabStyle}
                          >
                            <div className={style.electionTab}>
                              <h3 className={style.electionTitle}>Elections</h3>

                              {elections &&
                                elections.length > 0 &&
                                elections.map((item) => (
                                  <div
                                    className={style.electionType}
                                    key={shortid.generate()}
                                  >
                                    <h4>{item.position}</h4>
                                    <div className={style.electionCand}>
                                      <SingleSelect
                                        containerStyle={{
                                          flexDirection: "column",
                                        }}
                                        onChange={(data) =>
                                          handleElectionVoteChange({
                                            ...data,
                                            candidate_id: data.id,
                                            channel: "web",
                                            account_number: `${attendeeData?.account_number}`,
                                            attendee_id: attendeeData?.id,
                                          })
                                        }
                                      >
                                        {item.candidates.map((item) => (
                                          <RadioCard
                                            key={shortid.generate()}
                                            position={item.name}
                                            title={item.name}
                                            id={item.id}
                                            item={item}
                                          />
                                        ))}
                                      </SingleSelect>
                                    </div>
                                  </div>
                                ))}
                              <div className={style.form__input_wrap}>
                                <div className={style.form__input_box}>
                                  <label
                                    htmlFor={name}
                                    className={style.form__input_label}
                                  >
                                    <Checkbox
                                      onChange={(e) =>
                                        setVoteTerms(e.target.checked)
                                      }
                                    >
                                      By submitting this form I agree to the
                                      Privacy Policy and Terms Of Use of Apems.
                                    </Checkbox>
                                  </label>
                                </div>
                              </div>
                              <div
                                className={style.containerNav_right}
                                style={{ justifyContent: "flex-end" }}
                              >
                                <Link
                                  to="#"
                                  className={style.askQuestion}
                                  onClick={() => setOpenQuestion(true)}
                                >
                                  Ask a Question
                                </Link>
                                <button
                                  onClick={submitElectionVotes}
                                  className={style.publishEvent}
                                  style={{ backgroundColor: "#6D7683" }}
                                >
                                  Submit votes
                                </button>
                              </div>
                              {responseData && (
                                <AlertResponse
                                  status={responseData.status}
                                  data={responseData.data}
                                  onClose={onClose}
                                  message={responseData.message}
                                />
                              )}
                            </div>
                          </TabPane> */}
                        </Tabs>
                        <Modal
                          style={{
                            width: "100%",
                            maxWidth: "100%",
                            position: "absolute",
                            right: 0,
                            top: 0,
                          }}
                          visible={openQuestion}
                          onCancel={() => setOpenQuestion(false)}
                          width={"38%"}
                          bodyStyle={{
                            height: "180vh",
                            position: "relative",
                          }}
                          footer={null}
                          header={null}
                          position="relative"
                          closeIcon={
                            <span
                              className={style.closeModal}
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "-960%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#000",
                                height: "40px",
                                width: "40px",
                                borderRadius: "50%",
                                zIndex: 100000,
                              }}
                            >
                              <MdClose color="#fff" />
                            </span>
                          }
                        >
                          <section className={style.modalResolution}>
                            <span className={style.modalResolution_badge}>
                              Question
                            </span>
                            <h3 className={style.modalResolution_header}>
                              Ask Question
                            </h3>
                            <div className={style.modalResolution_formWrapper}>
                              <form>
                                <div className={style.form__input_wrap}>
                                  <div className={style.form__input_box}>
                                    <label
                                      htmlFor="question"
                                      className={style.form__input_label}
                                    >
                                      Select Question
                                    </label>
                                    <input
                                      className={style.form__input}
                                      type="text"
                                      placeholder="Select question"
                                      name="question"
                                    />
                                  </div>
                                </div>
                                <div className={style.form__input_wrap}>
                                  <div className={style.form__input_box}>
                                    <label
                                      htmlFor="question"
                                      className={style.form__input_label}
                                    >
                                      Question
                                    </label>
                                    <textarea
                                      className={style.form__input}
                                      placeholder="Type on your question"
                                      name="question"
                                    ></textarea>
                                  </div>
                                </div>
                                <button
                                  className={style.publishEvent}
                                  style={{ backgroundColor: "#6D7683" }}
                                >
                                  Send
                                </button>
                              </form>
                            </div>
                          </section>
                        </Modal>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
        <Modal
          style={{
            width: "100%",
            maxWidth: "100%",
            position: "absolute",
            right: 0,
            top: 0,
          }}
          visible={openDocument}
          onCancel={() => setOpenDocument(false)}
          width={"70%"}
          bodyStyle={{
            height: "180vh",
            position: "relative",
          }}
          footer={null}
          header={null}
          position="relative"
          closeIcon={
            <span
              className={style.closeModal}
              style={{
                position: "absolute",
                top: "50%",
                left: "-1810%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#000",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                zIndex: 100000,
              }}
            >
              <MdClose color="#fff" />
            </span>
          }
        >
          <section
            className={`${style.modalResolution} ${style.modalResolution_pd}`}
          >
            <span className={style.modalResolution_badge}>Past Document</span>
            <h3 className={style.modalResolution_header}>
              See event past documents
            </h3>
            <div className={style.uploadedDoc_list}>
              <div className={style.uploadedDoc_list_item}>
                <div className={style.uploadImg_name}>
                  <img
                    src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940356/apems/word_ki7ugm.png"
                    className={style.uploadImg}
                  />
                  <span className={style.uploadFile}>
                    Brief Report .pdf (1.5mb)
                  </span>
                </div>
                <div className={style.uploadFooter}>
                  <span>
                    <HiDownload color="#EF3125" size={19} />
                  </span>
                </div>
              </div>
              <div className={style.uploadedDoc_list_item}>
                <div className={style.uploadImg_name}>
                  <img
                    src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940356/apems/word_ki7ugm.png"
                    className={style.uploadImg}
                  />
                  <span className={style.uploadFile}>
                    Brief Report .pdf (1.5mb)
                  </span>
                </div>
                <div className={style.uploadFooter}>
                  <span>
                    <HiDownload color="#EF3125" size={19} />
                  </span>
                </div>
              </div>
              <div className={style.uploadedDoc_list_item}>
                <div className={style.uploadImg_name}>
                  <img
                    src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940351/apems/pdf_dhlfew.png"
                    className={style.uploadImg}
                  />
                  <span className={style.uploadFile}>
                    Brief Report .pdf (1.5mb)
                  </span>
                </div>
                <div className={style.uploadFooter}>
                  <span>
                    <HiDownload color="#EF3125" size={19} />
                  </span>
                </div>
              </div>
              <div className={style.uploadedDoc_list_item}>
                <div className={style.uploadImg_name}>
                  <img
                    src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940351/apems/pdf_dhlfew.png"
                    className={style.uploadImg}
                  />
                  <span className={style.uploadFile}>
                    Brief Report .pdf (1.5mb)
                  </span>
                </div>
                <div className={style.uploadFooter}>
                  <span>
                    <HiDownload color="#EF3125" size={19} />
                  </span>
                </div>
              </div>
              <div className={style.uploadedDoc_list_item}>
                <div className={style.uploadImg_name}>
                  <img
                    src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940356/apems/word_ki7ugm.png"
                    className={style.uploadImg}
                  />
                  <span className={style.uploadFile}>
                    Brief Report .pdf (1.5mb)
                  </span>
                </div>
                <div className={style.uploadFooter}>
                  <span>
                    <HiDownload color="#EF3125" size={19} />
                  </span>
                </div>
              </div>
            </div>
          </section>
        </Modal>
        <Modal
          onCancel={() => setOpenMeetingModal(false)}
          destroyOnClose
          closable={true}
          bodyStyle={{
            backgroundColor: "rgba(0,0,0, 0.45)",
            padding: 0,
            borderRadius: "40px",
          }}
          className="meetingPop"
          visible={openMeetingModal}
          closeIcon={
            <span
              className={style.closeModal}
              style={{
                position: "absolute",
                top: "-80%",
                right: "-90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#2b2b2b",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                // zIndex: 100000,
              }}
            >
              <MdClose color="#fff" />
            </span>
          }
          footer={null}
          header={null}
          zIndex="12000"
          position="relative"
        >
          <div className={style.eventJoinForm}>
            <h4 className={style.joinHeader}>
              Provide your meeting ID in order to Vote
            </h4>
            <JoinMeetingForm
              closeMeetingModal={(data) => {
                setAttendeeData(data);
                setOpenMeetingModal(false);
              }}
              toggleAudioTest={() => history.push("/Audio/test")}
              eventDetail={location.state}
              name={name}
              attendeeType="stalkholder"
              fromRoute="proxy"
              btnText="Start Voting"
            />
            {/* <VotingMeetingForm
              toggleAudioTest={() => setOpenMeetingModal(false)}
              closeMeetingModal={() => setOpenMeetingModal(false)}
            /> */}
          </div>
        </Modal>
        <Modal
          onCancel={() => setOpenUserMeetingModal(false)}
          destroyOnClose
          closable={false}
          bodyStyle={{
            backgroundColor: "rgba(0,0,0, 0.45)",
            padding: 0,
            borderRadius: "5px",
          }}
          visible={openUserMeetingModal}
          className="meetingPop"
          // onOk={() => setVisible(false)}

          footer={null}
          header={null}
        >
          <div className={style.eventJoinForm}>
            <h4 className={style.joinHeader}>Enter meeting room as</h4>
            <div className={style.regTypeBox}>
              <SingleSelect
                containerStyle={{
                  justifyContent: "flex-start",
                  width: "100%",
                }}
                selectedDefaultItem="0"
                onChange={(item) => toggleJoinForm(item)}
              >
                <SingleCard
                  title="A member"
                  position="1"
                  prefixCls="joinType"
                />
                <SingleCard
                  title="An Observer"
                  position="2"
                  prefixCls="joinType"
                />
              </SingleSelect>
            </div>
            {joinType === "2" && (
              <JoinMeetingForm
                toggleAudioTest={() => history.push("/Audio/test")}
                closeMeetingModal={(data) => {
                  setAttendeeData(data);
                  setOpenMeetingModal(false);
                }}
              />
            )}

            {joinType === "1" && (
              <JoinMeetingForm
                // closeMeetingModal={() => setOpenMeetingModal(false)}
                closeMeetingModal={(data) => {
                  setAttendeeData(data);
                  setOpenMeetingModal(false);
                }}
                toggleAudioTest={() => history.push("/Audio/test")}
              />
            )}
          </div>
        </Modal>
      </section>
    </EventPreviewLayout>
  );
};
// const StatutoryVote = ({
//   item,
//   idx,
//   keyword,
//   handleVoteChange,
//   attendeeData,
// }) => {
//   return (
//     <div className={style.pollContainer}>
//       <h4 className={style.pollTitle}>Statutory Resolution</h4>
//       <div className={style.pollPara}>{item.title}</div>
//       <div className={style.userReaction}>
//         <div className={style.userReactionBox}>
//           <img src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png" className={style.handleEmoji} />
//           <span className={style.handleReaction}>For</span>
//         </div>
//         <div className={style.userReactionBox}>
//           <img src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png" className={style.handleEmoji} />
//           <span className={style.handleReaction}>Against</span>
//         </div>
//         <div className={style.userReactionBox}>
//           <span className={style.handleReaction}>Against</span>
//         </div>
//       </div>
//     </div>
//   );
// };

const ResolutionVote = ({
  item,
  idx,
  keyword,
  handleVoteChange,
  state,
  attendeeData,
  show,
}) => {
  console.log({ resolutionVote: item });
  return (
    <div className={style.pollContainer}>
      <h4 className={style.pollTitle}> {`${keyword} ${idx + 1}`}</h4>
      <div className={style.pollPara}>{item.title}</div>
      <div className={style.userReaction}>
        <SingleSelect onChange={handleVoteChange}>
          <VoteCard
            title="For"
            position="1"
            item={item}
            attendeeData={attendeeData}
            show={show}
          />
          <VoteCard
            title="Against"
            position="2"
            item={item}
            show={show}
            attendeeData={attendeeData}
          />
          <VoteCard
            title="Abstain"
            position="3"
            item={item}
            show={show}
            attendeeData={attendeeData}
          />
        </SingleSelect>
      </div>
    </div>
  );
};

export const VoteCard = ({
  cardClick,
  isSelected,
  item,
  title,
  childKey,
  stepIndex,
  attendeeData,
  prefixCls = "cardList_item",
  show,
}) => {
  const [tab, setTab] = useState("");

  console.log({ attendeeData });

  const actionHandler = (title) => {
    setTab(title);

    const payload = {
      resolution_id: item.id,
      attendee_id: attendeeData?.id,
      account_number: attendeeData?.account_number,
      votes_for: title === "For" ? 1 : 0,
      votes_abstain: title === "Abstain" ? 1 : 0,
      votes_against: title === "Against" ? 1 : 0,
      channel: "web",
    };

    cardClick(stepIndex, payload);
  };

  return (
    <div
      className={`${style.userReactionBox} ${
        isSelected === stepIndex && tab === "For" ? style.userFor : ""
      } ${
        isSelected === stepIndex && tab === "Against" ? style.userAgainst : ""
      }
      ${isSelected === stepIndex && tab === "Abstain" ? style.userAbstain : ""}
      `}
      onClick={() => actionHandler(title)}
    >
      {show && (
        <img
          src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
          className={style.handleEmoji}
        />
      )}

      <span className={style.handleReaction}>{title}</span>
    </div>
  );
};

export const SpeakerList = ({ item }) => {
  const styleObj = (image) => {
    return {
      background: `linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),
        url(${image})`,
      position: "relative",
      backgroundRrepeat: "no-repeat",
      backgroundSize: "cover",
      height: "100%",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };
  return (
    <div className={style.speakerList}>
      <div className={style.speakerImg} style={styleObj(item.photo)}>
        <div className={style.speaker_name}>{item.name}</div>
      </div>
    </div>
  );
};

export const DonationPaymentCard = ({ item }) => {
  const [donationAmount, setDonationAmount] = useState();
  const [donationLoader, setDonationLoader] = useState(false);

  const verifyDonationHandler = async (payload) => {
    try {
      const { data } = await verifyDonation(
        payload.donationId,
        payload.reference
      );
      console.log("verofy", data);
      setDonationLoader(false);
      Swal.fire("Done!", "Donation created successfully", "success");
    } catch (err) {
      console.log(err);
    }
  };
  const payWithPayStack = (data) => {
    const handler = window.PaystackPop.setup({
      key: "pk_test_f7452f705b3f9884c0509224c6bdaaff6b220d14",
      email: data.email,
      amount: data.amount * 100,
      currency: "NGN",
      channels: ["card"],
      ref: data.reference, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: "+2348012345678",
          },
        ],
      },
      callback: (response) => {
        verifyDonationHandler({
          donationId: item.id,
          reference: data.reference,
        });
      },
      onClose: () => {
        setDonationLoader(false);
      },
    });
    handler.openIframe();
  };

  const submitDonation = async (item) => {
    try {
      if (donationAmount) {
        setDonationLoader(true);
        const {
          data: { data },
        } = await donationPayment({ amount: donationAmount }, item.id);
        payWithPayStack({
          amount: donationAmount,
          email: "test@test.com",
          reference: data.payment_reference,
        });
      }
    } catch (err) {
      console.log("errr", err);
    }
  };
  return (
    <div className={style.donationList} key={item.id}>
      <div className={style.donationItem}>
        <div className={style.donationHeader}>
          <div className={style.donationHeader_left}>
            <h4 className={style.donationHeader_left_title}>Donation Title</h4>
            <h3 className={style.donationHeader_left_val}>{item.title}</h3>
          </div>
          <div className={style.donationHeader_left}>
            <h4 className={style.donationHeader_left_title}>Donation Goal</h4>
            <h3 className={style.donationHeader_left_val}>{item.goal} NGN</h3>
          </div>
        </div>
        <div className={style.donationProgress}>
          <Progress percent={30} showInfo={false} />
        </div>
        <div className={style.donationFooter}>
          <h5 className={style.donationFooter_saved}>1,000,000 raised</h5>
          <h5 className={style.donationFooter_remain}>1,000,000</h5>
        </div>
      </div>
      <div className={style.donationInputBox}>
        <label className={style.donationLabel}>Enter donation amount</label>
        <input
          type="number"
          className={style.donationInput}
          placeholder="Amount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        />
      </div>
      <div className={style.donationBtnBox}>
        <button
          disabled={donationLoader}
          onClick={() => submitDonation(item)}
          className={style.donationBtn}
        >
          {donationLoader ? <Spin /> : " Make Donation"}
        </button>
      </div>
    </div>
  );
};

export default EventJoinPreview;
