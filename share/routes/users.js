var express = require('express');
var router = express.Router();
var User = require('../app/models/user');


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

module.exports = router;
