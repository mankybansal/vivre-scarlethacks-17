var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var jwt    = require('jsonwebtoken');


/* GET home page. */
router.post('/', function(req, res, next) {
    var token  = req.body.token;
    User.findOne({token:token},function(err,docs){
        
        var token = jwt.sign(docs.email,"karthic",{
						expiresIn:"365d"
					});
        
        if(docs.length ===0 ){
            return res.json({success:false,result:[]});
        }else{
            return res.json({success:true,result:docs,token:token});
        }
        
    });
        
});

module.exports = router;
