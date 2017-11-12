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
         if(req.body.category == "Video Games"){
             attributes = {Publisher:req.body.pub,rating:req.body.rating,genre:req.body.genre}
         }
         if(req.body.category == "Toys"){
             attributes = {Age:req.body.age,manufacture: req.body.man}
         }
         if(req.body.category == "Household"){
             attributes = {manufacture: req.body.man, category: req.body.cat}
         }
         if(req.body.category == "Clothes"){
             attributes = {size:req.body.size, color: req.body.color}
         }
        
         
        var post = new Post({
		name:req.body.name,
		description: req.body.desc,
        user: docs,
        category: req.body.category,
		attributes:attributes,
        status:req.body.status,
        deleted:"false",
            image_url :req.body.image-url;

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