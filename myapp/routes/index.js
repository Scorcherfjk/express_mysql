var express = require('express');
var router = express.Router();
var config = require('../models/database').config;
var bcrypt = require('bcrypt');
var mysql = require('mysql');

var con = mysql.createConnection(config());

/*** LISTO NO MODIFICADO ***/
router.get('/', function(req, res, next) {
    if (con){
        con.destroy();
        console.log("conexion destruida");
    }
    req.session.destroy( function (err) {
      if(err){
        console.log(err);
      }else{
        console.log("sesion destruida");
      }
    });
    res.render('index', { title: 'Universidad jfsc' });
});

/*** LISTO NO MODIFICADO ***/
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Registro de usuario' });
});

/*** LISTO NO MODIFICADO ***/
router.get('/inicio' ,function(req, res, next) {
    if(req.session.user){
        res.render('inicio', { 
            title: "Bienvenido | Universidad jfsc", 
            usuario: req.session.user 
        });
    } else {
        res.redirect("/");
    }
});

/*** LISTO NO MODIFICADO ***/
router.get('/nuevo' ,function(req, res, next) {
    if(req.session.user){
        res.render('nuevo', { 
            title: "Nuevo", 
            usuario: req.session.user
        });
    } else {
        res.redirect("/");
    }
});

/*** LISTO NO MODIFICADO ***/
router.get('/change-password' ,function(req, res, next) {
    if(req.session.user){
        res.render('changePassword', { 
            title: "Cambio de Clave", 
            usuario: req.session.user 
        });
    } else {
        res.redirect("/");
  }
});

/*** LISTO ***/
router.post('/validation/change-password' ,function(req, res, next) {
    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) throw err;
            else console.log("CONECTADO!");
    
            var sql = `UPDATE usuario SET clave = ? WHERE id_usuario = ?`;
            var clave = bcrypt.hashSync(req.body.clave,10)
            var usuario = req.session.user.id

            con.query(sql, [clave, usuario], function (err, result) {
                if (err) {
                    console.log(err);
                }else{
                    res.redirect('/inicio');
                }
            });
            con.end();
        });
    } else {
        res.redirect("/");
    }
});

/*** LISTO ***/
router.get('/change-data' ,function(req, res, next) {
    if(req.session.user){
        
        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) console.log(err);
            else console.log("CONECTADO!");

            var sql = 'SELECT  * from usuario WHERE id_usuario = ? LIMIT 1';
    
            con.query(sql, [req.session.user.id], function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                if(!req.session.user){
                    console.log(req.session.user);
                    res.redirect("/");
                } else {
                    res.render('changeData', { 
                        title: "Cambio de Datos", 
                        usuario: req.session.user,
                        lista: result[0]
                    });
                }
            });
            con.end();
        });
    } else {
        res.redirect("/");
    }
});

/*** LISTO ***/
router.post('/validation/change-data' ,function(req, res, next) {
    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) throw err;
            else console.log("CONECTADO!");
    
            var sql = `UPDATE usuario SET pais = ? ,departamento =  ? ,provincia = ? ,distrito = ? ,direccion =  ? ,telefono_movil = ? ,telefono_fijo =  ? ,email2 =  ? WHERE id_usuario = ?`;
            var campos = [ req.body.pais, req.body.departamento, req.body.provincia, req.body.distrito, req.body.direccion, req.body.telefono_movil, req.body.telefono_fijo, req.body.email2, req.session.user.id ]

            con.query(sql, campos, function (err, result) {
                if (err) {
                    console.log(err);
                }else{
                    res.redirect('/inicio');
                }
            });
            con.end();
        });
    } else {
        res.redirect("/");
    }
});

/*** LISTO ***/
router.get('/administrar' ,function(req, res, next) {
    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) console.log(err);
            else console.log("CONECTADO!");

            var sql = 'SELECT id_proyecto, titulo, fecha_creacion from proyecto WHERE id_usuario = ?';
            var id = [req.session.user.id];

            con.query(sql, id, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                if(!req.session.user){
                    res.redirect("/");
                } else {
                    res.render('administrar', { 
                        title: "Administrar Proyectos", 
                        usuario: req.session.user,
                        lista: result
                    });
                }
            });
        });
    } else {
        res.redirect("/");
    }
});

