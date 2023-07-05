const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./querycart')
const port = 3000
const cors = require('cors');

let corsOpltions = { origin: ['http://localhost:4200'] }

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Authorization");
  res.header({ 'Content-Type': 'application/json', Authorization: 'my-auth-token' })
  res.header("Access-Control-Allow-Credentials:true");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();
});

app.get('/product', db.getProduct)
app.get('/product/:id', db.getProductById)
app.post('/product', db.createProduct)
app.delete('/product', cors(corsOpltions), db.deleteDubleProduct)
app.put('/product/:id', db.updateProduct)

app.get('/carts', db.getCarts)
app.get('/carts/:id', db.getCartsById)
app.post('/carts', db.createCarts)
app.put('/carts/:id', db.updateCarts)
app.patch('/carts/:id', db.updateCarts)
app.delete('/carts', cors(corsOpltions), db.deleteDublecarts)
app.delete('/carts/:id', cors(corsOpltions), db.deleteCarts)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})