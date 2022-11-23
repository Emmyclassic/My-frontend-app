import {
  ADD_ATTENDEE,
  ADD_ATTENDEE_RESET,
  CREATE_ATTENDEE_FAILURE,
  CREATE_ATTENDEE_SUCCESS,
  GET_ATTENDEES_FAILURE,
  GET_ATTENDEES_SUCCESS,
  REMOVE_ATTENDEES_FAILURE,
  REMOVE_ATTENDEES_SUCCESS,
  SET_ATTENDEE_LOADER,
} from "./attendeeAction";

export const addAttendeeReducer = (state = { loading: false }, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_ATTENDEE_LOADER:
      return {
        ...state,
        loading: payload,
      };
    case CREATE_ATTENDEE_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
      };
    case CREATE_ATTENDEE_FAILURE:
      return {
        ...state,
        loading: false,
        ...payload,
      };
    case ADD_ATTENDEE_RESET:
      return {};
    default:
      return state;
  }
};

const initState = { status: false, attendees: [] };
export const attendeeReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ATTENDEES_SUCCESS:
      return {
        status: action.payload.status,
        attendees: action.payload.data,
      };
    case GET_ATTENDEES_FAILURE:
      return {
        status: action.payload.status,
        attendees: [],
        error: action.payload,
      };
    case ADD_ATTENDEE:
      return {
        status: action.payload.status,
        attendees: state.attendees.concat(action.payload.data),
      };
    case REMOVE_ATTENDEES_SUCCESS:
      return {
        status: action.payload.status,
        attendees: state.attendees.filter(
          (item) => item.id !== action.payload.data.id
        ),
      };
    case REMOVE_ATTENDEES_FAILURE:
      return {
        status: action.payload.status,
        attendees: state.attendees.concat(action.payload.data),
      };
    default:
      return state;
  }
};
