import {
  CREATE_TICKET_FAILURE,
  CREATE_TICKET_RESET,
  CREATE_TICKET_SUCCESS,
  CREATING_TICKET,
} from "./paymentAction";

export const createTicketReducer = (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case CREATE_TICKET_SUCCESS:
      return payload;
    case CREATE_TICKET_FAILURE:
      return payload;
    case CREATE_TICKET_RESET:
      return {};
    case CREATING_TICKET:
      return {
        loading: payload,
      };
    default:
      return state;
  }
};
