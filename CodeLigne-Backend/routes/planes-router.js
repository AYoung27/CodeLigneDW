var express = require('express');
var plan = require('../models/plan');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/',function(req,res){
    plan.find().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end()
    })
})


module.exports=router