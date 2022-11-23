import * as yup from "yup";

export const askQuestionSchema = yup.object().shape({
  resolution_id: yup.string().trim().required("Resolution is required"),

  question: yup.string().trim().required("Question is required"),
});
