var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/posts');
var mongoose = require('mongoose');


router.get('/:name',function(req,res){
	var name = req.params.name;
    console.log(name);
	Post.find({$or:[{name:new RegExp(name,'i')},{"attributes.Author":new RegExp(name,'i')},{"attributes.Publisher": new RegExp(name,'i')}]},null,{sort:{updated_at:-1}},function(err,docs){
				if(err)
				{
					return res.json({success:false,message:"Unknown Error"})
				}
				else if(docs.length == 0)
				{
					return res.json({success:false,message:"No Ads match your Search Condition"});
				}
				else
				{
					return res.json({success:true,result:docs});

				}
		});
});

module.exports = router;