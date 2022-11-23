// import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Spin, Switch, Tooltip, Radio } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactDragListView from "react-drag-listview";
import { FiPlus } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { RiDragMove2Fill } from "react-icons/ri";
import shortid from "shortid";
import { resolutionHandler } from "../../../../../api/resolutionHandler";
import CustomDatePicker from "../../../../../components/DatePicker";
import SettingsCheckbox from "../../../../../components/FormInput/Checkbox";
import style from "./index.module.scss";

const ResolutionForm = ({
  openResolutionModal,
  action,
  handleStatutry,
  closeModal,
  reload,
  eventDetail,
}) => {
  const [votingPower, setVotingPower] = useState(false);
  const [oneManVote, setOneManVote] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attendedOnly, setAttendedOnly] = useState(1);
  const [splitVoting, setSplitVoting] = useState();
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [titleError, setTitleError] = useState(false);
  const [dateType, setDateType] = useState();
  const [duration, setDuration] = useState();
  const [unformattedEndDate, setUnformattedEndDate] = useState();
  const [resourceInputCount, setResourceInputCount] = useState([
    { title: "", shortDescription: "" },
  ]);
  const [unformattedStartDate, setUnformattedStartDate] = useState();
  const [endDateError, setEndDateError] = useState({
    errorMsg: "",
    error: false,
  });
  const [startDateError, setStartDateError] = useState({
    errorMsg: "",
    error: false,
  });
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(createResolutionSchema),
  });

  console.log("errors", errors);

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

  // const getDisabledStartTime = (date, format) => {
  //   const hoursArr = [];
  //   const hours = moment(date).format(`${format}`);
  //   for (let i = 0; i < hours; i++) {
  //     hoursArr.push(i);
  //   }
  //   return hoursArr;
  // };

  const postResolution = async (payload) => {
    try {
      const { data } = await resolutionHandler(payload);
      setSuccessResponse(data);
      setLoading(false);
      reset({ resolutionTitle: "" });
      setEndDateError();
      setErrorResponse();
      setEndDate();
      setStartTime();
      setEndTime();
      setStartDate();
      setVotingPower();
      setDuration();
      setDateType();
      setOneManVote();
      setSplitVoting();
      setAttendedOnly();
      setUnformattedEndDate();
      setUnformattedStartDate();
      setResourceInputCount([{ title: "", shortDescription: "" }]);
      if (reload) {
        reload();
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

  const disabledEndDate = (current) => {
    return current && current < moment(unformattedStartDate, "YYYY-MM-DD");
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

    if (dateType === "startEnd" && !startDate) {
      setStartDateError({
        error: true,
        errorMsg: "Start Date is required",
      });
      clean = false;
    } else {
      setStartDateError({
        error: false,
        errorMsg: "",
      });
      clean = true;
    }
    if (dateType === "startEnd" && !endDate) {
      setEndDateError({
        error: true,
        errorMsg: "End Date is required",
      });
      clean = false;
    } else {
      setEndDateError({
        error: false,
        errorMsg: "",
      });
      clean = true;
    }

    return clean;
  };

  const onSubmit = async (data) => {
    // if (!startDate) {
    //   setStartDateError({
    //     error: true,
    //     errorMsg: "Start Date is required",
    //   });
    //   return;
    // } else {
    //   setStartDateError({
    //     error: false,
    //     errorMsg: "",
    //   });
    // }
    // if (!endDate) {
    //   setEndDateError({
    //     error: true,
    //     errorMsg: "End Date is required",
    //   });
    //   return;
    // } else {
    //   setEndDateError({
    //     error: false,
    //     errorMsg: "",
    //   });
    // }

    if (validateField()) {
      const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
      const start = `${startDate} ${moment(startTime).format("HH:mm:ss")}`;
      const end = `${endDate} ${moment(endTime).format("HH:mm:ss")}`;

      const transResourceInputCount = resourceInputCount.map((item) => {
        const finalPayload = {
          title: item.title,
          short_title: item.shortDescription,
          use_one_vote: oneManVote ? 1 : 0,
          use_shares: votingPower ? 1 : 0,
          allow_physical: 0,
          attendees_only: attendedOnly,
          allow_split_voting: splitVoting,
          event_id: eventDetail ? eventDetail.id : currentEvent.id,
        };

        if (dateType === "startEnd") {
          finalPayload.starts_at = start;
          finalPayload.ends_at = end;
        } else {
          finalPayload.duration = moment(duration).format("HH:mm");
        }

        return finalPayload;
      });

      const requestBody = {
        resolutions: transResourceInputCount,
      };
      setLoading(true);
      postResolution(requestBody);
    }
  };

  const durationTimeHandle = (val) => {
    setDuration(val);
  };

  const settingPicker = (e, name) => {
    if (name === "attended") {
      setAttendedOnly(e.target.checked ? 1 : 0);
    }

    if (name === "splitVoting") {
      setSplitVoting(e.target.checked ? 1 : 0);
    }
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
      setUnformattedEndDate(date);
      setEndDate(date.format("DD/MM/YYYY"));
    }
  };

  const onClose = () => setSuccessResponse();

  useEffect(() => {
    if (successResponse) {
      if (closeModal) {
        closeModal();
      }
    }
  }, [successResponse]);

  const errorClose = () => setErrorResponse();

  const handlerShareVote = (status) => {
    setOneManVote(!status);

    setVotingPower(status);
  };
  const handleOneVote = (status) => {
    setVotingPower(!status);
    setOneManVote(status);
  };

  const startTimeHandle = (val) => {
    setStartTime(moment(val, "HH:MM"));
  };

  const endTimeHandler = (val) => {
    setEndTime(val);
  };

  const onChangeText = (e, idx) => {
    const { value } = e.target;

    const obj = [...resourceInputCount];

    obj[idx].title = value;
    setResourceInputCount(obj);
  };
  const onChangeShortDescription = (e, idx) => {
    const { value } = e.target;

    const obj = [...resourceInputCount];

    obj[idx].shortDescription = value;
    setResourceInputCount(obj);
  };

  const removeInput = (item, idx) => {
    const arr = [...resourceInputCount];
    arr.splice(idx, 1);

    if (arr.length === 0) {
      setResourceInputCount([{ name: "" }]);
    } else {
      setResourceInputCount(arr);
    }
  };
  useEffect(() => {
    if (successResponse) {
      setTimeout(() => {
        setResourceInputCount([{ title: "", shortDescription: "" }]);

        setSuccessResponse();
      }, 500);
    }
  }, [successResponse]);

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
      <div style={{ marginTop: "30px" }}>
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
                handleStatutry={handleStatutry}
                addResolution={(item) =>
                  setResourceInputCount([...resourceInputCount, { title: "" }])
                }
                removeInput={() => removeInput(item, idx)}
                resourceInputCount={resourceInputCount}
                onChangeText={(e) => onChangeText(e, idx)}
                onChangeShortDescription={(e) =>
                  onChangeShortDescription(e, idx)
                }
              />
            ))}
        </ReactDragListView>
      </div>

      <div className={style.topCandidate} style={{ marginBottom: "15px" }}>
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
              <label className={style.form__input_label} htmlFor="firstName">
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
              <label className={style.form__input_label} htmlFor="firstName">
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
                disabledDate={disabledDate}
                timeHandler={startTimeHandle}
                actualTime={startTime}
                dateHandler={(date) => dateHandler(date, "startDate")}
                // disabledHours={() => getDisabledStartTime(moment(), "HH")}
                //      disabledMinutes={() => getDisabledStartTime(moment(), "mm")}
              />
              <span className={style.validation__error}>
                {startDateError?.errorMsg ?? ""}
              </span>
            </div>
            <div className={style.form__input_box}>
              <label htmlFor="endDate" className={style.form__input_label}>
                End Date
                <span
                  style={{
                    color:
                      endDateError && endDateError.errorMsg
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
                disabledDate={disabledEndDate}
                timeHandler={endTimeHandler}
                actualTime={endTime}
                dateHandler={(date) => dateHandler(date, "endDate")}
                disabledHours={() => getDisabledEndTime(startTime, "HH")}
                disabledMinutes={() => getDisabledEndTime(startTime, "mm")}
              />
              <span className={style.validation__error}>
                {endDateError?.errorMsg ?? ""}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className={style.settingWrapper}>
        <div className={style.settingList}>
          <SettingsCheckbox
            key={shortid.generate()}
            name="splitVoting"
            title="Allows split resolution voting"
            checked={splitVoting}
            description="Allow users split their vote power among options in resolution."
            settingPicker={(val) => settingPicker(val, "splitVoting")}
          />
        </div>
      </div>
      <div className={style.votingRight}>
        <div className={style.settings}>
          <div className={style.switchTitle}>Use shares as a voting power</div>
          <div className={style.switchContainer}>
            <Switch
              size="larger"
              checked={votingPower}
              onClick={(status) => handlerShareVote(status)}
            />
          </div>
        </div>
        <div className={style.settings}>
          <div className={style.switchTitle}>Use one man, one vote</div>
          <div className={style.switchContainer}>
            <Switch
              size="larger"
              checked={oneManVote}
              onClick={(status) => handleOneVote(status)}
            />
          </div>
        </div>
      </div>

      <button disabled={loading} className="btn-gray">
        {loading ? <Spin size="large" color="#fff" /> : " Create Resolution"}
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
    </form>
  );
};
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

