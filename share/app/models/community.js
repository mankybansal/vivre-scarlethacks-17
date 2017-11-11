var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    
var CommunitySchema = new Schema({
	
	name :{type : String, required : true}
	
});

module.exports = mongoose.model('Community',CommunitySchema);

var Community = mongoose.model('Community');