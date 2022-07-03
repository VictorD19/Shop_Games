const { User, Cart } = require("../DB");
const bcrypt = require("bcrypt");
const { generaToken, isEmail } = require("../Utils");

module.exports = {
  createUser: async (req, res) => {
    // #swagger.tags = ['Usuario']
    // #swagger.description = 'Criação de novo usuarios'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    email: 'bertramvictor61@gmail.com',
                    password:'K79OUIOj.'
                }
        } */
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Email não pode ser nulo");
      }
      if (!password) {
        throw new Error("Password  não pode ser nulo");
      }
      const findUser = await User.findOne({ email });

      if (findUser) {
        throw new Error("Usuario com email ja existe!.");
      }

      try {
        const saltRounds = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const user = new User({ email, password: passwordHash });
        await user.save();
        const cart = new Cart({
          idUser: user.id,
          products: [],
          amount: 0,
          total: 0,
          discount: 0,
        });
        await cart.save();

        user.password = undefined;

        return res.status(201).json({
          user,
          token: generaToken({ id: user.id }),
        });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  loginUser: async (req, res) => {
    // #swagger.tags = ['Usuario']
    // #swagger.description = 'Inicia sessão do usuario'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    email: 'bertramvictor61@gmail.com',
                    password:'K79OUIOj.'
                }
        } */
    try {
      const { email, password } = req.body;
      if (!email) throw new Error("Precisa informar um email!");

      const isValidEmail = isEmail(email);

      if (!isValidEmail) {
        throw new Error("Formato de email invalido!");
      }
      if (!password) throw new Error("Precisa informar uma senha!");

      const existUser = await User.findOne({ email });
      if (!existUser) throw new Error("Usuario não encontrado!");

      const checkPassword = await bcrypt.compare(password, existUser.password);
      if (!checkPassword) throw new Error("Senha incorrecta!");
      existUser.password = undefined;
      return res
        .status(200)
        .json({ user: existUser, token: generaToken({ id: existUser.id }) });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getDataUser: async (req, res) => {
    // #swagger.tags = ['Usuario']
    // #swagger.description = 'Retorna datos del usuario'
    /* #swagger.security = [{
      "apiKeyAuth": []
    }] */
    try {
      const idUser = res.userId;
      if (!idUser) throw new Error("Imposiver buscar usuario não existe.");
      const { email, _id,games } = await User.findById(idUser);

      return res.status(200).json({ email, _id,games });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
