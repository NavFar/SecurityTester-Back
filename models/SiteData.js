var mongoose =require('mongoose');
var siteDataSchema = new  mongoose.Schema({

});
mongoose.model('SiteData',siteDataSchema);
module.exports =mongoose.model('SiteData');
