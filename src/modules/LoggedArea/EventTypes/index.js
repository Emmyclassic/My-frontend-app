import React, { useEffect } from "react";
import { FaListAlt, FaServer } from "react-icons/fa";
import { ImVideoCamera } from "react-icons/im";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import EventTypeCard from "../../../components/Cards/EventTypeCard";
import DashboardLeftHeaderNav from "../../../components/Dashboard/LeftHeaderNav";
import { ErrorFallback } from "../../../components/ErrorBoundaryComponentLevel";
import PrivateGenericLayout from "../../../components/PrivateGenericLayout/PrivateGenericLayout";
import style from "./index.module.scss";
import { getEventTypeAction } from "./state/action";

const eventTypeIcon = [FaListAlt, FaServer, ImVideoCamera];

const EventTypes = () => {
  const dispatch = useDispatch();
  const eventResponse = useSelector((state) => state.eventTypes);
  const { loading } = useSelector((state) => state.ui);
  console.log(eventResponse, "eventResponse log");
  useEffect(() => {
    dispatch(getEventTypeAction());
  }, []);

  const eventIcon = (idx) => {
    const Element = eventTypeIcon[idx];
    return <Element color="#ef3125" size={40} />;
  };

  const isLoading = () => {
    if (loading && eventResponse.length === 0) {
      return (
        <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
          <div
            style={{ width: "35%", marginRight: "2%", marginBottom: "2rem" }}
          >
            <Skeleton height={100} width={"100%"} />
          </div>
          <div
            style={{ width: "35%", marginRight: "2%", marginBottom: "2rem" }}
          >
            <Skeleton height={100} width={"100%"} />
          </div>
          <div
            style={{ width: "35%", marginRight: "2%", marginBottom: "2rem" }}
          >
            <Skeleton height={100} width={"100%"} />
          </div>
        </div>
      );
    }
  };
  return (
    <PrivateGenericLayout
      leftNav={
        <DashboardLeftHeaderNav
          title="Types of Event"
          subtitle="Select the type of event you want to create and proceed"
        />
      }
    >
      <section className={style.main}>
        {isLoading()}
        {loading === false && eventResponse.status === "fail" && (
          <ErrorFallback
            resetErrorBoundary={() => dispatch(getEventTypeAction())}
          />
        )}

        <div className={style.eventContainer}>
          {eventResponse.status === "success" &&
            eventResponse.data.length > 0 &&
            eventResponse.data.map((eventType, idx) => (
              <EventTypeCard
                icon={eventIcon(idx)}
                title={eventType.name}
                id={eventType.id}
                key={eventType.id}
                subtitle={eventType.description}
                containerStyle={{ flex: "0 0 48%" }}
              />
            ))}
        </div>
      </section>
    </PrivateGenericLayout>
  );
};

export default EventTypes;
