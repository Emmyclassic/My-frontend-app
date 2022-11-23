import classNames from "classnames";
import moment from "moment";
import React from "react";
import { FaCaretRight } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import EventCards from "../../Cards/EventCard/EventCard";
import { ErrorFallback } from "../../ErrorBoundaryComponentLevel";
import NoData from "../../NoData";
import style from "./Event.module.scss";
import "./event.scss";

export const MoreEvent = () => {
  return (
    <Link to="/events" className={style.event__navigation__right}>
      {" "}
      <span className={style.link__text}>View All</span>
      <span className={style.link__ruler}></span>
      <span>
        {" "}
        <FaCaretRight color="red" />
      </span>
    </Link>
  );
};

const Event = ({ rightItem = <MoreEvent />, tab, toggleCurrentTab }) => {
  const { upcomingEvent, currentEvent } = useSelector((state) => state.events);
  const { loading } = useSelector((state) => state.ui);

  console.log("upcomingEvent", upcomingEvent);

  const isLoading = (eventStatus) => {
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
            style={{ width: "23%", marginRight: "2%", marginBottom: "2rem" }}
          >
            <Skeleton height={200} width={"100%"} />
          </div>
          <div
            style={{ width: "23%", marginRight: "2%", marginBottom: "2rem" }}
          >
            <Skeleton height={200} width={"100%"} />
          </div>
          <div
            style={{ width: "23%", marginRight: "2%", marginBottom: "2rem" }}
          >
            <Skeleton height={200} width={"100%"} />
          </div>
          <div
            style={{ width: "23%", marginRight: "2%", marginBottom: "2rem" }}
          >
            <Skeleton height={200} width={"100%"} />
          </div>
        </div>
      );
    }
  };
  return (
    <section className={`${style.main__container}`}>
      <div className={style.event__navigation}>
        <div className={style.event__navigation__left}>
          <div
            // className={style.event__navigation__link}
            className={classNames(`${style.event__navigation__link}`, {
              [`${style.tabType}`]: tab === "current",
            })}
            onClick={() => toggleCurrentTab("current")}
          >
            <span className={style.link__text}>Happening Now</span>
          </div>
          <div
            onClick={() => toggleCurrentTab("upcoming")}
            // className={`${style.event__navigation__inverse}`}
            className={classNames(`${style.event__navigation__link}`, {
              [`${style.tabType}`]: tab === "upcoming",
            })}
          >
            <span
              className={`${style.link__text} ${style.link__text_upcoming}`}
            >
              Upcoming
            </span>
          </div>
          <div className={`${style.link__text_dash}`}></div>
        </div>
        {/* <Divider dashed /> */}

        {rightItem}

        {/* <Link to="/events" className={style.event__navigation__right}>
          {" "}
          <span className={style.link__text}>View All</span>
          <span className={style.link__ruler}></span>
          <span>
            {" "}
            <FaCaretRight color="red" />
          </span>
        </Link> */}
      </div>
      <div className={style.event__list}>
        {tab === "current" && (
          <>
            {isLoading(currentEvent)}
            {loading === false && currentEvent.status === "fail" && (
              <ErrorFallback resetErrorBoundary={() => console.log("error")} />
            )}
            <div className={style.event__list__box}>
              {loading === false &&
                currentEvent.status === "success" &&
                currentEvent.data.length > 0 &&
                currentEvent.data.map((event, idx) => (
                  <EventCards
                    key={event.id}
                    bannerUrl={event.banner}
                    title={event.title}
                    date={moment(event.start_date).format("DD MMM YYYY")}
                    price="₦2000"
                    style={{ flex: "0 0 23%" }}
                    logoUrl={event.logo}
                    url={`/event/concert/overview/${event.id}`}
                  />
                ))}
              {loading === false &&
                currentEvent.status === "success" &&
                currentEvent.data.length === 0 && (
                  <NoData description="No current events" />
                )}
            </div>
          </>
        )}
        {tab === "upcoming" && (
          <>
            {isLoading(upcomingEvent)}
            {loading === false && upcomingEvent.status === "fail" && (
              <ErrorFallback resetErrorBoundary={() => console.log("error")} />
            )}
            <div className={style.event__list__box}>
              {loading === false &&
                upcomingEvent.status === "success" &&
                upcomingEvent.data.length > 0 &&
                upcomingEvent.data.map((event, idx) => (
                  <EventCards
                    key={event.id}
                    bannerUrl={event.banner}
                    logoUrl={event.logo}
                    title={event.title}
                    date={moment(event.start_date).format("DD MMM YYYY")}
                    price="₦2000"
                    style={{ flex: "0 0 23%" }}
                    url={`/event/concert/overview/${event.id}`}
                  />
                ))}
              {loading === false &&
                upcomingEvent.status === "success" &&
                upcomingEvent.data.length === 0 && (
                  <NoData description="No upcoming event yet" />
                )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Event;
