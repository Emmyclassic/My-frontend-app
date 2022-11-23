import React, { useEffect, useState, lazy, Suspense } from "react";
import { loadChat } from "../../../utils/loadScript.js";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../../components/Layout";
import style from "./index.module.scss";
import { useHistory, useLocation } from "react-router";
import { browseEvents } from "../../../api/eventHandler.js";

const Header = lazy(() => import("../../../components/Layout/Header"));
const Experience = lazy(() => import("../../../components/Layout/Experience"));
const Summary = lazy(() =>
  import("../../../components/Layout/Summary/Summary")
);
const Features = lazy(() =>
  import("../../../components/Layout/Features/Features")
);
const EventLanding = lazy(() =>
  import("../../../components/Layout/Event/EventLanding")
);
const Footer = lazy(() => import("../../../components/Layout/Footer/Footer"));

const HomePage = () => {
  const location = useLocation();
  const history = useHistory();
  const [tab, setTab] = useState("current");
  const [currentEvent, setCurrentEvent] = useState([]);
  const [upcomingEvent, setUpcomingEvent] = useState([]);
  const [errorObj, setErrorObj] = useState();
  const [loading, setLoading] = useState(false);

  const [filter] = useState({
    filter: "",
    search: "",
    calender: "",
  });

  useEffect(() => {
    loadChat();
  }, []);

  useEffect(() => {
    const zoomContainer = document.getElementById("zmmtg-root");
    const meetingContainer = document.querySelector(
      ".meeting-info-container--right-side"
    );
    console.log("meetingContainer", meetingContainer);

    if (location.state && location.state.fromLogout) {
      if (zoomContainer) {
        zoomContainer.style.display = "none";
        if (meetingContainer) {
          meetingContainer.style.display = "none";
        }
      }
      toast("Logout successfully", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "info",
        theme: "colored",
        delay: 0,
        onClose: () => {
          const state = { ...location.state };
          delete state.fromLogout;
          history.replace({ ...history.location, state });
        },
      });
    }
  }, []);

  const fetchPublicEvents = async (filter, setEventState) => {
    try {
      setLoading(true);
      const requestArr = [
        browseEvents({ ...filter, filter: "current", per_page: 8 }),
        browseEvents({ ...filter, filter: "upcoming", per_page: 8 }),
      ];
      const [current, upcoming] = await Promise.all(requestArr);
      setLoading(false);
      setCurrentEvent(current.data.data);
      setUpcomingEvent(upcoming.data.data);
    } catch (error) {
      setErrorObj(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicEvents(
      { ...filter, filter: "current", per_page: 8 },
      setCurrentEvent
    );
    fetchPublicEvents(
      { ...filter, filter: "upcoming", per_page: 8 },
      setUpcomingEvent
    );
  }, [filter]);

  useEffect(() => {
    console.log({ upcomingEvent, currentEvent });
  });
  useEffect(() => {
    const eventSection = document.querySelector(`.home_event`);
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          const eventSection = document.querySelector(`.nav_top`);
          if (!entry.isIntersecting) {
            if (eventSection) {
              eventSection.classList.add(`inverse__nav`);
            }
          } else {
            if (eventSection) {
              eventSection.classList.remove(`inverse__nav`);
            }
          }
        });
      },
      { threshold: 1 }
    );
    if (eventSection) {
      observer.observe(eventSection);
    }
  }, []);
  console.log("Home");
  return (
    <Suspense
      fallback={
        <div className="divLoader">
          <img src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/Apems-logo_iu3uju.webp" />
        </div>
      }
    >
      <Layout>
        <div className={style.layout}>
          <Header />
          <Experience />
          <main className={`${style.main}`}>
            <EventLanding
              currentEvent={currentEvent}
              upcomingEvent={upcomingEvent}
              tab={tab}
              errorObj={errorObj}
              toggleCurrentTab={(tab) => setTab(tab)}
              loading={loading}
            />
          </main>
          <Summary />
          <Features />
          <Footer />
          <ToastContainer />
        </div>
      </Layout>
    </Suspense>
  );
};

export default HomePage;
