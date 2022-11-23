import { yupResolver } from "@hookform/resolvers/yup";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { updateDonation } from "../../../../../api/eventHandler";
import AlertResponse from "../../../../../Auth/AuthModalForm/AlertResponse";
import DeleteModal from "../../../../../components/DeleteModal";
import LeftDrawerModal from "../../../../../components/LeftDrawerModal";
import { createDonationSchema } from "../../../../../utils/Validation/resourceValidation";
import style from "./index.module.scss";

const EditDonation = ({
  closeDonationModal,
  item,
  reload,
  openEditDonation,
  removeDonation,
}) => {
  const [responseData, setResponseData] = useState();
  //   const [donation, setDonation] = useState(item);
  const [loading, setLoading] = useState(false);
  const [goalError, setGoalError] = useState();
  const [deleteResolutionOpen, setDeleteResolutionOpen] = useState(false);
  const [goal, setGoal] = useState(item?.goal);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(createDonationSchema),
    defaultValues: {
      title: item?.title,
    },
  });

  const cancelDelete = () => {
    openEditDonation(true);
    setDeleteResolutionOpen(false);
  };

  const removeResolutionFunc = () => {
    setDeleteResolutionOpen(false);
    removeDonation();
  };

  const onSubmit = async (data) => {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
    setLoading(true);
    const payload = {
      title: data.title,
      goal: Number(goal.replace(/NGN/g, "")),
    };
    try {
      const res = await updateDonation(payload, currentEvent.id, item.id);
      setLoading(false);

      setResponseData({
        data: res.data.data,
        status: "success",
        message: "Donation updated successfully",
      });

      if (closeDonationModal) {
        closeDonationModal();
      }
    } catch (err) {
      setLoading(false);
      const error = err.response?.data ?? "Something went wrong";
      setResponseData({ data: error, status: "fail", message: error });
    }
  };
  const onClose = (e) => setResponseData();
  const ticketPriceHandler = (val) => {
    const newVal = val.target.value.replace(/,/g, "");
    setGoal(newVal);
    if (val.target.value) {
      setGoalError();
    }
  };
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
            <NumberFormat
              value={goal}
              thousandSeparator={true}
              prefix="NGN"
              className="form__input"
              onChange={ticketPriceHandler}
              required
            />
            {goalError && (
              <span className={style.validation__error}>{goalError}</span>
            )}
          </div>
        </div>
      </div>

      {/* <button type="submit" disabled={loading} className={style.poll_btn}>
        {loading ? <Spin size="large" color="#fff" /> : "Update Donation"}
        <button type="button" className="btn-gray btn-del">
          Delete
        </button>
      </button> */}
      <div className={style.btnWrapper}>
        <button
          type="submit"
          disabled={loading}
          className="btn-gray"
          style={{ marginRight: "1rem" }}
        >
          {loading ? <Spin size="large" color="#fff" /> : "Update Donation"}
        </button>
        <button
          type="button"
          className="btn-gray btn-del"
          onClick={() => setDeleteResolutionOpen(true)}
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
        modalHeight="100vh"
        visible={deleteResolutionOpen}
        closeModal={() => setDeleteResolutionOpen(false)}
      >
        <DeleteModal
          deleteBtnText="Yes, Delete Donation"
          HeaderTitle="Delete Donation?"
          desc={`You're about to delete this donation, are you sure?`}
          cancelDelete={cancelDelete}
          deleteHandler={removeResolutionFunc}
        />
      </LeftDrawerModal>
    </form>
  );
};

export default EditDonation;
