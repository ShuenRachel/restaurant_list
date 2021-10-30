const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const restaurantList = require('./restaurant.json')

// 連線資料庫
mongoose.connect('mongodb://localhost/restaurant-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keywords = req.query.keyword.toLowerCase().trim()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keywords) || restaurant.name_en.toLowerCase().includes(keywords) ||
    restaurant.category.toLowerCase().includes(keywords)
  })
  res.render('index', { restaurants: restaurants, keywords:  keywords })
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const newRestaurant = req.body

  return Restaurant.create({ 
    name: newRestaurant.name ,
    name_en: newRestaurant.name_en ,
    category: newRestaurant.category ,
    image: newRestaurant.image ,
    location: newRestaurant.location ,
    phone: newRestaurant.phone ,
    google_map: newRestaurant.google_map ,
    rating: Number(newRestaurant.rating) ,
    description: newRestaurant.description ,
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Restaurant List is running on http://localhost:${port}`)
})