var mongoose =require('mongoose');
var testSchema = new mongoose.Schema({
	name:String,
	status:Number,
	pass:Boolean,
	score:Number,
	result:{}
});
var requestSchema = new  mongoose.Schema({
	url:String,
	start:Date,
	end:Date,
	pending:Boolean,
	expose:Boolean,
	pendingOn:[testSchema],
});
mongoose.model('Request',requestSchema);
module.exports =mongoose.model('Request');
