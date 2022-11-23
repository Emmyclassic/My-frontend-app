import * as yup from "yup";

export const contactUsSchema = yup.object().shape({
  firstName: yup.string().trim().required("Firstname is required"),
  lastName: yup.string().required("Lastname is required").trim(),
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email address is required")
    .min(3),
});