const ResolutionSelection = ({
  register,
  addResolution,
  errors,
  handleStatutry,
  onChangeText,
  titleError,
  resourceInputCount,
  removeInput,
  onChangeShortDescription,
  item,
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
            onClick={() => removeInput(item)}
          >
            <span className="resolution-drag-handle">
              <RiDragMove2Fill />
            </span>
            <ImCancelCircle size={20} />
          </span>
        )}
        <div className={style.form__input_box}>
          <label htmlFor="question" className={style.form__input_label}>
            Resolution Title
            <span style={{ color: titleError.error ? "#ef3125" : "#8d8d8d" }}>
              &nbsp;*
            </span>
          </label>
          <input
            className={style.form__input}
            type="text"
            placeholder="e.g “To disclose the renumeration of managers”"
            name="resolutionTitle"
            value={item.title}
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
            Short Resolution title
            <span
              style={{ color: errors.resolutionTitle ? "#ef3125" : "#8d8d8d" }}
            >
              &nbsp;*
            </span>
          </label>
          <input
            className={style.form__input}
            type="text"
            placeholder="e.g “ Manager’s renumeration”"
            name="resolutionTitle"
            required
            onChange={onChangeShortDescription}
            value={item.shortDescription}
            maxLength={15}
          />
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="question" className={style.form__input_label}>
            Actions
            <span style={{ color: "#EF3125", marginLeft: ".5rem" }}></span>
          </label>

          <Candidate placeholder="For" />
          <Candidate placeholder="Against" />
          <Candidate placeholder="Abstain" />
        </div>
      </div>

      <div className={style.form__input_wrap}>
        <div className={style.resolutionSubBtn}>
          <div className={style.resolutionSubBtn_left}>
            <Tooltip placement="right" title="Create New Resolution">
              <button
                type="button"
                onClick={addResolution}
                className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
              >
                <FiPlus className={style.uploadIcon} size={18} />
              </button>
            </Tooltip>
          </div>

          {/* <div className={style.resolutionSubBtn_right}>
            <div
              className={style.createStatus}
              onClick={() => handleStatutry()}
            >
              Create Statutory Resolution
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ResolutionForm;
