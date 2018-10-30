var express = require('express');
var router = express.Router();
var config = require('../models/database').config;
var mysql = require('mysql');




router.get('/docentes/facultad', function(req, res) {
        
    if (con) con.destroy();
    var con = mysql.createConnection(config());

    var sql = `SELECT concat(nombres," ",apellidos) as nombre, categoria, dedicacion, id_docente as id from docente where facultad = 1`;

    con.connect(function(err) {
        if (err) console.log(err);

        con.query(sql, function (err, result) {
            if (err) console.log(err);
            res.render('docentesPublic', 
                { title: 'Universidad jfsc',
                tipoDocente: "Facultad", 
                docentes: result ,
                usuario:req.session.user });
        });
    });
});

router.get('/docentes/dina', function(req, res) {
        
    if (con) con.destroy();
    var con = mysql.createConnection(config());

    var sql = `SELECT concat(nombres," ",apellidos) as nombre, categoria, dedicacion, id_docente as id from docente where dina = 1`;

    con.connect(function(err) {
        if (err) console.log(err);

        con.query(sql, function (err, result) {
            if (err) console.log(err);
            res.render('docentesPublic', 
                { title: 'Universidad jfsc',
                tipoDocente: "Dina", 
                docentes: result ,
                usuario:req.session.user });
        });
    });
});

router.get('/docentes/regina', function(req, res) {
        
    if (con) con.destroy();
    var con = mysql.createConnection(config());

    var sql = `SELECT concat(nombres," ",apellidos) as nombre, categoria, dedicacion, id_docente as id from docente where regina = 1`;

    con.connect(function(err) {
        if (err) console.log(err);

        con.query(sql, function (err, result) {
            if (err) console.log(err);
            res.render('docentesPublic', 
                { title: 'Universidad jfsc',
                tipoDocente: "Regina", 
                docentes: result ,
                usuario:req.session.user });
        });
    });
});




router.get('/proyectos/2018', function(req, res) {

    if (con) con.destroy();
    var con = mysql.createConnection(config());

    var sql = `select
    proyecto.id_proyecto as codigo
    , proyecto.titulo as titulo
    , proyecto.enviado as enviado
    , usuario.id_usuario as id_usuario
    , concat(usuario.nombres," ",usuario.apellido_paterno) as nombre
    , usuario.estatus as status
    , proyecto.fecha_creacion as fecha
    from proyecto
    inner join usuario
    on usuario.id_usuario = proyecto.id_usuario
    where proyecto.fecha_creacion < '2019-01-01 00:00:00'
    and proyecto.fecha_creacion > '2018-01-01 00:00:00'
    and proyecto.aprobado = 1`;

    con.connect(function(err) {
        if (err) console.log(err);

        con.query(sql, function (err, result) {
            if (err) console.log(err);
            res.render('proyectosPublic', 
            { title: 'Universidad jfsc', 
            anoProyecto: 2018, 
            proyectos: result, 
            usuario:req.session.user });

        });
    });
});

router.get('/proyectos/2019', function(req, res) {

    if (con) con.destroy();
    var con = mysql.createConnection(config());

    var sql = `select
    proyecto.id_proyecto as codigo
    , proyecto.titulo as titulo
    , proyecto.enviado as enviado
    , usuario.id_usuario as id_usuario
    , concat(usuario.nombres," ",usuario.apellido_paterno) as nombre
    , usuario.estatus as status
    , proyecto.fecha_creacion as fecha
    from proyecto
    inner join usuario
    on usuario.id_usuario = proyecto.id_usuario
    where proyecto.fecha_creacion < '2020-01-01 00:00:00'
    and proyecto.fecha_creacion > '2019-01-01 00:00:00'
    and proyecto.aprobado = 1`;

    con.connect(function(err) {
        if (err) console.log(err);

        con.query(sql, function (err, result) {
            if (err) console.log(err);
            res.render('proyectosPublic', 
            { title: 'Universidad jfsc', 
            anoProyecto: 2019, 
            proyectos: result, 
            usuario:req.session.user });

        });
    });
});

