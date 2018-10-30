var express = require('express');
var router = express.Router();
var config = require('../models/database').config;
var bcrypt = require('bcrypt');
var mysql = require('mysql');

var con = mysql.createConnection(config());




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

    if (con) con.destroy();
    var con = mysql.createConnection(config());

    var user = req.body.user;
    var passwd = req.body.passwd;

    con.connect(function(err) {
        if (err) console.log(err);
    
        var sql = 'SELECT id_admin, nombres, apellido, usuario, clave from admin';

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
                            req.session.user = { nombre: valor.nombres , apellido: valor.apellido , id: valor.id_admin };
                            console.log("Acceso concedido");
                        }
                    }
                }
                if(!req.session.user){
                    res.redirect("/useradmin");
                } else {
                    res.redirect("inicio");
                }
            }
        });
        con.end();
    });

});

router.get('/inicio', function(req, res) {
    if(!req.session.user){
        res.redirect("/useradmin");
    } else {
        res.render('inicioAdmin', { title: 'Universidad jfsc', usuario:req.session.user });
    }
});




router.get('/change' ,function(req, res, next) {
    if(req.session.user){
        res.render('changePasswordAdmin', { 
            title: "Cambio de Clave", 
            usuario: req.session.user 
        });
    } else {
        res.redirect("/useradmin");
  }
});

router.post('/change-access' ,function(req, res, next) {
    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) throw err;
    
            var sql = `UPDATE admin SET usuario = ? WHERE id_admin = ?`;
            var newuser = req.body.usuario;
            var usuario = req.session.user.id

            con.query(sql, [newuser, usuario], function (err, result) {
                if (err) {
                    console.log(err);
                }else{
                    res.redirect('/useradmin/inicio');
                }
            });
            con.end();
        });
    } else {
        res.redirect("/useradmin");
    }
});

router.post('/change-password' ,function(req, res, next) {
    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) throw err;
    
            var sql = `UPDATE admin SET clave = ? WHERE id_admin = ?`;
            var clave = bcrypt.hashSync(req.body.clave,10)
            var usuario = req.session.user.id

            con.query(sql, [clave, usuario], function (err, result) {
                if (err) {
                    console.log(err);
                }else{
                    res.redirect('/useradmin/inicio');
                }
            });
            con.end();
        });
    } else {
        res.redirect("/useradmin");
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




router.get('/docentes/modificar', function(req, res) {
    if(req.session.user){
        
        if (con) con.destroy();
        var con = mysql.createConnection(config());

        var sql = `SELECT concat(nombres," ",apellidos) as nombre, categoria, dedicacion, id_docente as id from docente`;

        con.connect(function(err) {
            if (err) console.log(err);

            con.query(sql, function (err, result) {
                if (err) console.log(err);
                res.render('docentes', 
                    { title: 'Universidad jfsc', 
                    docentes: result ,
                    usuario:req.session.user });
            });
        });
    } else {
        res.redirect("/useradmin");
    }
});

router.post('/docentes/modificar', function(req, res) {
    if(req.session.user){
        
        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) console.log(err);

            var sql = 'SELECT  * from docente WHERE id_docente = ? LIMIT 1';
    
            con.query(sql, [req.body.id_docente], function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                if(!req.session.user){
                    console.log(req.session.user);
                    res.redirect("/useradmin");
                } else {
                    res.render('changeDataAdmin', { 
                        title: "Cambio de Datos", 
                        usuario: req.session.user,
                        datos: result[0]
                    });
                }
            });
            con.end();
        });
    } else {
        res.redirect("/useradmin");
    }
});

