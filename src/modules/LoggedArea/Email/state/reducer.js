import {
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAILURE,
} from "./emailAction";

export const emailCampaignReducer = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case CREATE_CAMPAIGN_SUCCESS:
      return payload;
    case CREATE_CAMPAIGN_FAILURE:
      return payload;
    default:
      return state;
  }
};
