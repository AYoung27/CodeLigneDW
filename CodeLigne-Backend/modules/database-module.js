var mongoose = require('mongoose');

let bd = 'codeligne';
let port = '27017';
let host = 'localhost';

class Database{
    constructor(){
        this.conectar();
    }

    conectar(){
        mongoose.connect(`mongodb://${host}:${port}/${bd}`)
        .then(result=>{
            console.log('se conecto a mongodb');
        }).catch(error=>{
            console.log(error);
        });
    //promesas, alternativas para saber cuando termino una funcion asincrona
        
    }
}

module.exports = new Database();