import Cookies from "universal-cookie";
const cookies = new Cookies();
const createCookie = (key, value) => {
  cookies.set(key, value, { path: "/" });
};
const getCookie = (key) => {
  return cookies.get(key);
};
const getAllCookie = () => {
  return cookies.getAll();
};
const removeCookie = (key) => {
  return cookies.remove(key);
};

export { createCookie, getCookie, getAllCookie, removeCookie };
