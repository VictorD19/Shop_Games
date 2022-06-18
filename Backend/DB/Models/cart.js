const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  idUser: Schema.Types.ObjectId,
  products: [],
  amount: Number,
  total: Number,
});

module.exports = mongoose.model("CartUser", CartSchema);
