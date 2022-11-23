import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Spin, Alert } from "antd";
import classNames from "classnames";
import moment from "moment";
import React, { useEffect, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { loadChat } from "../../../utils/loadScript";
import { BsPeopleFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { GiPerson, GiTicket, GiVirtualMarker } from "react-icons/gi";
import { ImBook } from "react-icons/im";
import { MdKeyboardArrowLeft, MdOpenInBrowser } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  browseEventDetail,
  fetchEventTicket,
  meetingAuthHandler,
} from "../../../api/eventHandler";
import {
  purchaseTicket,
  verifyTicketPayment,
} from "../../../api/ticketHandler";

import SingleSelect, {
  SingleCard,
  TicketPurchase,
} from "../../../components/Cards/SingleCardSelect";
import EventPreviewLayout from "../../../components/Layout/EventPreviewLayout";
import LeftDrawerModal from "../../../components/LeftDrawerModal";
import NoData from "../../../components/NoData";
import PageCard from "../../../components/PageCard";
import { getUserInfo } from "../../../utils/userInfo";
import {
  meetingAuthScheme,
  observerAuthScheme,
} from "../../../utils/Validation/meetingAuthValidation";
import { getTicketTypeAction } from "../../LoggedArea/Ticket/state/action";

import RegisterEvent from "./EventForm";
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

const ConcertPreview = () => {
  const [openRegisterEvent, setOpenRegisterEvent] = useState(false);
  const [openMeetingModal, setOpenMeetingModal] = useState(false);
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [joinType, setJoinType] = useState("1");
  // const [, setVenueType] = useState(null);
  const [loading, setLoading] = useState(false);

  const [eventTicket, setEventTicket] = useState([]);
  const dispatch = useDispatch();
  const [eventDetail, setEventDetail] = useState();
  const [uiLoader, setUiLoader] = useState(false);
  const { id } = useParams();
  const { name, email } = useSelector((state) => state.profile);
  const [eventTicketLoader, setEventTicketLoader] = useState(false);
  const [, setAttendeeData] = useState();
  const [selectedTicketItem, setSelectedTicketItem] = useState();
  const history = useHistory();
  const location = useLocation();

  const toggleRegisterModal = (item) => {
    if (item.id === "3") {
      setOpenRegisterEvent(true);
    }
  };

  useEffect(() => {
    browseEventByid(id);
  }, [id]);

  const getEventTickets = async (id) => {
    setEventTicketLoader(true);

    const {
      data: { data },
    } = await fetchEventTicket(id);
    setEventTicketLoader(false);
    setEventTicket(data);
  };

  const browseEventByid = async (id) => {
    setUiLoader(true);
    const {
      data: { data },
    } = await browseEventDetail(id);
    setUiLoader(false);
    setEventDetail(data);
  };

  useEffect(() => {
    getEventTickets(id);
  }, [id]);

  const toggleJoinForm = (item) => {
    setJoinType(item.id);
  };

  useEffect(() => {
    loadChat();
    const chatIcon = document.getElementById("fc_frame");
    if (chatIcon) {
      chatIcon.style.display = "block";
    }

    return () => {
      const script = document.getElementById("Freshdesk Messaging-js-sdk");

      if (script) script.remove();
      if (chatIcon) {
        chatIcon.style.display = "none";
      }
    };
  }, [dispatch]);

  const selectedTicket = (value) => {
    setSelectedTicketItem(value);
  };
  useEffect(() => {
    dispatch(getTicketTypeAction());
  }, []);

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
        // setLoading(false);
        // Swal.fire("Done!", "Ticket purchased successfully", "success");
        // history.push({
        //   pathname: "/done",
        //   state: {
        //     message: "Ticket purchased successfully",
        //     returnUrl: location.pathname,
        //   },
        // });
        verifyTicket(response.reference);
      },
      onClose: () => {
        setLoading(false);
      },
    });
    handler.openIframe();
  };

  const verifyTicket = async (ref) => {
    const {
      data: { data },
    } = await verifyTicketPayment(ref);
    console.log("res respone", data);

    // Swal.fire("Done!", "Ticket purchased successfully", "success");
    setLoading(false);
    history.push({
      pathname: "/done",
      state: {
        message: "Ticket purchased successfully",
        returnUrl: location.pathname,
      },
    });
  };

  // const meetingTypeHandler = () => {
  //   if (eventDetail && eventDetail.attendee_mode_type === "Conference") {
  //     setOpenMeetingModal(true);
  //   } else {
  //     history.push(
  //       "/Livestream",
  //       JSON.stringify({
  //         ...eventDetail,
  //         livestream: eventDetail.livestream,
  //         role: 2,
  //         leaveUrl: `/event/${eventDetail.id}`,
  //       })
  //     );
  //   }
  // };

  return (
    <Suspense
      fallback={
        <div className="divLoader">
          <img src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/Apems-logo_iu3uju.webp" />
        </div>
      }
    >
      <EventPreviewLayout eventDetail={eventDetail}>
        <section>
          <div className={style.container}>
            <div className={style.containerNav}>
              <div className={style.containerNav_left}>
                <span className={style.containerNav_iconBox}>
                  <MdKeyboardArrowLeft size={20} onClick={history.goBack} />
                </span>
              </div>
              {/* <div className={style.containerNav_right}>
              <button
                onClick={meetingTypeHandler}
                className={style.publishEvent}
              >
                Enter Event Room
              </button>
            </div> */}
            </div>
            {uiLoader && (
              <div style={{ width: "100%", marginLeft: "10px" }}>
                <Skeleton width={"100%"} height="300px" />
                <Skeleton width={"70%"} height="20px" />
                <Skeleton width={"70%"} height="20px" />
                <Skeleton width={"70%"} height="20px" />
                <Skeleton width={"70%"} height="20px" />
              </div>
            )}
            {uiLoader === false && eventDetail && (
              <>
                <div className="desktop_mobile_none">
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
                    title={eventDetail.title}
                    footerTitle={moment(eventDetail.start_date).format(
                      "dddd, MMMM, YYYY h:mm:a"
                    )}
                  />
                </div>
                <section className={style.heroCard}>
                  <img
                    src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940344/apems/Group43_b0uq89.svg"
                    className={style.heroCard_img}
                  />
                  <div className={style.heroCard_thumbnail}>
                    <p></p>
                    <h1>{eventDetail.title}</h1>
                    <small>
                      {moment(eventDetail.start_date).format(
                        "dddd, MMMM, YYYY h:mm:a"
                      )}
                    </small>
                  </div>
                </section>
                <div className={style.description}>
                  {eventDetail.description}
                </div>
                <div className={style.resourceBox}>
                  <SingleSelect onChange={(item) => toggleRegisterModal(item)}>
                    <ResourceCard
                      title="Enter Event Room"
                      isEnter={true}
                      position="1"
                      onClick={() => setOpenMeetingModal(true)}
                      icon={
                        <BsPeopleFill
                          className={style.iconResource}
                          size={25}
                        />
                      }
                    />
                    <ResourceCard
                      title="Resource Centre"
                      position="2"
                      eventDetail={eventDetail}
                      icon={<ImBook className={style.iconResource} size={25} />}
                      url={`/event/join/${eventDetail.id}`}
                    />
                    {eventDetail &&
                      eventDetail.allow_attendee_registration
                        .allow_attendee_registration && (
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
                    <ResourceCard
                      title={
                        eventDetail?.attendee_mode_type === "Conference"
                          ? "Register for this event"
                          : "Purchase Ticket"
                      }
                      position="4"
                      onClick={() => setOpenTicketModal(true)}
                      icon={
                        <GiTicket className={style.iconResource} size={25} />
                      }
                    />
                  </SingleSelect>
                </div>
              </>
            )}
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
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
                  closeMeetingModal={(data) => {
                    setOpenMeetingModal(false);
                    setAttendeeData(data);
                  }}
                  eventDetail={eventDetail}
                  name={name}
                  email={email}
                  attendeeType="observer"
                />
              )}

              {joinType === "1" && (
                <JoinMeetingForm
                  closeMeetingModal={(data) => {
                    setAttendeeData(data);
                    setOpenMeetingModal(false);
                  }}
                  toggleAudioTest={() => history.push("/Audio/test")}
                  eventDetail={eventDetail}
                  name={name}
                  email={email}
                  attendeeType="stalkholder"
                />
              )}
            </div>
          </Modal>
        </section>
      </EventPreviewLayout>
    </Suspense>
  );
};

