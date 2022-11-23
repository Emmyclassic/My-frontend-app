export const generateFormData = (payload) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    console.log(`${key}: ${value}`);
    formData.append(`${key}`, value);
  }
  return formData;
};
