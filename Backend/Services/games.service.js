const { Game } = require("../DB");
const axios = require("axios");
const config = require("../Config");
module.exports = {
  getAllGamesService: async () => {
    try {
      return await Game.find();
    } catch (error) {
      return { error: error.message };
    }
  },
  getGameService: async (id) => {
    try {
      const game = await Game.findById(id);
      if (!game) {
        throw new Error("Jogo não encontrado!");
      }
      const { GameId } = game;
      const gameDetails = await axios.get(
        "https://mmo-games.p.rapidapi.com/game",
        {
          ...config,
          params: { id: GameId },
        }
      );
      return gameDetails.data;
    } catch (error) {
      return { error: error.message };
    }
  },
};
