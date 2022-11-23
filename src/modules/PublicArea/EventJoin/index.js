import { Modal } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { GiPerson, GiVirtualMarker } from "react-icons/gi";
import { ImBook } from "react-icons/im";
import { MdKeyboardArrowLeft, MdOpenInBrowser } from "react-icons/md";
import { useHistory } from "react-router-dom";
import SingleSelect, {
  SingleCard,
} from "../../../components/Cards/SingleCardSelect";
import EventPreviewLayout from "../../../components/Layout/EventPreviewLayout";
import LeftDrawerModal from "../../../components/LeftDrawerModal";
import PageCard from "../../../components/PageCard";
import RegisterEvent from "../ConcertPreview/EventForm";
import style from "./index.module.scss";
import "./index.scss";

export const iconList = [
  {
    name: GiVirtualMarker,
    size: 20,
  },
  {
    name: GiPerson,
    size: 20,
  },
  {
    name: MdOpenInBrowser,
    size: 20,
  },
];

const EventJoinOverview = () => {
  const [openRegisterEvent, setOpenRegisterEvent] = useState(false);
  const [openMeetingModal, setOpenMeetingModal] = useState(false);
  const [joinType, setJoinType] = useState("1");
  // const [, setVenueType] = useState(null);
  const history = useHistory();

  const toggleRegisterModal = (item) => {
    console.log("item", item);
    if (item.id === "3") {
      setOpenRegisterEvent(true);
    }
  };

  const toggleJoinForm = (item) => {
    setJoinType(item.id);
  };
  return (
    <EventPreviewLayout>
      <section>
        <div className={style.container}>
          <div className={style.containerNav}>
            <div className={style.containerNav_left}>
              <span className={style.containerNav_iconBox}>
                <MdKeyboardArrowLeft size={20} />
              </span>
            </div>
            <div className={style.containerNav_right}>
              <button
                onClick={() => setOpenMeetingModal(true)}
                className={style.publishEvent}
              >
                Enter Event Room
              </button>
            </div>
          </div>
          <PageCard
            containerStyle={{
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "35rem",
              borderRadius: "10px",
            }}
            containerTitleStyle={{ fontSize: "3.3rem" }}
            leftSideStyle={{
              padding: "4rem",
              marginTop: "2rem",
              positon: "relative",
            }}
            backgroundUrl="https://res.cloudinary.com/solomonfrank/image/upload/v1655940349/apems/meeting4_cqalpb.jpg"
            pageName=""
            title="UBA STAKEHOLDER ANNUAL GENERAL MEETING."
            footerTitle="28th September, 2021 | 2:00 PM"
          />
          <div className={style.description}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr.
          </div>
          <div className={style.resourceBox}>
            <SingleSelect onChange={(item) => toggleRegisterModal(item)}>
              <ResourceCard
                title="Enter Event Room"
                position="1"
                onClick={() => setOpenMeetingModal(true)}
                icon={<BsPeopleFill className={style.iconResource} size={25} />}
              />
              <ResourceCard
                title="Resource Centre"
                position="2"
                icon={<ImBook className={style.iconResource} size={25} />}
                url="/event/join"
              />
              <ResourceCard
                title="Register for this event"
                position="3"
                icon={
                  <FaCalendarAlt className={style.iconResource} size={25} />
                }
              />
            </SingleSelect>
          </div>
        </div>
        <LeftDrawerModal
          visible={openRegisterEvent}
          tagName="Event Registration"
          headerTitle="Register for this event"
          closeModal={() => setOpenRegisterEvent(false)}
        >
          <RegisterEvent />
        </LeftDrawerModal>

        <Modal
          onCancel={() => setOpenMeetingModal(false)}
          destroyOnClose
          closable={false}
          bodyStyle={{
            backgroundColor: "rgba(0,0,0, 0.45)",
            padding: 0,
            borderRadius: "5px",
          }}
          visible={openMeetingModal}
          className="meetingPop"
          // onOk={() => setVisible(false)}

          footer={null}
          header={null}
        >
          <div className={style.eventJoinForm}>
            <h4 className={style.joinHeader}>Enter meeting room as</h4>
            <div className={style.regTypeBox}>
              <SingleSelect
                containerStyle={{
                  justifyContent: "flex-start",
                  width: "100%",
                }}
                selectedDefaultItem="0"
                onChange={(item) => toggleJoinForm(item)}
              >
                <SingleCard
                  title="A member"
                  position="1"
                  prefixCls="joinType"
                />
                <SingleCard
                  title="An Observer"
                  position="2"
                  prefixCls="joinType"
                />
              </SingleSelect>
            </div>
            {joinType === "2" && (
              <JoinMeetingForm
                toggleAudioTest={() => history.push("/Audio/test")}
                closeMeetingModal={() => setOpenMeetingModal(false)}
              />
            )}

            {joinType === "1" && (
              <JoinMeetingForm
                closeMeetingModal={() => setOpenMeetingModal(false)}
                toggleAudioTest={() => history.push("/Audio/test")}
              />
            )}
          </div>
        </Modal>
      </section>
    </EventPreviewLayout>
  );
};

