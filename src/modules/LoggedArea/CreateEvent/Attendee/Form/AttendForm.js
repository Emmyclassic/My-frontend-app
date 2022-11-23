import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, Spin, Tooltip } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillQuestionCircle } from "react-icons/ai";
import { MdFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AlertResponse from "../../../../../Auth/AuthModalForm/AlertResponse";
import FormInput from "../../../../../components/FormInput";
import { useFileUpload } from "../../../../../hooks/useFileUpload";
import { addAttendeeSchema } from "../../../../../utils/Validation/addAttendeeValidation";
import style from "../index.module.scss";
import { postAttendeeAction } from "../state/action";
import { resetAddAttendee } from "../state/attendeeAction";

const AttendeeForm = ({ reloadAttendee, closeAttendeeForm }) => {
  const fileUploader = useFileUpload();
  const [allowAttendee, setAllowAttendee] = useState(false);
  const [allowPoll, setAllowPoll] = useState(false);
  const [countQuorom, setCountQuorom] = useState(false);
  const [quorumBy, setQuorumBy] = useState("Voting");
  const [quorumNumber, setQuorumNumber] = useState(100);
  const attendee = useSelector((state) => state.attendeeReducer);
  const [uploadAttendeeList, setUploadAttendeeList] = useState();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(addAttendeeSchema),
  });

  const eventConfig = () => {
    return {
      allow_attendee_registration: allowAttendee,
      allow_poll_access: allowPoll,
      count_proxy_by_quorum: countQuorom,
      quorum_number: quorumNumber,
      set_quorum_by: quorumBy,
    };
  };

  const onSubmit = (data) => {
    const attendeeList = [
      {
        name: data.participantName,
        email: data.email,
        account_number: data.accountNumber,
        phone_number: data.phoneNumber,
        vote_rights: Number(data.votersRight),
      },
    ];

    const config = eventConfig();
    const payload = {
      attendees: attendeeList,
      ...config,
    };
    dispatch(postAttendeeAction(payload));
  };
  const onClose = (e) => {
    dispatch(resetAddAttendee);
  };

  const onClose = (e) => {
    dispatch(resetAddAttendee);
  };

  const invalidChars = ["-", "+", "e"];

  const allowRegistrationHandle = (e) => setAllowAttendee(e.target.checked);

  const allowPollHandle = (e) => setAllowPoll(e.target.checked);

  const countQuoromHandle = (e) => setCountQuorom(e.target.checked);

  const quorumNumberHandle = (e) => setQuorumNumber(e.target.value);
  const quorumSetter = (e) => setQuorumBy(e.target.value);

  const handleFileUpload = async (e) => {
    const result = await fileUploader.uploadFile(e);
    const attnedeeList = result.map((item) => ({
      name: item[`Attendee Name`],
      email: item["Attendee Email"],
      phone_number: item["Attendee Phone Number"],
      vote_rights: item["Attendee Vote Right"],
      account_number: item["Attendee Account"],
    }));

    setUploadAttendeeList(attnedeeList);
  };

  const submitFileUpload = () => {
    if (uploadAttendeeList) {
      const config = eventConfig();

      const payload = {
        attendees: uploadAttendeeList,
        ...config,
      };

      dispatch(postAttendeeAction(payload));
    }
  };
  return (
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
        labelTitle="Enter Account Number"
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
        labelTitle="Attendee Voting rights (Holdings/units)"
        inputType="number"
        isRequired={false}
        errors={errors}
        name="votersRight"
        watch={watch}
        maxLength={100}
        register={register("votersRight")}
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
        placeholder="Enter Mobile Number"
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

      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="firstName" className={style.form__input_label}>
            <Checkbox onChange={allowRegistrationHandle}>
              <div className={style.form__label_text}>
                <div className={style.form__label_title}>
                  Allow Attendee Registration
                </div>
                <p className={style.form__label_content}>
                  Allow attendees not on the attendee list to register and join
                  the event.
                </p>
              </div>
            </Checkbox>
          </label>
        </div>
      </div>

      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="firstName" className={style.form__input_label}>
            <Checkbox onChange={allowPollHandle}>
              <div className={style.form__label_text}>
                <div className={style.form__label_title}>
                  Access to Poll & Question
                </div>
                <p className={style.form__label_content}>
                  Allow your users have access to poll and questions created
                  before the event goes live.
                </p>
              </div>
            </Checkbox>
          </label>
        </div>
      </div>

      <div className={style.form__input_wrap}>
        <div className={style.form__input_inline}>
          <div
            className={`${style.form__input_box} ${style.form__input_box_1}`}
          >
            <label htmlFor="firstName" className={style.form__input_label}>
              Set Quorum Number
              <Tooltip
                color="#5C6574"
                placement="right"
                title="Quorum is the number of users needed to be present for an event can automatically commence"
              >
                <span style={{ color: "#ef3125", marginLeft: "10px" }}>
                  <AiFillQuestionCircle color="#5C6574" />
                </span>
              </Tooltip>
            </label>
            <input
              className={style.form__input}
              type="number"
              placeholder="20"
              name="quorumNumber"
              onChange={quorumNumberHandle}
              value={quorumNumber}
              pattern="/^d*/"
            />
          </div>
          <div
            className={`${style.form__input_box} ${style.form__input_box_2}`}
          >
            <label htmlFor="endDate" className={style.form__input_label}>
              Set Quorum by
            </label>
            <div className={style.input__date}>
              <select className={style.form__input} onChange={quorumSetter}>
                <option value="Voting">Voting Right</option>
                <option value="Attendee">Attendee</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <div className={style.form__input_box}>
          <label htmlFor="firstName" className={style.form__input_label}>
            <Checkbox onChange={countQuoromHandle}>
              <div className={style.form__label_text}>
                <div className={style.form__label_title}>
                  Count Proxy by Quorum
                </div>
                <p className={style.form__label_content}>
                  Include proxy during quorum count for this event.
                </p>
              </div>
            </Checkbox>
          </label>
        </div>
      </div>

      <div className={style.btnGroup}>
        <div className={style.btnGroup_left}>
          <button
            type="submit"
            disabled={attendee.loading}
            className={`${style.btnGroup_item} ${style.btnGroup_item_bg}`}
          >
            {attendee.loading ? (
              <Spin size="large" color="#fff" />
            ) : (
              "Add Attendee"
            )}
          </button>
        </div>
        <div className={style.uploadOption}>Or</div>
        <div className={style.btnGroup_right}>
          <Tooltip placement="right" title="Upload excel">
            <button
              type="button"
              className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
            >
              <input
                type="file"
                accept=".xlsx,.csv,.xls"
                onChange={handleFileUpload}
              />
              <MdFileUpload
                className={style.uploadIcon}
                onClick={submitFileUpload}
              />
            </button>
          </Tooltip>
          <Tooltip placement="right" title="Download Attendee template">
            <DownloadCsv
              data={attendees}
              csvHeader={[
                { label: "Attendee Name", key: "name" },
                { label: "Atteendee Email", key: "email" },
                { label: "Attendee Phone Number", key: "phone_number" },
                { label: "Attendee Account", key: "account_number" },
                { label: "Attendee Vote Right", key: "vote_rights" },
              ]}
              csvFileName="attendee.csv"
            />
          </Tooltip>
        </div>
      </div>
      {attendee.data && (
        <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
          <AlertResponse
            status={attendee.status}
            data={attendee.data}
            onClose={onClose}
            message={attendee.message}
          />
        </div>
      )}
    </form>
  );
};

export default AttendeeForm;
