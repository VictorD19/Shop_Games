const jwt = require("jsonwebtoken");

const categoryGames = [
  "MMORPG",
  "Shooter",
  "MMO",
  "Social",
  "Card Game",
  "MOBA",
  "Fighting",
  "Strategy",
  "Racing",
  "Sports",
  "Fantasy",
  "MMORPG",
  "Battle Royale",
  "Action RPG",
  "Card",
  "ARPG",
  "MMOARPG",
];
const generatePagination = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};
const getNumberRandom = (limit) => Math.floor(Math.random() * limit);
const getItemsByArray = (list, amountItems) => {
  const newList = [];
  for (let i = 0; i < amountItems; i++) {
    const random = getNumberRandom(list.length);
    const game = list[random];
    newList[i] = game;
  }
  return newList;
};
const generaToken = (params = {}) => {
  return jwt.sign(params, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};
const isEmail = (email) => {
  const reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return reg.test(email) ? true : false;
};
module.exports = {
  categoryGames,
  generatePagination,
  getNumberRandom,
  getItemsByArray,
  generaToken,
  isEmail
};
