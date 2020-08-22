var express = require('express');
var usuario = require('../models/usuarios');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const { updateOne } = require('../models/usuarios');
const usuarios = require('../models/usuarios');

var jwtSecret = 'codeligne_DW2020';

//funcion para encriptar la contrase;a
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
        carpetas:[],
        snippets:[]
    
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
//funcion para comparar la contrase;a encriptada
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

//asignar planes
router.put('/:idUsuario/planes',verifyToken,function(req,res){
    usuario.updateOne(
        { 
          _id:mongoose.Types.ObjectId(req.params.idUsuario) 
        },
        { 
            plan:mongoose.Types.ObjectId(req.body.idPlan)
        })
    .then(result=>{
            res.send(result);
            res.end();
        }).catch(error=>{
            res.send(error);
            res.end();
        })
  
});
//asignar limites del plan
router.put('/:idUsuario/valoresPlan',verifyToken,function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },{
            nCarpetas:req.body.nCarpetas,
            nProyectos:req.body.nProyectos,
            nSnippets:req.body.nSnippets
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end()
    })
})

//obtener valores del plan 
router.get('/:idUsuario/planes',verifyToken,function(req,res){
    usuario.aggregate([
        {
            $lookup:{
                from:'planes',
                localField:'plan',
                foreignField:'_id',
                as:'plan'
            }
        },{
            $match:{
                _id:mongoose.Types.ObjectId(req.params.idUsuario)
            }
        }  
    ]).then(result=>{
        res.send(result[0].plan[0]);
        res.end()
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})

//obtener un usuario
router.get('/:idUsuario', verifyToken ,function(req,res){
    usuario.findOne({
        _id:mongoose.Types.ObjectId(req.params.idUsuario)
    },{carpetas:false,snippets:false}).then(result=>{
        res.send(result);
        res.end()
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})

//actualizar perfil de usuario
router.put('/:idUsuario/actualizarPerfil',verifyToken,function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },
        {
            nombre:req.body.nombre,
            apellido:req.body.apellido,
            email:req.body.email
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})
//cambiar contrase;a
router.put('/:idUsuario/cambiarPass',verifyToken,function(req,res){
    const password=encryptPass(req.body.password)
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },{
            password:password
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})


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
            res.send(error);
            res.end();
        })
});
//eliminar una carpeta
router.put('/:idUsuario/carpetas/:idCarpeta/eliminar',verifyToken,function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario),
            "carpetas._id":mongoose.Types.ObjectId(req.params.idCarpeta)
        },
        {
            $pull:{
                "carpetas":{_id:mongoose.Types.ObjectId(req.params.idCarpeta)}
            }
        }).then(result=>{
            res.send(result);
            res.end()
        }).catch(error=>{
            res.send(error);
            res.end();
        })
});
//reducir el numero de carpetas permitidas
router.put('/:idUsuario/actualizarCarpetas',verifyToken,function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },{
            nCarpetas:req.body.nCarpetas
        }
    ).then(result=>{
        res.send(result);
        res.end();
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
            carpetas:true,
            nCarpetas:true,
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
//obtener el numero de proyectos restantes
router.get('/:idUsuario/proyectosRestantes',verifyToken,function(req,res){
    usuario.findOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },{
            nProyectos:true
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})
//actualizar el numero de proyectos permitidos
router.put('/:idUsuario/actualizarProyectos',verifyToken,function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },{
            nProyectos:req.body.nProyectos
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();

    })
}) 

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
//eliminar proyectos
router.put('/:idUsuario/carpetas/:idCarpeta/proyectos/:idProyecto/eliminar',verifyToken,function(req,res){
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario),
            "carpetas._id":mongoose.Types.ObjectId(req.params.idCarpeta),
            "carpetas.proyectos._id":mongoose.Types.ObjectId(req.params.idProyecto) 
        },
        {
            $pull:{
                "carpetas.$.proyectos":{_id:mongoose.Types.ObjectId(req.params.idProyecto) }
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

//crear un snippet
router.put('/:idUsuario/snippets',verifyToken,function(req,res){
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },
        {
            $push:{
                snippets:{
                    _id:mongoose.Types.ObjectId(),
                    nombreSnippet:req.body.nombreSnippet,
                    descripcion:req.body.descripcion,
                    lenguaje:req.body.lenguaje,
                    codigo:''
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

//obtener todos los snippets
router.get('/:idUsuario/snippets',verifyToken,function(req,res){
    usuario.findOne(
        {
            _id:req.params.idUsuario
        },{
            _id:true,
            snippets:true,
            nSnippets:true
        }).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
});

//eliminar una carpeta
router.put('/:idUsuario/snippets/:idSnippet/eliminar',verifyToken,function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario),
            "snippets._id":mongoose.Types.ObjectId(req.params.idSnippet)
        },
        {
            $pull:{
                "snippets":{_id:mongoose.Types.ObjectId(req.params.idSnippet)}
            }
        }).then(result=>{
            res.send(result);
            res.end()
        }).catch(error=>{
            res.send(error);
            res.end();
        })
});

//actualizar numero de snippets permitidos
router.put('/:idUsuario/actualizarSnippets',verifyToken,function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },{
            nSnippets:req.body.nSnippets
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();

    })
}) 

//obtener un snippet
router.get('/:idUsuario/snippets/:idSnippet',verifyToken,function(req,res){
    usuario.findOne(
        {
            _id:req.params.idUsuario,
            "snippets._id":mongoose.Types.ObjectId(req.params.idSnippet)
        },{
            "snippets.$":true
        }).then(result=>{
            res.send(result.snippets[0]);
            res.end();
        }).catch(error=>{
            res.send(error);
            res.end();
        })
});
//guardar codigo de un snippet
router.put('/:idUsuario/snippets/:idSnippet',verifyToken,function(req,res){
    usuario.updateOne(
        { 
          "_id":mongoose.Types.ObjectId(req.params.idUsuario), 
          "snippets._id":mongoose.Types.ObjectId(req.params.idSnippet), 
        },
        { 
          "$set":{ 'snippets.$.codigo':req.body.codigo}
        })
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