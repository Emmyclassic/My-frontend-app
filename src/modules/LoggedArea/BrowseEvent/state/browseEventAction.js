// Event Type actions
export const GET_CURRENT_EVENTS_SUCCESS = `GET_CURRENT_EVENTS_SUCCESS`;
export const GET_CURRENT_EVENTS_FAILURE = `GET_CURRENT_EVENTS_FAILURE`;

export const GET_UPCOMING_EVENTS_SUCCESS = `GET_UPCOMING_EVENTS_SUCCESS`;
export const GET_UPCOMING_EVENTS_FAILURE = `GET_UPCOMING_EVENTS_FAILURE`;

export const GET_PAST_EVENTS_SUCCESS = `GET_PAST_EVENTS_SUCCESS`;
export const GET_PAST_EVENTS_FAILURE = `GET_PAST_EVENTS_FAILURE`;

export const GET_EVENT_SUCCESS = `GET_EVENT_SUCCESS`;
export const GET_EVENT_FAILURE = `GET_EVENT_FAILURE `;

export const PUBLISH_EVENT_SUCCESS = `PUBLISH_EVENT_SUCCESS`;
export const PUSH_EVENT_FAILURE = `PUSH_EVENT_FAILURE`;

export const currentEventsAction = ({ data, status }) => ({
  type:
    status === "success"
      ? GET_CURRENT_EVENTS_SUCCESS
      : GET_CURRENT_EVENTS_FAILURE,
  payload: {
    data,
    status,
  },
});
export const upcomingEventsAction = ({ data, status }) => ({
  type:
    status === "success"
      ? GET_UPCOMING_EVENTS_SUCCESS
      : GET_UPCOMING_EVENTS_FAILURE,
  payload: {
    data,
    status,
  },
});

export const pastEventsAction = ({ data, status }) => ({
  type:
    status === "success" ? GET_PAST_EVENTS_SUCCESS : GET_PAST_EVENTS_FAILURE,
  payload: {
    data,
    status,
  },
});

export const eventAction = ({ data, status }) => ({
  type: status === "success" ? GET_EVENT_SUCCESS : GET_EVENT_FAILURE,
  payload: {
    data,
    status,
  },
});

export const publishEvent = ({ data, status }) => ({
  type: status === "success" ? GET_EVENT_SUCCESS : GET_EVENT_FAILURE,
  payload: {
    data,
    status,
  },
});
