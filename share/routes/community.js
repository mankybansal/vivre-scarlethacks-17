var express = require('express');
var router = express.Router();
var Community = require('../app/models/community');

router.get('/', function(req,res) {
    var decoded = req.decoded;
	Community.find({},function(err,docs){
		return res.json({success:true,result:docs});
	});
});

router.post('/',function(req,res){
    var community = new Community({
        name : req.body.name
    });
    
    community.save(function(err){
       
		if(err){
			if(err.code == 11000)
				return res.json({success: false, message:"User Details Already Exists" });
			else
				return res.json({success:false,message:"Unknown Error"})
		}

		console.log('Community Saved Successfully');
		return res.json({success: true,message:"Community Saved Successfully" });
	});

})
module.exports = router;
