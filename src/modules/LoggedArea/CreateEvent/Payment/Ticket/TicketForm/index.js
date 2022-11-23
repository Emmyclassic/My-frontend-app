import { yupResolver } from "@hookform/resolvers/yup";
import { Spin } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import AlertResponse from "../../../../../../Auth/AuthModalForm/AlertResponse";
import SingleSelect, {
  SingleCard,
} from "../../../../../../components/Cards/SingleCardSelect";
import { createTicketSchema } from "../../../../../../utils/Validation/ticketValidation";
import style from "../index.module.scss";
import { postTicketAction } from "../state/action";
import { resetCreateTicket } from "../state/paymentAction";

const TicketForm = () => {
  const dispatch = useDispatch();

  const {
    status,
    data,
    message,
    loading: uiLoader,
  } = useSelector((state) => state.createTicket);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTicketSchema),
  });
  const [ticketType, setTicketType] = useState("1");

  const onSubmit = (data) => {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));

    const payload = {
      name: data.ticketName,
      ticket_type_id: Number(ticketType),
      event_id: currentEvent.id,
      sales_starts: moment(data.startDate).format("DD/MM/YYYY hh:mm:ss"),
      sales_ends: moment(data.endDate).format("DD/MM/YYYY hh:mm:ss"),
      quantity: Number(data.ticketAmount),
      total_guests_tickets: Number(data.ticketAmountToGuest),
      price: Number(data.ticketPrice),
    };
    dispatch(postTicketAction(payload));
  };

  const onClose = (e) => {
    dispatch(resetCreateTicket);
    closeTicketModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.formInput_wrapper}>
        <div className={style.form__input_wrap}>
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
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="question" className={style.form__input_label}>
              <span>Ticket Type</span>
              <span style={{ color: "#EF3125", marginLeft: ".5rem" }}>
                <AiFillQuestionCircle color="#5C6574" size={13} />
              </span>
            </label>
            <SingleSelect onChange={(item) => setTicketType(item.id)}>
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
                  Ticket Name{" "}
                  <span style={{ color: "#EF3125" }}>(required)</span>
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
              <input
                className={style.form__input}
                type="number"
                name="price"
                placeholder="Enter price"
                onChange={ticketPriceHandler}
                value={ticketPrice}
                // {...register("ticketPrice")}
              />
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
                <span style={{ color: "#EF3125" }}>(required)</span>
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
                <span style={{ color: "#EF3125" }}>(required)</span>
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
                <span style={{ color: "#EF3125" }}>(required)</span>
              </span>
              <span style={{ color: "#EF3125", marginLeft: ".5rem" }}>
                <AiFillQuestionCircle color="#5C6574" size={13} />
              </span>
            </label>
            <input
              className={style.form__input}
              type="datetime-local"
              placeholder="Immediately after Publishing"
              name="startDate"
              {...register("startDate")}
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
                <span style={{ color: "#EF3125" }}>(required)</span>
              </span>
              <span style={{ color: "#EF3125", marginLeft: ".5rem" }}>
                <AiFillQuestionCircle color="#5C6574" size={13} />
              </span>
            </label>
            <input
              className={style.form__input}
              type="datetime-local"
              placeholder="On a Specific date"
              name="endDate"
              {...register("endDate")}
            />
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

export default TicketForm;
