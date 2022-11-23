import * as yup from "yup";

export const sendSMSSchema = yup.object().shape({
  smsMessage: yup
    .string()
    .trim()
    .required("Participant name is required")
    .typeError("SMS message cannot be empty"),
});
