const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// USING MIDDLEWARES HERE:

const app = express();


app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('tiny'));

// IMPORTING OUR ROUTES HERE:
    
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const categoriesRoutes = require('./routes/categories');

// USING OUR ROUTES HERE:

app.use('/users',usersRoutes);
app.use('/products',productsRoutes);
app.use('/orders',ordersRoutes);
app.use('/categories',categoriesRoutes);



//MONGODB DATABASE CONNECTION HERE:

mongoose.connect("mongodb://127.0.0.1:27017/ESHOP")
  .then(() => console.log("DATABASE IS CONNECTED."))
  .catch((e) => console.log(e));
  

// DEFINING THE PORT FOR LISTENING TO REQUESTS FROM CLIENT SIDE

const PORT = 5000;
app.listen(PORT,()=>{
    console.log('SERVER IS RUNNING AT http://localhost:5000/');
});