import { setLoader } from "../../../../actions/uiAction";
import {
  pastEventsTicketAction,
  publishedEventsTicketAction,
  purchasedTicketAction,
  ticketAction,
  ticketTypeAction,
  ticketTypeLoader,
  editTicketAction,
  archiveTicketAction,
  ticketSalesAction,
  getAccountBalanceAction,
} from "./ticketAction";

export const getAccountBalance =
  () =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const { data } = await httpApi.getAccountBalance();

      dispatch(getAccountBalanceAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(getAccountBalanceAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const getTicketAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const { data } = await httpApi.fetchTicket(payload);

      dispatch(ticketAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(ticketAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const getTicketSalesAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const { data } = await httpApi.fetchTicketSales(payload);
      data.data.participants.reduce((acc, item) => {
        item.date = item.date.split(" ")[0];
        acc.push(item);
        return acc;
      }, []);
      dispatch(ticketSalesAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      console.log(err);
      const error = err.response?.data;
      dispatch(ticketSalesAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const getPublishedEventTicketAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const { data } = await httpApi.getEventTicket(payload);
      dispatch(publishedEventsTicketAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(publishedEventsTicketAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const getPastEventTicketAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const { data } = await httpApi.getEventTicket(payload);
      dispatch(pastEventsTicketAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(pastEventsTicketAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const getPurchasedTicketAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const { data } = await httpApi.getEventTicket(payload);
      dispatch(purchasedTicketAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(purchasedTicketAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const ticketArchiveAction =
  (payload, id) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const { data } = await httpApi.archiveTicket(payload, id);
      dispatch(archiveTicketAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(archiveTicketAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const updateTicketAction =
  (payload, id) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const { data } = await httpApi.updateTicket(payload, id);
      dispatch(editTicketAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(editTicketAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const getTicketTypeAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(ticketTypeLoader(true));
      const { data } = await httpApi.getTicketType(payload);
      dispatch(ticketTypeAction({ data, status: "success" }));
      dispatch(ticketTypeLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(ticketTypeAction({ data: error, status: "fail" }));
      dispatch(ticketTypeLoader(false));
    }
  };
