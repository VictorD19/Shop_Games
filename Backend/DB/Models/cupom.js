const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CupomSchema = new Schema({
    name: String,
    value: Number
});

module.exports = mongoose.model("Cupom", CupomSchema);
