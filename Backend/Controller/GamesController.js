const { default: axios } = require("axios");
const config = require("../Config");
const { Game } = require("../DB");
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
        gameFullDetails.price = game.price;
        listTrending.push(gameFullDetails);
      }
      return res.json(listTrending);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  searchGameByParams: async (req, res) => {
    // #swagger.tags = ['Games']
    // #swagger.description = 'Busqueda de games por palabras'
    try {
      const { param } = req.params;
      const { page } = req.query;
      const listGamesByParams = await Game.find({
        title: { $regex: param, $options: "i" },
      });

      const nPerPage = 20;
      const PAGE = Number(page);

      const count = listGamesByParams.length;
      let nextPage;
      let prevPage;
      let totalPages;
      const currentPage = PAGE;
      const games = generatePagination(listGamesByParams, nPerPage, PAGE);

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
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getGamesByGenre: async (req, res) => {
    // #swagger.tags = ['Games']
    // #swagger.description = 'Return games by genre'
    try {
      const { genre } = req.params;
      const [existGenre] = categoryGames.filter(
        (category) => category === genre
      );
      if (!existGenre) throw new Error("Genre not fount!");
      const allGames = await getAllGamesService();
      const listByGenre = allGames.filter((game) => game.genre === existGenre);
      const listLength = listByGenre.length;
      console.log(listLength);
      if (listLength < 5) throw new Error("Insufficient games ");
      if (listLength >= 5 && listLength < 11)
        return res.status(200).send(listByGenre.slice(0, listLength - 1));
      return res.status(200).json(listByGenre.slice(0, 15));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
