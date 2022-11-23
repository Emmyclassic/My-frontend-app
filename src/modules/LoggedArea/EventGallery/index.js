import { yupResolver } from "@hookform/resolvers/yup";
import {
  Checkbox,
  Dropdown,
  Menu,
  message,
  Modal,
  Spin,
  Table,
  Tooltip,
} from "antd";
import debounce from "debounce-promise";
import moment from "moment";
import { CSVLink } from "react-csv";
import {
  getListHandler,
  addAttendeeToListHandler,
  getSelectedListHandler,
  bulkRemoveAttendeeHandler,
} from "../../../api/attendeeHandler";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillAndroid, AiFillQuestionCircle } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { FiPlus, FiSend } from "react-icons/fi";
import {
  MdClose,
  MdEmail,
  MdFileDownload,
  MdFileUpload,
  MdInsertChart,
  MdKeyboardArrowLeft,
  MdLabel,
  MdSend,
} from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import shortid from "shortid";
import Swal from "sweetalert2";
// import { getAttendees } from "../../../api/attendeeHandler";
import {
  eventAnalytics,
  fetchDonation,
  fetchEvent,
  publishEvent,
} from "../../../api/eventHandler";
import {
  getElectionsHandler,
  getResolutionsHandler,
  pollAnalytics,
  getElectionAnalytic,
  getElectionAnalyticPdf,
  getElectionAnalyticExcel,
} from "../../../api/resolutionHandler";
import { getResources, getSpeakers } from "../../../api/resourceHandler";
import {
  sendBulkSMS,
  sendSingleSMS,
  emailReport,
  sendEmailInviteToAttendee,
  smsInvite,
} from "../../../api/smsHandler";
import { fetchEventTickets } from "../../../api/ticketHandler";
import AlertResponse from "../../../Auth/AuthModalForm/AlertResponse";
import CircularAvatar from "../../../components/Avatar/CircularAvatar";
import FormInput from "../../../components/FormInput";
import InviteLink from "../../../components/InviteLink";
import LeftDrawerModal from "../../../components/LeftDrawerModal";
import PrivateGenericLayout from "../../../components/PrivateGenericLayout/PrivateGenericLayout";
import DataTable from "../../../components/Tables";
import { loadChat } from "../../../utils/loadScript";
import { useFileUpload } from "../../../hooks/useFileUpload";
import { addAttendeeSchema } from "../../../utils/Validation/addAttendeeValidation";
import { addProxyValidation } from "../../../utils/Validation/addProxyValidation";
import AttendeeForm from "../CreateEvent/Attendee/Form/Attendee";
import {
  getAttendeeAction,
  getProxyAction,
  postAttendeeAction,
  postProxyAction,
  removeProxyAction,
  // removeAttendeeAction,
} from "../CreateEvent/Attendee/state/action";
import {
  resetAddAttendee,
  resetAddProxy,
} from "../CreateEvent/Attendee/state/attendeeAction";
import AgmLink from "../CreateEvent/Resources/AgmLink";
import DocumentList from "../CreateEvent/Resources/DocumentList";
import VideoList from "../CreateEvent/Resources/VideoList";
import {
  columnsEventDonation,
  columnsEventTicket,
  columnsProxy,
  editColumns,
} from "../CreateEvent/Summary/constant";
import style from "./index.module.scss";
import "./index.scss";
import resolver from "../../../utils/promiseWrapper";
import { paymentAnalytic } from "../../../api/payoutHandler";
import { toast } from "react-toastify";
import ElectionObserver from "./Election0Observer";
import ObserverModal from "./Modals/ObserverModal";

const obj = [];
const objElection = [];

const customStyles = {
  control: (base) => ({
    ...base,
    height: 40,
    minHeight: 35,
  }),
};

const paymentDropdownList = () => {
  return (
    <Menu className={style.menu_container}>
      <Menu.Item key="1" className={style.menu_item}>
        <span>Download Payment Template</span>
      </Menu.Item>
      <Menu.Item key="1" className={style.menu_item}>
        <span>Download Payment Report</span>
      </Menu.Item>
    </Menu>
  );
};

