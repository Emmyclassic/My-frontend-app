import classNames from "classnames";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiCalendarAlt } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { loadChat } from "../../../utils/loadScript";
import { useHistory } from "react-router";
import { getEvents } from "../../../api/eventHandler";
import EventCalender from "../../../components/Calender/Calender";
import EventCards from "../../../components/Cards/EventCard/EventCard";
import DashboardLeftHeaderNav from "../../../components/Dashboard/LeftHeaderNav";
import { ErrorFallback } from "../../../components/ErrorBoundaryComponentLevel";
import NoData from "../../../components/NoData";
import PrivateGenericLayout from "../../../components/PrivateGenericLayout/PrivateGenericLayout";
import {
  getUpcomingEventsAction,
  getUpcomingMyEventAction,
} from "../BrowseEvent/state/action";
import style from "./Dashboard.module.scss";

const Dashboard = () => {
  const history = useHistory();
  const [tab, setTab] = useState("calender");
  const toggleTab = (tab) => {
    if (tab === "calender") {
      setTab("calender");
    }
    if (tab === "events") {
      setTab("events");
    }
  };

  const [filter] = useState({
    filter: "",
    search: "",
    calendar: "",
    start_date: "",
  });
  const [startDate, setStartDate] = useState();
  const [fetching, setFetching] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [upcomingEvent, setUpcomingEvent] = useState();
  const [errorObj, setErrorObj] = useState();
  const [loading, setLoading] = useState(false);

  const { name: userName } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const fetchUpcomingEvent = async (filter, setEventState) => {
    try {
      setLoading(true);
      const requestArr = [
        getEvents({
          per_page: 4,
          calendar: moment().format("MMMM"),
        }),
      ];
      const [upcoming] = await Promise.all(requestArr);
      setLoading(false);

      setUpcomingEvent(upcoming.data.data);
    } catch (error) {
      setErrorObj(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingEvent();
  }, []);

  const getStartDate = () => {
    if (upcomingEvent && upcomingEvent.length > 0) {
      const dates = upcomingEvent.map((item) => {
        return moment(item.start_date).format("YYYY-MM-DD");
      });
      return dates;
    } else {
      const year = Number(moment().format("YYYY"));
      const month = Number(moment().format("MM"));
      const day = Number(moment().format("DD"));
      return [new Date(year, month, day)];
    }
  };

  const getCurrentEvent = () => {
    dispatch(
      getUpcomingEventsAction({
        ...filter,
        calendar: moment().format("MMMM"),
      })
    );
  };

  const getSelectedEventDay = () => {
    setFetching(true);
    getEvents({ start_date: startDate }).then((res) => {
      setFetching(false);
      setSelectedEvent(res.data.data);
    });
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

  useEffect(() => {
    getCurrentEvent();
  }, []);

  useEffect(() => {
    getSelectedEventDay();
  }, [startDate]);
  const isLoading = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            marginTop: "3rem",
          }}
        >
          <div
            style={{ width: "48%", marginRight: "2%", marginBottom: "2rem" }}
          >
            <Skeleton height={200} width={"100%"} />
          </div>
          <div
            style={{ width: "48%", marginRight: "2%", marginBottom: "2rem" }}
          >
            <Skeleton height={200} width={"100%"} />
          </div>
        </div>
      );
    }
  };

  const handleCalender = (value) => {
    dispatch(
      getUpcomingMyEventAction({
        ...filter,
        calendar: value,
      })
    );
  };

  const handleDayEvent = (date) => {
    const selectedDate = moment(date).format("YYYY-MM-DD");
    setStartDate(selectedDate);
    if (date) {
      toggleTab("events");
    }

    // console.log("sbdsjsbsd", selectedDate);
  };

  return (
    <PrivateGenericLayout
      leftNav={
        <DashboardLeftHeaderNav
          title={`Hello ${userName?.split(" ")[0]}`}
          subtitle="What's new with you? Would you like to create an event today?"
        />
      }
    >
      <section className={style.main}>
        <div className={style.main__left}>
          <div className={style.main__left_eventBtn}>
            <button
              onClick={() => history.push("/event/join")}
              type="button"
              className={`${style.main__left__btn} ${style.main__left__btn_join}`}
            >
              + Join Event
            </button>
            <button
              type="button"
              onClick={() => history.push("/event/types")}
              className={`${style.main__left__btn} ${style.main__left__btn_create}`}
            >
              + Create Event
            </button>
          </div>

          <>
            {isLoading()}

            <div className={style.event__list__box}>
              {loading === false && errorObj && (
                <ErrorFallback resetErrorBoundary={getCurrentEvent} />
              )}
              {loading === false &&
                upcomingEvent &&
                upcomingEvent.map((event, idx) => (
                  <EventCards
                    key={event.id}
                    bannerUrl={event.banner}
                    logoUrl={event.logo}
                    title={event.title}
                    date={moment(event.start_date).format("DD MMM YYYY")}
                    price="₦2000"
                    style={{ flex: "0 0 47%" }}
                    url={`/event/concert/overview/${event.id}`}
                  />
                ))}
              {loading === false &&
                upcomingEvent &&
                upcomingEvent.length === 0 && (
                  <NoData description="You dont have any current event" />
                )}
            </div>
          </>
        </div>

        <div className={style.main__right}>
          <div className={style.main__right__header}>
            <div className={style.tab_box}>
              <div
                onClick={() => toggleTab("calender")}
                className={classNames(
                  `${style.comp_button} ${style.comp_button_month}`,
                  { [`${style.tabType}`]: tab === "calender" }
                )}
              >
                Calendar
              </div>
              <div
                onClick={() => toggleTab("events")}
                className={classNames(
                  `${style.comp_button} ${style.comp_button_year}`,
                  { [`${style.tabType}`]: tab === "events" }
                )}
              >
                Event
              </div>
            </div>
          </div>
          {tab === "calender" && (
            <div className={style.main__right__content}>
              <div className={style.main__right__content__calender}>
                <EventCalender
                  handleCalender={handleCalender}
                  dateArr={() => getStartDate()}
                  handleDayEvent={handleDayEvent}
                />
              </div>
              {/* <div className={style.main__right__content__meetingList}>
                <header className={style.main__right__meeting__header}>
                  <div className={style.main__right__meeting__header_title}>
                    Stakeholders General Meeting
                  </div>
                  <div className={style.main__right__meeting__header_subtitle}>
                    APEMS Meeting Room
                  </div>
                </header>
                <div className={style.main__right__user__box}>
                  <div className={style.main__right__user__list}>
                    <div className={style.name__avatar__box}>
                      <span className={style.name__avatar__box__avatar}>
                        AD
                      </span>
                      <span className={style.name__avatar__box__avatar}>
                        AD
                      </span>
                      <span className={style.name__avatar__box__avatar}>
                        AD
                      </span>
                    </div>
                    <div className={style.name__avatar__count}>
                      +12 Accepted
                    </div>
                  </div>
                  <button className={style.main__right__time_btn}>
                    10:00am
                  </button>
                </div>
              </div> */}
            </div>
          )}
          {tab === "events" && (
            <div className={style.main__right__event__content}>
              {fetching && (
                <div
                  style={{
                    width: "100%",
                    marginRight: "2%",
                    marginBottom: "2rem",
                  }}
                >
                  <Skeleton height={100} width={"100%"} />
                </div>
              )}
              {!fetching &&
                selectedEvent.length > 0 &&
                selectedEvent
                  .slice(0, 4)
                  .map((event, idx) => (
                    <EventItem item={event} key={event.id} />
                  ))}

              {!fetching && selectedEvent.length === 0 && (
                <NoData description="You dont have any current event" />
              )}
              {/* {selectedEvent.length > 0 &&
                selectedEvent
                  .slice(0, 4)
                  .map((event, idx) => (
                    <EventItem item={event} key={event.id} />
                  ))} */}
            </div>
          )}
        </div>
      </section>
    </PrivateGenericLayout>
  );
};

