const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


///unique is for optimizations, not for validation!!!
const itemSchema = mongoose.Schema({///Constructor
  Unidades: {type:String,required:true},
  Cantidad: {type:Number,required:true},
  Nombre: {type:String, required:true},
  Etiqueta: {type:String, required:true, enum: ['yellow','green','cyan','blue','orange','gray']},
  NumBodega: {type:Number, required:true},
  NumLab: {type: Number, required:true},
  Observaciones: {type:String, required:true},
  PrepaProfe: {type:String, required:true, enum: ['Prepa','Profe']},
  Editar: {type:Boolean, required:true}
});///create schema

itemSchema.plugin(uniqueValidator);///to validate unique

module.exports = mongoose.model('Item',itemSchema);////to use it outside this file
