import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, Modal, Radio, Space, Spin, Tooltip, Upload } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "react-datetime/css/react-datetime.css";
import { useForm } from "react-hook-form";
import { AiFillQuestionCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadFile } from "../../../../api/eventHandler";
import AlertResponse from "../../../../Auth/AuthModalForm/AlertResponse";
import BannerTemplate from "../../../../components/BannerTemplate";
import SingleSelect, {
  Card,
  SingleCard,
} from "../../../../components/Cards/SingleCardSelect";
import CustomDatePicker from "../../../../components/DatePicker";
import FormInput from "../../../../components/FormInput";
import LabelText from "../../../../components/FormInput/LabelText";
import CustomModal from "../../../../components/Modals";
import UploadButton from "../../../../components/UploadButton";
import { createEventSchema } from "../../../../utils/Validation/createEventValidation";
import { iconList, template } from "../../constant";
import { postEventAction } from "../state/action";
import { createEventAction, resetCreateEvent } from "../state/eventAction";
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

const Events = ({
  colorCode,
  nextStep,
  handleMeetingType,
  handleColorCode,
  imageUrl,
  selectCardSelect,
  selectedVenue,
  currentEventType,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(createEventSchema),
  });

  const {
    status,
    data,
    message,
    loading: uiLoader,
  } = useSelector((state) => state.createEvent);

  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [showSeat] = useState(false);
  const { id } = useParams();
  const [countQuorom, setCountQuorom] = useState(0);
  const [quorumBy, setQuorumBy] = useState("Voting");
  const [quorumNumber, setQuorumNumber] = useState(0);
  const [allowAttendee, setAllowAttendee] = useState(0);

  const [templateVisible, setTemplateVisible] = useState(false);
  // const [physicalExist, setPhysicalExist] = useState(false);
  const [meetingType, setMeetingType] = useState("Public");
  const [venueType, setVenueType] = useState(null);

  const [bannerFileList, setBannerFileList] = useState([]);
  const [logoFileList, setLogoFileList] = useState([]);
  const [subEvent] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [meetingPlace, setMeetingPlace] = useState("");
  const [defaultBannerUrl, setDefaultBannerUrl] = useState("");
  const [unformattedStartDate, setUnformattedStartDate] = useState();
  const [fileError, setFileError] = useState({ errorMsg: "", error: false });
  const [fileBannerError, setFileBannerError] = useState({
    errorMsg: "",
    error: false,
  });
  const [endDateError, setEndDateError] = useState({
    errorMsg: "",
    error: false,
  });

  const [startDate, setStartDate] = useState(
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  );
  const [endDate, setEndDate] = useState("");

  const handleBannerTemplate = (item) => {
    console.log("hgeggegegeg", item);
    setDefaultBannerUrl(item.bannerUrl);
    setBannerFileList([]);
  };

  const onClose = (e) => {
    dispatch(resetCreateEvent);
  };

  console.log("fileBannerError", fileBannerError);

  const handleCancel = () => setPreviewVisible(false);

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

  const onSubmit = async (data) => {
    if (!endDate) {
      setEndDateError({
        error: true,
        errorMsg: "End Date is required",
      });
    } else {
      setEndDateError({
        error: false,
        errorMsg: "",
      });
    }
    if (logoFileList.length === 0) {
      setFileError({
        error: true,
        errorMsg: "Event logo is required",
      });
      return;
    } else {
      setFileError({
        error: false,
        errorMsg: "",
      });
    }

    if (
      fileBannerError.error === false &&
      fileError.error === false &&
      endDateError.error === false
    ) {
      setUploading(true);
      const httpRequests = [
        uploadFile({ file: logoFileList[0], file_name: "logoUrl" }),
      ];
      if (bannerFileList.length > 0) {
        httpRequests.push(
          uploadFile({ file: bannerFileList[0], file_name: "bannerUrl" })
        );
      }
      try {
        const [logoData, bannerData] = await Promise.all(httpRequests);
        const {
          data: {
            data: { file_link: logoUploadedUrl },
          },
        } = logoData;

        if (logoUploadedUrl) {
          const full = window.location.protocol + "//" + window.location.host;
          const selectedBannerUrl = defaultBannerUrl || template[0].bannerUrl;

          const customBannerUrl = full + selectedBannerUrl;
          const bannerUrl =
            bannerData?.data?.data?.file_link ?? customBannerUrl;

          const logoUrl = logoFileList.length
            ? logoUploadedUrl
            : customBannerUrl;

          const start = `${startDate} ${moment(startTime).format("HH:mm:ss")}`;
          const end = `${endDate} ${moment(endTime).format("HH:mm:ss")}`;

          const config = eventConfig();
          console.log("meetingPlace", meetingPlace);
          const payload = {
            banner: bannerUrl,
            logo: logoUrl,
            title: data.title,
            short_name: data.short_name,
            description: data.brief_desc,
            attendee_mode: venueType.title,
            event_type_id: id,
            meeting_type: meetingType.title || "Public",
            end_date: end,
            attendee_mode_type: meetingPlace,
            start_date: start,
            available_seats: Number(data.seatNumber) || 0,
            subscribe_to_upcoming: subEvent ? 1 : 0,
            allow_seat_booking: showSeat ? 1 : 0,
            venue: data.venue,
            organization_name: data.companyName,
            ...config,

            // end_date: moment(data.end_date).format("DD/MM/YYYY hh:mm:ss"),
            // start_date: moment(data.start_date).format("DD/MM/YYYY hh:mm:ss"),
          };

          dispatch(postEventAction(payload));
        }
      } catch (err) {
        const error = err.response?.data ?? "Something went wrong";
        dispatch(createEventAction({ data: error, status: "fail" }));
      } finally {
        setUploading(false);
      }
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
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";

      if (!isJpgOrPng) {
        setFileError({
          error: true,
          errorMsg: "You can only upload JPG/PNG file!",
        });
      }
      const isLt10M = (Math.round(+file.size / 1024) / 1000).toFixed(2);

      if (isLt10M > 10) {
        setFileError({
          error: true,
          errorMsg: "Image must smaller than 10MB!",
        });
      }

      if (isLt10M && isJpgOrPng) {
        // setDefaultBannerUrl("");
        setLogoFileList((prev) => [...prev, file]);
      } else {
        setLogoFileList([]);
      }

      return false;
    },
    logoFileList,
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
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";

      if (!isJpgOrPng) {
        setFileBannerError({
          error: true,
          errorMsg: "You can only upload JPG/PNG file!",
        });
      }
      const isLt10M = (Math.round(+file.size / 1024) / 1000).toFixed(2);

      if (isLt10M > 10) {
        setFileBannerError({
          error: true,
          errorMsg: "Image must smaller than 10MB!",
        });
      }

      if (isLt10M && isJpgOrPng) {
        setBannerFileList((prev) => [...prev, file]);
      } else {
        setBannerFileList([]);
      }

      return false;
    },
    bannerFileList,
  };

  useEffect(() => {
    if (status === "success") {
      nextStep();
    }
    return () => {
      if (status === "success") {
        dispatch(resetCreateEvent);
      }
    };
  }, [status]);

  const removeBanner = () => {
    setDefaultBannerUrl("");
    setBannerFileList([]);
  };

  const closeTemplate = () => {
    if (!defaultBannerUrl) {
      setDefaultBannerUrl(template[0].bannerUrl);
    }
    setTemplateVisible(false);
  };

  // const showSeatCount = (e) => {
  //   setShowSeat(e.target.checked);
  // };
  const disabledDate = (current) => {
    const today = moment();
    const past = moment(current);
    today.diff(past, "days");

    return today.diff(past, "days") >= 1;
  };
  const eventConfig = () => {
    return {
      allow_attendee_registration: allowAttendee,
      allow_poll_access: 0,
      count_proxy_by_quorum: countQuorom,
      quorum_number: quorumNumber,
      set_quorum_by: quorumBy,
    };
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
  const disabledEndDate = (current) => {
    return current && current < moment(unformattedStartDate, "YYYY-MM-DD");
  };

  const dateHandler = (date, dateLabel) => {
    if (dateLabel === "startDate") {
      setUnformattedStartDate(date);
      setStartDate(date.format("DD/MM/YYYY HH:mm:ss"));
      setStartDate(date.format("DD/MM/YYYY"));
    } else {
      setEndDate(date.format("DD/MM/YYYY"));
    }
  };

  const startTimeHandle = (val) => {
    setStartTime(val);
  };

  const endTimeHandler = (val) => {
    setEndTime(val);
  };

  // const getDisabledStartTime = (date, format) => {
  //   const hoursArr = [];
  //   const hours = moment(date).format(`${format}`);
  //   for (let i = 0; i < hours; i++) {
  //     hoursArr.push(i);
  //   }
  //   return hoursArr;
  // };

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
  const allowRegistrationHandle = (e) =>
    setAllowAttendee(e.target.checked ? 1 : 0);

  const countQuoromHandle = (e) => setCountQuorom(e.target.checked ? 1 : 0);

  // const quorumNumberHandle = (e) => setQuorumNumber(e.target.value);
  const quorumSetter = (e) => setQuorumBy(e.target.value);
  const quorumNumberHandle = (val) => {
    const newVal = val.target.value.replace(/,/g, "");
    setQuorumNumber(newVal);
  };

  const meetingPlaceHandler = (e) => {
    setMeetingPlace(e.target.value);
  };

  return (
    <section className={style.stepOne}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>

        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="bannerImage" className={style.form__input_label}>
              Upload Banner Image
            </label>
            <span className={style.validation__error}>
              {fileBannerError.errorMsg}
            </span>
            {defaultBannerUrl && bannerFileList.length === 0 ? (
              <div onClick={removeBanner} className={style.bannerImageBox}>
                <span style={{ position: "absolute", zIndex: 100 }}>
                  <MdClose size={20} color="rgba(255,255,255,.6)" />
                </span>
                <img
                  src={defaultBannerUrl}
                  style={{ width: "100%", objectFit: "cover", height: "150px" }}
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
                <UploadButton />
              </Dragger>
            )}

            <div
              className={style.uploadSubText}
              onClick={() => setTemplateVisible(true)}
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
            <label htmlFor="bannerImage" className={style.form__input_label}>
              Upload Event Logo
              <span
                style={{ color: fileError.errorMsg ? "#ef3125" : "#8d8d8d" }}
              >
                {" "}
                *
              </span>
            </label>
            <span className={style.validation__error}>
              {fileError.errorMsg}
            </span>
            <Dragger
              {...logoProps}
              style={{ width: "100%" }}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              accept="image/*"
              maxCount={1}
            >
              <UploadButton />
            </Dragger>
          </div>
        </div>

        <FormInput
          placeholder="Enter company name"
          labelTitle="Company name"
          inputType="text"
          isRequired
          errors={errors}
          name="companyName"
          watch={watch}
          maxLength={100}
          register={register("companyName")}
        />

        <FormInput
          placeholder="Enter event title"
          labelTitle="Event Title"
          inputType="text"
          isRequired
          errors={errors}
          name="title"
          watch={watch}
          maxLength={100}
          register={register("title")}
        />
        <FormInput
          placeholder="Enter short event title"
          labelTitle=" Short Event Title"
          inputType="text"
          isRequired
          isTextArea
          errors={errors}
          name="short_name"
          watch={watch}
          rows="1"
          maxLength={15}
          style={{ resize: "none" }}
          register={register("short_name")}
          // {...register("short_name")}
        />
        <FormInput
          placeholder="Enter Event Brief"
          labelTitle="Event Brief"
          inputType="text"
          isRequired
          isTextArea
          errors={errors}
          rows="5"
          name="brief_desc"
          watch={watch}
          style={{ resize: "none" }}
          register={register("brief_desc")}
          // {...register("brief_desc")}
        />

        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <LabelText labelTitle="How would you like Attendees to attend this meeting?" />
            <SingleSelect onChange={(item) => setVenueType(item)}>
              <Card icon={iconList[0]} position="1" title="Virtual" />
              <Card icon={iconList[1]} position="2" title="Physical" />
              <Card icon={iconList[2]} position="2" title="Hybrid" />
            </SingleSelect>
          </div>
        </div>
        {/* {venueType && venueType.title === "Physical" && (
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <Checkbox onChange={showSeatCount}>
                Allow Attendees book their seats
              </Checkbox>
            </div>
          </div>
        )} */}
        {venueType && venueType.title === "Hybrid" && (
          <>
            <div className={style.form__input_wrap}>
              <Radio.Group onChange={meetingPlaceHandler}>
                <Space direction="vertical">
                  <Radio value=" Conference">Video Conferencing</Radio>
                  <Radio value="Livestream">Live Streaming</Radio>
                </Space>
              </Radio.Group>
            </div>
          </>
        )}

        {venueType &&
          (venueType.title === "Hybrid" || venueType.title === "Physical") && (
            <FormInput
              placeholder="Enter vene"
              labelTitle="Venue"
              inputType="text"
              isRequired
              errors={errors}
              name="venue"
              watch={watch}
              maxLength={100}
              register={register("venue")}
            />
          )}
        {venueType && venueType.title === "Virtual" && (
          <div className={style.form__input_wrap}>
            <Radio.Group onChange={meetingPlaceHandler}>
              <Space direction="vertical">
                <Radio value=" Conference">Video Conferencing</Radio>
                <Radio value="Livestream">Live Streaming</Radio>
              </Space>
            </Radio.Group>
          </div>
        )}
        {showSeat && (
          <div className={style.form__input_wrap}>
            <div className={style.form__input_box}>
              <label htmlFor="title" className={style.form__input_label}>
                Seat Available
              </label>
              <input
                className={style.form__input}
                type="number"
                min="0"
                onKeyPress={preventMinus}
                onPaste={preventPasteNegative}
                {...register("seatNumber")}
              />
            </div>
            {/* <span className={style.validation__error}>
              {errors?.seatNumber?.message}
            </span> */}
          </div>
        )}

        <div className={style.form__input_wrap}>
          <div className={style.form__input_inline}>
            <div className={style.form__input_box}>
              <LabelText labelTitle="Start" />
              <CustomDatePicker
                showTime={true}
                disabledDate={disabledDate}
                timeHandler={startTimeHandle}
                dateHandler={(date) => dateHandler(date, "startDate")}
                //  disabledHours={() => getDisabledStartTime(moment(), "HH")}
                // disabledMinutes={() => getDisabledStartTime(moment(), "mm")}
              />
            </div>
            <div className={style.form__input_box}>
              <LabelText labelTitle="End" />

              <CustomDatePicker
                showTime={true}
                disabledDate={disabledEndDate}
                timeHandler={endTimeHandler}
                dateHandler={(date) => dateHandler(date, "endDate")}
                disabledHours={() => getDisabledEndTime(startTime, "HH")}
                // disabledMinutes={() => getDisabledEndTime(startTime, "mm")}
              />

              <span className={style.validation__error}>
                {endDateError.errorMsg}
              </span>
            </div>
          </div>
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="firstName" className={style.form__input_label}>
              Meeting Type
            </label>
            <SingleSelect onChange={(item) => setMeetingType(item)}>
              <SingleCard position="1" title="Public" />
              <SingleCard position="2" title="Private" />
            </SingleSelect>
          </div>
        </div>

        <div className={style.form__input_wrap}>
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
        </div>
        {currentEventType && currentEventType.type === "agm" && (
          <>
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
                      title="Quorum is the number of users needed to be present for an event to automatically commence"
                    >
                      <span style={{ color: "#ef3125", marginLeft: "10px" }}>
                        <AiFillQuestionCircle color="#5C6574" />
                      </span>
                    </Tooltip>
                  </label>
                  <NumberFormat
                    value={quorumNumber}
                    thousandSeparator={true}
                    // prefix="NGN"
                    className="form__input"
                    onChange={quorumNumberHandle}
                    onKeyPress={preventMinus}
                    onPaste={preventPasteNegative}
                    required
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
        )}

        <div className={style.form__input_wrap}>
          <button
            type="submit"
            disabled={uiLoader}
            className={style.form__input_submit_request}
          >
            {uiLoader || uploading ? (
              <Spin size="large" color="#fff" />
            ) : (
              "Continue"
            )}
          </button>
        </div>
        {data && (
          <AlertResponse
            status={status}
            data={data}
            onClose={onClose}
            message={message}
          />
        )}
      </form>
      <CustomModal visible={templateVisible} closeModal={setTemplateVisible}>
        <BannerTemplate
          handleBannerTemplate={handleBannerTemplate}
          closeTemplate={closeTemplate}
          defaultBannerUrl={defaultBannerUrl}
        />
      </CustomModal>
    </section>
  );
};

export default Events;
