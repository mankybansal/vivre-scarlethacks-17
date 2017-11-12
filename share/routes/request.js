var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/posts');
var mongoose = require('mongoose');
var BorrowReq = require('../app/models/borrowReq');

router.post('/',function(req,res){
    var email = req.decoded;
    var postid = req.body.pid;
    console.log(postid);
    Post.findOne({_id:postid},function(err,post){
        if(!post)
            return res.json({success:false,result:[]});
         User.findOne({email:email},function(err,user){
             post.update({borrower:user,deleted:"true"},{$inc:{borrower_count: 1}},function(err,newPost){
          if(err){
              return res.json(err);
          }
                 BorrowReq.findOne({"post._id":mongoose.Types.ObjectId(postid)},function(err,borrowReq){
                     borrowReq.update({accepted:"true"},function(err){
                         if(err)
                            return res.json(err);
                         else{
                             return res.json({success:true,message:"Updated Successfully",post:newPost});
                         }

                     })
                 })
           
           
          })
        

      });
    });
});
router.post('/release',function(req,res){
    var email = req.decoded;
    var postid = req.body.pid;
    console.log(postid);
    var empty={}
    Post.findOne({_id:postid},function(err,post){
        if(!post)
            return res.json({success:false,result:[]});
         User.findOne({email:email},function(err,user){
             post.update({borrower:empty,deleted:"false"},function(err,newPost){
          if(err){
              return res.json(err);
          }
           
           return res.json({success:true,message:"Updated Successfully",post:newPost});
          })

      });
    });
});
module.exports = router;