import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { Tabs, Pagination } from "antd";
import { BiSearch, BiCaretLeft, BiCaretRight } from "react-icons/bi";
import NoData from "../../../components/NoData";
import { browseEvents } from "../../../api/eventHandler";
// import PublicGenericLayout from "../../../components/GenericLayout/PublicGenericLayout";
import EventCards from "../../../components/Cards/EventCard/EventCard";
import style from "./Event.module.scss";

import Layout from "../../../components/Layout";
import AuthModalForm from "../../../Auth/AuthModalForm";
import NavHeader from "../../../components/Layout/NavHeader";
import Footer from "../../../components/Layout/Footer/Footer";
import EventMobile from "./EventMobile";

const { TabPane } = Tabs;

const Events = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [upcomingEvents, setUpcomingEvent] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [allPage, setAllPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [allEventMeta, setAllEventMeta] = useState();
  const [upcomingEventMeta, setUpcomingEventMeta] = useState();
  const [pastEventMeta, setPastEventMeta] = useState();

  const [screen, setScreen] = useState(window.innerWidth);
  const checkMobile = () => {
    if (screen < 600) {
      return true;
    } else {
      return false;
    }
  };
  const [mobile, setMobile] = useState(checkMobile);

  useEffect(() => {
    function handleResize() {
      setScreen(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    setMobile(checkMobile());
    return () => window.removeEventListener("resize", handleResize);
  }, [screen]);

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

  function itemRenderMobile(current, type, originalElement) {
    if (type === "prev") {
      return (
        <Link to="#" className={style.paginateNav}>
          <span>
            <BiCaretLeft color="#EF3125" size={18} />
          </span>
          <span>Prev</span>
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

  function allOnChange(page, pageSize) {
    fetchEventHandler({
      filter: "",
      search: searchPhrase,
      per_page: mobile ? 32 : 16,
      page,
    });
    setAllPage(page);
  }

  function upcomingOnChange(page, pageSize) {
    fetchUpcomingEventHandler({
      filter: "",
      search: searchPhrase,
      per_page: mobile ? 32 : 16,
      page,
    });
    setUpcomingPage(page);
  }

  function pastOnChange(page, pageSize) {
    fetchPastHandler({
      filter: "",
      search: searchPhrase,
      per_page: mobile ? 32 : 16,
      page,
    });
    setPastPage(page);
  }

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
  };

  const fetchEventHandler = async (filter) => {
    try {
      setLoading(true);

      const [allEventRes] = await Promise.all([browseEvents(filter)]);
      setAllEvents(allEventRes.data.data);
      setAllEventMeta(allEventRes.data.meta);
    } catch (ex) {
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingEventHandler = async (filter) => {
    try {
      setLoading(true);

      const [upcomingEventRes] = await Promise.all([browseEvents(filter)]);

      setUpcomingEvent(upcomingEventRes.data.data);
      setUpcomingEventMeta(upcomingEventRes.data.meta);
    } catch (ex) {
    } finally {
      setLoading(false);
    }
  };
  const fetchPastHandler = async (filter) => {
    try {
      setLoading(true);
      const [pastEventRes] = await Promise.all([browseEvents(filter)]);
      setPastEvents(pastEventRes.data.data);
      setPastEventMeta(pastEventRes.data.meta);
    } catch (ex) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventHandler({
      filter: "",
      search: searchPhrase,
      per_page: mobile ? 32 : 16,
    });
    fetchPastHandler({
      filter: "past",
      search: searchPhrase,
      per_page: mobile ? 32 : 16,
    });
    fetchUpcomingEventHandler({
      filter: "upcoming",
      search: searchPhrase,
      per_page: mobile ? 32 : 16,
    });
  }, []);
  return (
    <Suspense
      fallback={
        <div className="divLoader">
          <img src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/Apems-logo_iu3uju.webp" />
        </div>
      }
    >
      <Layout>
        <div style={{ position: "relative", zIndex: "10" }}>
          <AuthModalForm component={NavHeader} navMenuBlack="true" />
        </div>
        <section className={style.event__wrapper}>
          <div className={style.event__wrapper_header}>
            <div className={style.event__wrapper_input}>
              <input
                type="input"
                placeholder="Enter event name"
                className={style.event__search_input}
                onChange={(e) => setSearchPhrase(e.target.value)}
              />
              <div className={style.search__icon_box}>
                <BiSearch className={style.event__search_icon} size="25" />
              </div>
            </div>

            <button
              onClick={fetchEventHandler}
              type="button"
              className={style.event__search_btn}
            >
              Search Event
            </button>
          </div>

          <div className={style.event_wrapper_body}>
            <Tabs defaultActiveKey="1" style={{ color: "green" }}>
              <TabPane
                tab="All Events"
                key="1"
                className={style.tabStyle}
                style={{ color: "green" }}
              >
                <div className={style.event__list}>
                  <div className={style.event__list__box}>
                    {loading ? (
                      isLoading()
                    ) : allEvents.length ? (
                      <>
                        {allEvents.map((event) => (
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
                        <div className={style.paginateBox}>
                          <Pagination
                            total={allEventMeta?.total}
                            onChange={allOnChange}
                            itemRender={itemRender}
                            current={allPage}
                            pageSize={8}
                            defaultPageSize={8}
                            showSizeChanger={false}
                          />
                        </div>
                      </>
                    ) : (
                      <NoData
                        description="No events yet!"
                        containerStyle={{
                          width: "50%",
                          margin: "auto",
                          marginTop: "5rem",
                        }}
                      />
                    )}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Upcoming Events" key="2" className={style.tabStyle}>
                <div className={style.event__list}>
                  <div className={style.event__list__box}>
                    {upcomingEvents.length ? (
                      <>
                        {upcomingEvents.map((event) => (
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
                      </>
                    ) : (
                      <NoData
                        description="No upcoming events yet!"
                        containerStyle={{
                          width: "50%",
                          margin: "auto",
                          marginTop: "5rem",
                        }}
                      />
                    )}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Past Events" key="3" className={style.tabStyle}>
                <div className={style.event__list}>
                  <div className={style.event__list__box}>
                    {pastEvents.length ? (
                      <>
                        {pastEvents.map((event) => (
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
                        <div className={style.paginateBox}>
                          <Pagination
                            total={pastEventMeta?.total}
                            onChange={pastOnChange}
                            itemRender={itemRender}
                            current={pastPage}
                            pageSize={8}
                            defaultPageSize={8}
                            showSizeChanger={false}
                          />
                        </div>
                      </>
                    ) : (
                      <NoData
                        description="No past events yet!"
                        containerStyle={{
                          width: "50%",
                          margin: "auto",
                          marginTop: "5rem",
                        }}
                      />
                    )}
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
          <EventMobile
            loading={loading}
            setLoading={setLoading}
            allEvents={allEvents}
            upcomingEvents={upcomingEvents}
            pastEvents={pastEvents}
            isLoading={isLoading}
            setAllEvents={setAllEvents}
            searchPhrase={searchPhrase}
            browseEvents={browseEvents}
            allOnChange={allOnChange}
            itemRender={itemRenderMobile}
            allEventMeta={allEventMeta}
            allPage={allPage}
            upcomingEventMeta={upcomingEventMeta}
            upcomingOnChange={upcomingOnChange}
            upcomingPage={upcomingPage}
            pastEventMeta={pastEventMeta}
            pastOnChange={pastOnChange}
            pastPage={pastPage}
          />
        </section>
        <Footer />
      </Layout>
    </Suspense>
  );
};

export default Events;
