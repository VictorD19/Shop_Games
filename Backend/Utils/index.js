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
module.exports = {
    categoryGames,
    generatePagination
}