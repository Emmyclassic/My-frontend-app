import { globalStorage } from "./axios";

export const httpConfig = () => ({
  headers: {
    Authorization: `Bearer ${globalStorage.getStore("data")}`,
    "Content-Type": "application/json",
  },
});
