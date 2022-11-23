import {
  GET_PAST_EVENTS_TICKET_FAILURE,
  GET_PAST_EVENTS_TICKET_SUCCESS,
  GET_PUBLISHED_EVENTS_TICKET_FAILURE,
  GET_PUBLISHED_EVENTS_TICKET_SUCCESS,
  GET_PURCHASED_TICKET_FAILURE,
  GET_PURCHASED_TICKET_SUCCESS,
  GET_TICKET_FAILURE,
  ARCHIVE_TICKET_SUCCESS,
  ARCHIVE_TICKET_FAILURE,
  GET_TICKET_SUCCESS,
  GET_TICKET_TYPE_FAILURE,
  GET_TICKET_TYPE_SUCCESS,
  LOADING_TICKET_TYPES,
  GET_TICKET_SALES_FAILURE,
  GET_TICKET_SALES_SUCCESS,
  GET_ACCOUNT_BALANCE_SUCCESS,
  GET_ACCOUNT_BALANCE_FAILURE,
} from "./ticketAction";

const init = {
  publishedEventTicket: [],
  pastEventTicket: [],
  purchasedTicket: [],
  ticketDetail: null,
  ticketSalesDetail: [],
};
export const eventsTicketReducer = (state = init, action) => {
  const { payload } = action;
  switch (action.type) {
    case GET_PUBLISHED_EVENTS_TICKET_SUCCESS:
      return {
        ...state,
        publishedEventTicket: payload,
      };
    case GET_PUBLISHED_EVENTS_TICKET_FAILURE:
      return {
        ...state,
        publishedEventTicket: payload,
      };
    case GET_PAST_EVENTS_TICKET_SUCCESS:
      return {
        ...state,
        pastEventTicket: payload,
      };
    case GET_PAST_EVENTS_TICKET_FAILURE:
      return {
        ...state,
        pastEventTicket: payload,
      };
    case GET_PURCHASED_TICKET_SUCCESS:
      return {
        ...state,
        purchasedTicket: payload,
      };
    case GET_PURCHASED_TICKET_FAILURE:
      return {
        ...state,
        purchasedTicket: payload,
      };
    case GET_TICKET_SUCCESS:
    case GET_TICKET_FAILURE:
      return {
        ...state,
        ticketDetail: payload,
      };
    case GET_TICKET_SALES_SUCCESS:
    case GET_TICKET_SALES_FAILURE:
      return {
        ...state,
        ticketSalesDetail: payload,
      };
    case ARCHIVE_TICKET_SUCCESS:
    case ARCHIVE_TICKET_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

const initState = {
  ticketTypes: null,
  loading: false,
  error: null,
  status: null,
};
export const ticketTypeReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING_TICKET_TYPES:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_TICKET_TYPE_SUCCESS:
      return {
        ...state,
        ticketTypes: action.payload.data,
        status: action.payload.status,
      };
    case GET_TICKET_TYPE_FAILURE:
      return {
        ...state,
        error: action.payload.data,
        status: action.payload.status,
      };
    default:
      return state;
  }
};
const initialAccountBalance = {
  balance: null,
};
export const accountBalanceReducer = (
  state = initialAccountBalance,
  action
) => {
  switch (action.type) {
    case GET_ACCOUNT_BALANCE_SUCCESS:
      return {
        ...state,
        balance: action.payload,
      };
    case GET_ACCOUNT_BALANCE_FAILURE:
      return {
        ...state,
        balance: action.payload,
      };
    default:
      return state;
  }
};
