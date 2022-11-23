import {
  BROWSE_EVENTS_URL,
  CREATE_EVENT_URL,
  DONATION_URL,
  EVENTS_URL,
  EVENTYPE_URL,
  LIVESTREAM_URL,
  MEETING_URL,
  UPLOAD_FILE_URL,
} from "../constants";
import axios, { globalStorage } from "../utils/axios";
import { httpConfig } from "../utils/httpConfig";
import { generateFormData } from "./helpers";

export function updateQueryStringParameter(uri, key, value) {
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}

export const getEventTypes = () => {
  return axios.get(EVENTYPE_URL, httpConfig());
};
export const getEvents = (query) => {
  Object.keys(query).forEach((key) => {
    if (!query[key]) {
      delete query[key];
    }
  });

  const filteredQuery = query;
  let queryString = "";
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

  return axios.get(`${EVENTS_URL}${queryString}`, httpConfig());
};

export const browseEvents = (query) => {
  Object.keys(query).forEach((key) => {
    if (!query[key]) {
      delete query[key];
    }
  });

  const filteredQuery = query;
  let queryString = "";
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

  return axios.get(`${BROWSE_EVENTS_URL}${queryString}`, httpConfig());
};

export const createEvent = (payload) => {
  return axios.post(CREATE_EVENT_URL, generateFormData(payload), {
    headers: {
      Authorization: `Bearer ${globalStorage.getStore("data")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadProxy = (payload, eventId) => {
  return axios.post(
    `${CREATE_EVENT_URL}/${eventId}/import_proxy_attendees`,
    generateFormData(payload),
    {
      headers: {
        Authorization: `Bearer ${globalStorage.getStore("data")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const validateEvent = (code) => {
  return axios.get(`${MEETING_URL}/event/validate_code/${code}`, httpConfig());
};

export const joinMeetingHandler = (eventId) => {
  return axios.get(`${MEETING_URL}/signature/${eventId}`, httpConfig());
};

export const meetingAuthHandler = (payload, eventId) => {
  return axios.post(
    `${MEETING_URL}/auth/${eventId}`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const uploadFile = (payload) => {
  return axios.post(UPLOAD_FILE_URL, generateFormData(payload), {
    headers: {
      Authorization: `Bearer ${globalStorage.getStore("data")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const fetchEvent = (id) => {
  return axios.get(`${CREATE_EVENT_URL}/${id}`, httpConfig());
};

export const fetchEventByCode = (code) => {
  return axios.get(`${CREATE_EVENT_URL}/code/${code}`, httpConfig());
};

export const publishEvent = (payload, id) => {
  return axios.patch(
    `${CREATE_EVENT_URL}/${id}/publish`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const fetchEventTicket = (id) => {
  return axios.get(`${CREATE_EVENT_URL}/${id}/tickets`, httpConfig());
};

export const browseEventDetail = (id) => {
  return axios.get(`${CREATE_EVENT_URL}/browse/${id}`, httpConfig());
};

export const eventAnalytics = (id) => {
  return axios.get(`${CREATE_EVENT_URL}/analytics/${id}`, httpConfig());
};

export const eventReport = (id) => {
  return axios.get(`${CREATE_EVENT_URL}/analytics/${id}`, httpConfig());
};

export const updateEvent = (payload, eventId) => {
  return axios.patch(
    `${CREATE_EVENT_URL}/${eventId}`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const removeDonationHandler = (donationId) => {
  return axios.delete(`${CREATE_EVENT_URL}/${donationId}`, httpConfig());
};
export const fetchDonation = (id) => {
  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
  if (!id) {
    id = currentEvent.id;
  }
  return axios.get(`${CREATE_EVENT_URL}/${id}/donations`, httpConfig());
};

export const createDonation = (payload, id) => {
  return axios.post(
    `${CREATE_EVENT_URL}/${id}/donations`,
    JSON.stringify(payload),
    httpConfig()
  );
};
export const updateDonation = (payload, eventId, donationId) => {
  return axios.patch(
    `${CREATE_EVENT_URL}/${eventId}/donations/${donationId}`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const eventNotification = (id) => {
  return axios.get(`${CREATE_EVENT_URL}/app_notifications/${id}`, httpConfig());
};

export const markNotification = (data) => {
  return axios.post(
    `${CREATE_EVENT_URL}/app_notifications/read`,
    data,
    httpConfig()
  );
};
export const getDonationById = (id, eventId) => {
  return axios.get(`${DONATION_URL}/${id}`, httpConfig());
};
export const fetchDonationPayment = (id) => {
  return axios.get(`${DONATION_URL}/${id}/payments`, httpConfig());
};

export const donationPayment = (payload, id) => {
  return axios.post(
    `${DONATION_URL}/${id}/initiate-payment`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const verifyDonation = (id, ref) => {
  return axios.get(`${DONATION_URL}/${id}/verify-payment/${ref}`, httpConfig());
};
export const livestreamHandler = (payload) => {
  return axios.post(`${LIVESTREAM_URL}`, JSON.stringify(payload), httpConfig());
};

export const getLivestreamHandler = (id) => {
  return axios.get(`${LIVESTREAM_URL}/${id}`, httpConfig());
};

export const getMeetingQuestions = (id) =>
  axios.get(
    `${MEETING_URL}/questions/${id}`,

    httpConfig()
  );

export const askQuestionHandler = (id, payload) =>
  axios.post(
    `${MEETING_URL}/questions/${id}`,
    JSON.stringify(payload),

    httpConfig()
  );

export const answerQuestionHandler = (id, payload) =>
  axios.patch(
    `${MEETING_URL}/questions/${id}/answer`,
    JSON.stringify(payload),

    httpConfig()
  );

export const upVoteQuestionHandler = (id, attendeeId) =>
  axios.post(
    `${MEETING_URL}/questions/${id}/upvote/${attendeeId}`,
    null,
    httpConfig()
  );
export const fetchQuestionLabel = (id) =>
  axios.get(`${MEETING_URL}/questions/${id}/label`, httpConfig());
export const createQuestionLabel = (id, payload) =>
  axios.post(
    `${MEETING_URL}/questions/${id}/label`,
    JSON.stringify(payload),
    httpConfig()
  );

export const attachQuestionToLabel = (labelId, questionId) =>
  axios.patch(
    `${MEETING_URL}/questions/${questionId}/attach-label/${labelId}`,
    null,
    httpConfig()
  );

export const getUpVoteCount = (questionId) =>
  axios.get(
    `${MEETING_URL}/questions/${questionId}/count-upvote`,
    null,
    httpConfig()
  );

export const getMeetingRecords = (userId) =>
  axios.get(
    `${MEETING_URL}/getrecordings/byuser/${userId}?page=1&page_size=50`,
    null,
    httpConfig()
  );

// export const getMeetingRecords = (id) =>
//   axios.get(`${MEETING_URL}/getrecording/${id}`, null, httpConfig());
