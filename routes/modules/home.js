const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// Index 頁面：瀏覽全部所有餐廳
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 搜尋功能
router.get('/search', (req, res) => {
  const keywords = req.query.keyword.toLowerCase().trim()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      restaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keywords) || restaurant.name_en.toLowerCase().includes(keywords) ||
          restaurant.category.toLowerCase().includes(keywords)
      })
      res.render('index', { restaurants: restaurants, keywords: keywords })
    })
})

module.exports = router
