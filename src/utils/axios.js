import axios from "axios";

export const token = JSON.parse(localStorage.getItem("data"));

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
// const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
axios.defaults.headers.common.Authorization = "Bearer " + token;
//   if (
//   localStorage.getItem("data") &&
//   JSON.parse(localStorage.getItem("data")).token
// ) {
//   axios.defaults.headers.common.client_id =
//     "93e64385-1a35-4fd7-a8f6-95733eed9690";
//   axios.defaults.headers.common.client_secret =
//     "yACzfO4IUxStrlb1H0VXqICrTSbLnlFyP8oklPtI";
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// } else {
//   delete axios.defaults.headers.common.Authorization;
// }

export const globalStorage = {
  store: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  getStore: (key) => JSON.parse(localStorage.getItem(key)),
};

export default axios;
