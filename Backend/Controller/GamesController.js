const { default: axios } = require("axios");
const config = require("../Config");
const {
  getAllGamesService,
  getGameService,
} = require("../Services/games.service");
const {
  categoryGames,
  generatePagination,
  getItemsByArray,
} = require("../Utils");


module.exports = {
  getAllGames: async (req, res) => {
    const { page, per_page } = req.query;
    const nPerPage = per_page || 20;
    const PAGE = Number(page);

    try {
      const allGames = await getAllGamesService();

      if (PAGE) {
        const count = allGames.length;
        let nextPage;
        let prevPage;
        let totalPages;
        const currentPage = PAGE;
        const games = generatePagination(allGames, nPerPage, page);
        if (!(Math.floor(count / nPerPage) == 0)) {
          totalPages = Math.ceil(count / nPerPage);
          nextPage = PAGE + 1;
        }
        totalPages = count <= 0 ? null : totalPages;
        nextPage = games.length == 0 || totalPages < nextPage ? null : nextPage;
        prevPage = page != 1 ? page - 1 : null;

        return res.json({
          results: games,
          pagination: {
            count,
            currentPage,
            totalPages,
            nextPage,
            totalPages,
            prevPage,
          },
        });
      }

      return res.json(allGames);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getGame: async (req, res) => {
    try {
      const { id } = req.params;

      const game = await getGameService(id);
      if(game.error){
        throw new Error(game.error)
      }
      return res.json(game);
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
  },
  getPopularGames: async (req, res) => {
    try {
      const allGames = await getAllGamesService();

      const popularGames = getItemsByArray(allGames, 15);
      return res.json(popularGames);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getRecommendedGames: async (req, res) => {
    try {
      const allGames = await getAllGamesService();
      const popularGames = getItemsByArray(allGames, 15);
      return res.json(popularGames);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getNewGames: async (req, res) => {
    try {
      const allGames = await getAllGamesService();
      const popularGames = getItemsByArray(allGames, 15);
      return res.json(popularGames);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