router.post('/docentes/modificar/change-data' ,function(req, res, next) {
    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) throw err;
    
            var sql = `UPDATE unjfsc.docente SET  tipo_documento=? , documento_identidad=? , nombres=? , apellidos=? , genero=? , fecha_nacimiento=? , categoria=? , dedicacion=? , facultad=? , dina=? , regina=? , pais=? , departamento=? , provincia=? , distrito=? , direccion=? , email=? , telefono_movil=? , telefono_fijo=? WHERE id_docente=?;`;
            var campos = [ req.body.tipo_documento, req.body.documento_identidad, req.body.nombres, req.body.apellidos, req.body.genero, req.body.fecha_nacimiento, req.body.categoria, req.body.dedicacion, req.body.facultad, req.body.dina, req.body.regina, req.body.pais, req.body.departamento, req.body.provincia, req.body.distrito, req.body.direccion, req.body.email, req.body.telefono_movil, req.body.telefono_fijo, req.body.id ];

            con.query(sql, campos, function (err, result) {
                if (err) console.log(err);
                res.redirect('/useradmin/inicio');
            });
            con.end();
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
        , proyecto.enviado as enviado
        , usuario.id_usuario as id_usuario
        , concat(usuario.nombres," ",usuario.apellido_paterno) as nombre
        , usuario.estatus as status
        , proyecto.fecha_creacion as fecha
        , proyecto.aprobado as aprobado
        from proyecto
        inner join usuario
        on usuario.id_usuario = proyecto.id_usuario
        where proyecto.fecha_creacion < '2019-01-01 00:00:00'
        and proyecto.fecha_creacion > '2018-01-01 00:00:00'
        and proyecto.enviado = 1`;

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
        , proyecto.enviado as enviado
        , usuario.id_usuario as id_usuario
        , concat(usuario.nombres," ",usuario.apellido_paterno) as nombre
        , usuario.estatus as status
        , proyecto.fecha_creacion as fecha
        , proyecto.aprobado as aprobado
        from proyecto
        inner join usuario
        on usuario.id_usuario = proyecto.id_usuario
        where proyecto.fecha_creacion < '2020-01-01 00:00:00'
        and proyecto.fecha_creacion > '2019-01-01 00:00:00'
        and proyecto.enviado = 1`;

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
        , proyecto.enviado as enviado
        , usuario.id_usuario as id_usuario
        , concat(usuario.nombres," ",usuario.apellido_paterno) as nombre
        , usuario.estatus as status
        , proyecto.fecha_creacion as fecha
        , proyecto.aprobado as aprobado
        from proyecto
        inner join usuario
        on usuario.id_usuario = proyecto.id_usuario
        where proyecto.fecha_creacion < '2021-01-01 00:00:00'
        and proyecto.fecha_creacion > '2020-01-01 00:00:00'
        and proyecto.enviado = 1`;

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




router.post('/aprobar', function(req, res) {
    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) console.log(err);
    
            var id = req.body.id_proyecto;

            var proyecto_sql = `UPDATE unjfsc.proyecto SET aprobado = ? WHERE id_proyecto = ?`;
            var proyecto = [ req.body.aprobacion, id ]
            con.query(proyecto_sql, proyecto, function (err, result) { 
                if (err) { console.log(err); return; } 
                res.redirect('/userAdmin/proyectos/2018'); 
            });

            con.end();
        });
    } else {
        res.redirect("/userAdmin");
    }
});




router.post('/visualizar', function(req, res, next) {
    if(req.session.user){
        
        var conversion = require("phantom-html-to-pdf")();
        var pdf = require('../models/pdf').pdf;
        
        if (con) con.destroy();
        var con = mysql.createConnection(config());

        var sql = ` SELECT 
        usuario.*
      , proyecto.*
      , datos_generales.*
      , entidades_participantes.*
      , entidades_asociadas.*
      , actividades_infraestructura_beneficios.*
      , fondos_recibidos_del_estado.*
      , proyectos_financiados_ip.*
      , competitividad_empresarial.*
      , diagnostico.*
      , caracateristicas.*
      , antecedentes.*
      , objetivos.*
      , cronograma.*
      , impactos.*
      , recursos_necesarios.*
      , equipos_bienes.*
      , honorarios.*
      , consultorias.*
      , servicios_de_terceros.*
      , pasajes_viaticos.*
      , materiales.*
      , otros_gastos.*
      , gastos_de_gestion.*
      , equipo_formulador.*
      FROM proyecto 
      INNER JOIN usuario ON usuario.id_usuario = ? AND proyecto.id_proyecto = ?
      INNER JOIN datos_generales ON datos_generales.id_proyecto = proyecto.id_proyecto
      INNER JOIN entidades_participantes ON entidades_participantes.id_proyecto = proyecto.id_proyecto
      INNER JOIN entidades_asociadas ON entidades_asociadas.id_proyecto = proyecto.id_proyecto
      INNER JOIN actividades_infraestructura_beneficios ON actividades_infraestructura_beneficios.id_proyecto = proyecto.id_proyecto
      INNER JOIN fondos_recibidos_del_estado ON fondos_recibidos_del_estado.id_proyecto = proyecto.id_proyecto
      INNER JOIN proyectos_financiados_ip ON proyectos_financiados_ip.id_proyecto = proyecto.id_proyecto
      INNER JOIN competitividad_empresarial ON competitividad_empresarial.id_proyecto = proyecto.id_proyecto
      INNER JOIN diagnostico ON diagnostico.id_proyecto = proyecto.id_proyecto
      INNER JOIN caracateristicas ON caracateristicas.id_proyecto = proyecto.id_proyecto
      INNER JOIN antecedentes ON antecedentes.id_proyecto = proyecto.id_proyecto
      INNER JOIN objetivos ON objetivos.id_proyecto = proyecto.id_proyecto
      INNER JOIN cronograma ON cronograma.id_proyecto = proyecto.id_proyecto
      INNER JOIN impactos ON impactos.id_proyecto = proyecto.id_proyecto
      INNER JOIN recursos_necesarios ON recursos_necesarios.id_proyecto = proyecto.id_proyecto
      INNER JOIN equipos_bienes ON equipos_bienes.id_proyecto = proyecto.id_proyecto
      INNER JOIN honorarios ON honorarios.id_proyecto = proyecto.id_proyecto
      INNER JOIN consultorias ON consultorias.id_proyecto = proyecto.id_proyecto
      INNER JOIN servicios_de_terceros ON servicios_de_terceros.id_proyecto = proyecto.id_proyecto
      INNER JOIN pasajes_viaticos ON pasajes_viaticos.id_proyecto = proyecto.id_proyecto
      INNER JOIN materiales ON materiales.id_proyecto = proyecto.id_proyecto
      INNER JOIN otros_gastos ON otros_gastos.id_proyecto = proyecto.id_proyecto
      INNER JOIN gastos_de_gestion ON gastos_de_gestion.id_proyecto = proyecto.id_proyecto
      INNER JOIN equipo_formulador ON equipo_formulador.id_proyecto = proyecto.id_proyecto`;
        
        var values = [ req.body.id_usuario, req.body.id_proyecto];

        con.connect(function(err) {
            if (err) console.log(err);

            con.query(sql, values, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                if(!req.session.user){
                    console.log(req.session.user);
                    res.redirect("/useradmin");
                } else {
                    lista=result[0]
                    conversion({ html: pdf(lista) }, 
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
        res.redirect("/useradmin");
    }
});

module.exports = router;