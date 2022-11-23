import * as yup from "yup";

export const regSchema = yup.object().shape({
  firstName: yup.string().trim().required("Firstname is required"),
  lastName: yup.string().required("Lastname is required").trim(),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(3, "Password should be more than three characters"),
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email address is required")
    .min(3),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  agreeTerms: yup.bool().oneOf([true], "Field must be checked"),
});
export const regBusinessSchema = yup.object().shape({
  companyName: yup.string().trim().required("Name is required"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(3, "Password should be more than three character"),
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email address is required")
    .min(3),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  agreeTerms: yup.bool().oneOf([true], "Field must be checked"),
});

export const loginSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(3, "Password should be more than three character"),
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email address is required")
    .min(3),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email address is required")
    .min(3),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(3, "Password should be more than three character"),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
