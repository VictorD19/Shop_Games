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
  getNumberRandom,
} = require("../Utils");

module.exports = {
  getAllGames: async (req, res) => {
    // #swagger.tags = ['Games']
    // #swagger.description = 'Obtem todos os games ou eles paginados'

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
    // #swagger.tags = ['Games']
    // #swagger.description = 'Retorna game por id'

    try {
      const { id } = req.params;

      const game = await getGameService(id);
      if (game.error) {
        throw new Error(game.error);
      }
      return res.json(game);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getNews: async (req, res) => {
    // #swagger.tags = ['News']
    // #swagger.description = 'Retorna as utimas noticias relaciona aos games'
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
    // #swagger.tags = ['Games']
    // #swagger.description = 'Retorna todas as categorias dos games'
    try {
      return res.json(categoryGames);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getPopularGames: async (req, res) => {
    // #swagger.tags = ['Games']
    // #swagger.description = 'Retorna todos os games populares'
    try {
      const allGames = await getAllGamesService();

      const popularGames = getItemsByArray(allGames, 15);
      return res.json(popularGames);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getRecommendedGames: async (req, res) => {
    // #swagger.tags = ['Games']
    // #swagger.description = 'Retorna todos os games recomendados'
    try {
      const allGames = await getAllGamesService();
      const popularGames = getItemsByArray(allGames, 15);
      return res.json(popularGames);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getNewGames: async (req, res) => {
    // #swagger.tags = ['Games']
    // #swagger.description = 'Retorna todos novos games'
    try {
      const allGames = await getAllGamesService();
      const popularGames = getItemsByArray(allGames, 15);
      return res.json(popularGames);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getTrendingGame: async (req, res) => {
    // #swagger.tags = ['Games']
    // #swagger.description = 'Retorna games em destaques'
    try {
      const allGames = await getAllGamesService();
      const listTrending = [];
      const numberGamesTrend = 6;

      for (let i = 0; i < numberGamesTrend; i++) {
        let randomNumber = getNumberRandom(allGames.length);
        const game = allGames[randomNumber];
        const gameFullDetails = await getGameService(game.id);
        gameFullDetails.id = game.id;
        gameFullDetails.GameId = game.GameId;
        listTrending.push(gameFullDetails);
      }
      return res.json(listTrending);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
