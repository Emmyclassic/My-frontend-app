import axios from "../utils/axios";
import {
  REGISTER_URL,
  LOGIN_URL,
  RESET_PASSWORD_URL,
  LOGOUT_URL,
  FORGOT_PASSWORD_URL,
} from "../constants";

export const registerUser = (payload) => {
  return axios.post(REGISTER_URL, payload, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
};
export const resetPasswordHandler = (payload) => {
  return axios.post(RESET_PASSWORD_URL, payload);
};

export const logoutHandler = (payload) => axios.post(LOGOUT_URL);

export const forgotPasswordHandler = (payload) => {
  return axios.post(FORGOT_PASSWORD_URL, payload);
};
export const login = (payload) => {
  return axios.post(
    LOGIN_URL,
    payload,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
    //   {
    //   auth: {
    //     username: process.env.REACT_APP_CLIENT_ID,
    //     password: process.env.REACT_APP_CLIENT_SECRET,
    //   },
    // }
  );
};
