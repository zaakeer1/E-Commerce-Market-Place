require('dotenv').config()

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

app.use(express.json())


let register = require('./models/register.model');
const req = require('express/lib/request')

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//returns the list of sellers
app.get('/api/buyer/list-of-sellers',authenticateToken, async (req, res) => {
  if (req.user.type != "buyer"){
    return res.send('Only buyers can see sellers catalog')
  }
  register.find({"type":"seller"},{"name":1,_id:0})
  .then(sellerList => res.json(sellerList))
  .catch(err => res.status(400).json('Error: ' + err));
})

//Just a endpoint to check if the token authentication is working as expected
app.get('/users/auth',authenticateToken, (req, res) => {  
  let u = register.find({"name":req.user.name})
  .then(u => res.json(u))
  .catch(err => res.status(400).json('Error: ' + err));
})

//registers a new user
app.post('/api/auth/register', async (req, res) => {
  try {
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const name = req.body.name
    const type = req.body.type
    const password = hashedPassword

    const newRegister = new register({
      name,
      type,
      password
    });

    newRegister.save()
    res.status(201).send()

  } catch {
    res.status(500).send()
  }
})

//authenticates a registered user 
app.post('/api/auth/login', async (req, res) => {

  let user = await register.find({"name":req.body.name}).exec()

  if (user.length === 0) {
    return res.status(400).send('Cannot find user')
  }
  
  if(await bcrypt.compare(req.body.password, user[0].password)) {
    username = user[0].name
    usertype = user[0].type
  } else {
    return res.status(401).send()
  }


  userObject = {
    "name": username,
    "type": usertype
  }

  const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN)
  res.json({accessToken: accessToken})


})

//middleware to check if the token sent by user is valid
function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.post('/api/seller/create-catalog', authenticateToken, async (req,res) => {
  
  if (req.user.type != "seller"){
    return res.send('Only sellers can create catalog')
  }
  
  register.findOneAndUpdate({name: req.user.name}, {$push: {catalog: req.body}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log(success);
      }
    })
  

})

app.get('/api/buyer/seller-catalog/:seller_id', authenticateToken, async (req,res) => {

  if (req.user.type != "buyer"){
    return res.send('Only buyers can see sellers catalog')
  }

  let u = register.find({"name":req.body.name},{"catalog":1,_id:0})
  .then(u => res.json(u))
  .catch(err => res.status(400).json('Error: ' + err));
})

app.post('/api/buyer/create-order/:seller_id', authenticateToken, async (req, res) => {
  if (req.user.type != "buyer"){
    return res.send('Only buyers can create order')
  }

  register.findOneAndUpdate({name: req.body[0].name}, {$push: {orders: req.body[1]}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log(success);
      }
    })
})

//Retrieves the list of orders for the sellers
app.get('/api/seller/orders', authenticateToken, async (req, res) => {

  if (req.user.type != "seller"){
    return res.send('Only sellers can see their orders')
  }

  let u = register.find({"name":req.user.name},{"orders":1,_id:0})
  .then(u => res.json(u))
  .catch(err => res.status(400).json('Error: ' + err));
})

app.listen(3100)
