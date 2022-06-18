const { Cart, Game } = require("../DB");
const { getGameService } = require("../Services/games.service");
const { getTotalPrice } = require("../Utils");

module.exports = {
  async getCartDetails(req, res) {
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
    try {
      const { idGame } = req.params;
      const idUser = res.userId;
      const findGame = await Game.findById(idGame);
      if (!findGame)
        throw new Error(
          "Impossivel adicionar item ao carrinho, game não existe!"
        );

      const [cartDetails] = await Cart.find({ idUser: idUser });
      const { title, price } = findGame;
      const game = {
        idGame,
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
    try {
      const { idGame } = req.params;
      const idUser = res.userId;

      const [cartDetails] = await Cart.find({ idUser: idUser });
      const [findGame] = cartDetails.products.filter(
        (item) => item.idGame === idGame
      );
      if (!findGame) throw new Error("Item no carrinho não existe!");
      cartDetails.products = cartDetails.products.filter(
        (item) => item.idGame !== idGame
      );
      cartDetails.total =
        cartDetails.products.length > 0
          ? getTotalPrice(cartDetails.products)
          : 0;
      cartDetails.amount = cartDetails.products.length;
      await cartDetails.save();

      cartDetails.idUser = undefined;
      cartDetails.__v = undefined;

      return res.status(200).json(cartDetails);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
