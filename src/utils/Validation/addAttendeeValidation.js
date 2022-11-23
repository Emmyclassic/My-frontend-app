import * as yup from "yup";

export const addAttendeeSchema = yup.object().shape({
  participantName: yup.string().trim().required("Participant name is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(11, "Must be exactly 11 digits")
    .max(11, "Must be exactly 11 digits"),

  accountNumber: yup
    .number()
    .typeError("Valid number is required")
    .required("Account number is required")
    .min(10),
});

export const addAttendeeSchemaCorperate = yup.object().shape({
  participantName: yup.string().trim().required("Participant name is required"),
  email: yup.string().trim().email("Invalid Email format"),
});
