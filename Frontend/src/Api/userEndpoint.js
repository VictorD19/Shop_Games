import { BASE_URL_API } from "./config";
import axios from "axios";
export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL_API}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const message = error.response.data.error;
    return { error: message };
  }
};
export const registerUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL_API}/newuser`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const message = error.response.data.error;
    return { error: message };
  }
};
