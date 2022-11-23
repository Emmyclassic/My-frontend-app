import { LoadingOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DatePicker,
  Dropdown,
  Menu,
  Modal,
  Spin,
  Steps,
  Table,
  Upload,
} from "antd";
import debounce from "debounce-promise";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { MdClose, MdModeEdit } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { bulkRemoveAttendeeHandler } from "../../../../api/attendeeHandler";
import {
  fetchDonation,
  updateEvent,
  uploadFile,
} from "../../../../api/eventHandler";
import {
  getPollHandler,
  getQuestionaaireHandler,
  getResolutionsHandler,
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
import EditableBanner from "../../../../components/EditableBanner";
import FormInput from "../../../../components/FormInput";
import LeftDrawerModal from "../../../../components/LeftDrawerModal";
import CustomModal from "../../../../components/Modals";
import DataTable from "../../../../components/Tables";
import { template } from "../../../../constants/statics";
import { useFileUpload } from "../../../../hooks/useFileUpload";
import { addAttendeeSchemaCorperate } from "../../../../utils/Validation/addAttendeeValidation";
import { addProxyValidation } from "../../../../utils/Validation/addProxyValidation";
import AttendeeForm from "../Attendee/Form/Attendee";
import {
  getAttendeeAction,
  postAttendeeAction,
} from "../Attendee/state/action";
import { resetAddAttendee } from "../Attendee/state/attendeeAction";
import PollForm from "../Poll/PollForm";
import EditPollForm from "../Poll/PollForm/EditPollForm";
import QuestionaireForm from "../Questionaire/QuestionaiireForm";
import EditQuestionaireForm from "../Questionaire/QuestionaiireForm/EditQuestionaireForm";
import EditResolutionForm from "../Resolution/ResolutionForm/EditResolutionForm";
import ResolutionForm from "../Resolution/ResolutionForm/index";
import StatutoryForm from "../Resolution/StatutoryForm";
import AgmLink from "../Resources/AgmLink";
import DocumentForm from "../Resources/DocumentForm";
import DocumentList from "../Resources/DocumentList";
import EntertainForm from "../Resources/EntertainerForm";
import LinkForm from "../Resources/LinkForm";
import VideoForm from "../Resources/VideoForm";
import VideoList from "../Resources/VideoList";
import { columns, columnsEventDonation, columnsEventTicket } from "./constant";
import style from "./index.module.scss";
import "./index.scss";

const { Dragger } = Upload;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const CoperateSummary = ({ nextStep }) => {
  const dispatch = useDispatch();
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [questionaireOpen, setQuestionaireOpen] = useState(false);
  const [statutryOpen, setStatutryOpen] = useState(false);
  const [searchPhrase] = useState("");
  const [openVideo, setOpenVideo] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openDocument, setOpenDocument] = useState(false);
  const [openSpaeker, setOpenSpeaker] = useState(false);
  const [reloadLink, setReloadLink] = useState(false);
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [reloadSpeaker, setReloadSpeaker] = useState(false);
  const [reloadDocument, setReloadDocument] = useState(false);
  const [reloadVideo, setReloadVideo] = useState(false);
  const [editQuestionaaireModal, setEditQuestionaaireModal] = useState(false);
  const [meetingType, setMeetingType] = useState(null);
  const [, setPreviewImage] = useState("");
  const [uploadingPreviewFile, setUploadingPreviewFile] = useState(false);
  const [, setPreviewVisible] = useState(false);
  const [updatingEvent, setUpdatingEvent] = useState(false);
  const [, setPreviewTitle] = useState("");
  const [loading] = useState(false);
  const [resolutionError, setResolutionError] = useState();
  const [QuestionError, setQuestionError] = useState();
  const [resolutions, setResolutions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [addAttendeeVisible, setAddAttendeeVisible] = useState(false);
  const [loadingResolution, setLoadingResolution] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [bannerFileList, setBannerFileList] = useState([]);
  const [openBannerTemplate, setOpenBannerTemplate] = useState(false);
  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
  const [uploadModal, setUploadModal] = useState(false);
  const [defaultBannerUrl, setDefaultBannerUrl] = useState("");
  const [reloadResolution, setReloadResolution] = useState(false);
  const [reloadQuestion, setReloadQuestion] = useState(false);
  const [logoFileList, setLogoFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [singleResolution] = useState();
  const [singleQuestionaaire, setSingleQuestionaaire] = useState();
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [resolutionModal, setResolutionModal] = useState(false);
  const [tickets, setTickets] = useState();
  const [donations, setDonations] = useState();
  const [attendeeType, setAttendeeType] = useState("attendee");
  const [attendeeModal, setAttendeeModal] = useState(false);
  const [, setSpeakerError] = useState();
  const [formData, setFormDate] = useState({
    shortName: currentEvent.short_name,
    title: currentEvent.title,
    description: currentEvent.description,
    banner: currentEvent.banner,
    logo: currentEvent.logo,
    attendee_mode_type: currentEvent.attendee_mode_type,
    ...currentEvent,
  });
  const [, setFileError] = useState({ errorMsg: "", error: false });
  const history = useHistory();
  const allAttendees = useSelector((state) => state.attendees);
  const [, setTemplateVisible] = useState(false);
  const [editTemplateVisible, setEditTemplateVisible] = useState(false);
  const [polls, setPolls] = useState([]);
  const [speakers, setSpeakers] = useState();
  const [, setLogoUrl] = useState();
  const [reloadPolls, setReloadPoll] = useState(false);
  const [, setLoadingPoll] = useState(false);
  const [pollTemplateVisible, setPollTemplateVisible] = useState(false);
  const [editPollModal, setEditPollModal] = useState(false);
  const [singlePoll, setSinglePoll] = useState();
  const [pollModal, setPollModal] = useState(false);
  const [documents, setDocuments] = useState();
  const [videos, setVideos] = useState();
  const [links, setLinks] = useState();
  const fileUploader = useFileUpload();
  const [, setVideoError] = useState();
  const [, setLinkError] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [, setDocumentError] = useState();
  const [reloadAttendee, setReloadAttendee] = useState(false);
  const [unformattedStartDate, setUnformattedStartDate] = useState();
  const [unformattedEndDate, setUnformattedEndDate] = useState();

  const [startDate, setStartDate] = useState(
    moment(currentEvent?.starts_at, "DD-MM-YYYY HH:mm:ss").format(
      "DD/MM/YYYY HH:mm:ss"
    )
  );

  const [endDate, setEndDate] = useState(
    moment(currentEvent?.ends_at, "DD-MM-YYYY HH:mm:ss").format(
      "DD/MM/YYYY HH:mm:ss"
    )
  );

  const [editCurrentEvent, setEditCurrentEvent] = useState({
    banner: currentEvent.banner,
    shortName: currentEvent.short_name,
    title: currentEvent.title,
    logo: currentEvent.logo,
    description: currentEvent.description,
    ...currentEvent,
  });

  const dbounce = useCallback(
    debounce((searchPhrase) => dispatch(getAttendeeAction(searchPhrase)), 500),
    []
  );

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
      <Menu.Item onClick={() => setOpenSpeaker(true)}>
        <div className={style.menuItem}>Add Entertainer/Speaker</div>
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
      attendeeType === "proxy" ? addProxyValidation : addAttendeeSchemaCorperate
    ),
  });
  useEffect(() => {
    dispatch(getAttendeeAction(searchPhrase));
  }, [reloadAttendee]);

  const fetchTicketHandler = async (eventId) => {
    try {
      const {
        data: { data },
      } = await fetchEventTickets(eventId);

      const transformData = data.map((item, idx) => ({
        key: idx + 1,
        ...item,
        status: "In-Active",
      }));
      setTickets(transformData);
    } catch (ex) {
      console.log("gdgggggd", ex);
    }
  };

  useEffect(() => {
    if (logoFileList.length) {
      baseLogoImage(logoFileList[0]);
    }
  }, [logoFileList.length]);

  const fetchDonationHandler = async () => {
    try {
      const {
        data: { data },
      } = await fetchDonation();

      // setTickets(data);

      const transformData = data.map((item, idx) => ({
        key: idx + 1,
        ...item,
      }));
      setDonations(transformData);
    } catch (ex) {}
  };

  const fetchSpeakers = async () => {
    try {
      const {
        data: { data },
      } = await getSpeakers(currentEvent.id);

      setSpeakers(data);
    } catch (err) {
      setSpeakerError("Something went wrong", err);
    }
  };

  useEffect(() => {
    fetchTicketHandler(currentEvent.id);
    fetchDonationHandler();
  }, []);
  useEffect(() => {
    fetchLinks("link");
  }, [reloadLink]);
  useEffect(() => {
    fetchDocuments("document");
  }, [reloadDocument]);
  useEffect(() => {
    fetchVideos("video");
  }, [reloadVideo]);
  useEffect(() => {
    fetchSpeakers();
  }, [reloadSpeaker]);

  const onCloseAttendee = (e) => {
    dispatch(resetAddAttendee);
  };

  const onSubmitAttendee = (data) => {
    const attendeeList = [
      {
        name: data.participantName,
        email: data.email,
        phone_number: phoneNumber,
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
    setPhoneNumber(0);
    // setAddAttendeeVisible(false);
  };
  const handleFileUpload = async (e) => {
    alert(63636363);
    try {
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
    } catch (ex) {
      console.log("ÿuyguygbuyubuhb", ex);
      Swal.fire("Closed!", "Invalid template format", "error");
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
  //     setter(data);
  //   } catch (err) {
  //     errorSetter("Something went wrong", err);
  //   }
  // };
  // useEffect(() => {
  //   fetchResources("link", setLinks, setLinkError);
  //   fetchResources("document", setDocuments, setDocumentError);
  //   fetchResources("vdeo", setVideos, setVideoError);
  // }, []);

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
  // useEffect(() => {
  //   fetchLinks("link");
  //   fetchDocuments("document");
  //   fetchVideos("video");
  // }, []);
  const { Step } = Steps;

  const redirectToPreveiew = (payload) => {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));

    localStorage.setItem("lastStep", 6);
    history.push(`/event/preview/${currentEvent.id}`, JSON.stringify(payload));
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
    fetchResolutions(currentEvent.id);
  }, [reloadResolution]);
  useEffect(() => {
    fetchQuestions(currentEvent.id);
  }, [reloadQuestion]);

  useEffect(() => {
    fetchPolls(currentEvent.id);
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
    setBannerFileList([]);
  };
  const dateHandler = (date, dateLabel) => {
    if (dateLabel === "startDate") {
      setUnformattedStartDate(date);
      setStartDate(date.format("DD/MM/YYYY HH:mm:ss"));
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
        setUploadingPreviewFile(false);
      } else {
        const full = window.location.protocol + "//" + window.location.host;
        const selectedBannerUrl = defaultBannerUrl || template[0].bannerUrl;
        const customBannerUrl = full + selectedBannerUrl;
        bannerUrl = currentEvent.banner || customBannerUrl;
        logoUrl = currentEvent.logo;
      }

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
        attendee_mode_type:
          formData.attendee_mode_type || currentEvent.attendee_mode_type,
        start_date: startDate,
        starts_at: startDate,
        ends_at: endDate,
      };
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
        localStorage.removeItem("lastStep");
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

  const phoneNumberHandler = (e) => {
    // console.log("dbhbwhdwhd", val);
    setPhoneNumber(e.target.value);
  };
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };
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

  const baseLogoImage = async (file) => {
    const imageUrl = await getBase64(file);
    setLogoUrl(imageUrl);
  };

  useEffect(() => {
    if (bannerFileList.length) {
      baseImage(bannerFileList[0]);
    }
  }, [bannerFileList.length]);

  // const openPollModal = (item) => {
  //   closePollModal(true);
  //   setSingleResolution(item);
  // };

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
  const selectedAttndeeId = (ids) => {
    setSelectedAttendees(ids.map((item) => item.id));
  };

  const bulkDeleteAttendee = () => {
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
    }).then((result) => {
      if (result.isConfirmed) {
        bulkRemoveAttendeeHandler({ ids: selectedAttendees }).then((res) => {
          const { data } = res;
          if (data) {
            reloadAttendee();
          }
        });
        // dispatch(removeAttendeeAction(selectedAttendees));
      }
    });
  };

  return (
    <section className={style.main}>
      <div className={style.headerContainer}>
        <div className={style.headerContainer_left}>
          <EditableBanner
            handleClick={() => {
              console.log("handleClick....EditableBanner.... ");
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
                />
              </div>
            </div>
            <div className={style.form__input_wrap}>
              <SingleSelect
                onChange={(item) => setMeetingType(item)}
                selectedDefaultItem={
                  currentEvent.meeting_type === "Public" ? "0" : "1"
                }
              >
                <SingleCard position="1" title="Public" />
                <SingleCard position="2" title="Private" />
              </SingleSelect>
            </div>
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
          </div>
        </div>
        <div className={style.headerContainer_right}>
          <div className={style.pollType}>
            <Steps direction="vertical" current={1}>
              {/* <Step
                icon={
                  <span>
                    <FaPoll color="#09974D" size={30} />
                  </span>
                }
                title={<span className={style.pollTitle}> Resolution</span>}
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
                        {resolutions.slice(0, 1).map((item) => (
                          <ResolutionItem
                            key={item.id}
                            item={item}
                            count={resolutions.length}
                            onClick={() => openDetailModal(item)}
                          />
                        ))}
                        {resolutions.length > 1 && (
                          <div
                            className={style.pollFooter}
                            onClick={() => setTemplateVisible(true)}
                          >
                            See more
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={style.addPollWrap}>
                        <IconButton
                          leftIcon={<FiPlus />}
                          iconTitle="Create Resolution"
                          containerStyle={style.addPollBtn}
                          handleClick={() => setResolutionOpen(true)}
                        />
                      </div>
                    )}
                  </div>
                }
              /> */}

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
              <Step title="" style={{ display: "none" }} />
            </Steps>
          </div>
        </div>
      </div>
      <section className={style.tableContainer}>
        <div style={{ marginBottom: "5rem" }}>
          <DataTable
            bulkDeleteHandler={bulkDeleteAttendee}
            selectedRowHandler={(id) => selectedAttndeeId(id)}
            toggleAddProxyModal={(val) => {
              setAttendeeType("attendee");
              setAddAttendeeVisible(true);
            }}
            addAttendeeText="Add Attendee Manually"
            data={
              allAttendees?.attendees.map((item, idx) => ({
                ...item,
                key: idx + 1,
                account_number: "N/A",
                vote_rights: "N/A",
              })) ?? []
            }
            showIcon={true}
            columns={columns}
            showFilter={false}
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
            <div className={style.tableHeader_title}>Event Donations</div>
          </div>
          <Table
            columns={columnsEventDonation}
            dataSource={donations}
            rowClassName="customTableRow"
          />
        </div>
      </section>
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

      <div className={style.panelIstContainer_wrap}>
        <div className={style.uploadLink_title}>Panelists/Speakers</div>
        <div className={style.panelIstContainer}>
          {speakers && speakers.length
            ? speakers.map((item, idx) => (
                <CircularAvatar
                  imageUrl={item.photo}
                  key={item.id}
                  title={item.name}
                />
              ))
            : null}
        </div>
      </div>

      <section className={style.upload_btn}>
        <button
          onClick={onSubmit}
          type="button"
          className={`${style.form__input_submit_request} ${style.form__input_submit_left}`}
        >
          {updatingEvent || uploading ? (
            <Spin size="large" color="#fff" />
          ) : (
            "Create Event"
          )}
        </button>
        <button
          onClick={() => onSubmit(null, true)}
          type="button"
          className={`${style.form__input_submit_request} ${style.form__input_submit_right}`}
        >
          {uploadingPreviewFile ? (
            <Spin size="large" color="#fff" />
          ) : (
            "Preview"
          )}
        </button>
      </section>
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
            <div className={style.form__input_wrap}>
              <div className={style.form__input_box}>
                <label htmlFor="firstName" className={style.form__input_label}>
                  Enter phone number
                </label>
                <NumberFormat
                  value={phoneNumber}
                  thousandSeparator={false}
                  // prefix="NGN"
                  placeholder="08060203602"
                  className="form__input"
                  onChange={phoneNumberHandler}
                  onKeyPress={preventMinus}
                  onPaste={preventPasteNegative}
                  maxLength={11}
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
          <h3 className={style.template_header}>Edit Event Banner and Logo</h3>
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
                  <div onClick={removeBanner} className={style.bannerImageBox}>
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
                    maxCount={1}
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
                  maxCount={1}
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
              questions.map((item, idx) => (
                <div className={style.resolutionCard} key={item.id}>
                  <ResolutionItem
                    item={item}
                    count={idx + 1}
                    onClick={() => openQuestionDetailModal(item)}
                    closeTemplate={() => openQuestionDetailModal(false)}
                  />
                </div>
              ))}
          </div>
        </div>
      </Modal>
      {/* <Modal
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
              resolutions.slice(1).map((item, idx) => (
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
      </Modal> */}
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
                    onClick={() => openQuestionDetailModal(item)}
                    //   onClick={() => openDetailModal(item)}
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
                    keyword="Poll"
                    onClick={() => openPollDetailModal(item)}
                    closeTemplate={() => setPollTemplateVisible(false)}
                  />
                </div>
              ))}
          </div>
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
      <Modal
        title={
          <div className={style.addProxyHeader}>
            <div className={style.proxyIconBox}>
              <span className={style.questionBox}>
                <AiFillQuestionCircle color="#fff" />
              </span>
            </div>
            <div className={style.addTitle}>ADD Entertainer</div>
          </div>
        }
        centered
        footer={null}
        visible={openSpaeker}
        closable={true}
        onCancel={() => setOpenSpeaker(false)}
        bodyStyle={{ backgroundColor: "#9999992b" }}
      >
        <div style={{ width: "450px" }}>
          <EntertainForm
            reload={() => setReloadSpeaker((prev) => !prev)}
            setTab={() => setOpenSpeaker(false)}
          />
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
        />
      </LeftDrawerModal>
      <LeftDrawerModal
        visible={statutryOpen}
        closeModal={() => setStatutryOpen(false)}
        tagName="Statutory Resolution"
        headerTitle="Enter Statutory Resolution and corresponding vote for your attendees to select from."
      >
        <StatutoryForm handleStatutry={handleStatutry} />
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
        <QuestionaireForm closeModal={closeQuestionaireModal} />
      </LeftDrawerModal>
      <LeftDrawerModal
        visible={pollModal}
        closeModal={() => closePollModal()}
        tagName="Setup Poll"
        headerTitle="Enter question and corresponding answer for your attendees to select from."
      >
        <PollForm closeModal={closePollModal} />
      </LeftDrawerModal>
    </section>
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

export default CoperateSummary;
