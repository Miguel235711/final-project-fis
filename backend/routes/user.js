const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();///router
const Admin = require('../models/users/admin/admin');
const Student = require('../models/users/student/student');
const keys = require('../models/special/key');

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
      message: 'Estudiante Creado',
      result: result
    });
  })
  .catch(err=>{
    return res.status(500).json({
    message: "¡Registro de Estudiante Falló!"
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
      message: 'Administrador creado',
      result: result
    });
  })
  .catch(err=>{
    return res.status(500).json({
    message: "¡Registro de Administrador Falló!"
    });
  });
}

function keyNotFound(user,res){
  return res.status(401).json({message:`Llave de ${user} no encontrada`});
}

function keySearchFail(user,res){
  return res.status(500).json({message:`Error en búsqueda de llave de ${user}` });
}

router.post('/signup',(req,res,next)=>{
  console.log(req.body.key);
  console.log('keys',keys);
  if(!req.body.isAdmin){
    ///sign up student
    keys.StudentKey.deleteOne({key:req.body.key})
      .then(result=>{
        if(result.n>0){
          ///deletion successful
          bcrypt.hash(req.body.password, 10)
            .then(hash =>{
              return saveStudent(req.body,res,hash);
          });
        }else{
          ///key not found
          return keyNotFound('Estudiante',res);
        }
      })
      .catch(error=>{
        return keySearchFail('Estudiante',res);
      });
  } else {
    ///sign up admin
    keys.AdminKey.deleteOne({key:req.body.key})
      .then(result=>{
        if(result.n>0){
          ///deletion successful
          bcrypt.hash(req.body.password, 10)
            .then(hash =>{
              return saveAdmin(req.body,res,hash);
          });
        }else{
          ///key not found
          return keyNotFound('Estudiante',res);
        }
      })
      .catch(error=>{
        return keySearchFail('Estudiante',res);
      });
  }
});

function processUser(fetchedUser,req,res){
  bcrypt.compare(req.body.password, fetchedUser.password)///important to analyze!!!!
  .then(result=>{
    if(!result){
      ///unsuccessfull match
      console.log('unsuccessfull match');
        return res.status(401).json({
          message: '¡Contraseña no válida!'
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
        expiresIn: 7200,
        userId: fetchedUser._id,
        userName: fetchedUser.name,
        userType: req.body.isAdmin?'Admin':'Estudiante',
        userGenre: fetchedUser.genre
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
  console.log(req.body.isAdmin);
  if(!req.body.isAdmin){
    console.log('going to look student');
    Student.findOne({email: req.body.email})
      .then(student =>{
        if(!student){
          ///no student found
          return res.status(401).json({message:'¡Correo de Estudiante no encontrado!'});
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
          return res.status(401).json({message:'¡Correo de Administrador no encontrado!'});
        }else{
          ///admin found
          processUser(admin,req,res);
        }
      });
  }
});

module.exports = router;
