const { default: axios } = require("axios");
const config = require("../Config");

module.exports = {
  getAllGamesService: async () => {
    try {
      const response = await axios.get(
        "https://mmo-games.p.rapidapi.com/games",
        config
      );
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  },
};
