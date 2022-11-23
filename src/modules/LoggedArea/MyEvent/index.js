import { Dropdown, Menu, Pagination } from "antd";
import debounce from "debounce-promise";
// import classNames from "classnames";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { BiCaretDown, BiCaretLeft, BiCaretRight } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { loadChat } from "../../../utils/loadScript";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { getEvents } from "../../../api/eventHandler";
import EventCards from "../../../components/Cards/EventCard/EventCard";
import DashboardLeftHeaderNav from "../../../components/Dashboard/LeftHeaderNav";
import { ErrorFallback } from "../../../components/ErrorBoundaryComponentLevel";
import NoData from "../../../components/NoData";
import PrivateGenericLayout from "../../../components/PrivateGenericLayout/PrivateGenericLayout";
import style from "./index.module.scss";

function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return (
      <Link to="#" className={style.paginateNav}>
        <span>
          <BiCaretLeft color="#EF3125" size={18} />
        </span>
        <span>Previous</span>
      </Link>
    );
  }
  if (type === "next") {
    return (
      <Link to="#" className={style.paginateNav}>
        <span>
          <BiCaretRight color="#EF3125" size={18} />
        </span>
        <span>Next</span>
      </Link>
    );
  }
  return originalElement;
}

const MyEvent = () => {
  const [upcomingfilter] = useState({
    filter: "",
    search: "",
    calender: "",
  });
  const [pastFilter] = useState({
    filter: "",
    search: "",
    calender: "",
  });
  const [, setTab] = useState("");
  const [pastEvent, setPastEvent] = useState();
  const [upcomingEvent, setUpcomingEvent] = useState();
  const [upcomingError, setUpcomingEventError] = useState(false);
  const [pastError, setPastEventError] = useState(false);
  // const { upcomingEvent, pastEvent } = useSelector((state) => state.events);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [pastSearchPhrase, setPastSearchPhrase] = useState("");
  const [loadingPast, setLoadingPast] = useState(false);
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [current, setCurrent] = useState(1);
  const [upcomingMeta, setUpcomingMeta] = useState();
  const [pastEventMeta, setPastEventMeta] = useState();
  const [currentPastPage, setCurrentPastPage] = useState(1);
  const [selectedPastDropDown, setSelectedPastDropDown] =
    useState("Event Type");
  const [selectedUpcomingDropDown, setSelectedUpcomingDropDown] =
    useState("Event Type");

  const getPastEvent = async (payload) => {
    setLoadingPast(true);
    try {
      const {
        data: { data, meta },
      } = await getEvents(payload);
      setLoadingPast(false);
      setPastEvent(data);
      setPastEventMeta(meta);
      setPastEventError(false);
    } catch (err) {
      setPastEventError(true);
    }
  };

  const getUpcomingEvent = async (payload) => {
    setLoadingUpcoming(true);
    try {
      const {
        data: { data, meta },
      } = await getEvents(payload);
      setLoadingUpcoming(false);
      setUpcomingMeta(meta);
      console.log("gdsgdgd", meta);
      setUpcomingEvent(data);
      setUpcomingEventError(false);
    } catch (err) {
      setUpcomingEventError(true);
    }
  };

  useEffect(() => {
    getPastEvent({ ...pastFilter, filter: "past", page: 1, per_page: 8 });
  }, [pastFilter]);
  useEffect(() => {
    getUpcomingEvent({
      ...upcomingfilter,
      filter: "hybrid",
      page: 1,
      per_page: 4,
    });
  }, [upcomingfilter]);

  const fetchEvent = (value, tab) => {
    if (tab === "upcoming") {
      getUpcomingEvent({
        ...upcomingfilter,
        filter: "hybrid",
        search: value,
        page: 1,
        per_page: 4,
      });
    } else {
      getPastEvent({
        ...pastFilter,
        filter: tab,
        search: value,
        page: 1,
        per_page: 8,
      });
    }
  };
  const dbounce = useCallback(debounce(fetchEvent, 500), []);
  // const { loading } = useSelector((state) => state.ui);

  const handleChange = (e, eventStatus) => {
    const { value: nextPhrase } = e.target;

    if (eventStatus === "past") {
      setPastSearchPhrase(nextPhrase);
      setTab(eventStatus);
    } else {
      setSearchPhrase(nextPhrase);
    }

    dbounce(nextPhrase, eventStatus);
  };

  const evenTypeHandler = (item, filter, title) => {
    if (filter === "ongoing") {
      setSelectedUpcomingDropDown(title || "All");
      getUpcomingEvent({
        event_type: item,
        filter: "hybrid",
        page: 1,
        per_page: 4,
      });
    } else {
      setSelectedPastDropDown(title || "All");
      getPastEvent({ event_type: item, filter: "past", page: 1, per_page: 8 });
    }
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
  }, []);

  function onChange(page, pageSize) {
    getUpcomingEvent({ filter: "hybrid", page, per_page: 4 });
    setCurrent(page);
  }

  function pastOnChange(page, pageSize) {
    getPastEvent({ filter: "past", page, per_page: 8 });
    setCurrentPastPage(page);
  }

  const menuPast = (
    <Menu>
      <Menu.Item>
        <Link onClick={() => evenTypeHandler("", "past", "All")} to="#">
          All
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          onClick={() =>
            evenTypeHandler("AGM", "past", "Annual General Meetings")
          }
          to="#"
        >
          Annual General Meetings
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to="#"
          onClick={() =>
            evenTypeHandler("meetings", "past", "Corporate Events")
          }
        >
          Corporate Events
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to="#"
          onClick={() => evenTypeHandler("concerts", "past", "Concert & Shows")}
        >
          Concert & Shows
        </Link>
      </Menu.Item>
    </Menu>
  );
  const menuUpcoming = (
    <Menu>
      <Menu.Item>
        <Link onClick={() => evenTypeHandler("", "ongoing", "All")} to="#">
          All
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          onClick={() =>
            evenTypeHandler("AGM", "ongoing", "Annual General Meetings")
          }
          to="#"
        >
          Annual General Meetings
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to="#"
          onClick={() =>
            evenTypeHandler("meetings", "ongoing", "Corporate Events")
          }
        >
          Corporate Events
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to="#"
          onClick={() =>
            evenTypeHandler("concerts", "ongoing", "Concert & Shows")
          }
        >
          Concert & Shows
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <PrivateGenericLayout
      leftNav={
        <DashboardLeftHeaderNav
          title="Events"
          subtitle="Start with the key details about your new event"
        />
      }
    >
      <section className={style.container}>
        <div className={style.createEventBox}>
          <Link to="/Event/types" className={style.createLink}>
            Create Event
          </Link>
        </div>
        <section className={style.upcomingType}>
          <div className={style.eventStatusBox}>
            <button className={style.eventStatusType}>
              Upcoming & Live Events
            </button>
          </div>
          <div className={style.searchable}>
            <div className={style.searchable_left}>
              <div className={style.searchInputBox}>
                <span className={style.searchIcon}>
                  <FiSearch size={20} color="#0000001A" />
                </span>
                <input
                  placeholder="search"
                  value={searchPhrase}
                  className={style.searchInput}
                  onChange={(e) => handleChange(e, "upcoming")}
                />
              </div>
            </div>
            <div className={style.searchable_right}>
              <div>
                <Dropdown
                  overlay={menuUpcoming}
                  placement="bottomCenter"
                  arrow
                  trigger={["click"]}
                >
                  <button className={style.eventTypeList}>
                    <span>{selectedUpcomingDropDown}</span>
                    <BiCaretDown />
                  </button>
                </Dropdown>
              </div>
            </div>
          </div>
          <div>
            <CardLoader visible={loadingUpcoming} />
            {(upcomingError || pastError) && (
              <ErrorFallback
                resetErrorBoundary={() =>
                  getUpcomingEvent({
                    ...upcomingfilter,
                    filter: "upcoming",
                    page: 1,
                    per_page: 4,
                  })
                }
              />
            )}
            {!loadingUpcoming && upcomingEvent && upcomingEvent.length === 0 && (
              <NoData
                description="No upcoming event yet!"
                containerStyle={{
                  width: "50%",
                  margin: "auto",
                  marginTop: "5rem",
                }}
              />
            )}
            {!loadingUpcoming && upcomingEvent && upcomingEvent.length > 0 && (
              <div className={style.event__list}>
                <div className={style.event__list__box}>
                  {upcomingEvent.map((event, idx) => (
                    <EventCards
                      key={event.id}
                      bannerUrl={event.banner}
                      title={event.title}
                      date={moment(event.start_date).format("DD MMM YYYY")}
                      price="₦2000"
                      style={{ flex: "0 0 23%" }}
                      url={`/event/${event.id}`}
                      logoUrl={event.logo}
                      item={event}
                      showMenu={false}
                    />
                  ))}
                </div>
                <div className={style.paginateBox}>
                  <Pagination
                    total={upcomingMeta?.total}
                    onChange={onChange}
                    itemRender={itemRender}
                    current={current}
                    pageSize={4}
                    showSizeChanger={false}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
        <section className={style.pastType}>
          <div className={style.eventStatusBox}>
            <button className={style.eventStatusType}>Past Events</button>
          </div>
          <div className={style.searchable}>
            <div className={style.searchable_left}>
              <div className={style.searchInputBox}>
                <span className={style.searchIcon}>
                  <FiSearch size={20} color="#0000001A" />
                </span>
                <input
                  placeholder="search"
                  className={style.searchInput}
                  value={pastSearchPhrase}
                  onChange={(e) => handleChange(e, "past")}
                />
              </div>
            </div>
            <div className={style.searchable_right}>
              <div>
                <Dropdown
                  overlay={menuPast}
                  placement="bottomCenter"
                  arrow
                  trigger={["click"]}
                >
                  <button className={style.eventTypeList}>
                    <span>{selectedPastDropDown}</span>
                    <BiCaretDown />
                  </button>
                </Dropdown>
              </div>
            </div>
          </div>
          <div>
            <CardLoader visible={loadingPast} />
            {!loadingPast && pastEvent && pastEvent.length === 0 && (
              <NoData
                description="No past event yet!"
                containerStyle={{
                  width: "50%",
                  margin: "auto",
                  marginTop: "5rem",
                }}
              />
            )}
            {!loadingPast && pastEvent && pastEvent.length > 0 && (
              <div className={style.event__list}>
                <div className={style.event__list__box}>
                  {pastEvent.map((event, idx) => (
                    <EventCards
                      key={event.id}
                      bannerUrl={event.banner}
                      title={event.title}
                      date={moment(event.start_date).format("DD MMM YYYY")}
                      price="₦28000"
                      style={{ flex: "0 0 23%" }}
                      url={`/event/${event.id}`}
                      logoUrl={event.logo}
                      item={event}
                      showMenu={false}
                    />
                  ))}
                </div>
                <div className={style.paginateBox}>
                  <Pagination
                    total={pastEventMeta?.total}
                    onChange={pastOnChange}
                    itemRender={itemRender}
                    current={currentPastPage}
                    pageSize={8}
                    defaultPageSize={8}
                    showSizeChanger={false}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </section>
    </PrivateGenericLayout>
  );
};

const CardLoader = ({ visible }) => {
  if (visible)
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
          <Skeleton height={200} width={"100%"} />
        </div>
        <div style={{ width: "23%", marginRight: "2%", marginBottom: "2rem" }}>
          <Skeleton height={200} width={"100%"} />
        </div>
        <div style={{ width: "23%", marginRight: "2%", marginBottom: "2rem" }}>
          <Skeleton height={200} width={"100%"} />
        </div>
        <div style={{ width: "23%", marginRight: "2%", marginBottom: "2rem" }}>
          <Skeleton height={200} width={"100%"} />
        </div>
      </div>
    );
  return null;
};

export default MyEvent;
