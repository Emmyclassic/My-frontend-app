import moment from "moment";
import { setLoader } from "../../../../actions/uiAction";
import {
  currentEventsAction,
  eventAction,
  pastEventsAction,
  publishEvent,
  upcomingEventsAction,
} from "./browseEventAction";

export const getCurrentEventsAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const {
        data: { data },
      } = await httpApi.browseEvents(payload);
      dispatch(currentEventsAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      console.log("erree", err);
      const error = err.response?.data ?? err.toJSON().message;
      dispatch(currentEventsAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };
export const getUpcomingEventsAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const res = await httpApi.browseEvents(payload);
      console.log("res", res);
      const {
        data: { data },
      } = await httpApi.browseEvents(payload);
      console.log("upcoming", data);

      dispatch(upcomingEventsAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      console.log("weeee error", err.response);
      const error = err.response?.data ?? err.toJSON().message;
      dispatch(upcomingEventsAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };
export const getUpcomingMyEventAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const {
        data: { data },
      } = await httpApi.getEvents(payload);

      dispatch(upcomingEventsAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      const error = err.response?.data ?? err.toJSON().message;
      dispatch(upcomingEventsAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const getEventAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const {
        data: { data },
      } = await httpApi.fetchEvent(payload);
      const starts_at = moment(data?.start_date).format("DD/MM/YYYY HH:mm:ss");
      const ends_at = moment(data?.end_date).format("DD/MM/YYYY HH:mm:ss");
      const payloadCurrent = { ...data, starts_at, ends_at };

      dispatch(eventAction({ data: payloadCurrent, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      const error = err.response?.data ?? err.toJSON().message;
      dispatch(eventAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const getPastEventsAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const {
        data: { data },
      } = await httpApi.getEvents(payload);

      dispatch(pastEventsAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      const error = err.response?.data ?? err.toJSON().message;
      dispatch(pastEventsAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const publishEventAction =
  (payload, id) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const {
        data: { data },
      } = await httpApi.publishEvent(payload, id);

      dispatch(publishEvent({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      const error = err.response?.data ?? err.toJSON().message;
      dispatch(publishEvent({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };
