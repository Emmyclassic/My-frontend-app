import { EVENTS_URL, ATTENDEE_URL, PROXY_URL } from "../constants";
import axios from "../utils/axios";
import { httpConfig } from "../utils/httpConfig";

export const createListHandler = (eventId, payload) =>
  axios.post(
    `${ATTENDEE_URL}/${eventId}`,
    JSON.stringify(payload),

    httpConfig()
  );

export const addAttendeeToListHandler = (listId, payload) =>
  axios.post(
    `${ATTENDEE_URL}/${listId}/sync`,
    JSON.stringify(payload),
    httpConfig()
  );

export const getSelectedListHandler = (listId) =>
  axios.get(`${ATTENDEE_URL}/${listId}/members`, httpConfig());

export const getListHandler = (eventId) =>
  axios.get(
    `${ATTENDEE_URL}/${eventId}`,

    httpConfig()
  );

export const addAttendee = (payload) => {
  let currentEventId = JSON.parse(localStorage.getItem("currentEvent"))?.id;
  if (payload.eventId) {
    currentEventId = payload.eventId;
    delete payload.eventId;
  }
  return axios.post(
    `${EVENTS_URL}/${currentEventId}/attendees`,
    JSON.stringify(payload),
    httpConfig()
  );
};
export const getAttendees = (phrase, id, channel = "") => {
  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));

  if (!id) {
    id = currentEvent?.id;
  }
  console.log("eveenId", id);
  return axios.get(
    `${EVENTS_URL}/${id}/attendees?search=${phrase}&channel=${channel}`,
    httpConfig()
  );
};

export const removeAttendees = (id) => {
  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
  return axios.delete(
    `${EVENTS_URL}/${currentEvent.id}/attendees/${id}`,
    httpConfig()
  );
};

export const addProxy = (payload) => {
  console.log("pat", payload);
  let currentEventId = JSON.parse(localStorage.getItem("currentEvent"))?.id;
  if (payload.eventId) {
    currentEventId = payload.eventId;
    //  delete payload.eventId;
  }

  return axios.post(
    `${EVENTS_URL}/${currentEventId}/proxy_attendees`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const updateProxy = (payload, proxyId) => {
  console.log("pat", payload);
  let currentEventId = JSON.parse(localStorage.getItem("currentEvent"))?.id;
  if (payload.eventId) {
    currentEventId = payload.eventId;
    //  delete payload.eventId;
  }

  return axios.patch(
    `${EVENTS_URL}/${currentEventId}/proxy_attendees/${proxyId}`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const proxyTemplateHandler = (payload, eventId) => {
  let currentEventId = JSON.parse(localStorage.getItem("currentEvent")).id;
  if (eventId) {
    currentEventId = eventId;
  }

  return axios.post(
    `${PROXY_URL}/form/${currentEventId}`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const getProxyTemplateHandler = (eventId) => {
  return axios.get(`${PROXY_URL}/form/${eventId}`, null, httpConfig());
};

export const removeProxy = (id, eventId) => {
  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
  if (!eventId) {
    eventId = currentEvent.id;
  }

  return axios.delete(
    `${EVENTS_URL}/${eventId}/proxy_attendees/${id}`,
    httpConfig()
  );
};
export const bulkRemoveProxyHandler = (ids, eventId) => {
  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
  if (!eventId) {
    eventId = currentEvent.id;
  }

  return axios.delete(
    `${EVENTS_URL}/${eventId}/proxy_attendees/delete`,
    ids,
    httpConfig()
  );
};

export const bulkRemoveAttendeeHandler = (ids, eventId) => {
  console.log(ids);
  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
  if (!eventId) {
    eventId = currentEvent.id;
  }

  return axios.delete(`${EVENTS_URL}/${eventId}/attendees/delete`, {
    ...httpConfig(),
    data: ids,
  });
};
export const getProxies = (phrase, id) => {
  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));

  if (!id) {
    id = currentEvent.id;
  }

  return axios.get(
    `${EVENTS_URL}/${id}/proxy_attendees?search=${phrase}`,
    httpConfig()
  );
};
