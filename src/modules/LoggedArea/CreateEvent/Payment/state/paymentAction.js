// Create event actions
export const CREATE_TICKET_SUCCESS = `CREATE_TICKET_SUCCESS`;
export const CREATE_TICKET_FAILURE = `CREATE_TICKET_FAILURE`;

export const CREATE_TICKET_RESET = "CREATE_TICKET_RESET";
export const CREATING_TICKET = "CREATING_TICKET";

export const createTicketAction = ({ data, status, message }) => ({
  type: status === "success" ? CREATE_TICKET_SUCCESS : CREATE_TICKET_FAILURE,
  payload: {
    data,
    status,
    message,
  },
});

export const resetCreateTicket = {
  type: CREATE_TICKET_RESET,
};

export const ticketLoader = (status) => {
  return {
    type: CREATING_TICKET,
    payload: status,
  };
};
