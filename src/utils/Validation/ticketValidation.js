import * as yup from "yup";

export const createTicketSchema = yup.object().shape({
  ticketName: yup.string().trim().required("Ticket Name is required"),
  ticketAmount: yup
    .number()
    .typeError("A valid number is required")
    .min(0, "Amount must be greater than zero")
    .required("Ticket amount is required"),

  ticketAmountToGuest: yup
    .number()
    .typeError("A valid number is required")
    .required("Ticket anount to guest is required"),
});
