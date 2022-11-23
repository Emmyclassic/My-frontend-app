import { yupResolver } from "@hookform/resolvers/yup";
import { Spin } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillQuestionCircle } from "react-icons/ai";
import NumberFormat from "react-number-format";
import { updateTicket } from "../../../../../../api/ticketHandler";
import AlertResponse from "../../../../../../Auth/AuthModalForm/AlertResponse";
import SingleSelect, {
  SingleCard,
} from "../../../../../../components/Cards/SingleCardSelect";
import CustomDatePicker from "../../../../../../components/DatePicker";
import DeleteModal from "../../../../../../components/DeleteModal";
import LeftDrawerModal from "../../../../../../components/LeftDrawerModal";
import { createTicketSchema } from "../../../../../../utils/Validation/ticketValidation";
import style from "../index.module.scss";

const EditTicket = ({
  ticketHandler,
  closeTicketModal,
  item,
  openEditTicket,
  reloadTicket,
  removeTicket,
}) => {
  const [ticketType, setTicketType] = useState("1");
  const [price, setPrice] = useState(item?.price);
  const [responseData, setResponseData] = useState();
  const [isFree, setIsFree] = useState();
  const [loading, setLoading] = useState(false);

  const [deleteResolutionOpen, setDeleteResolutionOpen] = useState(false);
  const [startDate, setStartDate] = useState(
    moment(item?.sales_starts, "DD-MM-YYYY").format("DD/MM/YYYY")
  );
  const [endDate, setEndDate] = useState(
    moment(item?.sales_ends, "DD-MM-YYYY").format("DD/MM/YYYY")
  );
  const [unformattedStartDate, setUnformattedStartDate] = useState();
  const [startTime, setStartTime] = useState(
    moment(item?.sales_starts, "DD-MM-YYYY HH:mm:ss")
  );
  const [endTime, setEndTime] = useState(
    moment(item?.sales_ends, "DD-MM-YYYY HH:mm:ss")
  );

  console.log("item", item);

  const cancelDelete = () => {
    openEditTicket(true);
    setDeleteResolutionOpen(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTicketSchema),
    defaultValues: {
      ticketName: item?.name,
      ticketAmount: item?.quantity,
      ticketAmountToGuest: item?.total_guests_tickets,
    },
  });

  const onSubmit = async (data) => {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
    const start = `${startDate} ${moment(startTime).format("HH:mm:ss")}`;
    const end = `${endDate} ${moment(endTime).format("HH:mm:ss")}`;

    const payload = {
      name: data.ticketName,
      ticket_type_id: Number(ticketType),
      event_id: currentEvent.id,
      sales_starts: start,
      sales_ends: end,
      quantity: Number(data.ticketAmount),
      total_guests_tickets: Number(data.ticketAmountToGuest),
      price: Number(price),
      fee_bearer: "organiser",
    };
    try {
      setLoading(true);
      const res = await updateTicket(payload, item.id);
      setLoading(false);

      setResponseData({
        data: res.data.data,
        status: "success",
        message: "Ticket updated successfully",
      });

      reloadTicket();

      if (closeTicketModal) {
        closeTicketModal();
      }
    } catch (err) {
      setLoading(false);
      const error = err.response?.data ?? "Something went wrong";
      setResponseData({ data: error, status: "fail", message: error });
    }
  };

  // useEffect(() => {
  //   if (status === "success") {
  //     ticketHandler();
  //   }
  // }, [status]);

  const onClose = (e) => setResponseData();
  useEffect(() => {
    if (responseData) {
      onClose();
      setTimeout(() => {
        onClose();
      }, 500);
    }
  }, [responseData]);
  const ticketPriceHandler = (val) => {
    const newVal = val.target.value.replace(/,/g, "");
    setPrice(newVal);
  };

  const ticketTypeHandler = (value) => {
    if (value === "1") {
      setIsFree(true);
      setPrice(0);
    } else {
      setIsFree(false);
      setPrice();
    }
    setTicketType(value);
  };

  const removeTicketFunc = () => {
    setDeleteResolutionOpen(false);
    removeTicket();
  };
  const endTimeHandler = (val) => {
    setEndTime(val);
  };
  const startTimeHandle = (val) => {
    setStartTime(val);
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
  const getDisabledStartTime = (date, format) => {
    const hoursArr = [];
    const hours = moment(date).format(`${format}`);
    for (let i = 0; i < hours; i++) {
      hoursArr.push(i);
    }
    return hoursArr;
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.formInput_wrapper}>
        {/* <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="question" className={style.form__input_label}>
              Label
            </label>
            <input
              className={style.form__input}
              type="label"
              placeholder="Africaprudential Event Management Meeting"
              name="label"
              {...register("label")}
            />
          </div>
        </div> */}
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="question" className={style.form__input_label}>
              <span>Ticket Type</span>
              <span style={{ color: "#EF3125", marginLeft: ".5rem" }}>
                <AiFillQuestionCircle color="#5C6574" size={13} />
              </span>
            </label>
            <SingleSelect
              onChange={(item) => ticketTypeHandler(item.id)}
              selectedDefaultItem={item.ticket_type.name === "Free" ? "0" : "1"}
            >
              <SingleCard position="1" title="Free" prefixCls="ticketType" />
              <SingleCard position="2" title="Paid" prefixCls="ticketType" />
            </SingleSelect>
          </div>
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_inline}>
            <div className={style.form__input_box}>
              <label className={style.form__input_label} htmlFor="ticketName">
                <span>
                  Ticket Name <span style={{ color: "#EF3125" }}>*</span>
                </span>
                <span style={{ color: "#EF3125", marginLeft: ".5rem" }}>
                  <AiFillQuestionCircle color="#5C6574" size={13} />
                </span>
              </label>
              <input
                className={style.form__input}
                type="text"
                name="ticketName"
                placeholder="Enter ticket name"
                {...register("ticketName")}
              />
              <span className={style.validation__error}>
                {errors.ticketName?.message}
              </span>
            </div>

            <div className={style.form__input_box}>
              <label htmlFor="ticketPrice" className={style.form__input_label}>
                Price
              </label>
              <NumberFormat
                value={price}
                thousandSeparator={true}
                // prefix="NGN"
                className="form__input"
                readOnly={isFree}
                onChange={ticketPriceHandler}
                required
              />
              {/* <input
                className={style.form__input}
                type="number"
                name="price"
                value={unFormattedPrice}
                readOnly={isFree}
                placeholder="Enter price"
                onChange={ticketPriceHandler}
              /> */}
              <span className={style.validation__error}>
                {errors.ticketPrice?.message}
              </span>
            </div>
          </div>
        </div>

        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="ticketAmount" className={style.form__input_label}>
              <span>
                Amount of Ticket
                <span style={{ color: "#EF3125" }}>*</span>
              </span>
              <span style={{ color: "#EF3125", marginLeft: ".5rem" }}>
                <AiFillQuestionCircle color="#5C6574" size={13} />
              </span>
            </label>
            <input
              className={style.form__input}
              type="number"
              placeholder="e.g 10"
              name="ticketAmount"
              {...register("ticketAmount")}
            />
          </div>
          <span className={style.validation__error}>
            {errors.ticketAmount?.message}
          </span>
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label
              htmlFor="ticketAmountToGuest"
              className={style.form__input_label}
            >
              <span>
                Amount of Ticket Available to Guest
                <span style={{ color: "#EF3125" }}>*</span>
              </span>
              <span style={{ color: "#EF3125", marginLeft: ".5rem" }}>
                <AiFillQuestionCircle color="#5C6574" size={13} />
              </span>
            </label>
            <input
              className={style.form__input}
              type="number"
              placeholder="e.g 10"
              name="ticketAmount"
              {...register("ticketAmountToGuest")}
            />
          </div>
          <span className={style.validation__error}>
            {errors.ticketAmountToGuest?.message}
          </span>
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="startDate" className={style.form__input_label}>
              <span>
                Sales Start
                <span style={{ color: "#EF3125" }}>*</span>
              </span>
              <span style={{ color: "#EF3125", marginLeft: ".5rem" }}>
                <AiFillQuestionCircle color="#5C6574" size={13} />
              </span>
            </label>
            <CustomDatePicker
              showTime={true}
              actualTime={startTime}
              // actualTime={moment(election?.starts_at, "HH:mm:ss")}
              dateValue={moment(item?.sales_starts)}
              disabledDate={disabledDate}
              timeHandler={startTimeHandle}
              dateHandler={(date) => dateHandler(date, "startDate")}
              disabledHours={() => getDisabledStartTime(moment(), "HH")}
              disabledMinutes={() => getDisabledStartTime(moment(), "mm")}
            />
          </div>
          <span className={style.validation__error}>
            {errors.startDate?.message}
          </span>
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="endDate" className={style.form__input_label}>
              <span>
                Sales End
                <span style={{ color: "#EF3125" }}>*</span>
              </span>
              <span style={{ color: "#EF3125", marginLeft: ".5rem" }}>
                <AiFillQuestionCircle color="#5C6574" size={13} />
              </span>
            </label>

            <CustomDatePicker
              showTime={true}
              actualTime={endTime}
              dateValue={moment(item?.sales_ends)}
              disabledDate={disabledEndDate}
              timeHandler={endTimeHandler}
              dateHandler={(date) => dateHandler(date, "endDate")}
              disabledHours={() => getDisabledEndTime(startTime, "HH")}
              disabledMinutes={() => getDisabledEndTime(startTime, "mm")}
            />
          </div>
          <span className={style.validation__error}>
            {errors.endDate?.message}
          </span>
        </div>
      </div>

      <div className={style.btnWrapper}>
        <button type="submit" disabled={loading} className="btn-gray">
          {loading ? <Spin size="large" color="#fff" /> : "Update Ticket"}
        </button>
        <button
          type="button"
          onClick={() => setDeleteResolutionOpen(true)}
          className="btn-gray btn-del"
        >
          Delete
        </button>
      </div>

      {responseData && (
        <AlertResponse
          status={responseData.status}
          data={responseData.data}
          onClose={onClose}
          message={responseData.message}
        />
      )}
      <LeftDrawerModal
        visible={deleteResolutionOpen}
        modalHeight="100vh"
        closeModal={() => setDeleteResolutionOpen(false)}
      >
        <DeleteModal
          deleteBtnText="Yes, Delete Ticket"
          HeaderTitle="Delete Ticket?"
          desc={`You're about to delete this ticket, are you sure?`}
          cancelDelete={cancelDelete}
          deleteHandler={removeTicketFunc}
        />
      </LeftDrawerModal>
    </form>
  );
};

export default EditTicket;
