import { Alert, Modal, Progress, Collapse, Spin } from "antd";
import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlinePlus, AiFillFileExclamation } from "react-icons/ai";
import { BiAlarm, BiRadioCircle } from "react-icons/bi";
// import { BsFillAlarmFill } from "react-icons/bs";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { CgPoll } from "react-icons/cg";
// import { FiCheck } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosCheckmarkCircle, IoMdClose } from "react-icons/io";
import { MdClose, MdSend } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
// import { useLocation } from "react-router-dom";
import Pusher from "pusher-js";
import ReactAudioPlayer from "react-audio-player";
// import fileDownload from "js-file-download";
// import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import { download } from "../../../utils/download";
import VoteForm from "./VoteForm";
import VideoQueueCandidate from "./VideoQueueCandidate";
import ResolutionVoteForm from "./ResolutionVoteForm";
import ElectionVote from "./ElectionVote";

// import DocViewer from "react-doc-viewer";
import {
  getMeetingQuestions,
  askQuestionHandler,
  answerQuestionHandler,
  createQuestionLabel,
  fetchQuestionLabel,
  attachQuestionToLabel,
  eventNotification,
  joinMeetingHandler,
} from "../../../api/eventHandler";
import {
  getPollHandler,
  getResolutionsHandler,
  resolutionHandler,
  getElectionsHandler,
  updateVoteStatus,
} from "../../../api/resolutionHandler";
import {
  getMusics,
  getResources,
  playMusicOnline,
  createOnlineVotes,
} from "../../../api/resourceHandler";

import SingleSelect, {
  SingleCard,
  ElectonRadioCard,
} from "../../../components/Cards/SingleCardSelect";
import DocumentCard from "../../../components/MeetingDashboard/DocumentCard";
import Header from "../../../components/MeetingDashboard/Header";
import MusicCard from "../../../components/MeetingDashboard/MusicCard";
import { joinZoomMeeting } from "../../../utils/zoom";
import style from "./index.module.scss";
import "./index.scss";
import QAnswer from "./QAnswer";
import { askQuestionSchema } from "../../../utils/Validation/meetingSchemes";
import ResolutionItem from "./ResolutionItem";

import resolver from "../../../utils/promiseWrapper";
import { useDispatch, useSelector } from "react-redux";

// import { Document, Page } from "react-pdf";

// axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

