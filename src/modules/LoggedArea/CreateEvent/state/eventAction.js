// Create event actions
export const CREATE_EVENT_SUCCESS = `CREATE_EVENT_SUCCESS`;
export const CREATE_EVENT_FAILURE = `CREATE_EVENT_FAILURE`;
export const CREATING_EVENT = `CREATING_EVENT`;
export const CREATE_EVENT_RESET = "CREATE_EVENT_RESET";

export const createEventAction = ({ data, status, message }) => ({
  type: status === "success" ? CREATE_EVENT_SUCCESS : CREATE_EVENT_FAILURE,
  payload: {
    data,
    status,
    message,
  },
});
export const createEventLoader = (status) => ({
  type: CREATING_EVENT,
  payload: status,
});

export const resetCreateEvent = {
  type: CREATE_EVENT_RESET,
};
