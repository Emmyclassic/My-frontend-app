import { Alert, Spin, Switch } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import shortid from "shortid";
import { updateResolutionHandler } from "../../../../../api/resolutionHandler";
import CustomDatePicker from "../../../../../components/DatePicker";
import DeleteModal from "../../../../../components/DeleteModal";
import SettingsCheckbox from "../../../../../components/FormInput/Checkbox";
import LeftDrawerModal from "../../../../../components/LeftDrawerModal";
import style from "./index.module.scss";

const EditStatutoryForm = ({
  openResolutionModal,
  action,
  handleStatutry,
  item,
  reloadResolution,
  closeResolutionModal,
  removeResolution,
  openEditResolution,
}) => {
  console.log("item", item);
  const [resolution, setResolution] = useState(item);
  const [loading, setLoading] = useState(false);
  const [errorResponse, setErrorResponse] = useState();
  const [deleteResolutionOpen, setDeleteResolutionOpen] = useState(false);

  const [successResponse, setSuccessResponse] = useState();
  const [endDateError, setEndDateError] = useState({
    errorMsg: "",
    error: false,
  });
  const [startDateError, setStartDateError] = useState({
    errorMsg: "",
    error: false,
  });
  const [startTime, setStartTime] = useState(
    moment(item?.starts_at, "DD-MM-YYYY HH:mm:ss")
  );
  const [endTime, setEndTime] = useState(
    moment(item?.ends_at, "DD-MM-YYYY HH:mm:ss")
  );
  const [unformattedStartDate, setUnformattedStartDate] = useState();
  const [unformattedEndDate, setUnformattedEndDate] = useState();
  const [startDate, setStartDate] = useState(
    moment(item?.starts_at, "DD-MM-YYYY").format("DD/MM/YYYY")
  );
  const [endDate, setEndDate] = useState(
    moment(item?.ends_at, "DD-MM-YYYY").format("DD/MM/YYYY")
  );

  const postResolution = async (payload) => {
    try {
      const { data } = await updateResolutionHandler(payload, resolution.id);
      setSuccessResponse(data);
      setLoading(false);
      reloadResolution();
      closeResolutionModal();
    } catch (err) {
      const {
        data: { errors },
      } = err.response;
      const errorArr = Object.values(errors);

      setErrorResponse(errorArr);
      setLoading(false);
      setLoading(false);
    }
  };

  const errorClose = () => setErrorResponse();

  useEffect(() => {
    setResolution(item);
  }, [item]);

  const removeResolutionFunc = () => {
    setDeleteResolutionOpen(false);
    removeResolution();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!endDate) {
      setEndDateError({
        error: true,
        errorMsg: "End Date is required",
      });
      return;
    } else {
      setEndDateError({
        error: false,
        errorMsg: "",
      });
    }
    if (!startDate) {
      setStartDateError({
        error: true,
        errorMsg: "Start Date is required",
      });
      return;
    } else {
      setStartDateError({
        error: false,
        errorMsg: "",
      });
    }

    const start = `${startDate} ${moment(startTime).format("HH:mm:ss")}`;
    const end = `${endDate} ${moment(endTime).format("HH:mm:ss")}`;
    const payload = {
      use_one_vote: resolution.use_one_vote ? 1 : 0,
      use_shares: resolution.use_shares ? 1 : 0,
      title: resolution.title,
      allow_physical: 0,
      attendees_only: resolution.attendees_only,
      allow_split_voting: 0,
      event_id: resolution.event_id,
      starts_at: start,
      ends_at: end,
      short_title: resolution.short_title,
    };

    setLoading(true);
    postResolution(payload);
  };

  const settingPicker = (e, name) => {
    if (name === "attended") {
      setResolution({
        ...resolution,
        attendees_only: e.target.checked ? 1 : 0,
      });
    }

    if (name === "splitVoting") {
      setResolution({
        ...resolution,
        allow_split_voting: e.target.checked ? 1 : 0,
      });
    }
    if (name === "allowPhysical") {
      setResolution({
        ...resolution,
        allow_physical: e.target.checked ? 1 : 0,
      });
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

      // setStartDate(date.format("DD/MM/YYYY h:mm:ss"));
    } else {
      setUnformattedEndDate(date);
      setEndDate(date.format("DD/MM/YYYY"));
    }
  };

  const handlerShareVote = (status) => {
    setResolution({ ...resolution, use_shares: status, use_one_vote: !status });
  };
  const handleOneVote = (status) => {
    setResolution({ ...resolution, use_one_vote: status, use_shares: !status });
  };

  const onClose = () => setSuccessResponse();
  const cancelDelete = () => {
    openEditResolution(true);
    setDeleteResolutionOpen(false);
  };
  const startTimeHandle = (val) => {
    setStartTime(val);
  };

  const endTimeHandler = (val) => {
    setEndTime(val);
  };
  const getDisabledTime = (date, format) => {
    const hoursArr = [];
    const hours = moment(date).format(`${format}`);
    for (let i = 0; i < hours; i++) {
      hoursArr.push(i);
    }
    return hoursArr;
  };

  const disabledEndDate = (current) => {
    return current && current < moment(unformattedStartDate, "YYYY-MM-DD");
  };
  useEffect(() => {
    if (successResponse) {
      setTimeout(() => {
        setSuccessResponse();
      }, 500);
    }
  }, [successResponse]);
  return (
    <form onSubmit={onSubmit}>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="question" className={style.form__input_label}>
            Resolution
            <span style={{ color: "#8d8d8d", marginLeft: ".5rem" }}>*</span>
          </label>
          <input
            className={style.form__input}
            type="text"
            placeholder="e.g How's your day going?"
            name="resolutionTitle"
            value={resolution?.title}
            onChange={(e) =>
              setResolution({ ...resolution, title: e.target.value })
            }
          />
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="question" className={style.form__input_label}>
            Short Statutory Resolution title
            <span style={{ color: "#8d8d8d", marginLeft: ".5rem" }}>*</span>
          </label>
          <input
            className={style.form__input}
            type="text"
            placeholder="e.g How's your day going?"
            name="resolutionTitle"
            value={resolution?.short_title}
            onChange={(e) =>
              setResolution({ ...resolution, short_title: e.target.value })
            }
          />
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="question" className={style.form__input_label}>
            Actions
            <span style={{ color: "#EF3125", marginLeft: ".5rem" }}></span>
          </label>

          <Candidate placeholder="For" resolution={resolution} />
          <Candidate placeholder="Against" resolution={resolution} />
          <Candidate placeholder="Abstain" />
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.resolutionSubBtn}></div>
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_inline}>
          <div className={style.form__input_box}>
            <label className={style.form__input_label} htmlFor="firstName">
              Start{" "}
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
              timeValue={startTime}
              //    dateValue={moment(resolution?.starts_at, "DD-MM-YYYY")}
              value={
                unformattedStartDate ||
                moment(resolution?.starts_at, "DD-MM-YYYY")
              }
              disabledDate={disabledDate}
              timeHandler={startTimeHandle}
              dateHandler={(date) => dateHandler(date, "startDate")}
              disabledHours={() => getDisabledTime(moment(), "HH")}
              disabledMinutes={() => getDisabledTime(moment(), "mm")}
            />
            <span className={style.validation__error}>
              {startDateError.errorMsg}
            </span>
          </div>
          <div className={style.form__input_box}>
            <label htmlFor="endDate" className={style.form__input_label}>
              End{" "}
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
              timeValue={endTime}
              dateValue={moment(resolution?.ends_at, "DD-MM-YYYY")}
              disabledDate={disabledEndDate}
              value={unformattedEndDate}
              timeHandler={endTimeHandler}
              dateHandler={(date) => dateHandler(date, "endDate")}
              disabledHours={() => getDisabledTime(startTime, "HH")}
              disabledMinutes={() => getDisabledTime(startTime, "mm")}
            />
            <span className={style.validation__error}>
              {endDateError.errorMsg}
            </span>
          </div>
        </div>
      </div>

      <div className={style.settingWrapper}>
        <div className={style.settingList}>
          {Object.hasOwn(resolution, "allow_physical") &&
            resolution.allow_physical === false && (
              <SettingsCheckbox
                key={shortid.generate()}
                name="attended"
                title="Only users in the attendant list can answer statutory resolution"
                description="Only users added to the attendant list will get to see
              the poll and answer, users not in the attendant won't
              able to access the poll"
                checked={resolution.attendees_only}
                settingPicker={(val) => settingPicker(val, "attended")}
              />
            )}

          {Object.hasOwn(resolution, "allow_physical") &&
          resolution.allow_physical ? (
            <SettingsCheckbox
              key={shortid.generate()}
              name="allowPhysical"
              title="Allows physical voting"
              checked={resolution.allow_physical}
              description="Only users added to the attendant list will get to see
                    the poll and answer, users not in the attendant won't
                    able to access the poll"
              settingPicker={(val) => settingPicker(val, "allowPhysical")}
            />
          ) : (
            <SettingsCheckbox
              key={shortid.generate()}
              name="splitVoting"
              title="Allows split resolution voting"
              checked={resolution.allow_split_voting}
              description="Only users added to the attendant list will get to see
                    the poll and answer, users not in the attendant won't
                    able to access the poll"
              settingPicker={(val) => settingPicker(val, "splitVoting")}
            />
          )}

          {/* {resolutionSettings.map((settings, idx) => (
            <div className={style.form__input_wrap} key={idx}>
              <div className={style.form__input_box}>
                <label htmlFor="firstName" className={style.form__input_label}>
                  <input
                    className={`${style.form__input} ${style.form__input_setting}`}
                    type="checkbox"
                    checked={resolution.attendees_only}
                    onChange={(val) => settingPicker(val, settings.name)}
                  />
                  <div className={style.form__label_text}>
                    <div className={style.form__label_title}>
                      {settings.title}
                    </div>
                    <p className={style.form__label_content}>
                      {settings.description}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          ))} */}
        </div>
      </div>
      <div className={style.votingRight}>
        <div className={style.settings}>
          <div className={style.switchTitle}>Use shares as a voting power</div>
          <div className={style.switchContainer}>
            <Switch
              size="larger"
              checked={resolution.use_shares}
              onChange={(status) => handlerShareVote(status)}
            />
          </div>
        </div>
        <div className={style.settings}>
          <div className={style.switchTitle}>Use one man, one vote</div>
          <div className={style.switchContainer}>
            <Switch
              checked={resolution.use_one_vote}
              size="larger"
              onChange={(status) => handleOneVote(status)}
            />
          </div>
        </div>
      </div>
      <div className={style.btnWrapper}>
        <button type="submit" disabled={loading} className="btn-gray">
          {loading ? <Spin size="large" color="#fff" /> : "Update Resolution"}
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
          cancelDelete={cancelDelete}
          deleteHandler={removeResolutionFunc}
        />
      </LeftDrawerModal>
    </form>
  );
};
const Candidate = ({
  raiseHand,
  removeInput,
  item,
  onChange,
  inputRef,
  placeholder,
  resolution,
}) => {
  return (
    <div className={style.input_box}>
      {resolution &&
        Object.hasOwn(resolution, "allow_physical") &&
        resolution.allow_physical && (
          <img
            src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
            width={35}
            height={40}
            className={style.handlewave}
          />
        )}

      <input
        className={`${style.form__input} ${
          resolution && resolution.allow_physical
            ? style.form__input_candidate
            : ""
        } `}
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

export default EditStatutoryForm;
