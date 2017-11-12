var mongoose = require('mongoose'),
     Schema = mongoose.Schema;
var Community = require('./community');

    
var UserSchema = new Schema({
	token :{ type :String, required : true, index:{unique : true}},
	name :{type : String, required : true},
	email : { type: String, required : true},
	phoneNo:{ type:String, required:true},
	aNo : { type: String,required: true},
    bNumber: {type: String},
    city:{ type: String},
    community: [{ type: Schema.Types.Mixed, ref: 'Community' }]
  
});

module.exports = mongoose.model('User',UserSchema);

var User = mongoose.model('User');