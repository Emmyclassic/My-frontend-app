export const CREATE_CAMPAIGN_SUCCESS = `CREATE_CAMPAIGN_SUCCESS`;
export const CREATE_CAMPAIGN_FAILURE = `CREATE_CAMPAIGN_FAILURE`;
export const ADD_CONTENT_SUCCESS = `ADD_CONTENT_SUCCESS`;
export const ADD_CONTENT_FAILURE = `ADD_CONTENT_FAILURE`;
export const SEND_TEST_EMAIL_SUCCESS = `SEND_TEST_EMAIL_SUCCESS`;
export const SEND_TEST_EMAIL_FAILURE = `SEND_TEST_EMAIL_FAILURE`;
export const SEND_CAMPAIGN_EMAIL_SUCCESS = `SEND_CAMPAIGN_EMAIL_SUCCESS`;
export const SEND_CAMPAIGN_EMAIL_FAILURE = `SEND_CAMPAIGN_EMAIL_FAILURE`;

export const createCampaignAction = ({ data, status }) => ({
  type:
    status === "success" ? CREATE_CAMPAIGN_SUCCESS : CREATE_CAMPAIGN_FAILURE,
  payload: {
    data,
    status,
  },
});

export const addContentAction = ({ data, status }) => ({
  type: status === "success" ? ADD_CONTENT_SUCCESS : ADD_CONTENT_FAILURE,
  payload: {
    data,
    status,
  },
});

export const sendTestEmailActionType = ({ data, status }) => ({
  type:
    status === "success" ? SEND_TEST_EMAIL_SUCCESS : SEND_TEST_EMAIL_FAILURE,
  payload: {
    data,
    status,
  },
});

export const sendCampaignEmailActionType = ({ data, status }) => ({
  type:
    status === "success"
      ? SEND_CAMPAIGN_EMAIL_SUCCESS
      : SEND_CAMPAIGN_EMAIL_FAILURE,
  payload: {
    data,
    status,
  },
});
