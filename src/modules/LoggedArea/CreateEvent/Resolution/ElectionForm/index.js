import { Alert, message, Radio, Spin, Tooltip, Upload } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiTrash, FiEdit2 } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { MdClose } from "react-icons/md";
import { RiDragMove2Fill } from "react-icons/ri";
import shortid from "shortid";
import { electionHandler } from "../../../../../api/resolutionHandler";
import CustomDatePicker from "../../../../../components/DatePicker";
// import UploadButton from "../../../../../components/UploadButton";
import SettingsCheckbox from "../../../../../components/FormInput/Checkbox";
import ReactDragListView from "react-drag-listview";
import style from "../ResolutionForm/index.module.scss";

import { uploadFile } from "../../../../../api/eventHandler";
import LeftDrawerModal from "../../../../../components/LeftDrawerModal";

const { Dragger } = Upload;

const ElectionForm = ({
  resolutionOpen,
  closeReolutionModal,
  settings,
  resolutionHeader,
  resolutionType,
  showDelete = false,
  type = "Question",
  openResolutionModal,
  eventDetail,
  action = "Election Candidates",
  actionPlaceholder = ["For", "Against", "Abstain"],
  typePlaceholder = "e.g How's your day going?",
  createShotcut = "Create Statutory Resolution",
  reload,
}) => {
  const [startDate, setStartDate] = useState();
  const [candidateList, setCandidateList] = useState([]);
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState();
  const [duration, setDuration] = useState();
  const [endTime, setEndTime] = useState();
  const [titleError, setTitleError] = useState(false);
  const [dateType, setDateType] = useState();
  const [unformattedStartDate, setUnformattedStartDate] = useState();
  const [unformattedEndDate, setUnformattedEndDate] = useState();
  const [endDateError, setEndDateError] = useState({
    errorMsg: "",
    error: false,
  });
  const [startDateError, setStartDateError] = useState({
    errorMsg: "",
    error: false,
  });

  const [iscompulsory, setIcompulsory] = useState(1);
  const [multipleRoundType, setMultipleRoundType] = useState();
  const [allowMultipleRound, setAllowMultipleRound] = useState(false);
  const [resourceInputCount, setResourceInputCount] = useState([
    {
      title: "",
      candidateInputCount: [
        { name: "", bio: "", photo: [], previewImage: "" },
        { name: "", bio: "", photo: [], previewImage: "" },
        { name: "", bio: "", photo: [], previewImage: "" },
        { name: "", bio: "", photo: [], previewImage: "" },
      ],
    },
  ]);
  const [endDate, setEndDate] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const errorClose = () => setErrorResponse();

  const endTimeHandler = (val) => {
    setEndTime(val);
  };
  const startTimeHandle = (val) => {
    setStartTime(val);
  };

  const durationTimeHandle = (val) => {
    setDuration(val);
  };

  const disabledDate = (current) => {
    const today = moment();
    const past = moment(current);
    today.diff(past, "days");

    return today.diff(past, "days") >= 1;
  };
  const dateHandler = (date, dateLabel) => {
    if (dateLabel === "startDate") {
      setUnformattedStartDate(date);
      setStartDate(date.format("DD/MM/YYYY"));
      setStartDateError({
        error: false,
        errorMsg: "",
      });
    } else {
      setUnformattedEndDate(date);
      setEndDate(date.format("DD/MM/YYYY"));
      setEndDateError({
        error: false,
        errorMsg: "",
      });
    }
  };

  const disabledEndDate = (current) => {
    return current && current < moment(unformattedStartDate, "YYYY-MM-DD");
  };
  const addCandidates = (candidate) => {
    const existUser = candidateList.find(
      (item) => item.name.toLowerCase() === candidate.name.toLowerCase()
    );

    if (!existUser) {
      setCandidateList([...candidateList, candidate]);
    }
  };
  const validateField = () => {
    let clean = true;

    const result = resourceInputCount.some((m) => m.title === "");

    if (result) {
      setTitleError({
        error: true,
        errorMsg: "Title is required",
      });
      clean = false;
    } else {
      setTitleError({
        error: false,
        errorMsg: "",
      });
      clean = true;
    }

    if (!duration && (!startDate || !endDate)) {
      setStartDateError({
        error: true,
        errorMsg: "Start Date is required",
      });
      clean = false;
    }

    // if (!startDate) {
    //   setStartDateError({
    //     error: true,
    //     errorMsg: "Start Date is required",
    //   });
    //   clean = false;
    // } else {
    //   setStartDateError({
    //     error: false,
    //     errorMsg: "",
    //   });
    //   clean = true;
    // }
    // if (!endDate) {
    //   setEndDateError({
    //     error: true,
    //     errorMsg: "End Date is required",
    //   });
    //   clean = false;
    // } else {
    //   setEndDateError({
    //     error: false,
    //     errorMsg: "",
    //   });
    //   clean = true;
    // }

    return clean;
  };
  const postElection = async (payload) => {
    try {
      const { data } = await electionHandler(payload);
      setSuccessResponse(data);
      reset({ resolutionTitle: "" });
      setErrorResponse();
      setEndDate(null);
      setStartDate(null);
      setIcompulsory(false);
      setStartTime(null);
      setEndTime(null);
      setMultipleRoundType();
      setUnformattedStartDate();
      setUnformattedEndDate();
      setAllowMultipleRound(false);
      setResourceInputCount([
        {
          title: "",
          candidateInputCount: [
            { name: "", photo: [], bio: "", previewImage: "" },
            { name: "", photo: [], bio: "", previewImage: "" },
            { name: "", photo: [], bio: "", previewImage: "" },
            { name: "", bio: "", photo: [], previewImage: "" },
          ],
        },
      ]);
      setLoading(false);
      if (reload) {
        reload();
      }

      if (closeReolutionModal) {
        closeReolutionModal();
      }
    } catch (err) {
      setLoading(false);
      const {
        data: { errors },
      } = err.response;
      const errorArr = Object.values(errors);

      setErrorResponse(errorArr);
    }
  };
  const getDisabledEndTime = (date, format) => {
    const hoursArr = [];

    const same = moment(startDate, "DD-MM-YYYY").isSame(
      moment(endDate, "DD-MM-YYYY")
    );
    const hours = moment(date).format(`${format}`);
    if (same) {
      for (let i = 0; i < hours; i++) {
        hoursArr.push(i);
      }
      return hoursArr;
    }
  };

  useEffect(() => {
    if (successResponse) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [successResponse]);

  // const getDisabledStartTime = (date, format) => {
  //   const hoursArr = [];
  //   const hours = moment(date).format(`${format}`);
  //   for (let i = 0; i < hours; i++) {
  //     hoursArr.push(i);
  //   }
  //   return hoursArr;
  // };

  const validateCandidate = () => {
    let exit_loops = true;

    for (let i = 0; i < resourceInputCount.length; i++) {
      const cand = resourceInputCount[i];
      for (let y = 0; y < cand.candidateInputCount.length; y++) {
        const candInner = cand.candidateInputCount[y];
        if (!candInner.bio || !candInner.name || !candInner.photo.length) {
          exit_loops = false;
          break;
        }
      }

      if (exit_loops === false) {
        break;
      }
    }
    return exit_loops;
  };

  const onSubmit = async (data) => {
    if (validateField() && validateCandidate()) {
      try {
        setLoading(true);
        const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
        const start = `${startDate} ${moment(startTime).format("HH:mm:ss")}`;
        const end = `${endDate} ${moment(endTime).format("HH:mm:ss")}`;
        console.log("resourceInputCount payload", resourceInputCount);
        const transResourceInputCount = await Promise.all(
          resourceInputCount.map(async (item) => {
            const copyCandid = item.candidateInputCount;
            const candidateRes = await Promise.all(
              copyCandid.map(async (data) => {
                const result = await uploadFile({
                  file: data.photo[0],
                  file_name: data.name,
                });
                return {
                  name: data.name,
                  bio: data.bio,
                  photo: result.data.data.file_link,
                };
              })
            );

            const finalPayload = {
              position: item.title,
              candidates: candidateRes,
              is_compulsory: iscompulsory,
              event_id: eventDetail ? eventDetail.id : currentEvent.id,
              allow_multiple_round: allowMultipleRound,
              multiple_round_type: multipleRoundType,
            };

            if (dateType === "startEnd") {
              finalPayload.starts_at = start;
              finalPayload.ends_at = end;
            } else {
              finalPayload.duration = moment(duration).format("HH:mm");
            }

            return finalPayload;
          })
        );

        const requestBody = {
          elections: transResourceInputCount,
        };

        console.log({ postElection, requestBody });
        postElection(requestBody);
      } catch (err) {
        setLoading(false);
      }
    } else {
      message.error("Please fill candidate details");
    }
  };

  const removeInput = (item, idx, parentIdx) => {
    const arr = [...resourceInputCount];
    arr[parentIdx].candidateInputCount.splice(idx, 1);

    if (arr[parentIdx].candidateInputCount.length === 0) {
      arr[parentIdx].candidateInputCount = [{ name: "" }];
      setResourceInputCount(arr);
    } else {
      setResourceInputCount(arr);
    }
  };

  const removeElectionInput = (item, idx) => {
    const arr = [...resourceInputCount];
    arr.splice(idx, 1);

    if (arr.length === 0) {
      setResourceInputCount([{ name: "" }]);
    } else {
      setResourceInputCount(arr);
    }
  };

  const onClose = () => setSuccessResponse();

  const onChangeCandidateBio = (e, idx, parentIdx) => {
    const { value } = e.target;

    const obj = [...resourceInputCount];

    obj[parentIdx].candidateInputCount[idx].bio = value;
    setResourceInputCount(obj);
  };

  const setCandidateArr = (data, idx, parentIdx) => {
    const obj = [...resourceInputCount];
    obj[parentIdx].candidateInputCount[idx] = data;
    setResourceInputCount(obj);
  };

  const handlePreview = async (file, idx, parentIdx) => {
    const obj = [...resourceInputCount];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    obj[parentIdx].candidateInputCount[idx].previewImage =
      file.url || file.preview;
    setResourceInputCount(obj);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const beforeUpload = (file, idx, parentIdx) => {
    const obj = [...resourceInputCount];
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.warning("You can only upload JPG/PNG file!");
      // message.warning()
    }
    const isLt10M = (Math.round(+file.size / 1024) / 1000).toFixed(2);

    if (isLt10M > 10) {
      message.warning("Image must smaller than 10MB!");
    }

    if (isLt10M && isJpgOrPng) {
      // setDefaultBannerUrl("");

      obj[parentIdx].candidateInputCount[idx].photo = [file];
      // setLogoFileList((prev) => [...prev, file]);
      setResourceInputCount(obj);
    } else {
      // setLogoFileList([]);
      obj[parentIdx].candidateInputCount[idx].photo = [];
    }

    return false;
  };

  const onChangeCandidatePhoto = (file, idx, parentIdx) => {
    console.log({ remove: idx, parentIdx });
    const obj = [...resourceInputCount];

    obj[parentIdx].candidateInputCount[idx].photo = [];
    setResourceInputCount(obj);
  };

  const onChangeCandidate = (e, idx, parentIdx) => {
    const { value } = e.target;

    const obj = [...resourceInputCount];

    obj[parentIdx].candidateInputCount[idx].name = value;
    setResourceInputCount(obj);
  };
  const settingPicker = (e, name) => {
    if (name === "isCompulsory") {
      setIcompulsory(e.target.checked ? 1 : 0);
    }

    if (name === "multipleRound") {
      setAllowMultipleRound(e.target.checked ? 1 : 0);
    }
  };
  const onChangeText = (e, idx) => {
    const { value } = e.target;

    const obj = [...resourceInputCount];

    obj[idx].title = value;
    setResourceInputCount(obj);
  };

  const addNewCandidateInput = (idx) => {
    const obj = [...resourceInputCount];
    const candidateArr = obj[idx].candidateInputCount;
    obj[idx].candidateInputCount = [...candidateArr, { name: "" }];
    setResourceInputCount(obj);
  };

  const topCandidateHandler = (e) => {
    setMultipleRoundType(e.target.value);
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      // f (toIndex < 0) return; // Ignores if outside designated area

      console.log({ fromIndex, toIndex });
      const obj = [...resourceInputCount];
      console.log({ obj });
      const item = obj.splice(fromIndex, 1)[0];
      console.log({ item });
      obj.splice(toIndex, 0, item);
      setResourceInputCount(obj);
    },
    nodeSelector: ".resolution-drag",
    handleSelector: ".resolution-drag-handle",
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.electionWrapper}>
        <div
          className={style.leftForm}
          style={{
            marginTop: "30px",
            padding: "10px",
          }}
        >
          <ReactDragListView {...dragProps}>
            {resourceInputCount.length > 0 &&
              resourceInputCount.map((item, idx) => (
                <ResolutionSelection
                  key={idx}
                  //    addResolution={addResources}
                  item={item}
                  loading={loading}
                  register={register}
                  errors={errors}
                  titleError={titleError}
                  addNewElection={(item) =>
                    setResourceInputCount([
                      ...resourceInputCount,
                      {
                        title: "",
                        candidateInputCount: [
                          { name: "", bio: "", photo: [], previewImage: "" },
                          { name: "", bio: "", photo: [], previewImage: "" },
                          { name: "", bio: "", photo: [], previewImage: "" },
                          { name: "", bio: "", photo: [], previewImage: "" },
                        ],
                      },
                    ])
                  }
                  removeElectionInput={() => removeElectionInput(item, idx)}
                  removeInput={(item, childIdx) =>
                    removeInput(item, childIdx, idx)
                  }
                  resourceInputCount={resourceInputCount}
                  onChangeText={(e) => onChangeText(e, idx)}
                  parentIdx={idx}
                  addCandidates={addCandidates}
                  addNewCandidateInput={(idx) => addNewCandidateInput(idx)}
                  onChangeCandidate={(e, childIdx) =>
                    onChangeCandidate(e, childIdx, idx)
                  }
                  onChangeCandidateBio={(e, childIdx) =>
                    onChangeCandidateBio(e, childIdx, idx)
                  }
                  onRemovePhoto={(file, childIdx) =>
                    onChangeCandidatePhoto(file, childIdx, idx)
                  }
                  onPreview={(file, childIdx) =>
                    handlePreview(file, childIdx, idx)
                  }
                  beforeUpload={(file, childIdx) =>
                    beforeUpload(file, childIdx, idx)
                  }
                  setCandidateArr={(data, childIdx) =>
                    setCandidateArr(data, childIdx, idx)
                  }
                />
              ))}
          </ReactDragListView>
        </div>
        <div className={style.rightForm}>
          <div>
            <div
              className={style.topCandidate}
              style={{ marginBottom: "15px" }}
            >
              <Radio.Group
                name="radiogroup"
                className={style.topCandidate}
                style={{ display: "flex" }}
                onChange={(e) => setDateType(e.target.value)}
              >
                <Radio value="startEnd">
                  <div className={style.form__label_text}>
                    <div className={style.form__label_title}>
                      Select start & end date.
                    </div>
                  </div>
                </Radio>
                <Radio value="duration">
                  <div className={style.form__label_text}>
                    <div className={style.form__label_title}>
                      Select the time duration for the vote
                    </div>
                  </div>
                </Radio>
              </Radio.Group>
            </div>

            {dateType === "duration" && (
              <div className={style.form__input_wrap}>
                <div className={style.form__input_inline}>
                  <div className={style.form__input_box}>
                    <label
                      className={style.form__input_label}
                      htmlFor="firstName"
                    >
                      Duration
                      <span
                        style={{
                          color:
                            startDateError && startDateError.errorMsg
                              ? "#ef3125"
                              : "#8d8d8d",
                        }}
                      >
                        &nbsp;*
                      </span>
                    </label>
                    <CustomDatePicker
                      showTime={true}
                      showDate={false}
                      actualTime={duration}
                      timeHandler={durationTimeHandle}
                    />
                  </div>
                </div>
              </div>
            )}

            {dateType === "startEnd" && (
              <div className={style.form__input_wrap}>
                <div className={style.form__input_inline}>
                  <div className={style.form__input_box}>
                    <label
                      className={style.form__input_label}
                      htmlFor="firstName"
                    >
                      Start Date
                      <span
                        style={{
                          color:
                            startDateError && startDateError.errorMsg
                              ? "#ef3125"
                              : "#8d8d8d",
                        }}
                      >
                        &nbsp;*
                      </span>
                    </label>
                    <CustomDatePicker
                      showTime={true}
                      value={unformattedStartDate}
                      actualTime={startTime}
                      disabledDate={disabledDate}
                      timeHandler={startTimeHandle}
                      dateHandler={(date) => dateHandler(date, "startDate")}
                      //   disabledHours={() => getDisabledStartTime(moment(), "HH")}
                      //    disabledMinutes={() => getDisabledStartTime(moment(), "mm")}
                    />
                    <span className={style.validation__error}>
                      {startDateError.errorMsg}
                    </span>
                  </div>
                  <div className={style.form__input_box}>
                    <label
                      htmlFor="endDate"
                      className={style.form__input_label}
                    >
                      End Date
                      <span
                        style={{
                          color:
                            startDateError && startDateError.errorMsg
                              ? "#ef3125"
                              : "#8d8d8d",
                        }}
                      >
                        &nbsp;*
                      </span>
                    </label>
                    <CustomDatePicker
                      showTime={true}
                      value={unformattedEndDate}
                      actualTime={endTime}
                      disabledDate={disabledEndDate}
                      timeHandler={endTimeHandler}
                      dateHandler={(date) => dateHandler(date, "endDate")}
                      disabledHours={() => getDisabledEndTime(startTime, "HH")}
                      disabledMinutes={() =>
                        getDisabledEndTime(startTime, "mm")
                      }
                    />

                    <span className={style.validation__error}>
                      {endDateError.errorMsg}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className={style.settingWrapper}>
              <div className={style.settingList}>
                <SettingsCheckbox
                  key={shortid.generate()}
                  name="multipleRound"
                  title="Allow multiple-round election"
                  description="Allow multiple round election where there are many candidates for an election"
                  checked={allowMultipleRound}
                  settingPicker={(val) => settingPicker(val, "multipleRound")}
                />
              </div>
            </div>
            {allowMultipleRound ? (
              <div className={style.settingWrapper}>
                <div className={style.topCandidate}>
                  <Radio.Group
                    name="radiogroup"
                    className={style.topCandidate}
                    style={{ display: "flex" }}
                    onChange={topCandidateHandler}
                  >
                    <Radio value={4}>
                      <div className={style.form__label_text}>
                        <div className={style.form__label_title}>
                          Top 4 Candidates
                        </div>
                        <p className={style.form__label_content}>
                          Only top 4 candidates will appear in the next round .
                        </p>
                      </div>
                    </Radio>
                    <Radio value={8}>
                      <div className={style.form__label_text}>
                        <div className={style.form__label_title}>
                          Top 8 Candidates
                        </div>
                        <p className={style.form__label_content}>
                          Only top 8 candidates will appear in the next round .
                        </p>
                      </div>
                    </Radio>
                  </Radio.Group>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div>
        <button disabled={loading} className="btn-gray">
          {loading ? <Spin size="large" color="#fff" /> : " Create Election"}
        </button>
        {successResponse && (
          <Alert
            message={successResponse.message}
            type="success"
            showIcon
            closable
            onClose={onClose}
          />
        )}
        {errorResponse &&
          errorResponse.map((item) => (
            <Alert
              key={shortid.generate()}
              message={item}
              type="error"
              showIcon
              closable
              onClose={errorClose}
            />
          ))}
      </div>
    </form>
  );
};

const Candidate = ({
  removeInput,
  item,
  onChange,
  inputRef,
  placeholder,
  onChangeCandidateBio,
  setCandidateArr,
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  const [bio, setBio] = useState();
  const [name, setName] = useState();
  const [photos, setPhotos] = useState({ photo: "", previewImage: "" });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPhotos({ ...photos, previewImage: file.url || file.preview });
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleOpenModal = () => {
    setName(item.name);
    setBio(item.bio);
    setPhotos({ photo: item.photo, previewImage: item.previewImage });
    setOpenEditModal(true);
  };

  const beforeUpload = async (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.warning("You can only upload JPG/PNG file!");
      // message.warning()
    }
    const isLt10M = (Math.round(+file.size / 1024) / 1000).toFixed(2);

    if (isLt10M > 10) {
      message.warning("Image must smaller than 10MB!");
    }

    if (isLt10M && isJpgOrPng) {
      // setDefaultBannerUrl("");
      setPhotos({
        ...photos,
        photo: [file],
        previewImage: await getBase64(file),
      });
    } else {
      setPhotos({ ...photos, photo: [] });
    }

    return false;
  };

  const onRemovePhoto = () => {
    setPhotos({ ...photos, photo: [] });
  };

  const submitForm = () => {
    if (!name || !bio || !photos.photo.length) {
      message.warn("Please fill all missing fields");
    } else {
      const req = {
        name,
        bio,
        photo: photos.photo,
        previewImage: photos.previewImage,
      };
      console.log({ req });
      setCandidateArr(req);
      setPhotos({ photo: "", previewImage: "" });
      setName();
      setBio();
      setOpenEditModal(false);
    }
  };

  return (
    <>
      <LeftDrawerModal
        visible={openEditModal}
        destroyOnClose={true}
        drawerWidth={"30%"}
        closeModal={() => setOpenEditModal(false)}
        tagName="Edit profile"
        headerTitle=""
        modalHeight="100vh"
        top={"30px"}
        left={"-420px"}
      >
        <div className={style.editProfileCont}>
          <div className={style.headerProfile}>
            {photos && photos.previewImage ? (
              <div className={style.imageCont}>
                <img
                  src={photos.previewImage}
                  className={style.candidProfile}
                />
                <span className={style.removeImageic}>
                  <MdClose
                    size={25}
                    color="gray"
                    onClick={() =>
                      setPhotos({ ...photos, previewImage: "", photo: [] })
                    }
                  />
                </span>
              </div>
            ) : (
              <Dragger
                onPreview={handlePreview}
                beforeUpload={beforeUpload}
                onRemove={onRemovePhoto}
                style={{ width: "100%" }}
                name="avatar"
                listType="picture-card"
                className="avatar-uploader-photo"
                accept=".png,.jpg,.jpeg"
                maxCount={1}
              >
                <img
                  src={
                    photos.previewImage ||
                    "https://res.cloudinary.com/solomonfrank/image/upload/v1655940354/apems/user_oardue.jpg"
                  }
                  className={style.candidProfile}
                />
              </Dragger>
            )}

            <div className={style.candidName}>
              <input
                type="text"
                placeholder="John Doe"
                className={style.candidInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span>
                <FiEdit2 />
              </span>
            </div>
          </div>
          <div className={style.cand_text_wrap}>
            <label className={style.editCandLabel} htmlFor="firstName">
              Candidate Biography
              <span
                style={{
                  color: "#ef3125",
                }}
              >
                &nbsp; (required)
              </span>
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter Brief Bio"
              className={style.cand_text}
              rows={9}
            />
          </div>

          <div className={style.submitprof}>
            <button
              type="button"
              onClick={submitForm}
              className={style.btnGray}
            >
              Submit
            </button>
          </div>
        </div>
      </LeftDrawerModal>
      {/* <div className={style.input_box}>
        <input
          className={style.form__input}
          type="text"
          placeholder={placeholder}
          name="actions"
          value={item.name}
          onChange={onChange}
          required
        />
        <span
          className={style.input_box_trash}
          onClick={() => removeInput(item)}
        >
          <FiTrash size={20} />
        </span>
      </div> */}
      <div className={style.bio}>
        <div className={style.candidWrap}>
          <img
            src={
              item.previewImage ||
              "https://res.cloudinary.com/solomonfrank/image/upload/v1655940354/apems/user_oardue.jpg"
            }
            className={style.candidPhoto}
          />
          <div className={style.candInfoCont}>
            <span className={style.candidName}>
              {item.name || "New Candidate"}
            </span>
            <span className={style.editProf} onClick={() => handleOpenModal()}>
              Edit Profile
            </span>
          </div>
          <span
            className={style.input_box_trash}
            onClick={() => removeInput(item)}
          >
            <FiTrash size={20} color="#acb3bd" />
          </span>
        </div>
      </div>
    </>
  );
};

const ResolutionSelection = ({
  register,
  addResolution,
  errors,
  handleStatutry,
  onChangeText,
  titleError,
  resourceInputCount,
  removeInput,
  onChangeCandidate,
  candidateInputCount,
  addCandidates,
  item,
  parentIdx,
  addNewCandidateInput,
  addNewElection,
  removeElectionInput,
  onChangeCandidateBio,
  onPreview,
  beforeUpload,
  onRemovePhoto,
  setCandidateArr,
}) => {
  return (
    <div className="resolution-drag">
      <div className={style.form__input_wrap} style={{ position: "relative" }}>
        {resourceInputCount.length > 1 && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "1rem",
              position: "absolute",
              right: 0,
              top: "-10px",
            }}
            className={style.input_box_trash}
            onClick={() => removeElectionInput(item)}
          >
            <span className="resolution-drag-handle">
              <RiDragMove2Fill size={20} /> &nbsp;
            </span>
            <ImCancelCircle size={20} />
          </span>
        )}
        <div className={style.form__input_box}>
          <label htmlFor="question" className={style.form__input_label}>
            Election Position
            <span style={{ color: titleError.error ? "#ef3125" : "#8d8d8d" }}>
              &nbsp;*
            </span>
          </label>
          <input
            className={style.form__input}
            type="text"
            placeholder="President"
            name="resolutionTitle"
            value={item?.title}
            onChange={onChangeText}
            required
          />
          <span className={style.validation__error}>
            {titleError?.errorMsg}
          </span>
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="question" className={style.form__input_label}>
            Election Candidates
            <span style={{ color: "#EF3125", marginLeft: ".5rem" }}></span>
          </label>

          {item &&
            item.candidateInputCount.length > 0 &&
            item.candidateInputCount.map((item, idx) => (
              <Candidate
                key={idx}
                addCandidates={() => addCandidates(item, idx, parentIdx)}
                removeInput={() => removeInput(item, idx, parentIdx)}
                onChange={(e) => onChangeCandidate(e, idx, parentIdx)}
                item={item}
                onPreview={(file) => onPreview(file, idx, parentIdx)}
                beforeUpload={(file) => beforeUpload(file, idx, parentIdx)}
                onRemovePhoto={(file) => onRemovePhoto(file, idx, parentIdx)}
                placeholder={`Candidate ${idx + 1}`}
                onChangeCandidateBio={(e) =>
                  onChangeCandidateBio(e, idx, parentIdx)
                }
                setCandidateArr={(data) =>
                  setCandidateArr(data, idx, parentIdx)
                }
              />
            ))}
          <div className={style.resolutionSubBtn}>
            <div className={style.resolutionSubBtn_left}>
              <Tooltip placement="right" title="Add new candidate">
                <button
                  type="button"
                  onClick={() => addNewCandidateInput(parentIdx, { name: "" })}
                  className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
                >
                  <FiPlus className={style.uploadIcon} size={18} />
                </button>
              </Tooltip>
            </div>
            <div className={style.createStatus} onClick={addNewElection}>
              Create New Election
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionForm;
