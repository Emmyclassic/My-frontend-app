// Create event actions
export const CREATE_ATTENDEE_SUCCESS = `CREATE_ATTENDEE_SUCCESS`;
export const CREATE_ATTENDEE_FAILURE = `CREATE_ATTENDEE_FAILURE`;
export const SET_ATTENDEE_LOADER = `SET_ATTENDEE_LOADER`;
export const ADD_ATTENDEE_RESET = "ADD_ATTENDEE_RESET";

export const GET_ATTENDEES_SUCCESS = "GET_ATTENDEES_SUCCESS";
export const GET_ATTENDEES_FAILURE = "GET_ATTENDEES_FAILURE";

export const REMOVE_ATTENDEES_SUCCESS = "REMOVE_ATTENDEES_SUCCESS";
export const REMOVE_ATTENDEES_FAILURE = "REMOVE_ATTENDEES_FAILURE";

export const ADD_ATTENDEE = `ADD_ATTENDEE`;

export const CREATE_PROXY_SUCCESS = "CREATE_PROXY_SUCCESS";
export const CREATE_PROXY_FAILURE = "CREATE_PROXY_FAILURE";
export const SET_PROXY_LOADER = `SET_PROXY_LOADER`;
export const ADD_PROXY = "ADD_PROXY";
export const ADD_PROXY_RESET = "ADD_PROXY_RESET";
export const GET_PROXY_FAILURE = "GET_PROXY_FAILURE";
export const GET_PROXY_SUCCESS = "GET_PROXY_SUCCESS";
export const REMOVE_PROXY_FAILURE = "REMOVE_PROXY_FAILURE";
export const REMOVE_PROXY_SUCCESS = "REMOVE_PROXY_SUCCESS";

// export const createTicketAction = ({ data, status, message }) => ({
//   type: status === "success" ? ADD_ATTENDEE_SUCCESS : ADD_ATTENDEE_FAILURE,
//   payload: {
//     data,
//     status,
//     message,
//   },
// });
export const addAttendeeAction = ({ data, status, message }) => ({
  type:
    status === "success" ? CREATE_ATTENDEE_SUCCESS : CREATE_ATTENDEE_FAILURE,
  payload: {
    data,
    status,
    message,
  },
});

export const resetAddAttendee = {
  type: ADD_ATTENDEE_RESET,
};

export const setAttendeeLoader = (status) => ({
  type: SET_ATTENDEE_LOADER,
  payload: status,
});

export const attendeeAction = ({ data, status }) => ({
  type: status === "success" ? GET_ATTENDEES_SUCCESS : GET_ATTENDEES_FAILURE,
  payload: {
    data,
    status,
  },
});
export const removeAttendee = ({ data, status }) => ({
  type:
    status === "success" ? REMOVE_ATTENDEES_SUCCESS : REMOVE_ATTENDEES_FAILURE,
  payload: {
    data,
    status,
  },
});

export const addAttendee = ({ data, status }) => ({
  type: ADD_ATTENDEE,
  payload: {
    data,
    status,
  },
});

export const addProxyAction = ({ data, status, message }) => ({
  type: status === "success" ? CREATE_PROXY_SUCCESS : CREATE_PROXY_FAILURE,
  payload: {
    data,
    status,
    message,
  },
});

export const resetAddProxy = {
  type: ADD_PROXY_RESET,
};

export const setProxyLoader = (status) => ({
  type: SET_PROXY_LOADER,
  payload: status,
});

export const proxyAction = ({ data, status }) => ({
  type: status === "success" ? GET_PROXY_SUCCESS : GET_PROXY_FAILURE,
  payload: {
    data,
    status,
  },
});
export const removeProxy = ({ data, status }) => ({
  type: status === "success" ? REMOVE_PROXY_SUCCESS : REMOVE_PROXY_FAILURE,
  payload: {
    data,
    status,
  },
});

export const addProxy = ({ data, status }) => ({
  type: ADD_PROXY,
  payload: {
    data,
    status,
  },
});
