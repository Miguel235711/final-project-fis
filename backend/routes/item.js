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
    Restaurar: req.body.Restaurar,
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
  console.log('req.query: ',req.query);
  //console.log('Etiqueta: ', req.query.color);
  if(req.query.type==='filter'){
    ///filter by these properties
    console.log('filter by these properties');
    let queryColor = '.*';
    console.log('queryColor 0 ', queryColor);
    console.log('req.query.color',req.query.color);
    if(req.query.color!="white"&&req.query.color!="undefined"){
      queryColor=req.query.color;
    }
    let queryKeyWord = '.*';
    console.log('req.query.keyword',req.query.keyword);
    if(req.query.keyword!="undefined"&&req.query.keyword!=''){
      console.log('modifying queyNombre');
      queryKeyWord=req.query.keyword;
    }
    console.log('queryColor 1', queryColor);
    console.log('queryNombre',queryKeyWord);
    console.log('Activo: ', req.query.activo);
    const orExpression = {$or : [{Nombre: new RegExp(queryKeyWord,'i')},{Observaciones: new RegExp(queryKeyWord,'i')}]};
    Item.find({$and:[orExpression,{Etiqueta: new RegExp(queryColor)}],Activo:req.query.activo})
      .then(fetchedItems=>{
        console.log('fetched items in filtering',fetchedItems);
        res.status(200).json({
          message: 'Items fetched successfully',
          items: fetchedItems
        });
      })
      .catch(errors=>{
        console.log('error in filtering',errors);
        res.status(500).json({
          message:'Fetching Items failed'
        });
      });
  }else if(req.query.type==='color'){
    ///filter by only color
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
  }else if(req.query.type==='unsubscribed'){
    ///filter by unsubscribed
    Item.find({Activo:false})
      .then(fetchedItems=>{
        res.status(200).json({
          message: 'Unsubscribed Items fetched successfully',
          items: fetchedItems
        })
      })
      .catch(error=>{
        res.status(500).json({
          message:'Unsubscribed Items Fetching Failed'
        });
      });
  }else{
    res.status(500).json({message:'query retrieving items failed'});
  }
});
router.put('',checkAuth,(req,res,next)=>{
  console.log('req.query.id ' ,req.query.id);
  console.log('item',req.body);
  console.log('put serverside: ',req.body);
  let updateParameter = req.body, message = 'Item editado exitosamente';
  if(Object.entries(req.body).length === 0 && req.body.constructor === Object) {
    updateParameter = {Activo:true}; ///tricky
    message='Item restaurado exitosamente';
  }
  Item.updateOne({_id: req.query.id},updateParameter)
    .then(response=>{
      console.log('update',response);
      res.status(201).json({message});
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
