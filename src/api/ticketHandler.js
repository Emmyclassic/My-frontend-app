import {
  EVENTS_URL,
  EVENT_TICKET_TYPE_URL,
  EVENT_TICKET_URL,
  REQUEST_ACCOUNT_BALANCE,
} from "../constants";
import axios from "../utils/axios";
import { httpConfig } from "../utils/httpConfig";
import { updateQueryStringParameter } from "./eventHandler";

export const getEventTicket = (query) => {
  let queryString = "";
  if (query) {
    Object.keys(query).forEach((key) => {
      if (!query[key]) {
        delete query[key];
      }
    });

    const filteredQuery = query;

    const keys = Object.keys(filteredQuery);
    if (keys.length > 0) {
      keys.forEach((key) => {
        queryString = updateQueryStringParameter(
          queryString,
          key,
          filteredQuery[key]
        );
      });
    }
  }

  return axios.get(`${EVENT_TICKET_URL}${queryString}`, httpConfig());
};

export const createTicket = (payload) => {
  return axios.post(EVENT_TICKET_URL, JSON.stringify(payload), httpConfig());
};

export const fetchEventTickets = (id) => {
  return axios.get(`${EVENTS_URL}/${id}/tickets`, httpConfig());
};

export const fetchTicket = (id) => {
  return axios.get(`${EVENT_TICKET_URL}/${id}`, httpConfig());
};

export const fetchTicketSales = (id) => {
  return axios.get(`${EVENT_TICKET_URL}/${id}/sales`, httpConfig());
};

export const archiveTicket = (payload, id) => {
  return axios.patch(
    `${EVENT_TICKET_URL}/${id}/archive`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const purchaseTicket = (payload, ticketId) => {
  return axios.post(
    `${EVENT_TICKET_URL}/${ticketId}/purchase`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const verifyTicketPayment = (ref) => {
  return axios.get(`${EVENT_TICKET_URL}/verify-payment/${ref}`, httpConfig());
};

export const getTicketType = (payload) => {
  return axios.get(`${EVENT_TICKET_TYPE_URL}`, httpConfig());
};

export const getAccountBalance = () => {
  return axios.get(`${REQUEST_ACCOUNT_BALANCE}`, httpConfig());
};

export const updateTicket = (payload, id) => {
  return axios.patch(
    `${EVENT_TICKET_URL}/${id}`,
    JSON.stringify(payload),
    httpConfig()
  );
};
