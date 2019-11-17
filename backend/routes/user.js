const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();///router
const Admin = require('../models/users/admin/admin');
const Student = require('../models/users/student/student');
const Key = require('../models/special/key');

function saveStudent(body,res,hash){
  console.log('saveStudent');
  const student = new Student({
    name: body.name,
    lastName: body.lastName,
    email: body.email,
    password: hash,
    genre: body.genre
  });
  console.log(student);
  student.save()
  .then(result=>{
    return res.status(201).json({
      message: 'Student created',
      result: result
    });
  })
  .catch(err=>{
    return res.status(500).json({
    message: "Student signup failed!"
    });
  });
}

function saveAdmin(body,res,hash){
  console.log('saveAdmin');
  const admin = new Admin({
    name: body.name,
    lastName: body.lastName,
    email: body.email,
    password: hash,
    genre: body.genre
  });
  console.log(admin);
  admin.save()
  .then(result=>{
    return res.status(201).json({
      message: 'Admin created',
      result: result
    });
  })
  .catch(err=>{
    return res.status(500).json({
    message: "Admin signup failed!"
    });
  });
}

router.post('/signup',(req,res,next)=>{
  console.log(req.body.key);
  Key.find({})
  .then(keys=>{
    if(!keys){
      console.log('no keys in this search...');
    }
    keys.forEach(key=>{
      console.log(key);
    });
  });
  Key.findOne({key:req.body.key})
  .then(result=>{
    console.log(result);
    if(!result){
      return res.status(401).json({message:'key not found'});
    }
    ///erase key
    Key.deleteOne({key:req.body.key}).then(result=>{
      console.log('after deleting key');
    });
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
      if(req.body.isAdmin){
        ///save as admin
        return saveAdmin(req.body,res,hash);
      }else{
        //save as student
        return saveStudent(req.body,res,hash);
      }
    });
  });
});

function processUser(fetchedUser,req,res){
  bcrypt.compare(req.body.password, fetchedUser.password)///important to analyze!!!!
  .then(result=>{
    if(!result){
      ///unsuccessfull match
      console.log('unsuccessfull match');
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
      ///some problems to display in front but token correctly sent
      return res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        userName: fetchedUser.name
      });
      ///extra userId for optimization purposes
    })
    .catch(err=>{
      console.log(err);
      return res.status(401).json({
        message: 'Invalid authentication credentials!'
      });
    });
}

router.post('/login',(req,res,next)=>{
  console.log(req.body.email);
  if(!req.body.isAdmin){
    console.log('going to look student');
    Student.findOne({email: req.body.email})
      .then(student =>{
        if(!student){
          ///no student found
          return res.status(401).json({message:'Student not found'});
        }
        ///student found, process it
        console.log('going to process student');
        processUser(student,req,res);
      });
  }else{
    Admin.findOne({email:req.body.email})
      .then(admin=>{
        if(!admin){
          ///no admin found
          return res.status(401).json({message:'Admin not found'});
        }else{
          ///admin found
          processUser(admin,req,res);
        }
      });
  }
});

module.exports = router;
