var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombre:String,
    apellido:String,
    email:String,
    password:String,
    carpetas: mongoose.SchemaTypes.Array,
    snippets: mongoose.SchemaTypes.Array,
    plan:mongoose.SchemaTypes.ObjectId,
    nCarpetas:String,
    nProyectos:String,
    nSnippets:String
})

module.exports = mongoose.model('usuarios',esquema)