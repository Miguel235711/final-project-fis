const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const mongoose = require('mongoose');


const router = express.Router();///router
const Item = require('../models/inventory/item');

router.post('/addItem',checkAuth,(req,res,next)=>{
  //return res.status(200).json('addItemPost');
  //console.log(req.body);
  const item = new Item({
    Unidades: req.body.Unidades,
    Cantidad: req.body.Cantidad,
    Nombre: req.body.Nombre,
    Etiqueta: req.body.Etiqueta,
    NumBodega: req.body.NumBodega,
    NumLab: req.body.NumLab,
    Observaciones: req.body.Observaciones,
    PrepaProfe: req.body.PrepaProfe,
    Editar: req.body.Editar,
    Borrar: req.body.Borrar,
    Activo:true
  });
  console.log(item);
  item.save()
  .then(createdItem=>{
    return res.status(201).json({
      message:'Item guardado correctamente.',
      item: {... createdItem , id: createdItem._id}
    });
  })
  .catch(error=>{
    return res.status(500).json({message:'Item no se pudo guardar'});
  });
  console.log('item', item);
  //return res.status(201).json('item insertado correctamente');
});
router.get('',checkAuth,(req,res,next)=>{
  ///get every single item
  //console.log('Etiqueta: ', req.query.color);
  Item.find({Etiqueta:req.query.color,Activo:true})
    .then(fetchedItems=>{
      //console.log(fetchedItems);
      res.status(200).json({
        message: 'Items fetched successfully',
        items: fetchedItems
      });
    })
    .catch(error=>{
      res.status(500).json({
        message:'Fetching Items failed'
      });
    });
});
router.put('',checkAuth,(req,res,next)=>{
  console.log('req.query.id ' ,req.query.id);
  console.log('item',req.body);
  console.log('put serverside: ',req.body);
  Item.updateOne({_id: req.query.id},req.body)
    .then(response=>{
      console.log('update',response);
      res.status(201).json({message:'Item editado exitosamente'});
    })
    .catch(error=>{
      console.log('error in put of item: ', error);
      res.status(500).json({message:'Error interno para editar'});
    });
});
router.delete('',checkAuth,(req,res,next)=>{
  console.log('req.query.id ' ,req.query.id);
  Item.updateOne({_id: req.query.id},{Activo:false})
    .then(response=>{
      console.log('delete',response);
      res.status(201).json({message:'Item dado de baja exitosamente'});
    })
    .catch(error=>{
      console.log('error in delete of item: ', error);
      res.status(500).json({message:'Error interno para dar de baja'});
    });
});
router.get('/single',(req,res,next)=>{
  let id = new mongoose.Types.ObjectId(req.query.id);
  console.log(id);
  Item.findById(id)
  .then(foundItem=>{
    if(foundItem){
      console.log('found item', foundItem);
      res.status(200).json({message:'Item encontrado',item:foundItem});
    }else{
      res.status(404).json({message:'Item no encontrado'});
    }
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({
      message:'Fetching post failed!'
    });
  });
});
module.exports = router;
