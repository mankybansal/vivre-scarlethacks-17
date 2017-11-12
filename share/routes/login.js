var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var jwt    = require('jsonwebtoken');


/* GET home page. */
router.post('/', function(req, res, next) {
    var token  = req.body.token;
    console.log(token);
    User.findOne({token:token},function(err,docs){
        
        
        if(docs.length ===0 ){
            return res.json({success:false,result:[]});
        }else{
            
        var token2 = jwt.sign(docs.email,"karthic",{
						expiresIn:"365d"
					});
            
            return res.json({success:true,result:docs,token:token2});
        }
        
    });
        
});

module.exports = router;
