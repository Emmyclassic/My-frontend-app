import { CREATE_CAMPAIGN_URL } from "../constants";
import axios from "../utils/axios";
import { httpConfig } from "../utils/httpConfig";

export const createEmailCampaign = (eventId, payload) => {
  return axios.post(
    `${CREATE_CAMPAIGN_URL}/${eventId}`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const addEmailContent = (campaignId, payload) => {
  return axios.patch(
    `${CREATE_CAMPAIGN_URL}/${campaignId}/add_content`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const sendTestEmail = (campaignId, payload) => {
  return axios.patch(
    `${CREATE_CAMPAIGN_URL}/${campaignId}/send_test`,
    JSON.stringify(payload),
    httpConfig()
  );
};

export const sendMarketingEmail = (campaignId, payload) => {
  return axios.patch(
    `${CREATE_CAMPAIGN_URL}/${campaignId}/send`,
    JSON.stringify(payload),
    httpConfig()
  );
};
