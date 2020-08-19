var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var database = require('./modules/database-module');
var usuariosRouter = require('./routes/usuarios-router');
var planesRouter = require('./routes/planes-router')

var app = express();


//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/usuarios', usuariosRouter);
app.use('/planes',planesRouter);
app.get('/',function(req,res){
    res.send("servidor funcionand");
});

app.listen(8888, function(){
    console.log("se levanto el servidor");
});