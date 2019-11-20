const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();///router
const Item = require('../models/inventory/item');

router.post('/addItem',checkAuth,(req,res,next)=>{
  //return res.status(200).json('addItemPost');
  console.log(req.body);
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
  .then(result=>{
    return res.status(201).json({message:'Item guardado correctamente.'});
  })
  .catch(error=>{
    return res.status(500).json({message:'Item no se pudo guardar'});
  });
  console.log('item', item);
  //return res.status(201).json('item insertado correctamente');
});
router.get('',checkAuth,(req,res,next)=>{
  ///get every single item
  console.log('Etiqueta: ', req.query.color);
  Item.find({Etiqueta:req.query.color})
    .then(fetchedItems=>{
      console.log(fetchedItems);
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

module.exports = router;
