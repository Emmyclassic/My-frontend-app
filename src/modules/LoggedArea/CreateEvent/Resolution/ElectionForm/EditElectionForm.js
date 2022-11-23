import { Alert, Radio, Spin, Tooltip, Upload, message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiTrash, FiEdit2 } from "react-icons/fi";
import shortid from "shortid";
import { MdClose } from "react-icons/md";

import { updateElectionHandler } from "../../../../../api/resolutionHandler";
import CustomDatePicker from "../../../../../components/DatePicker";
import DeleteModal from "../../../../../components/DeleteModal";
import SettingsCheckbox from "../../../../../components/FormInput/Checkbox";
import LeftDrawerModal from "../../../../../components/LeftDrawerModal";
import style from "../ResolutionForm/index.module.scss";
import { uploadFile } from "../../../../../api/eventHandler";

const { Dragger } = Upload;
const EditElectionForm = ({
  resolutionOpen,
  closeReolutionModal,
  settings,
  resolutionHeader,
  resolutionType,
  showDelete = false,
  type = "Question",
  openResolutionModal,
  action = "Election Candidates",
  actionPlaceholder = ["For", "Against", "Abstain"],
  typePlaceholder = "e.g How's your day going?",
  createShotcut = "Create Statutory Resolution",
  reload,
  item,
  setEditQuestionaaireModal,
  removeElection,
  reloadElection,
  closeEditElectionModal,
  eventDetail,
}) => {
  const [election, setElection] = useState(item);
  const [candidateList, setCandidateList] = useState([]);
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [multipleRoundType, setMultipleRoundType] = useState();
  const [startDate, setStartDate] = useState(
    moment(item?.starts_at, "DD-MM-YYYY").format("DD/MM/YYYY")
  );
  const [endDate, setEndDate] = useState(
    moment(item?.ends_at, "DD-MM-YYYY").format("DD/MM/YYYY")
  );
  const [unformattedStartDate, setUnformattedStartDate] = useState();
  const [startTime, setStartTime] = useState(
    moment(item?.starts_at, "DD-MM-YYYY HH:mm:ss")
  );
  const [endTime, setEndTime] = useState(
    moment(item?.ends_at, "DD-MM-YYYY HH:mm:ss")
  );
  const [duration, setDuration] = useState(moment(item?.duration, "HH:mm"));

  const [deleteResolutionOpen, setDeleteResolutionOpen] = useState(false);

  const [candidateInputCount, setCandidateInputCount] = useState(
    item?.candidates ?? [
      { name: "", bio: "", photo: [], previewImage: "" },
      { name: "", bio: "", photo: [], previewImage: "" },
      { name: "", bio: "", photo: [], previewImage: "" },
    ]
  );

  const { handleSubmit } = useForm();

  useEffect(() => {
    setElection(item);
    setCandidateInputCount(item?.candidates);
  }, [item]);

  const errorClose = () => setErrorResponse();

  const removeQuestionFunc = () => {
    setDeleteResolutionOpen(false);
    removeElection();
  };

  const cancelDelete = () => {
    setEditQuestionaaireModal(true);
    setDeleteResolutionOpen(false);
  };

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
    } else {
      setEndDate(date.format("DD/MM/YYYY"));
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
  const postElection = async (payload) => {
    try {
      const { data } = await updateElectionHandler(payload, election.id);
      setSuccessResponse(data);
      setLoading(false);

      if (reloadElection) {
        reloadElection();
      }
      if (closeEditElectionModal) {
        closeEditElectionModal();
      }
    } catch (err) {
      const {
        data: { errors },
      } = err.response;
      const errorArr = Object.values(errors);

      setErrorResponse(errorArr);
      setLoading(false);
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

  const getDisabledStartTime = (date, format) => {
    const hoursArr = [];
    const hours = moment(date).format(`${format}`);
    for (let i = 0; i < hours; i++) {
      hoursArr.push(i);
    }
    return hoursArr;
  };

  const validateCandidate = () => {
    let exit_loops = true;

    for (let i = 0; i < candidateInputCount.length; i++) {
      const cand = candidateInputCount[i];
      if (!cand.bio || !cand.name || !cand.photo.length) {
        exit_loops = false;
        break;
      }

      if (exit_loops === false) {
        break;
      }
    }
    return exit_loops;
  };

  const onSubmit = async (data) => {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
    const start = `${startDate} ${moment(startTime).format("HH:mm:ss")}`;
    const end = `${endDate} ${moment(endTime).format("HH:mm:ss")}`;

    console.log({ candidateInputCount });

    if (validateCandidate()) {
      try {
        setLoading(true);
        const candidateRes = await Promise.all(
          candidateInputCount.map(async (data) => {
            let photourl;

            if (typeof data.photo === "string") {
              photourl = data.photo;
            } else {
              const result = await uploadFile({
                file: data.photo[0],
                file_name: data.name,
              });
              photourl = result.data.data.file_link;
            }

            return {
              name: data.name,
              bio: data.bio,
              photo: photourl,
            };
          })
        );

        const payload = {
          candidates: candidateRes,
          position: election.position,
          is_compulsory: election.is_compulsory ? 1 : 0,
          event_id: eventDetail ? eventDetail.id : currentEvent.id,
          allow_multiple_round: election.allow_multiple_round ? 1 : 0,
          starts_at: start,
          multiple_round_type:
            multipleRoundType || election.multiple_round_type,

          ends_at: end,
        };

        console.log({ payload, postElection });
        postElection(payload);
      } catch (err) {
        setLoading(false);
      }
    } else {
      message.error("Please fill candidate details");
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

  const onClose = () => setSuccessResponse();

  useEffect(() => {
    if (successResponse) {
      setTimeout(() => {
        setSuccessResponse();
      }, 500);
    }
  }, [successResponse]);

  const onChangeCandidateBio = (e, idx, parentIdx) => {
    const { value } = e.target;

    const obj = [...candidateInputCount];

    obj[idx].bio = value;
    setCandidateInputCount(obj);
  };

  const onPreview = async (file, idx) => {
    const obj = [...candidateInputCount];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    obj[idx].previewImage = file.url || file.preview;
    setCandidateInputCount(obj);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const beforeUpload = (file, idx) => {
    const obj = [...candidateInputCount];
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

      obj[idx].photo = [file];
      // setLogoFileList((prev) => [...prev, file]);
      setCandidateInputCount(obj);
    } else {
      // setLogoFileList([]);
      obj[idx].photo = [];
      setCandidateInputCount(obj);
    }

    return false;
  };

  const onRemovePhoto = (file, idx) => {
    const obj = [...candidateInputCount];

    obj[idx].photo = [];
    setCandidateInputCount(obj);
  };

  const onChange = (e, idx) => {
    const { value } = e.target;

    const obj = [...candidateInputCount];

    obj[idx].name = value;
    setCandidateInputCount(obj);
  };
  const settingPicker = (e, name) => {
    if (name === "isCompulsory") {
      setElection({
        ...election,
        is_compulsory: e.target.checked ? 1 : 0,
      });
    }

    if (name === "multipleRound") {
      setElection({
        ...election,
        allow_multiple_round: e.target.checked ? 1 : 0,
      });
    }
  };

  const multipleRoundTypeHandler = (e) => {
    setMultipleRoundType(e.target.value);
  };

  const setCandidateArr = (data, idx) => {
    const obj = [...candidateInputCount];
    console.log({ iriri: obj });
    obj[idx] = data;
    setCandidateInputCount(obj);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.electionWrapper}>
        <div className={style.leftForm}>
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <label htmlFor="question" className={style.form__input_label}>
                Election Position
                <span
                  style={{
                    color: "#ef3125",
                  }}
                >
                  *
                </span>
              </label>

              <input
                className={style.form__input}
                type="text"
                placeholder="President"
                name="resolutionTitle"
                value={election.position}
                onChange={(e) =>
                  setElection({ ...election, position: e.target.value })
                }
              />
            </div>
          </div>
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <label htmlFor="question" className={style.form__input_label}>
                {action}
                <span
                  style={{
                    color: "#ef3125",
                  }}
                >
                  *
                </span>
              </label>
              {candidateInputCount.length > 0 &&
                candidateInputCount.map((item, idx) => (
                  <Candidate
                    key={idx}
                    addCandidates={addCandidates}
                    removeInput={() => removeInput(item, idx)}
                    onChange={(e) => onChange(e, idx)}
                    item={item}
                    placeholder={`Candidate ${idx + 1}`}
                    onPreview={(file) => onPreview(file, idx)}
                    beforeUpload={(file) => beforeUpload(file, idx)}
                    onRemovePhoto={(file) => onRemovePhoto(file, idx)}
                    onChangeCandidateBio={(e) => onChangeCandidateBio(e, idx)}
                    setCandidateArr={(data) => setCandidateArr(data, idx)}
                  />
                ))}
            </div>
            <div className={style.resolutionSubBtn}>
              <div className={style.resolutionSubBtn_left}>
                <Tooltip placement="right" title="Add new candidate">
                  <button
                    type="button"
                    onClick={() =>
                      setCandidateInputCount([
                        ...candidateInputCount,
                        {
                          name: "",
                          bio: "",
                          photo: [],
                          previewImage:
                            "https://res.cloudinary.com/solomonfrank/image/upload/v1655940354/apems/user_oardue.jpg",
                        },
                      ])
                    }
                    className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
                  >
                    <FiPlus className={style.uploadIcon} size={18} />
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className={style.rightForm}>
          <div>
            {election && election.duration && (
              <div className={style.form__input_wrap}>
                <div className={style.form__input_inline}>
                  <div className={style.form__input_box}>
                    <label
                      className={style.form__input_label}
                      htmlFor="firstName"
                    >
                      Duration
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
            {election && election.starts_at && (
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
                          color: "#ef3125",
                        }}
                      >
                        &nbsp;*
                      </span>
                    </label>
                    <CustomDatePicker
                      showTime={true}
                      actualTime={startTime}
                      // actualTime={moment(election?.starts_at, "HH:mm:ss")}
                      dateValue={moment(election?.starts_at, "DD-MM-YYYY")}
                      disabledDate={disabledDate}
                      timeHandler={startTimeHandle}
                      dateHandler={(date) => dateHandler(date, "startDate")}
                      disabledHours={() => getDisabledStartTime(moment(), "HH")}
                      disabledMinutes={() =>
                        getDisabledStartTime(moment(), "mm")
                      }
                    />
                  </div>
                  <div className={style.form__input_box}>
                    <label
                      htmlFor="endDate"
                      className={style.form__input_label}
                    >
                      End Date
                      <span
                        style={{
                          color: "#ef3125",
                        }}
                      >
                        &nbsp;*
                      </span>
                    </label>
                    <CustomDatePicker
                      showTime={true}
                      actualTime={endTime}
                      dateValue={moment(election?.ends_at, "DD-MM-YYYY")}
                      disabledDate={disabledEndDate}
                      timeHandler={endTimeHandler}
                      dateHandler={(date) => dateHandler(date, "endDate")}
                      disabledHours={() => getDisabledEndTime(startTime, "HH")}
                      disabledMinutes={() =>
                        getDisabledEndTime(startTime, "mm")
                      }
                    />
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
                  description="Only users added to the attendant list will get to see
            the poll and answer, users not in the attendant won't
            able to access the poll"
                  checked={election.allow_multiple_round}
                  settingPicker={(val) => settingPicker(val, "multipleRound")}
                />
              </div>
            </div>
            {election && election.allow_multiple_round ? (
              <div className={style.settingWrapper}>
                <div className={style.topCandidate}>
                  <Radio.Group
                    name="radiogroup"
                    className={style.topCandidate}
                    style={{ display: "flex" }}
                    defaultValue={election.multiple_round_type}
                    onChange={multipleRoundTypeHandler}
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

      <div className={style.btnWrapper}>
        <button type="submit" disabled={loading} className="btn-gray">
          {loading ? <Spin size="large" color="#fff" /> : "Update Election"}
        </button>
        <button
          type="button"
          onClick={() => setDeleteResolutionOpen(true)}
          className="btn-gray btn-del"
        >
          Delete
        </button>
      </div>
      <LeftDrawerModal
        visible={deleteResolutionOpen}
        closeModal={() => setDeleteResolutionOpen(false)}
      >
        <DeleteModal
          deleteBtnText="Yes, Delete Question"
          HeaderTitle="Delete Question?"
          desc={`You're about to delete this question, are you sure?`}
          cancelDelete={cancelDelete}
          deleteHandler={removeQuestionFunc}
        />
      </LeftDrawerModal>
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
    </form>
  );
};

const Candidate = ({
  removeInput,
  item,
  onChange,
  inputRef,
  placeholder,
  setCandidateArr,
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  console.log({ item });

  const [bio, setBio] = useState(item.bio);
  const [name, setName] = useState(item.name);
  const [photos, setPhotos] = useState({
    photo: item.photo,
    previewImage: item.photo.length ? item.photo : "",
  });

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
      setOpenEditModal(false);
    }
  };

  return (
    <>
      <LeftDrawerModal
        visible={openEditModal}
        // destroyOnClose={true}
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
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940354/apems/user_oardue.jpg"
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
      <div className={style.bio}>
        <div className={style.candidWrap}>
          <img
            src={
              item.previewImage ||
              item.photo ||
              "https://res.cloudinary.com/solomonfrank/image/upload/v1655940354/apems/user_oardue.jpg"
            }
            className={style.candidPhoto}
          />
          <div className={style.candInfoCont}>
            <span className={style.candidName}>
              {item.name || "New Candidate"}
            </span>
            <span
              className={style.editProf}
              onClick={() => setOpenEditModal(true)}
            >
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
      {/* <div className={style.input_box}>
        <input
          className={style.form__input}
          type="text"
          placeholder={placeholder}
          name="actions"
          value={item.name}
          onChange={onChange}
        />
        <span
          className={style.input_box_trash}
          onClick={() => removeInput(item)}
        >
          <FiTrash size={20} />
        </span>
      </div>
      <div className={style.bio}>
        <div className={`${style.form__input_wrap} ${style.cand_photo}`}>
          <div className={style.form__input_box}>
            <span className={style.validation__error}></span>
            <Dragger
              onPreview={onPreview}
              beforeUpload={beforeUpload}
              onRemove={onRemovePhoto}
              style={{ width: "100%" }}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              accept=".png,.jpg,.jpeg"
              maxCount={1}
              // defaultFileList={item.photo}
            >
              <UploadButton />
            </Dragger>
            {typeof item.photo === "string" && (
              <img
                src={item.photo}
                width={100}
                height={100}
                style={{ objectFit: "contain" }}
              />
            )}
          </div>
        </div>

        <div className={style.cand_text_wrap}>
          <textarea
            value={item.bio}
            onChange={onChangeCandidateBio}
            placeholder="bio"
            className={style.cand_text}
            rows={9}
          />
        </div>
      </div> */}
    </>
  );
};

export default EditElectionForm;
