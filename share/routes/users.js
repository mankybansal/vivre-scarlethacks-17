var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/posts');



/* GET users listing. */
router.get('/me', function(req, res, next) {
  var token = req.decoded;
    User.findOne({email:token},function(err,docs){
        if(docs.length ===0 ){
            return res.json({success:false,result:[]});
        }else{
            return res.json({success:true,result:docs});
        }
    })
    
});

router.get('/byMe', function(req, res, next) {
  var token = req.decoded;
    Post.find({"user.email":token},function(err,docs){
        if(docs.length ===0 ){
            return res.json({success:false,result:[]});
        }else{
            return res.json({success:true,result:docs});
        }
    })
    
});

module.exports = router;
