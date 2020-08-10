var express = require('express');
var usuario = require('../models/usuarios');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var jwtSecret = 'codeligne_DW2020';

function encryptPass(password){
    const salt = bcrypt.genSaltSync(10);
     return bcrypt.hashSync(password,salt)
}
//registrar
router.post('/signUp',function(req,res){
    const password = encryptPass(req.body.password);
    let u = new usuario({
        
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        email:req.body.email,
        password:password,
        carpetas:[]
    
    });
    u.save().then(result=>{
        var token=jwt.sign(JSON.stringify(result._id),jwtSecret);
        res.json({codigo:1,user:result._id,mensaje:"Usuario registrado", token:token});
        res.end();
    }).catch(error=>{
        res.json({codigo:0,mensaje:"no se pudo registrar"});
        res.end();
    })
});

function comparePass(password,encryptPassword){
    return bcrypt.compareSync(password,encryptPassword);
}
//iniciar sesion
router.post('/signIn',function(req,res){
    
    usuario.findOne({email:req.body.email}).then(result=>{
        if(result==null){
            res.json({codigo:0,mensaje:"no existe el usuario"});
        }else{
            const correctPass = comparePass(req.body.password,result.password);
           if(correctPass){

            var token=jwt.sign(JSON.stringify(result._id),jwtSecret);
            res.json({codigo:1,mensaje:'usuario aceptado',user:result._id,token:token})
            
           }else{
               res.json({codigo:0, mensaje:"no se pudo autenticar"});
           }
           res.end();
        }
        
        
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//crear una carpeta
router.put('/:idUsuario',verifyToken,function(req,res){
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },
        {
            $push:{
                carpetas:{
                    _id:mongoose.Types.ObjectId(),
                    nombreCarpeta:req.body.nombreCarpeta,
                    descripcion:req.body.descripcion,
                    proyectos:[]
                }
            }
        }).then(result=>{
            res.send(result);
            res.end()
        }).catch(error=>{
            res.send(result);
            res.end();
        })
});

//obtener un usuario
router.get('/:idUsuario', verifyToken ,function(req,res){
    usuario.findOne({
        _id:mongoose.Types.ObjectId(req.params.idUsuario)
    },{carpetas:false,password:false}).then(result=>{
        res.send(result);
        res.end()
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})

//obtener todas las carpetas
router.get('/:idUsuario/carpetas',verifyToken,function(req,res){
    usuario.findOne(
        {
            _id:req.params.idUsuario
        },{
            _id:true,
            carpetas:true
        }).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
});



//obtener todos los proyectos de una carpeta 
router.get('/:idUsuario/carpetas/:idCarpeta/proyectos',verifyToken,function(req,res){
    usuario.findOne(
        {
            _id:req.params.idUsuario,
            "carpetas._id":mongoose.Types.ObjectId(req.params.idCarpeta)
        },{
            "carpetas.$":true
        }).then(result=>{
            res.send(result.carpetas[0]);
            res.end();
        }).catch(error=>{
            res.send(error);
            res.end();
        })
});

//obtener un proyecto de una carpeta
router.get('/:idUsuario/carpetas/:idCarpeta/proyectos/:idProyecto',verifyToken,function(req,res){
    usuario.aggregate([
    { $unwind: '$carpetas' },
    { $match: {'carpetas._id':mongoose.Types.ObjectId(req.params.idCarpeta)}},
    {
        $project: {
            'filteredValue':{
                $filter: {
                  input: "$carpetas.proyectos",
                  as: "proyRequerido",
                  cond: { $eq: [ '$$proyRequerido._id', mongoose.Types.ObjectId(req.params.idProyecto) ] }
                }
            }
        }
    }
    ]).then(result=>{
            res.send(result[0].filteredValue[0]);
            res.end();
        }).catch(error=>{
            res.send(error);
            res.end();
        })
});

//crear un proyecto en una carpeta
router.put('/:idUsuario/carpetas/:idCarpeta/proyectos',verifyToken,function(req,res){
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario),
            "carpetas._id":mongoose.Types.ObjectId(req.params.idCarpeta)
        },
        {
            $push:{
                "carpetas.$.proyectos":{
                    _id:mongoose.Types.ObjectId(),
                    nombreProyecto:req.body.nombreProyecto,
                    descripcion:req.body.descripcion,
                    codigoHtml:'',
                    codigoCss:'',
                    codigoJs:''
                }
            }
        }).then(result=>{
            res.send(result);
            res.end()
        }).catch(error=>{
            res.send(error);
            res.end();
        })
});

//guardar codigo en un proyecto
router.put('/:idUsuario/carpetas/:idCarpeta/proyectos/:idProyecto',verifyToken,function(req,res){
    usuario.updateOne(
        { 
          "_id":mongoose.Types.ObjectId(req.params.idUsuario), 
          "carpetas._id":mongoose.Types.ObjectId(req.params.idCarpeta), 
          "carpetas.proyectos._id":mongoose.Types.ObjectId(req.params.idProyecto) 
        },
        { 
          "$set":{ 'carpetas.$[i].proyectos.$[j].codigoHtml':req.body.codigoHtml,
          'carpetas.$[i].proyectos.$[j].codigoCss':req.body.codigoCss,
          'carpetas.$[i].proyectos.$[j].codigoJs':req.body.codigoJs}},{arrayFilters:[{"i._id":mongoose.Types.ObjectId(req.params.idCarpeta)},{"j._id":mongoose.Types.ObjectId(req.params.idProyecto) }]}
      )
    .then(result=>{
            res.send(result);
            res.end();
        }).catch(error=>{
            res.send(error);
            res.end();
        })
});

module.exports=router;

function verifyToken( req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('sin autorizacion');
    }

    const token = req.headers.authorization.split(' ')[1];

    if(token === null){
        return res.status(401).send('sin autorizacion');
    }

    const payload=jwt.verify(token,jwtSecret);
    req.userID = payload._id;
    next();

}