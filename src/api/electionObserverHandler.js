import { CREATE_OBSERVER_URL } from "../constants";

import axios, { globalStorage } from "../utils/axios";
import { httpConfig } from "../utils/httpConfig";

export const createNewObserver = (data, id) => {
  console.log(data, "api data");
  return axios.post(`${CREATE_OBSERVER_URL}/${id}/observers`, data, {
    headers: {
      Authorization: `Bearer ${globalStorage.getStore("data")}`,
      "Content-Type": "application/json",
    },
  });
};
export const getAllObserver = (_, eventId) => {
  return axios.get(`${CREATE_OBSERVER_URL}/${eventId}/observers`, {
    headers: {
      Authorization: `Bearer ${globalStorage.getStore("data")}`,
      "Content-Type": "application/json",
    },
  });
};
export const updateObserver = (data, id, observerId) => {
  const { name, email, phone, organization } = data;
  const body = { name, email, phone, organization };

  return axios.patch(
    `${CREATE_OBSERVER_URL}/${id}/observers/${observerId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${globalStorage.getStore("data")}`,
        "Content-Type": "application/json",
      },
    }
  );
};
export const downloadList = (id) => {
  return axios.get(`${CREATE_OBSERVER_URL}/${id}/observers/download-excel`, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${globalStorage.getStore("data")}`,
      "Content-Type": "application/json",
    },
  });
};
export const searchObserver = (data, id) => {
  return axios.get(`${CREATE_OBSERVER_URL}/${id}/observers?search=${data}`, {
    headers: {
      Authorization: `Bearer ${globalStorage.getStore("data")}`,
      "Content-Type": "application/json",
    },
  });
};
export const observerNotification = (ids, eventId) => {
  return axios.post(
    `${CREATE_OBSERVER_URL}/${eventId}/observers/notifications`,
    ids,
    httpConfig()
  );
};
export const deleteObserver = (ids, eventId) => {
  return axios.delete(`${CREATE_OBSERVER_URL}/${eventId}/observers`, {
    ...httpConfig(),
    data: ids,
    // ...httpConfig(),
  });
};
// export const bulkDelete = (ids, eventId) => {
//   return axios.delete(`${CREATE_OBSERVER_URL}/${eventId}/observers`, {
//     ...httpConfig(),
//     data: ids,
//     // ...httpConfig(),
//   });
// };
export const bulkUpload = (data, eventId) => {
  return axios.post(
    `${CREATE_OBSERVER_URL}/${eventId}/observers/import-observers`,
    data,
    httpConfig()
  );
};

export const observerAuth = (data) => {
  console.log(data, "api data log");
  return axios.post(
    `${CREATE_OBSERVER_URL}/elections-center/login`,
    data,
    httpConfig()
  );
};

export const hostElectionDataFetch = (eventId) => {
  return axios.get(
    `${CREATE_OBSERVER_URL}/elections-center/${eventId}`,
    httpConfig()
  );
};

export const observerElectionDataFetch = (token, eventId) => {
  return axios.get(`${CREATE_OBSERVER_URL}/elections-center/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const downloadReport = (id) => {
  return axios.get(
    `${CREATE_OBSERVER_URL}/elections-center/${id}/download-pdf`,
    {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${globalStorage.getStore("data")}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const electionDataFetch = (id) => {
  return axios.get(
    `${CREATE_OBSERVER_URL}/elections-center/${id}/analytics`,
    httpConfig()
  );
};
