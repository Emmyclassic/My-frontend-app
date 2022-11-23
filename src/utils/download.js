export const download = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.target = "_blank";
  a.setAttribute("download", fileName);
  a.click();
};
