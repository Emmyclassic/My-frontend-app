import { createTicketAction, ticketLoader } from "./paymentAction";

export const postTicketAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(ticketLoader(true));
      const {
        data: { data },
      } = await httpApi.createTicket(payload);
      dispatch(ticketLoader(false));

      dispatch(
        createTicketAction({
          data,
          status: "success",
          message: "Ticket created successfully",
        })
      );
    } catch (err) {
      const error = err.response?.data ?? err.toJSON().message;
      dispatch(createTicketAction({ data: error, status: "fail" }));
      dispatch(ticketLoader(false));
    }
  };
