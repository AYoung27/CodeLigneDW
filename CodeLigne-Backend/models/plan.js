var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombrePlan:String,
    precio:String,
    numeroCarpetas:String,
    numeroProyectos:String,
    numeroSnippets:String
})

module.exports = mongoose.model('planes',esquema)