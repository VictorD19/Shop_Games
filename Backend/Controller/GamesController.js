const { default: axios } = require("axios");
const config = require("../Config");
const { categoryGames } = require("../Utils");

module.exports = {
  getAllGames: async (req, res) => {
    try {
      const allGames = await axios.get(
        "https://mmo-games.p.rapidapi.com/games",
        config
      );      
      return res.json(allGames.data);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getGame: async (req, res) => {
    try {
      const { id } = req.params;
      if(!Number(id)|| !id ){
        throw new Error('Informe um id valido')
      }
      const game = await axios.get(
        "https://mmo-games.p.rapidapi.com/game",
        { ...config, params: { id } }
      );
      return res.json(game.data);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getNews: async (req, res) => {
    try {
      const news = await axios.get(
        "https://mmo-games.p.rapidapi.com/latestnews",
        config
      );
      return res.json(news.data);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getCategoryOfGames: async (req, res) => {
    try {
      return res.json(categoryGames);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};
