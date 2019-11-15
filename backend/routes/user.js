const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();///router
const User = require('../models/user');

router.post('/signup',(req,res,next)=>{
  console.log(req.body);
  return res.status(201).json({message:'signup request received'});
  /*bcrypt.hash(req.body.password, 10)
    .then(hash =>{
      const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        genre: req.body.genre,
        isAdmin: req.body.isAdmin
      });
      user.save()
        .then(result=>{
          res.status(201).json({
            message: 'User created',
            result: result
          });
        }).catch(err=>{
          res.status(500).json({
            message: "Invalid authentication credentials!"
          });
        });
    });*/
});

router.post('/login',(req,res,next)=>{
  let fetchedUser;
  User.findOne({ email: req.body.email})
    .then(user =>{
      console.log(user);
      if(!user){
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      ///we found user
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);///important to analyze!!!!
    }).then(result=>{
      if(!result){
        ///unsuccessfull match
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign(
        {email: fetchedUser.email,userId: fetchedUser._id},
        'secret_key_should_be_longer',
        {expiresIn:'1h'}
      );///create json token
      console.log(token);
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
      ///extra userId for optimization purposes
    }).catch(err=>{
      console.log(err);
      return res.status(401).json({
        message: 'Invalid authentication credentials!'
      });
    });
});

module.exports = router;
