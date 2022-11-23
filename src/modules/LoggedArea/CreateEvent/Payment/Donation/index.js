import { yupResolver } from "@hookform/resolvers/yup";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { createDonation } from "../../../../../api/eventHandler";
import AlertResponse from "../../../../../Auth/AuthModalForm/AlertResponse";
import { createDonationSchema } from "../../../../../utils/Validation/resourceValidation";
import style from "./index.module.scss";

const Donation = ({ closeDonationModal }) => {
  const [responseData, setResponseData] = useState();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createDonationSchema),
  });

  const [goal, setGoal] = useState();
  const [goalError, setGoalError] = useState();

  const onSubmit = async (data) => {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
    setLoading(true);
    const payload = {
      title: data.title,
      goal: Number(goal.replace(/NGN/g, "")),
    };
    try {
      const res = await createDonation(payload, currentEvent.id);
      setLoading(false);

      setResponseData({
        data: res.data.data,
        status: "success",
        message: "Donation created successfully",
      });

      reset({ title: "" });
      setGoal();
      if (closeDonationModal) {
        closeDonationModal();
      }
    } catch (err) {
      setLoading(false);
      const error = err.response?.data ?? "Something went wrong";
      setResponseData({ data: error, status: "fail", message: error });
    }
  };
  const ticketPriceHandler = (val) => {
    const newVal = val.target.value.replace(/,/g, "");
    setGoal(newVal);
    if (val.target.value) {
      setGoalError();
    }
  };
  const onClose = (e) => setResponseData();
  useEffect(() => {
    if (responseData) {
      onClose();
      setTimeout(() => {
        onClose();
      }, 500);
    }
  }, [responseData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.formInput_wrapper}>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="question" className={style.form__input_label}>
              Donation Title
            </label>
            <input
              className={style.form__input}
              type="text"
              placeholder="Corporate Funding"
              name="title"
              {...register("title")}
            />
            <span className={style.validation__error}>
              {errors.title?.message}
            </span>
          </div>
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="question" className={style.form__input_label}>
              Donation Goal
            </label>
            <div className={style.donationContainer}>
              <select className="form__input form__input_currency">
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
              </select>
              <NumberFormat
                value={goal}
                thousandSeparator={true}
                // prefix="NGN"
                className="form__input form__input_donation"
                onChange={ticketPriceHandler}
                required
                min={0}
                placeholder="9000"
              />
            </div>

            {goalError && (
              <span className={style.validation__error}>{goalError}</span>
            )}
          </div>
        </div>
      </div>

      <button type="submit" disabled={loading} className={style.poll_btn}>
        {" "}
        {loading ? <Spin size="large" color="#fff" /> : "Create Donation"}
      </button>
      {responseData && (
        <AlertResponse
          status={responseData.status}
          data={responseData.data}
          onClose={onClose}
          message={responseData.message}
        />
      )}
    </form>
  );
};

export default Donation;
