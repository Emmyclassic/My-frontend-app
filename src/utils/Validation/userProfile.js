import * as yup from "yup";

export const userProfileSchema = yup.object().shape({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("First name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email address is required")
    .min(3),
  phoneNumber: yup
    .string()
    .trim()
    .required("Phone number  is required")
    .min(10, "Phone number should be more than 10 characters")
    .max(13, "Phone number should be less 350 characters"),
  gender: yup.string().trim().required("gender is required"),
  dayDOB: yup.date().required("select day"),
  monthDOB: yup.date().required("select month"),
  yearDOB: yup.date().required("select year"),
  street: yup.string().trim().required("Street is required"),
  city: yup.string().trim().required("City is required"),
  postalCode: yup.string().trim().required("Postal code is required"),
  state: yup.string().trim().required("State is required"),
});
