export const GET_PUBLISHED_EVENTS_TICKET_SUCCESS = `GET_PUBLISHED_EVENTS_TICKET_SUCCESS`;
export const GET_PUBLISHED_EVENTS_TICKET_FAILURE = `GET_PUBLISHED_EVENTS_TICKET_FAILURE`;

export const GET_PAST_EVENTS_TICKET_SUCCESS = `GET_PAST_EVENTS_TICKET_SUCCESS`;
export const GET_PAST_EVENTS_TICKET_FAILURE = `GET_PAST_EVENTS_TICKET_FAILURE`;

export const GET_PURCHASED_TICKET_SUCCESS = `GET_PURCHASED_TICKET_SUCCESS`;
export const GET_PURCHASED_TICKET_FAILURE = `GET_PURCHASED_TICKET_FAILURE`;

export const GET_TICKET_SUCCESS = `GET_TICKET_SUCCESS`;
export const GET_TICKET_FAILURE = `GET_TICKET_FAILURE`;

export const GET_TICKET_SALES_SUCCESS = `GET_TICKET_SALES_SUCCESS`;
export const GET_TICKET_SALES_FAILURE = `GET_TICKET_SALES_FAILURE`;

export const ARCHIVE_TICKET_SUCCESS = `ARCHIVE_TICKET_SUCCESS`;
export const ARCHIVE_TICKET_FAILURE = `ARCHIVE_TICKET_FAILURE`;

export const GET_ACCOUNT_BALANCE_SUCCESS = `GET_ACCOUNT_BALANCE_SUCCESS`;
export const GET_ACCOUNT_BALANCE_FAILURE = `GET_ACCOUNT_BALANCE_FAILURE`;

export const EDIT_TICKET_SUCCESS = `EDIT_TICKET_SUCCESS`;
export const EDIT_TICKET_FAILURE = `EDIT_TICKET_FAILURE`;
export const GET_TICKET_TYPE_SUCCESS = "GET_TICKET_TYPE_SUCCESS";
export const GET_TICKET_TYPE_FAILURE = "GET_TICKET_TYPE_FAILURE";
export const LOADING_TICKET_TYPES = "LOADING_TICKET_TYPES";

export const publishedEventsTicketAction = ({ data, status }) => ({
  type:
    status === "success"
      ? GET_PUBLISHED_EVENTS_TICKET_SUCCESS
      : GET_PUBLISHED_EVENTS_TICKET_FAILURE,
  payload: {
    data,
    status,
  },
});
export const pastEventsTicketAction = ({ data, status }) => ({
  type:
    status === "success"
      ? GET_PAST_EVENTS_TICKET_SUCCESS
      : GET_PAST_EVENTS_TICKET_FAILURE,
  payload: {
    data,
    status,
  },
});
export const purchasedTicketAction = ({ data, status }) => ({
  type:
    status === "success"
      ? GET_PURCHASED_TICKET_SUCCESS
      : GET_PURCHASED_TICKET_FAILURE,
  payload: {
    data,
    status,
  },
});
export const ticketAction = ({ data, status }) => ({
  type: status === "success" ? GET_TICKET_SUCCESS : GET_TICKET_FAILURE,
  payload: {
    data,
    status,
  },
});
export const ticketSalesAction = ({ data, status }) => ({
  type:
    status === "success" ? GET_TICKET_SALES_SUCCESS : GET_TICKET_SALES_FAILURE,
  payload: {
    data,
    status,
  },
});
export const archiveTicketAction = ({ data, status }) => ({
  type: status === "success" ? ARCHIVE_TICKET_SUCCESS : ARCHIVE_TICKET_FAILURE,
});

export const ticketTypeAction = ({ data, status }) => ({
  type:
    status === "success" ? GET_TICKET_TYPE_SUCCESS : GET_TICKET_TYPE_FAILURE,
  payload: {
    data,
    status,
  },
});
export const editTicketAction = ({ data, status }) => ({
  type: status === "success" ? EDIT_TICKET_SUCCESS : EDIT_TICKET_FAILURE,
  payload: {
    data,
    status,
  },
});
export const getAccountBalanceAction = ({ data, status }) => ({
  type:
    status === "success"
      ? GET_ACCOUNT_BALANCE_SUCCESS
      : GET_ACCOUNT_BALANCE_FAILURE,
  payload: {
    data,
    status,
  },
});

export const ticketTypeLoader = (status) => ({
  type: LOADING_TICKET_TYPES,
  payload: status,
});
