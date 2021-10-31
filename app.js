const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const routes = require('./routes')
const port = 3000

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`Restaurant List is running on http://localhost:${port}`)
})
