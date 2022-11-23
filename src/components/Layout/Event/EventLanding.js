import classNames from "classnames";
import moment from "moment";
import React, { useState, useRef, useEffect } from "react";
import { FaCaretRight } from "react-icons/fa";
// import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import EventCards from "../../Cards/EventCard/EventCard";
import { ErrorFallback } from "../../ErrorBoundaryComponentLevel";
import NoData from "../../NoData";
import style from "./Event.module.scss";
import "./event.scss";

export const MoreEvent = () => {
  return (
    <Link to="/events" className={style.event__navigation__right}>
      <span className={style.link__text}>View All</span>
      <span className={style.link__ruler}></span>
      <span>
        <FaCaretRight color="red" />
      </span>
    </Link>
  );
};

const EventLanding = ({
  rightItem = <MoreEvent />,
  tab,
  toggleCurrentTab,
  currentEvent,
  upcomingEvent,
  errorObj,
  loading,
}) => {
  const isLoading = (eventStatus) => {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          marginTop: "3rem",
        }}
      >
        <div style={{ width: "23%", marginRight: "2%", marginBottom: "2rem" }}>
          <Skeleton height={300} width={"100%"} />
        </div>
        <div style={{ width: "23%", marginRight: "2%", marginBottom: "2rem" }}>
          <Skeleton height={300} width={"100%"} />
        </div>
        <div style={{ width: "23%", marginRight: "2%", marginBottom: "2rem" }}>
          <Skeleton height={300} width={"100%"} />
        </div>
        <div style={{ width: "23%", marginRight: "2%", marginBottom: "2rem" }}>
          <Skeleton height={300} width={"100%"} />
        </div>
      </div>
    );
  };
  const scrollRef = useRef();
  const scrollRefBox2 = useRef();
  const [screen, setScreen] = useState(window.innerWidth);
  const [switchTracker, setSwitchTracker] = useState(0);
  const [switchTracker2, setSwitchTracker2] = useState(0);

  useEffect(() => {
    function handleResize() {
      setScreen(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screen]);

  const handlescroll = () => {
    const scrollLeftInPX = scrollRef.current.scrollLeft;
    if (scrollLeftInPX < screen - 200) {
      setSwitchTracker(0);
    } else if (scrollLeftInPX <= screen * 1) {
      setSwitchTracker(1);
    } else if (scrollLeftInPX <= screen * 2) {
      setSwitchTracker(2);
    } else if (scrollLeftInPX <= screen * 3) {
      setSwitchTracker(3);
    }
  };
  const handlescroll2 = () => {
    const scrollLeftBox2 = scrollRefBox2.current.scrollLeft;
    if (scrollLeftBox2 < screen - 200) {
      setSwitchTracker2(0);
    } else if (scrollLeftBox2 <= screen * 1) {
      setSwitchTracker2(1);
    } else if (scrollLeftBox2 <= screen * 2) {
      setSwitchTracker2(2);
    } else if (scrollLeftBox2 <= screen * 3) {
      setSwitchTracker2(3);
    }
  };

  const scrollMovement = (idx) => {
    scrollRef.current.scrollLeft = window.innerWidth * idx;

    console.log(
      window.innerWidth,
      scrollRef.innerWidth,
      "scrollMovement window.innerWidth"
    );
    if (idx === 0) {
      setSwitchTracker(0);
    } else if (idx === 1) {
      setSwitchTracker(1);
    } else if (idx === 2) {
      setSwitchTracker(2);
    } else if (idx === 3) {
      setSwitchTracker(3);
    }
  };

  const scrollMovementBox2 = (idx) => {
    scrollRefBox2.current.scrollLeft = window.innerWidth * idx;

    console.log(
      window.innerWidth,
      scrollRefBox2.scrollWidth,
      "scrollRefBox2 window.innerWidth"
    );
    if (idx === 0) {
      setSwitchTracker2(0);
    } else if (idx === 1) {
      setSwitchTracker2(1);
    } else if (idx === 2) {
      setSwitchTracker2(2);
    } else if (idx === 3) {
      setSwitchTracker2(3);
    }
  };

  return (
    <section className={`${style.main__container}`}>
      <div className={style.event__navigation}>
        <div className={style.event__navigation__left}>
          {currentEvent && currentEvent.length ? (
            <div
              className={classNames(`${style.event__navigation__link}`, {
                [`${style.tabType}`]: tab === "current",
              })}
              onClick={() => {
                toggleCurrentTab("current");
              }}
            >
              <span className={style.link__text}>Happening Now</span>
            </div>
          ) : null}

          {upcomingEvent && upcomingEvent.length ? (
            <div
              onClick={() => {
                toggleCurrentTab("upcoming");
              }}
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
          ) : null}

          <div className={`${style.link__text_dash}`}></div>
        </div>
        <div className={style.view__all}>{rightItem}</div>
      </div>
      {loading ? (
        isLoading()
      ) : (
        <>
          <div className={style.event__list}>
            {tab === "current" && (
              <>
                {errorObj && (
                  <ErrorFallback
                    resetErrorBoundary={() => console.log("error")}
                  />
                )}
                <div
                  className={`${style.event__desktop} ${style.event__list__box}`}
                >
                  {currentEvent.length > 0 &&
                    currentEvent.map((event, idx) => (
                      <EventCards
                        key={event.id}
                        bannerUrl={event.banner}
                        title={event.title}
                        date={moment(event.start_date).format("DD MMM YYYY")}
                        price="₦2000"
                        logoUrl={event.logo}
                        url={`/event/concert/overview/${event.id}`}
                      />
                    ))}
                </div>
                <div className={style.event__mobile}>
                  <div
                    className={style.mobile_scroll}
                    ref={scrollRef}
                    onScroll={handlescroll}
                  >
                    <div
                      className={style.event__mobile__box1}
                      style={{
                        width: currentEvent.length === 1 ? "110%" : "",
                      }}
                    >
                      {currentEvent.length > 1 &&
                        currentEvent
                          .slice(0, 4)
                          .map((event, idx) => (
                            <EventCards
                              key={event.id}
                              bannerUrl={event.banner}
                              title={event.title}
                              date={moment(event.start_date).format(
                                "DD MMM YYYY"
                              )}
                              price="₦2000"
                              logoUrl={event.logo}
                              url={`/event/concert/overview/${event.id}`}
                            />
                          ))}
                    </div>
                  </div>
                  <div className={style.event_tracker}>
                    {currentEvent.length > 1 &&
                      currentEvent.slice(0, 4).map((event, idx) => (
                        <span
                          key={idx}
                          onClick={() => scrollMovement(idx)}
                          style={{
                            backgroundColor:
                              switchTracker === idx ? "#EF3125" : "#ffffff",
                          }}
                        ></span>
                      ))}
                  </div>
                  <div
                    className={style.mobile_scroll}
                    ref={scrollRefBox2}
                    onScroll={handlescroll2}
                  >
                    <div
                      className={style.event__mobile__box1}
                      style={{
                        width: currentEvent.length === 5 ? "110%" : "",
                      }}
                    >
                      {currentEvent.length > 0 &&
                        currentEvent
                          .slice(4, 8)
                          .map((event, idx) => (
                            <EventCards
                              key={event.id}
                              bannerUrl={event.banner}
                              title={event.title}
                              date={moment(event.start_date).format(
                                "DD MMM YYYY"
                              )}
                              price="₦2000"
                              logoUrl={event.logo}
                              url={`/event/concert/overview/${event.id}`}
                            />
                          ))}
                    </div>
                  </div>
                  <div className={style.event_tracker}>
                    {currentEvent.length > 5 &&
                      currentEvent.slice(4, 8).map((event, idx) => (
                        <span
                          key={idx}
                          onClick={() => scrollMovementBox2(idx)}
                          style={{
                            backgroundColor:
                              switchTracker2 === idx ? "#EF3125" : "#ffffff",
                          }}
                        ></span>
                      ))}
                  </div>
                </div>
              </>
            )}
            {tab === "upcoming" && (
              <>
                {errorObj && (
                  <ErrorFallback
                    resetErrorBoundary={() => console.log("error")}
                  />
                )}
                <div
                  className={`${style.event__list__box} ${style.event__desktop}`}
                >
                  {upcomingEvent.length > 0
                    ? upcomingEvent.map((event, idx) => (
                        <EventCards
                          key={event.id}
                          bannerUrl={event.banner}
                          logoUrl={event.logo}
                          title={event.title}
                          date={moment(event.start_date).format("DD MMM YYYY")}
                          price="₦2000"
                          url={`/event/concert/overview/${event.id}`}
                        />
                      ))
                    : null}
                  {upcomingEvent.length === 0 && (
                    <NoData description="No upcoming event yet" />
                  )}
                </div>
                <div className={style.event__mobile}>
                  <div
                    className={style.mobile_scroll}
                    ref={scrollRef}
                    onScroll={handlescroll}
                  >
                    <div
                      className={style.event__mobile__box1}
                      style={{
                        width: upcomingEvent.length === 1 ? "110%" : "",
                      }}
                    >
                      {upcomingEvent.length > 0 &&
                        upcomingEvent
                          .slice(0, 4)
                          .map((event, idx) => (
                            <EventCards
                              key={event.id}
                              bannerUrl={event.banner}
                              title={event.title}
                              date={moment(event.start_date).format(
                                "DD MMM YYYY"
                              )}
                              price="₦2000"
                              logoUrl={event.logo}
                              url={`/event/concert/overview/${event.id}`}
                            />
                          ))}
                    </div>
                  </div>
                  <div className={style.event_tracker}>
                    {upcomingEvent.length > 1 &&
                      upcomingEvent.slice(0, 4).map((event, idx) => (
                        <span
                          key={idx}
                          onClick={() => scrollMovement(idx)}
                          style={{
                            backgroundColor:
                              switchTracker === idx ? "#EF3125" : "#ffffff",
                          }}
                        ></span>
                      ))}
                  </div>
                  <div
                    className={style.mobile_scroll}
                    ref={scrollRefBox2}
                    onScroll={handlescroll2}
                  >
                    <div
                      className={style.event__mobile__box1}
                      style={{
                        width: upcomingEvent.length === 5 ? "110%" : "",
                      }}
                    >
                      {upcomingEvent.length > 0 &&
                        upcomingEvent
                          .slice(4, 8)
                          .map((event, idx) => (
                            <EventCards
                              key={event.id}
                              bannerUrl={event.banner}
                              title={event.title}
                              date={moment(event.start_date).format(
                                "DD MMM YYYY"
                              )}
                              price="₦2000"
                              logoUrl={event.logo}
                              url={`/event/concert/overview/${event.id}`}
                            />
                          ))}
                    </div>
                  </div>
                  <div className={style.event_tracker}>
                    {upcomingEvent.length > 1 &&
                      upcomingEvent.slice(4, 8).map((event, idx) => (
                        <span
                          key={idx}
                          onClick={() => scrollMovementBox2(idx)}
                          style={{
                            backgroundColor:
                              switchTracker2 === idx ? "#EF3125" : "#ffffff",
                          }}
                        ></span>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={style.view__all__mobile}>
            <span>{rightItem}</span>
          </div>
        </>
      )}
    </section>
  );
};

export default EventLanding;
