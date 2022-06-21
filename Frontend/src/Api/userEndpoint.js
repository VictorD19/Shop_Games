import { BASE_URL_API, getConfigAuth } from "./config";
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
export const getDataUser = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL_API}/user_details`,
      getConfigAuth()
    );
    return response.data;
  } catch (error) {
    const message = error.response.data.error;
    return { error: message };
  }
};
