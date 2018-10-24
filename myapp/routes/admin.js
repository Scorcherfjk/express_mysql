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

    res.render('indexAdmin', { title: 'Universidad jfsc' });

});

router.post('/', function(req, res, next) {
    
    var user = req.body.user;
    var passwd = req.body.passwd;

    if( user == "admin" && passwd == 1){
        req.session.user = { nombre: "user" , apellido: "admin" , id: 1 };
        console.log("Acceso concedido");
    }
    if(!req.session.user){
        res.redirect("/useradmin");
    } else {
        res.redirect("inicio");
    }
});

router.get('/inicio', function(req, res) {
    if(!req.session.user){
        res.redirect("/useradmin");
    } else {
        res.render('inicioAdmin', { title: 'Universidad jfsc', usuario:req.session.user });
    }
});




router.get('/docentes/facultad', function(req, res) {
    if(req.session.user){
        
        if (con) con.destroy();
        var con = mysql.createConnection(config());

        var sql = `SELECT concat(nombres," ",apellidos) as nombre, categoria, dedicacion, id_docente as id from docente where facultad = 1`;

        con.connect(function(err) {
            if (err) console.log(err);

            con.query(sql, function (err, result) {
                if (err) console.log(err);
                res.render('docentes', 
                    { title: 'Universidad jfsc',
                    tipoDocente: "Facultad", 
                    docentes: result ,
                    usuario:req.session.user });
            });
        });
    } else {
        res.redirect("/useradmin");
    }
});

router.get('/docentes/dina', function(req, res) {
    if(req.session.user){
        
        if (con) con.destroy();
        var con = mysql.createConnection(config());

        var sql = `SELECT concat(nombres," ",apellidos) as nombre, categoria, dedicacion, id_docente as id from docente where dina = 1`;

        con.connect(function(err) {
            if (err) console.log(err);

            con.query(sql, function (err, result) {
                if (err) console.log(err);
                res.render('docentes', 
                    { title: 'Universidad jfsc',
                    tipoDocente: "Dina", 
                    docentes: result ,
                    usuario:req.session.user });
            });
        });
    } else {
        res.redirect("/useradmin");
    }
});

router.get('/docentes/regina', function(req, res) {
    if(req.session.user){
        
        if (con) con.destroy();
        var con = mysql.createConnection(config());

        var sql = `SELECT concat(nombres," ",apellidos) as nombre, categoria, dedicacion, id_docente as id from docente where regina = 1`;

        con.connect(function(err) {
            if (err) console.log(err);

            con.query(sql, function (err, result) {
                if (err) console.log(err);
                res.render('docentes', 
                    { title: 'Universidad jfsc',
                    tipoDocente: "Regina", 
                    docentes: result ,
                    usuario:req.session.user });
            });
        });
    } else {
        res.redirect("/useradmin");
    }
});




router.get('/proyectos/2018', function(req, res) {

    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        var sql = `select
        proyecto.id_proyecto as codigo
        , proyecto.titulo as titulo
        , concat(usuario.nombres," ",usuario.apellido_paterno) as nombre
        , usuario.estatus as status
        , proyecto.fecha_creacion as fecha
        , "no" as descarga
        from proyecto
        inner join usuario
        on usuario.id_usuario = proyecto.id_usuario
        where proyecto.fecha_creacion < '2019-01-01 00:00:00'
        and proyecto.fecha_creacion > '2018-01-01 00:00:00'`;

        con.connect(function(err) {
            if (err) console.log(err);

            con.query(sql, function (err, result) {
                if (err) console.log(err);
                res.render('proyectos', 
                { title: 'Universidad jfsc', 
                anoProyecto: 2018, 
                proyectos: result, 
                usuario:req.session.user });
    
            });
        });
    } else {
        res.redirect("/useradmin");
    }
});

router.get('/proyectos/2019', function(req, res) {

    if(req.session.user){
        
        if (con) con.destroy();
        var con = mysql.createConnection(config());

        var sql = `select
        proyecto.id_proyecto as codigo
        , proyecto.titulo as titulo
        , concat(usuario.nombres," ",usuario.apellido_paterno) as nombre
        , usuario.estatus as status
        , proyecto.fecha_creacion as fecha
        , "no" as descarga
        from proyecto
        inner join usuario
        on usuario.id_usuario = proyecto.id_usuario
        where proyecto.fecha_creacion < '2020-01-01 00:00:00'
        and proyecto.fecha_creacion > '2019-01-01 00:00:00'`;

        con.connect(function(err) {
            if (err) console.log(err);

            con.query(sql, function (err, result) {
                if (err) console.log(err);
                res.render('proyectos', 
                { title: 'Universidad jfsc', 
                anoProyecto: 2019, 
                proyectos: result, 
                usuario:req.session.user });
    
            });
        });
    } else {
        res.redirect("/useradmin");
    }
});

router.get('/proyectos/2020', function(req, res) {

    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        var sql = `select
        proyecto.id_proyecto as codigo
        , proyecto.titulo as titulo
        , concat(usuario.nombres," ",usuario.apellido_paterno) as nombre
        , usuario.estatus as status
        , proyecto.fecha_creacion as fecha
        , "no" as descarga
        from proyecto
        inner join usuario
        on usuario.id_usuario = proyecto.id_usuario
        where proyecto.fecha_creacion < '2021-01-01 00:00:00'
        and proyecto.fecha_creacion > '2020-01-01 00:00:00'`;

        con.connect(function(err) {
            if (err) console.log(err);

            con.query(sql, function (err, result) {
                if (err) console.log(err);
                res.render('proyectos', 
                { title: 'Universidad jfsc', 
                anoProyecto: 2020, 
                proyectos: result, 
                usuario:req.session.user });
    
            });
        });
    } else {
        res.redirect("/useradmin");
    }
});




router.get('/docentes/ingresar', function(req, res) {

    if(!req.session.user){
        res.redirect("/useradmin");
    } else {
        res.render('ingresarAdmin', { title: 'Universidad jfsc', usuario:req.session.user });
    }
});

router.post('/docentes/ingresar', function(req, res) {

    if(!req.session.user){
        res.redirect("/useradmin");
    } else {
        var con = mysql.createConnection(config());
        
        con.connect(function(err) {
            if (err) throw err;

            var sql = "INSERT INTO unjfsc.docente (tipo_documento, documento_identidad, nombres, apellidos, genero, fecha_nacimiento, categoria, dedicacion, facultad, dina, regina, pais, departamento, provincia, distrito, direccion, email, telefono_movil, telefono_fijo) VALUES (?)";
            var values = [ req.body.tipo_documento, req.body.documento_identidad, req.body.nombres, req.body.apellidos, req.body.genero, req.body.fecha_nacimiento, req.body.categoria, req.body.dedicacion, req.body.facultad, req.body.dina, req.body.regina, req.body.pais, req.body.departamento, req.body.provincia, req.body.distrito, req.body.direccion, req.body.email, req.body.telefono_movil, req.body.telefono_fijo ];

            con.query(sql, [values], function (err, result) {
                if (err) console.log(err);
                res.redirect("/useradmin/inicio");
            });
            con.end();
        });
    }
});

module.exports = router;