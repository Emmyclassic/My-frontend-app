import {
  GET_CURRENT_EVENTS_FAILURE,
  GET_CURRENT_EVENTS_SUCCESS,
  GET_EVENT_FAILURE,
  GET_EVENT_SUCCESS,
  GET_PAST_EVENTS_FAILURE,
  GET_PAST_EVENTS_SUCCESS,
  GET_UPCOMING_EVENTS_FAILURE,
  GET_UPCOMING_EVENTS_SUCCESS,
} from "./browseEventAction";

const init = {
  upcomingEvent: [],
  currentEvent: [],
  pastEvent: [],
  eventDetail: null,
};
export const eventsReducer = (state = init, action) => {
  const { payload } = action;
  switch (action.type) {
    case GET_CURRENT_EVENTS_SUCCESS:
      return {
        ...state,
        currentEvent: payload,
      };
    case GET_CURRENT_EVENTS_FAILURE:
      return {
        ...state,
        currentEvent: payload,
      };
    case GET_UPCOMING_EVENTS_SUCCESS:
      return {
        ...state,
        upcomingEvent: payload,
      };
    case GET_UPCOMING_EVENTS_FAILURE:
      return {
        ...state,
        upcomingEvent: payload,
      };
    case GET_PAST_EVENTS_SUCCESS:
      return {
        ...state,
        pastEvent: payload,
      };
    case GET_PAST_EVENTS_FAILURE:
      return {
        ...state,
        pastEvent: payload,
      };
    case GET_EVENT_SUCCESS:
    case GET_EVENT_FAILURE:
      return {
        ...state,
        eventDetail: payload,
      };
    default:
      return state;
  }
};
