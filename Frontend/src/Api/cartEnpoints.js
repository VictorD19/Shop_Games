import { BASE_URL_API, getConfigAuth } from "./config";
import axios from "axios";

export const addItemCart = async (idGame) => {
  try {
    const response = await axios.post(
      `${BASE_URL_API}/add_item_cart/${idGame}`,
      null,
      await getConfigAuth()
    );
    return response.data;
  } catch (error) {
    const message = error.response.data.error;
    return { error: message };
  }
};
export const removeItemCart = async (idGame) => {
  try {
    const response = await axios.delete(
      `${BASE_URL_API}/delete_item_cart/${idGame}`,
      await getConfigAuth()
    );
    return response.data;
  } catch (error) {
    const message = error.response.data.error;
    return { error: message };
  }
};
export const getCartDetails = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL_API}/cart_details`,
      await getConfigAuth()
    );
    return response.data;
  } catch (error) {
    const message = error.response.data.error;
    return { error: message };
  }
};

export const applyDiscount = async (cupom) => {
  try {
    const response = await axios.post(
      `${BASE_URL_API}/apply_discount_cart`,
      { cupom },
      await getConfigAuth()
    );
    return response.data;
  } catch (error) {
    const message = error.response.data.error;
    return { error: message };
  }
};
export const removeDiscount = async () => {
  try {
    const response = await axios.delete(
      `${BASE_URL_API}/remove_discount_cart`,
      await getConfigAuth()
    );
    return response.data;
  } catch (error) {
    const message = error.response.data.error;
    return { error: message };
  }
};

export const sendBuyOfGame = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL_API}/pay_cart`,
      null,
      await getConfigAuth()
    );
    return response.data;
  } catch (error) {
    const message = error.response.data.error;
    return { error: message };
  }
};
