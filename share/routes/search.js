var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/posts');
var mongoose = require('mongoose');


router.get('/by/:name',function(req,res){
	var name = req.params.name;
    console.log(name);
	Post.find({$and:[{$or:[{name:new RegExp(name,'i')},{"attributes.Author":new RegExp(name,'i')},{"attributes.Publisher": new RegExp(name,'i')},{"category": new RegExp(name,'i')}]},{deleted:{$ne:"true"}}]},null,{sort:{updated_at:-1}},function(err,docs){
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

router.get('/trending',function(req,res){
	var name = req.params.name;
    console.log(name);
	Post.find({deleted:{$ne:"true"}},null,{sort:{borrower_count:1}},function(err,docs){
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
		}).limit(5);
});

router.get('/by/category/:name',function(req,res){
    var name = req.params.name;
    Post.find({category:name},function(err,docs){
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
router.get('/by/id/:id',function(req,res){
    var name = req.params.id;
    Post.findOne({_id:name},function(err,docs){
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