const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: String,
  name: String,
  email: String,
  password: String,
  cart: [Number],
  createAt: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
