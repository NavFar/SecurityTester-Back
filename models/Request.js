var mongoose =require('mongoose');
var requestSchema = new  mongoose.Schema({
	url:String,
	PendingOn:Number,
	results:String,
});
mongoose.model('Request',requestSchema);
module.exports =mongoose.model('Request');
