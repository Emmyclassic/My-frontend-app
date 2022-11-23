import * as yup from "yup";

export const createEventSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(3, "Title should be more than three character"),
  short_name: yup
    .string()
    .trim()
    .required("Short name is required")
    .min(3, "Short name should be more than 10 characters"),

  brief_desc: yup
    .string()
    .trim()
    .min(3, "Description should be more than 10 characters")
    .required("Brief summary is required")
    .min(10, "Brief summary is must be more than ten characters"),
});
