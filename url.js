
var mongoose = require('mongoose');

var urlSchema = new mongoose.Schema({
  
  url:{type:String},
  i:{
    type :Number,
    unique:true,
  }

});


module.exports = mongoose.model('url',urlSchema);