import { setLoader } from "../../../../../actions/uiAction";
import {
  addAttendee,
  addAttendeeAction,
  addProxy,
  addProxyAction,
  attendeeAction,
  proxyAction,
  removeAttendee,
  removeProxy,
  setAttendeeLoader,
  setProxyLoader,
} from "./attendeeAction";

export const postAttendeeAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setAttendeeLoader(true));
      const {
        data: { data },
      } = await httpApi.addAttendee(payload);

      dispatch(
        addAttendee({
          data: data && data.length ? data : [],
          status: "success",
        })
      );
      dispatch(
        addAttendeeAction({
          data,
          status: "success",
          message: "Attendee created successfully",
        })
      );
      dispatch(setAttendeeLoader(false));
    } catch (err) {
      console.log("errrrror", err);
      const error = err.response?.data ?? err.toJSON().message;
      dispatch(addAttendeeAction({ data: error, status: "fail" }));
      dispatch(setAttendeeLoader(false));
    }
  };

export const getAttendeeAction =
  (payload, id) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      // dispatch(setLoader(true));
      const {
        data: { data },
      } = await httpApi.getAttendees(payload, id);
      console.log("data", data);
      dispatch(attendeeAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      console.log("exxxx", err);
      const error = err.response?.data ?? err.toJSON().message;
      dispatch(attendeeAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const removeAttendeeAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(removeAttendee({ data: payload, status: "success" }));
      await httpApi.removeAttendees(payload.id);
    } catch (err) {
      dispatch(removeAttendee({ data: payload, status: "fail" }));
    }
  };

export const postProxyAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setProxyLoader(true));
      console.log("action =>", payload);
      const {
        data: { data },
      } = await httpApi.addProxy(payload);
      dispatch(addProxy({ data, status: "success" }));
      dispatch(
        addProxyAction({
          data,
          status: "success",
          message: "Attendee created successfully",
        })
      );
      dispatch(setProxyLoader(false));
    } catch (err) {
      console.log(err);
      dispatch(setProxyLoader(false));
      const error = err.response?.data ?? err.toJSON().message;
      dispatch(addProxyAction({ data: error, status: "fail" }));
    }
  };

export const removeProxyAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(removeProxy({ data: payload, status: "success" }));
      await httpApi.removeProxy(payload.id, payload.event_id);
      dispatch(getProxyAction("", payload.event_id));
    } catch (err) {
      dispatch(removeProxy({ data: payload, status: "fail" }));
    }
  };

export const getProxyAction =
  (payload, id) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      //     dispatch(setLoader(true));
      const {
        data: { data },
      } = await httpApi.getProxies(payload, id);
      dispatch(proxyAction({ data, status: "success" }));
      dispatch(setLoader(true));
    } catch (err) {
      const error = err.response?.data ?? err.toJSON().message;
      dispatch(proxyAction({ data: error, status: "fail" }));
      //   dispatch(setLoader(true));
    }
  };
