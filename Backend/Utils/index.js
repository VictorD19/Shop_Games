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
module.exports = {
  categoryGames,
  generatePagination,
  getNumberRandom,
  getItemsByArray,
};
