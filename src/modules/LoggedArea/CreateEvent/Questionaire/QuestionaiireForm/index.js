import { Alert, Spin, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiTrash } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import shortid from "shortid";
import { questionaireHandler } from "../../../../../api/resolutionHandler";
import CustomDatePicker from "../../../../../components/DatePicker";
import SettingsCheckbox from "../../../../../components/FormInput/Checkbox";
import style from "../../Resolution/ResolutionForm/index.module.scss";

const ElectionForm = ({
  type = "Question",
  openResolutionModal,
  closeModal,
  eventDetail,
  createShotcut = "Create Statutory Resolution",
}) => {
  const [startDate, setStartDate] = useState();
  const [candidateList, setCandidateList] = useState([]);
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [unformattedStartDate, setUnformattedStartDate] = useState();
  const [unformattedEndDate, setUnformattedEndDate] = useState();
  const [endDateError, setEndDateError] = useState({
    errorMsg: "",
    error: false,
  });
  const [titleError, setTitleError] = useState(false);
  const [startDateError, setStartDateError] = useState({
    errorMsg: "",
    error: false,
  });
  const [iscompulsory, setIcompulsory] = useState();

  const [resourceInputCount, setResourceInputCount] = useState([
    {
      title: "",
      candidateInputCount: [{ name: "" }, { name: "" }, { name: "" }],
    },
  ]);
  const [endDate, setEndDate] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

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
  const startTimeHandle = (val) => {
    setStartTime(val);
  };

  const endTimeHandler = (val) => {
    setEndTime(val);
  };
  const postElection = async (payload) => {
    try {
      const { data } = await questionaireHandler(payload);
      setSuccessResponse(data);
      reset({ resolutionTitle: "" });
      setErrorResponse();
      setIcompulsory();
      setUnformattedStartDate();
      setUnformattedEndDate();
      setEndTime();
      setStartTime();
      setResourceInputCount([
        {
          title: "",
          candidateInputCount: [{ name: "" }, { name: "" }, { name: "" }],
        },
      ]);
      setLoading(false);
      if (closeModal) {
        closeModal();
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

  const onSubmit = async (data) => {
    if (validateField()) {
      const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
      const start = `${startDate} ${moment(startTime).format("HH:mm:ss")}`;
      const end = `${endDate} ${moment(endTime).format("HH:mm:ss")}`;
      const transResourceInputCount = resourceInputCount.map((item) => {
        return {
          title: item.title,
          answers: item.candidateInputCount,
          is_compulsory: iscompulsory,
          event_id: eventDetail ? eventDetail.id : currentEvent.id,
          starts_at: start,
          ends_at: end,
        };
      });

      const requestBody = {
        questionnaires: transResourceInputCount,
      };
      setLoading(true);
      postElection(requestBody);
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
  const onChangeCandidate = (e, idx, parentIdx) => {
    const { value } = e.target;

    const obj = [...resourceInputCount];

    obj[parentIdx].candidateInputCount[idx].name = value;
    setResourceInputCount(obj);
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

  const onClose = () => setSuccessResponse();

  useEffect(() => {
    if (successResponse) {
      setTimeout(() => {
        setSuccessResponse();
      }, 500);
    }
  }, [successResponse]);

  const settingPicker = (e, name) => {
    if (name === "isCompulsory") {
      setIcompulsory(e.target.checked ? 1 : 0);
    }
  };

  const errorClose = () => setErrorResponse();

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

    if (!startDate) {
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
    if (!endDate) {
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
  const removeElectionInput = (item, idx) => {
    const arr = [...resourceInputCount];
    arr.splice(idx, 1);

    if (arr.length === 0) {
      setResourceInputCount([{ name: "" }]);
    } else {
      setResourceInputCount(arr);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                    { name: "" },
                    { name: "" },
                    { name: "" },
                  ],
                },
              ])
            }
            removeElectionInput={() => removeElectionInput(item, idx)}
            removeInput={(item, childIdx) => removeInput(item, childIdx, idx)}
            resourceInputCount={resourceInputCount}
            onChangeText={(e) => onChangeText(e, idx)}
            parentIdx={idx}
            addCandidates={addCandidates}
            addNewCandidateInput={(idx) => addNewCandidateInput(idx)}
            onChangeCandidate={(e, childIdx) =>
              onChangeCandidate(e, childIdx, idx)
            }
          />
        ))}

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
              disabledDate={disabledDate}
              value={unformattedStartDate}
              timeHandler={startTimeHandle}
              actualTime={startTime}
              dateHandler={(date) => dateHandler(date, "startDate")}
              // disabledHours={() => getDisabledStartTime(moment(), "HH")}
              // disabledMinutes={() => getDisabledStartTime(moment(), "mm")}
            />

            <span className={style.validation__error}>
              {startDateError.errorMsg}
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
              actualTime={endTime}
              timeHandler={endTimeHandler}
              dateHandler={(date) => dateHandler(date, "endDate")}
              disabledHours={() => getDisabledEndTime(startTime, "HH")}
              disabledMinutes={() => getDisabledEndTime(startTime, "mm")}
            />

            <span className={style.validation__error}>
              {endDateError.errorMsg}
            </span>
          </div>
        </div>
      </div>
      <div className={style.settingWrapper}>
        <div className={style.settingList}>
          <SettingsCheckbox
            key={shortid.generate()}
            name="isCompulsory"
            title="Only users on the attendee list can answer this questions."
            description="Only users in the attendee list will be able to answer questions, users not on the list will be able to see question but won't be able to participate."
            checked={iscompulsory}
            settingPicker={(val) => settingPicker(val, "isCompulsory")}
          />
        </div>
      </div>
      <button disabled={loading} className="btn-gray">
        {loading ? <Spin size="large" color="#fff" /> : " Create Question"}
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
        value={item.name}
        onChange={onChange}
        required
      />
      <span className={style.input_box_trash} onClick={() => removeInput(item)}>
        <FiTrash size={20} />
      </span>
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
  onChangeCandidate,
  candidateInputCount,
  addCandidates,
  item,
  parentIdx,
  addNewCandidateInput,
  addNewElection,
  removeElectionInput,
}) => {
  const placeHolderArr = ["It was good", "I was sad", "I felt happy"];
  return (
    <>
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
            <ImCancelCircle size={20} />
          </span>
        )}
        <div className={style.form__input_box}>
          <label htmlFor="question" className={style.form__input_label}>
            Question
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
            Options
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
                placeholder={placeHolderArr[idx]}
              />
            ))}
          <div className={style.resolutionSubBtn}>
            <div className={style.resolutionSubBtn_left}>
              <Tooltip placement="right" title="Add new option">
                <button
                  type="button"
                  onClick={() => addNewCandidateInput(parentIdx, { name: "" })}
                  className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
                >
                  <FiPlus className={style.uploadIcon} size={18} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <div className={style.form__input_wrap}>
        <div className={style.resolutionSubBtn}>
          <div className={style.resolutionSubBtn_right}>
            <div className={style.createStatus} onClick={addNewElection}>
              Create New Question
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectionForm;