export const EventItem = ({ item }) => {
  const bannerStyle = {
    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),
    url(${item.logo})`,
    alignItems: "flex-end",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "20px",
    display: "flex",
    height: "10rem",
  };
  return (
    <div className={style.main__right__event__meeting}>
      <div className={style.main__right__event__banner} style={bannerStyle}>
        <button className={style.main__right__event__banner_time_btn}>
          Join Event
        </button>
      </div>
      <div className={style.main__right__event__body}>
        <header className={style.main__right__event__body_header}>
          {item.title}
        </header>
        <div className={style.main__right__event__body_desc}>
          {item.short_name}
        </div>
        <div className={style.main__right__event__body_time}>
          <span className={style.main__right__event__body_icon}>
            <BiCalendarAlt size="18" />
          </span>{" "}
          <span className={style.main__right__event__body_date}>
            {moment(item.start_date).format("dddd DD, MMMM YYYY")}
          </span>
        </div>
      </div>
      <div className={style.main__right__event__footer}>
        <div className={style.main__right__user__list}>
          <div className={style.name__avatar__box}>
            <span className={style.name__avatar__box__avatar}>AD</span>
            <span className={style.name__avatar__box__avatar}>AD</span>
            <span className={style.name__avatar__box__avatar}>AD</span>
          </div>
          <div className={style.name__avatar__count}>+12 Accepted</div>
        </div>
        <button className={style.main__right__event__time_btn}>
          Join Event
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
