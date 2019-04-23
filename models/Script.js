var mongoose =require('mongoose');
var scriptPartSchema = new mongoose.Schema({
  name:String,
  describtion:String,
  recommendation:String,
  link:String,
});
var scriptSchema = new mongoose.Schema({
  name:String,
  shortDescribtion:String,
  fullDescribtion:String,
  parts:[scriptPartSchema]
});
mongoose.model('Script',scriptSchema);
module.exports =mongoose.model('Script');
