const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


///unique is for optimizations, not for validation!!!
const userSchema = mongoose.Schema({///Constructor
  name: {type:String, required:true},
  lastName: {type:String, required:true},
  email: {type:String, required: true , unique: true},
  password: {type:String, required:true},
  genre: {type:String,required:true, enum:['Mujer', 'Hombre', 'Otro'] },
  isAdmin: {type:Boolean,required:true}
});///create schema

userSchema.plugin(uniqueValidator);///to validate unique

module.exports = mongoose.model('User',userSchema);////to use it outside this file
