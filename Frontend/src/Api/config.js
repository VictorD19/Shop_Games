import { getCookie } from "../Utils/cookie";

export const BASE_URL_API = "http://localhost:3001";

export const getConfigAuth = async () => {
  const token = await getCookie("token");
  return {
    headers: { authorization: `Bearer ${token}` },
  };
};
