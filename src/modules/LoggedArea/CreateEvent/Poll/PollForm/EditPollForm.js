import { Alert, Spin, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import shortid from "shortid";
import { updatePollHandler } from "../../../../../api/resolutionHandler";
import CustomDatePicker from "../../../../../components/DatePicker";
import DeleteModal from "../../../../../components/DeleteModal";
import SettingsCheckbox from "../../../../../components/FormInput/Checkbox";
import LeftDrawerModal from "../../../../../components/LeftDrawerModal";
import style from "../../Resolution/ResolutionForm/index.module.scss";

const EditPollForm = ({
  openResolutionModal,
  reloadQuestion,
  removePolls,
  closeQuestionaireModal,
  setEditPollModal,
  closeResolutionModal,
  item,
  closeModal,
}) => {
  const [poll, setPoll] = useState(item);
  const [candidateList, setCandidateList] = useState([]);
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const [startDate, setStartDate] = useState(
    moment(item?.starts_at, "DD-MM-YYYY").format("DD/MM/YYYY hh:mm:ss")
  );
  const [endDate, setEndDate] = useState(
    moment(item?.ends_at, "DD-MM-YYYY").format("DD/MM/YYYY hh:mm:ss")
  );
  const [unformattedStartDate, setUnformattedStartDate] = useState();
  const [startTime, setStartTime] = useState(
    moment(item?.starts_at, "DD-MM-YYYY HH:mm:ss")
  );
  const [endTime, setEndTime] = useState(
    moment(item?.ends_at, "DD-MM-YYYY HH:mm:ss")
  );
  const [loading, setLoading] = useState(false);
  const [deleteResolutionOpen, setDeleteResolutionOpen] = useState(false);

  const [candidateInputCount, setCandidateInputCount] = useState(
    item?.options ?? [{ name: "" }, { name: "" }, { name: "" }]
  );
  const removeQuestionFunc = () => {
    setDeleteResolutionOpen(false);
    removePolls();
  };

  const cancelDelete = () => {
    setEditPollModal(true);
    setDeleteResolutionOpen(false);
  };
  useEffect(() => {
    setPoll(item);
  }, [item]);

  const disabledDate = (current) => {
    const today = moment();
    const past = moment(current);
    today.diff(past, "days");

    return today.diff(past, "days") >= 1;
  };
  // const dateHandler = (date, dateLabel) => {
  //   if (dateLabel === "startDate") {
  //     setPoll({
  //       ...poll,
  //       starts_at: date.format("DD/MM/YYYY hh:mm:ss"),
  //     });
  //   } else {
  //     setPoll({
  //       ...poll,
  //       ends_at: date.format("DD/MM/YYYY hh:mm:ss"),
  //     });
  //   }
  // };
  const dateHandler = (date, dateLabel) => {
    if (dateLabel === "startDate") {
      setUnformattedStartDate(date);
      setStartDate(date.format("DD/MM/YYYY"));
    } else {
      setEndDate(date.format("DD/MM/YYYY"));
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

  const startTimeHandle = (val) => {
    setStartTime(val);
  };

  const endTimeHandler = (val) => {
    setEndTime(val);
  };
  const disabledEndDate = (current) => {
    return current && current < moment(unformattedStartDate, "YYYY-MM-DD");
  };

  const getDisabledStartTime = (date, format) => {
    const hoursArr = [];
    const hours = moment(date).format(`${format}`);
    for (let i = 0; i < hours; i++) {
      hoursArr.push(i);
    }
    return hoursArr;
  };

  const addCandidates = (candidate) => {
    const existUser = candidateList.find(
      (item) => item.name.toLowerCase() === candidate.name.toLowerCase()
    );

    if (!existUser) {
      setCandidateList([...candidateList, candidate]);
    }
  };
  const postPoll = async (payload) => {
    try {
      const { data } = await updatePollHandler(payload, poll.id);
      setSuccessResponse(data);
      if (closeResolutionModal) {
        closeResolutionModal();
      }
      setLoading(false);
    } catch (err) {
      const {
        data: { errors },
      } = err.response;
      const errorArr = Object.values(errors);

      setErrorResponse(errorArr);
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      options: candidateInputCount,
      title: poll.title,
      is_compulsory: poll.is_compulsory ? 1 : 0,
      event_id: poll.event_id,
      starts_at: poll.starts_at,
      ends_at: poll.ends_at,
    };

    setLoading(true);
    postPoll(payload);
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

  const onChange = (e, idx) => {
    const { value } = e.target;

    const obj = [...candidateInputCount];

    obj[idx].name = value;
    setCandidateInputCount(obj);
  };
  const settingPicker = (e, name) => {
    if (name === "isCompulsory") {
      setPoll({
        ...poll,
        is_compulsory: e.target.checked ? 1 : 0,
      });
    }
  };
  const errorClose = () => setErrorResponse();

  return (
    <form onSubmit={onSubmit}>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="question" className={style.form__input_label}>
            Question
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
            value={poll.title}
            name="resolutionTitle"
            onChange={(e) => setPoll({ ...poll, title: e.target.value })}
          />
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="question" className={style.form__input_label}>
            Options
            <span
              style={{
                color: "#ef3125",
              }}
            >
              *
            </span>
          </label>
          {candidateInputCount &&
            candidateInputCount.length > 0 &&
            candidateInputCount.map((item, idx) => (
              <Candidate
                key={idx}
                addCandidates={addCandidates}
                removeInput={() => removeInput(item, idx)}
                onChange={(e) => onChange(e, idx)}
                item={item}
              />
            ))}
        </div>
        <div className={style.resolutionSubBtn}>
          <div className={style.resolutionSubBtn_left}>
            <Tooltip placement="right" title="Add new candidate">
              <button
                type="button"
                onClick={() =>
                  setCandidateInputCount([...candidateInputCount, { name: "" }])
                }
                className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
              >
                <FiPlus className={style.uploadIcon} size={18} />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_inline}>
          <div className={style.form__input_box}>
            <label className={style.form__input_label} htmlFor="firstName">
              Start{" "}
              <span
                style={{
                  color: "#ef3125",
                }}
              >
                *
              </span>
            </label>
            <CustomDatePicker
              showTime={true}
              timeValue={startTime}
              dateValue={moment(poll?.starts_at, "DD-MM-YYYY")}
              disabledDate={disabledDate}
              timeHandler={startTimeHandle}
              dateHandler={(date) => dateHandler(date, "startDate")}
              disabledHours={() => getDisabledStartTime(moment(), "HH")}
              disabledMinutes={() => getDisabledStartTime(moment(), "mm")}
            />
            {/* <div className={style.input__date}>
              <DatePicker
                format="DD/MM/YYYY hh:mm:ss"
                showTime={{ format: "HH:mm" }}
                placeholder="DD/MM/YYYY hh:mm:ss"
                allowClear={false}
                disabledDate={disabledDate}
                className="form__input_date"
                value={moment(poll?.starts_at, "DD-MM-YYYY")}
                onChange={(date) => dateHandler(date, "startDate")}
              />
            </div> */}
          </div>
          <div className={style.form__input_box}>
            <label htmlFor="endDate" className={style.form__input_label}>
              End{" "}
              <span
                style={{
                  color: "#ef3125",
                }}
              >
                *
              </span>
            </label>
            <CustomDatePicker
              showTime={true}
              timeValue={endTime}
              dateValue={moment(poll?.ends_at, "DD-MM-YYYY")}
              disabledDate={disabledEndDate}
              timeHandler={endTimeHandler}
              dateHandler={(date) => dateHandler(date, "endDate")}
              disabledHours={() => getDisabledEndTime(startTime, "HH")}
              disabledMinutes={() => getDisabledEndTime(startTime, "mm")}
            />
            {/* <div className={style.input__date}>
              <DatePicker
                format="DD/MM/YYYY hh:mm:ss"
                showTime={{ format: "HH:mm" }}
                placeholder="DD/MM/YYYY hh:mm:ss"
                allowClear={false}
                className="form__input_date"
                value={moment(poll?.ends_at, "DD-MM-YYYY")}
                onChange={(date) => dateHandler(date, "endDate")}
              />
            </div> */}
          </div>
        </div>
      </div>
      <div className={style.settingWrapper}>
        <div className={style.settingList}>
          <SettingsCheckbox
            key={shortid.generate()}
            name="isCompulsory"
            title="Make poll compulsory"
            description="Your users will be required to answer the question above before they are require to join an event"
            checked={poll.is_compulsory}
            settingPicker={(val) => settingPicker(val, "isCompulsory")}
          />
        </div>
      </div>
      <div className={style.btnWrapper}>
        <button type="submit" disabled={loading} className="btn-gray">
          {loading ? <Spin size="large" color="#fff" /> : "Update Poll"}
        </button>
        <button
          type="button"
          onClick={() => setDeleteResolutionOpen(true)}
          className="btn-gray btn-del"
        >
          Delete
        </button>
      </div>
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
    </form>
  );
};

const Candidate = ({ removeInput, item, onChange, inputRef }) => {
  return (
    <div className={style.input_box}>
      <input
        className={style.form__input}
        type="text"
        placeholder="Seun Sokeye"
        name="actions"
        value={item.name}
        onChange={onChange}
      />
      <span className={style.input_box_trash} onClick={() => removeInput(item)}>
        <FiTrash size={20} />
      </span>
    </div>
  );
};

export default EditPollForm;
