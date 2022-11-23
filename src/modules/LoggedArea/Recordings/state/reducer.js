import {
  GET_BANK_ACCOUNT_FAILURE,
  GET_BANK_ACCOUNT_LOADING,
  GET_BANK_ACCOUNT_SUCCESS,
  GET_BANK_LIST_FAILURE,
  GET_BANK_LIST_LOADING,
  GET_BANK_LIST_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_SOCIAL_FAILURE,
  GET_SOCIAL_LOADING,
  GET_SOCIAL_SUCCESS,
  GET_STATE_LIST_FAILURE,
  GET_STATE_LIST_LOADING,
  GET_STATE_LIST_SUCCESS,
} from "./profileAction";

const initState = {
  bankList: null,
  status: null,
};

const stateInit = {
  stateList: [],
  status: null,
};

const socialInit = {
  facebook_url: "",
  twitter_url: "",
  linkedin_url: "",
  status: null,
};

const bankAccountInit = {
  bankAccount: null,
  bankId: null,
  userBankName: null,
  userBvn: null,
  status: null,
};

const profileInit = {
  userProfile: [],
  city: "",
  country_id: "",
  date_of_birth: "",
  email: "",
  email_verified_at: "",
  gender: "",
  id: "",
  name: "",
  phone_number: "",
  postal_code: "",
  profile_picture_path: "",
  state_id: "",
  street_address: "",
  user_type: "",
  status: null,
};

export const stateReducer = (state = stateInit, action) => {
  const { payload } = action;
  switch (action.type) {
    case GET_STATE_LIST_LOADING:
      return {
        ...state,
        // loading: true,
      };
    case GET_STATE_LIST_SUCCESS:
      return {
        ...state,
        stateList: payload,
        status: action.payload.status,
      };
    case GET_STATE_LIST_FAILURE:
      return {
        ...state,
        stateList: payload,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export const bankReducer = (state = initState, action) => {
  const { payload } = action;
  switch (action.type) {
    case GET_BANK_LIST_LOADING:
      return {
        ...state,
        // loading: payload,
      };
    case GET_BANK_LIST_SUCCESS:
      return {
        ...state,
        bankList: payload,
        status: action.payload.status,
      };
    case GET_BANK_LIST_FAILURE:
      return {
        ...state,
        bankList: payload,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export const socialReducer = (state = socialInit, action) => {
  const { payload } = action;
  switch (action.type) {
    case GET_SOCIAL_LOADING:
      return {
        ...state,
        // loading: payload,
      };
    case GET_SOCIAL_SUCCESS:
      console.log({ state });
      return {
        ...state,
        ...payload.data.data,
        status: action.payload.status,
      };
    case GET_SOCIAL_FAILURE:
      return {
        ...state,
        ...payload.data.data,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export const profileReducer = (state = profileInit, action) => {
  const { payload } = action;
  switch (action.type) {
    case GET_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        ...payload.data.data,
        userProfile: payload.data,
        status: action.payload.status,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        userProfile: payload.data,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export const bankAccountReducer = (state = bankAccountInit, action) => {
  const { payload } = action;
  console.log({ as: "Message >>>>>>", payload });
  switch (action.type) {
    case GET_BANK_ACCOUNT_LOADING:
      return {
        ...state,
        loading: "loading",
      };
    case GET_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        bankAccount: payload?.data?.data.account_number,
        bankId: payload?.data?.data.bank_id,
        userBankName: payload?.data?.data.bank.name,
        userBvn: payload?.data?.data.bvn,
      };
    case GET_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        bankAccount: null,
        bankId: null,
        userBankName: null,
        userBvn: null,
      };
    default:
      return state;
  }
};
