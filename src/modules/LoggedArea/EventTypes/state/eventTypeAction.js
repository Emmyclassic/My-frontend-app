// Event Type actions
export const GET_EVENT_TYPE_SUCCESS = `GET_EVENT_TYPE_SUCCESS`;
export const GET_EVENT_TYPE_FAILURE = `GET_EVENT_TYPE_FAILURE`;

export const evenTypeAction = ({ data, status }) => ({
  type: status === "success" ? GET_EVENT_TYPE_SUCCESS : GET_EVENT_TYPE_FAILURE,
  payload: {
    data,
    status,
  },
});
