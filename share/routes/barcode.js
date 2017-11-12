var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var walmart = require('walmart')('zbs8p568qpq4qyrbf2a5kev2');

router.get('/',function(req,res){
   var barcode  = req.body.barcode;
    console.log(barcode);
    walmart.getItemByUPC("041100005373").then(function(item) {
  console.log(item.product.productName);
});

});

module.exports = router;
