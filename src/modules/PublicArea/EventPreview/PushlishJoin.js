import { Checkbox, Modal, Progress, Spin, Tabs } from "antd";
import classNames from "classnames";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { BsAlarmFill, BsCaretRightFill } from "react-icons/bs";
import { HiDownload, HiShare } from "react-icons/hi";
import { MdClose, MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import shortid from "shortid";
import Swal from "sweetalert2";
import {
  donationPayment,
  fetchDonation,
  fetchEvent,
  verifyDonation,
} from "../../../api/eventHandler";
import {
  getElectionsHandler,
  getResolutionsHandler,
} from "../../../api/resolutionHandler";
import {
  createVotes,
  getResources,
  getSpeakers,
} from "../../../api/resourceHandler";

import AlertResponse from "../../../Auth/AuthModalForm/AlertResponse";
import SingleSelect, {
  RadioCard,
  SingleCard,
} from "../../../components/Cards/SingleCardSelect";
import EventPreviewLayout from "../../../components/Layout/EventPreviewLayout";
import { getUserInfo } from "../../../utils/userInfo";
import AgmLink from "../../LoggedArea/CreateEvent/Resources/AgmLink";
import DocumentList from "../../LoggedArea/CreateEvent/Resources/DocumentList";
import VideoList from "../../LoggedArea/CreateEvent/Resources/VideoList";
import { JoinMeetingForm, VotingMeetingForm } from "../EventJoin";
import style from "./index.module.scss";

const { TabPane } = Tabs;

const EventJoinPublishPreview = () => {
  const [eventDetail, setEventDetail] = useState();
  const [tab, setTab] = useState("eventTab");
  const [openDocument, setOpenDocument] = useState(false);
  const [openMeetingModal, setOpenMeetingModal] = useState(false);
  const [openUserMeetingModal, setOpenUserMeetingModal] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [elections, setElections] = useState([]);
  const [joinType, setJoinType] = useState("1");
  const [speakers, setSpeakers] = useState();
  const [, setUiLoader] = useState(false);
  const [, setLoadingElection] = useState(false);

  const [documents, setDocuments] = useState([]);
  const [resolutions, setResolutions] = useState();
  const [votingLoader, setVotingLoader] = useState(false);
  const [responseData, setResponseData] = useState();
  const [statustoryResolution, setStatustoryResolution] = useState();

  const [videos, setVideos] = useState([]);
  const [links, setLinks] = useState([]);
  const [votesArr, setVotesArr] = useState([]);
  const [, setSpeakerError] = useState();
  const eventResponse = useSelector((state) => state.eventTypes);
  const [currentEventType, setCurrentEventType] = useState();

  const history = useHistory();
  const { id } = useParams();
  const [, setVideoError] = useState();
  const [, setLinkError] = useState();
  const [, setDocumentError] = useState();
  const [donations, setDonations] = useState();

  const toggleJoinForm = (item) => {
    setJoinType(item.id);
  };

  const browseEventByid = async (id) => {
    setUiLoader(true);
    const {
      data: { data },
    } = await fetchEvent(id);

    const currentEventType = eventResponse.data?.find(
      (item) => item.id === data.event_type.id
    );
    setUiLoader(false);
    setCurrentEventType(currentEventType);
    console.log("bdwbbwwdwd", data);
    setEventDetail(data);
  };
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
  }, []);
  useEffect(() => {
    browseEventByid(id);
    fetchElections(id);
  }, [id]);
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

  const submitVotes = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        votes: votesArr,
      };
      setVotingLoader(true);
      const { data } = await createVotes(payload);
      setVotingLoader(false);
      setResponseData({
        data: data.data,
        status: "success",
        message: "Voting successfully",
      });
    } catch (err) {
      setVotingLoader(false);
      const error = err.response?.data ?? "Something went wrong";
      setResponseData({ data: error, status: "fail", message: error });
    }
  };

  const handleVoteChange = (payload, idx) => {
    const copyVotesArr = [...votesArr];

    const index = copyVotesArr.findIndex(
      (item) => item.resolution_id === payload.resolution_id
    );
    if (index > -1) {
      copyVotesArr.splice(index, 1);
      copyVotesArr.push(payload);
    } else {
      copyVotesArr.push(payload);
    }

    setVotesArr(copyVotesArr);
  };

  return (
    <EventPreviewLayout eventDetail={eventDetail}>
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
                          url={`https://apems-frontend-dev.apems.co/Event/publish/preview/${eventDetail?.id}`}
                          title={eventDetail?.title}
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
                          url={`https://apems-frontend-dev.apems.co/Event/publish/preview/${eventDetail?.id}`}
                          quote={eventDetail?.title}
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
                          url={`https://apems-frontend-dev.apems.co/Event/publish/preview/${eventDetail?.id}`}
                          title={eventDetail?.title}
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
                        {eventDetail?.description}
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
                  {tab === "resourceTab" && (
                    <div>
                      <h3 className={style.resourceType_title}>
                        Documents and materials for event
                      </h3>
                      <div className={style.resourceColl}>
                        <div className={style.uploadedDoc_list}>
                          {documents.length ? (
                            <div className={style.documentWrapper}>
                              <DocumentList
                                items={documents}
                                showSettings={false}
                                showDelete={false}
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
                              date={moment(eventDetail.start_date).add(
                                "2",
                                "days"
                              )}
                              // date={Date.now() + 5000}
                              // date={moment() + 100000}
                            >
                              <span className={style.duration_date}>
                                Already Ready
                              </span>
                            </Countdown>
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
                              />
                              being a member/ members of Africa Prudential PLC,
                              hereby appoint /{" "}
                              <select
                                className={style.selectHolderTake}
                                placeholder="{ Stakeholder position }"
                              >
                                <option>Seun Sokeye</option>
                                <option>Chijindu Amadi</option>
                                <option>Ridwan Ajayi</option>
                                <option>Ayodeji Fasore</option>
                              </select>
                              <input
                                className={style.stakeHolderBox}
                                placeholder="{ Stakeholder position }"
                              />
                              failing him, the Chairman of the meeting as my/our
                              proxy to act and vote for me/us and on my/our
                              behalf at the 5TH Annual General Meeting of the
                              Company to be held on Monday, May 31, 2021, at
                              Radisson Blu Anchorage Hotel, 1a Ozumba Mbadiwe
                              Avenue Victoria Island Lagos, at 11.00a.m. and at
                              any adjournment thereof. A member (Shareholder)
                              who is unable to attend an Annual General Meeting
                              is allowed by law to vote by proxy. The above
                              proxy form has been prepared to enable you
                              exercise your right to vote, in case you cannot
                              personally attend the meeting. Please sign this
                              proxy form and forward it, so as to reach the
                              registered office of the Registrar, Africa
                              Prudential Plc, 220B Ikorodu Road, Palmgrove,
                              Lagos, or via email at cfc@africaprudential.com
                              not later than 48 hours before the time fixed for
                              the meeting. If executed by a Corporation, the
                              proxy form must be under its common seal or under
                              the hand of a duly authorized officer or attorney.
                              It is a requirement of the law under the Stamp
                              Duties Act, Cap S8, Laws of the Federation of
                              Nigeria, 2004, that any instrument of proxy to be
                              used for the purpose of voting by any person
                              entitled to vote at any meeting of shareholders
                              must be stamped by the Commissioner for Stamp
                              Duties. However, in compliance with the CAC
                              Guidelines for conduct of AGM by Proxy, the
                              Company has made arrangement at its cost, for the
                              stamping of the duly completed and signed proxy
                              forms submitted to the Company’s Registrars. The
                              Proxy must produce the Admission Card below to
                              gain entrance into the Meeting.
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
                                      handleVoteChange={handleVoteChange}
                                    />
                                  ))
                                : null}
                            </div>

                            <div className={style.resolutionWrapper}>
                              {statustoryResolution &&
                              statustoryResolution.length
                                ? statustoryResolution.map((item, idx) => (
                                    <StatutoryVote
                                      item={item}
                                      idx={idx}
                                      key={item.id}
                                      keyword="Resolution"
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
                                  <Checkbox>
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
                                to="/Edit/create"
                                className={style.editContinue}
                              >
                                Ask a Question
                              </Link>
                              <button
                                onClick={submitVotes}
                                disabled={true}
                                className={style.publishEvent}
                                style={{ backgroundColor: "#6D7683" }}
                              >
                                {votingLoader ? (
                                  <Spin size="large" color="#fff" />
                                ) : (
                                  "    Submit Votes"
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
                          <TabPane
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
                                      >
                                        {item.candidates.map((item) => (
                                          <RadioCard
                                            key={shortid.generate()}
                                            position={item.name}
                                            title={item.name}
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
                                <Link
                                  to="#"
                                  className={style.askQuestion}
                                  onClick={() => setOpenQuestion(true)}
                                >
                                  Ask a Question
                                </Link>
                                <button
                                  className={style.publishEvent}
                                  style={{ backgroundColor: "#6D7683" }}
                                >
                                  Submit votes
                                </button>
                              </div>
                            </div>
                          </TabPane>
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
                zIndex: 100000,
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
            <VotingMeetingForm
              toggleAudioTest={() => history.push("/Audio/test")}
              closeMeetingModal={() => setOpenMeetingModal(false)}
            />
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
                closeMeetingModal={() => setOpenMeetingModal(false)}
              />
            )}

            {joinType === "1" && (
              <JoinMeetingForm
                closeMeetingModal={() => setOpenMeetingModal(false)}
                toggleAudioTest={() => history.push("/Audio/test")}
              />
            )}
          </div>
        </Modal>
      </section>
    </EventPreviewLayout>
  );
};
const StatutoryVote = ({ item, idx, keyword }) => {
  return (
    <div className={style.pollContainer}>
      <h4 className={style.pollTitle}>Statutory Resolution</h4>
      <div className={style.pollPara}>{item.title}</div>
      <div className={style.userReaction}>
        <div className={style.userReactionBox}>
          <img
            src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
            className={style.handleEmoji}
          />
          <span className={style.handleReaction}>For</span>
        </div>
        <div className={style.userReactionBox}>
          <img
            src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
            className={style.handleEmoji}
          />
          <span className={style.handleReaction}>Against</span>
        </div>
        <div className={style.userReactionBox}>
          <span className={style.handleReaction}>Against</span>
        </div>
      </div>
    </div>
  );
};

const ResolutionVote = ({ item, idx, keyword, handleVoteChange, state }) => {
  return (
    <div className={style.pollContainer}>
      <h4 className={style.pollTitle}> {`${keyword} ${idx + 1}`}</h4>
      <div className={style.pollPara}>{item.title}</div>
      <div className={style.userReaction}>
        <SingleSelect onChange={handleVoteChange}>
          <VoteCard title="For" position="1" item={item} />
          <VoteCard title="Against" position="2" item={item} />
          <VoteCard title="Abstain" position="3" item={item} />
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
  prefixCls = "cardList_item",
}) => {
  const [tab, setTab] = useState("");
  const user = getUserInfo();

  const actionHandler = (title) => {
    setTab(title);

    const payload = {
      resolution_id: item.id,
      attendee_id: user.userId,
      account_number: "3434455",
      votes_for: title === "For" ? 1 : 0,
      votes_abstain: title === "Abstain" ? 1 : 0,
      votes_against: title === "Against" ? 1 : 0,
      channel: 2,
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

export default EventJoinPublishPreview;
