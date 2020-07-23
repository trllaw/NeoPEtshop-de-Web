const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();

//conecta ao bd
mongoose.connect('mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000');

//Carrega Models
const user = require('./models/user.js');
const pet = require('./models/pet.js');
const service = require('./models/service.js');
const product = require('./models/product.js');
const servOrder = require('./models/servOrder.js');
const prodOrder = require('./models/prodOrder.js');
const delivery = require('./models/delivery.js');

//carrega rotas
const userRoute = require('./routes/user-route.js');
const petRoute = require('./routes/pet-route.js');
const serviceRoute = require('./routes/service-route.js');
const productRoute = require('./routes/product-route.js');
const servorderRoute = require('./routes/servorder-route.js');
const prodorderRoute = require('./routes/prodorder-route.js');
const deliveryRoute = require('./routes/delivery-route.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));



app.use('/users', userRoute);
app.use('/pets', petRoute);
app.use('/services', serviceRoute);
app.use('/products', productRoute);
app.use('/servorders', servorderRoute);
app.use('/prodorders', prodorderRoute);
app.use('/deliverys', deliveryRoute);

module.exports = app;