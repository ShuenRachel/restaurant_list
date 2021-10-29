const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String
    required: true
  },

  name_en: String,

  category: {
    type: String
    required: true
  },

  image: String,

  location: {
    type: String
    required: true
  },

  phone: String,

  google_map: String,

  rating: Number,

  description: {
    type: String
    required: true
  },
})

module.exports = mongoose.model('Restaurant', restaurantSchema)