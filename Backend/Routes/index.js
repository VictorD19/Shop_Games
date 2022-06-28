const express = require("express");
const {
  getCartDetails,
  addItemCart,
  deleteItemCart,
} = require("../Controller/CartController");
const {
  getAllGames,
  getGame,
  getNews,
  getCategoryOfGames,
  getPopularGames,
  getNewGames,
  getRecommendedGames,
  getTrendingGame,
  searchGameByParams,
  getGamesByGenre,
} = require("../Controller/GamesController");
const {
  createUser,
  loginUser,
  getDataUser,
} = require("../Controller/UserController");
const authMiddleware = require("../Middleware/auth");
const Routes = express.Router();

Routes.get("/allgames", getAllGames);
Routes.get("/game/:id", getGame);
Routes.get("/news", getNews);
Routes.get("/categorys", getCategoryOfGames);
Routes.get("/populargames", getPopularGames);
Routes.get("/recommendedgames", getRecommendedGames);
Routes.get("/newgames", getNewGames);
Routes.get("/trending_games", getTrendingGame);
Routes.get("/search_games/:param", searchGameByParams);
Routes.get("/games_genre/:genre", getGamesByGenre);

Routes.post("/newuser", createUser);
Routes.post("/login", loginUser);
Routes.use(authMiddleware);

Routes.get("/cart_details", getCartDetails);
Routes.post("/add_item_cart/:idGame", addItemCart);
Routes.delete("/delete_item_cart/:idGame", deleteItemCart);

Routes.get("/user_details", getDataUser);

module.exports = Routes;
