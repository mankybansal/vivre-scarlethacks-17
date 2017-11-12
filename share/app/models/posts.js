var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var User = require('./user');

var PostSchema = new Schema({

	name: {type : String, required : true},
	description: {type : String, required:true},
	user:[{ type: Schema.Types.Mixed, ref: 'Community' }],
    category:{type:String, required:true},
    attributes:{type: Array,default: void 0},
    created_at    : { type: Date },
    updated_at    : { type: Date },
    borrower:[{ type: Schema.Types.Mixed, ref: 'Community' }],
    deleted:{type:String,required:true},
    borrower_count:{type: Number,default : 0}
});
module.exports = mongoose.model('Post',PostSchema);

var User = mongoose.model('Post')