const ResourceCard = ({
  title,
  icon,
  isEnter,
  cardClick,
  isSelected,
  prefixCls = "resourceItem",
  childKey,
  cardStyle,
  stepIndex,
  onClick,
  url,
  eventDetail,
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
        history.push(
          `${url}`,
          JSON.stringify({
            ...eventDetail,
            livestream: eventDetail.livestream,
            role: 2,
            leaveUrl: `/event/${eventDetail.id}`,
          })
        );
      }
    }
  };
  return (
    <div
      className={classString}
      style={{
        ...cardStyle,
        backgroundColor: isEnter && "#EF3125",
        color: isEnter && "#ffffff",
        borderColor: isEnter && "#EF3125",
      }}
      onClick={redirectToGallery}
    >
      <span className={style.iconBox}>{icon}</span>
      <div className={style.resourceName}>{title}</div>
    </div>
  );
};

export const JoinMeetingForm = ({
  toggleAudioTest,
  closeMeetingModal,
  eventDetail,
  name,
  email,
  attendeeType,
  fromRoute,
  btnText = "Enter Room",
}) => {
  const { id } = useParams();
  const [loginError, setLoginError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      attendeeType === "stalkholder" ? meetingAuthScheme : observerAuthScheme
    ),
    // defaultValues: {
    //   account_number: eventDetail?.attendee?.account_number ?? "7383939393",
    //   passcode: eventDetail?.attendee?.passcode ?? "UKOZ7LK",
    // },
  });

  const [loading, setLoading] = useState(false);
  // const joinMeetingHandler = (e) => {
  //   e.preventDefault();
  //   closeMeetingModal(false);
  //   toggleAudioTest(true);
  // };

  const attendeeAuthHandler = async (data) => {
    const payload = {
      passcode: data.passcode,
      // account_number: `${data.account_number}`,
      attendee_type: attendeeType,
    };

    if (attendeeType === "stalkholder") {
      payload.account_number = `${data.account_number}`;
    }
    try {
      setLoading(true);
      const {
        data: { data },
      } = await meetingAuthHandler(payload, id);
      setLoading(false);
      console.log("data", data);
      if (fromRoute === "proxy") {
        closeMeetingModal(data);
        localStorage.setItem(
          "authAttendee",
          JSON.stringify({
            ...eventDetail,
            name: data.name,
            email: data.email,
            role: 0,
            voteRights: data.vote_rights,
            attendeePhone: data.phone_number,
            attendeeId: data.id,
            channel: data.channel,
            account_number: data.account_number,
            leaveUrl: `${window.location.origin}/event/concert/overview/${eventDetail.id}`,
          })
        );
      } else {
        if (eventDetail && eventDetail.attendee_mode_type === "Conference") {
          localStorage.setItem(
            "eventInfo",
            JSON.stringify({
              ...eventDetail,
              name: data.name,
              email: data.email,
              role: 0,
              voteRights: data.vote_rights,
              attendeePhone: data.phone_number,
              attendeeId: data.id,
              channel: data.channel,
              account_number: data.account_number,
              leaveUrl: `${window.location.origin}/event/concert/overview/${eventDetail.id}`,
            })
          );
          const win = window.open("/Meeting", "_blank");
          win.focus();

          // const windowObj = window.open("/Meeting", "_blank");
          // console.log({ windowObj });
          // windowObj.eventDetail = JSON.stringify({
          //   ...eventDetail,
          //   name: "John doe",
          //   email: "solomonfrank73@hotmail.com",
          //   role: 0,
          //   leaveUrl: `${window.location.origin}/event/concert/overview/${eventDetail.id}`,
          // });
        } else {
          localStorage.setItem(
            "eventInfo",
            JSON.stringify({
              ...eventDetail,
              livestream: eventDetail.livestream,
              role: 0,
              name: data.name,
              email: data.email,
              leaveUrl: `/event/concert/overview/${eventDetail.id}`,
              voteRights: data.vote_rights,
              attendeePhone: data.phone_number,
              attendeeId: data.id,
            })
          );
          const win = window.open("/Livestream", "_blank");
          win.focus();
        }
      }
    } catch (err) {
      console.log("error", err);
      setLoading(false);

      if (err.response.status === 422) {
        // Swal.fire("Closed!", "{Invalid credentials}", "error");
        setLoginError("Invalid credentials");
      } else {
        // Swal.fire("Closed!", "Something went wrong", "error");
        setLoginError("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (loginError) {
      setTimeout(() => {
        setLoginError();
      }, 3000);
    }
  }, [loginError]);
  return (
    <div className={style.meetingForm}>
      <form onSubmit={handleSubmit(attendeeAuthHandler)}>
        <div className={style.form__input_wrap}>
          {attendeeType === "stalkholder" && (
            <>
              <div className={style.meeting__input_box}>
                <label htmlFor="question" className={style.meeting_label}>
                  Account Number
                </label>
                <input
                  className={style.meeting__input}
                  type="text"
                  placeholder="Enter Account Number"
                  name="fullName"
                  {...register("account_number")}
                />
              </div>
              <span className={style.validation__error}>
                {errors.account_number?.message}
              </span>
            </>
          )}

          <div className={style.meeting__input_box}>
            <label htmlFor="question" className={style.meeting_label}>
              Passcode
            </label>
            <input
              className={style.meeting__input}
              type="text"
              placeholder="Enter Meeting Passcode"
              name="meedtingId"
              {...register("passcode")}
            />
          </div>
          <span className={style.validation__error}>
            {errors.passcode?.message}
          </span>
        </div>
        <button
          disabled={loading}
          type="submit"
          className={style.meetingJoinBtn}
        >
          {loading ? "loading..." : `${btnText}`}
        </button>
        {loginError && (
          <div style={{ marginTop: "10px" }}>
            <Alert
              message={loginError}
              type="error"
              showIcon
              closable
              onClose={() => setLoginError()}
            />
          </div>
        )}
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

export default ConcertPreview;
