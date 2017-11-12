var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var BorrowReq = require('../app/models/borrowReq');
var Post = require('../app/models/posts');
var mongoose = require('mongoose');

router.post('/',function(req,res){
    var email = req.decoded;
    var poster_id = req.params.poster_id;
    var post_id = req.params.post_id;
    console.log(poster_id);
    console.log(post_id);
    poster = [];
    borrower = [];
    post = [];
    User.findOne({email:email},function(err,docs){
        if(docs.length == 0){
            return res.json({success:false,result:[]});
        }
        borrower = docs;
    });
    User.findOne({_id:poster_id},function(err,docs){
        if(docs.length == 0){
            return res.json({success:false,result:[]});
        }
        poster = docs;
    });
    Post.findOne({_id:post_id},function(err,docs){
        post = docs;
    })
    var borrowReq = new BorrowReq({
        borrower:borrower,
        poster:poster,
        post:post,
        accepted: "false"
        
    });
    borrowReq.save(function(err){
        if(err){
            return res.json({success:false,message:err});
        }else{
            return res.json({succes5a07d90f58b1a3893e83ac69s:true,message:"Req Successfully",req:borrowReq})
        }
    });
    
    
});

module.exports = router;