/*** EN PROCESO ***/
router.post('/editar-proyecto' ,function(req, res, next) {
    if(req.session.user){
        
        if (con) con.destroy();
        var con = mysql.createConnection(config());

        var sql = `SELECT usuario.*, proyecto.*, datos_generales.*
        FROM proyecto INNER JOIN usuario 
        ON usuario.id_usuario = ? AND proyecto.id_proyecto = ?
        INNER JOIN datos_generales ON datos_generales.id_proyecto = proyecto.id_proyecto`;
        
        var values = [ req.session.user.id, req.body.idproyecto, req.body.idproyecto];

        con.connect(function(err) {
            if (err) console.log(err);
            else console.log("CONECTADO!");
            con.query(sql, values, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                if(!req.session.user){
                    console.log(req.session.user);
                    res.redirect("/");
                } else {
                    res.render('editarProyecto', { 
                        title: "Editar Proyecto", 
                        usuario: req.session.user,
                        lista: result[0] 
                    });
                }
            });
        });
    } else {
        res.redirect("/");
    }
});

/*** LISTO ***/
router.post('/validation', function(req, res) {

    var con = mysql.createConnection(config());

    var user = req.body.user;
    var passwd = req.body.passwd;
    
    con.connect(function(err) {
        if (err) console.log(err);
        else console.log("CONECTADO!");
    
        var sql = 'SELECT id_usuario, nombres, apellido_paterno, usuario, clave from usuario';

        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }else{
                var resultado = result;
                if(resultado.length > 0){
                    for (let i = 0; i < resultado.length; i++) {
                        var valor = resultado[i];
                        if( user == valor.usuario && bcrypt.compareSync(passwd, valor.clave)){
                            req.session.user = { nombre: valor.nombres , apellido: valor.apellido_paterno , id: valor.id_usuario };
                            console.log("Acceso concedido");
                        }
                    }
                }
                if(!req.session.user){
                    res.redirect("/");
                } else {
                    res.redirect('/inicio');
                }
            }
        });
        con.end();
    });
});

/*** LISTO ***/
router.post("/validation/new-user", function (req,res) {

    var con = mysql.createConnection(config());

    var tipo_documento = req.body.tipo_documento;
    var documento_identidad = req.body.documento_identidad;
    var nombres = req.body.nombres;
    var apellido_paterno = req.body.apellido_paterno;
    var apellido_materno = req.body.apellido_materno;
    var genero = req.body.genero;
    var pais = req.body.pais;
    var departamento = req.body.departamento;
    var provincia = req.body.provincia;
    var distrito = req.body.distrito;
    var direccion = req.body.direccion;
    var fecha_nacimiento = req.body.fecha_nacimiento;
    var telefono_movil = req.body.telefono_movil;
    var telefono_fijo = req.body.telefono_fijo;
    var email = req.body.email;
    var email2 = req.body.email2;
    var estatus = req.body.estatus;
    var usuario = req.body.email;
    var clave = bcrypt.hashSync(req.body.clave,10);
    
    con.connect(function(err) {
        if (err) throw err;
        else console.log("CONECTADO!");

        var sql = "INSERT INTO usuario (tipo_documento, documento_identidad, nombres, apellido_paterno, apellido_materno, genero, pais, departamento, provincia, distrito, direccion, fecha_nacimiento, telefono_movil, telefono_fijo, email, email2, estatus, usuario, clave) VALUES (?)";
        
        var values = [tipo_documento, documento_identidad, nombres, apellido_paterno, apellido_materno, genero, pais, departamento, provincia, distrito, direccion, fecha_nacimiento, telefono_movil, telefono_fijo, email, email2, estatus, usuario, clave];

        con.query(sql, [values], function (err, result) {
            if (err) {
                console.log(err);
            }else{
                req.session.user = usuario;
                console.log("Acceso concedido");
            }
            if(!req.session.user){
                console.log(req.session.user);
                res.redirect("/");
            } else {
                res.redirect('/inicio');
            }
        });
        con.end();
    });
});

