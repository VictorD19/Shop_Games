import axios from "axios";
import { BASE_URL_API } from "./config";

export const getCategoryOfGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL_API}/categorys`);
    return response.data;
  } catch (error) {
    const message = error.response.data;
    return { error: message };
  }
};
export const getTrendingGames =async ()=>{
  try {
    const response = await axios.get(`${BASE_URL_API}/trending_games`)
    return response.data
  } catch (error) {
    const message = error.response.data;
    return { error: message };
  }
}