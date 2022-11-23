import { EVENTS_URL, PROXY_VOTE_URL, RESOURCE_URL } from "../constants";
import axios from "../utils/axios";
import { httpConfig } from "../utils/httpConfig";

export const createResource = (payload, id) => {
  if (!id) {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
    id = currentEvent.id;
  }

  return axios.post(
    `${EVENTS_URL}/${id}/resources`,
    JSON.stringify(payload),
    httpConfig()
  );
};
export const getResources = (filter, id) => {
  if (!id) {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
    id = currentEvent.id;
  }

  return axios.get(
    `${EVENTS_URL}/${id}/resources?filter=${filter}`,

    httpConfig()
  );
};

export const getMusics = (id) => {
  if (!id) {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
    id = currentEvent.id;
  }

  return axios.get(
    `${EVENTS_URL}/${id}/music`,

    httpConfig()
  );
};

export const createMusic = (id, payload) => {
  if (!id) {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
    id = currentEvent.id;
  }

  return axios.post(
    `${EVENTS_URL}/${id}/music`,
    JSON.stringify(payload),

    httpConfig()
  );
};
export const getSpeakers = (id) => {
  if (id) {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
    id = currentEvent.id;
  }

  return axios.get(
    `${EVENTS_URL}/${id}/entertainers`,

    httpConfig()
  );
};

export const playMusicOnline = (status, id) => {
  return axios.get(
    `${EVENTS_URL}/music/${id}/play?status=${status}`,
    httpConfig()
  );
};
export const setVideoPlay = (payload, resourceId) => {
  return axios.patch(
    `${RESOURCE_URL}/resource_file/${resourceId}/video_play`,
    JSON.stringify(payload),
    httpConfig()
  );
};
export const updateVisiblity = (payload, resourceId) => {
  return axios.patch(
    `${RESOURCE_URL}/resource_file/${resourceId}/visibility`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const createEntertainer = (payload) => {
  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
  return axios.post(
    `${EVENTS_URL}/${currentEvent.id}/entertainers`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const createVotes = (payload) => {
  return axios.post(
    `${PROXY_VOTE_URL}/proxy-vote`,
    JSON.stringify(payload),
    httpConfig()
  );
};
export const createOnlineVotes = (payload) => {
  return axios.post(
    `${PROXY_VOTE_URL}/online-vote`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const deleteResource = (resourceId) => {
  return axios.delete(`${RESOURCE_URL}/${resourceId}`, httpConfig());
};

export const deleteResoluteItem = (resourceId) => {
  return axios.delete(
    `${RESOURCE_URL}/resource_file/${resourceId}`,
    httpConfig()
  );
};