const EventGallery = () => {
  const history = useHistory();
  // const [selectionType] = useState("checkbox");
  const [lists, setLists] = useState([]);
  const [addProxyVisible, setAddProxyVisible] = useState(false);
  const dispatch = useDispatch();
  const allProxies = useSelector((state) => state.proxies);
  const proxy = useSelector((state) => state.proxyReducer);
  const allAttendees = useSelector((state) => state.attendees);
  const [openObserverModal, setOpenObserverModal] = useState(false);
  const [documents, setDocuments] = useState();
  const [searchPhrase] = useState("");
  const [eventDetail, setEventDetail] = useState();
  const [joiningEvent, setJoiningEvent] = useState(false);
  const [reloadAttendee, setReloadAttendee] = useState(false);
  const { id } = useParams();
  const [sendReportVisible, setSendReportVisible] = useState(false);
  const [votersRight, setVotersRight] = useState();
  const [videos, setVideos] = useState();
  const [links, setLinks] = useState();
  const [, setVideoError] = useState();
  const [, setSpeakerError] = useState();
  const [, setLinkError] = useState();
  const [reloadEvent, setReloadEvent] = useState(false);
  const [tickets, setTickets] = useState();
  const [donations, setDonations] = useState();
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [reloadResolution] = useState(false);
  const [addAttendeeVisible, setAddAttendeeVisible] = useState(false);
  const [sendSMSVisible, setSendSMSVisible] = useState(false);
  const [sampleSMSVisible, setSampleSMSVisible] = useState(false);
  const [smsPreviewVisible, setSmsPreviewVisible] = useState(false);
  // const [attendeeList, setAttendeeList] = useState([]);
  const [, setDocumentError] = useState();
  const [speakers, setSpeakers] = useState();
  const [resolutions, setResolutions] = useState();
  const [elections, setElections] = useState();
  const [selectedValue] = useState("");
  const fileUploader = useFileUpload();
  const [attendeeModal, setAttendeeModal] = useState(false);
  const [resolutionSelector, setResolutionSelector] = useState([]);
  const [electionSelector, setElectionSelector] = useState([]);
  const [setupProxy] = useState(false);
  const [reloadElection, setReloadElection] = useState(false);
  const { name, email } = useSelector((state) => state.profile);
  const [attendeeType, setAttendeeType] = useState("attendee");
  const [smsMessage, setSmsMessage] = useState("");
  const [sendingSMS, setSendingSMS] = useState(false);
  const [sampleSMSNumber, setSampleSMSNumber] = useState("");
  const [mobilePreview, setMobilePreview] = useState("apple");
  const [proxyVotersRight, setProxyVotersRight] = useState();
  const [selectedProxies, setSelectedProxies] = useState();
  const [selectedAttendees, setSelectedAttendees] = useState();
  const [reloadList, setReloadList] = useState(false);
  const [analyticData, setAnalyticData] = useState();
  const [pollAnalyticData, setPollAnalyticData] = useState();
  const [selectedListForSms, setSelectedListForSms] = useState();
  const [emailReportData, setEmailReportData] = useState();
  const [paymentDataAnalyic, setPaymentDataAnalytic] = useState();
  const [electionAnalytic, setElectionAnalytics] = useState();

  const formatPhoneNumber = (number) => {
    if (number.length !== 11) {
      throw new Error("Invalid phone number");
    }
    const numString = number.split("");
    numString[0] = "+234";
    return numString.join("");
  };

  const getAnalyticHandler = async (id) => {
    const [result] = await resolver(eventAnalytics(id));
    if (result) {
      const analyticCount = result.data.data;
      console.log("analyticCount", analyticCount);
      setAnalyticData(analyticCount);
    }
  };

  const fetchElectionAnalytic = async (id) => {
    const [result] = await resolver(getElectionAnalytic(id));
    if (result) {
      const analyticCount = result.data;
      console.log("analyticCount", analyticCount);
      setElectionAnalytics(analyticCount);
    }
  };

  useEffect(() => {
    fetchElectionAnalytic(id);
  }, [id]);

  const smsInviteHandler = async () => {
    const [result, error] = await resolver(smsInvite(eventDetail.id));
    console.log({ error });
    if (result) {
      toast("Invite sent successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "colored",
      });
    } else {
      toast("Something went wrong", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
    }
  };

  const inviteAttendeeHandler = async () => {
    const req = {
      notification_type: "Invite",
      campaign_list_id: eventDetail?.campaign_list_id ?? "38387cfdf8",
      event_title: eventDetail.title,
      event_short_name: eventDetail.short_name,
    };
    const [result, error] = await resolver(sendEmailInviteToAttendee(id, req));

    if (result) {
      toast("Invite sent successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "colored",
      });
    } else {
      toast("Something went wrong", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
    }
    console.log({ result: result.data });
    console.log({ error });
  };

  const getPaymentAnalyticHandler = async (id) => {
    const [result, error] = await resolver(paymentAnalytic(id));
    console.log({ result: result });

    setPaymentDataAnalytic(result.data.data);
    console.log({ error });
  };
  const getPollAnalyticHandler = async () => {
    const [result] = await resolver(pollAnalytics(id));
    if (result) {
      const analyticCount = result.data.data;
      setPollAnalyticData(analyticCount);
    }
  };

  useEffect(() => {
    console.log({ paymentDataAnalyic });
  });

  useEffect(() => {
    if (pollAnalyticData) {
      setAnalyticData({
        ...analyticData,
        ...pollAnalyticData,
      });
    }
  }, [pollAnalyticData]);

  const handleSelectedAttendees = async (list) => {
    try {
      const {
        data: { data },
      } = await getSelectedListHandler(list.id);
      const transformData = data.attendees.map((item) => {
        console.log("item", item);
        if (item.phone_number[0] === "0") {
          item.phone_number = item.phone_number.slice(1);
        }
        return `+234${item.phone_number}`;
      });
      setSelectedListForSms(transformData);
    } catch (ex) {
      console.log("exxxxx", ex);
    }
  };

  const handleSendSMS = async () => {
    // cons
    try {
      setSendingSMS(true);
      if (selectedListForSms.length === 0) {
        Swal.fire("oops!!", "Attendee list cannot be empty", "error");
        return;
      }

      const payload = {
        reciever: selectedListForSms,
        body: smsMessage,
      };
      const response = await sendBulkSMS(payload);
      if (response.status === 200) {
        history.push("/Campaign/Success");
        setSmsMessage("");
        setSampleSMSNumber("");
        setSendingSMS(false);
      }
    } catch (error) {
      console.log("shshshhhs", error);
      Swal.fire("Closed!", "Something went wrong, SMS was not sent", "error");
      setSendSMSVisible(false);
      setSendingSMS(false);
    }
  };

  const handleSendSampleSMS = async () => {
    try {
      setSendingSMS(true);
      const sampleNumberArr = sampleSMSNumber.trim().split(",");
      const sampleNumbers = sampleNumberArr.filter(
        (item) => item && !isNaN(item)
      );

      console.log("sampleNumbers", sampleNumbers);
      const transformSampleNumber = sampleNumbers.map((sampleNumber) => {
        return sendSingleSMS({
          reciever: formatPhoneNumber(sampleNumber.trim()),
          body: smsMessage,
        });
      });

      const response = await Promise.all(transformSampleNumber);
      console.log("numbers", response);
      if (response.length) {
        history.push("/Campaign/Success");
        setSmsMessage("");
        setSampleSMSNumber("");
        setSendingSMS(false);
        setSmsPreviewVisible(true);
      }
    } catch (error) {
      console.log("err sent", error);
      Swal.fire("Closed!", "Something went wrong, SMS was not sent", "error");
      setSampleSMSVisible(false);
      setSmsPreviewVisible(true);
      setSendingSMS(false);
      setSampleSMSNumber("");
    }
  };

  const bulkDeleteAttendee = () => {
    console.log({ selectedAttendees });
    Swal.fire({
      title: "Delete attendee",
      text: "Selected attendees will be delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#da291c",
      cancelButtonColor: "#eddcd2",
      confirmButtonText: "Delete",
      customClass: {
        icon: "swal-icon",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const [result] = await resolver(
          bulkRemoveAttendeeHandler({ ids: selectedAttendees }, id)
        );
        if (result) {
          dispatch(getAttendeeAction(searchPhrase, id, ""));
        }
      }
    });
  };

  const bulkDeleteProxy = () => {
    Swal.fire({
      title: "Delete proxy",
      text: "Selected proxies will be delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#da291c",
      cancelButtonColor: "#eddcd2",
      confirmButtonText: "Delete",
      customClass: {
        icon: "swal-icon",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeProxyAction(selectedProxies));
      }
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(
      attendeeType === "proxy" ? addProxyValidation : addAttendeeSchema
    ),
  });
  const emailDropdownList = () => {
    return (
      <Menu className={style.menu_container}>
        <Menu.Item
          key="1"
          className={style.menu_item}
          onClick={() => setSendReportVisible(true)}
        >
          <span>Send Report</span>
        </Menu.Item>
      </Menu>
    );
  };

  const downloadElectionPdf = async () => {
    message.loading("downloading...");
    const [result, error] = await resolver(getElectionAnalyticPdf(id));
    console.log("successResponse", result.data, error);
    const url = window.URL.createObjectURL(new Blob([result.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "electionReport.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    message.success("Download Success");
  };

  const downloadElectionExcel = async () => {
    message.loading("downloading...");
    const [result, error] = await resolver(getElectionAnalyticExcel(id));
    console.log("successResponse", result.data, error);
    const url = window.URL.createObjectURL(new Blob([result.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "electionReport.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    message.success("Download Success");
  };

  const electionDropdownList = () => {
    return (
      <Menu className={style.menu_container}>
        <Menu.Item
          key="1"
          className={style.menu_item}
          onClick={() => downloadElectionPdf()}
        >
          <span>Send Report as Pdf</span>
        </Menu.Item>
        <Menu.Item
          key="1"
          className={style.menu_item}
          onClick={() => downloadElectionExcel()}
        >
          <span>Send Report as Excel</span>
        </Menu.Item>
      </Menu>
    );
  };

  const emailReportHandler = async (campaignId) => {
    const [result, error] = await resolver(emailReport());
    console.log("email report", result);

    if (result) {
      setEmailReportData(result.data.data);
    }

    if (error) {
      console.log("error", error);
    }
  };

  const getEventById = async (id) => {
    try {
      setLoadingEvent(true);
      const {
        data: { data },
      } = await fetchEvent(id);
      setEventDetail(data);
      console.log("hsshhshshshshs", data);
      setLoadingEvent(false);
    } catch (err) {
      setLoadingEvent(false);
      Swal.fire("Closed!", "Something went wrong", "error");
    }
  };

  useEffect(() => {
    if (eventDetail) {
      emailReportHandler(eventDetail.campaign_list_id);
    }
  }, [eventDetail]);

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };
  useEffect(() => {
    loadChat();
    const chatIcon = document.getElementById("fc_frame");
    if (chatIcon) {
      chatIcon.style.display = "block";
    }

    return () => {
      const script = document.getElementById("Freshdesk Messaging-js-sdk");

      if (script) script.remove();
      if (chatIcon) {
        chatIcon.style.display = "none";
      }
    };
  }, [dispatch]);

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };
  const onCloseAttendee = (e) => {
    dispatch(resetAddAttendee);
  };

  const quorumNumberHandle = (val) => {
    const newVal = val.target.value.replace(/,/g, "");
    setVotersRight(newVal);
  };

  const quorumProxyNumberHandle = (val) => {
    const newVal = val.target.value.replace(/,/g, "");
    setProxyVotersRight(newVal);
  };

  useEffect(() => {
    getEventById(id);
    getAnalyticHandler(id);
    getPollAnalyticHandler(id);
    getPaymentAnalyticHandler(id);
    // getAttendeeListById(id);
  }, [id, reloadEvent]);

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
  useEffect(() => {
    fetchTicketHandler(id);
    fetchDonationHandler();
  }, []);

  useEffect(() => {
    dispatch(getAttendeeAction(searchPhrase, id, ""));
    dispatch(getProxyAction(searchPhrase, id));
  }, [reloadAttendee]);

  const dbounce = useCallback(
    debounce((searchPhrase) => dispatch(getAttendeeAction(searchPhrase)), 500),
    []
  );

  const dbounceProxy = useCallback(
    debounce((searchPhrase) => dispatch(getProxyAction(searchPhrase)), 500),
    []
  );
  const onSubmitAttendee = (data) => {
    const attendeeList = [
      {
        name: data.participantName,
        email: data.email,
        account_number: data.accountNumber,
        phone_number: data.phoneNumber,
        vote_rights: Number(votersRight),
        attendee_type: "observer",
      },
    ];

    const payload = {
      attendees: attendeeList,
      eventId: id,
    };
    console.log({ payload });
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

  const onSubmitSendSMS = (data) => {
    console.log({ data });
  };

  const fetchResolutions = async (eventId) => {
    try {
      const {
        data: { data },
      } = await getResolutionsHandler(eventId);
      setResolutions(data);
    } catch (ex) {}
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
    fetchResolutions(id);
  }, [reloadResolution]);
  useEffect(() => {
    fetchElections(id);
  }, [reloadElection]);

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

  const addNewElectionCb = useCallback(addNewElection, [electionSelector]);

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

  const handleSearch = (phrase) => {
    dbounce(phrase);
  };

  const handleProxySearch = (phrase) => {
    dbounceProxy(phrase);
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

  const pushlishHandler = (payload) => {
    Swal.fire({
      title:
        eventDetail?.is_published === 0
          ? "Publish Events?"
          : "UnPublish Events?",
      text:
        eventDetail.is_published === 0
          ? "Event will be pushlish"
          : "Event will be unpushlish",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#da291c",
      cancelButtonColor: "#eddcd2",
      confirmButtonText:
        eventDetail?.is_published === 0 ? "Publish" : "Unpublish",
      customClass: {
        icon: "swal-icon",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        publishEvent(payload, id)
          .then((res) => {
            const statusMsg =
              eventDetail?.is_published === 0
                ? "Event Published."
                : "Event Unpublished";
            setReloadEvent((prev) => !prev);
            Swal.fire(
              eventDetail?.is_published === 0 ? "Published" : "Unpublished",
              statusMsg,
              "success"
            );
          })
          .catch(() => {
            Swal.fire("Closed!", "Something went wrong", "error");
          });
      }
    });
  };

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
  const fetchVideos = async (filter) => {
    try {
      const {
        data: { data },
      } = await getResources(filter, id);

      setVideos(data);
    } catch (err) {
      setVideoError("Something went wrong", err);
    }
  };
  useEffect(() => {
    fetchLinks("link");
    fetchDocuments("document");
    fetchVideos("video");
  }, []);

  console.log("prodyx=>", errors, attendeeType);

  const onSubmit = (data) => {
    console.log("proxyData =>", data, attendeeType);
    const attendeeList = [
      {
        participant_name: data.participantName,
        account_number: data.accountNumber,
        phone_number: data.phoneNumber,
        voting_right: Number(proxyVotersRight),
        nominated_proxy_name: data.nominatedProxy,
        setup_proxy_form: setupProxy,
        resolutions: obj,
        elections: objElection,
      },
    ];

    dispatch(postProxyAction({ attendees: attendeeList, eventId: id }));
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
    setProxyVotersRight(0);
  };

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
  useEffect(() => {
    if (resolutions && resolutions.length) {
      setResolutionSelector(resolutions);
    }
  }, [resolutions?.length]);
  useEffect(() => {
    if (elections && elections.length) {
      setElectionSelector(elections);
    }
  }, [elections?.length]);
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

    // setResolutionList(obj);
  };

  const dispenseCallback = React.useCallback(resolutionHandler, []);

  useEffect(() => {
    if (proxy && proxy.data) {
      setAddProxyVisible(false);
      console.log("dssssds", proxy?.data);
      setReloadElection((prev) => !prev);
      setTimeout(() => {
        dispatch(resetAddProxy);
      }, 500);
    }
  }, [proxy]);
  const onClose = (e) => {
    dispatch(resetAddProxy);
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

    const payload = {
      attendees: attnedeeList,
    };

    dispatch(postAttendeeAction(payload));
  };

  const liveStreamFunc = async () => {
    try {
      localStorage.setItem(
        "eventInfo",
        JSON.stringify({
          ...eventDetail,
          livestream: eventDetail.livestream,
          role: 1,
          name,
          email,
          leaveUrl: `/event/${eventDetail.id}`,
        })
      );

      const win = window.open("/Livestream", "_blank");
      win.focus();
    } catch (err) {
      setJoiningEvent(false);
      console.log("err", err);
      Swal.fire("Closed!", "Something went wrong", "error");
    }
  };

  const joinEventHandler = async (id) => {
    try {
      localStorage.setItem(
        "eventInfo",
        JSON.stringify({
          ...eventDetail,
          attendee: allAttendees?.attendees[0] ?? null,
          role: 1,
          name,
          email,
          leaveUrl: `${window.location.origin}/event/${eventDetail.id}`,
        })
      );
      const win = window.open("/Meeting", "_blank");
      win.focus();
      // history.push(
      //   "/Meeting",
      //   JSON.stringify({
      //     ...eventDetail,
      //     attendee: allAttendees?.attendees[0] ?? null,
      //     role: 1,
      //     name,
      //     email,
      //     leaveUrl: `${window.location.origin}/event/${eventDetail.id}`,
      //   })
      // );

      setJoiningEvent(false);
    } catch (err) {
      setJoiningEvent(false);
      console.log("err", err);
      Swal.fire("Closed!", "Something went wrong", "error");
    }
  };
  const messageDropdownList = () => {
    return (
      <Menu className={style.menu_container}>
        <Menu.Item
          key="1"
          className={style.menu_item}
          onClick={() => setSmsPreviewVisible(true)}
        >
          <span>Send SMS to Attendees</span>
        </Menu.Item>
        <Menu.Item
          key="1"
          className={style.menu_item}
          onClick={() => history.push("/CampaignEmail")}
        >
          <span>Send Email to Attendees</span>
        </Menu.Item>
      </Menu>
    );
  };

  const inviteDropdownList = () => {
    return (
      <Menu className={style.menu_container}>
        <Menu.Item key="1" className={style.menu_item}>
          <span onClick={inviteAttendeeHandler}>Email Event Invite</span>
        </Menu.Item>
        <Menu.Item key="2" className={style.menu_item}>
          <span onClick={smsInviteHandler}>Sms Event Invite</span>
        </Menu.Item>
      </Menu>
    );
  };

  const selectedProxyId = (ids) => {
    setSelectedProxies(ids.map((item) => item.id));
  };

  const selectedAttndeeId = (ids) => {
    setSelectedAttendees(ids.map((item) => item.id));
  };

  console.log("setSelectedAttendees", selectedAttendees);

  const fetchList = async (id) => {
    try {
      const {
        data: { data },
      } = await getListHandler(id);
      setLists(data);
    } catch (ex) {}
  };

  useEffect(() => {
    fetchList(id);
  }, [reloadList]);

  const handleElectionCenterRoute = () => {
    localStorage.setItem("hostId", id);
    // history.push({
    //   pathname: ,
    //   state: JSON.stringify({
    //     host: "host",
    //     eventId: `${id}`,
    //   }),
    // });
  };
  const adddAttendeeToListHandler = (item) => {
    if (!selectedAttendees || !selectedAttendees.length) {
      Swal.fire("OOps", "Please select an attendee", "warning");
      return;
    }
    Swal.fire({
      title: `Add attendee to ${item.name}`,

      text: `Selected attendees will be added to ${item.name}`,

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#da291c",
      cancelButtonColor: "#eddcd2",
      confirmButtonText: "Add to List",

      customClass: {
        icon: "swal-icon",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          attendees: selectedAttendees,
        };
        addAttendeeToListHandler(item.id, payload)
          .then((res) => {
            setReloadEvent((prev) => !prev);
            setSelectedAttendees();
            Swal.fire("Success", "Attendee added successfully", "success");
          })
          .catch(() => {
            Swal.fire("Closed!", "Something went wrong", "error");
          });
      }
    });
  };

  const dropdownList = () => {
    return (
      <Menu className={style.menu_container}>
        <Menu.Item key="1" className={style.menu_item}>
          <CSVLink
            headers={[
              {
                label: "Turnout",
                key: "attendees_turnOut",
              },
              {
                label: "Attendee Invited",
                key: "attendees_invited",
              },

              {
                label: "Poll",
                key: "poll_response_count",
              },
              {
                label: "Question",
                key: "questions",
              },
            ]}
            data={analyticData ? [analyticData] : []}
            filename="eventAnalytic.csv"
            target="_blank"
          >
            <span>Download Event Analytics</span>
          </CSVLink>
        </Menu.Item>
      </Menu>
    );
  };

  const dropdownCampList = () => {
    return (
      <Menu className={style.menu_container}>
        <Menu.Item key="1" className={style.menu_item}>
          <CSVLink
            headers={[
              {
                label: "Email Sent",
                key: "emails_sent",
              },
              {
                label: "Links clicked",
                key: "links_clicked",
              },
              {
                label: "emails Opened",
                key: "emails_opened",
              },

              {
                label: "Email Bounce rate",
                key: "bounce_rate",
              },
            ]}
            data={emailReportData ? [emailReportData] : []}
            filename="eventAnalytic.csv"
            target="_blank"
          >
            <span>Download Campaign Report</span>
          </CSVLink>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <PrivateGenericLayout
      leftNav={
        <div className={style.containerNav_left}>
          <span className={style.containerNav_iconBox}>
            <MdKeyboardArrowLeft size={20} onClick={() => history.goBack()} />
          </span>
          {loadingEvent && (
            <div style={{ width: "500px", marginLeft: "10px" }}>
              <Skeleton width={"100%"} />
              <Skeleton width={"30%"} />
            </div>
          )}

          {loadingEvent === false && eventDetail && (
            <div className={style.navContainer}>
              <span className={style.containerStyle_title}>
                {eventDetail.title}
              </span>
              <div className={style.containerSubtext}>
                Begins &nbsp;
                {moment(eventDetail.start_date).format(
                  "dddd, Do MMMM, YYYY h:mm a"
                )}
              </div>
              <div className={style.containerSubtext}>
                Venue Type:&nbsp; {eventDetail.attendee_mode}
                {eventDetail.attendee_mode !== "Physical"
                  ? `(${eventDetail.attendee_mode_type})`
                  : ""}
              </div>
            </div>
          )}
        </div>
      }
    >
      <section className={style.main}>
        {/* <div id="zmmtg-root"></div> */}
        <div className={style.mainHeader}>
          <div className={style.mainHeader_left}>
            <div className={style.mainHeader_left__border}>
              <Link to={`/EventSummary/${id}`} className={style.editDetail}>
                Edit Event Details
              </Link>
            </div>
            <Dropdown
              overlay={messageDropdownList}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Link to="#" className={`${style.editDetail} ${style.ml_1}`}>
                View Notice & Campaign
              </Link>
            </Dropdown>
            <Dropdown
              overlay={inviteDropdownList}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Link to="#" className={`${style.editDetail} ${style.ml_1}`}>
                Send Invite
              </Link>
            </Dropdown>
          </div>
          {loadingEvent === false && eventDetail && (
            <div className={style.mainHeader_right}>
              {Number(eventDetail.is_published) === 0 ? (
                <button
                  onClick={() => pushlishHandler({ status: 1 })}
                  className={`${style.unPublishEvent} ${style.unPublishEvent_notice}`}
                >
                  Publish Event
                </button>
              ) : (
                <button
                  onClick={() => pushlishHandler({ status: 0 })}
                  className={`${style.unPublishEvent} ${style.unPublishEvent_notice}`}
                >
                  Unpublish Event
                </button>
              )}

              {loadingEvent === false &&
                eventDetail &&
                eventDetail.attendee_mode !== "Physical" && (
                  <button
                    // onClick={() => history.push("/Host/Meeting")}
                    onClick={() =>
                      eventDetail.attendee_mode_type === "Conference"
                        ? joinEventHandler(id)
                        : liveStreamFunc()
                    }
                    className={`${style.unPublishEvent} ${style.unPublishEvent_event}`}
                  >
                    {joiningEvent ? (
                      <Spin size="large" color="#fff" />
                    ) : (
                      "Join Event"
                    )}
                  </button>
                )}
            </div>
          )}
        </div>
        <div className={style.subHeader}>
          {eventDetail && eventDetail.is_published !== 0 && (
            <div className={style.subContainer}>
              <div className={style.subHeader_list}>
                <div className={style.subHeader_listHeader}>
                  <span className={style.subHeader_listHeader_left}>
                    Event link
                  </span>
                  <span className={style.subHeader_listHeader_right}>
                    <MdLabel size={18} />
                  </span>
                </div>
                <div className={style.eventLink_desc}>
                  Use the link below to invite guests to your event
                </div>
                <div className={style.eventLinkWrap}>
                  <InviteLink
                    buttonStyle={{ backgroundColor: "#09974D" }}
                    link={`${window.location.origin}/event/concert/overview/${id}`}
                  />
                </div>
              </div>
              <div className={style.subHeader_list}>
                <div className={style.subHeader_listHeader}>
                  <span className={style.subHeader_listHeader_left}>
                    Event link
                  </span>
                  <span className={style.subHeader_listHeader_right}>
                    <MdLabel size={18} />
                  </span>
                </div>
                <div className={style.eventLink_desc}>
                  Use the link below to invite guests to your event
                </div>
                <div className={style.eventLinkWrap}>
                  <InviteLink
                    buttonStyle={{ backgroundColor: "#09974D" }}
                    link={`${window.location.origin}/event/concert/overview/${id}`}
                  />
                </div>
                <Link to="#" className={style.eventStream}>
                  Stream event via Social media
                </Link>
              </div>
            </div>
          )}
          <div className={style.analytics}>
            <div className={style.analytics_header}>
              <div className={style.analytics_header_left}>Event Analytics</div>
              <div className={style.analytics_header_right}>
                <Dropdown
                  overlay={emailDropdownList}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <span className={style.analytics_iconBox}>
                    <MdSend size={18} className={style.uploadIcon} />
                  </span>
                </Dropdown>

                <Tooltip placement="right" title="Download Report">
                  <Dropdown
                    overlay={dropdownList}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <span className={style.analytics_iconBox}>
                      <MdFileDownload size={18} className={style.uploadIcon} />
                    </span>
                  </Dropdown>
                </Tooltip>
              </div>
            </div>
            <div className={style.analytics_content}>
              <div className={style.analytic_content_header}>
                <div className={style.analytic_content_header_left}>
                  Analytics
                </div>
                <span className={style.subIconBox}>
                  <MdInsertChart size={17} />
                </span>
              </div>
              <div className={style.analytics_body}>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>Turnout</h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>
                      {analyticData?.attendees_turnOut ?? 0}
                    </span>
                    <span className={style.analytics_title}>
                      attendees accepted
                    </span>
                  </div>
                </div>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>Poll</h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>
                      {pollAnalyticData?.poll_response_count ?? 0}
                    </span>
                    <span className={style.analytics_title}>
                      poll responses
                    </span>
                  </div>
                </div>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>Questions</h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>
                      {analyticData?.questions ?? 0}
                    </span>
                    <span className={style.analytics_title}>
                      questions responses
                    </span>
                  </div>
                </div>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>Invitee</h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>
                      {analyticData?.attendees_invited ?? 0}
                    </span>
                    <span className={style.analytics_title}>
                      attendees invited
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.analytics}>
            <div className={style.analytics_header}>
              <div className={style.analytics_header_left}>
                Email Campaign Report Analytics
              </div>
              <div className={style.analytics_header_right}>
                <Tooltip placement="right" title="Download Report">
                  <Dropdown
                    overlay={emailDropdownList}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <span className={style.analytics_iconBox}>
                      <MdSend size={18} className={style.uploadIcon} />
                    </span>
                  </Dropdown>
                </Tooltip>
                <Tooltip placement="right" title="Download Report">
                  <Dropdown
                    overlay={dropdownCampList}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <span className={style.analytics_iconBox}>
                      <MdFileDownload size={18} className={style.uploadIcon} />
                    </span>
                  </Dropdown>
                </Tooltip>
              </div>
            </div>
            <div className={style.analytics_content}>
              <div className={style.analytic_content_header}>
                <div className={style.analytic_content_header_left}>
                  Analytics
                </div>
                <span className={style.subIconBox}>
                  <MdInsertChart size={17} />
                </span>
              </div>
              <div className={style.analytics_body}>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>Emails Sent</h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>
                      {emailReportData?.emails_sent ?? 0}
                    </span>
                    <span className={style.analytics_title}>Emails</span>
                  </div>
                </div>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>Emails Opened</h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>
                      {emailReportData?.emails_opened ?? 0}
                    </span>
                    <span className={style.analytics_title}>Emails</span>
                  </div>
                </div>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>Links clicked</h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>
                      {emailReportData?.links_clicked ?? 0}
                    </span>
                    <span className={style.analytics_title}>Click</span>
                  </div>
                </div>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>
                    Email Bounce rate
                  </h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>
                      {emailReportData?.bounce_rate}
                    </span>
                    <span className={style.analytics_title}>Email Bounce</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.analytics}>
            <div className={style.analytics_header}>
              <div className={style.analytics_header_left}>
                SMS Report Analytics
              </div>
              <div className={style.analytics_header_right}>
                <Tooltip placement="right" title="Download Report">
                  <Dropdown
                    overlay={emailDropdownList}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <span className={style.analytics_iconBox}>
                      <MdSend size={18} className={style.uploadIcon} />
                    </span>
                  </Dropdown>
                </Tooltip>
                <Tooltip placement="right" title="Download Report">
                  <Dropdown
                    overlay={dropdownList}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <span className={style.analytics_iconBox}>
                      <MdFileDownload size={18} className={style.uploadIcon} />
                    </span>
                  </Dropdown>
                </Tooltip>
              </div>
            </div>
            <div className={style.analytics_content}>
              <div className={style.analytic_content_header}>
                <div className={style.analytic_content_header_left}>
                  Analytics
                </div>
                <span className={style.subIconBox}>
                  <MdInsertChart size={17} />
                </span>
              </div>
              <div className={style.analytics_body}>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>SMS Sent</h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>400</span>
                    <span className={style.analytics_title}>SMS</span>
                  </div>
                </div>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>
                    SMS Links clicked
                  </h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>100</span>
                    <span className={style.analytics_title}>
                      clicks <span style={{ color: "#19967D" }}>(25%)</span>
                    </span>
                  </div>
                </div>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>Links clicked</h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>90</span>
                    <span className={style.analytics_title}>
                      Click <span style={{ color: "#19967D" }}>(25%)</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.analytics}>
            <div className={style.analytics_header}>
              <div className={style.analytics_header_left}>
                Election Analytics
              </div>
              <div className={style.analytics_header_right}>
                <button>
                  <Link
                    onClick={handleElectionCenterRoute}
                    to={`/election-center/${id}`}
                  >
                    Election Center
                  </Link>
                </button>

                <Tooltip placement="right" title="Download Report">
                  <Dropdown
                    overlay={electionDropdownList}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <span className={style.analytics_iconBox}>
                      <MdFileDownload size={18} className={style.uploadIcon} />
                    </span>
                  </Dropdown>
                </Tooltip>
              </div>
            </div>
            <div className={style.analytics_content}>
              <div className={style.analytic_content_header}>
                <div className={style.analytic_content_header_left}>
                  Analytics
                </div>
                <span className={style.subIconBox}>
                  <MdInsertChart size={17} />
                </span>
              </div>
              <div className={style.analytics_body}>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>
                    Total Election
                  </h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>
                      {electionAnalytic?.elections ?? 0}
                    </span>
                    <span className={style.analytics_title}>Elections</span>
                  </div>
                </div>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>Voters</h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>
                      {electionAnalytic?.voters ?? 0}
                    </span>
                    <span className={style.analytics_title}>Voters</span>
                  </div>
                </div>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>Votes</h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>
                      {electionAnalytic?.votes ?? 0}
                    </span>
                    <span className={style.analytics_title}>Votes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.analytics}>
            <div className={style.analytics_header}>
              <div className={style.analytics_header_left}>Payment</div>
              <div className={style.analytics_header_right}>
                <Tooltip placement="right" title="Download Report">
                  <Dropdown
                    overlay={emailDropdownList}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <span className={style.analytics_iconBox}>
                      <MdSend size={18} className={style.uploadIcon} />
                    </span>
                  </Dropdown>
                </Tooltip>
                <Tooltip placement="right" title="Download Report">
                  <Dropdown
                    overlay={paymentDropdownList}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <span className={style.analytics_iconBox}>
                      <MdFileDownload size={18} className={style.uploadIcon} />
                    </span>
                  </Dropdown>
                </Tooltip>
                <Tooltip placement="right" title="Upload payment list">
                  <span className={style.analytics_iconBox}>
                    <MdFileUpload size={18} className={style.uploadIcon} />
                  </span>
                </Tooltip>
              </div>
            </div>
            <div className={style.analytics_content}>
              <div className={style.analytic_content_header}>
                <div className={style.analytic_content_header_left}>
                  Dividend payment
                </div>
                <span className={style.subIconBox}>
                  <MdInsertChart size={17} />
                </span>
              </div>
              <div className={style.analytics_body}>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>
                    Dividend payable
                  </h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>
                      N{paymentDataAnalyic?.dividend_payable ?? 0}
                    </span>
                  </div>
                </div>
                <div className={style.analytics_body_list}>
                  <h3 className={style.analytics_body_header}>Investors</h3>
                  <div className={style.countContainer}>
                    <span className={style.analytics_count}>
                      {paymentDataAnalyic?.investors ?? 0}
                    </span>
                  </div>
                </div>
                <div className={style.analytics_body_list}>
                  <button className={style.newList}>Make Payment</button>
                </div>
              </div>
            </div>
          </div>
          {eventDetail &&
            eventDetail.event_type.name !== "Annual-General-Meetings" && (
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
                    columns={columnsEventDonation}
                    dataSource={donations}
                    rowClassName="customTableRow"
                  />
                </div>
              </>
            )}

          <div style={{ marginBottom: "1rem", marginTop: "2rem" }}>
            <DataTable
              customTitle={{
                fontSize: "2rem",
                fontFamily: "ttnorms",
                fontWeight: 600,
              }}
              adddAttendeeToList={adddAttendeeToListHandler}
              lists={lists}
              reloadList={() => setReloadList((prev) => !prev)}
              eventId={id}
              createListHandler={() => {}}
              bulkDeleteHandler={bulkDeleteAttendee}
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
              selectedRowHandler={(id) => selectedAttndeeId(id)}
              columns={editColumns}
              showFilter={true}
              showIcon={true}
              addAttendee={() => setAttendeeModal(true)}
              handleSearch={handleSearch}
              handleFileUpload={handleFileUpload}
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
          {eventDetail &&
            eventDetail.event_type.name === "Annual-General-Meetings" && (
              <>
                <div style={{ marginBottom: "1rem", marginTop: "2rem" }}>
                  <DataTable
                    eventId={id}
                    customTitle={{
                      fontSize: "2rem",
                      fontFamily: "ttnorms",
                      fontWeight: 600,
                    }}
                    bulkDeleteHandler={bulkDeleteProxy}
                    selectedRowHandler={(id) => selectedProxyId(id)}
                    handleSearch={handleProxySearch}
                    showIcon={true}
                    showFilter={false}
                    data={
                      allProxies?.proxies.map((item, idx) => ({
                        ...item,
                        key: idx + 1,
                      })) ?? []
                    }
                    title="Proxy list"
                    columns={columnsProxy(resolutions, elections)}
                    toggleAddProxyModal={(val) => {
                      setAttendeeType("proxy");
                      setAddProxyVisible(true);
                    }}
                  />
                </div>
              </>
            )}
          <ElectionObserver
            setOpenObserverModal={setOpenObserverModal}
            eventId={id}
          />

          <Modal
            style={{
              width: "100%",
              maxWidth: "100%",
            }}
            width="80%"
            destroyOnClose={true}
            centered
            footer={null}
            onCancel={() => setSmsPreviewVisible(false)}
            visible={smsPreviewVisible}
            closable={true}
            bodyStyle={{
              backgroundColor: "#fff",
              minHeight: "100vh",
              width: "100%",
            }}
          >
            <div className={style.smsPreview}>
              <div className={style.smsPreview_right}>
                <div className={style.smsPreview_top}>
                  <p className={style.smsPreview_bold}>SMS PREVIEW</p>
                  <p className={style.smsPreview_paragraph}>{smsMessage}</p>
                  <p
                    style={{ margin: "2rem 0 3rem 0" }}
                    className={style.smsPreview_paragraph}
                  >
                    All Selected attendees for the event
                  </p>
                  <p className={style.smsPreview_paragraph}>Attendees list</p>
                  <Select
                    styles={customStyles}
                    onChange={handleSelectedAttendees}
                    options={
                      lists?.map((item, idx) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                      })) ?? []
                    }
                    placeholder="All Attendee List"
                  />
                  <div style={{ margin: "1rem 0 1rem 0" }}>
                    <Checkbox />
                    <span
                      style={{ margin: "0 0 0 1rem" }}
                      className={style.smsPreview_paragraph}
                    >
                      Personalise the “To” field
                    </span>
                  </div>
                  <div
                    style={{
                      margin: "2.5rem 0 3rem 0",
                      width: "50%",
                      background: "#FAFAFA",
                      borderRadius: "3px",
                      padding: "1.5rem 1rem",
                    }}
                  >
                    <p className={style.smsPreview_paragraph}>
                      SMS Pages:{" "}
                      <span className={style.smsPreview_bold}>
                        {smsMessage && Math.ceil(smsMessage.length / 160)}{" "}
                        page(s)
                      </span>
                    </p>
                    <p
                      style={{ margin: "0px" }}
                      className={style.smsPreview_paragraph}
                    >
                      SMS Credit:{" "}
                      <span className={style.smsPreview_bold}>2 credits</span>
                    </p>
                  </div>
                </div>
                <div>
                  <form>
                    <p>Message</p>
                    <textarea
                      style={{
                        height: "15rem",
                        width: "100%",
                        borderRadius: "3px",
                        padding: "1rem",
                      }}
                      value={smsMessage}
                      onChange={(e) => setSmsMessage(e.target.value)}
                    />
                  </form>
                </div>
                <div className={style.smsPreview_group}>
                  <div className={style.smsPreview_group_button}>
                    <button
                      type="submit"
                      className={style.form__input_submit_request}
                      onClick={handleSendSMS}
                      disabled={sendingSMS}
                    >
                      <span>Launch SMS Campaign</span>
                      {sendingSMS && <Spin size="large" color="#fff" />}
                    </button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignSelf: "center",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSmsPreviewVisible(false);
                      setSampleSMSVisible(true);
                    }}
                  >
                    Send Sample SMS
                  </div>
                </div>
              </div>
              <div className={style.smsPreview_left}>
                <div className={style.smsPreview_left_icons}>
                  <div className={style.smsPreview_left_icons_con}>
                    <div
                      className={style.smsPreview_left_icons_con_box}
                      style={
                        mobilePreview === "apple"
                          ? { backgroundColor: "#fff" }
                          : {}
                      }
                      onClick={() => setMobilePreview("apple")}
                    >
                      <FaApple size={28} color="#EF3125" />
                    </div>
                    <div
                      className={style.smsPreview_left_icons_con_box}
                      style={
                        mobilePreview === "android"
                          ? { backgroundColor: "#fff" }
                          : {}
                      }
                      onClick={() => setMobilePreview("android")}
                    >
                      <AiFillAndroid size={28} color="#000000" />
                    </div>
                  </div>
                </div>
                <div className={style.smsPreview_left_desc}>
                  <div
                    style={{
                      backgroundColor: "#1EC86D",
                      color: "#fff",
                      width: mobilePreview === "android" ? "200px" : "150px",
                      minHeight: "100px",
                      position: "absolute",
                      borderRadius: "5px",
                      padding: "10px",
                      zIndex: 99,
                      top: mobilePreview === "android" ? "15%" : "20%",
                      left: mobilePreview === "android" ? "30%" : "32%",
                    }}
                  >
                    {smsMessage}
                  </div>
                  {mobilePreview === "apple" && (
                    <img
                      src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/ios11_shtqmv.png"
                      style={{ display: "block", position: "relative" }}
                    />
                  )}
                  {mobilePreview === "android" && (
                    <img
                      src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/android11_yzyru4.png"
                      style={{ display: "block", position: "relative" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            destroyOnClose={true}
            title={
              <div className={style.addProxyHeader}>
                <div className={style.proxyIconBox}>
                  <span className={style.questionBox}>
                    <FiSend color="#fff" />
                  </span>
                </div>
                <div className={style.addTitle}>SEND SMS SAMPLE</div>
                <div className={style.addDesc}>Send test Sample SMS</div>
              </div>
            }
            // sampleSMSVisible, setSampleSMSVisible
            centered
            footer={null}
            onCancel={() => setSampleSMSVisible(false)}
            visible={sampleSMSVisible}
            closable={true}
            bodyStyle={{ backgroundColor: "#9999992b", minHeight: "30rem" }}
          >
            <div className={style.formContainer}>
              <form onSubmit={handleSubmit(onSubmitSendSMS)}>
                <p>Recipient Number</p>
                <input
                  style={{
                    height: "4rem",
                    width: "100%",
                    borderRadius: "3px",
                    marginBottom: "8rem",
                  }}
                  value={sampleSMSNumber}
                  onChange={(e) => {
                    // if (sampleSMSNumber.length > 11) {
                    //   console.log("greate than 11 digits");
                    //   return;
                    // }
                    setSampleSMSNumber(e.target.value);
                  }}
                />
                <div className={style.form__input_wrap}>
                  <button
                    type="submit"
                    disabled={sendingSMS}
                    className={style.form__input_submit_request}
                    onClick={handleSendSampleSMS}
                  >
                    <span>Sample SMS</span>
                    {sendingSMS && <Spin size="large" color="#fff" />}
                  </button>
                </div>
              </form>
            </div>
          </Modal>
          <Modal
            destroyOnClose={true}
            title={
              <div className={style.addProxyHeader}>
                <div className={style.proxyIconBox}>
                  <span className={style.questionBox}>
                    <FiSend color="#fff" />
                  </span>
                </div>
                <div className={style.addTitle}>SEND SMS</div>
                <div className={style.addDesc}>
                  Send notifications to all your attendees
                </div>
              </div>
            }
            centered
            footer={null}
            onCancel={() => setSendSMSVisible(false)}
            visible={sendSMSVisible}
            closable={true}
            bodyStyle={{ backgroundColor: "#9999992b", minHeight: "30rem" }}
          >
            <div className={style.formContainer}>
              <form onSubmit={handleSubmit(onSubmitSendSMS)}>
                <p>Message</p>
                <textarea
                  style={{
                    height: "15rem",
                    width: "100%",
                    borderRadius: "3px",
                    padding: "1rem",
                  }}
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value)}
                />
                <div className={style.form__input_wrap}>
                  <button
                    type="submit"
                    className={style.form__input_submit_request}
                    onClick={() => {
                      if (!smsMessage) {
                        Swal.fire("oops!", "Text cannot be empty", "error");
                        return;
                      }
                      setSendSMSVisible(false);
                      setSmsPreviewVisible(true);
                    }}
                  >
                    <span>Preview SMS</span>
                  </button>
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
                <div className={style.addDesc}>
                  Enter information of your attendee
                </div>
              </div>
            }
            centered
            footer={null}
            visible={addProxyVisible}
            onCancel={() => setAddProxyVisible(false)}
            closable={true}
            bodyStyle={{ backgroundColor: "#9999992b" }}
          >
            <div className={style.formContainer}>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                <div className={style.form__input_wrap}>
                  <div className={style.form__input_box}>
                    <label
                      htmlFor="firstName"
                      className={style.form__input_label}
                    >
                      Participant Voting rights (Holdings/Units)
                    </label>
                    <NumberFormat
                      value={proxyVotersRight}
                      thousandSeparator={true}
                      // prefix="NGN"
                      placeholder="0"
                      className="form__input"
                      onChange={quorumProxyNumberHandle}
                      onKeyPress={preventMinus}
                      onPaste={preventPasteNegative}
                      required
                    />
                  </div>
                </div>
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

          <Modal
            title={
              <div className={style.addProxyHeader}>
                <div className={style.proxyIconBox}>
                  <span className={style.questionBox}>
                    <MdEmail color="#fff" />
                  </span>
                </div>
                <div className={style.addTitle}>SEND REPORT MAIL</div>
                <div className={style.addDesc}>
                  Send report to the email below
                </div>
              </div>
            }
            centered
            footer={<ModalFooterBtn />}
            visible={sendReportVisible}
            onCancel={() => setSendReportVisible(false)}
            closable={true}
            bodyStyle={{ backgroundColor: "#9999992b" }}
            width={410}
          >
            <div className={style.formContainer}>
              <FormInput
                placeholder="Email"
                labelTitle="Email Address"
                inputType="text"
                isRequired={false}
                errors={errors}
                name="Email"
                watch={watch}
                showCount={false}
                isTextArea={true}
              />
              <div
                className={`${style.form__input_wrap} ${style.badgeList_wrap}`}
              >
                <div className={style.badgeList}>
                  <span className={style.badgeList_name}>johndoe@test.com</span>
                  <span span className={style.badgeList_icon}>
                    <MdClose />
                  </span>
                </div>
                <div className={style.badgeList}>
                  <span className={style.badgeList_name}>johndoe@test.com</span>
                  <span span className={style.badgeList_icon}>
                    <MdClose />
                  </span>
                </div>
                <div className={style.badgeList}>
                  <span className={style.badgeList_name}>johndoe@test.com</span>
                  <span span className={style.badgeList_icon}>
                    <MdClose />
                  </span>
                </div>
              </div>
            </div>
          </Modal>

          {documents && documents.length ? (
            <div className={style.uploadedDoc}>
              <div className={style.uploadedDoc_title}>Uploaded Documents</div>

              <div className={style.documentWrapper}>
                <DocumentList
                  items={documents}
                  showSetting={false}
                  showDelete={false}
                />
              </div>
            </div>
          ) : null}

          {links && links.length ? (
            <div className={style.uploadLink}>
              <div className={style.uploadLink_title}>Uploaded Links</div>
              <div className={style.documentWrapper}>
                <AgmLink items={links} showDelete={false} />
              </div>
            </div>
          ) : null}

          {videos && videos.length ? (
            <div className={style.uploadLink}>
              <div className={style.uploadLink_title}>Uploaded Video</div>
              <div className={style.documentWrapper}>
                <VideoList items={videos} showDelete={false} />
              </div>
            </div>
          ) : null}

          {eventDetail &&
            eventDetail.event_type.name !== "Annual-General-Meetings" && (
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
        </div>
      </section>
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
      <ObserverModal
        openObserverModal={openObserverModal}
        setOpenObserverModal={setOpenObserverModal}
      />
    </PrivateGenericLayout>
  );
};
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
        {elections && elections.length > 1 && data.length === idx + 1 && (
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
        )}
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
export const MemoElectionPicker = React.memo(ElectionPicker);
export const MemoResolutionPicker = React.memo(ResolutionPicker);

const ModalFooterBtn = () => {
  return (
    <div
      className={style.form__input_wrap}
      style={{ paddingLeft: "10px", paddingRight: "10px" }}
    >
      <button type="submit" className={style.form__input_submit_request}>
        Schedule Send
      </button>
    </div>
  );
};

export default EventGallery;
