export const GET_BANK_LIST_SUCCESS = `GET_BANK_LIST_SUCCESS`;
export const GET_BANK_LIST_FAILURE = `GET_BANK_LIST_FAILURE`;
export const GET_BANK_LIST_LOADING = `GET_BANK_LIST_LOADING`;

export const GET_STATE_LIST_SUCCESS = `GET_STATE_LIST_SUCCESS`;
export const GET_STATE_LIST_FAILURE = `GET_STATE_LIST_FAILURE`;
export const GET_STATE_LIST_LOADING = `GET_STATE_LIST_LOADING`;

export const GET_SOCIAL_SUCCESS = `GET_SOCIAL_SUCCESS`;
export const GET_SOCIAL_FAILURE = `GET_SOCIAL_FAILURE`;
export const GET_SOCIAL_LOADING = `GET_SOCIAL_LOADING`;

export const GET_PROFILE_SUCCESS = `GET_PROFILE_SUCCESS`;
export const GET_PROFILE_FAILURE = `GET_PROFILE_FAILURE`;
export const GET_PROFILE_LOADING = `GET_PROFILE_LOADING`;

export const UPDATE_PROFILE_SUCCESS = `UPDATE_PROFILE_SUCCESS`;
export const UPDATE_PROFILE_FAILURE = `UPDATE_PROFILE_FAILURE`;
export const UPDATE_PROFILE_LOADING = `UPDATE_PROFILE_LOADING`;

export const VERIFY_BANK_ACCOUNT_SUCCESS = `VERIFY_BANK_ACCOUNT_SUCCESS`;
export const VERIFY_BANK_ACCOUNT_FAILURE = `VERIFY_BANK_ACCOUNT_FAILURE`;
export const VERIFY_BANK_ACCOUNT_LOADING = `VERIFY_BANK_ACCOUNT_LOADING`;

export const GET_BANK_ACCOUNT_SUCCESS = `GET_BANK_ACCOUNT_SUCCESS`;
export const GET_BANK_ACCOUNT_FAILURE = `GET_BANK_ACCOUNT_FAILURE`;
export const GET_BANK_ACCOUNT_LOADING = `GET_BANK_ACCOUNT_LOADING`;

export const fetchBankAccountAction = ({ data, status }) => ({
  type:
    status === "success" ? GET_BANK_ACCOUNT_SUCCESS : GET_BANK_ACCOUNT_FAILURE,
  payload: {
    data,
    status,
  },
});

export const fetchBankAccountLoader = (status) => ({
  type: GET_BANK_ACCOUNT_LOADING,
  payload: status,
});

export const verifyBankAccountAction = ({ data, status }) => ({
  type:
    status === "success"
      ? VERIFY_BANK_ACCOUNT_SUCCESS
      : VERIFY_BANK_ACCOUNT_FAILURE,
  payload: {
    data,
    status,
  },
});

export const verifyBankAccountLoader = (status) => ({
  type: VERIFY_BANK_ACCOUNT_LOADING,
  payload: status,
});

export const stateListtAction = ({ data, status }) => ({
  type: status === "success" ? GET_STATE_LIST_SUCCESS : GET_STATE_LIST_FAILURE,
  payload: {
    data,
    status,
  },
});

export const stateListLoader = (status) => ({
  type: GET_STATE_LIST_LOADING,
  payload: status,
});

export const profileAction = ({ data, status }) => ({
  type: status === "success" ? GET_PROFILE_SUCCESS : GET_PROFILE_FAILURE,
  payload: {
    data,
    status,
  },
});

export const profileLoader = (status) => ({
  type: GET_PROFILE_LOADING,
  payload: status,
});

export const updateProfile = ({ data, status }) => ({
  type: status === "success" ? UPDATE_PROFILE_SUCCESS : UPDATE_PROFILE_FAILURE,
  payload: {
    data,
    status,
  },
});

export const updateProfileLoader = (status) => ({
  type: UPDATE_PROFILE_LOADING,
  payload: status,
});

export const bankListtAction = ({ data, status }) => ({
  type: status === "success" ? GET_BANK_LIST_SUCCESS : GET_BANK_LIST_FAILURE,
  payload: {
    data,
    status,
  },
});

export const bankListLoader = (status) => ({
  type: GET_BANK_LIST_LOADING,
  payload: status,
});

export const getSocialAction = ({ data, status }) => ({
  type: status === "success" ? GET_SOCIAL_SUCCESS : GET_SOCIAL_FAILURE,
  payload: {
    data,
    status,
  },
});

export const getSocialLoader = (status) => ({
  type: GET_SOCIAL_LOADING,
  payload: status,
});
