const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


///unique is for optimizations, not for validation!!!
const keySchema = mongoose.Schema({///Constructor
  key: {type:String, required:true,unique:true}
});///create schema

keySchema.plugin(uniqueValidator);///to validate unique

module.exports  = { StudentKey : mongoose.model('StudentKey',keySchema) , AdminKey :  mongoose.model('AdminKey',keySchema) };
