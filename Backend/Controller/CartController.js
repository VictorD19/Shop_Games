const { Cart, Game, Cupom, User } = require("../DB");
const { getGameService } = require("../Services/games.service");
const { getTotalPrice } = require("../Utils");

module.exports = {
  async getCartDetails(req, res) {
    // #swagger.tags = ['Cart']
    // #swagger.description = 'Detalhes do carinho de compras'
    /* #swagger.security = [{
      "apiKeyAuth": []
    }] */
    try {
      const idUser = res.userId;
      const [cartDetails] = await Cart.find({ idUser: idUser });
      cartDetails.idUser = undefined;
      cartDetails.__v = undefined;
      return res.json(cartDetails);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async addItemCart(req, res) {
    // #swagger.tags = ['Cart']
    // #swagger.description = 'Adiciona um item ao carinho de compras'
    /* #swagger.security = [{
      "apiKeyAuth": []
    }] */
    try {
      const { idGame } = req.params;
      const idUser = res.userId;
      const findGame = await Game.findById(idGame);
      if (!findGame)
        throw new Error("Unable to add item to cart, game does not exist!");

      const [cartDetails] = await Cart.find({ idUser: idUser });
      const [existGameInCart] = cartDetails.products.filter(
        (game) => game.idGame === idGame
      );
      if (existGameInCart) throw new Error("Item is already in cart");

      const { title, price, thumbnail } = findGame;
      const game = {
        idGame,
        thumbnail,
        title,
        price,
      };
      cartDetails.products.push(game);
      cartDetails.total = getTotalPrice(cartDetails.products);
      cartDetails.amount = cartDetails.products.length;

      await cartDetails.save();
      cartDetails.idUser = undefined;
      cartDetails.__v = undefined;

      return res.status(201).json(cartDetails);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async deleteItemCart(req, res) {
    // #swagger.tags = ['Cart']
    // #swagger.description = 'Elimina item do carrinho de compras'
    /* #swagger.security = [{
      "apiKeyAuth": []
    }] */
    try {
      const { idGame } = req.params;
      const idUser = res.userId;

      const [cartDetails] = await Cart.find({ idUser: idUser });
      const [findGame] = cartDetails.products.filter(
        (item) => item.idGame === idGame
      );
      if (!findGame) throw new Error("Item in cart does not exist!");
      cartDetails.products = cartDetails.products.filter(
        (item) => item.idGame !== idGame
      );
      cartDetails.total =
        cartDetails.products.length > 0
          ? getTotalPrice(cartDetails.products)
          : 0;
      cartDetails.amount = cartDetails.products.length;
      cartDetails.discount = cartDetails.amount == 0 ? 0 : cartDetails.discount;
      if (cartDetails.discount) {
        const valueDiscount = (cartDetails.total / 100) * cartDetails.discount;
        cartDetails.total = cartDetails.total - valueDiscount;
      }
      await cartDetails.save();

      cartDetails.idUser = undefined;
      cartDetails.__v = undefined;

      return res.status(200).json(cartDetails);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async applyDiscountCart(req, res) {
    // #swagger.tags = ['Cart']
    // #swagger.description = 'Aplica um discount ao seu carinho 0 a 100%'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    cupom: 'cupon',
                    
                }
        } */
    /* #swagger.security = [{
      "apiKeyAuth": []
    }] */
    try {
      const idUser = res.userId;
      const { cupom } = req.body;
      const [cartDetails] = await Cart.find({ idUser });
      if (!cartDetails) throw new Error("Cart does not exist");
      const [findCupom] = await Cupom.find({ name: cupom });
      if (!findCupom) throw new Error("Cupom does not exist");
      if (cartDetails.discount) throw new Error("Already applied a coupon");
      const { value: discount } = findCupom;
      const total = cartDetails.total;
      const valueDiscount = (total / 100) * discount;
      cartDetails.total = total - valueDiscount;
      cartDetails.discount = discount;
      await cartDetails.save();
      cartDetails.idUser = undefined;
      cartDetails._v = undefined;
      return res.status(200).json(cartDetails);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async removeDiscountCart(req, res) {
    // #swagger.tags = ['Cart']
    // #swagger.description = 'Remove disconto do carrinho'
    /* #swagger.security = [{
      "apiKeyAuth": []
    }] */
    try {
      const idUser = res.userId;
      const [cartDetails] = await Cart.find({ idUser });
      if (!cartDetails) throw new Error("Cart does not exist");
      cartDetails.total = getTotalPrice(cartDetails.products);
      cartDetails.discount = 0;
      await cartDetails.save();
      cartDetails.idUser = undefined;
      cartDetails.__v = undefined;
      return res.status(200).json(cartDetails);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async payCart(req, res) {
    // #swagger.tags = ['Cart']
    // #swagger.description = 'Processa pagamento do carrinho'
    /* #swagger.security = [{
      "apiKeyAuth": []
    }] */

    try {
      const idUser = res.userId;
      const [cartDetails] = await Cart.find({ idUser });
      if (!cartDetails) throw new Error("Cart does not exist");
      const existUser = await User.findById(idUser);
      if (cartDetails.amount === 0) throw new Error("Cart has no items ");
      if (!existUser) throw new Error("User does not exist");
      const listGamesIds = cartDetails.products.map((game) => game.idGame);

      const listDetailsGames = await Game.find({
        _id: {
          $in: listGamesIds,
        },
      });
      existUser.games = [...existUser.games, ...listDetailsGames];
      await existUser.save();
      cartDetails.products = [];
      cartDetails.cartDetails = 0;
      cartDetails.total = 0;
      cartDetails.discount = 0;
      cartDetails.amount = 0;
      await cartDetails.save();

      return res.status(200).json({
        games: existUser.games,
        cart: cartDetails,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
