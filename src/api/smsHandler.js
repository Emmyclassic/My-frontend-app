import {
  BULK_SMS_URL,
  SINGLE_SMS_URL,
  MARKETING_BASE_URL,
  NOTIFCATION_BASE_URL,
} from "../constants";
import axios from "../utils/axios";
import { httpConfig } from "../utils/httpConfig";

export const sendBulkSMS = (payload) => {
  return axios.post(BULK_SMS_URL, JSON.stringify(payload), httpConfig());
};

export const sendSingleSMS = (payload) => {
  return axios.post(SINGLE_SMS_URL, JSON.stringify(payload), httpConfig());
};

export const smsInvite = (eventId) => {
  return axios.post(
    `${NOTIFCATION_BASE_URL}/sms/invite-sms/${eventId}`,
    null,
    httpConfig()
  );
};

export const emailReport = (campaignId = "38387cfdf8") => {
  return axios.get(
    `${MARKETING_BASE_URL}/reports/${campaignId}`,
    null,
    httpConfig()
  );
};

export const sendEmailInviteToAttendee = (eventId, data) => {
  return axios.post(
    `${MARKETING_BASE_URL}/send-default/${eventId}`,
    data,
    httpConfig()
  );
};

export const contactUsHandler = (payload) => {
  return axios.post(
    `${NOTIFCATION_BASE_URL}/emails/contact`,
    payload,
    httpConfig()
  );
};
