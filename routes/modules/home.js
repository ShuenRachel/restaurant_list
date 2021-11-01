const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// Index 頁面：瀏覽全部所有餐廳
router.get('/', (req, res) => {
  console.log(req.query)
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 搜尋功能
router.get('/search', (req, res) => {
  const keywords = req.query.keyword.toLowerCase().trim()
  const sortCriteria = req.query.sort
  const sortMethod = {}

  switch (sortCriteria) {
    case 'asc':
      sortMethod['name'] = 'asc'
      break
    case 'desc':
      sortMethod['name'] = 'desc'
      break
    case 'category':
      sortMethod['category'] = 'asc'
      break
    case 'location':
      sortMethod['location'] = 'asc'
      break
    default:
      sortMethod['name'] = 'asc'
  }

  Restaurant.find()
    .lean()
    .sort(sortMethod)
    .then(restaurants => {
      restaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keywords) || restaurant.name_en.toLowerCase().includes(keywords) ||
          restaurant.category.toLowerCase().includes(keywords)
      })
      res.render('index', { restaurants: restaurants, keywords: keywords })
    })
})

module.exports = router
