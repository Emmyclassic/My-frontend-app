import React from "react";
import style from "./index.module.scss";

const DeleteModal = ({
  deleteHandler,
  cancelDelete,
  deleteBtnText = "Yes, Delete Resolution",
  HeaderTitle = "Delete Resolution?",
  desc = `You're about to delete this resolution, are you sure?`,
}) => {
  return (
    <div className={style.deletContainer}>
      <div className={style.topCont}>
        <div className={style.deleteBox}>
          <img
            src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940340/apems/delete_rikwx7.png"
            alt="delete icon"
            className={style.deletContainer_img}
          />
        </div>

        <div className={style.deleteContent}>
          <h4 className={style.deleteHeader}>{HeaderTitle}</h4>
          <p className={style.deletePara}>{desc}</p>
        </div>
      </div>

      <div className={style.btnWrapper}>
        <button type="button" className="btn-gray" onClick={cancelDelete}>
          No, Go Back
        </button>
        <button
          type="button"
          onClick={deleteHandler}
          className="btn-gray btn-del"
        >
          {deleteBtnText}
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
