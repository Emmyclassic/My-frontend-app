import jwtDecode from "jwt-decode";

export const isLoggedIn = () => {
  const token = JSON.parse(localStorage.getItem("data"));

  if (!token) return false;

  if (token) {
    const { exp } = jwtDecode(token);
    const currentTime = Date.now().valueOf() / 1000;

    if (currentTime > exp) {
      localStorage.clear();
      return false;
    }
    return true;
  }
  return false;
};
