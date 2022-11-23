import * as yup from "yup";

export const addProxyValidation = yup.object().shape({
  participantName: yup
    .string()
    .trim()
    .required("Participant name is required")
    .typeError("Participant name is required"),
  accountNumber: yup
    .number()
    .required("Account number is required")
    .min(10)
    .typeError("Account number  is required"),

  nominatedProxy: yup
    .string()
    .trim()
    .typeError("Nominated proxy is required")
    .required("Nominated proxy  name is required"),
});
