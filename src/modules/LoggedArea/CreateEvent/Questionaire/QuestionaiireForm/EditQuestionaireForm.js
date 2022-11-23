import { Alert, Spin, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import shortid from "shortid";
import { updateQuestionaiireHandler } from "../../../../../api/resolutionHandler";
import CustomDatePicker from "../../../../../components/DatePicker";
import DeleteModal from "../../../../../components/DeleteModal";
import SettingsCheckbox from "../../../../../components/FormInput/Checkbox";
import LeftDrawerModal from "../../../../../components/LeftDrawerModal";
import style from "../../Resolution/ResolutionForm/index.module.scss";

const EditQuestionaaireForm = ({
  removeQuestionaiira,
  openResolutionModal,
  reloadQuestion,
  closeQuestionaireModal,
  item,
  closeModal,
  setEditQuestionaaireModal,
  reload,
}) => {
  const [questionaiire, setQuestionaiire] = useState(item);
  const [candidateList, setCandidateList] = useState([]);
  const [successResponse, setSuccessResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [errorResponse, setErrorResponse] = useState();
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

  const [deleteResolutionOpen, setDeleteResolutionOpen] = useState(false);

  const [candidateInputCount, setCandidateInputCount] = useState(
    item?.answers ?? [{ name: "" }, { name: "" }, { name: "" }]
  );

  useEffect(() => {
    setQuestionaiire(item);
    setCandidateInputCount(item?.answers);
  }, [item]);

  const startTimeHandle = (val) => {
    setStartTime(val);
  };

  const endTimeHandler = (val) => {
    setEndTime(val);
  };
  const disabledEndDate = (current) => {
    return current && current < moment(unformattedStartDate, "YYYY-MM-DD");
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
  const addCandidates = (candidate) => {
    const existUser = candidateList.find(
      (item) => item.name.toLowerCase() === candidate.name.toLowerCase()
    );

    if (!existUser) {
      setCandidateList([...candidateList, candidate]);
    }
  };
  const postQuestionaire = async (payload) => {
    try {
      const { data } = await updateQuestionaiireHandler(
        payload,
        questionaiire.id
      );

      setSuccessResponse(data);
      if (reloadQuestion) {
        reloadQuestion();
      }
      if (closeModal) {
        closeModal();
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
  const errorClose = () => setErrorResponse();

  const onSubmit = async (e) => {
    e.preventDefault();

    const start = `${startDate} ${moment(startTime).format("HH:mm:ss")}`;
    const end = `${endDate} ${moment(endTime).format("HH:mm:ss")}`;
    const payload = {
      answers: candidateInputCount,
      title: questionaiire.title,
      is_compulsory: questionaiire.is_compulsory ? 1 : 0,
      event_id: questionaiire.event_id,
      starts_at: start,
      ends_at: end,
    };

    setLoading(true);
    postQuestionaire(payload);
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

  const onChange = (e, idx) => {
    const { value } = e.target;

    const obj = [...candidateInputCount];

    obj[idx].name = value;
    setCandidateInputCount(obj);
  };
  const settingPicker = (e, name) => {
    if (name === "isCompulsory") {
      setQuestionaiire({
        ...questionaiire,
        is_compulsory: e.target.checked ? 1 : 0,
      });
    }
  };
  const removeQuestionFunc = () => {
    setDeleteResolutionOpen(false);
    removeQuestionaiira();
  };

  const cancelDelete = () => {
    setEditQuestionaaireModal(true);
    setDeleteResolutionOpen(false);
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

  const getDisabledStartTime = (date, format) => {
    const hoursArr = [];
    const hours = moment(date).format(`${format}`);
    for (let i = 0; i < hours; i++) {
      hoursArr.push(i);
    }
    return hoursArr;
  };

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
            value={questionaiire.title}
            name="resolutionTitle"
            onChange={(e) =>
              setQuestionaiire({ ...questionaiire, title: e.target.value })
            }
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
              dateValue={moment(questionaiire?.starts_at, "DD-MM-YYYY")}
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
                value={moment(questionaiire?.starts_at, "DD-MM-YYYY")}
                onChange={(date) => dateHandler(date, "startDate")}
              />
            </div> */}
          </div>
          <div className={style.form__input_box}>
            <label htmlFor="endDate" className={style.form__input_label}>
              End
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
              dateValue={moment(questionaiire?.ends_at, "DD-MM-YYYY")}
              disabledDate={disabledEndDate}
              timeHandler={endTimeHandler}
              dateHandler={(date) => dateHandler(date, "endDate")}
              disabledHours={() => getDisabledEndTime(startTime, "HH")}
              disabledMinutes={() => getDisabledEndTime(startTime, "mm")}
            />
          </div>
        </div>
      </div>
      <div className={style.settingWrapper}>
        <div className={style.settingList}>
          <SettingsCheckbox
            key={shortid.generate()}
            name="isCompulsory"
            title="Make question compulsory"
            description="Your users will be required to answer the question above before they are require to join an event"
            checked={questionaiire.is_compulsory}
            settingPicker={(val) => settingPicker(val, "isCompulsory")}
          />
        </div>
      </div>
      <div className={style.btnWrapper}>
        <button type="submit" disabled={loading} className="btn-gray">
          {loading ? <Spin size="large" color="#fff" /> : "Update Question"}
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
        required
      />
      <span className={style.input_box_trash} onClick={() => removeInput(item)}>
        <FiTrash size={20} />
      </span>
    </div>
  );
};

export default EditQuestionaaireForm;
