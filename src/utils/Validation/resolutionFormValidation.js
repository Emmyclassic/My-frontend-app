import * as yup from "yup";

export const createResolutionSchema = yup.object().shape({
  resolutionTitle: yup.string().trim().required("Title is required"),
});
