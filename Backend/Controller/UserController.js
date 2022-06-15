const { User } = require("../DB");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Email não pode ser nulo");
      }
      if (!password) {
        throw new Error("Password  não pode ser nulo");
      }
      const user = await User.create({email, password})
      user.save()
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
