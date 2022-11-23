import {
  GET_EVENT_TYPE_FAILURE,
  GET_EVENT_TYPE_SUCCESS,
} from "./eventTypeAction";

export const eventTypeReducer = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case GET_EVENT_TYPE_SUCCESS:
      return payload;
    case GET_EVENT_TYPE_FAILURE:
      return payload;
    default:
      return state;
  }
};
