import { yupResolver } from "@hookform/resolvers/yup";
import { Radio, Space, Spin } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillQuestionCircle } from "react-icons/ai";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import AlertResponse from "../../../../../Auth/AuthModalForm/AlertResponse";
import SingleSelect, {
  SingleCard,
} from "../../../../../components/Cards/SingleCardSelect";
import CustomDatePicker from "../../../../../components/DatePicker";
import { createTicketSchema } from "../../../../../utils/Validation/ticketValidation";
import { postTicketAction } from "../state/action";
import { resetCreateTicket } from "../state/paymentAction";
import style from "./index.module.scss";
import "./index.scss";

const CreateTicket = ({ ticketHandler, closeTicketModal }) => {
  const dispatch = useDispatch();
  const [ticketType, setTicketType] = useState("1");
  const [startTime, setStartTime] = useState();
  const [unformattedStartDate, setUnformattedStartDate] = useState();
  const [unformattedEndDate, setUnformattedEndDate] = useState();
  const [endTime, setEndTime] = useState();
  const [feeBearer, setFeeBearer] = useState();
  const [endDateError, setEndDateError] = useState({
    errorMsg: "",
    error: false,
  });

  const [startDate, setStartDate] = useState(
    moment(new Date()).format("DD/MM/YYYY hh:mm:ss")
  );
  const [endDate, setEndDate] = useState("");

  const [price, setPrice] = useState(0);
  const [isFree, setIsFree] = useState(false);
  const {
    status,
    data,
    message,
    loading: uiLoader,
  } = useSelector((state) => state.createTicket);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTicketSchema),
  });

  const onSubmit = (data) => {
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
      fee_bearer: feeBearer,
    };
    dispatch(postTicketAction(payload));
  };

  // useEffect(() => {
  //   if (status === "success") {
  //     ticketHandler();
  //   }
  // }, [status]);

  const onClose = (e) => {
    dispatch(resetCreateTicket);
    closeTicketModal();
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

  const disabledDate = (current) => {
    const today = moment();
    const past = moment(current);
    today.diff(past, "days");

    return today.diff(past, "days") >= 1;
  };
  const disabledEndDate = (current) => {
    return current && current < moment(unformattedStartDate, "YYYY-MM-DD");
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

  const ticketPriceHandler = (val) => {
    const newVal = val.target.value.replace(/,/g, "");
    setPrice(newVal);
  };

  useEffect(() => {
    if (data) {
      reset({ ticketName: "", ticketAmount: "", ticketAmountToGuest: "" });
      closeTicketModal();
      setTimeout(() => {
        onClose();
      }, 500);
    }
  }, [data]);

  const chargeHandler = (e) => {
    setFeeBearer(e.target.value);
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
            <SingleSelect onChange={(item) => ticketTypeHandler(item.id)}>
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
          <label htmlFor="ticketAmount" className={style.form__input_label}>
            Fee Bearer
          </label>
          <Radio.Group onChange={chargeHandler}>
            <Space direction="horizontal">
              <Radio value="organiser">Organiser</Radio>
              <Radio value="customer">Customer</Radio>
            </Space>
          </Radio.Group>
        </div>
        {feeBearer && (
          <div className={style.breakdownCont}>
            <ul className={style.breakDown_list}>
              <li className={style.breakDown_listItem}>
                Transaction Amount = NGN{price}
              </li>
              <li className={style.breakDown_listItem}>
                VAT = NGN{(7.5 / 100) * price}
              </li>
              <li className={style.breakDown_listItem}>
                Transaction charge = NGN{(1.5 / 100) * price}
              </li>
            </ul>
          </div>
        )}

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
              value={unformattedStartDate}
              disabledDate={disabledDate}
              timeHandler={startTimeHandle}
              actualTime={startTime}
              dateHandler={(date) => dateHandler(date, "startDate")}
              //  disabledHours={() => getDisabledStartTime(moment(), "HH")}
              //  disabledMinutes={() => getDisabledStartTime(moment(), "mm")}
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
              disabledDate={disabledEndDate}
              timeHandler={endTimeHandler}
              value={unformattedEndDate}
              actualTime={endTime}
              dateHandler={(date) => dateHandler(date, "endDate")}
              disabledHours={() => getDisabledEndTime(startTime, "HH")}
              disabledMinutes={() => getDisabledEndTime(startTime, "mm")}
            />
            <span className={style.validation__error}>
              {endDateError.errorMsg}
            </span>
          </div>
          <span className={style.validation__error}>
            {errors.endDate?.message}
          </span>
        </div>
      </div>

      <button type="submit" className={style.poll_btn} disabled={uiLoader}>
        {uiLoader ? <Spin size="large" color="#fff" /> : " Create Ticket"}
      </button>

      {data && (
        <AlertResponse
          status={status}
          data={data}
          onClose={onClose}
          message={message}
        />
      )}
    </form>
  );
};

export default CreateTicket;
