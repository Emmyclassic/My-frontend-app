import { LoadingOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Checkbox,
  DatePicker,
  Dropdown,
  Menu,
  Modal,
  Radio,
  Space,
  Spin,
  Steps,
  Table,
  Tooltip,
  Upload,
} from "antd";
import debounce from "debounce-promise";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { FaPoll } from "react-icons/fa";
import { FiPlus, FiSearch, FiTrash } from "react-icons/fi";
import { MdClose, MdKeyboardArrowLeft, MdModeEdit } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import shortid from "shortid";
import {
  fetchDonation,
  updateEvent,
  uploadFile,
} from "../../../../api/eventHandler";
import {
  getElectionsHandler,
  getPollHandler,
  getQuestionaaireHandler,
  getResolutionsHandler,
  removeElectionHandler,
  removePollHandler,
  removeQuestionHandler,
  removeResolutionHandler,
} from "../../../../api/resolutionHandler";
import { getResources, getSpeakers } from "../../../../api/resourceHandler";
import { fetchEventTickets } from "../../../../api/ticketHandler";
import AlertResponse from "../../../../Auth/AuthModalForm/AlertResponse";
import CircularAvatar from "../../../../components/Avatar/CircularAvatar";
import BannerTemplate from "../../../../components/BannerTemplate";
import IconButton from "../../../../components/Buttons/IconButton";
import SingleSelect, {
  SingleCard,
} from "../../../../components/Cards/SingleCardSelect";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import EditableBanner from "../../../../components/EditableBanner";
import FormInput from "../../../../components/FormInput";
import LeftDrawerModal from "../../../../components/LeftDrawerModal";
import CustomModal from "../../../../components/Modals";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import DataTable from "../../../../components/Tables";
import { template } from "../../../../constants/statics";
import { useFileUpload } from "../../../../hooks/useFileUpload";
import { addAttendeeSchema } from "../../../../utils/Validation/addAttendeeValidation";
import { addProxyValidation } from "../../../../utils/Validation/addProxyValidation";
import { getEventAction } from "../../BrowseEvent/state/action";
import AttendeeForm from "../../CreateEvent/Attendee/Form/Attendee";
import ProxyForm from "../../CreateEvent/Attendee/Form/Proxy";
import {
  getAttendeeAction,
  getProxyAction,
  postAttendeeAction,
  postProxyAction,
} from "../../CreateEvent/Attendee/state/action";
import {
  resetAddAttendee,
  resetAddProxy,
} from "../../CreateEvent/Attendee/state/attendeeAction";
import PollForm from "../../CreateEvent/Poll/PollForm";
import EditPollForm from "../../CreateEvent/Poll/PollForm/EditPollForm";
import QuestionaireForm from "../../CreateEvent/Questionaire/QuestionaiireForm";
import EditQuestionaireForm from "../../CreateEvent/Questionaire/QuestionaiireForm/EditQuestionaireForm";
import EditElectionForm from "../../CreateEvent/Resolution/ElectionForm/EditElectionForm";
import ElectionForm from "../../CreateEvent/Resolution/ElectionForm/index";
import EditResolutionForm from "../../CreateEvent/Resolution/ResolutionForm/EditResolutionForm";
import ResolutionForm from "../../CreateEvent/Resolution/ResolutionForm/index";
import StatutoryForm from "../../CreateEvent/Resolution/StatutoryForm";
import AgmLink from "../../CreateEvent/Resources/AgmLink";
import DocumentForm from "../../CreateEvent/Resources/DocumentForm";
import DocumentList from "../../CreateEvent/Resources/DocumentList";
import LinkForm from "../../CreateEvent/Resources/LinkForm";
import VideoForm from "../../CreateEvent/Resources/VideoForm";
import VideoList from "../../CreateEvent/Resources/VideoList";
import {
  columns,
  columnsEventDonationFunc,
  columnsEventTicket,
  columnsProxy,
} from "../../CreateEvent/Summary/constant";
import style from "./index.module.scss";
import "./index.scss";