const CloseIcon = ({ closeModal }) => {
  return (
    <span
      onClick={closeModal}
      className={style.closeModal}
      style={{
        position: "absolute",
        top: "-60%",
        right: "-120%",
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
  );
};
const { Panel } = Collapse;

// let copyMeetingQuestion = [];

let copyResolution = [];
let copyDocument = [];
let copyElection = [];
function MeetingDashboard() {
  // const { name, email } = useSelector((state) => state.profile);
  const [showDocument, setShowDocument] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [musics, setMusics] = useState([]);
  const [openResolutionModal, setOpenResolutionModal] = useState(false);
  const [openQandAModal, setOpenQandAModal] = useState(false);
  const [currentResolutionTab, setCurrentResolutionTab] = useState("1");
  const [currentQuestionTab, setCurrentQuestionTab] = useState("1");
  const [openVotingCollation, setOpenVotingCollation] = useState(false);
  const [openStatutoryResolution, setOpenStatutoryResolution] = useState(false);
  const [openResolutionResult, setOpenResolutionResult] = useState(false);
  const [reloadMusic, setReloadMusic] = useState(false);
  const [resolutions, setResolutions] = useState([]);
  const [elections, setElections] = useState([]);
  const [openPollVoteModal, setOpenPollVoteModal] = useState(false);
  const [openResolutionVoteModal, setOpenResolutionVoteModal] = useState(false);
  const [openQandAModalGallery, setOpenQandAModalGallery] = useState(false);
  const [openPollModal, setOpenPollModal] = useState(false);
  const [polls, setPolls] = useState([]);
  const [votingLoader, setVotingLoader] = useState(false);
  const [reloadResolution, setReloadResolution] = useState(false);
  const [openPushingCollation, setOpenPushingCollation] = useState(false);
  const [publishFinalResult, setpublishFinalResult] = useState();
  const [reloadQuestion, setReloadQuestions] = useState(false);
  // const [, setMeetingQuestions] = useState([]);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [openQuestionList, setOpenQuestionList] = useState(false);
  // const [resolutionQuestion, setResolutionQuestion] = useState();
  // const [showQuestion, setShowQuestion] = useState(false);
  // const [showParticipant, setShowParticipant] = useState(false);
  const [leaveMeeting, setLeaveMeeting] = useState(false);
  const [openDocuReader, setOpenDocReader] = useState(false);
  const [activeFile, setActiveFile] = useState();
  const [successResponse, setSuccessResponse] = useState();
  const [askingQuestion, setAskingQuestion] = useState(false);
  const [openElectionVoteModal, setOpenElectionVoteModal] = useState(false);
  // const [, setAnsweringQuestion] = useState(false);
  // const [, setReloadAnswer] = useState(false);
  const [pusher, setPusher] = useState();
  const [answerToQuestionResponse, setAnswerToQuestionResponse] = useState();
  const [answerTextError, setAnswerTextError] = useState();
  const [answerQuestionTextValue, setAnswerQuestionTextValue] = useState("");
  const [answeringQuestion, setAnsweringQuestion] = useState(false);
  const [openQuestionToAnswer, setOpenQuestionToAnswer] = useState(false);
  const [selectedQuestionToAnswer, setSelectedQuestionToAnswer] = useState();
  const [questionLabelText, setQuestionLabelText] = useState("");
  const [questionLabels, setQuestionLabels] = useState([]);
  const [reloadQuestionLabel, setReloadQuestionLabel] = useState(false);
  const [openQuestionlabel, setOpenQuestionlabel] = useState(false);
  const [questionLabelResponse, setQuestionLabelResponse] = useState();
  const [creatingLabel, setCreatingLabel] = useState(false);
  const [questionText, setQuestionText] = useState("");
  // const [voteCollection, setVoteCollection] = useState([]);
  const [collationResult, setCollationResult] = useState();
  const [selectedResolution, setSelectedResolution] = useState();
  const [addingResolution, setAddingResolution] = useState(false);
  const [resolutionSuccess, setResolutionSuccess] = useState();
  const [resolutionError, setResolutionError] = useState();
  const [resolutionTitle, setResolutionTitle] = useState();
  const [resultMessage, setResultMessage] = useState("Pending");
  const [totalVoteCount, setTotalVoteCount] = useState();
  // const notifications = useSelector((state) => state.notifications);
  const [selectedMusic, setSelectedMusic] = useState();
  const [, setAttendeeOpenAudio] = useState(false);
  const [openAudio, setOpenAudio] = useState(false);
  const audioRef = useRef();
  const attendeeAudioRef = useRef();
  const questions = useSelector((state) => state.questions);
  // const location = useLocation();

  const [currentCount, setCurrentCount] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });
  console.log(setCurrentCount, "setCurrentCount log");
  const { seconds, minutes, hours, days } = currentCount;

  console.log("questiontrst =>", questions);
  const eventInfo = localStorage.getItem("eventInfo");

  useEffect(() => {
    console.log({ audioRef: audioRef });
  });
  const dispatch = useDispatch();
  // const [questionText, setQuestionText] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(askQuestionSchema),
  });

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const getQuestionLabels = async (eventId) => {
    const [result] = await resolver(fetchQuestionLabel(eventId));
    console.log("questionLabels", questionLabels);
    if (result) {
      setQuestionLabels(result.data.data);
    }
  };

  useEffect(() => {
    joinEvent(JSON.parse(eventInfo)?.id);
  }, [eventInfo && JSON.parse(eventInfo)?.id]);

  const joinEvent = async (id) => {
    try {
      await joinMeetingHandler(id);
    } catch (err) {
      console.log({ err: err });
    }
  };

  const addQuestionLabel = async (e) => {
    e.preventDefault();
    setCreatingLabel(true);
    const [result, error] = await resolver(
      createQuestionLabel(JSON.parse(eventInfo).id, {
        title: questionLabelText,
      })
    );
    console.log("jjdjdj", result);
    setCreatingLabel(false);

    if (result) {
      setQuestionLabelResponse({
        error: false,
        status: "success",
        message: "Label created successfully",
      });
      setReloadQuestionLabel((prev) => !prev);
      setQuestionLabelText("");
    }
    if (error) {
      setQuestionLabelResponse({
        error: true,
        status: "error",
        message: "Something went wrong",
      });
    }
  };

  const fetchElections = async (eventId) => {
    try {
      const {
        data: { data },
      } = await getElectionsHandler(eventId);

      setElections(data);
    } catch (ex) {}
  };

  useEffect(() => {
    getQuestionLabels(JSON.parse(eventInfo)?.id);
  }, [eventInfo && JSON.parse(eventInfo)?.id, reloadQuestionLabel]);

  const handleSelectedQuestionToAnswer = (item) => {
    setOpenQuestionToAnswer(true);

    const resolution = resolutions.find(
      (data) => data.id === item.resolution_id
    );

    console.log({ selectedQuestionToAnswer: item });
    setSelectedQuestionToAnswer({ ...item, resolutionTitle: resolution.title });
  };

  useEffect(() => {
    const pusher = new Pusher("f2d97c4c2c843342fbb5", {
      cluster: "eu",
      // wsHost: "https://apems-votes-dev.apems.co",
      // wsPort: 6001,
      // wssPort: 6001,
      enabledTransports: ["ws", "wss"],
      authEndpoint: "https://apems-votes-dev.apems.co/broadcasting/auth",
      forceTLS: true,
    });

    // const pusher = new Pusher("2b7fdd49cb0f3e7ecfe0", {
    //   cluster: "eu",
    //   // wsPort: 6001,
    //   // wssPort: 6001,
    //   enabledTransports: ["ws", "wss"],
    //   // authEndpoint: "http://localhost:5000/pusher/auth",
    //   forceTLS: true,
    //   // authorizer: authorizer,
    // });

    pusher.connection.bind("connected", (e) => {
      console.log("connected", e);
    });

    pusher.connection.bind("error", function (err) {
      console.log("push error", err);
      // if (err.error.data.code === 4004) {
      //   console.log("Over limit!");
      // }
    });
    setPusher(pusher);
  }, []);

  const voteTimeHandler = async (resolution, payload) => {
    const [result, error] = await resolver(
      updateVoteStatus(resolution.id, payload)
    );
    console.log("response voting", result, error);
  };

  useEffect(() => {
    if (pusher) {
      if (resolutions.length) {
        resolutions.forEach((resolution) => {
          console.log("resolution scope", pusher);
          const voteModelStatusEventChannel = pusher.subscribe(
            `ModelVoteStatus.${resolution.id}`
          );
          voteModelStatusEventChannel.bind(
            "VoteModelStatusEvent",
            function (resolution) {
              console.log("VoteModelStatusEvent", resolution);
              fetchResolutions(JSON.parse(eventInfo)?.id);
              // if (resolution && resolution.data.status !== "initial") {
              //   const resolutionIdx = copyResolution.findIndex(
              //     (item) => item.id === resolution.data.id
              //   );
              //   const copyRes = [...copyResolution];
              //   copyRes[resolutionIdx] = {
              //     ...copyRes[resolutionIdx],
              //     status: resolution.data.status,
              //   };
              //   copyResolution = copyRes;
              //   setResolutions(copyResolution);
              // }
            }
          );
          const voteChannel = pusher.subscribe(`VoteChannel.${resolution.id}`);
          voteChannel.bind("voteBC", function (vote) {
            console.log("gvottte", vote);
            // const voteCollectionTemp = [...voteCollection, vote];
            // const copyResolution = [...resolutions];
            // setResolutions(copyResolution);
            // setVoteCollection(voteCollectionTemp);
            fetchResolutions(JSON.parse(eventInfo)?.id);
          });

          const publishVoteChannel = pusher.subscribe(
            `ResultBroadCast.${resolution.id}`
          );
          publishVoteChannel.bind("PublishResultEvent", function (vote) {
            console.log("vot6e", vote);

            if (vote.data.result_status === "published") {
              fetchResolutions(JSON.parse(eventInfo)?.id);
              // const transformData =  vote.data.forEach(item => {

              // })
              setpublishFinalResult(vote.data);
              const resultArr = vote.data.voting_results;
              const res = resultArr.map((item, i) => {
                if (i === 0) {
                  const firstElem = resultArr[i].total_no;
                  const nextElem = resultArr[i + 1].total_no;

                  if (firstElem > nextElem) {
                    return {
                      ...item,
                      winner: true,
                    };
                  } else {
                    return {
                      ...item,
                      winner: false,
                    };
                  }
                } else {
                  const currElem = resultArr[i].total_no;
                  const prevElem = resultArr[i - 1].total_no;
                  if (currElem > prevElem) {
                    return {
                      ...item,
                      winner: true,
                    };
                  } else {
                    return {
                      ...item,
                      winner: false,
                    };
                  }
                }
              });
              vote.data.voting_results = res;
              console.log({ published: vote.data });
              setpublishFinalResult(vote.data);
              const forVoteCount = vote.data.voting_results.find(
                (item) => item.contestant_id === "votes_for"
              );
              const againstVoteCount = vote.data.voting_results.find(
                (item) => item.contestant_id === "votes_against"
              );
              const totalVoteCount = vote.data.voting_results.reduce(
                (prev, current) => current.total_no + prev,
                0
              );
              console.log({ totalVoteCount, againstVoteCount, forVoteCount });

              setTotalVoteCount(totalVoteCount);

              if (forVoteCount && againstVoteCount) {
                if (forVoteCount.total_no > againstVoteCount.total_no) {
                  // setResultMessage("Motion carried");

                  setResultMessage("Motion carried");
                } else {
                  setResultMessage("Motion not carried");
                }
              }

              setOpenPushingCollation(true);
            } else {
              setCollationResult(vote.data);
              setOpenVotingCollation(true);
            }
          });
        });
      }
    }
  }, [resolutions.length]);

  // const strokenColor = () => {
  //   if (resultMessage.message === "Motion carried") return true;
  //   if (resultMessage.message === "Motion not carried") return false;
  // };

  useEffect(() => {
    if (pusher && eventInfo) {
      const channelResolution = pusher.subscribe(
        `ResolutionBroadCast.${JSON.parse(eventInfo).id}`
      );
      channelResolution.bind(`ResolutionCreatedEvent`, function (resolution) {
        console.log({ eventResolution: resolution.data });
        const resMap = resolution.data.map((item) => {
          const payload = { ...item };
          payload.options = [
            {
              poll_id: item.id,
              name: "For",
              id: item.id,
            },
            {
              poll_id: item.id,
              name: "Against",
              id: item.id,
            },
            {
              poll_id: item.id,
              name: "Abstain",
              id: item.id,
            },
          ];
          return payload;
        });
        const copyArr = [...copyResolution, ...resMap];
        setResolutions(copyArr);
        copyResolution = copyArr;
      });

      const channelDocument = pusher.subscribe(
        `DocumentUploadBroadcast.${JSON.parse(eventInfo).id}`
      );

      channelDocument.bind(`DocumentUploadedEvent`, function (document) {
        console.log({ eventDoc: document.data });
        const resource = document.data.resource_files;
        copyDocument = [...copyDocument, ...resource];
        setDocuments(copyDocument);
      });

      const channelMusic = pusher.subscribe(
        `PlayMusicBroadcast.${JSON.parse(eventInfo).id}`
      );

      channelMusic.bind(`PlayMusicEvent`, function (music) {
        console.log({ eventMusic: music.data });
        setSelectedMusic(music.data);
        setOpenAudio(true);
        setAttendeeOpenAudio(true);
        console.log({ role: JSON.parse(eventInfo).role });

        if (eventInfo && JSON.parse(eventInfo).role === 1) {
          if (music.data.status === "pause") {
            audioRef.current?.audioEl?.current.pause();
            attendeeAudioRef.current?.audioEl?.current.pause();
          } else {
            audioRef.current?.audioEl?.current.play();
            attendeeAudioRef.current?.audioEl?.current.play();
          }
        } else {
          if (music.data.status === "pause") {
            attendeeAudioRef.current?.audioEl?.current.pause();
          } else {
            attendeeAudioRef.current?.audioEl?.current.play();
          }
        }
      });
      console.log("notif pusher scope", pusher);

      const notifChannel = pusher.subscribe(
        `AppNotificationBroadcast.${JSON.parse(eventInfo).id}`
      );

      notifChannel.bind("AppNotificationEvent", function (notif) {
        console.log("notifEvent", notif.data);

        dispatch({
          type: "RECEIVED_NOTIFICATION",
          payload: [notif.data],
        });
      });
      const channel = pusher.subscribe(`event.${JSON.parse(eventInfo).id}`);
      channel.bind("QuestionEvent", function (question) {
        console.log("QuestionEvent=>", question);

        if (question && question.data.answer) {
          dispatch({
            type: "LISTEN_ANSWERED_QUESTION",
            payload: question.data,
          });
        } else {
          dispatch({ type: "ASK_QUESTION", payload: [question.data] });
        }
      });
    }

    // return () => {
    //   pusher.unsubscribe("my-channel");
    //   pusher.disconnect();
    // };
  }, [pusher]);

  const getEventNotif = async () => {
    const [result] = await resolver(
      eventNotification(JSON.parse(eventInfo).id)
    );

    const unReadMsg = result.data.data.filter((item) => item.read === false);
    console.log({ unReadMsg });

    console.log({ result });
    if (result) {
      dispatch({
        type: "RECEIVED_NOTIFICATION",
        payload: unReadMsg,
      });
    }
  };

  useEffect(() => {
    if (eventInfo) {
      getEventNotif(eventInfo);
    }
  }, [eventInfo]);

  const stopResolutionVoting = (status, selectedItem) => {
    const resolutionIdx = resolutions.findIndex(
      (item) => item.id === selectedItem.id
    );
    const copyResolution = [...resolutions];

    copyResolution[resolutionIdx] = { ...selectedItem, voteStatus: status };
    setResolutions(copyResolution);
  };

  const fetchDocuments = async (filter) => {
    try {
      let arr = [];
      const {
        data: { data },
      } = await getResources("document", JSON.parse(eventInfo)?.id);

      data.forEach((element) => {
        arr = [...arr, ...element.resource_files];
      });
      copyDocument = arr;

      setDocuments(arr);
    } catch (err) {
      console.log("erreree", err);
    }
  };

  const fetchMusic = async (filter) => {
    try {
      const {
        data: { data },
      } = await getMusics(JSON.parse(eventInfo)?.id);
      setMusics(data);
    } catch (err) {}
  };

  const fetchMeetingQuestions = async (eventId) => {
    try {
      const {
        data: { data },
      } = await getMeetingQuestions(eventId);
      // copyMeetingQuestion = data;
      // setMeetingQuestions(data);

      console.log("fetchMeetingQuestions=>", data);
      dispatch({ type: "ASK_QUESTION", payload: data });
    } catch (err) {}
  };

  useEffect(() => {
    fetchDocuments();
  }, []);
  useEffect(() => {
    fetchMusic();
  }, [reloadMusic]);

  const joinHandler = () => {
    try {
      let result = "";

      window.ZoomMtg.generateSignature({
        meetingNumber: JSON.parse(eventInfo)?.meeting?.code,
        apiKey: "Fq6xQg9mSdGRpnTIpi_duw",
        apiSecret: "PPEMimQs8k4IQrnMqAzuIMDTaHZMIhEIZEZj",
        role: JSON.parse(eventInfo)?.role,
        success: function (res) {
          result = res.result;
        },
      });

      console.log(
        "resutlt",
        result,
        JSON.parse(eventInfo)?.name,
        JSON.parse(eventInfo)?.email
      );

      joinZoomMeeting({
        signature: result,
        meetingNumber: JSON.parse(eventInfo)?.meeting?.code,
        password: JSON.parse(eventInfo)?.meeting?.password,
        leaveUrl: JSON.parse(eventInfo)?.leaveUrl,
        userName: JSON.parse(eventInfo)?.name,
        userEmail: JSON.parse(eventInfo)?.email,
      });
    } catch (err) {
      console.log("errrrr", err);
    }
  };

  useEffect(() => {
    //  clientHandler();
    joinHandler();
  }, []);

  const handleResolutionTab = (item) => {
    setCurrentResolutionTab(item.id);
  };

  const handleQuestionTab = (item) => {
    setCurrentQuestionTab(item.id);
  };

  const fetchPolls = async (eventId) => {
    try {
      const {
        data: { data },
      } = await getPollHandler(eventId);

      console.log("dataaaaa", data);

      setPolls(data);
    } catch (ex) {}
  };
  const fetchResolutions = async (eventId) => {
    try {
      const {
        data: { data },
      } = await getResolutionsHandler(eventId);

      const resMap = data.map((item) => {
        const payload = { ...item };
        payload.options = [
          {
            poll_id: item.id,
            name: "For",
            id: item.id,
          },
          {
            poll_id: item.id,
            name: "Against",
            id: item.id,
          },
          {
            poll_id: item.id,
            name: "Abstain",
            id: item.id,
          },
        ];
        return payload;
      });
      copyResolution = resMap;

      setResolutions(resMap);
    } catch (ex) {}
  };

  useEffect(() => {
    const chatIcon = document.getElementById("fc_frame");
    if (chatIcon) {
      chatIcon.style.display = "none";
    }
    fetchPolls(JSON.parse(eventInfo)?.id);
    fetchResolutions(JSON.parse(eventInfo)?.id);
    fetchElections(JSON.parse(eventInfo)?.id);
  }, [
    eventInfo && JSON.parse(eventInfo)?.id,
    resolutionSuccess,
    reloadResolution,
  ]);

  useEffect(() => {
    if (eventInfo && JSON.parse(eventInfo).id) {
      fetchMeetingQuestions(JSON.parse(eventInfo)?.id);
    }
  }, [openQandAModalGallery, reloadQuestion]);

  const submitAskedAuestion = async () => {
    if (questionText) {
      const payload = {
        resolution_id: "",
        question: questionText,
        attendee_id: JSON.parse(eventInfo).attendeeId,
      };

      await askQuestionHandler(JSON.parse(eventInfo)?.id, payload);
      setQuestionText("");
    }
  };

  const postQuestion = async (payload) => {
    try {
      setAskingQuestion(true);
      const {
        data: { data },
      } = await askQuestionHandler(JSON.parse(eventInfo)?.id, payload);
      // copyMeetingQuestion = [...meetingQuestions];
      setSuccessResponse(data);
      setAskingQuestion(false);
      reset({
        resolution_id: "",
        question: "",
      });
      setOpenQuestion(false);
      setOpenQandAModalGallery(true);
    } catch (ex) {
      setAskingQuestion(false);
      Swal.fire("Error", "Something went wrong");
    }
  };
  const onClose = () => setSuccessResponse();

  useEffect(() => {
    if (successResponse) {
      setTimeout(() => {
        setSuccessResponse();
      }, 500);
    }
  }, [successResponse]);

  useEffect(() => {
    if (answerToQuestionResponse) {
      setTimeout(() => {
        setAnswerToQuestionResponse();
      }, 500);
    }
  }, [answerToQuestionResponse]);

  const onSubmit = (data) => {
    postQuestion({
      resolution_id: data.resolution_id,
      question: data.question,
      attendee_id: JSON.parse(eventInfo).attendeeId,
      attendee_name: JSON.parse(eventInfo).name,
    });
  };

  const submitQuestionAnswer = async (e) => {
    e.preventDefault();
    setAnsweringQuestion(true);

    if (!answerQuestionTextValue) {
      setAnswerTextError({ error: true, message: "Answer field is required" });
    } else {
      const [result] = await resolver(
        answerQuestionHandler(selectedQuestionToAnswer.id, {
          answer: answerQuestionTextValue,
          resolution_id: selectedQuestionToAnswer.resolution_id,
          question: selectedQuestionToAnswer.question,
          attendee_id: JSON.parse(eventInfo).attendeeId,
        })
      );
      setAnsweringQuestion(false);
      if (result) {
        // copyMeetingQuestion = [...meetingQuestions];
        setAnswerToQuestionResponse({
          error: false,
          status: "success",
          message: "Answer sent successfully",
        });
      } else {
        setAnswerToQuestionResponse({
          error: true,
          success: "error",
          message: "Something went wrong",
        });
        // setSuccessAnswerQuestion({ error: error });
      }
      setAnswerQuestionTextValue("");
      setOpenQuestionToAnswer(false);
      setSelectedQuestionToAnswer();
    }
  };

  useEffect(() => {
    const element = document.querySelector(".qandASection");

    if (element) {
      element.scrollIntoView();
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [reloadQuestion]);

  const selectQuestionLabel = async (questionLabel, selectedQuestion) => {
    console.log("questionLabel questionLabel", questionLabel, selectedQuestion);
    const [result, error] = await resolver(
      attachQuestionToLabel(questionLabel.id, selectedQuestion.id)
    );

    console.log("attach", result);
    if (result) {
      setReloadQuestionLabel((prev) => !prev);
      toast(
        `${selectedQuestion.question} added to ${questionLabel.title} label`,
        {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "info",
          theme: "colored",
        }
      );
    }
    if (error) {
      toast(`OOps something went wrong`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "info",
        theme: "colored",
      });
    }
  };

  // const memoizedOnClick = useCallback(
  //   (status, item) => stopResolutionVoting(status, item),
  //   [votingResolutions]
  // );

  const resolutionSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: resolutionTitle,
      short_title: resolutionTitle,
      use_one_vote: 1,
      use_shares: 1,
      allow_physical: 0,
      attendees_only: 1,
      allow_split_voting: 1,
      event_id: JSON.parse(eventInfo).id,
      starts_at: moment().format("DD/MM/YYYY HH:MM:ss"),
      ends_at: moment().format("DD/MM/YYYY HH:MM:ss"),
    };
    const requestBody = {
      resolutions: [payload],
    };

    setAddingResolution(true);
    const [result, error] = await resolver(resolutionHandler(requestBody));
    setAddingResolution(false);
    setResolutionTitle("");
    if (result) {
      setResolutionSuccess(true);
    }

    if (error) {
      setResolutionError(true);
    }
  };
  const playMusicHandler = async (status, item) => {
    console.log({ music: item });
    const [result, error] = await resolver(
      playMusicOnline(status, item?.id ?? selectedMusic.id)
    );
    console.log({ result, error });
  };
  const closeAudioModal = () => {
    if (JSON.parse(eventInfo).role === 1) {
      audioRef.current?.audioEl?.current.pause();
      attendeeAudioRef.current?.audioEl?.current.pause();
    }
    setOpenAudio(false);
  };

  const toggleAudioModal = (status, item) => {
    setOpenAudio(true);
    playMusicHandler("play", item);
  };

  const Progres = ({ item }) => {
    console.log({ countt: item });
    console.log({ resultMessage });

    return (
      <Progress
        percent={(item.total_no / totalVoteCount) * 100}
        strokeColor={
          // resultMessage.color
          item.winner ? "#2F89FE" : "#424242"
          // item.contestant_id.includes("for") ? "#2F89FE" : "#424242"
        }
        strokeWidth="40px"
        style={{ width: "80%" }}
        trailColor="#363636"
        strokeLinecap="square"
        showInfo={false}
        className="customPollResult vote-result publishResult"
      />
    );
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
  };

  const submitElectionVotes = async (e) => {
    e.preventDefault();
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
        if (err.response.status === 400) {
          Swal.fire("Error", "You have already voted", "error");
        } else {
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    } else {
      Swal.fire("Error", "Please select candidate for each position", "error");
      //  message.error("Please select candidate for each position");
    }
  };

  return (
    <div className={style.main}>
      <ToastContainer />
      <Header
        setOpenPollVoteModal={() => setOpenPollVoteModal(true)}
        setOpenPollModal={() => setOpenPollModal(true)}
        setShowDocument={() => setShowDocument(true)}
        setShowMusic={() => setShowMusic(true)}
        setOpenQuestion={() => setOpenQuestion(true)}
        polls={polls}
        elections={elections}
        resolutions={resolutions}
        setOpenElectionVoteModal={() => setOpenElectionVoteModal(true)}
        setOpenResolutionVoteModal={() => setOpenResolutionVoteModal(true)}
        eventDetail={eventInfo && JSON.parse(eventInfo)}
        setOpenResolutionModal={() => setOpenResolutionModal(true)}
        setOpenQandAModal={() => setOpenQandAModal(true)}
        setOpenQandAModalGallery={() => setOpenQandAModalGallery(true)}
      />

      <Modal
        style={{
          width: "100%",
          zIndex: "99999999",
        }}
        width={600}
        visible={openVotingCollation}
        bodyStyle={{
          position: "relative",
          zIndex: "99999999",
          backgroundColor: "#2B2B2B",
        }}
        footer={null}
        header={null}
        position="relative"
        closeIcon={
          <CloseIcon closeModal={() => setOpenVotingCollation(false)} />
        }
      >
        <section className={style.container}>
          <div className={style.resultContainer}>
            <span className={style.pollResultIcon}>
              <CgPoll color="#fff" size="20" />
            </span>
            <span className={style.pollResultTitle}>
              VOTING COLLATION DISPLAY
            </span>
          </div>

          <div className={style.resultContent}>
            <div className={style.resultPara}>{selectedResolution?.title}</div>

            <div className="resolution-progress">
              <div className="resolution-action">
                <span className={style.radioResolution}>
                  <BiRadioCircle size={20} color="#000" />
                </span>
                <span>
                  {collationResult?.votes_count} {collationResult?.unit}
                </span>
              </div>
              <Progress
                percent={100}
                strokeColor="#2F89FE"
                strokeWidth="40px"
                trailColor="#363636"
                strokeLinecap="square"
                className="customPollResult vote-result"
                // format={(percent) =>
                //   `${collationResult?.votes_count}${collationResult?.unit}`
                // }
              />
            </div>
            <div>
              <BiAlarm color="#ffffff" background="#ffffff" />
              <p style={{ display: "inline", color: "white" }}>
                Time left until voting ends{" "}
                <span className={style.startResolution}>
                  <span>{days}</span>:<span>{hours}</span>:
                  <span>{minutes}</span>:<span>{seconds}</span>
                </span>
              </p>
            </div>
          </div>
        </section>
      </Modal>
      <Modal
        style={{
          width: "100%",
          zIndex: "99999999",
        }}
        width={700}
        visible={openPushingCollation}
        bodyStyle={{
          position: "relative",
          zIndex: "99999999",
          backgroundColor: "#2B2B2B",
        }}
        footer={null}
        header={null}
        position="relative"
        closeIcon={
          <CloseIcon closeModal={() => setOpenPushingCollation(false)} />
        }
      >
        <section className={style.container}>
          <div className={style.resultContainer}>
            <span className={style.pollResultIcon}>
              <CgPoll color="#fff" size="20" />
            </span>
            <span className={style.pollResultTitle}>RESOLUTION RESULTS</span>
          </div>

          <div className={style.resultContent}>
            <div className={style.resultPara}>{selectedResolution?.title}</div>

            {publishFinalResult &&
            publishFinalResult.voting_results &&
            publishFinalResult.voting_results.length
              ? publishFinalResult.voting_results.map((item) => (
                  <div
                    className="resolution-progress"
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div className="resolution-action">
                      <span className={style.radioResolution}>
                        <BiRadioCircle size={20} color="#000" />
                      </span>
                      <img
                        src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
                        width={15}
                        height={15}
                        className={style.handlewave}
                      />
                      <span>
                        {item.contestant_id.includes("for") ? "For" : "Against"}
                      </span>
                    </div>
                    <Progres item={item} />
                    {item.winner && (
                      <span style={{ position: "absolute", right: "30%" }}>
                        <BsCheckCircleFill size={20} color="#2F89FE" />
                      </span>
                    )}

                    {/* <Progress
                      percent={(item.total_no / totalVoteCount) * 100}
                      strokeColor={
                        strokenColor()
                        // item.contestant_id.includes("for")
                        //   ? "#424242"
                        //   : "#2F89FE"
                      }
                      strokeWidth="40px"
                      style={{ width: "80%" }}
                      trailColor="#363636"
                      strokeLinecap="square"
                      showInfo={false}
                      className="customPollResult vote-result publishResult"
                    /> */}
                    <span style={{ color: "#2F89FC", display: "block" }}>
                      {item.total_no} {publishFinalResult.unit} (
                      {((item.total_no / totalVoteCount) * 100).toFixed(2)}%)
                    </span>
                  </div>
                ))
              : null}
          </div>

          <div className={style.publishFooter}>
            <span className={style.publishFooter_title}>Result</span>
            <span className={style.publishFooter_desc}>{resultMessage}</span>
            <Progress
              percent={50}
              showInfo={false}
              strokeLinecap="round"
              strokeWidth="1px"
            />
          </div>
        </section>
      </Modal>
      <div>{/* <div id="meetingSDKElement"></div> */}</div>

      {showDocument && (
        <DocumentCard
          ModalTitle="SHARE SLIDE"
          modalSubtitle="Select recent files or browse through"
          documents={documents}
          eventDetail={eventInfo && JSON.parse(eventInfo)}
          closeDocument={() => setShowDocument(false)}
          selectFIle={(file) => {
            setShowDocument(false);
            setActiveFile(file);
            setOpenDocReader(true);
          }}
        />
      )}

      {showMusic && (
        <MusicCard
          ModalTitle="PLAY MUSIC"
          modalSubtitle="Play music directly"
          documents={musics}
          closeDocument={() => setShowMusic(false)}
          selectedMusic={selectedMusic}
          reload={() => setReloadMusic((prev) => !prev)}
          toggleAudioModal={toggleAudioModal}
          eventDetail={eventInfo && JSON.parse(eventInfo)}
        />
      )}

      {eventInfo && JSON.parse(eventInfo).role !== 1 ? (
        <section className={style.container} style={{ visibility: "collapse" }}>
          <ReactAudioPlayer
            src={selectedMusic?.url}
            // onPlay={() => {
            //   attendeeAudioRef.current?.audioEl?.current.play();
            // }}
            controls
            volume={0.5}
            // autoPlay={attendeeOpenAudio}
            onPause={() => {
              console.log("pase");
            }}
            ref={attendeeAudioRef}
          />
        </section>
      ) : (
        <Modal
          style={{
            width: "100%",
            zIndex: "99999999",
          }}
          width={600}
          visible={openAudio}
          bodyStyle={{
            position: "relative",
            zIndex: "99999999",
            backgroundColor: "#2B2B2B",
          }}
          footer={null}
          header={null}
          position="relative"
          closeIcon={<CloseIcon closeModal={closeAudioModal} />}
        >
          <section className={style.container}>
            <ReactAudioPlayer
              src={selectedMusic?.url}
              onPlay={() => playMusicHandler("play")}
              controls
              volume={0.5}
              onPause={() => playMusicHandler("pause")}
              ref={audioRef}
            />
          </section>
        </Modal>
      )}

      {openQandAModal && (
        <div className={style.resolutionContainer}>
          <div className={style.resolutionHeader}>
            <h4 className={style.headerTitle}>Questions</h4>
            <span
              className={style.documentCloseIcon}
              onClick={() => setOpenQandAModal(false)}
            >
              <IoMdClose size={20} color="rgba(255, 255, 255, 0.4)" />
            </span>
          </div>
          <></>
          <SingleSelect
            onChange={(item) => handleQuestionTab(item)}
            containerStyle={{ width: "100%" }}
            selectedDefaultItem="0"
          >
            <SingleCard
              position="1"
              title="General Board"
              prefixCls="resolutionTab"
              customStyle={{ fontSize: "1rem" }}
            />
            <SingleCard
              position="2"
              title="Question Label"
              prefixCls="resolutionTab"
              customStyle={{ fontSize: "1rem" }}
            />
          </SingleSelect>
          {currentQuestionTab === "1" && (
            <div className={style.answerContainer}>
              <div
                className={`${style.qandASection} ${style.qandASection_host}`}
              >
                <div className={style.qandASectionQst_up}>
                  {questions.length ? (
                    questions.map((item) => (
                      <QAnswer
                        key={item.id}
                        item={item}
                        userProfile={{
                          fullName: JSON.parse(eventInfo)?.name,
                          email: JSON.parse(eventInfo)?.email,
                        }}
                        showAttachQuestionBtn={true}
                        showUpvote={true}
                        enableVoteClick={false}
                        questionLabels={questionLabels}
                        resolutions={resolutions}
                        selectQuestionLabel={selectQuestionLabel}
                        setOpenAnswerQuestionModal={
                          handleSelectedQuestionToAnswer
                        }
                        question={questions}
                        pusher={pusher}
                        reloadQuestion={() =>
                          setReloadQuestions((prev) => !prev)
                        }
                        eventDetail={JSON.parse(eventInfo)}
                      />
                    ))
                  ) : (
                    <div>No question at moment!!</div>
                  )}
                </div>
              </div>
              <div className={`${style.gandAFooter} ${style.gandAFooter_host}`}>
                <div className={style.addComment}>
                  <span
                    className={style.gandAGroup_cube}
                    onClick={() => setOpenQuestionlabel(true)}
                  >
                    <AiOutlinePlus size="18" color="#fff" />
                  </span>
                </div>
                {eventInfo &&
                JSON.parse(eventInfo) &&
                JSON.parse(eventInfo).event_type &&
                JSON.parse(eventInfo).event_type.name !==
                  "Annual-General-Meetings" ? (
                  <div className={style.commentCont}>
                    <input />
                    <div className={style.gandAFooter_send}>
                      <MdSend color="#fff" size={20} />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {currentQuestionTab === "2" && (
            <div className={style.qandASection}>
              <div className={style.qandAWrapper}>
                <div className={style.qandAContainerLabel}>
                  <Collapse
                    bordered={false}
                    expandIconPosition="right"
                    className="site-collapse-custom-collapse"
                  >
                    {questionLabels.length &&
                      questionLabels.map((questionLabel, idx) => (
                        <Panel
                          key={`${idx}+1`}
                          header={questionLabel.title}
                          className="site-collapse-custom-panel-meeting"
                        >
                          <div>
                            {questionLabel.questions.length
                              ? questionLabel.questions.map((item) => (
                                  <QAnswer
                                    key={item.id}
                                    item={item}
                                    userProfile={{
                                      fullName: JSON.parse(eventInfo)?.name,
                                      email: JSON.parse(eventInfo)?.email,
                                    }}
                                    resolutions={resolutions}
                                    questionLabels={questionLabel}
                                    showUpvote={true}
                                    enableVoteClick={false}
                                    pusher={pusher}
                                    question={questionLabel.questions}
                                    eventDetail={JSON.parse(eventInfo)}
                                    reloadQuestion={() =>
                                      setReloadQuestions((prev) => !prev)
                                    }
                                  />
                                ))
                              : null}
                          </div>
                        </Panel>
                      ))}
                  </Collapse>
                </div>
              </div>
            </div>
          )}
          {currentQuestionTab === "3" && (
            <div className={style.qandASection}>
              <div className={style.qandAWrapper}>
                <VideoQueueCandidate />
              </div>
              <div className={style.gandAFooter}>
                <input />
                <div className={style.gandAFooter_send}>
                  <MdSend color="#fff" size={20} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {openQandAModalGallery && (
        <div
          className={`${style.resolutionContainer} ${style.resolutionContainer_cust}`}
        >
          <div className={style.resolutionHeader}>
            <h4 className={style.headerTitle}>Questions</h4>
            <span
              className={style.documentCloseIcon}
              onClick={() => setOpenQandAModalGallery(false)}
            >
              <IoMdClose size={20} color="rgba(255, 255, 255, 0.4)" />
            </span>
          </div>

          <div className={`${style.qandASection} ${style.qandASection_}`}>
            {questions.length ? (
              questions.map((item) => (
                <QAnswer
                  key={item.id}
                  userProfile={{
                    fullName: JSON.parse(eventInfo)?.name,
                    email: JSON.parse(eventInfo)?.email,
                  }}
                  item={item}
                  showUpvote={true}
                  resolutions={resolutions}
                  enableVoteClick={true}
                  showAttachQuestionBtn={false}
                  pusher={pusher}
                  question={questions}
                  reloadQuestion={() => setReloadQuestions((prev) => !prev)}
                  eventDetail={JSON.parse(eventInfo)}
                />
              ))
            ) : (
              <div style={{ color: "#fff" }}>No question at moment!!</div>
            )}
          </div>
          <div className={style.gandAFooter}>
            {eventInfo &&
            JSON.parse(eventInfo) &&
            JSON.parse(eventInfo).event_type &&
            JSON.parse(eventInfo).event_type.name ===
              "Annual-General-Meetings" ? (
              <div className={style.addComment}>
                <span
                  className={style.gandAGroup_cube}
                  onClick={() => {
                    setOpenQandAModalGallery(false);
                    setOpenQuestion(true);
                  }}
                >
                  <AiOutlinePlus size="18" color="#fff" />
                </span>
              </div>
            ) : null}

            {eventInfo &&
            JSON.parse(eventInfo) &&
            JSON.parse(eventInfo).event_type &&
            JSON.parse(eventInfo).event_type.name !==
              "Annual-General-Meetings" ? (
              <div className={style.commentCont}>
                <input
                  type="text"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                />
                <div className={style.gandAFooter_send}>
                  <MdSend
                    color="#fff"
                    size={20}
                    onClick={submitAskedAuestion}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
      {openDocuReader && (
        <div
          className={`${style.resolutionContainer} ${style.readFileContainer}`}
        >
          <div className={style.resolutionHeader}>
            <h4 className={style.headerTitle}>{activeFile?.title}</h4>
            <span
              className={`${style.documentCloseIcon} ${style.fileReaderCloseIcon}`}
              onClick={() => setOpenDocReader(false)}
            >
              <IoMdClose size={20} color="rgba(255, 255, 255, 0.4)" />
            </span>
          </div>

          <div className={`${style.qandASection} ${style.qandASection_}`}>
            <iframe
              // className={filetype}
              sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
              width="100%"
              height="600"
              frameBorder="0"
              src={`https://docs.google.com/gview?url=${activeFile.banner}&embedded=true`}
              scrolling="no"
              seamless=""
            ></iframe>
            {activeFile && (
              <div className={style.downloadFileCls}>
                <button
                  className={style.downloadFileBtn}
                  onClick={() => download(activeFile.banner, activeFile.title)}
                >
                  <span>
                    <AiFillFileExclamation size={15} />
                  </span>
                  <span>Download File</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div
        className={`${
          openResolutionModal
            ? "openResolutionModalShow"
            : "openResolutionModalHide"
        }`}
      >
        <div className={style.resolutionHeader}>
          <h4 className={style.headerTitle}>Resolution</h4>
          <span
            className={style.documentCloseIcon}
            onClick={() => setOpenResolutionModal(false)}
          >
            <IoMdClose size={20} color="rgba(255, 255, 255, 0.4)" />
          </span>
        </div>
        <></>
        <SingleSelect onChange={(item) => handleResolutionTab(item)}>
          <SingleCard
            position="1"
            title="Resolution"
            prefixCls="resolutionTab"
            customStyle={{ color: "#fff" }}
          />
          <SingleCard
            position="2"
            title="Create Resolution"
            prefixCls="resolutionTab"
            customStyle={{ color: "#fff" }}
          />
        </SingleSelect>

        {currentResolutionTab === "1" && (
          <div className={style.resolutionSection}>
            {resolutions &&
              resolutions.length > 0 &&
              resolutions.map((item, idx) => (
                <ResolutionItem
                  key={idx}
                  item={item}
                  pusher={pusher}
                  stopResolutionVoting={(status, item) =>
                    stopResolutionVoting(status, item)
                  }
                  setOpenVotingCollation={(val) => {
                    setSelectedResolution(item);

                    // setOpenVotingCollation(val)
                  }}
                  setOpenResolutionResult={(val) =>
                    setOpenResolutionResult(val)
                  }
                  voteTimeHandler={(payload) => voteTimeHandler(item, payload)}
                  setOpenResolutionModal={(val) => setOpenResolutionModal(val)}
                  reloadResolution={() => setReloadResolution((prev) => !prev)}
                />
              ))}
          </div>
        )}

        {currentResolutionTab === "2" && (
          <div className={style.createResolutionSection}>
            <div className={style.resolutionForm}>
              <form onSubmit={resolutionSubmit}>
                <div className={style.form__input_wrap}>
                  <div className={style.form__input_box}>
                    <label
                      htmlFor="question"
                      className={style.form__input_label}
                    >
                      Resolution
                    </label>
                    <input
                      className={style.form__input}
                      type="text"
                      value={resolutionTitle}
                      onChange={(e) => setResolutionTitle(e.target.value)}
                      placeholder="e.g How's your day going?"
                      name="resolutionTitle"
                    />
                  </div>
                </div>
                <div className={style.form__input_wrap}>
                  <div className={style.form__input_box}>
                    <label
                      htmlFor="question"
                      className={style.form__input_label}
                    >
                      Actions
                      <span
                        style={{ color: "#EF3125", marginLeft: ".5rem" }}
                      ></span>
                    </label>

                    <Candidate placeholder="For" />
                    <Candidate placeholder="Against" />
                    <Candidate placeholder="Abstain" />
                  </div>
                </div>
                <button className="btn-gray">
                  {addingResolution ? <Spin /> : "Create Resolution"}
                </button>
                {resolutionSuccess && (
                  <Alert
                    message="Resolution Created"
                    type="success"
                    showIcon
                    closable
                    onClose={() => setResolutionSuccess()}
                  />
                )}
                {resolutionError && (
                  <Alert
                    message="Resolution Created Failed"
                    type="error"
                    showIcon
                    closable
                    onClose={() => setResolutionError()}
                  />
                )}
              </form>
            </div>
          </div>
        )}
      </div>

      {openQuestionList && (
        <div
          className={`${style.resolutionContainer} ${style.questionListContainer}`}
        >
          <div className={style.resolutionHeader}>
            <h4 className={style.headerTitle}>Question</h4>
            <span
              className={style.documentCloseIcon}
              onClick={() => setOpenQuestionList(false)}
            >
              <IoMdClose size={20} color="rgba(255, 255, 255, 0.4)" />
            </span>
          </div>
          {/* <div className={style.chatList}>
            <ChatCard />
            <ChatCard from="sender" />
          </div> */}
        </div>
      )}
      {openPollModal && (
        <div className={style.resolutionContainer}>
          <div className={style.resolutionHeader}>
            <h4 className={style.headerTitle}>Poll</h4>
            <span
              className={style.documentCloseIcon}
              onClick={() => setOpenPollModal(false)}
            >
              <IoMdClose size={20} color="rgba(255, 255, 255, 0.4)" />
            </span>
          </div>
          <></>
          <SingleSelect onChange={(item) => handleResolutionTab(item)}>
            <SingleCard
              position="1"
              title="Resolution"
              prefixCls="resolutionTab"
            />
            <SingleCard
              position="2"
              title="Create Resolution"
              prefixCls="resolutionTab"
            />
          </SingleSelect>

          {currentResolutionTab === "1" && (
            <div className={style.resolutionSection}>
              <div className={style.resolutionContent}>
                <div className={style.resolutionWrap}>
                  <div className={style.resolutionItem}>
                    In a common stock rights offering the subscription price is
                    generally -
                  </div>
                  <div className={style.resolutionProgessContainer}>
                    <div className="resolution-progress">
                      <span className="resolution-action">For</span>
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
                  <div className={style.resolutionProgessContainer}>
                    <div className="resolution-progress">
                      <span className="resolution-action">Against</span>
                      <Progress
                        percent={30}
                        strokeColor="#363636"
                        strokeWidth="30px"
                        trailColor="rgba(0, 0, 0, 0.3)"
                        strokeLinecap="square"
                        className="customResult"
                        format={(percent) => "1100 units " + percent + "%"}
                      />
                    </div>
                  </div>
                  <div className={style.resolutionProgessContainer}>
                    <div className="resolution-progress">
                      <span className="resolution-action">Abstain</span>
                      <Progress
                        percent={70}
                        strokeColor="#363636"
                        strokeWidth="30px"
                        trailColor="rgba(0, 0, 0, 0.3)"
                        strokeLinecap="square"
                        className="customResult"
                        format={(percent) => "1100 units " + percent + "%"}
                      />
                    </div>
                  </div>
                </div>
                <div className={style.resolutionFooter}>
                  <div className={style.resolutionTime}>
                    <BiAlarm color="#2F89FE" />
                    <span className={style.startResolution}>Start Time</span>
                  </div>
                  <div className={style.resolutionRight}>
                    <span
                      className={style.publishLink}
                      onClick={() => {
                        setOpenResolutionModal(false);
                        setOpenVotingCollation(true);
                      }}
                    >
                      Publish Collation
                    </span>
                    <button
                      className={style.publishBtn}
                      onClick={() => {
                        setOpenResolutionModal(false);
                        setOpenResolutionResult(true);
                      }}
                    >
                      Publish Result
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={style.resolutionContent}
                style={{ marginTop: "5rem" }}
              >
                <div className={style.resolutionWrap}>
                  <h4 className={style.headerTitle}>Statutory resolution</h4>
                  <div className={style.resolutionItem}>
                    In a common stock rights offering the subscription price is
                    generally -
                  </div>
                  <div className={style.resolutionProgessContainer}>
                    <div className="resolution-progress">
                      <div className="resolution-action">
                        <img
                          src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
                          width={20}
                          height={20}
                          className={style.handlewave}
                        />
                        <span>For</span>
                      </div>
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
                  <div className={style.resolutionProgessContainer}>
                    <div className="resolution-progress">
                      <div className="resolution-action">
                        <img
                          src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
                          width={20}
                          height={20}
                          className={style.handlewave}
                        />
                        <span>Against</span>
                      </div>
                      <Progress
                        percent={30}
                        strokeColor="#363636"
                        strokeWidth="30px"
                        trailColor="rgba(0, 0, 0, 0.3)"
                        strokeLinecap="square"
                        className="customResult"
                        format={(percent) => "1100 units " + percent + "%"}
                      />
                    </div>
                  </div>
                  <div className={style.resolutionProgessContainer}>
                    <div className="resolution-progress">
                      <div className="resolution-action">
                        <span>Abstain</span>
                      </div>
                      <Progress
                        percent={70}
                        strokeColor="#363636"
                        strokeWidth="30px"
                        trailColor="rgba(0, 0, 0, 0.3)"
                        strokeLinecap="square"
                        className="customResult"
                        format={(percent) => "1100 units " + percent + "%"}
                      />
                    </div>
                  </div>
                </div>
                <div className={style.resolutionFooter}>
                  <div className={style.resolutionTime}>
                    <BiAlarm color="#2F89FE" />
                    <span className={style.startResolution}>Start Time</span>
                  </div>
                  <div className={style.resolutionRight}>
                    <span
                      className={style.publishLink}
                      onClick={() => {
                        setOpenResolutionModal(false);
                        setOpenVotingCollation(true);
                      }}
                    >
                      Publish Collation
                    </span>
                    <button
                      className={style.publishBtn}
                      onClick={() => {
                        setOpenResolutionModal(false);
                        setOpenStatutoryResolution(true);
                      }}
                    >
                      Publish Result
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentResolutionTab === "2" && (
            <div className={style.createResolutionSection}>
              <div className={style.resolutionForm}>
                <form onSubmit={resolutionSubmit}>
                  <div className={style.form__input_wrap}>
                    <div className={style.form__input_box}>
                      <label
                        htmlFor="question"
                        className={style.form__input_label}
                      >
                        Resolution
                      </label>
                      <input
                        className={style.form__input}
                        type="text"
                        placeholder="e.g How's your day going?"
                        name="resolutionTitle"
                        value={resolutionTitle}
                        onChange={(e) => setResolutionTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={style.form__input_wrap}>
                    <div className={style.form__input_box}>
                      <label
                        htmlFor="question"
                        className={style.form__input_label}
                      >
                        Actions
                        <span
                          style={{ color: "#EF3125", marginLeft: ".5rem" }}
                        ></span>
                      </label>

                      <Candidate placeholder="For" />
                      <Candidate placeholder="Against" />
                      <Candidate placeholder="Abstain" />
                    </div>
                  </div>
                  <button type="submit" className="btn-gray">
                    Create Resolution
                  </button>
                  <button className="btn-gray">
                    {addingResolution ? <Spin /> : "Create Resolution"}
                  </button>
                  {resolutionSuccess && (
                    <Alert
                      message="Resolution Created"
                      type="success"
                      showIcon
                      closable
                      onClose={() => setResolutionSuccess()}
                    />
                  )}
                  {resolutionError && (
                    <Alert
                      message="Resolution Created Failed"
                      type="error"
                      showIcon
                      closable
                      onClose={() => setResolutionError()}
                    />
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {openResolutionVoteModal && (
        <div className={style.resolutionContainer}>
          <div className={style.resolutionHeader}>
            <h4 className={style.headerTitle}>Resolution</h4>
            <span
              className={style.documentCloseIcon}
              onClick={() => setOpenResolutionVoteModal(false)}
            >
              <IoMdClose size={20} color="rgba(255, 255, 255, 0.4)" />
            </span>
          </div>
          <ResolutionVoteForm
            pusher={pusher}
            userProfile={{
              fullName: JSON.parse(eventInfo)?.name,
              email: JSON.parse(eventInfo)?.email,
              accountName: JSON.parse(eventInfo)?.account_number ?? "",
              voteRight: JSON.parse(eventInfo)?.voteRights ?? "",
            }}
            polls={resolutions}
            reloadResolution={() => setReloadResolution((prev) => !prev)}
            isPoll={true}
          />
        </div>
      )}
      {openElectionVoteModal && (
        <div className={style.resolutionContainerElection}>
          <div className={style.resolutionHeader}>
            <h4 className={style.headerTitle}>Election Vote</h4>
            <span
              className={style.documentCloseIcon}
              onClick={() => setOpenElectionVoteModal(false)}
            >
              <IoMdClose size={20} color="rgba(255, 255, 255, 0.4)" />
            </span>
          </div>
          <div>
            <div className={style.electionTab}>
              {elections &&
                elections.length > 0 &&
                elections.map((item) => (
                  <ElectionVote
                    className={style.electionType}
                    key={item.id}
                    item={item}
                  >
                    <div className={style.electionCand}>
                      <SingleSelect
                        containerStyle={{
                          flexDirection: "row",
                          justifyContent: "start",
                          gap: "22px",
                          color: "#fff",
                        }}
                        onChange={(data) =>
                          handleElectionVoteChange({
                            ...data,
                            candidate_id: data.id,
                            channel: "web",
                            attendee_name: JSON.parse(eventInfo)?.name ?? "",
                            account_number:
                              JSON.parse(eventInfo)?.account_number ?? "",
                            attendee_id: JSON.parse(eventInfo).attendeeId,
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
                  </ElectionVote>
                ))}

              {eventInfo && JSON.parse(eventInfo).role !== 1 ? (
                <div
                  className={style.containerNav_right}
                  style={{
                    justifyContent: "flex-end",
                    display: "flex",
                    marginTop: "20px",
                  }}
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
              ) : null}
            </div>
          </div>
        </div>
      )}
      {openPollVoteModal && (
        <div className={style.resolutionContainer}>
          <div className={style.resolutionHeader}>
            <h4 className={style.headerTitle}>Poll</h4>
            <span
              className={style.documentCloseIcon}
              onClick={() => setOpenPollVoteModal(false)}
            >
              <IoMdClose size={20} color="rgba(255, 255, 255, 0.4)" />
            </span>
          </div>

          <VoteForm
            polls={polls}
            userProfile={{
              fullName: JSON.parse(eventInfo)?.name,
              email: JSON.parse(eventInfo)?.email,
              accountName: JSON.parse(eventInfo)?.account_number ?? "",
              voteRight: JSON.parse(eventInfo)?.voteRights ?? "",
            }}
          />
        </div>
      )}

      <Modal
        style={{
          width: "100%",
          zIndex: "99999999",
        }}
        // destroyOnClose={true}
        width={400}
        visible={openQuestion}
        bodyStyle={{
          position: "relative",
          zIndex: "99999999",
          backgroundColor: "#2B2B2B",
          padding: "0px",
        }}
        footer={null}
        header={null}
        position="relative"
        closeIcon={<CloseIcon closeModal={() => setOpenQuestion(false)} />}
      >
        <section className={style.container}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${style.questionContainer}`}>
              <span className={style.pollResultIcon}>
                <CgPoll color="#fff" size="20" />
              </span>
              <div className={style.titleContainer}>
                <span className={style.questionTitle}>Ask Question</span>
                <span className={style.questionSubtitle}>Ask a question</span>
              </div>
            </div>
            <div className={style.questionBody}>
              <div className={style.input_box}>
                <label htmlFor="endDate" className={style.form__input_label}>
                  Resolutions
                </label>
                <select
                  className={`${style.form__input} ${style.form__input_select}`}
                  name="actions"
                  {...register("resolution_id")}
                  // onChange={(e) => setResolutionQuestion(e.target.value)}
                >
                  <option value="" className={style.questionOption}>
                    Select Resolution
                  </option>
                  {resolutions &&
                    resolutions.length &&
                    resolutions.map((item) => (
                      <option
                        value={item.id}
                        className={style.questionOption}
                        key={item.id}
                      >
                        {item.title}
                      </option>
                    ))}
                </select>
                <span className={style.validation__error}>
                  {errors.resolution_id?.message}
                </span>
              </div>
              <div className={style.input_box}>
                <label htmlFor="endDate" className={style.form__input_label}>
                  Question
                </label>
                <input
                  className={style.form__input}
                  name="actions"
                  style={{ color: "#fff" }}
                  placeholder="Type on Your Question"
                  {...register("question")}
                  // onChange={(e) => setQuestionText(e.target.value)}
                />
                <span className={style.validation__error}>
                  {errors.question?.message}
                </span>
              </div>
            </div>
            <div className={style.questionFooter}>
              <button
                type="submit"
                className={style.questionFooter_btn}
                disabled={askingQuestion}
              >
                {askingQuestion ? "...Loading" : "Ask"}
              </button>
              {successResponse && (
                <Alert
                  message="Question sent"
                  type="success"
                  showIcon
                  closable
                  onClose={onClose}
                />
              )}
            </div>
          </form>
        </section>
      </Modal>
      <Modal
        style={{
          width: "100%",
          zIndex: "99999999",
        }}
        width={400}
        visible={openQuestionToAnswer}
        bodyStyle={{
          position: "relative",
          zIndex: "99999999",
          backgroundColor: "#2B2B2B",
          padding: "0px",
        }}
        footer={null}
        header={null}
        position="relative"
        closeIcon={
          <CloseIcon closeModal={() => setOpenQuestionToAnswer(false)} />
        }
      >
        <section className={style.container}>
          <form onSubmit={submitQuestionAnswer}>
            <div className={`${style.questionContainer}`}>
              <span className={style.pollResultIcon}>
                <CgPoll color="#fff" size="20" />
              </span>
              <div className={style.titleContainer}>
                <span className={style.questionTitle}>Answer Question</span>
                <span className={style.questionSubtitle}>
                  Answer question asked
                </span>
              </div>
            </div>
            <div className={style.questionBody}>
              <div className={style.input_box}>
                <label htmlFor="endDate" className={style.form__input_label}>
                  {selectedQuestionToAnswer?.resolutionTitle}
                </label>
                <div className={style.questionText}>
                  Question - {selectedQuestionToAnswer?.question ?? ""}
                </div>
              </div>
              <div className={style.input_box}>
                <label htmlFor="endDate" className={style.form__input_label}>
                  Answer
                </label>
                <textarea
                  className={style.form__input}
                  name="actions"
                  value={answerQuestionTextValue}
                  style={{ color: "#fff", backgroundColor: "#2b2b2b" }}
                  placeholder="Type on Your Question"
                  onChange={(e) => setAnswerQuestionTextValue(e.target.value)}
                  rows={4}
                  // onChange={(e) => setQuestionText(e.target.value)}
                />
                {answerTextError && answerTextError.error && (
                  <span className={style.validation__error}>
                    {answerTextError.message}
                  </span>
                )}
              </div>
            </div>
            <div className={style.questionFooter}>
              <button
                type="submit"
                className={style.questionFooter_btn}
                disabled={answeringQuestion}
              >
                {answeringQuestion ? "...Loading" : "Send Answer"}
              </button>
              {answerToQuestionResponse && (
                <Alert
                  message={answerToQuestionResponse.message}
                  type={answerToQuestionResponse.status}
                  showIcon
                  closable
                  // onClose={() => setAnswerToQuestionResponse()}
                />
              )}
            </div>
          </form>
        </section>
      </Modal>
      <Modal
        style={{
          width: "100%",
          zIndex: "99999999",
        }}
        width={400}
        visible={openQuestionlabel}
        bodyStyle={{
          position: "relative",
          zIndex: "99999999",
          backgroundColor: "#2B2B2B",
          padding: "0px",
        }}
        footer={null}
        header={null}
        position="relative"
        closeIcon={<CloseIcon closeModal={() => setOpenQuestionlabel(false)} />}
      >
        <section className={style.container}>
          <form onSubmit={addQuestionLabel}>
            <div className={`${style.questionContainer}`}>
              <span className={style.pollResultIcon}>
                <CgPoll color="#fff" size="20" />
              </span>
              <div className={style.titleContainer}>
                <span className={style.questionTitle}>
                  CREATE GROUPED MESSAGE
                </span>
                <span className={style.questionSubtitle}>
                  Grouped message makes it easy to track similar messages
                </span>
              </div>
            </div>
            <div className={style.questionBody}>
              <div className={style.input_box}>
                <label htmlFor="endDate" className={style.form__input_label}>
                  Question Label
                </label>
                <textarea
                  className={style.form__input}
                  name="actions"
                  value={questionLabelText}
                  style={{ color: "#fff", backgroundColor: "#2b2b2b" }}
                  placeholder='e.g "Question Label 1"'
                  onChange={(e) => setQuestionLabelText(e.target.value)}
                  rows={4}
                  // onChange={(e) => setQuestionText(e.target.value)}
                />
                {answerTextError && answerTextError.error && (
                  <span className={style.validation__error}>
                    {answerTextError.message}
                  </span>
                )}
              </div>
            </div>
            <div className={style.questionFooter}>
              <button
                type="submit"
                className={style.questionFooter_btn}
                disabled={answeringQuestion}
              >
                {creatingLabel ? "...Loading" : "Create Label"}
              </button>
              {questionLabelResponse && (
                <Alert
                  message={questionLabelResponse.message}
                  type={questionLabelResponse.status}
                  showIcon
                  closable
                  // onClose={() => setAnswerToQuestionResponse()}
                />
              )}
            </div>
          </form>
        </section>
      </Modal>
      <Modal
        style={{
          width: "100%",
          zIndex: "99999999",
        }}
        width={600}
        visible={openStatutoryResolution}
        bodyStyle={{
          position: "relative",
          zIndex: "99999999",
          backgroundColor: "#2B2B2B",
        }}
        footer={null}
        header={null}
        position="relative"
        closeIcon={
          <CloseIcon closeModal={() => setOpenStatutoryResolution(false)} />
        }
      >
        <section className={style.container}>
          <div className={style.resultContainer}>
            <span className={style.pollResultIcon}>
              <CgPoll color="#fff" size="20" />
            </span>
            <span className={style.pollResultTitle}>Resolution Result</span>
          </div>

          <div className={style.resultContent}>
            <div className={style.resultPara}>
              In a common stock rights offering the subscription price is
              generally
            </div>
            <div className="resolution-progress">
              <div className="resolution-action">
                <span className={style.radioResolution}>
                  <BiRadioCircle size={20} />
                </span>
                <img
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
                  width={20}
                  height={20}
                  className={style.handlewave}
                />
                <span>Abstain</span>
              </div>
              <Progress
                percent={70}
                strokeColor="#424242"
                strokeWidth="40px"
                trailColor="#363636"
                strokeLinecap="square"
                className="customPollResult"
                format={(percent) => "64"}
              />
            </div>
            <div className="resolution-progress">
              <div className="resolution-action">
                <span className={style.radioResolution}>
                  <BiRadioCircle size={20} color="#000" />
                </span>
                <img
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
                  width={20}
                  height={20}
                  className={style.handlewave}
                />
                <span>Against</span>
              </div>
              <Progress
                percent={80}
                strokeColor="#2F89FE"
                strokeWidth="40px"
                trailColor="#363636"
                strokeLinecap="square"
                className="customPollResult customPollResult-aginst"
                format={(percent) => "36"}
              />
              <div className="resolution-action-check">
                <span className={style.checkResolution}>
                  <IoIosCheckmarkCircle
                    color="#2F89FE"
                    size={20}
                    className="checkmark-custom"
                  />
                </span>
              </div>
            </div>
            <div className={style.footer}>
              <div className={style.footerResultTitle}>Result</div>
              <div className={style.footerResultText}>Motion not carried</div>
              <Progress
                className="customResult"
                percent={70}
                strokeColor="#2F89FE"
                trailColor="#363636"
                showInfo={false}
                strokeWidth="5px"
              />
            </div>
          </div>
        </section>
      </Modal>
      <Modal
        style={{
          width: "100%",
          zIndex: "99999999",
        }}
        width={600}
        visible={openResolutionResult}
        bodyStyle={{
          position: "relative",
          zIndex: "99999999",
          backgroundColor: "#2B2B2B",
        }}
        footer={null}
        header={null}
        position="relative"
        closeIcon={
          <CloseIcon closeModal={() => setOpenResolutionResult(false)} />
        }
      >
        <section className={style.container}>
          <div className={style.resultContainer}>
            <span className={style.pollResultIcon}>
              <CgPoll color="#fff" size="20" />
            </span>
            <span className={style.pollResultTitle}>Resolution Result</span>
          </div>

          <div className={style.resultContent}>
            <div className={style.resultPara}>
              In a common stock rights offering the subscription price is
              generally
            </div>
            <div className="resolution-progress">
              <div className="resolution-action">
                <span className={style.radioResolution}>
                  <BiRadioCircle size={20} />
                </span>
                <span>Abstain</span>
              </div>
              <Progress
                percent={70}
                strokeColor="#424242"
                strokeWidth="40px"
                trailColor="#363636"
                strokeLinecap="square"
                className="customPollResult"
                format={(percent) => "1100 units " + percent + "%"}
              />
            </div>
            <div className="resolution-progress">
              <div className="resolution-action">
                <span className={style.radioResolution}>
                  <BiRadioCircle size={20} color="#000" />
                </span>
                <span>Against</span>
              </div>
              <Progress
                percent={80}
                strokeColor="#2F89FE"
                strokeWidth="40px"
                trailColor="#363636"
                strokeLinecap="square"
                className="customPollResult customPollResult-aginst"
                format={(percent) => "1100 units " + percent + "%"}
              />
              <div className="resolution-action-check">
                <span className={style.checkResolution}>
                  <IoIosCheckmarkCircle
                    color="#2F89FE"
                    size={20}
                    className="checkmark-custom"
                  />
                </span>
              </div>
            </div>
            <div className={style.footer}>
              <div className={style.footerResultTitle}>Result</div>
              <div className={style.footerResultText}>Motion not carried</div>
              <Progress
                className="customResult"
                percent={70}
                strokeColor="#2F89FE"
                trailColor="#363636"
                showInfo={false}
                strokeWidth={5}
              />
            </div>
          </div>
        </section>
      </Modal>

      <Modal
        style={{
          width: "100%",
          maxWidth: "100%",
          position: "absolute",
          top: 0,
          bottom: 0,
        }}
        visible={leaveMeeting}
        onCancel={() => setLeaveMeeting(false)}
        width={"100%"}
        bodyStyle={{
          height: "100vh",
          position: "relative",
          background: "#2E313E",
        }}
        footer={null}
        header={null}
        position="relative"
      >
        <div className={style.leave_meeting_modal}>
          <h3 className={style.leave_meeting_modal_title}>
            We bet you had an a lovely event
          </h3>
          <div className={style.flex_box}>
            <span className={style.leave_meeting_modal_desc}>
              Kindly rate us and give us your feedback.
            </span>
          </div>
          <div className={style.leave_meeting_modal_group}>
            <p>Rate us</p>
            <div className={style.leave_meeting_modal_star}>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
          </div>
          <div className={style.leave_meeting_modal_group}>
            <p>Leave a review</p>
            <textarea />
          </div>
        </div>
      </Modal>
    </div>
  );
}
const Candidate = ({ removeInput, item, onChange, inputRef, placeholder }) => {
  return (
    <div className={style.input_box}>
      <input
        className={style.form__input}
        type="text"
        placeholder={placeholder}
        name="actions"
        value={item?.name}
        readOnly
        onChange={onChange}
      />
    </div>
  );
};

export default MeetingDashboard;
