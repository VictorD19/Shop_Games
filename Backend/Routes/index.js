const express = require('express')
const { getAllGames, getGame, getNews, getCategoryOfGames } = require('../Controller/GamesController')
const Routes = express.Router()

Routes.get('/allgames',getAllGames)
Routes.get('/game/:id',getGame)
Routes.get('/news',getNews)
Routes.get('/categorys',getCategoryOfGames)

module.exports = Routes