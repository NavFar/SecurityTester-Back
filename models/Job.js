var mongoose =require('mongoose');
var jobSchema = new  mongoose.Schema({
	url:String,
	stat:{ type: String, enum: ['Pending','Done'] },
});
mongoose.model('Job',jobSchema);

module.exports =mongoose.model('Job');