/*** EN PROCESO ***/
router.post('/validation/nuevo', function(req, res) {
    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) console.log(err);
        
            var sql =  `INSERT INTO proyecto (id_usuario, titulo) VALUES ( ? , ? )`;
            var sql2 = `INSERT INTO datos_generales (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) as id FROM proyecto) )`;

            var values = [ req.session.user.id , req.body.titulo ];
            con.query(sql, values, function (err, result) {
                if (err) { console.log(err); return; }
            });
            con.query(sql2, function (err, result) {
                if (err) { console.log(err); return; }
                res.redirect('/administrar');
            }); 
            con.end();
        });
    } else {
        res.redirect("/");
    }
});

/*** EN PROCESO ***/
router.post('/validation/editar-proyecto', function(req, res) {
    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) console.log(err);
        
            var sql = `UPDATE proyecto SET titulo = ? WHERE id_proyecto = ?`;

            var sql2 = `UPDATE datos_generales
                SET palabras_clave = ?, ai_area = ?, ai_subarea = ?, ai_tematica = ?, aplicacion_area = ?, aplicacion_subarea = ?, loc_departamento = ?, loc_provincia = ?, loc_distrito = ?, loc_ubigeo = ?, duracion_proyecto = ?, fecha_estimada_inicio = ?
                WHERE id_proyecto = ?
            `;
            
            var id = req.body.id_proyecto;

            var proyecto = [
                req.body.titulo,
                id
            ];
            
            var datos_generales = [
                req.body.palabrasClave,
                req.body.area_innovacion_area,
                req.body.area_innovacion_subarea,
                req.body.area_innovacion_tematica,
                req.body.aplicacion_area,
                req.body.aplicacion_subarea,
                req.body.localizacion_departamento,
                req.body.localizacion_provincia,
                req.body.localizacion_distrito,
                req.body.localizacion_ubigeo,
                req.body.duracionDelProyecto,
                req.body.fechaEstimadaDeInicioDelProyecto,
                id
            ];
            con.query(sql, proyecto, function (err, result) {
                if (err) { console.log(err); return; }
            });
            con.query(sql2, datos_generales, function (err, result) {
                if (err) { console.log(err); return; }
                res.redirect('/administrar');
            }); 
            con.end();
        });
    } else {
        res.redirect("/");
    }
});

/*** LISTO NO MODIFICADO ***/
router.get('/validation', function(req,res){
    res.redirect("/");
});
/*** LISTO NO MODIFICADO ***/
router.get('/validation/cargar-proyecto', function(req,res){
    res.redirect("/");
});
/*** LISTO NO MODIFICADO ***/
router.get('/validation/new-user', function(req,res){
    res.redirect("/");
});

/*** MODIFICAR ***/
router.post('/visualizar', function(req, res, next) {
    if(req.session.user){
        
        var conversion = require("phantom-html-to-pdf")();
        var pdf = require('../models/pdf').pdf;
        
        if (con) con.destroy();
        var con = mysql.createConnection(config());

        var sql = `SELECT usuario.*, proyecto.*, datos_generales.*
        FROM proyecto INNER JOIN usuario 
        ON usuario.id_usuario = ? AND proyecto.id_proyecto = ?
        INNER JOIN datos_generales ON datos_generales.id_proyecto = proyecto.id_proyecto`;
        
        var values = [ req.session.user.id, req.body.idproyecto];

        con.connect(function(err) {
            if (err) console.log(err);
            else console.log("CONECTADO!");
            con.query(sql, values, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                if(!req.session.user){
                    console.log(req.session.user);
                    res.redirect("/");
                } else {
                    conversion({ html: pdf(result[0]) }, 
                    function(err, pdf) {
                        if  (err) console.log(err);
                        console.log("Documento generado con " + pdf.numberOfPages+ " paginas.");
                        res.setHeader('content-type', 'application/pdf');
                        pdf.stream.pipe(res);
                    });
                }
            });
            con.end();
        });
    } else {
        res.redirect("/");
    }
});


module.exports = router;