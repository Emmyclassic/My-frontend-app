import {
  ELECTION_URL,
  POLL_URL,
  PROXY_VOTE_URL,
  QUESTIONAIIRE_URL,
  RESOLUTIONS_URL,
  VOTE_RESULT_URL,
  VOTES_BASE_URL,
} from "../constants";
import axios, { globalStorage } from "../utils/axios";
import { httpConfig } from "../utils/httpConfig";

export const resolutionHandler = (payload) => {
  return axios.post(
    `${RESOLUTIONS_URL}`,
    JSON.stringify(payload),
    httpConfig()
  );
};
export const updateResolutionHandler = (payload, resolutionId) => {
  return axios.patch(
    `${RESOLUTIONS_URL}/${resolutionId}`,
    JSON.stringify(payload),
    httpConfig()
  );
};
export const removeResolutionHandler = (resolutionId) => {
  return axios.delete(`${RESOLUTIONS_URL}/${resolutionId}`, httpConfig());
};

export const getResolutionsHandler = (eventId) => {
  if (!eventId) {
    eventId = localStorage.getItem("currentEvent").id;
  }

  return axios.get(`${RESOLUTIONS_URL}/${eventId}`, httpConfig());
};

export const electionHandler = (payload) => {
  return axios.post(`${ELECTION_URL}`, JSON.stringify(payload), httpConfig());
};

export const getElectionAnalytic = (id) => {
  return axios.get(`${ELECTION_URL}/analytics/${id}`, httpConfig());
};

export const getElectionAnalyticPdf = (id) => {
  const token = globalStorage.getStore("data");
  return axios.get(`${ELECTION_URL}/download-pdf/${id}`, {
    responseType: "blob",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getElectionAnalyticExcel = (id) => {
  const token = globalStorage.getStore("data");
  return axios.get(`${ELECTION_URL}/download-excel/${id}`, {
    responseType: "blob",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateElectionHandler = (payload, electionId) => {
  return axios.patch(
    `${ELECTION_URL}/${electionId}`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const getElectionsHandler = (eventId) => {
  if (!eventId) {
    eventId = localStorage.getItem("currentEvent").id;
  }

  return axios.get(`${ELECTION_URL}/${eventId}`, httpConfig());
};

export const removeElectionHandler = (electionId) => {
  return axios.delete(`${ELECTION_URL}/${electionId}`, httpConfig());
};
export const questionaireHandler = (payload) => {
  return axios.post(
    `${QUESTIONAIIRE_URL}`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const updateQuestionaiireHandler = (payload, questionId) => {
  return axios.patch(
    `${QUESTIONAIIRE_URL}/${questionId}`,
    JSON.stringify(payload),
    httpConfig()
  );
};
export const removeQuestionHandler = (questionaaireId) => {
  return axios.delete(`${QUESTIONAIIRE_URL}/${questionaaireId}`, httpConfig());
};
export const getQuestionaaireHandler = (eventId) => {
  if (!eventId) {
    eventId = localStorage.getItem("currentEvent").id;
  }

  return axios.get(`${QUESTIONAIIRE_URL}/${eventId}`, httpConfig());
};
export const pollHandler = (payload) => {
  return axios.post(`${POLL_URL}`, JSON.stringify(payload), httpConfig());
};
export const getPollHandler = (eventId) => {
  if (!eventId) {
    eventId = localStorage.getItem("currentEvent").id;
  }

  return axios.get(`${POLL_URL}/${eventId}`, httpConfig());
};

export const updatePollHandler = (payload, pollId) => {
  return axios.patch(
    `${POLL_URL}/${pollId}`,
    JSON.stringify(payload),
    httpConfig()
  );
};
export const removePollHandler = (pollId) => {
  return axios.delete(`${POLL_URL}/${pollId}`, httpConfig());
};

export const pollVoteHandler = (payload) => {
  return axios.post(
    `${PROXY_VOTE_URL}/online-vote`,
    JSON.stringify(payload),
    httpConfig()
  );
};
export const publishResultHandler = (payload) => {
  return axios.post(
    `${VOTE_RESULT_URL}/publish`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const collateResultHandler = (payload) => {
  return axios.post(
    `${VOTE_RESULT_URL}/collate`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const addStatutoryVote = (payload, resolutionId) => {
  return axios.post(
    `${VOTES_BASE_URL}/votes/statutory-vote/${resolutionId}`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const getStatutoryVote = (resolutionId) => {
  return axios.get(
    `${VOTES_BASE_URL}/votes/statutory-vote/${resolutionId}`,
    null,
    httpConfig()
  );
};

export const updateStatutoryVote = (payload, resolutionId) => {
  return axios.patch(
    `${VOTES_BASE_URL}/votes/statutory-vote/${resolutionId}`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const updateVoteStatus = (resolutionId, payload) => {
  return axios.patch(
    `${RESOLUTIONS_URL}/${resolutionId}/status`,
    JSON.stringify(payload),
    httpConfig()
  );
};
export const pollAnalytics = (eventId) => {
  return axios.get(`${POLL_URL}/analytics/${eventId}`, httpConfig());
};
