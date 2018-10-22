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
    
    lista = [
        {nombre:"Mario Perez", categoria:"interno", dedicacion:"part time", cv:"no tiene"},
        {nombre:"luis Perez", categoria:"interno", dedicacion:"part time", cv:"no tiene"},
        {nombre:"Antonio Perez", categoria:"interno", dedicacion:"part time", cv:"no tiene"},
        {nombre:"Manuel Perez", categoria:"interno", dedicacion:"part time", cv:"no tiene"}
    ];
    
    if(!req.session.user){
        res.redirect("/useradmin");
    } else {
        res.render('docentes', { title: 'Universidad jfsc', tipoDocente: "Facultad", docentes: lista, usuario:req.session.user });
    }
});

router.get('/docentes/dina', function(req, res) {

    lista = [
        {nombre:"luis Perez", categoria:"interno", dedicacion:"part time", cv:"no tiene"},
        {nombre:"Mario Perez", categoria:"interno", dedicacion:"part time", cv:"no tiene"},
        {nombre:"Manuel Perez", categoria:"interno", dedicacion:"part time", cv:"no tiene"},
        {nombre:"Antonio Perez", categoria:"interno", dedicacion:"part time", cv:"no tiene"}
    ];

    if(!req.session.user){
        res.redirect("/useradmin");
    } else {
        res.render('docentes', { title: 'Universidad jfsc', tipoDocente: "Dina", docentes: lista, usuario:req.session.user });
    }
});

router.get('/docentes/regina', function(req, res) {

    lista = [
        {nombre:"Antonio Perez", categoria:"interno", dedicacion:"part time", cv:"no tiene"},
        {nombre:"luis Perez", categoria:"interno", dedicacion:"part time", cv:"no tiene"},
        {nombre:"Manuel Perez", categoria:"interno", dedicacion:"part time", cv:"no tiene"},
        {nombre:"Mario Perez", categoria:"interno", dedicacion:"part time", cv:"no tiene"}
    ];

    if(!req.session.user){
        res.redirect("/useradmin");
    } else {
        res.render('docentes', { title: 'Universidad jfsc', tipoDocente: "Regina", docentes: lista, usuario:req.session.user });
    }
});

router.get('/proyectos/2018', function(req, res) {
    
    lista = [
        {codigo:"1234", titulo:"un proyecto", nombre:"Antonio Perez", status:"estudiante", fecha:"2018-05-12", descarga:"no"},
        {codigo:"1235", titulo:"un proyecto", nombre:"luis Perez", status:"estudiante", fecha:"2018-07-12", descarga:"no"},
        {codigo:"1236", titulo:"un proyecto", nombre:"Manuel Perez", status:"estudiante", fecha:"2018-05-24", descarga:"no"},
        {codigo:"1237", titulo:"un proyecto", nombre:"Mario Perez", status:"estudiante", fecha:"2018-06-12", descarga:"no"}
    ];
    
    if(!req.session.user){
        res.redirect("/useradmin");
    } else {
        res.render('proyectos', { title: 'Universidad jfsc', anoProyecto: 2018, proyectos: lista, usuario:req.session.user });
    }
});

router.get('/proyectos/2019', function(req, res) {

    lista = [
        {codigo:"1236", titulo:"un proyecto", nombre:"Manuel Perez", status:"estudiante", fecha:"2019-05-24", descarga:"no"},
        {codigo:"1235", titulo:"un proyecto", nombre:"luis Perez", status:"estudiante", fecha:"2019-07-12", descarga:"no"},
        {codigo:"1234", titulo:"un proyecto", nombre:"Antonio Perez", status:"estudiante", fecha:"2019-05-12", descarga:"no"},
        {codigo:"1237", titulo:"un proyecto", nombre:"Mario Perez", status:"estudiante", fecha:"2019-06-12", descarga:"no"}
    ];

    if(!req.session.user){
        res.redirect("/useradmin");
    } else {
        res.render('proyectos', { title: 'Universidad jfsc', anoProyecto: 2019, proyectos: lista, usuario:req.session.user });
    }
});

router.get('/proyectos/2020', function(req, res) {

    lista = [
        {codigo:"1235", titulo:"un proyecto", nombre:"luis Perez", status:"estudiante", fecha:"2020-07-12", descarga:"no"},
        {codigo:"1234", titulo:"un proyecto", nombre:"Antonio Perez", status:"estudiante", fecha:"2020-05-12", descarga:"no"},
        {codigo:"1236", titulo:"un proyecto", nombre:"Manuel Perez", status:"estudiante", fecha:"2020-05-24", descarga:"no"},
        {codigo:"1237", titulo:"un proyecto", nombre:"Mario Perez", status:"estudiante", fecha:"2020-06-12", descarga:"no"}
    ];

    if(!req.session.user){
        res.redirect("/useradmin");
    } else {
        res.render('proyectos', { title: 'Universidad jfsc', anoProyecto: 2020, proyectos: lista, usuario:req.session.user });
    }
});

module.exports = router;