router.get('/proyectos/2020', function(req, res) {

    if (con) con.destroy();
    var con = mysql.createConnection(config());

    var sql = `select
    proyecto.id_proyecto as codigo
    , proyecto.titulo as titulo
    , proyecto.enviado as enviado
    , usuario.id_usuario as id_usuario
    , concat(usuario.nombres," ",usuario.apellido_paterno) as nombre
    , usuario.estatus as status
    , proyecto.fecha_creacion as fecha
    from proyecto
    inner join usuario
    on usuario.id_usuario = proyecto.id_usuario
    where proyecto.fecha_creacion < '2021-01-01 00:00:00'
    and proyecto.fecha_creacion > '2020-01-01 00:00:00'
    and proyecto.aprobado = 1`;

    con.connect(function(err) {
        if (err) console.log(err);

        con.query(sql, function (err, result) {
            if (err) console.log(err);
            res.render('proyectosPublic', 
            { title: 'Universidad jfsc', 
            anoProyecto: 2020, 
            proyectos: result, 
            usuario:req.session.user });

        });
    });
});




router.post('/visualizar', function(req, res, next) {
        
    var conversion = require("phantom-html-to-pdf")();
    var pdf = require('../models/pdf').pdf;
    
    if (con) con.destroy();
    var con = mysql.createConnection(config());

    var sql = ` SELECT    usuario.* , proyecto.* , datos_generales.* , entidades_participantes.* , entidades_asociadas.* , actividades_infraestructura_beneficios.* , fondos_recibidos_del_estado.* , proyectos_financiados_ip.* , competitividad_empresarial.* , diagnostico.* , caracateristicas.* , antecedentes.* , objetivos.* , cronograma.* , impactos.* , recursos_necesarios.* , equipos_bienes.* , honorarios.* , consultorias.* , servicios_de_terceros.* , pasajes_viaticos.* , materiales.* , otros_gastos.* , gastos_de_gestion.* , equipo_formulador.* FROM proyecto  INNER JOIN usuario ON usuario.id_usuario = ? AND proyecto.id_proyecto = ? INNER JOIN datos_generales ON datos_generales.id_proyecto = proyecto.id_proyecto INNER JOIN entidades_participantes ON entidades_participantes.id_proyecto = proyecto.id_proyecto INNER JOIN entidades_asociadas ON entidades_asociadas.id_proyecto = proyecto.id_proyecto INNER JOIN actividades_infraestructura_beneficios ON actividades_infraestructura_beneficios.id_proyecto = proyecto.id_proyecto INNER JOIN fondos_recibidos_del_estado ON fondos_recibidos_del_estado.id_proyecto = proyecto.id_proyecto INNER JOIN proyectos_financiados_ip ON proyectos_financiados_ip.id_proyecto = proyecto.id_proyecto INNER JOIN competitividad_empresarial ON competitividad_empresarial.id_proyecto = proyecto.id_proyecto INNER JOIN diagnostico ON diagnostico.id_proyecto = proyecto.id_proyecto INNER JOIN caracateristicas ON caracateristicas.id_proyecto = proyecto.id_proyecto INNER JOIN antecedentes ON antecedentes.id_proyecto = proyecto.id_proyecto INNER JOIN objetivos ON objetivos.id_proyecto = proyecto.id_proyecto INNER JOIN cronograma ON cronograma.id_proyecto = proyecto.id_proyecto INNER JOIN impactos ON impactos.id_proyecto = proyecto.id_proyecto INNER JOIN recursos_necesarios ON recursos_necesarios.id_proyecto = proyecto.id_proyecto INNER JOIN equipos_bienes ON equipos_bienes.id_proyecto = proyecto.id_proyecto INNER JOIN honorarios ON honorarios.id_proyecto = proyecto.id_proyecto INNER JOIN consultorias ON consultorias.id_proyecto = proyecto.id_proyecto INNER JOIN servicios_de_terceros ON servicios_de_terceros.id_proyecto = proyecto.id_proyecto INNER JOIN pasajes_viaticos ON pasajes_viaticos.id_proyecto = proyecto.id_proyecto INNER JOIN materiales ON materiales.id_proyecto = proyecto.id_proyecto INNER JOIN otros_gastos ON otros_gastos.id_proyecto = proyecto.id_proyecto INNER JOIN gastos_de_gestion ON gastos_de_gestion.id_proyecto = proyecto.id_proyecto INNER JOIN equipo_formulador ON equipo_formulador.id_proyecto = proyecto.id_proyecto`;
    
    var values = [ req.body.id_usuario, req.body.id_proyecto];

    con.connect(function(err) {
        if (err) console.log(err);

        con.query(sql, values, function (err, result) {
            if (err) console.log(err);

                lista=result[0]
                conversion({ html: pdf(lista) }, 
                function(err, pdf) {
                    if  (err) console.log(err);
                    console.log("Documento generado con " + pdf.numberOfPages+ " paginas.");
                    res.setHeader('content-type', 'application/pdf');
                    pdf.stream.pipe(res);
                });
            });
        con.end();
    });
});

module.exports = router;