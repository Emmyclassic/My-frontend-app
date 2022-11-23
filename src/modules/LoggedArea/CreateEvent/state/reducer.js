import {
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_RESET,
  CREATE_EVENT_SUCCESS,
  CREATING_EVENT,
} from "./eventAction";

export const createEventReducer = (state = { loading: false }, action) => {
  const { payload } = action;
  switch (action.type) {
    case CREATING_EVENT:
      return { loading: payload };
    case CREATE_EVENT_SUCCESS:
      return payload;
    case CREATE_EVENT_FAILURE:
      return payload;
    case CREATE_EVENT_RESET:
      return {};
    default:
      return state;
  }
};
