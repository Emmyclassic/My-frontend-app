import { MAKE_PAYMENT_URL } from "../constants";
import axios from "../utils/axios";
import { httpConfig } from "../utils/httpConfig";

export const makePayment = (eventId, payload) => {
  return axios.post(
    `${MAKE_PAYMENT_URL}/${eventId}`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const paymentAnalytic = (eventId) => {
  return axios.get(`${MAKE_PAYMENT_URL}/${eventId}/summary`, httpConfig());
};
