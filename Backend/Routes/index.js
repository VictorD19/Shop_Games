const express = require('express')
const { getAllGames, getGame, getNews, getCategoryOfGames, getPopularGames, getNewGames, getRecommendedGames } = require('../Controller/GamesController')
const Routes = express.Router()

Routes.get('/allgames',getAllGames)
Routes.get('/game/:id',getGame)
Routes.get('/news',getNews)
Routes.get('/categorys',getCategoryOfGames)
Routes.get('/populargames',getPopularGames)
Routes.get('/recommendedgames',getRecommendedGames)
Routes.get('/newgames',getNewGames)

module.exports = Routes