import * as yup from "yup";

export const createLinkSchema = yup.object().shape({
  sectionTitle: yup.string().trim().required("Section title is required"),
});

export const createDocumentSchema = yup.object().shape({
  sectionTitle: yup.string().trim().required("Section title is required"),
});

export const createVideoSchema = yup.object().shape({
  sectionTitle: yup.string().trim().required("Title name is required"),
});

export const createEntertainerSchema = yup.object().shape({
  about: yup.string().trim().required("About is required"),
  category: yup.string().trim().required("Category is required"),
});

export const createDonationSchema = yup.object().shape({
  title: yup.string().trim().required("Title is required"),
});
