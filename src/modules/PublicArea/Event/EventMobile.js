import React, { useState, useRef, useEffect } from "react";
import NoData from "../../../components/NoData";
import style from "./Event.module.scss";
import moment from "moment";
// import { Link } from "react-router-dom";
import EventCards from "../../../components/Cards/EventCard/EventCard";
import { Pagination } from "antd";
// import { BiCaretLeft, BiCaretRight } from "react-icons/bi";

const EventMobile = ({
  loading,
  allEvents,
  isLoading,
  upcomingEvents,
  pastEvents,
  allOnChange,
  itemRender,
  allEventMeta,
  allPage,
  upcomingEventMeta,
  upcomingOnChange,
  upcomingPage,
  pastEventMeta,
  pastOnChange,
  pastPage,
}) => {
  const [screen, setScreen] = useState(window.innerWidth);

  const scrollRef = useRef();
  const scrollRefBox2 = useRef();
  const scrollRefBox3 = useRef();
  const scrollRefBox4 = useRef();

  const scrollRefPast = useRef();
  const scrollRefBox2Past = useRef();
  const scrollRefBox3Past = useRef();
  const scrollRefBox4Past = useRef();

  const scrollRefUpcoming = useRef();
  const scrollRefBox2Upcoming = useRef();
  const scrollRefBox3Upcoming = useRef();
  const scrollRefBox4Upcoming = useRef();

  const [switchTracker, setSwitchTracker] = useState(0);
  const [switchTracker2, setSwitchTracker2] = useState(0);
  const [switchTracker3, setSwitchTracker3] = useState(0);
  const [switchTracker4, setSwitchTracker4] = useState(0);

  const [switchTrackerPast, setSwitchTrackerPast] = useState(0);
  const [switchTracker2Past, setSwitchTracker2Past] = useState(0);
  const [switchTracker3Past, setSwitchTracker3Past] = useState(0);
  const [switchTracker4Past, setSwitchTracker4Past] = useState(0);

  const [switchTrackerUpcoming, setSwitchTrackerUpcoming] = useState(0);
  const [switchTracker2Upcoming, setSwitchTracker2Upcoming] = useState(0);
  const [switchTracker3Upcoming, setSwitchTracker3Upcoming] = useState(0);
  const [switchTracker4Upcoming, setSwitchTracker4Upcoming] = useState(0);

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
    } else if (scrollLeftInPX <= screen * 4) {
      setSwitchTracker(4);
    } else if (scrollLeftInPX <= screen * 5) {
      setSwitchTracker(5);
    } else if (scrollLeftInPX <= screen * 6) {
      setSwitchTracker(6);
    } else if (scrollLeftInPX <= screen * 7) {
      setSwitchTracker(7);
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
    } else if (scrollLeftBox2 <= screen * 4) {
      setSwitchTracker2(4);
    } else if (scrollLeftBox2 <= screen * 5) {
      setSwitchTracker2(5);
    } else if (scrollLeftBox2 <= screen * 6) {
      setSwitchTracker2(6);
    } else if (scrollLeftBox2 <= screen * 7) {
      setSwitchTracker2(7);
    }
  };
  const handlescroll3 = () => {
    const scrollLeftBox3 = scrollRefBox3.current.scrollLeft;
    if (scrollLeftBox3 < screen - 200) {
      setSwitchTracker3(0);
    } else if (scrollLeftBox3 <= screen * 1) {
      setSwitchTracker3(1);
    } else if (scrollLeftBox3 <= screen * 2) {
      setSwitchTracker3(2);
    } else if (scrollLeftBox3 <= screen * 3) {
      setSwitchTracker3(3);
    } else if (scrollLeftBox3 <= screen * 4) {
      setSwitchTracker3(4);
    } else if (scrollLeftBox3 <= screen * 5) {
      setSwitchTracker3(5);
    } else if (scrollLeftBox3 <= screen * 6) {
      setSwitchTracker3(6);
    } else if (scrollLeftBox3 <= screen * 7) {
      setSwitchTracker3(7);
    }
  };
  const handlescroll4 = () => {
    const scrollLeftBox4 = scrollRefBox4.current.scrollLeft;
    if (scrollLeftBox4 < screen - 200) {
      setSwitchTracker4(0);
    } else if (scrollLeftBox4 <= screen * 1) {
      setSwitchTracker4(1);
    } else if (scrollLeftBox4 <= screen * 2) {
      setSwitchTracker4(2);
    } else if (scrollLeftBox4 <= screen * 3) {
      setSwitchTracker4(3);
    } else if (scrollLeftBox4 <= screen * 4) {
      setSwitchTracker4(4);
    } else if (scrollLeftBox4 <= screen * 5) {
      setSwitchTracker4(5);
    } else if (scrollLeftBox4 <= screen * 6) {
      setSwitchTracker4(6);
    } else if (scrollLeftBox4 <= screen * 7) {
      setSwitchTracker4(7);
    }
  };

  const scrollMovement = (idx) => {
    scrollRef.current.scrollLeft = window.innerWidth * idx;

    if (idx === 0) {
      setSwitchTracker(0);
    } else if (idx === 1) {
      setSwitchTracker(1);
    } else if (idx === 2) {
      setSwitchTracker(2);
    } else if (idx === 3) {
      setSwitchTracker(3);
    } else if (idx === 4) {
      setSwitchTracker(4);
    } else if (idx === 5) {
      setSwitchTracker(5);
    } else if (idx === 6) {
      setSwitchTracker(6);
    } else if (idx === 7) {
      setSwitchTracker(7);
    }
  };
  const scrollMovementBox2 = (idx) => {
    scrollRefBox2.current.scrollLeft = window.innerWidth * idx;

    if (idx === 0) {
      setSwitchTracker2(0);
    } else if (idx === 1) {
      setSwitchTracker2(1);
    } else if (idx === 2) {
      setSwitchTracker2(2);
    } else if (idx === 3) {
      setSwitchTracker2(3);
    } else if (idx === 4) {
      setSwitchTracker2(4);
    } else if (idx === 5) {
      setSwitchTracker2(5);
    } else if (idx === 6) {
      setSwitchTracker2(6);
    } else if (idx === 7) {
      setSwitchTracker2(7);
    }
  };
  const scrollMovementBox3 = (idx) => {
    scrollRefBox3.current.scrollLeft = window.innerWidth * idx;

    if (idx === 0) {
      setSwitchTracker3(0);
    } else if (idx === 1) {
      setSwitchTracker3(1);
    } else if (idx === 2) {
      setSwitchTracker3(2);
    } else if (idx === 3) {
      setSwitchTracker3(3);
    } else if (idx === 4) {
      setSwitchTracker3(4);
    } else if (idx === 5) {
      setSwitchTracker3(5);
    } else if (idx === 6) {
      setSwitchTracker3(6);
    } else if (idx === 7) {
      setSwitchTracker3(7);
    }
  };
  const scrollMovementBox4 = (idx) => {
    scrollRefBox4.current.scrollLeft = window.innerWidth * idx;

    if (idx === 0) {
      setSwitchTracker4(0);
    } else if (idx === 1) {
      setSwitchTracker4(1);
    } else if (idx === 2) {
      setSwitchTracker4(2);
    } else if (idx === 3) {
      setSwitchTracker4(3);
    } else if (idx === 4) {
      setSwitchTracker4(4);
    } else if (idx === 5) {
      setSwitchTracker4(5);
    } else if (idx === 6) {
      setSwitchTracker4(6);
    } else if (idx === 7) {
      setSwitchTracker4(7);
    }
  };

  const handlescrollPast = () => {
    const scrollLeftInPX = scrollRefPast.current.scrollLeft;
    if (scrollLeftInPX < screen - 200) {
      setSwitchTrackerPast(0);
    } else if (scrollLeftInPX <= screen * 1) {
      setSwitchTrackerPast(1);
    } else if (scrollLeftInPX <= screen * 2) {
      setSwitchTrackerPast(2);
    } else if (scrollLeftInPX <= screen * 4) {
      setSwitchTrackerPast(3);
    } else if (scrollLeftInPX <= screen * 4) {
      setSwitchTrackerPast(4);
    } else if (scrollLeftInPX <= screen * 5) {
      setSwitchTrackerPast(5);
    } else if (scrollLeftInPX <= screen * 6) {
      setSwitchTrackerPast(6);
    } else if (scrollLeftInPX <= screen * 7) {
      setSwitchTrackerPast(7);
    }
  };
  const handlescroll2Past = () => {
    const scrollLeftBox2 = scrollRefBox2Past.current.scrollLeft;
    if (scrollLeftBox2 < screen - 200) {
      setSwitchTracker2Past(0);
    } else if (scrollLeftBox2 <= screen * 1) {
      setSwitchTracker2Past(1);
    } else if (scrollLeftBox2 <= screen * 2) {
      setSwitchTracker2Past(2);
    } else if (scrollLeftBox2 <= screen * 3) {
      setSwitchTracker2Past(3);
    } else if (scrollLeftBox2 <= screen * 4) {
      setSwitchTracker2Past(4);
    } else if (scrollLeftBox2 <= screen * 5) {
      setSwitchTracker2Past(5);
    } else if (scrollLeftBox2 <= screen * 6) {
      setSwitchTracker2Past(6);
    } else if (scrollLeftBox2 <= screen * 7) {
      setSwitchTracker2Past(7);
    }
  };
  const handlescroll3Past = () => {
    const scrollLeftBox3 = scrollRefBox3Past.current.scrollLeft;
    if (scrollLeftBox3 < screen - 200) {
      setSwitchTracker3Past(0);
    } else if (scrollLeftBox3 <= screen * 1) {
      setSwitchTracker3Past(1);
    } else if (scrollLeftBox3 <= screen * 2) {
      setSwitchTracker3Past(2);
    } else if (scrollLeftBox3 <= screen * 3) {
      setSwitchTracker3Past(3);
    } else if (scrollLeftBox3 <= screen * 4) {
      setSwitchTracker3Past(4);
    } else if (scrollLeftBox3 <= screen * 5) {
      setSwitchTracker3Past(5);
    } else if (scrollLeftBox3 <= screen * 6) {
      setSwitchTracker3Past(6);
    } else if (scrollLeftBox3 <= screen * 7) {
      setSwitchTracker3Past(7);
    }
  };
  const handlescroll4Past = () => {
    const scrollLeftBox4 = scrollRefBox4Past.current.scrollLeft;
    if (scrollLeftBox4 < screen - 200) {
      setSwitchTracker4Past(0);
    } else if (scrollLeftBox4 <= screen * 1) {
      setSwitchTracker4Past(1);
    } else if (scrollLeftBox4 <= screen * 2) {
      setSwitchTracker4Past(2);
    } else if (scrollLeftBox4 <= screen * 3) {
      setSwitchTracker4Past(3);
    } else if (scrollLeftBox4 <= screen * 4) {
      setSwitchTracker4Past(4);
    } else if (scrollLeftBox4 <= screen * 5) {
      setSwitchTracker4Past(5);
    } else if (scrollLeftBox4 <= screen * 6) {
      setSwitchTracker4Past(6);
    } else if (scrollLeftBox4 <= screen * 7) {
      setSwitchTracker4Past(7);
    }
  };

  const scrollMovementPast = (idx) => {
    scrollRefPast.current.scrollLeft = window.innerWidth * idx;

    if (idx === 0) {
      setSwitchTrackerPast(0);
    } else if (idx === 1) {
      setSwitchTrackerPast(1);
    } else if (idx === 2) {
      setSwitchTrackerPast(2);
    } else if (idx === 3) {
      setSwitchTrackerPast(3);
    } else if (idx === 4) {
      setSwitchTrackerPast(4);
    } else if (idx === 5) {
      setSwitchTrackerPast(5);
    } else if (idx === 6) {
      setSwitchTrackerPast(6);
    } else if (idx === 7) {
      setSwitchTrackerPast(7);
    }
  };
  const scrollMovementBox2Past = (idx) => {
    scrollRefBox2Past.current.scrollLeft = window.innerWidth * idx;

    if (idx === 0) {
      setSwitchTracker2Past(0);
    } else if (idx === 1) {
      setSwitchTracker2Past(1);
    } else if (idx === 2) {
      setSwitchTracker2Past(2);
    } else if (idx === 3) {
      setSwitchTracker2Past(3);
    } else if (idx === 4) {
      setSwitchTracker2Past(4);
    } else if (idx === 5) {
      setSwitchTracker2Past(5);
    } else if (idx === 6) {
      setSwitchTracker2Past(6);
    } else if (idx === 7) {
      setSwitchTracker2Past(7);
    }
  };
  const scrollMovementBox3Past = (idx) => {
    scrollRefBox3Past.current.scrollLeft = window.innerWidth * idx;

    if (idx === 0) {
      setSwitchTracker3Past(0);
    } else if (idx === 1) {
      setSwitchTracker3Past(1);
    } else if (idx === 2) {
      setSwitchTracker3Past(2);
    } else if (idx === 3) {
      setSwitchTracker3Past(3);
    } else if (idx === 4) {
      setSwitchTracker3Past(4);
    } else if (idx === 5) {
      setSwitchTracker3Past(5);
    } else if (idx === 6) {
      setSwitchTracker3Past(6);
    } else if (idx === 7) {
      setSwitchTracker3Past(7);
    }
  };
  const scrollMovementBox4Past = (idx) => {
    scrollRefBox4Past.current.scrollLeft = window.innerWidth * idx;

    if (idx === 0) {
      setSwitchTracker4Past(0);
    } else if (idx === 1) {
      setSwitchTracker4Past(1);
    } else if (idx === 2) {
      setSwitchTracker4Past(2);
    } else if (idx === 3) {
      setSwitchTracker4Past(3);
    } else if (idx === 4) {
      setSwitchTracker4Past(4);
    } else if (idx === 5) {
      setSwitchTracker4Past(5);
    } else if (idx === 6) {
      setSwitchTracker4Past(6);
    } else if (idx === 7) {
      setSwitchTracker4Past(7);
    }
  };

  const handlescrollUpcoming = () => {
    const scrollLeftInPX = scrollRefUpcoming.current.scrollLeft;
    if (scrollLeftInPX < screen - 200) {
      setSwitchTrackerUpcoming(0);
    } else if (scrollLeftInPX <= screen * 1) {
      setSwitchTrackerUpcoming(1);
    } else if (scrollLeftInPX <= screen * 2) {
      setSwitchTrackerUpcoming(2);
    } else if (scrollLeftInPX <= screen * 3) {
      setSwitchTrackerUpcoming(3);
    } else if (scrollLeftInPX <= screen * 4) {
      setSwitchTrackerUpcoming(4);
    } else if (scrollLeftInPX <= screen * 5) {
      setSwitchTrackerUpcoming(5);
    } else if (scrollLeftInPX <= screen * 6) {
      setSwitchTrackerUpcoming(6);
    } else if (scrollLeftInPX <= screen * 7) {
      setSwitchTrackerUpcoming(7);
    }
  };
  const handlescroll2Upcoming = () => {
    const scrollLeftBox2 = scrollRefBox2Upcoming.current.scrollLeft;
    if (scrollLeftBox2 < screen - 200) {
      setSwitchTracker2Upcoming(0);
    } else if (scrollLeftBox2 <= screen * 1) {
      setSwitchTracker2Upcoming(1);
    } else if (scrollLeftBox2 <= screen * 2) {
      setSwitchTracker2Upcoming(2);
    } else if (scrollLeftBox2 <= screen * 3) {
      setSwitchTracker2Upcoming(3);
    } else if (scrollLeftBox2 <= screen * 4) {
      setSwitchTracker2Upcoming(4);
    } else if (scrollLeftBox2 <= screen * 5) {
      setSwitchTracker2Upcoming(5);
    } else if (scrollLeftBox2 <= screen * 6) {
      setSwitchTracker2Upcoming(6);
    } else if (scrollLeftBox2 <= screen * 7) {
      setSwitchTracker2Upcoming(7);
    }
  };
  const handlescroll3Upcoming = () => {
    const scrollLeftBox3 = scrollRefBox3Upcoming.current.scrollLeft;
    if (scrollLeftBox3 < screen - 200) {
      setSwitchTracker3Upcoming(0);
    } else if (scrollLeftBox3 <= screen * 1) {
      setSwitchTracker3Upcoming(1);
    } else if (scrollLeftBox3 <= screen * 2) {
      setSwitchTracker3Upcoming(2);
    } else if (scrollLeftBox3 <= screen * 3) {
      setSwitchTracker3Upcoming(3);
    } else if (scrollLeftBox3 <= screen * 4) {
      setSwitchTracker3Upcoming(4);
    } else if (scrollLeftBox3 <= screen * 5) {
      setSwitchTracker3Upcoming(5);
    } else if (scrollLeftBox3 <= screen * 6) {
      setSwitchTracker3Upcoming(6);
    } else if (scrollLeftBox3 <= screen * 7) {
      setSwitchTracker3Upcoming(7);
    }
  };
  const handlescroll4Upcoming = () => {
    const scrollLeftBox4 = scrollRefBox4Upcoming.current.scrollLeft;
    if (scrollLeftBox4 < screen - 200) {
      setSwitchTracker4Upcoming(0);
    } else if (scrollLeftBox4 <= screen * 1) {
      setSwitchTracker4Upcoming(1);
    } else if (scrollLeftBox4 <= screen * 2) {
      setSwitchTracker4Upcoming(2);
    } else if (scrollLeftBox4 <= screen * 3) {
      setSwitchTracker4Upcoming(3);
    } else if (scrollLeftBox4 <= screen * 4) {
      setSwitchTracker4Upcoming(4);
    } else if (scrollLeftBox4 <= screen * 5) {
      setSwitchTracker4Upcoming(5);
    } else if (scrollLeftBox4 <= screen * 6) {
      setSwitchTracker4Upcoming(6);
    } else if (scrollLeftBox4 <= screen * 7) {
      setSwitchTracker4Upcoming(7);
    }
  };

  const scrollMovementUpcoming = (idx) => {
    scrollRefUpcoming.current.scrollLeft = window.innerWidth * idx;

    if (idx === 0) {
      setSwitchTrackerUpcoming(0);
    } else if (idx === 1) {
      setSwitchTrackerUpcoming(1);
    } else if (idx === 2) {
      setSwitchTrackerUpcoming(2);
    } else if (idx === 3) {
      setSwitchTrackerUpcoming(3);
    } else if (idx === 4) {
      setSwitchTrackerUpcoming(4);
    } else if (idx === 5) {
      setSwitchTrackerUpcoming(5);
    } else if (idx === 6) {
      setSwitchTrackerUpcoming(6);
    } else if (idx === 7) {
      setSwitchTrackerUpcoming(7);
    }
  };
  const scrollMovementBox2Upcoming = (idx) => {
    scrollRefBox2Upcoming.current.scrollLeft = window.innerWidth * idx;

    if (idx === 0) {
      setSwitchTracker2Upcoming(0);
    } else if (idx === 1) {
      setSwitchTracker2Upcoming(1);
    } else if (idx === 2) {
      setSwitchTracker2Upcoming(2);
    } else if (idx === 3) {
      setSwitchTracker2Upcoming(3);
    } else if (idx === 4) {
      setSwitchTracker2Upcoming(4);
    } else if (idx === 5) {
      setSwitchTracker2Upcoming(5);
    } else if (idx === 6) {
      setSwitchTracker2Upcoming(6);
    } else if (idx === 7) {
      setSwitchTracker2Upcoming(7);
    }
  };
  const scrollMovementBox3Upcoming = (idx) => {
    scrollRefBox3Upcoming.current.scrollLeft = window.innerWidth * idx;

    if (idx === 0) {
      setSwitchTracker3Upcoming(0);
    } else if (idx === 1) {
      setSwitchTracker3Upcoming(1);
    } else if (idx === 2) {
      setSwitchTracker3Upcoming(2);
    } else if (idx === 3) {
      setSwitchTracker3Upcoming(3);
    } else if (idx === 4) {
      setSwitchTracker3Upcoming(4);
    } else if (idx === 5) {
      setSwitchTracker3Upcoming(5);
    } else if (idx === 6) {
      setSwitchTracker3Upcoming(6);
    } else if (idx === 7) {
      setSwitchTracker3Upcoming(7);
    }
  };
  const scrollMovementBox4Upcoming = (idx) => {
    scrollRefBox4Upcoming.current.scrollLeft = window.innerWidth * idx;

    if (idx === 0) {
      setSwitchTracker4Upcoming(0);
    } else if (idx === 1) {
      setSwitchTracker4Upcoming(1);
    } else if (idx === 2) {
      setSwitchTracker4Upcoming(2);
    } else if (idx === 3) {
      setSwitchTracker4Upcoming(3);
    } else if (idx === 4) {
      setSwitchTracker4Upcoming(4);
    } else if (idx === 5) {
      setSwitchTracker4Upcoming(5);
    } else if (idx === 6) {
      setSwitchTracker4Upcoming(6);
    } else if (idx === 7) {
      setSwitchTracker4Upcoming(7);
    }
  };

  return (
    <div className={style.mobile__wrapper}>
      <h4>All Ongoing Events</h4>
      <div className={style.mobile__list__box__wrapper}>
        <div className={style.event__mobile}>
          <div
            className={style.mobile_scroll}
            ref={scrollRef}
            onScroll={handlescroll}
          >
            <div
              className={style.event__mobile__box1}
              style={{
                width: allEvents.length === 1 && "105%",
              }}
            >
              {allEvents.length > 0 &&
                allEvents
                  .slice(0, 8)
                  .map((event, idx) => (
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
          </div>
          <div className={style.event_tracker}>
            {allEvents.length > 1 &&
              allEvents.slice(0, 8).map((event, idx) => (
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
                width: allEvents.length === 9 && "105%",
              }}
            >
              {allEvents.length > 0 &&
                allEvents
                  .slice(8, 16)
                  .map((event, idx) => (
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
          </div>
          <div className={style.event_tracker}>
            {allEvents.length > 9 &&
              allEvents.slice(8, 16).map((event, idx) => (
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
          <div
            className={style.mobile_scroll}
            ref={scrollRefBox3}
            onScroll={handlescroll3}
          >
            <div
              className={style.event__mobile__box1}
              style={{
                width: allEvents.length === 17 && "105%",
              }}
            >
              {allEvents.length > 0 &&
                allEvents
                  .slice(16, 24)
                  .map((event, idx) => (
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
          </div>
          <div className={style.event_tracker}>
            {allEvents.length > 17 &&
              allEvents.slice(16, 24).map((event, idx) => (
                <span
                  key={idx}
                  onClick={() => scrollMovementBox3(idx)}
                  style={{
                    backgroundColor:
                      switchTracker3 === idx ? "#EF3125" : "#ffffff",
                  }}
                ></span>
              ))}
          </div>

          <div
            className={style.mobile_scroll}
            ref={scrollRefBox4}
            onScroll={handlescroll4}
          >
            <div
              className={style.event__mobile__box1}
              style={{
                width: allEvents.length === 25 && "105%",
              }}
            >
              {allEvents.length > 0 &&
                allEvents
                  .slice(24, 32)
                  .map((event, idx) => (
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
          </div>
          <div className={style.event_tracker}>
            {allEvents.length > 25 &&
              allEvents.slice(24, 32).map((event, idx) => (
                <span
                  key={idx}
                  onClick={() => scrollMovementBox4(idx)}
                  style={{
                    backgroundColor:
                      switchTracker4 === idx ? "#EF3125" : "#ffffff",
                  }}
                ></span>
              ))}
          </div>
        </div>

        {!allEvents.length > 0 && (
          <NoData
            description="No upcoming events yet!"
            containerStyle={{
              width: "100%",
              margin: "auto",
              marginTop: "0.5rem",
            }}
          />
        )}
        {allEvents.length > 1 && (
          <div className={style.paginateBox}>
            <Pagination
              total={allEventMeta?.total}
              onChange={allOnChange}
              itemRender={itemRender}
              current={allPage}
              pageSize={16}
              defaultPageSize={16}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
      <h4>All Upcoming Events</h4>
      <div className={style.mobile__list__box__wrapper}>
        <div className={style.event__mobile}>
          <div
            className={style.mobile_scroll}
            ref={scrollRefUpcoming}
            onScroll={handlescrollUpcoming}
          >
            <div
              className={style.event__mobile__box1}
              style={{
                width: upcomingEvents.length === 1 && "105%",
              }}
            >
              {upcomingEvents.length > 0 &&
                upcomingEvents
                  .slice(0, 8)
                  .map((event, idx) => (
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
          </div>
          <div className={style.event_tracker}>
            {upcomingEvents.length > 1 &&
              upcomingEvents.slice(0, 8).map((event, idx) => (
                <span
                  key={idx}
                  onClick={() => scrollMovementUpcoming(idx)}
                  style={{
                    backgroundColor:
                      switchTrackerUpcoming === idx ? "#EF3125" : "#ffffff",
                  }}
                ></span>
              ))}
          </div>
          <div
            className={style.mobile_scroll}
            ref={scrollRefBox2Upcoming}
            onScroll={handlescroll2Upcoming}
          >
            <div
              className={style.event__mobile__box1}
              style={{
                width: upcomingEvents.length === 9 && "105%",
              }}
            >
              {upcomingEvents.length > 8 &&
                upcomingEvents
                  .slice(8, 16)
                  .map((event, idx) => (
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
          </div>
          <div className={style.event_tracker}>
            {upcomingEvents.length > 9 &&
              upcomingEvents.slice(8, 16).map((event, idx) => (
                <span
                  key={idx}
                  onClick={() => scrollMovementBox2Upcoming(idx)}
                  style={{
                    backgroundColor:
                      switchTracker2Upcoming === idx ? "#EF3125" : "#ffffff",
                  }}
                ></span>
              ))}
          </div>

          <div
            className={style.mobile_scroll}
            ref={scrollRefBox3Upcoming}
            onScroll={handlescroll3Upcoming}
          >
            <div
              className={style.event__mobile__box1}
              style={{
                width: upcomingEvents.length === 17 && "105%",
              }}
            >
              {upcomingEvents.length > 16 &&
                upcomingEvents
                  .slice(16, 24)
                  .map((event, idx) => (
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
          </div>
          <div className={style.event_tracker}>
            {upcomingEvents.length > 17 &&
              upcomingEvents.slice(16, 24).map((event, idx) => (
                <span
                  key={idx}
                  onClick={() => scrollMovementBox3Upcoming(idx)}
                  style={{
                    backgroundColor:
                      switchTracker3Upcoming === idx ? "#EF3125" : "#ffffff",
                  }}
                ></span>
              ))}
          </div>

          <div
            className={style.mobile_scroll}
            ref={scrollRefBox4Upcoming}
            onScroll={handlescroll4Upcoming}
          >
            <div
              className={style.event__mobile__box1}
              style={{
                width: upcomingEvents.length === 25 && "105%",
              }}
            >
              {upcomingEvents.length > 24 &&
                upcomingEvents
                  .slice(24, 32)
                  .map((event, idx) => (
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
          </div>
          <div className={style.event_tracker}>
            {upcomingEvents.length > 24 &&
              upcomingEvents.slice(24, 32).map((event, idx) => (
                <span
                  key={idx}
                  onClick={() => scrollMovementBox4Upcoming(idx)}
                  style={{
                    backgroundColor:
                      switchTracker4Upcoming === idx ? "#EF3125" : "#ffffff",
                  }}
                ></span>
              ))}
          </div>
        </div>
        {!upcomingEvents.length > 0 && (
          <NoData
            description="No upcoming events yet!"
            containerStyle={{
              width: "100%",
              margin: "auto",
              marginTop: "0.5rem",
            }}
          />
        )}
        {upcomingEvents.length > 32 && (
          <div className={style.paginateBox}>
            <Pagination
              total={upcomingEventMeta?.total}
              onChange={upcomingOnChange}
              itemRender={itemRender}
              current={upcomingPage}
              pageSize={8}
              defaultPageSize={8}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>

      <h4>All Past Events</h4>
      <div className={style.mobile__list__box__wrapper}>
        <div className={style.event__mobile}>
          <div
            className={style.mobile_scroll}
            ref={scrollRefPast}
            onScroll={handlescrollPast}
          >
            <div
              className={style.event__mobile__box1}
              style={{
                width: pastEvents.length === 1 && "105%",
              }}
            >
              {pastEvents.length > 0 &&
                pastEvents
                  .slice(0, 8)
                  .map((event, idx) => (
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
          </div>
          <div className={style.event_tracker}>
            {pastEvents.length > 1 &&
              pastEvents.slice(0, 8).map((event, idx) => (
                <span
                  key={idx}
                  onClick={() => scrollMovementPast(idx)}
                  style={{
                    backgroundColor:
                      switchTrackerPast === idx ? "#EF3125" : "#ffffff",
                  }}
                ></span>
              ))}
          </div>
          <div
            className={style.mobile_scroll}
            ref={scrollRefBox2Past}
            onScroll={handlescroll2Past}
          >
            <div
              className={style.event__mobile__box1}
              style={{
                width: pastEvents.length === 9 && "105%",
              }}
            >
              {pastEvents.length > 0 &&
                pastEvents
                  .slice(8, 16)
                  .map((event, idx) => (
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
          </div>
          <div className={style.event_tracker}>
            {pastEvents.length > 9 &&
              pastEvents.slice(8, 16).map((event, idx) => (
                <span
                  key={idx}
                  onClick={() => scrollMovementBox2Past(idx)}
                  style={{
                    backgroundColor:
                      switchTracker2Past === idx ? "#EF3125" : "#ffffff",
                  }}
                ></span>
              ))}
          </div>

          <div
            className={style.mobile_scroll}
            ref={scrollRefBox3Past}
            onScroll={handlescroll3Past}
          >
            <div
              className={style.event__mobile__box1}
              style={{
                width: pastEvents.length === 17 && "105%",
              }}
            >
              {pastEvents.length > 16 &&
                pastEvents
                  .slice(16, 24)
                  .map((event, idx) => (
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
          </div>
          <div className={style.event_tracker}>
            {pastEvents.length > 17 &&
              pastEvents.slice(16, 24).map((event, idx) => (
                <span
                  key={idx}
                  onClick={() => scrollMovementBox3Past(idx)}
                  style={{
                    backgroundColor:
                      switchTracker3Past === idx ? "#EF3125" : "#ffffff",
                  }}
                ></span>
              ))}
          </div>

          <div
            className={style.mobile_scroll}
            ref={scrollRefBox4Past}
            onScroll={handlescroll4Past}
          >
            <div
              className={style.event__mobile__box1}
              style={{
                width: pastEvents.length === 25 && "105%",
              }}
            >
              {pastEvents.length > 24 &&
                pastEvents
                  .slice(24, 32)
                  .map((event, idx) => (
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
          </div>
          <div className={style.event_tracker}>
            {pastEvents.length > 25 &&
              pastEvents.slice(24, 32).map((event, idx) => (
                <span
                  key={idx}
                  onClick={() => scrollMovementBox4Past(idx)}
                  style={{
                    backgroundColor:
                      switchTracker4Past === idx ? "#EF3125" : "#ffffff",
                  }}
                ></span>
              ))}
          </div>
        </div>

        {!pastEvents.length > 0 && (
          <NoData
            description="No upcoming events yet!"
            containerStyle={{
              width: "100%",
              margin: "auto",
              marginTop: "0.5rem",
            }}
          />
        )}
        {pastEvents.length > 1 && (
          <div className={style.paginateBox}>
            <Pagination
              total={pastEventMeta?.total}
              onChange={pastOnChange}
              itemRender={itemRender}
              current={pastPage}
              pageSize={32}
              defaultPageSize={32}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventMobile;
