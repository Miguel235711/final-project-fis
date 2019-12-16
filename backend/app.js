///IMPORTS
const path = require('path');
const express = require('express'); ///import express package
const bodyParser=require('body-parser');///import body-parser
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');

///INSTANTIATIONS


const app = express();///get express app

///CONNECT TO DATABASE

mongoose.connect('mongodb+srv://nodeapp:K4bGfwIYKzkBaiP7@cluster0-vi42a.mongodb.net/app', {useNewUrlParser: true,useUnifiedTopology:true})
.then(()=>{
  console.log('Connected to database');
})
.catch(()=>{
  console.log('connection failed!');
});

///MIDDLEWARE FUNCTIONS

app.use(bodyParser.json());///to parse json data for every request
app.use('/images',express.static(path.join('backend/images')));/// add middleware to grant access to certain path

///for all incoming requests
app.use((req,res,next)=>{////to disable Cross-Origin Resource Sharing (CORS) feature
  res.setHeader('Access-Control-Allow-Origin',"*"); ///to allow any source in different port to access
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization');///narrow to sources with certain headers
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');///narrow to methods
  next();////go to next manipulator
});

///forward especific requests
app.use('/api/user',userRoutes);
app.use('/api/item',itemRoutes);

module.exports = app;
