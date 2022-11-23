import { setLoader } from "../../../../actions/uiAction";
import {
  stateListtAction,
  stateListLoader,
  bankListtAction,
  bankListLoader,
  getSocialAction,
  getSocialLoader,
  profileAction,
  // profileLoader,
  verifyBankAccountLoader,
  verifyBankAccountAction,
  fetchBankAccountAction,
  fetchBankAccountLoader,
  updateProfile,
  updateProfileLoader,
} from "./profileAction";

export const getStatesAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(stateListLoader(true));
      const { data } = await httpApi.getStates(payload);
      const selectableData = [...data.data].reduce((acc, item) => {
        // console.log({ item });
        acc.push({
          ...item,
          value: item.id,
          label: item.name,
        });
        return acc;
      }, []);
      dispatch(stateListtAction({ data: selectableData, status: "success" }));
      dispatch(stateListLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(stateListtAction({ data: error, status: "fail" }));
      dispatch(stateListLoader(false));
    }
  };

export const getBanksAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(bankListLoader(true));
      const { data } = await httpApi.getBanks(payload);
      const selectableData = [...data.data].reduce((acc, item) => {
        acc.push({
          ...item,
          value: item.name,
          label: item.name,
        });
        return acc;
      }, []);
      dispatch(bankListtAction({ data: selectableData, status: "success" }));
      dispatch(bankListLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(bankListtAction({ data: error, status: "fail" }));
      dispatch(bankListLoader(false));
    }
  };

export const getBankAccountAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(fetchBankAccountLoader(true));
      const { data } = await httpApi.getBankAccount(payload);
      dispatch(fetchBankAccountAction({ data, status: "success" }));
      dispatch(fetchBankAccountLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(fetchBankAccountAction({ data: error, status: "fail" }));
      dispatch(fetchBankAccountLoader(false));
    }
  };

export const getSocialHandleAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(getSocialLoader(true));
      const { data } = await httpApi.fetchSocialHandles(payload);
      dispatch(getSocialAction({ data, status: "success" }));
      dispatch(getSocialLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(getSocialAction({ data: error, status: "fail" }));
      dispatch(getSocialLoader(false));
    }
  };

export const getProfileAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      // dispatch(profileLoader(true));
      dispatch(setLoader(true));
      const { data } = await httpApi.fetchProfile(payload);
      dispatch(profileAction({ data, status: "success" }));
      // dispatch(profileLoader(false));
      dispatch(setLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(profileAction({ data: error, status: "fail" }));
      // dispatch(profileLoader(false));
      dispatch(setLoader(false));
    }
  };

export const getVerifyBankAccountAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(verifyBankAccountLoader(true));
      const { data } = await httpApi.verifyBankAccount(payload);
      dispatch(verifyBankAccountAction({ data, status: "success" }));
      dispatch(verifyBankAccountLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(verifyBankAccountAction({ data: error, status: "fail" }));
      dispatch(verifyBankAccountLoader(false));
    }
  };

export const updateProfileAction =
  (payload, id) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(updateProfileLoader(true));
      const { data } = await httpApi.updateProfile(payload, id);
      dispatch(updateProfile({ data, status: "success" }));
      dispatch(updateProfileLoader(false));
    } catch (err) {
      const error = err.response?.data;
      dispatch(updateProfile({ data: error, status: "fail" }));
      dispatch(updateProfileLoader(false));
    }
  };
