import {
  BANKS_BASE_URL,
  BANK_ACCOUNT_URL,
  CHANGE_PASSWORD_BASE_URL,
  CONFIRM_PASSWORD_URL,
  DELETE_ACCOUNT_URL,
  PROFILE_BASE_URL,
  REQUEST_OTP_URL,
  SOCIALS_URL,
  STATES_BASE_URL,
  UPDATE_PROFILE_BASE_URL,
  UPDATE_SOCIALS_URL,
  VERIFY_ACCOUNT_URL,
  VERIFY_OTP_URL,
} from "../constants";
import axios, { token } from "../utils/axios";
import { httpConfig } from "../utils/httpConfig";

export const fetchOTP = () => {
  return axios.post(`${REQUEST_OTP_URL}`, {}, httpConfig());
};

export const verifyOTP = (payload) => {
  return axios.post(`${VERIFY_OTP_URL}`, JSON.stringify(payload), httpConfig());
};

export const verifyPassword = (payload) => {
  return axios.post(
    `${CONFIRM_PASSWORD_URL}`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const deleteBankAccount = (payload) => {
  return axios.delete(`${DELETE_ACCOUNT_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: payload,
  });
};

export const getBankAccount = () => {
  return axios.get(`${BANK_ACCOUNT_URL}`, httpConfig());
};

export const getStates = () => {
  return axios.get(`${STATES_BASE_URL}`, httpConfig());
};

export const getBanks = () => {
  return axios.get(`${BANKS_BASE_URL}`, httpConfig());
};

export const fetchProfile = () => {
  return axios.get(`${PROFILE_BASE_URL}`, httpConfig());
};

export const updateProfile = (payload) => {
  return axios.patch(
    UPDATE_PROFILE_BASE_URL,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const verifyBankAccount = (payload) => {
  return axios.patch(VERIFY_ACCOUNT_URL, JSON.stringify(payload), httpConfig());
};

export const fetchSocialHandles = () => {
  return axios.get(`${SOCIALS_URL}`, httpConfig());
};

export const changePassword = (payload) => {
  return axios.patch(
    CHANGE_PASSWORD_BASE_URL,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const updateSocialHandles = (payload) => {
  return axios.patch(UPDATE_SOCIALS_URL, JSON.stringify(payload), httpConfig());
};
