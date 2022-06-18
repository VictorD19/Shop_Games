const express = require('express')
const { getCartDetails, addItemCart, deleteItemCart } = require('../Controller/CartController')
const { getAllGames, getGame, getNews, getCategoryOfGames, getPopularGames, getNewGames, getRecommendedGames } = require('../Controller/GamesController')
const { createUser, loginUser } = require('../Controller/UserController')
const authMiddleware = require('../Middleware/auth')
const Routes = express.Router()

Routes.get('/allgames',getAllGames)
Routes.get('/game/:id',getGame)
Routes.get('/news',getNews)
Routes.get('/categorys',getCategoryOfGames)
Routes.get('/populargames',getPopularGames)
Routes.get('/recommendedgames',getRecommendedGames)
Routes.get('/newgames',getNewGames)


Routes.post('/newuser',createUser)
Routes.post('/login',loginUser)
Routes.use(authMiddleware)

Routes.get('/cart_details',getCartDetails)
Routes.post('/add_item_cart/:idGame',addItemCart)
Routes.delete('/delete_item_cart/:idGame',deleteItemCart)

module.exports = Routes