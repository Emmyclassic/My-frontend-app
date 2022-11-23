import { useState } from "react";
import XLSX from "xlsx";

export const useFileUpload = () => {
  const [loading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState();

  const uploadFile = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const f = files[0];
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = function (e) {
        const data = e.target.result;
        const readedData = XLSX.read(data, { type: "binary" });
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];
        const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const result = generateObjects(dataParse);
        console.log("result", result);
        if (result.length) {
          resolve(result);
          setFileUploaded(result);
        } else {
          const error = new Error("Error in reading the file");
          reject(error);
        }
      };
      reader.readAsBinaryString(f);
    });
  };
  return {
    loading,
    fileUploaded,
    uploadFile,
  };
};

export const generateObjects = (currentSheet) => {
  const keys = Object.values(currentSheet)[0];
  const result = [];
  for (let i = 1; i < currentSheet.length; i++) {
    const currentRow = currentSheet[i];
    const obj = {};
    for (let row = 0; row < currentRow.length; row++) {
      const key = keys[row];
      obj[key] = currentRow[row];
    }
    result.push(obj);
  }
  return result;
};
