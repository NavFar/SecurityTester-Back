var mongoose =require('mongoose');
var siteDataSchema = new  mongoose.Schema({
    moto:{
      show:Boolean,
      content:String,
    },
    introduction:{
      show:Boolean,
      content:String,
    },
    title:{
      content:String,
    },
});
mongoose.model('SiteData',siteDataSchema);
module.exports =mongoose.model('SiteData');