const { Dragger } = Upload;
const objElection = [];
const obj = [];

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const EventSummary = ({ nextStep }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [questionaireOpen, setQuestionaireOpen] = useState(false);
  const [statutryOpen, setStatutryOpen] = useState(false);
  const [searchPhrase] = useState("");
  const [setupProxy, setSetupProxy] = useState(false);
  const [candidateList, setCandidateList] = useState([]);
  const [tickets, setTickets] = useState();
  const [donations, setDonations] = useState();
  const [editElectionModal, setEditElectionModal] = useState(false);
  const [reloadElection, setReloadElection] = useState(false);
  const [editElectionTemplateVisible, setEditElectionTemplateVisible] =
    useState(false);
  const [singleElectionDetail, setSingleElectionDetail] = useState();
  const [editQuestionaaireModal, setEditQuestionaaireModal] = useState(false);
  const [meetingType, setMeetingType] = useState(null);

  const [selectedValue] = useState("");
  const [resolutionSelector, setResolutionSelector] = useState([]);
  const [electionSelector, setElectionSelector] = useState([]);
  const [electionOpen, setElectionOpen] = useState(false);
  const [, setPreviewImage] = useState("");
  const [, setPreviewVisible] = useState(false);
  const [loadingElection, setLoadingElection] = useState(false);
  const [updatingEvent, setUpdatingEvent] = useState(false);
  const [, setPreviewTitle] = useState("");
  const [loading] = useState(false);
  const [resolutionError, setResolutionError] = useState();
  const [QuestionError, setQuestionError] = useState();
  const [resolutions, setResolutions] = useState([]);
  const [elections, setElections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loadingResolution, setLoadingResolution] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [bannerFileList, setBannerFileList] = useState([]);
  const [openBannerTemplate, setOpenBannerTemplate] = useState(false);
  const { eventDetail } = useSelector((state) => state.events);
  const currentEvent = eventDetail?.data;

  const [uploadModal, setUploadModal] = useState(false);
  const [defaultBannerUrl, setDefaultBannerUrl] = useState("");
  const [reloadResolution, setReloadResolution] = useState(false);
  const [reloadQuestion, setReloadQuestion] = useState(false);
  const [logoFileList, setLogoFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [singleResolution, setSingleResolution] = useState();
  const [singleQuestionaaire, setSingleQuestionaaire] = useState();
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [resolutionModal, setResolutionModal] = useState(false);
  // const [formData, setFormDate] = useState({
  //   shortName: currentEvent?.short_name,
  //   title: currentEvent?.title,
  // });
  const [formData, setFormDate] = useState({
    shortName: currentEvent?.short_name,
    title: currentEvent?.title,
    description: currentEvent?.description,
    banner: currentEvent?.banner,
    logo: currentEvent?.logo,
    allowAttendee: currentEvent?.allow_attendee_registration,
    allowPoll: currentEvent?.allow_poll_access,
    countQuorom: currentEvent?.count_proxy_by_quorum,
    quorumBy: currentEvent?.set_quorum_by,
    quorumNumber: currentEvent?.quorum_number,
    subEvent: currentEvent?.subscribe_to_upcoming,
    ...currentEvent,
  });
  const [, setFileError] = useState({ errorMsg: "", error: false });
  const history = useHistory();
  const allAttendees = useSelector((state) => state.attendees);
  const allProxies = useSelector((state) => state.proxies);
  const [templateVisible, setTemplateVisible] = useState(false);
  const [editTemplateVisible, setEditTemplateVisible] = useState(false);
  const [startDate, setStartDate] = useState(
    moment(currentEvent?.start_date).format("DD/MM/YYYY HH:mm:ss")
  );
  const [endDate, setEndDate] = useState(
    moment(currentEvent?.end_date).format("DD/MM/YYYY HH:mm:ss")
  );
  const [polls, setPolls] = useState([]);
  const [votersRight, setVotersRight] = useState();
  const [reloadPolls, setReloadPoll] = useState(false);
  const [, setLoadingPoll] = useState(false);
  const [attendeeModal, setAttendeeModal] = useState(false);
  const proxy = useSelector((state) => state.proxyReducer);
  const [pollTemplateVisible, setPollTemplateVisible] = useState(false);
  const [editPollModal, setEditPollModal] = useState(false);
  const [singlePoll, setSinglePoll] = useState();
  const [speakers, setSpeakers] = useState();
  const [, setSpeakerError] = useState();
  const [addProxyVisible, setAddProxyVisible] = useState(false);
  const [proxyModal, setProxyModal] = useState(false);
  const [reloadAttendee, setReloadAttendee] = useState(false);
  const [uploadingPreviewFile, setUploadingPreviewFile] = useState(false);

  const [pollModal, setPollModal] = useState(false);
  const [documents, setDocuments] = useState();
  const [addAttendeeVisible, setAddAttendeeVisible] = useState(false);
  const [videos, setVideos] = useState();
  const [links, setLinks] = useState();
  const [, setVideoError] = useState();
  const [, setLinkError] = useState();
  const [, setDocumentError] = useState();
  const [attendeeType, setAttendeeType] = useState("attendee");
  const [unformattedStartDate, setUnformattedStartDate] = useState();
  const [unformattedEndDate, setUnformattedEndDate] = useState();
  const fileUploader = useFileUpload();
  const [editCurrentEvent, setEditCurrentEvent] = useState({
    banner: currentEvent?.banner,
    logo: currentEvent?.logo,
  });

  const [candidateInputCount, setCandidateInputCount] = useState([
    { name: "" },
    { name: "" },
    { name: "" },
  ]);
  const [openCloseProxy, setOpenCloseProxy] = useState("open");
  const [openVideo, setOpenVideo] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openDocument, setOpenDocument] = useState(false);
  const [reloadLink, setReloadLink] = useState(false);
  const [reloadDocument, setReloadDocument] = useState(false);
  const [reloadVideo, setReloadVideo] = useState(false);
  const [reloadDonation] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item onClick={() => setOpenDocument(true)}>
        <div className={style.menuItem}>Add Document</div>
      </Menu.Item>
      <Menu.Item onClick={() => setOpenLink(true)}>
        <div className={style.menuItem}>Add Link</div>
      </Menu.Item>
      <Menu.Item onClick={() => setOpenVideo(true)}>
        <div className={style.menuItem}>Add Video</div>
      </Menu.Item>
    </Menu>
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(
      attendeeType === "proxy" ? addProxyValidation : addAttendeeSchema
    ),
  });

  const openCloseProxyHandler = (e) => {
    if (e.target.value === "close") {
      setOpenCloseProxy("close");
    } else {
      setOpenCloseProxy("open");
    }
  };
  const onChange = (e, idx) => {
    const { value } = e.target;

    const obj = [...candidateInputCount];

    obj[idx].name = value;
    setCandidateInputCount(obj);
  };
  const addCandidates = (candidate) => {
    const existUser = candidateList.find(
      (item) => item.name.toLowerCase() === candidate.name.toLowerCase()
    );

    if (!existUser) {
      setCandidateList([...candidateList, candidate]);
    }
  };
  const removeInput = (item, idx) => {
    const arr = [...candidateInputCount];
    arr.splice(idx, 1);

    if (arr.length === 0) {
      setCandidateInputCount([{ name: "" }]);
    } else {
      setCandidateInputCount(arr);
    }
  };
  const eventConfig = () => {
    return {
      allow_attendee_registration: formData.allowAttendee,
      allow_poll_access: formData.allowPoll,
      count_proxy_by_quorum: formData.countQuorom,
      quorum_number: formData.quorumNumber,
      set_quorum_by: formData.quorumBy,
    };
  };

  const dbounce = useCallback(
    debounce((searchPhrase) => dispatch(getAttendeeAction(searchPhrase)), 500),
    []
  );
  const resolutionHandler = (value, selectedResolution, idx) => {
    const objIndex = obj.findIndex(
      (item) => item.resolution_id === selectedResolution.id
    );
    if (objIndex !== -1) {
      obj[objIndex].resolution_vote = value;
    } else {
      const resolution = {
        resolution_id: selectedResolution.id,
        resolution_vote: value,
      };
      obj.push(resolution);
    }
  };
  const addNewElection = (idx) => {
    const resolutionArr = [...electionSelector];

    const currentProxy = elections[idx];
    if (currentProxy) {
      const exist = resolutionArr.find((item) => item.id === currentProxy.id);
      if (!exist) {
        resolutionArr.push(currentProxy);
        setElectionSelector(resolutionArr);
      }
    }
  };
  useEffect(() => {
    dispatch(getEventAction(id));
  }, [id]);

  const onClose = (e) => {
    dispatch(resetAddProxy);
  };
  const dispenseCallback = React.useCallback(resolutionHandler, []);
  const addNewElectionCb = useCallback(addNewElection, [electionSelector]);
  const addNewResolution = (idx) => {
    const resolutionArr = [...resolutionSelector];

    const currentProxy = resolutions[idx];
    if (currentProxy) {
      const exist = resolutionArr.find((item) => item.id === currentProxy.id);
      if (!exist) {
        resolutionArr.push(currentProxy);
        setResolutionSelector(resolutionArr);
      }
    }
  };

  const dbounceProxy = useCallback(
    debounce((searchPhrase) => dispatch(getProxyAction(searchPhrase, id)), 500),
    []
  );
  const quorumNumberHandle = (val) => {
    const newVal = val.target.value.replace(/,/g, "");
    setVotersRight(newVal);
  };
  const onSubmitAttendee = (data) => {
    const attendeeList = [
      {
        name: data.participantName,
        email: data.email,
        account_number: data.accountNumber,
        phone_number: data.phoneNumber,
        vote_rights: Number(votersRight),
      },
    ];

    const payload = {
      attendees: attendeeList,
    };
    dispatch(postAttendeeAction(payload));
    reset({
      participantName: "",
      email: "",
      accountNumber: "",
      phoneNumber: "",
      nominatedProxy: "",
      votersRight: "",
    });
    setVotersRight(0);
  };

  const electionHandler = (value, selectedResolution, idx) => {
    const objIndex = objElection.findIndex(
      (item) => item.election_id === selectedResolution.id
    );
    if (objIndex !== -1) {
      objElection[objIndex].resolution_vote = value;
    } else {
      const resolution = {
        election_id: selectedResolution.id,
        election_vote: value,
      };
      objElection.push(resolution);
    }

    // setResolutionList(obj);
  };
  const onSubmitProxy = (data) => {
    const attendeeList = [
      {
        participant_name: data.participantName,
        account_number: data.accountNumber,
        phone_number: data.phoneNumber,
        voting_right: Number(data.votersRight),
        nominated_proxy_name: data.nominatedProxy,
        setup_proxy_form: false,
        resolutions: obj,
        elections: objElection,
      },
    ];

    dispatch(postProxyAction({ attendees: attendeeList }));
    reset({
      electionVote: "",
      electionPosition: "",
      resolutionVote: "",
      resolution: "",
      nominatedProxy: "",
      votersRight: "",
      phoneNumber: "",
      accountNumber: "",
      participantName: "",
    });
  };

  const onCloseAttendee = (e) => {
    dispatch(resetAddAttendee);
  };
  const fetchTicketHandler = async (eventId) => {
    try {
      const {
        data: { data },
      } = await fetchEventTickets(eventId);

      const transformData = data.map((item, idx) => ({
        key: idx + 1,
        ...item,
      }));
      setTickets(transformData);
    } catch (ex) {
      console.log("gdgggggd", ex);
    }
  };
  const fetchDonationHandler = async (eventId) => {
    try {
      const {
        data: { data },
      } = await fetchDonation(eventId);

      // setTickets(data);

      const transformData = data.map((item, idx) => ({
        key: idx + 1,
        ...item,
      }));
      setDonations(transformData);
    } catch (ex) {}
  };
  const fetchSpeakers = async (id) => {
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
    fetchTicketHandler(id);
    fetchDonationHandler(id);
    fetchSpeakers(id);
  }, [id]);

  useEffect(() => {
    fetchDonationHandler(id);
  }, [id, reloadDonation]);

  useEffect(() => {
    if (eventDetail && eventDetail.data) {
      const currentEvent = eventDetail.data;
      const starts_at = moment(currentEvent?.start_date).format(
        "DD/MM/YYYY HH:mm:ss"
      );
      const ends_at = moment(currentEvent?.end_date).format(
        "DD/MM/YYYY HH:mm:ss"
      );

      console.log("starttt", starts_at, ends_at);
      setFormDate({
        ...currentEvent,
        shortName: currentEvent?.short_name,
        title: currentEvent?.title,
        description: currentEvent?.description,
        banner: currentEvent?.banner,
        logo: currentEvent?.logo,
        allowAttendee: currentEvent?.allow_attendee_registration,
        allowPoll: currentEvent?.allow_poll_access,
        countQuorom: currentEvent?.count_proxy_by_quorum,
        quorumBy: currentEvent?.set_quorum_by,
        quorumNumber: currentEvent?.quorum_number,
        subEvent: currentEvent?.subscribe_to_upcoming,
        starts_at,
        ends_at,
      });

      setEditCurrentEvent({
        banner: currentEvent?.banner,
        logo: currentEvent?.logo,
      });
    }
  }, [eventDetail?.data]);

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

  const handleFileUpload = async (e) => {
    const result = await fileUploader.uploadFile(e);
    const attnedeeList = result.map((item) => ({
      name: item[`Attendee Name`],
      email: item["Attendee Email"],
      phone_number: item["Attendee Phone Number"],
      vote_rights: item["Attendee Vote Right"],
      account_number: item["Attendee Account"],
    }));

    const config = eventConfig();

    const payload = {
      attendees: attnedeeList,
      ...config,
    };

    dispatch(postAttendeeAction(payload));
  };
  const handleProxySearch = (phrase) => {
    // setSearchPhrase(phrase);
    dbounceProxy(phrase);
  };
  useEffect(() => {
    fetchElections(currentEvent?.id);
  }, [reloadElection, currentEvent?.id]);

  useEffect(() => {
    dispatch(getAttendeeAction(searchPhrase, id));
    dispatch(getProxyAction(searchPhrase, id));
  }, [reloadAttendee]);

  const removeElection = async () => {
    try {
      const election = elections.filter(
        (item) => item.id !== singleElectionDetail.id
      );
      setElections(election);
      setEditElectionModal(false);

      await removeElectionHandler(singleElectionDetail.id);
    } catch (err) {
      setElections([...elections, singleElectionDetail]);
      setEditElectionModal(false);
    }
  };

  const handleSearch = (phrase) => {
    // setSearchPhrase(phrase);
    dbounce(phrase);
  };
  // const fetchResources = async (filter, setter, errorSetter) => {
  //   try {
  //     const {
  //       data: { data },
  //     } = await getResources(filter);

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
      } = await getResources(filter, id);

      setLinks(data);
    } catch (err) {
      setLinkError("Something went wrong", err);
    }
  };
  const fetchDocuments = async (filter) => {
    try {
      const {
        data: { data },
      } = await getResources(filter, id);

      setDocuments(data);
    } catch (err) {
      setDocumentError("Something went wrong", err);
    }
  };
  const fetchVideos = async (filter, id) => {
    try {
      const {
        data: { data },
      } = await getResources(filter);

      setVideos(data);
    } catch (err) {
      setVideoError("Something went wrong", err);
    }
  };
  useEffect(() => {
    fetchLinks("link", id);
  }, [id, reloadLink]);
  useEffect(() => {
    fetchDocuments("document", id);
  }, [id, reloadDocument]);
  useEffect(() => {
    fetchVideos("video", id);
  }, [id, reloadVideo]);

  const { Step } = Steps;

  const openElectionDetailModal = (item) => {
    setEditElectionTemplateVisible(false);
    setEditElectionModal(true);
    setSingleElectionDetail(item);
  };

  const redirectToPreveiew = (payload) => {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
    history.push(
      `/event/edit/preview/${currentEvent.id}`,
      JSON.stringify(payload)
    );
  };

  const handleStatutry = () => {
    setResolutionOpen(false);
    setStatutryOpen(true);
  };

  const closeQuestionaireModal = () => {
    setReloadQuestion((prev) => !prev);
    setQuestionaireOpen(false);
  };
  const closePollModal = () => {
    setReloadPoll((prev) => !prev);
    setPollModal(false);
  };
  const closeResolutionModal = () => {
    setReloadResolution((prev) => !prev);
    setResolutionOpen(false);
  };

  const closeResolutionStatutoryModal = () => {
    setReloadResolution((prev) => !prev);
    setStatutryOpen(false);
  };

  const fetchResolutions = async (eventId) => {
    try {
      setLoadingResolution(true);
      const {
        data: { data },
      } = await getResolutionsHandler(eventId);
      setLoadingResolution(false);
      setResolutions(data);
    } catch (ex) {
      setLoadingResolution(false);
      setResolutionError(ex.response);
    }
  };

  const fetchPolls = async (eventId) => {
    try {
      setLoadingPoll(true);
      const {
        data: { data },
      } = await getPollHandler(eventId);
      setLoadingPoll(false);
      setPolls(data);
    } catch (ex) {
      setLoadingPoll(false);
      setPolls(ex.response);
    }
  };
  const fetchQuestions = async (eventId) => {
    try {
      setLoadingQuestions(true);
      const {
        data: { data },
      } = await getQuestionaaireHandler(eventId);
      setLoadingQuestions(false);
      setQuestions(data);
    } catch (ex) {
      setLoadingQuestions(false);
      setQuestionError(ex.response);
    }
  };

  useEffect(() => {
    console.log(
      resolutions,
      resolutionError,
      loadingResolution,
      QuestionError,
      loadingQuestions
    );
  });

  const removeResolution = async () => {
    try {
      const resolution = resolutions.filter(
        (item) => item.id !== singleResolution.id
      );
      setResolutions(resolution);
      setResolutionModal(false);
      setTemplateVisible(false);

      await removeResolutionHandler(singleResolution.id);
    } catch (err) {
      setResolutions([...resolutions, singleResolution]);
      setResolutionModal(false);
      setTemplateVisible(false);
    }
  };
  const removeQuestionaiira = async () => {
    try {
      const question = questions.filter(
        (item) => item.id !== singleQuestionaaire.id
      );
      setQuestions(question);
      setEditQuestionaaireModal(false);
      setTemplateVisible(false);

      await removeQuestionHandler(singleQuestionaaire.id);
    } catch (err) {
      setQuestions([...questions, singleQuestionaaire]);
      setEditQuestionaaireModal(false);
      setTemplateVisible(false);
    }
  };
  const removePoll = async () => {
    try {
      const poll = polls.filter((item) => item.id !== singlePoll.id);
      setPolls(poll);
      setEditPollModal(false);
      setPollTemplateVisible(false);

      await removePollHandler(singlePoll.id);
    } catch (err) {
      setPolls([...polls, singlePoll]);
      setEditQuestionaaireModal(false);
      setTemplateVisible(false);
    }
  };
  useEffect(() => {
    fetchResolutions(id);
  }, [reloadResolution]);
  useEffect(() => {
    fetchQuestions(id);
  }, [reloadQuestion]);

  useEffect(() => {
    fetchPolls(id);
  }, [reloadPolls]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const disabledDate = (current) => {
    const today = moment();
    const past = moment(current);
    today.diff(past, "days");

    return today.diff(past, "days") >= 1;
  };
  const handleBannerTemplate = (item) => {
    setDefaultBannerUrl(item.bannerUrl);
    setEditCurrentEvent({ ...editCurrentEvent, banner: item.bannerUrl });
    setBannerFileList([]);
  };
  const dateHandler = (date, dateLabel) => {
    if (dateLabel === "startDate") {
      setUnformattedStartDate(date);
      setStartDate(date.format("DD/MM/YYYY hh:mm:ss"));
    } else {
      setUnformattedEndDate(date);
      setEndDate(date.format("DD/MM/YYYY hh:mm:ss"));
    }
  };
  const removeBanner = () => {
    setDefaultBannerUrl("");
    setBannerFileList([]);
  };
  const props = {
    onRemove: (file) => {
      setBannerFileList((prev) => {
        const index = prev.indexOf(file);
        const newFileList = prev.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    onPreview: handlePreview,
    beforeUpload: async (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";

      if (!isJpgOrPng) {
        setFileError({
          error: true,
          errorMsg: "You can only upload JPG/PNG file!",
        });
      }
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        setFileError({ error: true, errorMsg: "Image must smaller than 2MB!" });
      }

      if (isLt2M && isJpgOrPng) {
        const result = await getBase64(file);
        setEditCurrentEvent({ ...editCurrentEvent, banner: result });
        setBannerFileList((prev) => [...prev, file]);
        setDefaultBannerUrl(result);
      } else {
        setBannerFileList([]);
      }

      return false;
    },
    bannerFileList,
  };
  const closeTemplate = () => {
    if (!defaultBannerUrl) {
      setDefaultBannerUrl(template[0].bannerUrl);
    }
    setOpenBannerTemplate(false);
  };
  const onSubmit = async (data, preview = false) => {
    const httpRequests = [];
    if (logoFileList.length > 0) {
      httpRequests.push(
        uploadFile({ file: logoFileList[0], file_name: "logoUrl" })
      );
    }
    if (bannerFileList.length > 0) {
      httpRequests.push(
        uploadFile({ file: bannerFileList[0], file_name: "bannerUrl" })
      );
    }

    let bannerUrl;
    let logoUrl;

    try {
      if (httpRequests.length > 0) {
        if (!preview) {
          setUploading(true);
        } else {
          setUploadingPreviewFile(true);
        }
        const uploadResponse = await Promise.all(httpRequests);

        if (
          uploadResponse.length === 1 &&
          logoFileList.length === 0 &&
          bannerFileList.length > 0
        ) {
          bannerUrl =
            uploadResponse[0]?.data?.data?.file_link ?? currentEvent.banner;
          logoUrl = currentEvent.logo;
        }
        if (
          uploadResponse.length === 1 &&
          bannerFileList.length === 0 &&
          logoFileList.length > 0
        ) {
          logoUrl =
            uploadResponse[0]?.data?.data?.file_link ?? currentEvent.logo;
          bannerUrl = currentEvent.banner;
        }

        if (uploadResponse.length > 1) {
          const [logoData, bannerData] = uploadResponse;
          logoUrl = logoData?.data?.data?.file_link ?? currentEvent.logo;
          bannerUrl = bannerData?.data?.data?.file_link ?? currentEvent.banner;
        }
        setUploading(false);
      } else {
        const full = window.location.protocol + "//" + window.location.host;
        const selectedBannerUrl = defaultBannerUrl || template[0].bannerUrl;
        const customBannerUrl = full + selectedBannerUrl;
        bannerUrl = currentEvent.banner || customBannerUrl;
        logoUrl = currentEvent.logo;
      }

      const config = eventConfig();

      const payload = {
        banner: bannerUrl,
        logo: logoUrl,
        title: formData.title || currentEvent.title,
        short_name: formData.shortName || currentEvent.short_name,
        description: formData.description || currentEvent.description,
        attendee_mode: currentEvent.attendee_mode,
        event_type_id: currentEvent?.event_type?.id,
        meeting_type: meetingType?.title ?? currentEvent.meeting_type,
        end_date: endDate,
        start_date: startDate,
        starts_at: startDate,
        ends_at: endDate,
        subscribe_to_upcoming: formData.subEvent ? 1 : 0,
        ...config,
      };

      console.log("payload", payload);

      if (preview) {
        localStorage.setItem(
          "currentEvent",
          JSON.stringify({ ...currentEvent, payload })
        );
        redirectToPreveiew({ ...currentEvent, ...payload });
        return;
      }

      setUpdatingEvent(true);
      const { data } = await updateEvent(payload, currentEvent.id);
      if (data) {
        history.push("/event/success");
      }
    } catch (err) {
      console.log("serrpr", err, setReloadQuestion);
      // const error = err.response?.data ?? "Something went wrong";
      //  dispatch(createEventAction({ data: error, status: "fail" }));
    } finally {
      setUploading(false);
    }
  };
  const uploadBannerButton = (
    <div className={style.upload_box}>
      <>
        <BsFillImageFill size={25} color="#ef3125" />
        <div style={{ marginTop: 8 }}>
          <div className={style.uploadContent}>
            <span className={style.uploadContent_one}>
              Drag your image here, or
            </span>
            <span className={style.uploadContent_two}> browse</span>
          </div>
        </div>
      </>
    </div>
  );
  const logoProps = {
    onRemove: (file) => {
      setLogoFileList((prev) => {
        const index = prev.indexOf(file);
        const newFileList = prev.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },

    onPreview: handlePreview,
    beforeUpload: async (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";

      if (!isJpgOrPng) {
        setFileError({
          error: true,
          errorMsg: "You can only upload JPG/PNG file!",
        });
      }
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        setFileError({ error: true, errorMsg: "Image must smaller than 2MB!" });
      }

      if (isLt2M && isJpgOrPng) {
        //  setDefaultBannerUrl("");
        const result = await getBase64(file);
        setEditCurrentEvent({ ...editCurrentEvent, logo: result });
        setLogoFileList((prev) => [...prev, file]);
      } else {
        setLogoFileList([]);
      }

      return false;
    },
    logoFileList,
  };

  const uploadButton = (
    <div className={style.upload_box}>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <BsFillImageFill size={25} color="#ef3125" />
      )}
      <div style={{ marginTop: 8 }}>
        <div className={style.uploadContent}>
          <span className={style.uploadContent_one}>
            Drag your image here, or
          </span>
          <span className={style.uploadContent_two}> browse</span>
        </div>
      </div>
    </div>
  );

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setFormDate({ ...formData, [name]: value });
  };

  const baseImage = async (file) => {
    const imageUrl = await getBase64(file);
    setDefaultBannerUrl(imageUrl);
  };
  // const baseLogoImage = async (file) => {
  //   const imageUrl = await getBase64(file);
  //   setLogoUrl(imageUrl);
  // };

  useEffect(() => {
    if (bannerFileList.length) {
      baseImage(bannerFileList[0]);
    }
  }, [bannerFileList.length]);

  // useEffect(() => {
  //   if (logoFileList.length) {
  //     baseLogoImage(logoFileList[0]);
  //   }
  // }, [logoFileList.length]);

  const openDetailModal = (item) => {
    setResolutionModal(true);
    // setStatutryOpen(true);
    setSingleResolution(item);
  };

  const openQuestionDetailModal = (item) => {
    setEditTemplateVisible(false);
    setEditQuestionaaireModal(true);
    setSingleQuestionaaire(item);
  };

  const openPollDetailModal = (item) => {
    setPollTemplateVisible(false);
    setEditPollModal(true);
    setSinglePoll(item);
  };

  console.log("loogg", links);

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const allowRegistrationHandle = (e) =>
    setFormDate({ ...formData, allowAttendee: e.target.checked ? 1 : 0 });

  const countQuoromHandle = (e) =>
    setFormDate({ ...formData, countQuorom: e.target.checked ? 1 : 0 });

  // const quorumNumberHandle = (e) => setQuorumNumber(e.target.value);
  const quorumSetter = (e) =>
    setFormDate({ ...formData, quorumBy: e.target.checked ? 1 : 0 });
  const quorumNumberHandleTwo = (val) => {
    const newVal = val.target.value.replace(/,/g, "");
    // setQuorumNumber(newVal);
    setFormDate({ ...formData, quorumNumber: newVal });
  };
  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  const handleProxySetup = (e) => {
    setSetupProxy(e.target.checked);
  };

  return (
    <PrivateGenericLayout
      leftNav={
        <>
          <span className={style.containerNav_iconBox} onClick={history.goBack}>
            <MdKeyboardArrowLeft size={20} />
          </span>
          <DashboardLeftHeaderNav
            title="Event Summary"
            subtitle="Review the event and publish your event"
          />
        </>
      }
    >
      <section className={style.main}>
        <div className={style.headerContainer}>
          <div className={style.headerContainer_left}>
            <EditableBanner
              handleClick={() => {
                setUploadModal(true);
              }}
              bannerUrl={editCurrentEvent.banner}
              logoUrl={editCurrentEvent.logo}
            />
            <div className={style.headerContainer_left_input}>
              <div className={style.form__input_wrap}>
                <label htmlFor="firstName" className={style.form__input_label}>
                  Title
                </label>
                <div className={style.form__input_box}>
                  <input
                    className={style.form__editInput}
                    type="text"
                    placeholder="Africaprudential Event Management Meetings"
                    name="title"
                    value={formData.title}
                    onChange={changeHandler}
                  />
                  {/* <span className={style.input_card_icon}>
                  <MdModeEdit color="#09974D" />
                </span> */}
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <label htmlFor="firstName" className={style.form__input_label}>
                  Short Event Title
                </label>
                <div className={style.form__input_box}>
                  <input
                    className={style.form__editInput}
                    type="text"
                    placeholder="This free webinar is aimed at anyone considering Secondary school..."
                    name="shortName"
                    onChange={changeHandler}
                    value={formData.shortName}
                  />
                  {/* <span className={style.input_card_icon}>
                  <MdModeEdit color="#09974D" />
                </span> */}
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <label htmlFor="firstName" className={style.form__input_label}>
                  Event Brief
                </label>
                <div className={style.form__input_box}>
                  <textarea
                    className={style.form__editInput}
                    type="text"
                    placeholder="This free webinar is aimed at anyone considering Secondary school..."
                    name="description"
                    onChange={changeHandler}
                    value={formData.description}
                    rows={5}
                  />
                  {/* <span className={style.input_card_icon}>
                  <MdModeEdit color="#09974D" />
                </span> */}
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <SingleSelect
                  onChange={(item) => setMeetingType(item)}
                  selectedDefaultItem={
                    currentEvent && currentEvent.meeting_type === "Public"
                      ? "0"
                      : "1"
                  }
                >
                  <SingleCard position="1" title="Public" />
                  <SingleCard position="2" title="Private" />
                </SingleSelect>
              </div>

              {eventDetail && eventDetail.data && (
                <div className={style.formInline__input_wrap}>
                  <div className={style.form__input_box}>
                    <DatePicker
                      format="DD/MM/YYYY hh:mm:ss"
                      showTime={{ format: "HH:mm" }}
                      placeholder="DD/MM/YYYY hh:mm:ss"
                      disabledDate={disabledDate}
                      defaultValue={moment(
                        currentEvent?.starts_at,
                        "DD-MM-YYYY HH:mm:ss"
                      )}
                      // value={moment(startDate)}
                      value={unformattedStartDate}
                      allowClear={false}
                      className="form__input_date"
                      onChange={(date) => dateHandler(date, "startDate")}
                    />
                  </div>
                  <div className={style.form__input_box}>
                    <DatePicker
                      format="DD/MM/YYYY hh:mm:ss"
                      showTime={{ format: "HH:mm" }}
                      placeholder="DD/MM/YYYY hh:mm:ss"
                      disabledDate={disabledDate}
                      defaultValue={moment(
                        currentEvent?.ends_at,
                        "DD-MM-YYYY HH:mm:ss"
                      )}
                      // value={moment(startDate)}
                      value={unformattedEndDate}
                      allowClear={false}
                      className="form__input_date"
                      onChange={(date) => dateHandler(date, "endDate")}
                    />
                  </div>
                </div>
              )}

              <div
                className={style.form__input_wrap}
                style={{ marginTop: "10px" }}
              >
                <div className={style.form__input_box}>
                  <label
                    htmlFor="firstName"
                    className={style.form__input_label}
                  >
                    <Checkbox
                      onChange={allowRegistrationHandle}
                      checked={formData.allowAttendee}
                    >
                      <div className={style.form__label_text}>
                        <div className={style.form__label_title}>
                          Allow Attendee Registration
                        </div>
                        <p className={style.form__label_content}>
                          Allow attendees not on the attendee list to register
                          and join the event.
                        </p>
                      </div>
                    </Checkbox>
                  </label>
                </div>
                {currentEvent &&
                  currentEvent.event_type &&
                  currentEvent.event_type.name ===
                    "Annual-General-Meetings" && (
                    <>
                      {/* <div className={style.form__input_wrap}>
                        <div className={style.form__input_box}>
                          <label
                            htmlFor="firstName"
                            className={style.form__input_label}
                          >
                            <Checkbox
                              onChange={allowPollHandle}
                              checked={formData.allowPoll}
                            >
                              <div className={style.form__label_text}>
                                <div className={style.form__label_title}>
                                  Access to Poll & Question
                                </div>
                                <p className={style.form__label_content}>
                                  Allow your users have access to poll and
                                  questions created before the event goes live.
                                </p>
                              </div>
                            </Checkbox>
                          </label>
                        </div>
                      </div> */}
                      <div className={style.form__input_wrap}>
                        <div className={style.form__input_inline}>
                          <div
                            className={`${style.form__input_box} ${style.form__input_box_1}`}
                          >
                            <label
                              htmlFor="firstName"
                              className={style.form__input_label}
                            >
                              Set Quorum Number
                              <Tooltip
                                color="#5C6574"
                                placement="right"
                                title="Quorum is the number of users needed to be present for an event to automatically commence"
                              >
                                <span
                                  style={{
                                    color: "#ef3125",
                                    marginLeft: "10px",
                                  }}
                                >
                                  <AiFillQuestionCircle color="#5C6574" />
                                </span>
                              </Tooltip>
                            </label>
                            <NumberFormat
                              value={formData.quorumNumber}
                              thousandSeparator={true}
                              // prefix="NGN"
                              className="form__input"
                              onChange={quorumNumberHandleTwo}
                              onKeyPress={preventMinus}
                              onPaste={preventPasteNegative}
                              required
                            />
                          </div>
                          <div
                            style={{ marginLeft: "1rem" }}
                            className={`${style.form__input_box} ${style.form__input_box_2}`}
                          >
                            <label
                              htmlFor="endDate"
                              className={style.form__input_label}
                            >
                              Set Quorum by
                            </label>
                            <div className={style.input__date}>
                              <select
                                className={style.form__input}
                                onChange={quorumSetter}
                                style={{ padding: "1rem" }}
                              >
                                <option value="Voting">Voting Right</option>
                                <option value="Attendee">Attendee</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={style.form__input_wrap}>
                        <div className={style.form__input_box}>
                          <label
                            htmlFor="firstName"
                            className={style.form__input_label}
                          >
                            <Checkbox
                              onChange={countQuoromHandle}
                              checked={formData.countQuorom}
                            >
                              <div className={style.form__label_text}>
                                <div className={style.form__label_title}>
                                  Count Proxy by Quorum
                                </div>
                                <p className={style.form__label_content}>
                                  Include proxy during quorum count for this
                                  event.
                                </p>
                              </div>
                            </Checkbox>
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                {/* <div className={style.form__input_wrap}>
                  <div className={style.form__input_box}>
                    <Checkbox
                      onChange={(e) =>
                        setFormDate({ ...formData, subEvent: e.target.checked })
                      }
                      checked={formData.subEvent}
                    >
                      Allow Attendees subscribe to upcoming events
                    </Checkbox>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className={style.headerContainer_right}>
            <div className={style.pollType}>
              <Steps direction="vertical" current={1}>
                {currentEvent &&
                currentEvent.event_type &&
                currentEvent.event_type.name === "Annual-General-Meetings" ? (
                  <>
                    <Step
                      icon={
                        <span>
                          <FaPoll color="#09974D" size={30} />
                        </span>
                      }
                      title={
                        <span className={style.pollTitle}> Resolution</span>
                      }
                      description={
                        <div>
                          {loadingResolution && (
                            <div style={{ width: "100%", marginLeft: "10px" }}>
                              <Skeleton width={"100%"} height="60px" />
                            </div>
                          )}
                          {!loadingResolution &&
                          resolutions &&
                          resolutions.length > 0 ? (
                            <>
                              {resolutions.slice(0, 1).map((item, idx) => (
                                <ResolutionItem
                                  key={item.id}
                                  item={item}
                                  count={idx + 1}
                                  onClick={() => openDetailModal(item)}
                                />
                              ))}
                            </>
                          ) : null}
                          <div className={style.footerContainer}>
                            {resolutions.length > 1 && (
                              <div
                                className={style.pollFooter}
                                onClick={() => setTemplateVisible(true)}
                                style={{ cursor: "pointer" }}
                              >
                                See more
                              </div>
                            )}
                            <div
                              className={style.addPollWrap}
                              style={{ cursor: "pointer" }}
                            >
                              <IconButton
                                leftIcon={<FiPlus />}
                                iconTitle="Create Resolution"
                                containerStyle={style.addPollBtn}
                                handleClick={() => setStatutryOpen(true)}
                              />
                            </div>
                          </div>
                        </div>
                      }
                    />

                    <Step
                      icon={
                        <span>
                          <FaPoll color="#09974D" size={30} />
                        </span>
                      }
                      title={<span className={style.pollTitle}> Election</span>}
                      description={
                        <div>
                          {loadingElection && (
                            <div style={{ width: "100%", marginLeft: "10px" }}>
                              <Skeleton width={"100%"} height="60px" />
                            </div>
                          )}
                          {!loadingElection &&
                          elections &&
                          elections.length > 0 ? (
                            <>
                              {elections.slice(0, 1).map((item, idx) => (
                                <ResolutionItem
                                  key={item.id}
                                  item={{ ...item, title: item.position }}
                                  keyword="Election"
                                  count={idx + 1}
                                  onClick={() => openElectionDetailModal(item)}
                                />
                              ))}
                            </>
                          ) : null}

                          <div className={style.footerContainer}>
                            {elections.length > 1 && (
                              <div
                                className={style.pollFooter}
                                onClick={() =>
                                  setEditElectionTemplateVisible(true)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                See more
                              </div>
                            )}
                            <div
                              className={style.addPollWrap}
                              style={{ cursor: "pointer" }}
                            >
                              <IconButton
                                leftIcon={<FiPlus />}
                                iconTitle="Create Election"
                                containerStyle={style.addPollBtn}
                                handleClick={() => setElectionOpen(true)}
                              />
                            </div>
                          </div>
                        </div>
                      }
                    />
                    <Step
                      icon={
                        <span>
                          <FaPoll color="#09974D" size={30} />
                        </span>
                      }
                      title={
                        <span className={style.pollTitle}>
                          {" "}
                          Setup proxy form
                        </span>
                      }
                      description={
                        <div className={style.form__input_wrap}>
                          <div className={style.form__input_box}>
                            <label
                              htmlFor="firstName"
                              className={style.form__input_label}
                            >
                              <Checkbox onChange={handleProxySetup}>
                                <div className={style.form__label_text}>
                                  <p className={style.form__label_content}>
                                    Setup the proxy form for this event.
                                  </p>
                                </div>
                              </Checkbox>
                            </label>
                          </div>
                        </div>
                      }
                    />
                  </>
                ) : (
                  <Step
                    icon={
                      <span color="#09974D">
                        <AiFillQuestionCircle color="#09974D" size={30} />
                      </span>
                    }
                    title={<span className={style.pollTitle}>Polls</span>}
                    description={
                      <div>
                        {polls && polls.length > 0 ? (
                          <>
                            {polls.slice(0, 1).map((item) => (
                              <ResolutionItem
                                key={item.id}
                                item={item}
                                count={polls.length}
                                keyword="Polls"
                                onClick={() => openPollDetailModal(item)}
                              />
                            ))}
                          </>
                        ) : null}
                        <div className={style.footerContainer}>
                          {polls.length > 1 && (
                            <div
                              className={style.pollFooter}
                              onClick={() => setPollTemplateVisible(true)}
                            >
                              See more
                            </div>
                          )}
                          <div className={style.addPollWrap}>
                            <IconButton
                              leftIcon={<FiPlus />}
                              iconTitle="Create Poll"
                              containerStyle={style.addPollBtn}
                              handleClick={() => setPollModal(true)}
                            />
                          </div>
                        </div>
                      </div>
                    }
                  />
                )}

                <Step
                  icon={
                    <span color="#09974D">
                      <AiFillQuestionCircle color="#09974D" size={30} />
                    </span>
                  }
                  title={<span className={style.pollTitle}>Questions</span>}
                  description={
                    <div>
                      {loadingQuestions && (
                        <div style={{ width: "100%", marginLeft: "10px" }}>
                          <Skeleton width={"100%"} height="60px" />
                        </div>
                      )}
                      {questions && questions.length > 0 ? (
                        <>
                          {questions.slice(0, 1).map((item) => (
                            <ResolutionItem
                              key={item.id}
                              item={item}
                              count={questions.length}
                              keyword="Question"
                              onClick={() => openQuestionDetailModal(item)}
                            />
                          ))}
                        </>
                      ) : null}
                      <div className={style.footerContainer}>
                        {questions.length > 1 && (
                          <div
                            className={style.pollFooter}
                            onClick={() => setEditTemplateVisible(true)}
                          >
                            See more
                          </div>
                        )}
                        <div className={style.addPollWrap}>
                          <IconButton
                            leftIcon={<FiPlus />}
                            iconTitle="Create Questionaire"
                            containerStyle={style.addPollBtn}
                            handleClick={() => setQuestionaireOpen(true)}
                          />
                        </div>
                      </div>
                    </div>
                  }
                />
                {/* <Step
                icon={
                  <span color="#09974D">
                    <AiFillQuestionCircle color="#09974D" size={30} />
                  </span>
                }
                title={<span className={style.pollTitle}>Polls</span>}
                description={
                  <div>
                    {polls && polls.length > 0 ? (
                      <>
                        {polls.slice(0, 1).map((item) => (
                          <ResolutionItem
                            key={item.id}
                            item={item}
                            count={polls.length}
                            keyword="Polls"
                            onClick={() => openPollDetailModal(item)}
                          />
                        ))}
                        {polls.length > 1 && (
                          <div
                            className={style.pollFooter}
                            onClick={() => setPollTemplateVisible(true)}
                          >
                            See more
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={style.addPollWrap}>
                        <IconButton
                          leftIcon={<FiPlus />}
                          iconTitle="Create Poll"
                          containerStyle={style.addPollBtn}
                          handleClick={() => setPollModal(true)}
                        />
                      </div>
                    )}
                  </div>
                }
              /> */}
                <Step title="" style={{ display: "none" }} />
              </Steps>
            </div>
          </div>
        </div>
        <section className={style.tableContainer}>
          <div style={{ marginBottom: "5rem" }}>
            <DataTable
              toggleAddProxyModal={(val) => {
                setAttendeeType("attendee");
                setAddAttendeeVisible(true);
              }}
              addAttendeeText="Add Attendee Manually"
              data={
                allAttendees?.attendees.map((item, idx) => ({
                  ...item,
                  key: idx + 1,
                })) ?? []
              }
              showIcon={true}
              columns={columns}
              showFilter={false}
              addAttendee={() => setAttendeeModal(true)}
              handleSearch={handleSearch}
              handleFileUpload={handleFileUpload}
              csvHeader={[
                { label: "Attendee Name", key: "name" },
                { label: "Attendee Email", key: "email" },
                { label: "Attendee Phone Number", key: "phone_number" },
                { label: "Attendee Account", key: "account_number" },
                { label: "Attendee Vote Right", key: "vote_rights" },
              ]}
              csvFileName="attendee.csv"
            />
          </div>

          {currentEvent &&
            currentEvent.event_type &&
            currentEvent.event_type.name !== "Annual-General-Meetings" && (
              <div style={{ marginBottom: "1rem" }}>
                <DataTable
                  showIcon={true}
                  handleSearch={handleProxySearch}
                  data={
                    allProxies?.proxies.map((item, idx) => ({
                      ...item,
                      key: idx + 1,
                    })) ?? []
                  }
                  title="Proxy list"
                  columns={columnsProxy}
                  addAttendee={() => setProxyModal(true)}
                  csvHeader={[
                    { label: "Participant Name", key: "participant_name" },
                    {
                      label: "Participant Account Number",
                      key: "account_number",
                    },
                    {
                      label: "Nominated Proxy Name",
                      key: "nominated_proxy_name",
                    },
                    { label: "Voting Right", key: "voting_right" },
                    { label: "ResolutionId", key: "id" },
                  ]}
                  csvFileName="proxy.csv"
                  toggleAddProxyModal={(val) => {
                    setAttendeeType("proxy");
                    setAddProxyVisible(true);
                  }}
                />
              </div>
            )}
          {currentEvent &&
            currentEvent.event_type &&
            currentEvent.event_type.name !== "Annual-General-Meetings" && (
              <>
                <div className={style.tableContainerPoll}>
                  <div className={style.tableHeader}>
                    <div className={style.tableHeader_title}>Event Ticket</div>
                  </div>
                  <Table
                    columns={columnsEventTicket}
                    dataSource={tickets}
                    rowClassName="customTableRow"
                  />
                </div>

                <div className={style.tableContainerPoll}>
                  <div className={style.tableHeader}>
                    <div className={style.tableHeader_title}>
                      Event Donations
                    </div>
                  </div>
                  <Table
                    columns={columnsEventDonationFunc(() => alert(6))}
                    dataSource={donations}
                    rowClassName="customTableRow"
                  />
                </div>
              </>
            )}

          <Modal
            title={
              <div className={style.addProxyHeader}>
                <div className={style.proxyIconBox}>
                  <span className={style.questionBox}>
                    <AiFillQuestionCircle color="#fff" />
                  </span>
                </div>
                <div className={style.addTitle}>ADD ATTENDEE</div>
                <div className={style.addDesc}>
                  Enter information of your attendee
                </div>
              </div>
            }
            centered
            footer={null}
            onCancel={() => setAddAttendeeVisible(false)}
            visible={addAttendeeVisible}
            closable={true}
            bodyStyle={{ backgroundColor: "#9999992b" }}
          >
            <div className={style.formContainer}>
              <form onSubmit={handleSubmit(onSubmitAttendee)}>
                <FormInput
                  placeholder="Enter participant name..."
                  labelTitle="Participant Name"
                  inputType="text"
                  isRequired={false}
                  errors={errors}
                  name="participantName"
                  watch={watch}
                  register={register("participantName")}
                  showCount={false}
                />
                <FormInput
                  placeholder="Paste or enter email address..."
                  labelTitle="Enter Email"
                  inputType="email"
                  errors={errors}
                  isRequired={false}
                  name="email"
                  watch={watch}
                  maxLength={100}
                  register={register("email")}
                  showCount={false}
                />
                <FormInput
                  placeholder="08090708989"
                  labelTitle="Enter phone number"
                  inputType="text"
                  isRequired={false}
                  errors={errors}
                  name="phoneNumber"
                  watch={watch}
                  maxLength={100}
                  register={register("phoneNumber")}
                  showCount={false}
                />
                <FormInput
                  placeholder="Enter Account Number"
                  labelTitle="Participant Account Number"
                  inputType="text"
                  isRequired={false}
                  errors={errors}
                  name="accountNumber"
                  watch={watch}
                  maxLength={10}
                  register={register("accountNumber")}
                  showCount
                />
                <div className={style.form__input_wrap}>
                  <div className={style.form__input_box}>
                    <label
                      htmlFor="firstName"
                      className={style.form__input_label}
                    >
                      Attendee Voting rights (Holdings/units)
                    </label>
                    <NumberFormat
                      value={votersRight}
                      thousandSeparator={true}
                      // prefix="NGN"
                      placeholder="0"
                      className="form__input"
                      onChange={quorumNumberHandle}
                      onKeyPress={preventMinus}
                      onPaste={preventPasteNegative}
                      required
                    />
                  </div>
                </div>

                <div className={style.form__input_wrap}>
                  <button
                    type="submit"
                    disabled={allAttendees.loading}
                    className={style.form__input_submit_request}
                  >
                    {allAttendees.loading ? (
                      <Spin size="large" color="#fff" />
                    ) : (
                      " Confirm"
                    )}
                  </button>
                  {allAttendees.data && (
                    <AlertResponse
                      status={allAttendees.status}
                      data={allAttendees.data}
                      onClose={onCloseAttendee}
                      message={allAttendees.message}
                    />
                  )}
                </div>
              </form>
            </div>
          </Modal>
          <Modal
            title={
              <div className={style.addProxyHeader}>
                <div className={style.proxyIconBox}>
                  <span className={style.questionBox}>
                    <AiFillQuestionCircle color="#fff" />
                  </span>
                </div>
                <div className={style.addTitle}>ADD PROXY</div>
                <div className={style.addDesc}>Enter proxy information</div>
              </div>
            }
            centered
            footer={null}
            visible={addProxyVisible}
            closable={true}
            onCancel={() => setAddProxyVisible(false)}
            bodyStyle={{ backgroundColor: "#9999992b" }}
          >
            <div className={style.formContainer}>
              <form onSubmit={handleSubmit(onSubmitProxy)}>
                <FormInput
                  placeholder="Enter participant name..."
                  labelTitle="Participant Name"
                  inputType="text"
                  isRequired={false}
                  errors={errors}
                  name="participantName"
                  watch={watch}
                  register={register("participantName")}
                  showCount={false}
                />
                <FormInput
                  placeholder="Enter Account Number"
                  labelTitle="Participant Account Number"
                  inputType="text"
                  isRequired={false}
                  errors={errors}
                  name="accountNumber"
                  watch={watch}
                  maxLength={10}
                  register={register("accountNumber")}
                  showCount
                />
                <FormInput
                  placeholder="Enter voters right"
                  labelTitle="Participant Voting rights (Holdings/Units)"
                  inputType="number"
                  isRequired={false}
                  errors={errors}
                  name="votersRight"
                  watch={watch}
                  maxLength={100}
                  min={0}
                  register={register("votersRight")}
                  showCount={false}
                />
                <FormInput
                  placeholder="Enter voters right"
                  labelTitle="Nominated Proxy Name"
                  inputType="text"
                  isRequired={false}
                  errors={errors}
                  name="nominatedProxy"
                  watch={watch}
                  maxLength={100}
                  register={register("nominatedProxy")}
                  showCount={false}
                />

                <div className={style.form__input_wrap}>
                  {resolutionSelector.length > 0 &&
                    resolutionSelector.map((item, idx) => (
                      <MemoResolutionPicker
                        key={shortid.generate()}
                        item={item}
                        idx={idx}
                        selectedValue={selectedValue}
                        data={resolutionSelector}
                        resolutionHandler={(e) =>
                          dispenseCallback(e.target.value, item)
                        }
                        addNewResolution={() => addNewResolution(idx + 1)}
                      />
                    ))}
                </div>
                <div className={style.form__input_wrap}>
                  {electionSelector.length > 0 &&
                    electionSelector.map((item, idx) => (
                      <MemoElectionPicker
                        key={shortid.generate()}
                        item={item}
                        idx={idx}
                        selectedValue={selectedValue}
                        data={electionSelector}
                        elections={elections}
                        resolutionHandler={(e, idx) =>
                          electionHandler(e.target.value, item, idx)
                        }
                        addNewElection={addNewElectionCb}
                        objElection={objElection}
                      />
                    ))}
                </div>
                <div className={style.form__input_wrap}>
                  <button
                    type="submit"
                    className={style.form__input_submit_request}
                  >
                    {proxy.loading ? (
                      <Spin size="large" color="#fff" />
                    ) : (
                      " Confirm"
                    )}
                  </button>
                  {proxy.data && (
                    <AlertResponse
                      status={proxy.status}
                      data={proxy.data}
                      onClose={onClose}
                      message={proxy.message}
                    />
                  )}
                </div>
              </form>
            </div>
          </Modal>

          {/* <div className={style.tableContainerPoll}>
          <div className={style.tableHeader}>
            <div className={style.tableHeader_title}>Event Ticket</div>
          </div>
          <Table
            columns={columnsProxy}
            dataSource={dataPoxy}
            rowClassName="customTableRow"
          />
        </div> */}
        </section>
        {/* <section className={style.tableContainer}>
          <div style={{ marginBottom: "5rem" }}>
            <DataTable
              data={allAttendees.attendees}
              columns={columns}
              showFilter={true}
              handleSearch={handleSearch}
              csvHeader={[
                { label: "Participant Name", key: "name" },
                { label: "Email", key: "email" },
                { label: "Phone Number", key: "phone_number" },
                { label: "Account number", key: "account_number" },
                { label: "Vote", key: "vote_rights" },
              ]}
              csvFileName="attendee.csv"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <DataTable
              data={allProxies?.proxies ?? []}
              title="Proxy list"
              columns={columnsProxy}
            />
          </div>


        </section> */}
        <div className={style.addResourceCont}>
          <h4 className={style.resourceHeader}>Resources</h4>
          <div className={style.buttonContainer}>
            <Dropdown
              overlay={menu}
              placement="bottomCenter"
              arrow
              trigger={["click"]}
            >
              <button
                onClick={() => {}}
                className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_res}`}
              >
                <span className={style.main_container_btnContainer_btn_icon}>
                  <FiPlus size={18} color="#09974d" />
                </span>
                <span className={style.main_container_btnContainer_btn_title}>
                  Add a documents, links and video
                </span>
              </button>
            </Dropdown>
          </div>
        </div>

        {documents && documents.length ? (
          <div className={style.uploadedDoc}>
            <div className={style.uploadedDoc_title}>Uploaded Documents</div>

            <div className={style.documentWrapper}>
              <DocumentList items={documents} />
            </div>
          </div>
        ) : null}

        {links && links.length ? (
          <div className={style.uploadLink}>
            <div className={style.uploadLink_title}>Uploaded Links</div>
            <div className={style.documentWrapper}>
              <AgmLink items={links} />
            </div>
          </div>
        ) : null}

        {videos && videos.length ? (
          <div className={style.uploadLink}>
            <div className={style.uploadLink_title}>Uploaded Video</div>
            <div className={style.documentWrapper}>
              <VideoList items={videos} />
            </div>
          </div>
        ) : null}

        {currentEvent &&
          currentEvent.event_type &&
          currentEvent.event_type.name !== "Annual-General-Meetings" && (
            <div className={style.panelIstContainer_wrap}>
              <div className={style.uploadLink_title}>Panelists/Speakers</div>
              <div className={style.panelIstContainer}>
                {speakers && speakers.length
                  ? speakers.map((item, idx) => (
                      <CircularAvatar
                        imageUrl={item.photo}
                        key={item.id}
                        item={item}
                        title={item.name}
                      />
                    ))
                  : null}
              </div>
            </div>
          )}

        <section className={style.upload_btn}>
          <button
            onClick={onSubmit}
            type="button"
            className={`${style.form__input_submit_request} ${style.form__input_submit_left}`}
          >
            {updatingEvent || uploading ? (
              <Spin size="large" color="#fff" />
            ) : (
              "Edit Event"
            )}
          </button>
          <button
            // onClick={redirectToPreveiew}
            onClick={() => onSubmit(null, true)}
            type="button"
            className={`${style.form__input_submit_right}`}
          >
            {uploadingPreviewFile ? (
              <Spin size="large" color="#fff" />
            ) : (
              "Preview"
            )}
          </button>
        </section>
        <Modal
          style={{
            width: "100%",
            maxWidth: "100%",
            position: "absolute",
            // marginRight: "10%",
            left: "10%",
            top: "8%",
          }}
          visible={uploadModal}
          onCancel={() => setUploadModal(false)}
          width={"70%"}
          bodyStyle={{
            height: "110vh",
            position: "relative",
          }}
          footer={null}
          header={null}
          position="relative"
          closeIcon={
            <span
              className={style.closeModal}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#CED0D5",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                marginTop: "3rem",
              }}
            >
              <MdClose color="#000" />
            </span>
          }
        >
          <div className={style.templateContainer_banner}>
            <h3 className={style.template_header}>
              Edit Event Banner and Logo
            </h3>
            <p className={style.template_para}>
              Edit or change your event banner and/or Logo if or when needed.
            </p>
            <div className={style.template_banner}>
              <div className={style.form__input_wrap}>
                <div className={style.form__input_box}>
                  <label
                    htmlFor="bannerImage"
                    className={style.form__input_label}
                  >
                    Upload Banner Image
                  </label>
                  {defaultBannerUrl && bannerFileList.length === 0 ? (
                    <div
                      onClick={removeBanner}
                      className={style.bannerImageBox}
                    >
                      <span style={{ position: "absolute", zIndex: 100 }}>
                        <MdClose size={20} color="rgba(255,255,255,.6)" />
                      </span>
                      <img
                        src={defaultBannerUrl}
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          height: "150px",
                        }}
                      />
                    </div>
                  ) : (
                    <Dragger
                      style={{ width: "100%" }}
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      {...props}
                      accept="image/*"
                    >
                      {uploadBannerButton}
                    </Dragger>
                  )}

                  <div
                    className={style.uploadSubText}
                    onClick={() => setOpenBannerTemplate(true)}
                  >
                    <span className={style.uploadSubText_left}>
                      Don’t have a banner for your event?
                    </span>{" "}
                    <span className={style.uploadSubText_right}>
                      Use our banner templates
                    </span>
                  </div>
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <div className={style.form__input_box}>
                  <label
                    htmlFor="bannerImage"
                    className={style.form__input_label}
                  >
                    Upload Event Logo{" "}
                    <span style={{ color: "#ef3125" }}>(required)</span>
                  </label>
                  <Dragger
                    {...logoProps}
                    style={{ width: "100%" }}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    accept="image/*"
                  >
                    {uploadButton}
                  </Dragger>
                </div>
              </div>
            </div>
            <div className={style.template_footer}>
              <button
                onClick={() => setUploadModal(false)}
                type="button"
                className={`${style.template_contBtd}`}
              >
                Continue
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          forceRender={true}
          style={{
            width: "100%",
            maxWidth: "100%",
            position: "absolute",
            // marginRight: "10%",
            left: "10%",
            top: 0,
          }}
          visible={editElectionTemplateVisible}
          onCancel={() => setEditElectionTemplateVisible(false)}
          width={"80%"}
          bodyStyle={{
            height: "110vh",
            position: "relative",
          }}
          footer={null}
          header={null}
          position="relative"
          closeIcon={
            <span
              className={style.closeModal}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#CED0D5",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                marginTop: "3rem",
              }}
            >
              <MdClose color="#000" />
            </span>
          }
        >
          <div className={style.templateContainer}>
            <h3 className={style.template_header}> More Elections</h3>
            <div className={style.template_list}>
              {elections &&
                elections.length > 0 &&
                elections.map((item, idx) => (
                  <div className={style.resolutionCard} key={item.id}>
                    <ResolutionItem
                      item={{ ...item, title: item.position }}
                      keyword="Election"
                      count={idx + 1}
                      onClick={() => openElectionDetailModal(item)}
                      closeTemplate={() =>
                        setEditElectionTemplateVisible(false)
                      }
                    />
                  </div>
                ))}
            </div>
          </div>
        </Modal>
        <Modal
          forceRender={true}
          style={{
            width: "100%",
            maxWidth: "100%",
            position: "absolute",
            // marginRight: "10%",
            left: "10%",
            top: 0,
          }}
          visible={editTemplateVisible}
          onCancel={() => setEditTemplateVisible(false)}
          width={"80%"}
          bodyStyle={{
            height: "110vh",
            position: "relative",
          }}
          footer={null}
          header={null}
          position="relative"
          closeIcon={
            <span
              className={style.closeModal}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#CED0D5",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                marginTop: "3rem",
              }}
            >
              <MdClose color="#000" />
            </span>
          }
        >
          <div className={style.templateContainer}>
            <h3 className={style.template_header}> More Questionaaire</h3>
            <div className={style.template_list}>
              {questions &&
                questions.length > 0 &&
                questions.slice(1).map((item, idx) => (
                  <div className={style.resolutionCard} key={item.id}>
                    <ResolutionItem
                      item={{ ...item, title: item.title }}
                      count={idx + 1}
                      onClick={() => openQuestionDetailModal(item)}
                      keyword="Question"
                      closeTemplate={() => openQuestionDetailModal(false)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </Modal>
        <LeftDrawerModal
          visible={attendeeModal}
          closeModal={() => setAttendeeModal(false)}
          tagName="Setup Attendee"
          headerTitle="Enter question and corresponding answer for your attendees to select
from."
        >
          <AttendeeForm
            attendees={allAttendees?.attendees ?? []}
            reloadAttendee={() => setReloadAttendee((prev) => !prev)}
            closeAttendeeForm={() => setAttendeeModal(false)}
          />
        </LeftDrawerModal>
        <LeftDrawerModal
          visible={proxyModal}
          closeModal={() => setProxyModal(false)}
          tagName="Setup Attendee"
          headerTitle="Enter question and corresponding answer for your attendees to select
from."
        >
          <ProxyForm proxies={allProxies?.proxies ?? []} />
        </LeftDrawerModal>
        <Modal
          forceRender={true}
          style={{
            width: "100%",
            maxWidth: "100%",
            position: "absolute",
            // marginRight: "10%",
            left: "10%",
            top: 0,
          }}
          visible={templateVisible}
          onCancel={() => setTemplateVisible(false)}
          width={"80%"}
          bodyStyle={{
            height: "110vh",
            position: "relative",
          }}
          footer={null}
          header={null}
          position="relative"
          closeIcon={
            <span
              className={style.closeModal}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#CED0D5",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                marginTop: "3rem",
              }}
            >
              <MdClose color="#000" />
            </span>
          }
        >
          <div className={style.templateContainer}>
            <h3 className={style.template_header}> More Resolutions</h3>
            <div className={style.template_list}>
              {resolutions &&
                resolutions.length > 0 &&
                resolutions.map((item, idx) => (
                  <div className={style.resolutionCard} key={item.id}>
                    <ResolutionItem
                      item={item}
                      count={idx + 1}
                      onClick={() => openDetailModal(item)}
                      closeTemplate={() => setTemplateVisible(false)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </Modal>
        <Modal
          forceRender={true}
          style={{
            width: "100%",
            maxWidth: "100%",
            position: "absolute",
            // marginRight: "10%",
            left: "10%",
            top: 0,
          }}
          visible={questionModalVisible}
          onCancel={() => setQuestionModalVisible(false)}
          width={"80%"}
          bodyStyle={{
            height: "110vh",
            position: "relative",
          }}
          footer={null}
          header={null}
          position="relative"
          closeIcon={
            <span
              className={style.closeModal}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#CED0D5",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                marginTop: "3rem",
              }}
            >
              <MdClose color="#000" />
            </span>
          }
        >
          <div className={style.templateContainer}>
            <h3 className={style.template_header}> More Questions</h3>
            <div className={style.template_list}>
              {questions &&
                questions.length > 0 &&
                questions.map((item, idx) => (
                  <div className={style.resolutionCard} key={item.id}>
                    <ResolutionItem
                      item={item}
                      count={idx + 1}
                      keyword="Question"
                      onClick={() => openDetailModal(item)}
                      closeTemplate={() => setTemplateVisible(false)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </Modal>
        <Modal
          forceRender={true}
          style={{
            width: "100%",
            maxWidth: "100%",
            position: "absolute",
            // marginRight: "10%",
            left: "10%",
            top: 0,
          }}
          visible={pollTemplateVisible}
          onCancel={() => setPollTemplateVisible(false)}
          width={"80%"}
          bodyStyle={{
            height: "110vh",
            position: "relative",
          }}
          footer={null}
          header={null}
          position="relative"
          closeIcon={
            <span
              className={style.closeModal}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#CED0D5",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                marginTop: "3rem",
              }}
            >
              <MdClose color="#000" />
            </span>
          }
        >
          <div className={style.templateContainer}>
            <h3 className={style.template_header}> More polls</h3>
            <div className={style.template_list}>
              {polls &&
                polls.length > 0 &&
                polls.map((item, idx) => (
                  <div className={style.resolutionCard} key={item.id}>
                    <ResolutionItem
                      item={item}
                      count={idx + 1}
                      keyword="Question"
                      onClick={() => openPollDetailModal(item)}
                      closeTemplate={() => setPollTemplateVisible(false)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </Modal>
        <CustomModal
          visible={openBannerTemplate}
          closeModal={setOpenBannerTemplate}
        >
          <BannerTemplate
            handleBannerTemplate={handleBannerTemplate}
            closeTemplate={closeTemplate}
            defaultBannerUrl={defaultBannerUrl}
          />
        </CustomModal>
        <LeftDrawerModal
          visible={setupProxy}
          modalHeight={"100vh"}
          drawerWidth="60%"
          closeModal={() => setSetupProxy(false)}
          tagName="Proxy Setup"
          headerTitle="Allow Proxy Voting"
          closeIcon={closeIcon}
        >
          <section>
            <div className={style.proxyFormTemp}>
              <div className={style.resolutionTab}>
                I/We{"  "}
                <input
                  className={style.stakeHolderBox}
                  placeholder="{ Shareholder  name }"
                />
                being a member/ members of{" "}
                <input
                  className={style.stakeHolderBox}
                  placeholder="{ Company name }"
                />
                , hereby appoint{" "}
                {openCloseProxy !== "open" ? (
                  <select>
                    <option value="">Select proxy</option>
                    {candidateInputCount.map((item, idx) => (
                      <option key={idx} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={style.stakeHolderBox}
                    placeholder="{ Proxy name }"
                  />
                )}
                <textarea
                  className={style.stalkholder_textarea}
                  placeholder={`failing him, the Chairman of the meeting as my/our proxy to act and vote for me/us and on my/our behalf at the 5TH Annual General Meeting of the Company to be held on Monday, May 31, 2021, at Radisson Blu Anchorage Hotel, 1a Ozumba Mbadiwe Avenue
Victoria Island Lagos, at 11.00a.m. and at any adjournment
thereof. A member (Shareholder) who is unable to attend an
Annual General Meeting is allowed by law to vote by proxy. The
above proxy form has been prepared to enable you exercise your
right to vote, in case you cannot personally attend the meeting.
Please sign this proxy form and forward it, so as to reach the
registered office of the Registrar, Africa Prudential Plc, 220B
Ikorodu Road, Palmgrove, Lagos, or via email at
cfc@africaprudential.com not later than 48 hours before the time
fixed for the meeting. If executed by a Corporation, the proxy
form must be under its common seal or under the hand of a duly
authorized officer or attorney. It is a requirement of the law
under the Stamp Duties Act, Cap S8, Laws of the Federation of
Nigeria, 2004, that any instrument of proxy to be used for the
purpose of voting by any person entitled to vote at any meeting
of shareholders must be stamped by the Commissioner for Stamp
Duties. However, in compliance with the CAC Guidelines for
conduct of AGM by Proxy, the Company has made arrangement at its
cost, for the stamping of the duly completed and signed proxy
forms submitted to the Company’s Registrars. The Proxy must
produce the Admission Card below to gain entrance into the
Meeting.`}
                ></textarea>
              </div>
              <div className={style.form__input_wrap}>
                <div className={style.form__input_box}>
                  <label
                    htmlFor="question"
                    className={style.proxy__input_label}
                  ></label>
                  <div className={style.form__label_text}>
                    <div className={style.form__label_title}>
                      {/* Open Proxy/ Closed Proxy */}
                      <Radio.Group onChange={openCloseProxyHandler}>
                        <Space direction="vertical">
                          <Radio value="open">Open Proxy</Radio>
                          <Radio value="close">Closed Proxy</Radio>
                        </Space>
                      </Radio.Group>
                    </div>
                  </div>
                  {openCloseProxy === "close" &&
                    candidateInputCount.length > 0 &&
                    candidateInputCount.map((item, idx) => (
                      <Candidate
                        key={idx}
                        addCandidates={addCandidates}
                        removeInput={() => removeInput(item, idx)}
                        onChange={(e) => onChange(e, idx)}
                        item={item}
                        disabled={openCloseProxy}
                      />
                    ))}
                </div>

                {openCloseProxy === "close" && (
                  <div className={style.resolutionSubBtn}>
                    <div
                      className={style.resolutionSubBtn_left}
                      onClick={() =>
                        setCandidateInputCount([
                          ...candidateInputCount,
                          { name: "" },
                        ])
                      }
                    >
                      <span className={style.addProxyBox}>
                        <FiPlus className={style.uploadIcon} size={18} />{" "}
                      </span>
                      <span className={style.addProxyText}>Add New Proxy</span>
                    </div>
                  </div>
                )}
              </div>
              <div className={style.form__input_wrap}>
                <button type="button" className={style.form__input_view}>
                  save
                </button>
              </div>
            </div>
          </section>
        </LeftDrawerModal>
        <LeftDrawerModal
          visible={electionOpen}
          closeModal={() => setElectionOpen(false)}
          tagName="Setup Election"
          top={"30px"}
          left={"-1280px"}
          drawerWidth={"85%"}
          modalHeight="100vh"
          headerTitle="Enter election position and the possible candidates for your attendees to select from."
        >
          <ElectionForm
            eventDetail={currentEvent}
            reload={() => setReloadElection((prev) => !prev)}
            closeReolutionModal={() => setElectionOpen((prev) => !prev)}
          />
        </LeftDrawerModal>
        <LeftDrawerModal
          visible={editElectionModal}
          destroyOnClose={true}
          closeModal={() => setEditElectionModal(false)}
          tagName="Setup Election"
          top={"30px"}
          left={"-1280px"}
          drawerWidth={"85%"}
          modalHeight="100vh"
          headerTitle="Enter election position and the possible candidates for your attendees to select from."
        >
          <EditElectionForm
            item={singleElectionDetail}
            eventDetail={currentEvent}
            setEditQuestionaaireModal={() => setEditElectionModal(true)}
            removeElection={removeElection}
            reloadElection={() => setReloadElection((prev) => !prev)}
            closeEditElectionModal={() => {
              setEditElectionModal(false);
            }}
            closeModal={() => setEditElectionModal(false)}
          />
        </LeftDrawerModal>

        <LeftDrawerModal
          visible={resolutionModal}
          closeModal={() => setResolutionModal(false)}
          tagName="Setup Resolution"
          headerTitle="Enter question and corresponding answer for your attendees to select
from."
        >
          <EditResolutionForm
            item={singleResolution}
            removeResolution={removeResolution}
            reloadResolution={() => setReloadResolution((prev) => !prev)}
            closeResolutionModal={() => setResolutionModal(false)}
          />
        </LeftDrawerModal>
        <LeftDrawerModal
          visible={resolutionOpen}
          closeModal={() => closeResolutionModal()}
          tagName="Setup Resolution"
          headerTitle="Enter question and corresponding answer for your attendees to select
    from."
        >
          <ResolutionForm
            handleStatutry={handleStatutry}
            closeModal={closeResolutionModal}
            eventDetail={currentEvent}
          />
        </LeftDrawerModal>
        <LeftDrawerModal
          visible={statutryOpen}
          closeModal={() => setStatutryOpen(false)}
          tagName="Statutory Resolution"
          headerTitle="Enter Statutory Resolution and corresponding vote for your attendees to select from."
        >
          <StatutoryForm
            closeModal={closeResolutionStatutoryModal}
            handleStatutry={handleStatutry}
            eventDetail={currentEvent}
          />
        </LeftDrawerModal>
        <LeftDrawerModal
          visible={editQuestionaaireModal}
          closeModal={() => setEditQuestionaaireModal(false)}
          tagName="Ask Question"
          headerTitle="Create either an open-ended question or a close-ended question."
        >
          <EditQuestionaireForm
            item={singleQuestionaaire}
            removeQuestionaiira={removeQuestionaiira}
            reloadQuestion={() => setReloadQuestion((prev) => !prev)}
            closeQuestionaireModal={() => {
              setEditTemplateVisible(false);
              setEditQuestionaaireModal(false);
            }}
            closeModal={() => setEditQuestionaaireModal(false)}
          />
        </LeftDrawerModal>
        <LeftDrawerModal
          visible={editPollModal}
          closeModal={() => setEditPollModal(false)}
          tagName="Setup Poll"
          headerTitle="Enter question and corresponding answer for your attendees to select from."
        >
          <EditPollForm
            item={singlePoll}
            removePoll={removePoll}
            reloadQuestion={() => setReloadPoll((prev) => !prev)}
            closeQuestionaireModal={() => {
              setPollTemplateVisible(false);
              setEditPollModal(false);
            }}
            closeModal={() => setEditPollModal(false)}
          />
        </LeftDrawerModal>
        <LeftDrawerModal
          visible={questionaireOpen}
          closeModal={() => closeQuestionaireModal()}
          tagName="Ask Question"
          headerTitle="Create either an open-ended question or a close-ended question."
        >
          <QuestionaireForm
            closeModal={closeQuestionaireModal}
            eventDetail={currentEvent}
          />
        </LeftDrawerModal>
        <LeftDrawerModal
          visible={pollModal}
          closeModal={() => closePollModal()}
          tagName="Setup Poll"
          headerTitle="Enter question and corresponding answer for your attendees to select from."
        >
          <PollForm closeModal={closePollModal} eventDetail={currentEvent} />
        </LeftDrawerModal>
        <Modal
          title={
            <div className={style.addProxyHeader}>
              <div className={style.proxyIconBox}>
                <span className={style.questionBox}>
                  <AiFillQuestionCircle color="#fff" />
                </span>
              </div>
              <div className={style.addTitle}>ADD DOCUMENT</div>
            </div>
          }
          centered
          footer={null}
          visible={openDocument}
          closable={true}
          onCancel={() => setOpenDocument(false)}
          bodyStyle={{ backgroundColor: "#9999992b" }}
        >
          <div style={{ width: "450px" }}>
            <DocumentForm
              reload={() => setReloadDocument((prev) => !prev)}
              setTab={() => setOpenDocument(false)}
              id={id}
            />
          </div>
        </Modal>

        <Modal
          title={
            <div className={style.addProxyHeader}>
              <div className={style.proxyIconBox}>
                <span className={style.questionBox}>
                  <AiFillQuestionCircle color="#fff" />
                </span>
              </div>
              <div className={style.addTitle}>ADD LINK</div>
            </div>
          }
          centered
          footer={null}
          visible={openLink}
          closable={true}
          onCancel={() => setOpenLink(false)}
          bodyStyle={{ backgroundColor: "#9999992b" }}
        >
          <div style={{ width: "450px" }}>
            <LinkForm
              reload={() => setReloadLink((prev) => !prev)}
              setTab={() => setOpenLink(false)}
            />
          </div>
        </Modal>
        <Modal
          title={
            <div className={style.addProxyHeader}>
              <div className={style.proxyIconBox}>
                <span className={style.questionBox}>
                  <AiFillQuestionCircle color="#fff" />
                </span>
              </div>
              <div className={style.addTitle}>ADD VIDEO</div>
            </div>
          }
          centered
          footer={null}
          visible={openVideo}
          closable={true}
          onCancel={() => setOpenVideo(false)}
          bodyStyle={{ backgroundColor: "#9999992b" }}
        >
          <div style={{ width: "450px" }}>
            <VideoForm
              reload={() => setReloadVideo((prev) => !prev)}
              setTab={() => setOpenVideo(false)}
            />
          </div>
        </Modal>
      </section>
    </PrivateGenericLayout>
  );
};

const ResolutionItem = ({
  item,
  count,
  onClick,
  closeTemplate,
  keyword = "Resolution",
}) => {
  const handleClick = () => {
    if (closeTemplate) {
      closeTemplate();
    }
    onClick();
  };
  return (
    <div className={style.pollContainer} onClick={handleClick}>
      <div className={style.pollDesc}>
        <div className={style.pollDesc_header}>
          <span className={style.pollDesc_header_title}>
            {`${keyword} ${count}`}
          </span>
          <span className={style.pollDesc_header_icon}>
            <MdModeEdit color="#09974D" />
          </span>
        </div>
        <div className={style.pollDesc_body}>{item.title}</div>
        <div className={style.pollDate}>
          {" "}
          {moment(item.starts_at, "DD-MM-YYYY").format("DD MMMM YYYY")}
        </div>
      </div>
    </div>
  );
};

export const SearchIcon = ({ toggleInput }) => (
  <button
    className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
    onClick={toggleInput}
    style={{
      style: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "5px",
    }}
  >
    <FiSearch className={style.uploadIcon} color="#5c6574" />
  </button>
);
export const ElectionPicker = ({
  register,
  item,
  errors,
  data,
  idx,
  addNewElection,
  resolutionHandler,
  elections,
  objElection,
}) => {
  const [selectedValue, setSelectedValue] = useState("for");

  const onChangeHandler = (e) => {
    setSelectedValue(e.target.value);
    resolutionHandler(e, idx);
  };

  return (
    <div className={style.form__input_wrap}>
      <div className={style.form__input_inline}>
        <div className={`${style.form__input_box} ${style.form__input_box_1}`}>
          <label className={style.form__input_label} htmlFor="firstName">
            Election Position
          </label>
          <div className={style.input__date}>
            <input className={style.form__input} defaultValue={item.position} />
          </div>
        </div>
        <div className={`${style.form__input_box} ${style.form__input_box_2}`}>
          <label htmlFor="endDate" className={style.form__input_label}>
            Election Vote
          </label>
          <div className={style.input__date}>
            <select
              value={selectedValue}
              className={style.form__input}
              onChange={onChangeHandler}
            >
              <option value="">Select candidate</option>
              {item &&
                item.candidates.length > 0 &&
                item.candidates.map((item) => (
                  <option key={shortid.generate()} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {/* {elections && elections.length > 1 && data.length === idx + 1 && (
          <div
            className={`${style.form__input_box} ${style.form__input_box_3}`}
          >
            <Tooltip placement="right" title="Add Resolution">
              <button
                onClick={() => addNewElection(idx + 1)}
                type="button"
                style={{ backgroundColor: "#E5F4ED" }}
                className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
              >
                <FiPlus className={style.uploadIcon} color="#09974D" />
              </button>
            </Tooltip>
          </div>
        )} */}
      </div>
    </div>
  );
};
export const ResolutionPicker = ({
  register,
  item,
  errors,
  data,
  idx,
  addNewResolution,
  resolutionHandler,
  resolutions,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const onChangeHandler = (e) => {
    setSelectedValue(e.target.value);
    resolutionHandler(e);
  };
  return (
    <div className={style.form__input_wrap}>
      <div className={style.form__input_inline}>
        <div className={`${style.form__input_box} ${style.form__input_box_1}`}>
          <label className={style.form__input_label} htmlFor="firstName">
            Resolution
          </label>
          <div className={style.input__date}>
            <input className={style.form__input} defaultValue={item.title} />
          </div>
        </div>
        <div className={`${style.form__input_box} ${style.form__input_box_2}`}>
          <label htmlFor="endDate" className={style.form__input_label}>
            Resolution Vote
          </label>
          <div className={style.input__date}>
            <select
              className={style.form__input}
              onChange={onChangeHandler}
              value={selectedValue}
            >
              <option value="">Select vote</option>
              <option value="For">For</option>
              <option value="Against">Against</option>
              <option value="Abstain">Abstain</option>
            </select>
          </div>
        </div>
        {resolutions && resolutions.length > 1 && data.length === idx + 1 && (
          <div
            className={`${style.form__input_box} ${style.form__input_box_3}`}
          >
            <Tooltip placement="right" title="Add Resolution">
              <button
                onClick={addNewResolution}
                type="button"
                style={{ backgroundColor: "#E5F4ED" }}
                className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
              >
                <FiPlus className={style.uploadIcon} color="#09974D" />
              </button>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

const MemoElectionPicker = React.memo(ElectionPicker);
const MemoResolutionPicker = React.memo(ResolutionPicker);

const closeIcon = () => {
  return (
    <span
      className={style.closeModal}
      style={{
        position: "absolute",
        top: "50%",
        left: "-1550%",
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
  );
};

const Candidate = ({ removeInput, item, onChange, inputRef, disabled }) => {
  return (
    <div className={style.input_box_cand_wrap}>
      <input
        className={`${style.form__input} ${style.form__input_cand}`}
        type="text"
        placeholder="Seun Sokeye"
        name="actions"
        value={item.name}
        onChange={onChange}
        readOnly={!disabled}
      />
      <span className={style.input_box_trash} onClick={() => removeInput(item)}>
        <FiTrash size={20} />
      </span>
    </div>
  );
};

export default EventSummary;
