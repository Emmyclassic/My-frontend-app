import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Spin, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import { MdFileDownload } from "react-icons/md";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { addAttendee } from "../../../../../api/attendeeHandler";
import AlertResponse from "../../../../../Auth/AuthModalForm/AlertResponse";
import FormInput from "../../../../../components/FormInput";
import { useFileUpload } from "../../../../../hooks/useFileUpload";
import {
  addAttendeeSchema,
  addAttendeeSchemaCorperate,
} from "../../../../../utils/Validation/addAttendeeValidation";
import style from "../index.module.scss";
import { postAttendeeAction } from "../state/action";
import { resetAddAttendee } from "../state/attendeeAction";

const AttendeeForm = ({
  nextStep,
  attendees,
  currentEventType,
  reloadAttendee,
}) => {
  const fileUploader = useFileUpload();
  const [votersRight, setVotersRight] = useState();
  const [templateFormatError, setTemplateFormatError] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [uploadingAttending, setUploadingAttending] = useState(false);
  const [attendeeUploadResponse, setAttendeeUploadResponse] = useState({
    status: false,
    message: "",
    data: null,
  });

  const [uploadAttendeeList, setUploadAttendeeList] = useState();
  const attendee = useSelector((state) => state.attendeeReducer);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const attendeeList = [
      {
        name: data.participantName,
        email: data.email,
        account_number: data.accountNumber,
        phone_number: phoneNumber,
        vote_rights: Number(votersRight),
        attendee_type: "observer",
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
    setVotersRight(0);
    setPhoneNumber(0);
  };

  const validationScheme =
    currentEventType.type === "agm"
      ? addAttendeeSchema
      : addAttendeeSchemaCorperate;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationScheme),
  });

  const handleFileUpload = async (e) => {
    try {
      const result = await fileUploader.uploadFile(e);

      console.log("result", result);

      const arrErr = [];

      const attnedeeList = result.map((item) => ({
        name: item[`Attendee Name`],
        email: item["Attendee Email"],
        phone_number: item["Attendee Phone Number"],
        vote_rights: item["Attendee Vote Right"],
        account_number: item["Attendee Account"],
      }));

      attnedeeList.forEach((element) => {
        if (currentEventType.type === "agm") {
          if (!element.vote_rights) {
            arrErr.push(false);
          }
        }

        if (!element.name) {
          arrErr.push(false);
        }
      });

      if (arrErr.includes(false)) {
        setTemplateFormatError("There are some missing fields");
      } else {
        setTemplateFormatError();
        setUploadAttendeeList(attnedeeList);
      }
    } catch (err) {
      setTemplateFormatError("Invalid template format");
      console.log("errr", err.toString());
    }
  };

  const submitFileUpload = async () => {
    try {
      setUploadingAttending(true);
      if (
        !templateFormatError &&
        uploadAttendeeList &&
        uploadAttendeeList.length
      ) {
        const payload = {
          attendees: uploadAttendeeList,
        };

        const { data } = await addAttendee(payload);
        setAttendeeUploadResponse({
          status: false,
          data,
          message: "Uploaded successfully",
        });
        reloadAttendee();
        setUploadingAttending(false);

        // dispatch(postAttendeeAction(payload));
      }
    } catch (ex) {
      setUploadingAttending(false);

      setAttendeeUploadResponse({
        status: true,
        data: null,
        message: ex.response?.message ?? "Something went wrong",
      });
    }
  };
  const onClose = (e) => {
    dispatch(resetAddAttendee);
    setAttendeeUploadResponse({ status: false, message: "", data: null });
  };

  // const allowRegistrationHandle = (e) => setAllowAttendee(e.target.checked);

  // const allowPollHandle = (e) => setAllowPoll(e.target.checked);

  // const countQuoromHandle = (e) => setCountQuorom(e.target.checked);

  // const quorumNumberHandle = (e) => setQuorumNumber(e.target.value);
  // const quorumSetter = (e) => setQuorumBy(e.target.value);

  // const invalidChars = ["-", "+", "e"];

  useEffect(() => {
    if (attendee && attendee.data) {
      setTimeout(() => {
        dispatch(resetAddAttendee);
      }, 500);
    }
  }, [attendee]);

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
  const quorumNumberHandle = (val) => {
    const newVal = val.target.value.replace(/,/g, "");
    setVotersRight(newVal);
  };

  const phoneNumberHandler = (e) => {
    // console.log("dbhbwhdwhd", val);
    setPhoneNumber(e.target.value);
  };

  // const preventTextValue = (e) => {
  //   if (isNaN(e.target.value)) {
  //     e.preventDefault();
  //   }
  // };
  useEffect(() => {
    if (attendeeUploadResponse && attendeeUploadResponse.data) {
      onClose();
    }
  }, [attendeeUploadResponse?.data]);
  console.log("setPhoneNumber", phoneNumber);
  return (
    <div className={style.main_containerLeft_form}>
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

        {currentEventType.type === "agm" && (
          <>
            <FormInput
              placeholder="3012334256"
              labelTitle="Enter Account Number"
              inputType="number"
              isRequired={false}
              errors={errors}
              name="accountNumber"
              watch={watch}
              maxLength={10}
              register={register("accountNumber")}
              // showCount
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}
            />
            <div className={style.form__input_wrap}>
              <div className={style.form__input_box}>
                <label htmlFor="firstName" className={style.form__input_label}>
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
          </>
        )}

        <FormInput
          placeholder="johndoe@gmail.com"
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

        {/* <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="firstName" className={style.form__input_label}>
              <Checkbox onChange={allowRegistrationHandle}>
                <div className={style.form__label_text}>
                  <div className={style.form__label_title}>
                    Allow Attendee Registration
                  </div>
                  <p className={style.form__label_content}>
                    Allow attendees not on the attendee list to register and
                    join the event.
                  </p>
                </div>
              </Checkbox>
            </label>
          </div>
        </div> */}

        {/* {currentEventType.type === "agm" && (
          <>
            <div className={style.form__input_wrap}>
              <div className={style.form__input_box}>
                <label htmlFor="firstName" className={style.form__input_label}>
                  <Checkbox onChange={allowPollHandle}>
                    <div className={style.form__label_text}>
                      <div className={style.form__label_title}>
                        Access to Poll & Question
                      </div>
                      <p className={style.form__label_content}>
                        Allow your users have access to poll and questions
                        created before the event goes live.
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
                  <label
                    htmlFor="firstName"
                    className={style.form__input_label}
                  >
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
                    onKeyPress={preventMinus}
                    onPaste={preventPasteNegative}
                  />
                </div>
                <div
                  className={`${style.form__input_box} ${style.form__input_box_2}`}
                >
                  <label htmlFor="endDate" className={style.form__input_label}>
                    Set Quorum by
                  </label>
                  <div className={style.input__date}>
                    <select
                      className={style.form__input}
                      onChange={quorumSetter}
                    >
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
          </>
        )} */}

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
            <div style={{ display: "flex" }}>
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
                </button>
              </Tooltip>
              <Button onClick={submitFileUpload}>
                {uploadingAttending ? (
                  <Spin size="large" color="#fff" />
                ) : (
                  "Upload File"
                )}
              </Button>
              {/* <MdFileUpload
                className={style.uploadIcon}
                onClick={submitFileUpload}
              /> */}
            </div>

            <Tooltip placement="right" title="Download Attendee template">
              <DownloadCsv
                data={attendees}
                csvHeader={[
                  { label: "Attendee Name", key: "name" },
                  { label: "Attendee Email", key: "email" },
                  { label: "Attendee Phone Number", key: "phone_number" },
                  { label: "Attendee Account", key: "account_number" },
                  { label: "Attendee Vote Right", key: "vote_rights" },
                ]}
                csvFileName="attendee.csv"
              />
            </Tooltip>
          </div>
          {templateFormatError && (
            <span className={style.validation__error}>
              {" "}
              {templateFormatError}
            </span>
          )}
        </div>
        {attendeeUploadResponse.status && (
          <Alert
            message={attendeeUploadResponse.message}
            type="error"
            showIcon
            closable
            onClose={onClose}
          />
        )}
        {attendeeUploadResponse.data && (
          <Alert
            message={attendeeUploadResponse.message}
            type="success"
            showIcon
            closable
            onClose={onClose}
          />
        )}
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
    </div>
  );
};

export const DownloadCsv = ({ csvHeader, csvFileName, data }) => {
  return (
    <CSVLink
      headers={csvHeader}
      data={data}
      filename={csvFileName}
      target="_blank"
    >
      <button
        type="button"
        className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
      >
        <MdFileDownload className={style.uploadIcon} />
      </button>
    </CSVLink>
  );
};

export default AttendeeForm;
