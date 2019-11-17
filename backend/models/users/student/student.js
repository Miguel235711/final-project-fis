const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

///unique is for optimizations, not for validation!!!
const studentSchema = mongoose.Schema({///Constructor
  name: {type:String, required:true},
  lastName: {type:String, required:true},
  email: {type:String, required: true , unique: true},
  password: {type:String, required:true},
  genre: {type:String,required:true, enum:['Mujer', 'Hombre', 'Otro'] }
});///create schema

studentSchema.plugin(uniqueValidator);///to validate unique

module.exports = mongoose.model('Student',studentSchema);////to use it outside this file
