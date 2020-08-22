var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombre:String,
    apellido:String,
    email:{type:String,unique:true},
    password:String,
    carpetas: mongoose.SchemaTypes.Array,
    snippets: mongoose.SchemaTypes.Array,
    plan:mongoose.SchemaTypes.ObjectId,
    nCarpetas:String,
    nProyectos:String,
    nSnippets:String
})

module.exports = mongoose.model('usuarios',esquema)