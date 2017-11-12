var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var User = require('./user');
var Post  = require('./posts');

var borrorwReq = new Schema({

	
	borrower:[{ type: Schema.Types.Mixed, ref: 'User' }],
    poster:[{ type: Schema.Types.Mixed, ref: 'User' }],
    post:[{ type: Schema.Types.Mixed, ref: 'Post' }],
    accepted:{type:String}
});
module.exports = mongoose.model('borrowReq',borrorwReq);

var User = mongoose.model('borrowReq')