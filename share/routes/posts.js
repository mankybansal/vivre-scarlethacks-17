var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/posts');
var mongoose = require('mongoose');

router.post('/',function(req,res){
	var email = req.decoded;
	 User.findOne({email:email},function(err,docs){
        if(docs.length ===0 ){
            return res.json({success:false,result:[]});
        }
         attributes = {};
         if(req.body.category == "Books"){
             attributes = {Author:req.body.author, Publisher: req.body.pub}
         }
         
        var post = new Post({
		name:req.body.name,
		description: req.body.desc,
        user: docs,
        category: req.body.category,
		attributes:attributes,
        status:req.body.status,
        deleted:"false"

	});
         post.save(function(err){
             if(err){
                 return res.json({success:false,message:err});
             }
             return res.json({success:true,message:"Posted Successfully",post:post});
         });
     });
});



module.exports = router;