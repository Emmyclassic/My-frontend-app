import { Dropdown, Menu } from "antd";
import React, { Fragment } from "react";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import style from "./index.module.scss";

const Landing = ({ setTab, nextStep }) => {
  const eventResponse = useSelector((state) => state.eventTypes);
  const { id } = useParams();

  const currentEventType = eventResponse.data?.find((item) => item.id === id);
  console.log("currentEventType", eventResponse);
  const menu = (
    <Menu>
      <Menu.Item>
        <div className={style.menuItem} onClick={() => setTab("document")}>
          Add Document
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className={style.menuItem} onClick={() => setTab("documentLink")}>
          Add Link
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className={style.menuItem} onClick={() => setTab("videoUpload")}>
          Add Video
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Fragment>
      <div className={style.resourceTitle}>
        Add a document or link to resources for this event
      </div>
      <div className={style.main_container}>
        <img
          src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940354/apems/user_oardue.jpg"
          className={style.main_container_imgbox}
        />
        <h4 className={style.main_container_title}>
          Add documents, links or videos
        </h4>
        <div className={style.main_container_content}>
          {`You can add documents and/or links for resources for this event.`}
        </div>
        <div className={style.main_container_btnContainer}>
          <Dropdown
            overlay={menu}
            placement="bottomCenter"
            arrow
            trigger={["click"]}
          >
            <button
              onClick={() => {}}
              className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_res}`}
            >
              <span className={style.main_container_btnContainer_btn_icon}>
                <FiPlus size={18} color="#09974d" />
              </span>
              <span className={style.main_container_btnContainer_btn_title}>
                Add documents, links or videos
              </span>
            </button>
          </Dropdown>

          {currentEventType.type === "meetings" && (
            <button
              onClick={() => setTab("entertainer")}
              className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_elec}`}
            >
              Add Panelist/Speakers
            </button>
          )}
          {currentEventType.type === "concerts" && (
            <button
              onClick={() => setTab("entertainer")}
              className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_elec}`}
            >
              Add Entertainer
            </button>
          )}
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <button
          onClick={nextStep}
          type="button"
          className={style.form__input_submit_request}
        >
          {"Skip & Continue >>>"}
        </button>
      </div>
    </Fragment>
  );
};

export default Landing;
