import React, { useState } from "react";
import { Tooltip, Modal } from "antd";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import Arrow from "../../../../components/Dashboard/Arrow";
import { MdSend, MdDelete } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { BsPaperclip } from "react-icons/bs";
import { AiFillPicture } from "react-icons/ai";
import { HiOutlineUserAdd } from "react-icons/hi";

import style from "./index.module.scss";

function SendEmail({ id }) {
  console.log(id);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <PrivateGenericLayout
      leftNav={
        <>
          <Arrow />
          <DashboardLeftHeaderNav
            title="Send Mail"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
          />
        </>
      }
      RightNav={<></>}
    >
      <div className={style.main}>
        <div className={style.top_container}>
          <div className={style.jumbotron}>
            <h6>{`We're Creating Something Very Cool!`}</h6>
            <div className={style.jumbotron_desc}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua…….
              </p>
            </div>
          </div>
        </div>
        <div className={style.bottom_container}>
          <div className={style.doc_container}>
            <div className={style.uploadedDoc_list_item}>
              <div className={style.uploadImg_name}>
                <img
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940351/apems/pdf_dhlfew.png"
                  className={style.uploadImg}
                />
                <span className={style.uploadFile}>
                  AP Read More.pdf (1.5mb)
                </span>
              </div>
            </div>
            <div className={style.uploadedDoc_list_item}>
              <div className={style.uploadImg_name}>
                <img
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940356/apems/word_ki7ugm.png"
                  className={style.uploadImg}
                />
                <span className={style.uploadFile}>
                  AP Read More.pdf (1.5mb)
                </span>
              </div>
            </div>
          </div>
          <div className={style.bottom_container_top}>
            <div className={style.input_area}>
              <input
                name="email"
                type="email"
                placeholder="Enter email address"
              />
              <div className={style.input_area_icon}>
                <HiOutlineUserAdd color="#fff" size="22" />
              </div>
            </div>
            <div className={style.people_area}>
              <div className={style.people_area_list}>
                <div className={style.name__avatar__box}>
                  <span className={style.name__avatar__box__avatar}>AD</span>
                  <span className={style.name__avatar__box__avatar}>AD</span>
                  <span className={style.name__avatar__box__avatar}>BD</span>
                  <span className={style.name__avatar__box__avatar}>MD</span>
                </div>
                <div className={style.name__avatar__count}>+5 Accepted</div>
              </div>
            </div>
          </div>
          <div className={style.action_group}>
            <div className={style.action_group_left}>
              <Tooltip placement="bottomLeft" title="Add Attachment">
                <div>
                  <BsPaperclip size="20" />
                </div>
              </Tooltip>
              <div className={style.margin_left}>
                <Tooltip placement="bottomLeft" title="Add Image">
                  <div>
                    <AiFillPicture size="20" />
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className={style.action_group_right}>
              <div>
                <Tooltip placement="bottomRight" title="Schedule Mail">
                  <div>
                    <IoIosInformationCircle size="20" />
                  </div>
                </Tooltip>
              </div>
              <div className={style.margin_left}>
                <Tooltip placement="bottomRight" title="Delete Mail">
                  <div>
                    <MdDelete />
                  </div>
                </Tooltip>
              </div>
              <div className={style.margin_left}>
                <FaEllipsisV size="20" />
              </div>
              <div className={style.margin_left}>
                <button className={style.send_button} onClick={showModal}>
                  <span>Send </span>
                  <MdSend color="#fff" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </PrivateGenericLayout>
  );
}

export default SendEmail;
