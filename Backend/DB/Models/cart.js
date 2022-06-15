const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  _id: String,
  idUser: Schema.Types.ObjectId,
  idGame: Schema.Types.ObjectId,
  amount: Number,
  total: [Number],
  createAt: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cart", CartSchema);
