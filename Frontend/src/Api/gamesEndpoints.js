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
export const getTrendingGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL_API}/trending_games`);
    return response.data;
  } catch (error) {
    const message = error.response.data;
    return { error: message };
  }
};

const getPopularGames = axios.get(`${BASE_URL_API}/populargames`);
const getRecommendedGames = axios.get(`${BASE_URL_API}/recommendedgames`);
const getNewsGames = axios.get(`${BASE_URL_API}/newgames`);

export const getGamesInitials = async () => {
  try {
    const [res1,res2,res3] = await axios.all([
      getPopularGames,
      getRecommendedGames,
      getNewsGames,
    ]);
    return{
      popularGames: res1.data,
      recommendedGames: res2.data,
      newsGames: res3.data
    }
  } catch (error) {
    const message = error.response.data;
    return { error: message };
  }
};

export const searchGames= async(param, page=1)=>{
  try {
    const response = await axios.get(`${BASE_URL_API}/search_games/${param}?page=${page}`);
    return response.data;
  } catch (error) {
    const message = error.response.data;
    return { error: message };
  }
}