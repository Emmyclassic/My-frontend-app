import { setLoader } from "../../../../actions/uiAction";
import {
  createCampaignAction,
  addContentAction,
  sendTestEmailActionType,
  sendCampaignEmailActionType,
} from "./emailAction";

export const createCampaign =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const {
        data: { data },
      } = await httpApi.createEmailCampaign();
      // console.log({ dataFromAction: data });
      dispatch(createCampaignAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      // const response = err.response?.data?.data;
      // console.log("response", response);
      const error = err.response?.data ?? err.toJSON().message;
      // console.log("err", error);

      dispatch(createCampaignAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const addCampaignContent =
  (campaignId, payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const {
        data: { data },
      } = await httpApi.addEmailContent(campaignId, payload);
      dispatch(addContentAction({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      // const response = err.response?.data?.data;
      const error = err.response?.data ?? err.toJSON().message;

      dispatch(addContentAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const sendTestEmailAction =
  (campaignId, payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const {
        data: { data },
      } = await httpApi.sendTestEmail(campaignId, payload);
      dispatch(sendTestEmailActionType({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      // const response = err.response?.data?.data;
      const error = err.response?.data ?? err.toJSON().message;

      dispatch(sendTestEmailActionType({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };

export const sendCampaignEmailAction =
  (campaignId, payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const {
        data: { data },
      } = await httpApi.sendMarketingEmail(campaignId, payload);
      dispatch(sendCampaignEmailActionType({ data, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      // const response = err.response?.data?.data;
      const error = err.response?.data ?? err.toJSON().message;

      dispatch(sendCampaignEmailActionType({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };
