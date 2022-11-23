import * as yup from "yup";

export const meetingAuthScheme = yup.object().shape({
  account_number: yup
    .number()
    .typeError("Valid number is required")
    .required("Account number is required")
    .min(10),
  passcode: yup.string().required("Passcode  is required"),
});

export const observerAuthScheme = yup.object().shape({
  passcode: yup.string().required("Passcode  is required"),
});