const ResourceCard = ({
  title,
  icon,
  cardClick,
  isSelected,
  prefixCls = "resourceItem",
  childKey,
  cardStyle,
  stepIndex,
  onClick,
  url,
}) => {
  const classString = classNames(`${style.resourceItem}`, {
    [`${style.resourceItem_selected}`]: isSelected === stepIndex,
  });
  const history = useHistory();

  const redirectToGallery = () => {
    cardClick(stepIndex, { id: childKey, title });
    if (onClick) {
      onClick();
    } else {
      if (url) {
        history.push(`${url}`);
      }
    }
  };
  return (
    <div
      className={classString}
      style={{ ...cardStyle }}
      onClick={redirectToGallery}
    >
      <span className={style.iconBox}>{icon}</span>
      <div className={style.resourceName}>{title}</div>
    </div>
  );
};

// const JoinType = ({
//   title,
//   icon,
//   cardClick,
//   isSelected,
//   prefixCls,
//   childKey,
//   cardStyle,
//   stepIndex,
//   url,
// }) => {
//   const classString = classNames(`${style.JoinType}`, {
//     [`${style.JoinType__selected}`]: isSelected === stepIndex,
//   });

//   return (
//     <div
//       onClick={() => alert()}
//       className={classString}
//       style={{ ...cardStyle }}
//     >
//       {title}
//     </div>
//   );
// };

export const JoinMeetingForm = ({ toggleAudioTest, closeMeetingModal }) => {
  const joinMeetingHandler = (e) => {
    e.preventDefault();
    closeMeetingModal(false);
    toggleAudioTest(true);
  };
  return (
    <div className={style.meetingForm}>
      <form onSubmit={joinMeetingHandler}>
        <div className={style.form__input_wrap}>
          <div className={style.meeting__input_box}>
            <label htmlFor="question" className={style.meeting_label}>
              Your Name
            </label>
            <input
              className={style.meeting__input}
              type="text"
              placeholder="Enter your name"
              name="fullName"
            />
          </div>
          <div className={style.meeting__input_box}>
            <label htmlFor="question" className={style.meeting_label}>
              Meeting Id
            </label>
            <input
              className={style.meeting__input}
              type="text"
              placeholder="Enter meeting id"
              name="meedtingId"
            />
          </div>
        </div>
        <button type="submit" className={style.meetingJoinBtn}>
          Enter Room
        </button>
      </form>
    </div>
  );
};

export const VotingMeetingForm = ({ toggleAudioTest, closeMeetingModal }) => {
  const joinMeetingHandler = (e) => {
    e.preventDefault();
    closeMeetingModal(false);
    toggleAudioTest(true);
  };
  return (
    <div className={style.meetingForm}>
      <form onSubmit={joinMeetingHandler}>
        <div className={style.form__input_wrap}>
          <div className={style.meeting__input_box}>
            <label htmlFor="question" className={style.meeting_label}>
              Meeting ID
            </label>
            <input
              className={style.meeting__input}
              type="text"
              placeholder="Enter Meeting ID"
              name="fullName"
            />
          </div>
          <div className={style.meeting__input_box}>
            <label htmlFor="question" className={style.meeting_label}>
              Passcode
            </label>
            <input
              className={style.meeting__input}
              type="text"
              placeholder="Enter Passcode"
              name="meedtingId"
            />
          </div>
        </div>
        <button type="submit" className={style.meetingJoinBtn}>
          Start Voting
        </button>
      </form>
    </div>
  );
};

export default EventJoinOverview;
