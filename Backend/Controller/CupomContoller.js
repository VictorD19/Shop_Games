const { Cupom } = require("../DB");
module.exports = {
  async createCupom(req, res) {
    // #swagger.tags = ['Cupons']
    // #swagger.description = Cria um novo cupom'
    /* #swagger.security = [{
      "apiKeyAuth": []
    }] */
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    name: 'NOMECUPOM',
                    value:0
                }
        } */
    try {
      const { name, value } = req.body;
      const isNumber = Number(value);
      if (!name) throw new Error("Please enter a valid name!");
      if (!isNumber) throw new Error("need to enter a valid value!");
      if (isNumber < 0 || isNumber > 100)
        throw new Error("The value must be between 0 and 100!");
      const cupom = new Cupom({ name, value });
      cupom.save();
      return res.status(200).json(cupom);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
