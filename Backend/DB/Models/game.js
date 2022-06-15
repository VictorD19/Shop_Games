const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    _id: String,
    GameId:Number,
    title: String,
    thumbnail: String,
    short_description: String,
    game_url:String,
    genre:String,
    platform: String,
    publisher: String,
    developer:String,
    release_date: String,
    profile_url: String,
    price: Number,
    createAt: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Game', GameSchema);