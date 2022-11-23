import { Modal, Spin } from "antd";
import classNames from "classnames";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { GiPerson, GiTicket, GiVirtualMarker } from "react-icons/gi";
import { ImBook } from "react-icons/im";
import { MdKeyboardArrowLeft, MdOpenInBrowser } from "react-icons/md";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  fetchEvent,
  fetchEventTicket,
  updateEvent,
} from "../../../../api/eventHandler";
import { purchaseTicket } from "../../../../api/ticketHandler";
import SingleSelect, {
  SingleCard,
  TicketPurchase,
} from "../../../../components/Cards/SingleCardSelect";
import EventPreviewLayout from "../../../../components/Layout/EventPreviewLayout";
import LeftDrawerModal from "../../../../components/LeftDrawerModal";
import NoData from "../../../../components/NoData";
import PageCard from "../../../../components/PageCard";
import { truncate } from "../../../../utils/truncate";
import { getUserInfo } from "../../../../utils/userInfo";
import RegisterEvent from "../../../PublicArea/ConcertPreview/EventForm";
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

const EditPreview = () => {
  const [openRegisterEvent, setOpenRegisterEvent] = useState(false);
  const [openMeetingModal, setOpenMeetingModal] = useState(false);
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [joinType, setJoinType] = useState("1");
  const [reload, setReload] = useState(false);

  const [eventTicket, setEventTicket] = useState([]);
  const [eventDetail, setEventDetail] = useState();

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedTicketItem, setSelectedTicketItem] = useState();
  const [eventTicketLoader, setEventTicketLoader] = useState(false);

  const history = useHistory();
  const location = useLocation();

  console.log("eventDetail", eventDetail);

  const toggleRegisterModal = (item) => {
    if (item.id === "3") {
      setOpenRegisterEvent(true);
    }
  };

  useEffect(() => {
    browseEventByid(id);
  }, [id, reload]);

  const selectedTicket = (value) => {
    setSelectedTicketItem(value);
  };

  const getEventTickets = async (id) => {
    setEventTicketLoader(true);

    const {
      data: { data },
    } = await fetchEventTicket(id);
    setEventTicketLoader(false);
    setEventTicket(data);
  };

  const browseEventByid = async (id) => {
    const {
      data: { data },
    } = await fetchEvent(id);

    setEventDetail(data);
  };

  const buyTicket = async () => {
    if (selectedTicketItem) {
      setLoading(true);
      const { userId } = getUserInfo();
      const payload = {
        // user_id: userId,
        // email: "test@test.com",
        // amount: selectedTicketItem.item.price,
        // description: selectedTicketItem.item.description,
        // ticket_type: selectedTicketItem.item.title,
        quantity: 1,
        event_id: id,
      };
      const {
        data: { data },
      } = await purchaseTicket(payload, selectedTicketItem.item.id);
      console.log("data partake", userId);
      if (selectedTicketItem.item.ticketType === "Paid") {
        payWithPayStack({
          ...data,
          amount: Number(selectedTicketItem.item.price),
        });
      } else {
        //  Swal.fire("Done!", "Ticket purchased successfully", "success");
        setLoading(false);
        history.push({
          pathname: "/done",
          state: {
            message: "Ticket purchased successfully",
            returnUrl: location.pathname,
          },
        });
      }
    }
  };

  const payWithPayStack = (data) => {
    const handler = window.PaystackPop.setup({
      key: "pk_test_f7452f705b3f9884c0509224c6bdaaff6b220d14",
      email: data.email,
      amount: data.amount * 100,
      currency: "NGN",
      channels: ["card"],
      ref: data.reference, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: "+2348012345678",
          },
        ],
      },
      callback: (response) => {
        setLoading(false);
        // Swal.fire("Done!", "Ticket purchased successfully", "success");
        history.push({
          pathname: "/done",
          state: {
            message: "Ticket purchased successfully",
            returnUrl: location.pathname,
          },
        });

        // verifyTicket(response.reference);
      },
      onClose: () => {
        setLoading(false);
      },
    });
    handler.openIframe();
  };

  useEffect(() => {
    getEventTickets(id);
  }, [id]);

  const toggleJoinForm = (item) => {
    setJoinType(item.id);
  };

  const pushlishHandler = (payload) => {
    Swal.fire({
      title: "Events Update?",

      text: "Event will be updated",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#da291c",
      cancelButtonColor: "#eddcd2",
      confirmButtonText: "Update",
      customClass: {
        icon: "swal-icon",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("location.state", location.state);
        localStorage.removeItem("lastStep");
        updateEvent(JSON.parse(location.state), JSON.parse(location.state).id)
          .then((res) => {
            const statusMsg = "Event updated";

            Swal.fire("Success", statusMsg, "success");
            localStorage.removeItem("lastStep");
            setReload((prev) => !prev);
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong", "error");
          });
      }
    });
  };

  useEffect(() => {
    if (location && JSON.parse(location.state)) {
      localStorage.setItem("currentEvent", location.state);
    }
  }, []);

  return (
    <EventPreviewLayout eventDetail={JSON.parse(location.state)}>
      <section>
        <div className={style.container}>
          <div className={style.containerNav}>
            <div className={style.containerNav_left}>
              <span
                className={style.containerNav_iconBox}
                onClick={history.goBack}
              >
                <MdKeyboardArrowLeft size={20} />
              </span>
            </div>
            <div className={style.containerNav_right}>
              <span
                className={style.editContinue}
                // to={{
                //   pathname: "/courses",
                //   search: "?sort=name",
                //   hash: "#the-hash",
                //   state: { fromDashboard: true }
                // }}
                onClick={history.goBack}
              >
                Continue Edit
              </span>

              <div className={style.mainHeader_right}>
                <button
                  onClick={() => pushlishHandler({ status: 1 })}
                  className={style.publishEvent}
                >
                  Update Event
                </button>
                {/* {eventDetail.is_published === 0 ? (
                    <button
                      onClick={() => pushlishHandler({ status: 1 })}
                      className={style.publishEvent}
                    >
                      Create & Publish Event
                    </button>
                  ) : (
                    <button
                      onClick={() => pushlishHandler({ status: 0 })}
                      className={`${style.unPublishEvent} ${style.unPublishEvent_notice}`}
                    >
                      Unpublish Event
                    </button>
                  )} */}
              </div>
            </div>
          </div>
          {/* {uiLoader && (
            <div style={{ width: "100%", marginLeft: "10px" }}>
              <Skeleton width={"100%"} height="300px" />
              <Skeleton width={"70%"} height="20px" />
              <Skeleton width={"70%"} height="20px" />
              <Skeleton width={"70%"} height="20px" />
              <Skeleton width={"70%"} height="20px" />
            </div>
          )} */}

          <PageCard
            containerStyle={{
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "40rem",
              borderRadius: "10px",
            }}
            containerTitleStyle={{ fontSize: "3.3rem" }}
            leftSideStyle={{
              padding: "4rem",
              marginTop: "2rem",
              positon: "relative",
            }}
            backgroundUrl={JSON.parse(location.state).banner}
            pageName=""
            title={JSON.parse(location.state).title}
            footerTitle={moment(
              JSON.parse(location.state).start_date,
              "DD-MM-YYYY HH:mm:ss"
            ).format("dddd, MMMM, YYYY h:mm:a")}
          />

          <>
            <div className={style.description}>
              {truncate(JSON.parse(location.state).description, 300, "...")}
            </div>
            <div className={style.resourceBox}>
              <SingleSelect onChange={(item) => toggleRegisterModal(item)}>
                <ResourceCard
                  title="Enter Event Room"
                  position="1"
                  // onClick={() => setOpenMeetingModal(true)}
                  icon={
                    <BsPeopleFill className={style.iconResource} size={25} />
                  }
                />
                <ResourceCard
                  title="Resource Centre"
                  position="2"
                  icon={<ImBook className={style.iconResource} size={25} />}
                  url={`/event/edit/join/${JSON.parse(location.state).id}`}
                  state={location.state}
                />

                {eventDetail &&
                  eventDetail.allow_attendee_registration === 1 && (
                    <ResourceCard
                      title="Register for this event"
                      position="3"
                      icon={
                        <FaCalendarAlt
                          className={style.iconResource}
                          size={25}
                        />
                      }
                    />
                  )}

                {eventDetail &&
                  eventDetail.event_type &&
                  eventDetail.event_type.name !== "Annual-General-Meetings" && (
                    <ResourceCard
                      title="Purchase Ticket"
                      position="4"
                      onClick={() => setOpenTicketModal(true)}
                      icon={
                        <GiTicket className={style.iconResource} size={25} />
                      }
                    />
                  )}

                {/* <ResourceCard
                    title="Purchase Ticket"
                    position="4"
                    onClick={() => setOpenTicketModal(true)}
                    icon={<GiTicket className={style.iconResource} size={25} />}
                  /> */}
              </SingleSelect>
            </div>
          </>
        </div>
        <LeftDrawerModal
          visible={openRegisterEvent}
          tagName="Event Registration"
          headerTitle="Register for this event"
          closeModal={() => setOpenRegisterEvent(false)}
        >
          <RegisterEvent />
        </LeftDrawerModal>
        <LeftDrawerModal
          visible={openTicketModal}
          tagName="Event Registration"
          headerTitle="Register for this event"
          closeModal={() => setOpenTicketModal(false)}
        >
          <>
            {eventTicketLoader === false && eventTicket.length === 0 && (
              <NoData
                description="No Ticket yet!"
                containerStyle={{
                  width: "50%",
                  margin: "auto",
                  marginTop: "5rem",
                }}
              />
            )}
            {eventTicket && eventTicket.length > 0 && (
              <>
                <div className={style.ticketContainer}>
                  <h3 className={style.ticketContainer_title}>
                    Purchase event ticket
                  </h3>
                  <div className={style.ticketContainer_para}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>
                  <div className={style.ticketType}>
                    <SingleSelect
                      containerStyle={{ flexDirection: "column" }}
                      onChange={(item) => selectedTicket(item)}
                    >
                      {eventTicket.map((item, idx) => (
                        <TicketPurchase
                          key={item.id}
                          item={{
                            id: item.id,
                            title: item.name,
                            price: item.price,
                            ticketType: item.ticket_type.name,
                          }}
                          position={idx}
                        />
                      ))}
                    </SingleSelect>
                  </div>
                </div>
                <button
                  className={style.checkout_btn}
                  onClick={() => buyTicket()}
                >
                  {loading ? <Spin /> : "Check out"}
                </button>
              </>
            )}
          </>
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
  state,
}) => {
  const classString = classNames(`${style.resourceItem}`, {
    [`${style.resourceItem_selected}`]: isSelected === stepIndex,
    [`${style.resourceItem_room}`]: stepIndex === 0,
  });
  const history = useHistory();

  const redirectToGallery = () => {
    cardClick(stepIndex, { id: childKey, title });
    if (onClick) {
      onClick();
    } else {
      if (url) {
        if (state) {
          history.push({
            pathname: url,
            state,
          });
        } else {
          history.push(`${url}`);
        }
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

export default EditPreview;
