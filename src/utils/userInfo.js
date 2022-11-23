import jwt_decode from "jwt-decode";

export const getUserInfo = () => {
  const token = JSON.parse(localStorage.getItem("data"));
  const decoded = jwt_decode(token);
  return {
    userId: decoded.sub,
  };
};
