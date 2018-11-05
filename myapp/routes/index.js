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

            var sql = 'SELECT id_proyecto, titulo, fecha_creacion, enviado from proyecto WHERE id_usuario = ?';
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

/*** LISTO ***/
router.post('/editar-proyecto' ,function(req, res, next) {
    if(req.session.user){
        
        if (con) con.destroy();
        var con = mysql.createConnection(config());

        var sql = `SELECT 
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
      , adjunto.*
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
      INNER JOIN equipo_formulador ON equipo_formulador.id_proyecto = proyecto.id_proyecto
      INNER JOIN adjunto ON adjunto.id_proyecto = proyecto.id_proyecto`;
        
        var values = [ req.session.user.id, req.body.idproyecto, req.body.idproyecto];

        con.connect(function(err) {
            if (err) console.log(err);

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

        var sql = "INSERT INTO  usuario (tipo_documento, documento_identidad, nombres, apellido_paterno, apellido_materno, genero, pais, departamento, provincia, distrito, direccion, fecha_nacimiento, telefono_movil, telefono_fijo, email, email2, estatus, usuario, clave) VALUES (?)";
        
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

/*** LISTO ***/
router.post('/validation/nuevo', function(req, res) {
    if(req.session.user){
        if (req.body.titulo){
            if (con) con.destroy();
            var con = mysql.createConnection(config());

            con.connect(function(err) {
                if (err) console.log(err);
                
                /* 1 PROYECTO */
                var proyecto =  `INSERT INTO  proyecto (id_usuario, titulo, enviado) VALUES ( ? , ?, 0 )`;
                var values = [ req.session.user.id , req.body.titulo ];
                con.query(proyecto, values, function (err, result) { if (err) { console.log(err); return; } });

                /* 2 DATOS GENERALES */
                var datos_generales = `INSERT INTO  datos_generales (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(datos_generales, function (err, result) { if (err) { console.log(err); return; } });

                /* 3 ENTIDADES PARTICIPANTES */
                var entidades_participantes = `INSERT INTO  entidades_participantes (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(entidades_participantes, function (err, result) { if (err) { console.log(err); return; } });

                /* 4 ENTIDADES ASOCIADAS */
                var entidades_asociadas = `INSERT INTO  entidades_asociadas (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(entidades_asociadas, function (err, result) { if (err) { console.log(err); return; } });

                /* 5 TABLAS ACTIVIDADES - INFRAESTRUCTURA - BENEFICIOS */
                var actividades_infraestructura_beneficios = `INSERT INTO  actividades_infraestructura_beneficios (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(actividades_infraestructura_beneficios, function (err, result) { if (err) { console.log(err); return; } });

                /* 6 TABLAS FONDOS RECIBIDOS DEL ESTADO */
                var fondos_recibidos_del_estado = `INSERT INTO  fondos_recibidos_del_estado (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(fondos_recibidos_del_estado, function (err, result) { if (err) { console.log(err); return; } });
                

                /* 7 TABLA PROYECTO FINANCIADOS INNOVATE PERU */
                var proyectos_financiados_ip = `INSERT INTO  proyectos_financiados_ip (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(proyectos_financiados_ip, function (err, result) { if (err) { console.log(err); return; } });

                /* 8 COMPETITIVIDAD EMPRESARIAL */
                var competitividad_empresarial = `INSERT INTO  competitividad_empresarial (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(competitividad_empresarial, function (err, result) { if (err) { console.log(err); return; } });

                /* 9 DIAGNOSTICO */
                var diagnostico = `INSERT INTO  diagnostico (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(diagnostico, function (err, result) { if (err) { console.log(err); return; } });

                /* 10 CARACTERISTICAS */
                var caracateristicas = `INSERT INTO  caracateristicas (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(caracateristicas, function (err, result) { if (err) { console.log(err); return; } });

                /* 11 ANTECEDENTES */
                var antecedentes = `INSERT INTO  antecedentes (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(antecedentes, function (err, result) { if (err) { console.log(err); return; } });
                
                /* 12 OBJETIVOS */
                var objetivos = `INSERT INTO  objetivos (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(objetivos, function (err, result) { if (err) { console.log(err); return; } });

                /* 13 CRONOGRAMA */
                var cronograma = `INSERT INTO  cronograma (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(cronograma, function (err, result) { if (err) { console.log(err); return; } });

                /* 14 IMPACTOS */
                var impactos = `INSERT INTO  impactos (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(impactos, function (err, result) { if (err) { console.log(err); return; } });

                /* 15 RECURSOS NECESARIOS */
                var recursos_necesarios = `INSERT INTO  recursos_necesarios (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(recursos_necesarios, function (err, result) { if (err) { console.log(err); return; } });

                /* 16 EQUIPOS Y BIENES */
                var equipos_bienes = `INSERT INTO  equipos_bienes (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(equipos_bienes, function (err, result) { if (err) { console.log(err); return; } });

                /* 17 HONORARIOS */
                var honorarios = `INSERT INTO  honorarios (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(honorarios, function (err, result) { if (err) { console.log(err); return; } });

                /* 18 CONSULTORIAS */
                var consultorias = `INSERT INTO  consultorias (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(consultorias, function (err, result) { if (err) { console.log(err); return; } });

                /* 19 SERVICIOS DE TERCEROS */
                var servicios_de_terceros = `INSERT INTO  servicios_de_terceros (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(servicios_de_terceros, function (err, result) { if (err) { console.log(err); return; } });

                /* 20 PASAJES - VIATICOS */
                var pasajes_viaticos = `INSERT INTO  pasajes_viaticos (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(pasajes_viaticos, function (err, result) { if (err) { console.log(err); return; } });

                /* 21 MATERIALES */
                var materiales = `INSERT INTO  materiales (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(materiales, function (err, result) { if (err) { console.log(err); return; } });

                /* 22 OTROS GASTOS */
                var otros_gastos = `INSERT INTO  otros_gastos (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(otros_gastos, function (err, result) { if (err) { console.log(err); return; } });

                /* 23 GASTOS DE GESTION */
                var gastos_de_gestion = `INSERT INTO  gastos_de_gestion (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(gastos_de_gestion, function (err, result) { if (err) { console.log(err); return; } });

                /* 24 EQUIPO FORMULADOR */
                var equipo_formulador = `INSERT INTO  equipo_formulador (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(equipo_formulador, function (err, result) { if (err) { console.log(err); return; } });

                /* 25 ADJUNTO */
                var adjunto = `INSERT INTO  adjunto (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
                con.query(adjunto, function (err, result) { if (err) { console.log(err); return; }
                    res.redirect('/administrar');
                });

                con.end();
            });
        }else{
            res.redirect('/inicio');
        }
    } else {
        res.redirect("/");
    }
});

/*** LISTO ***/
router.post('/validation/editar-proyecto', function(req, res) {
    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) console.log(err);
    
            var id = req.body.id_proyecto;

            /* 1 PROYECTO */
            var proyecto_sql = `UPDATE  proyecto SET titulo = ?, tipo_moneda = ? WHERE id_proyecto = ?`;
            var proyecto = [ req.body.titulo, req.body.monedaDelProyecto, id ]
            con.query(proyecto_sql, proyecto, function (err, result) { if (err) { console.log(err); return; } });

            /* 2 DATOS GENERALES */
            var datos_generales_sql = `UPDATE  datos_generales SET palabras_clave = ?, ai_area = ?, ai_subarea = ?, ai_tematica = ?, aplicacion_area = ?, aplicacion_subarea = ?, loc_departamento = ?, loc_provincia = ?, loc_distrito = ?, loc_ubigeo = ?, duracion_proyecto = ?, fecha_estimada_inicio = ?, cgp_tipo_documento = ?, cgp_nro_documento = ?, cgp_ruc = ?, cgp_nombre = ?, cgp_fecha_nac = ?, cgp_sexo = ?, cgp_email = ?, cgp_telefono = ?, cgp_celular = ?, cap_tipo_documento = ?, cap_nro_documento = ?, cap_ruc = ?, cap_nombre = ?, cap_fecha_nac = ?, cap_sexo = ?, cap_email = ?, cap_telefono = ?, cap_celular = ? WHERE id_proyecto = ?`;
            var datos_generales = [ req.body.palabrasClave ? req.body.palabrasClave : null, req.body.area_innovacion_area ? req.body.area_innovacion_area : null, req.body.area_innovacion_subarea ? req.body.area_innovacion_subarea : null, req.body.area_innovacion_tematica ? req.body.area_innovacion_tematica : null, req.body.aplicacion_area ? req.body.aplicacion_area : null, req.body.aplicacion_subarea ? req.body.aplicacion_subarea : null, req.body.localizacion_departamento ? req.body.localizacion_departamento : null, req.body.localizacion_provincia ? req.body.localizacion_provincia : null, req.body.localizacion_distrito ? req.body.localizacion_distrito : null, req.body.localizacion_ubigeo ? req.body.localizacion_ubigeo : null, req.body.duracionDelProyecto ? req.body.duracionDelProyecto : null, req.body.fechaEstimadaDeInicioDelProyecto ? req.body.fechaEstimadaDeInicioDelProyecto : null, req.body.cgptipoDeDocumento ? req.body.cgptipoDeDocumento : null, req.body.cgpnumeroDeDocumento ? req.body.cgpnumeroDeDocumento : null, req.body.cgpruc ? req.body.cgpruc : null, req.body.cgpnombresYApellidos ? req.body.cgpnombresYApellidos : null, req.body.cgpfechaDeNacimiento ? req.body.cgpfechaDeNacimiento : null, req.body.cgpsexo ? req.body.cgpsexo : null, req.body.cgpemail ? req.body.cgpemail : null, req.body.cgptelefono ? req.body.cgptelefono : null, req.body.cgpcelular ? req.body.cgpcelular : null, req.body.captipoDeDocumento ? req.body.captipoDeDocumento : null, req.body.capnumeroDeDocumento ? req.body.capnumeroDeDocumento : null, req.body.capruc ? req.body.capruc : null, req.body.capnombresYApellidos ? req.body.capnombresYApellidos : null, req.body.capfechaDeNacimiento ? req.body.capfechaDeNacimiento : null, req.body.capsexo ? req.body.capsexo : null, req.body.capemail ? req.body.capemail : null, req.body.captelefono ? req.body.captelefono : null, req.body.capcelular ? req.body.capcelular : null, id ];
            con.query(datos_generales_sql, datos_generales, function (err, result) { if (err) { console.log(err); return; } }); 

            /* 3 ENTIDADES PARTICIPANTES */
            var entidades_participantes_sql = `UPDATE  entidades_participantes SET es_tipo = ?, es_tamano = ?, es_nro_trabajadores = ?, es_ruc = ?, es_ciiu = ?, es_direccion = ?, es_fecha_constitucion = ?, es_inicio_actividades = ?, es_nro_partida = ?, es_oficina_registral = ?, es_telefono = ?, es_correo = ?, es_pagina_web = ?, es_ventas2016 = ?, es_ventas2017 = ?, rl_tipo_documento = ?, rl_nro_documento = ?, rl_ruc = ?, rl_nombre = ?, rl_sexo = ?, rl_email = ?, rl_telefono = ?, rl_productos_comercializados = ?, rl_actividades_relacionadas = ?, rl_infraestructura_es = ? WHERE id_proyecto = ?`;
            var entidades_participantes = [ req.body.estipoDeEntidad ? req.body.estipoDeEntidad : null, req.body.estamañoDeLaEmpresa ? req.body.estamañoDeLaEmpresa : null, req.body.esnroDeTrabajadores ? req.body.esnroDeTrabajadores : null, req.body.esrucRazonSocial ? req.body.esrucRazonSocial : null, req.body.esciiu ? req.body.esciiu : null, req.body.esdireccion ? req.body.esdireccion : null, req.body.esfechaDeConstitucion ? req.body.esfechaDeConstitucion : null, req.body.esinicioDeActividades ? req.body.esinicioDeActividades : null, req.body.esnumeroDePartida ? req.body.esnumeroDePartida : null, req.body.esoficinaRegistral ? req.body.esoficinaRegistral : null, req.body.estelefonoCelular ? req.body.estelefonoCelular : null, req.body.esemail ? req.body.esemail : null, req.body.espaginaWeb ? req.body.espaginaWeb : null, req.body.esventas2016 ? req.body.esventas2016 : null, req.body.esventas2017 ? req.body.esventas2017 : null, req.body.rptipoDeDocumento ? req.body.rptipoDeDocumento : null, req.body.rpnumeroDeDocumento ? req.body.rpnumeroDeDocumento : null, req.body.rpruc ? req.body.rpruc : null, req.body.rpnombresYApellidos ? req.body.rpnombresYApellidos : null, req.body.rpsexo ? req.body.rpsexo : null, req.body.rpemail ? req.body.rpemail : null, req.body.rptelefono ? req.body.rptelefono : null, req.body.rpproductosComerciales ? req.body.rpproductosComerciales : null, req.body.rpactividadesRelacionadas ? req.body.rpactividadesRelacionadas : null, req.body.rpinfraestructuraDelSolicitante ? req.body.rpinfraestructuraDelSolicitante : null, id ];
            con.query(entidades_participantes_sql, entidades_participantes, function (err, result) { if (err) { console.log(err); return; } });

            /* 4 ENTIDADES ASOCIADAS */
            var entidades_asociadas_sql = `UPDATE  entidades_asociadas SET a22_1_1 = ?, a22_2_1 = ?, a22_3_1 = ?, a22_4_1 = ?, a22_5_1 = ?, a22_1_2 = ?, a22_2_2 = ?, a22_3_2 = ?, a22_4_2 = ?, a22_5_2 = ?, a22_1_3 = ?, a22_2_3 = ?, a22_3_3 = ?, a22_4_3 = ?, a22_5_3 = ? WHERE id_proyecto = ?`;
            var entidades_asociadas = [ req.body.a22_1_1 ? req.body.a22_1_1 : null , req.body.a22_2_1 ? req.body.a22_2_1 : null , req.body.a22_3_1 ? req.body.a22_3_1 : null , req.body.a22_4_1 ? req.body.a22_4_1 : null , req.body.a22_5_1 ? req.body.a22_5_1 : null , req.body.a22_1_2 ? req.body.a22_1_2 : null , req.body.a22_2_2 ? req.body.a22_2_2 : null , req.body.a22_3_2 ? req.body.a22_3_2 : null , req.body.a22_4_2 ? req.body.a22_4_2 : null , req.body.a22_5_2 ? req.body.a22_5_2 : null , req.body.a22_1_3 ? req.body.a22_1_3 : null , req.body.a22_2_3 ? req.body.a22_2_3 : null , req.body.a22_3_3 ? req.body.a22_3_3 : null , req.body.a22_4_3 ? req.body.a22_4_3 : null , req.body.a22_5_3 ? req.body.a22_5_3 : null , id ];
            con.query(entidades_asociadas_sql, entidades_asociadas, function (err, result) { if (err) { console.log(err); return; } });
            
            /* 5 TABLAS ACTIVIDADES - INFRAESTRUCTURA - BENEFICIOS */
            var actividades_infraestructura_beneficios_sql = `UPDATE  actividades_infraestructura_beneficios SET a31_1_1 = ?, a31_2_1 = ?, a31_1_2 = ?, a31_2_2 = ?, a31_1_3 = ?, a31_2_3 = ?, a32_1_1 = ?, a32_2_1 = ?, a32_1_2 = ?, a32_2_2 = ?, a32_1_3 = ?, a32_2_3 = ?, a33_1_1 = ?, a33_2_1 = ?, a33_1_2 = ?, a33_2_2 = ?, a33_1_3 = ?, a33_2_3 = ? WHERE id_proyecto = ?`;
            var actividades_infraestructura_beneficios  = [ req.body.a31_1_1 ? req.body.a31_1_1 : null, req.body.a31_2_1 ? req.body.a31_2_1 : null, req.body.a31_1_2 ? req.body.a31_1_2 : null, req.body.a31_2_2 ? req.body.a31_2_2 : null, req.body.a31_1_3 ? req.body.a31_1_3 : null, req.body.a31_2_3 ? req.body.a31_2_3 : null, req.body.a32_1_1 ? req.body.a32_1_1 : null, req.body.a32_2_1 ? req.body.a32_2_1 : null, req.body.a32_1_2 ? req.body.a32_1_2 : null, req.body.a32_2_2 ? req.body.a32_2_2 : null, req.body.a32_1_3 ? req.body.a32_1_3 : null, req.body.a32_2_3 ? req.body.a32_2_3 : null, req.body.a33_1_1 ? req.body.a33_1_1 : null, req.body.a33_2_1 ? req.body.a33_2_1 : null, req.body.a33_1_2 ? req.body.a33_1_2 : null, req.body.a33_2_2 ? req.body.a33_2_2 : null, req.body.a33_1_3 ? req.body.a33_1_3 : null, req.body.a33_2_3 ? req.body.a33_2_3 : null, id ];
            con.query( actividades_infraestructura_beneficios_sql, actividades_infraestructura_beneficios, function (err, result) { if (err) { console.log(err); return; } });

            /* 6 TABLAS FONDOS RECIBIDOS DEL ESTADO */
            var fondos_recibidos_del_estado_sql = `UPDATE  fondos_recibidos_del_estado SET a34_1_1 = ?, a34_2_1 = ?, a34_3_1 = ?, a34_4_1 = ?, a34_5_1 = ?, a34_1_2 = ?, a34_2_2 = ?, a34_3_2 = ?, a34_4_2 = ?, a34_5_2 = ?, a34_1_3 = ?, a34_2_3 = ?, a34_3_3 = ?, a34_4_3 = ?, a34_5_3 = ? WHERE id_proyecto = ?`;
            var fondos_recibidos_del_estado = [ req.body.a34_1_1 ? req.body.a34_1_1 : null,req.body.a34_2_1 ? req.body.a34_2_1 : null,req.body.a34_3_1 ? req.body.a34_3_1 : null,req.body.a34_4_1 ? req.body.a34_4_1 : null,req.body.a34_5_1 ? req.body.a34_5_1 : null,req.body.a34_1_2 ? req.body.a34_1_2 : null,req.body.a34_2_2 ? req.body.a34_2_2 : null,req.body.a34_3_2 ? req.body.a34_3_2 : null,req.body.a34_4_2 ? req.body.a34_4_2 : null,req.body.a34_5_2 ? req.body.a34_5_2 : null,req.body.a34_1_3 ? req.body.a34_1_3 : null,req.body.a34_2_3 ? req.body.a34_2_3 : null,req.body.a34_3_3 ? req.body.a34_3_3 : null,req.body.a34_4_3 ? req.body.a34_4_3 : null,req.body.a34_5_3 ? req.body.a34_5_3 : null,id ];
            con.query( fondos_recibidos_del_estado_sql, fondos_recibidos_del_estado, function (err, result) { if (err) { console.log(err); return; } });

            /* 7 TABLA PROYECTO FINANCIADOS INNOVATE PERU */
            var proyectos_financiados_ip_sql = `UPDATE  proyectos_financiados_ip SET a35_1_1 = ?, a35_2_1 = ?, a35_3_1 = ?, a35_4_1 = ?, a35_5_1 = ?, a35_6_1 = ?, a35_7_1 = ?, a35_1_2 = ?, a35_2_2 = ?, a35_3_2 = ?, a35_4_2 = ?, a35_5_2 = ?, a35_6_2 = ?, a35_7_2 = ?, a35_1_3 = ?, a35_2_3 = ?, a35_3_3 = ?, a35_4_3 = ?, a35_5_3 = ?, a35_6_3 = ?, a35_7_3 = ? WHERE id_proyecto = ?`;
            var proyectos_financiados_ip =[ req.body.a35_1_1 ? req.body.a35_1_1 : null, req.body.a35_2_1 ? req.body.a35_2_1 : null, req.body.a35_3_1 ? req.body.a35_3_1 : null, req.body.a35_4_1 ? req.body.a35_4_1 : null, req.body.a35_5_1 ? req.body.a35_5_1 : null, req.body.a35_6_1 ? req.body.a35_6_1 : null, req.body.a35_7_1 ? req.body.a35_7_1 : null, req.body.a35_1_2 ? req.body.a35_1_2 : null, req.body.a35_2_2 ? req.body.a35_2_2 : null, req.body.a35_3_2 ? req.body.a35_3_2 : null, req.body.a35_4_2 ? req.body.a35_4_2 : null, req.body.a35_5_2 ? req.body.a35_5_2 : null, req.body.a35_6_2 ? req.body.a35_6_2 : null, req.body.a35_7_2 ? req.body.a35_7_2 : null, req.body.a35_1_3 ? req.body.a35_1_3 : null, req.body.a35_2_3 ? req.body.a35_2_3 : null, req.body.a35_3_3 ? req.body.a35_3_3 : null, req.body.a35_4_3 ? req.body.a35_4_3 : null, req.body.a35_5_3 ? req.body.a35_5_3 : null, req.body.a35_6_3 ? req.body.a35_6_3 : null, req.body.a35_7_3 ? req.body.a35_7_3 : null, id ];
            con.query( proyectos_financiados_ip_sql, proyectos_financiados_ip, function (err, result) { if (err) { console.log(err); return; } });


            /* 8 COMPETITIVIDAD EMPRESARIAL */
            var competitividad_empresarial_sql = `UPDATE  competitividad_empresarial SET entorno_empresarial = ?, situacion_actual = ?, identificacion_mercado = ?, competidores = ?, modelo_negocio = ?, capacidad_financiera = ?, rentabilidad_economica = ? WHERE id_proyecto = ?`;
            var competitividad_empresarial = [ req.body.entornoEmpresarial ? req.body.entornoEmpresarial : null, req.body.situacionActual ? req.body.situacionActual : null, req.body.identificacionDelMercado ? req.body.identificacionDelMercado : null, req.body.competidores ? req.body.competidores : null, req.body.modeloDeNegocio ? req.body.modeloDeNegocio : null, req.body.capacidadFinanciera ? req.body.capacidadFinanciera : null, req.body.rentabilidadEconomica ? req.body.rentabilidadEconomica : null, id ];
            con.query(competitividad_empresarial_sql, competitividad_empresarial, function (err, result) {  if (err) { console.log(err); return; } });

            /* 9 DIAGNOSTICO */
            var diagnostico_sql = `UPDATE  diagnostico SET problemas_identificados = ? , consecuencias_efectos = ? , causas = ? , tipo_innovacion = ? , funcion_innovacion = ? , tecnologia = ? , forma_resultado = ? WHERE id_proyecto = ?`;
            var diagnostico = [ req.body.problemaIdentificado ? req.body.problemaIdentificado : null, req.body.consecuenciasEfectos ? req.body.consecuenciasEfectos : null, req.body.causas ? req.body.causas : null, req.body.tipoDeInnovacion ? req.body.tipoDeInnovacion : null, req.body.describirFuncion ? req.body.describirFuncion : null, req.body.describirTecnologia ? req.body.describirTecnologia : null, req.body.describirForma ? req.body.describirForma : null,  id ];
            con.query(diagnostico_sql, diagnostico, function (err, result) { if (err) { console.log(err); return; } });

            /* 10 CARACTERISTICAS */
            var caracateristicas_sql = `UPDATE  caracateristicas SET c2_1_1 = ? , c2_2_1 = ? , c2_3_1 = ? , c2_4_1 = ? , c2_5_1 = ? , c2_1_2 = ? , c2_2_2 = ? , c2_3_2 = ? , c2_4_2 = ? , c2_5_2 = ? , c2_1_3 = ? , c2_2_3 = ? , c2_3_3 = ? , c2_4_3 = ? , c2_5_3 = ? WHERE id_proyecto = ?`;
            var caracateristicas = [ req.body.c2_1_1 ? req.body.c2_1_1 : null, req.body.c2_2_1 ? req.body.c2_2_1 : null, req.body.c2_3_1 ? req.body.c2_3_1 : null, req.body.c2_4_1 ? req.body.c2_4_1 : null, req.body.c2_5_1 ? req.body.c2_5_1 : null, req.body.c2_1_2 ? req.body.c2_1_2 : null, req.body.c2_2_2 ? req.body.c2_2_2 : null, req.body.c2_3_2 ? req.body.c2_3_2 : null, req.body.c2_4_2 ? req.body.c2_4_2 : null, req.body.c2_5_2 ? req.body.c2_5_2 : null, req.body.c2_1_3 ? req.body.c2_1_3 : null, req.body.c2_2_3 ? req.body.c2_2_3 : null, req.body.c2_3_3 ? req.body.c2_3_3 : null, req.body.c2_4_3 ? req.body.c2_4_3 : null, req.body.c2_5_3 ? req.body.c2_5_3 : null, id ];
            con.query(caracateristicas_sql, caracateristicas, function (err, result) { if (err) { console.log(err); return; } });

            /* 11 ANTECEDENTES */
            var antecedentes_sql = `UPDATE  antecedentes SET antecedentes = ? , tipo_conocimiento = ? , plan_metodologico = ? , propiedad_intelectual = ? WHERE id_proyecto = ?`;
            var antecedentes = [ req.body.antecedentes ? req.body.antecedentes : null , req.body.libreRestrigido ? req.body.libreRestrigido : null , req.body.planMetodologico ? req.body.planMetodologico : null , req.body.propiedadIntelectual ? req.body.propiedadIntelectual : null , id ];
            con.query(antecedentes_sql, antecedentes, function (err, result) { if (err) { console.log(err); return; } });

            /* 12 OBJETIVOS */
            var objetivos_sql = `UPDATE  objetivos SET c41og_1   = ? , c41og_2   = ? , c41og_3   = ? , c41oe_1_1 = ? , c41oe_2_1 = ? , c41oe_3_1 = ? , c41oe_1_2 = ? , c41oe_2_2 = ? , c41oe_3_2 = ? , c41oe_1_3 = ? , c41oe_2_3 = ? , c41oe_3_3 = ? , c41oe_1_4 = ? , c41oe_2_4 = ? , c41oe_3_4 = ? , c41oe_1_5 = ? , c41oe_2_5 = ? , c41oe_3_5 = ? WHERE id_proyecto = ?`;
            var objetivos = [ req.body.c41og_1   ? req.body.c41og_1   : null, req.body.c41og_2   ? req.body.c41og_2   : null, req.body.c41og_3   ? req.body.c41og_3   : null, req.body.c41oe_1_1 ? req.body.c41oe_1_1 : null, req.body.c41oe_2_1 ? req.body.c41oe_2_1 : null, req.body.c41oe_3_1 ? req.body.c41oe_3_1 : null, req.body.c41oe_1_2 ? req.body.c41oe_1_2 : null, req.body.c41oe_2_2 ? req.body.c41oe_2_2 : null, req.body.c41oe_3_2 ? req.body.c41oe_3_2 : null, req.body.c41oe_1_3 ? req.body.c41oe_1_3 : null, req.body.c41oe_2_3 ? req.body.c41oe_2_3 : null, req.body.c41oe_3_3 ? req.body.c41oe_3_3 : null, req.body.c41oe_1_4 ? req.body.c41oe_1_4 : null, req.body.c41oe_2_4 ? req.body.c41oe_2_4 : null, req.body.c41oe_3_4 ? req.body.c41oe_3_4 : null, req.body.c41oe_1_5 ? req.body.c41oe_1_5 : null, req.body.c41oe_2_5 ? req.body.c41oe_2_5 : null, req.body.c41oe_3_5 ? req.body.c41oe_3_5 : null, id ];
            con.query(objetivos_sql, objetivos, function (err, result) { if (err) { console.log(err); return; } });

            /* 13 CRONOGRAMA */
            var cronograma_sql = `UPDATE  cronograma SET c42_1_1= ? , c42_2_1= ? , c42_3_1= ? , c42_4_1= ? , c42_5_1= ? , c42_6_1= ? , c42_7_1= ? , c42_8_1= ? , c42_9_1= ? , c42_1_2= ? , c42_2_2= ? , c42_3_2= ? , c42_4_2= ? , c42_5_2= ? , c42_6_2= ? , c42_7_2= ? , c42_8_2= ? , c42_9_2= ? , c42_1_3= ? , c42_2_3= ? , c42_3_3= ? , c42_4_3= ? , c42_5_3= ? , c42_6_3= ? , c42_7_3= ? , c42_8_3= ? , c42_9_3= ? , c42_1_4= ? , c42_2_4= ? , c42_3_4= ? , c42_4_4= ? , c42_5_4= ? , c42_6_4= ? , c42_7_4= ? , c42_8_4= ? , c42_9_4= ? , c42_1_5= ? , c42_2_5= ? , c42_3_5= ? , c42_4_5= ? , c42_5_5= ? , c42_6_5= ? , c42_7_5= ? , c42_8_5= ? , c42_9_5= ? , c42_1_6= ? , c42_2_6= ? , c42_3_6= ? , c42_4_6= ? , c42_5_6= ? , c42_6_6= ? , c42_7_6= ? , c42_8_6= ? , c42_9_6= ? , c42_1_7= ? , c42_2_7= ? , c42_3_7= ? , c42_4_7= ? , c42_5_7= ? , c42_6_7= ? , c42_7_7= ? , c42_8_7= ? , c42_9_7= ? , c42_1_8= ? , c42_2_8= ? , c42_3_8= ? , c42_4_8= ? , c42_5_8= ? , c42_6_8= ? , c42_7_8= ? , c42_8_8= ? , c42_9_8= ? , c42_1_9= ? , c42_2_9= ? , c42_3_9= ? , c42_4_9= ? , c42_5_9= ? , c42_6_9= ? , c42_7_9= ? , c42_8_9= ? , c42_9_9= ? , c42_1_10= ? , c42_2_10= ? , c42_3_10= ? , c42_4_10= ? , c42_5_10= ? , c42_6_10= ? , c42_7_10= ? , c42_8_10= ? , c42_9_10= ?  where  id_proyecto = ?;`;
            var cronograma = [req.body.c42_1_1, req.body.c42_2_1, req.body.c42_3_1, req.body.c42_4_1, req.body.c42_5_1, req.body.c42_6_1, req.body.c42_7_1, req.body.c42_8_1, req.body.c42_9_1, req.body.c42_1_2, req.body.c42_2_2, req.body.c42_3_2, req.body.c42_4_2, req.body.c42_5_2, req.body.c42_6_2, req.body.c42_7_2, req.body.c42_8_2, req.body.c42_9_2, req.body.c42_1_3, req.body.c42_2_3, req.body.c42_3_3, req.body.c42_4_3, req.body.c42_5_3, req.body.c42_6_3, req.body.c42_7_3, req.body.c42_8_3, req.body.c42_9_3, req.body.c42_1_4, req.body.c42_2_4, req.body.c42_3_4, req.body.c42_4_4, req.body.c42_5_4, req.body.c42_6_4, req.body.c42_7_4, req.body.c42_8_4, req.body.c42_9_4, req.body.c42_1_5, req.body.c42_2_5, req.body.c42_3_5, req.body.c42_4_5, req.body.c42_5_5, req.body.c42_6_5, req.body.c42_7_5, req.body.c42_8_5, req.body.c42_9_5, req.body.c42_1_6, req.body.c42_2_6, req.body.c42_3_6, req.body.c42_4_6, req.body.c42_5_6, req.body.c42_6_6, req.body.c42_7_6, req.body.c42_8_6, req.body.c42_9_6, req.body.c42_1_7, req.body.c42_2_7, req.body.c42_3_7, req.body.c42_4_7, req.body.c42_5_7, req.body.c42_6_7, req.body.c42_7_7, req.body.c42_8_7, req.body.c42_9_7, req.body.c42_1_8, req.body.c42_2_8, req.body.c42_3_8, req.body.c42_4_8, req.body.c42_5_8, req.body.c42_6_8, req.body.c42_7_8, req.body.c42_8_8, req.body.c42_9_8, req.body.c42_1_9, req.body.c42_2_9, req.body.c42_3_9, req.body.c42_4_9, req.body.c42_5_9, req.body.c42_6_9, req.body.c42_7_9, req.body.c42_8_9, req.body.c42_9_9, req.body.c42_1_10, req.body.c42_2_10, req.body.c42_3_10, req.body.c42_4_10, req.body.c42_5_10, req.body.c42_6_10, req.body.c42_7_10, req.body.c42_8_10, req.body.c42_9_10, id];
            con.query(cronograma_sql, cronograma, function (err, result) { if (err) { console.log(err); return; } });

            /* 14 IMPACTOS */
            var impactos_sql = `UPDATE  impactos SET impactos_economicos = ?, impactos_sociales = ?, impactos_formacion = ?, potencialidad = ?, impactos_tecnologico = ?, impactos_ambientales = ?, medidas_mitigacion = ?, impactos_empresa = ? WHERE id_proyecto = ?`;
            var impactos = [ req.body.impactosEconomicos ? req.body.impactosEconomicos : null, req.body.impactosSociales ? req.body.impactosSociales : null, req.body.impactosEnLaFormacion ? req.body.impactosEnLaFormacion : null, req.body.pontencialidad ? req.body.pontencialidad : null, req.body.impactosDeLaTecnologia ? req.body.impactosDeLaTecnologia : null, req.body.impactosAmbientales ? req.body.impactosAmbientales : null, req.body.medidasDeMitigacion ? req.body.medidasDeMitigacion : null, req.body.impactosEnLaEmpresa ? req.body.impactosEnLaEmpresa : null, id ];
            con.query(impactos_sql, impactos, function (err, result) { if (err) { console.log(err); return; } });

            /* 15 RECURSOS NECESARIOS */
            var recursos_necesarios_sql = `UPDATE  recursos_necesarios SET c8_1_1 =  ? , c8_2_1 =  ? , c8_3_1 =  ? , c8_4_1 =  ? , c8_5_1 =  ? , c8_6_1 =  ? , c8_7_1 =  ? , c8_8_1 =  ? , c8_9_1 =  ? , c8_10_1 = ? , c8_11_1 = ? , c8_1_2 =  ? , c8_2_2 =  ? , c8_3_2 =  ? , c8_4_2 =  ? , c8_5_2 =  ? , c8_6_2 =  ? , c8_7_2 =  ? , c8_8_2 =  ? , c8_9_2 =  ? , c8_10_2 = ? , c8_11_2 = ? , c8_1_3 =  ? , c8_2_3 =  ? , c8_3_3 =  ? , c8_4_3 =  ? , c8_5_3 =  ? , c8_6_3 =  ? , c8_7_3 =  ? , c8_8_3 =  ? , c8_9_3 =  ? , c8_10_3 = ? , c8_11_3 = ? , c8_1_4 =  ? , c8_2_4 =  ? , c8_3_4 =  ? , c8_4_4 =  ? , c8_5_4 =  ? , c8_6_4 =  ? , c8_7_4 =  ? , c8_8_4 =  ? , c8_9_4 =  ? , c8_10_4 = ? , c8_11_4 = ? , c8_1_5 =  ? , c8_2_5 =  ? , c8_3_5 =  ? , c8_4_5 =  ? , c8_5_5 =  ? , c8_6_5 =  ? , c8_7_5 =  ? , c8_8_5 =  ? , c8_9_5 =  ? , c8_10_5 = ? , c8_11_5 = ? WHERE id_proyecto = ?`;
            var recursos_necesarios = [ req.body.c8_1_1 ? req.body.c8_1_1 : null, req.body.c8_2_1 ? req.body.c8_2_1 : null, req.body.c8_3_1 ? req.body.c8_3_1 : null, req.body.c8_4_1 ? req.body.c8_4_1 : null, req.body.c8_5_1 ? req.body.c8_5_1 : null, req.body.c8_6_1 ? req.body.c8_6_1 : null, req.body.c8_7_1 ? req.body.c8_7_1 : null, req.body.c8_8_1 ? req.body.c8_8_1 : null, req.body.c8_9_1 ? req.body.c8_9_1 : null, req.body.c8_10_1 ? req.body.c8_10_1 : null, req.body.c8_11_1 ? req.body.c8_11_1 : null, req.body.c8_1_2 ? req.body.c8_1_2 : null, req.body.c8_2_2 ? req.body.c8_2_2 : null, req.body.c8_3_2 ? req.body.c8_3_2 : null, req.body.c8_4_2 ? req.body.c8_4_2 : null, req.body.c8_5_2 ? req.body.c8_5_2 : null, req.body.c8_6_2 ? req.body.c8_6_2 : null, req.body.c8_7_2 ? req.body.c8_7_2 : null, req.body.c8_8_2 ? req.body.c8_8_2 : null, req.body.c8_9_2 ? req.body.c8_9_2 : null, req.body.c8_10_2 ? req.body.c8_10_2 : null, req.body.c8_11_2 ? req.body.c8_11_2 : null, req.body.c8_1_3 ? req.body.c8_1_3 : null, req.body.c8_2_3 ? req.body.c8_2_3 : null, req.body.c8_3_3 ? req.body.c8_3_3 : null, req.body.c8_4_3 ? req.body.c8_4_3 : null, req.body.c8_5_3 ? req.body.c8_5_3 : null, req.body.c8_6_3 ? req.body.c8_6_3 : null, req.body.c8_7_3 ? req.body.c8_7_3 : null, req.body.c8_8_3 ? req.body.c8_8_3 : null, req.body.c8_9_3 ? req.body.c8_9_3 : null, req.body.c8_10_3 ? req.body.c8_10_3 : null, req.body.c8_11_3 ? req.body.c8_11_3 : null, req.body.c8_1_4 ? req.body.c8_1_4 : null, req.body.c8_2_4 ? req.body.c8_2_4 : null, req.body.c8_3_4 ? req.body.c8_3_4 : null, req.body.c8_4_4 ? req.body.c8_4_4 : null, req.body.c8_5_4 ? req.body.c8_5_4 : null, req.body.c8_6_4 ? req.body.c8_6_4 : null, req.body.c8_7_4 ? req.body.c8_7_4 : null, req.body.c8_8_4 ? req.body.c8_8_4 : null, req.body.c8_9_4 ? req.body.c8_9_4 : null, req.body.c8_10_4 ? req.body.c8_10_4 : null, req.body.c8_11_4 ? req.body.c8_11_4 : null, req.body.c8_1_5 ? req.body.c8_1_5 : null, req.body.c8_2_5 ? req.body.c8_2_5 : null, req.body.c8_3_5 ? req.body.c8_3_5 : null, req.body.c8_4_5 ? req.body.c8_4_5 : null, req.body.c8_5_5 ? req.body.c8_5_5 : null, req.body.c8_6_5 ? req.body.c8_6_5 : null, req.body.c8_7_5 ? req.body.c8_7_5 : null, req.body.c8_8_5 ? req.body.c8_8_5 : null, req.body.c8_9_5 ? req.body.c8_9_5 : null, req.body.c8_10_5 ? req.body.c8_10_5 : null, req.body.c8_11_5 ? req.body.c8_11_5 : null, id ];
            con.query(recursos_necesarios_sql, recursos_necesarios, function (err, result) { if (err) { console.log(err); return; } });

            /* 16 EQUIPOS Y BIENES */ 
            var equipos_bienes_sql = `UPDATE  equipos_bienes SET d11_1_1= ? , d11_3_1= ? , d11_2_1= ? , d11_4_1= ? , d11_5_1= ? , d11_6_1= ? , d11_7_1= ? , d11_8_1= ? , d11_9_1= ? , d11_10_1= ? , d11_11_1= ? , d11_12_1= ? , d11_1_2= ? , d11_2_2= ? , d11_3_2= ? , d11_4_2= ? , d11_5_2= ? , d11_6_2= ? , d11_7_2= ? , d11_8_2= ? , d11_9_2= ? , d11_10_2= ? , d11_11_2= ? , d11_12_2= ? , d11_1_3= ? , d11_2_3= ? , d11_3_3= ? , d11_4_3= ? , d11_5_3= ? , d11_6_3= ? , d11_7_3= ? , d11_8_3= ? , d11_9_3= ? , d11_10_3= ? , d11_11_3= ? , d11_12_3= ? , d11_1_4= ? , d11_2_4= ? , d11_3_4= ? , d11_4_4= ? , d11_5_4= ? , d11_6_4= ? , d11_7_4= ? , d11_8_4= ? , d11_9_4= ? , d11_10_4= ? , d11_11_4= ? , d11_12_4= ? , d11_1_5= ? , d11_2_5= ? , d11_3_5= ? , d11_4_5= ? , d11_5_5= ? , d11_6_5= ? , d11_7_5= ? , d11_8_5= ? , d11_9_5= ? , d11_10_5= ? , d11_11_5= ? , d11_12_5= ? WHERE id_proyecto = ?`;
            var  equipos_bienes = [ req.body.d11_1_1 ? req.body.d11_1_1 : null ,req.body.d11_2_1 ? req.body.d11_2_1 : null ,req.body.d11_3_1 ? req.body.d11_3_1 : null ,req.body.d11_4_1 ? req.body.d11_4_1 : null ,req.body.d11_5_1 ? req.body.d11_5_1 : null ,req.body.d11_6_1 ? req.body.d11_6_1 : null ,req.body.d11_7_1 ? req.body.d11_7_1 : null ,req.body.d11_8_1 ? req.body.d11_8_1 : null ,req.body.d11_9_1 ? req.body.d11_9_1 : null ,req.body.d11_10_1? req.body.d11_10_1 : null ,req.body.d11_11_1? req.body.d11_11_1 : null ,req.body.d11_12_1? req.body.d11_12_1 : null ,req.body.d11_1_2 ? req.body.d11_1_2 : null ,req.body.d11_2_2 ? req.body.d11_2_2 : null ,req.body.d11_3_2 ? req.body.d11_3_2 : null ,req.body.d11_4_2 ? req.body.d11_4_2 : null ,req.body.d11_5_2 ? req.body.d11_5_2 : null ,req.body.d11_6_2 ? req.body.d11_6_2 : null ,req.body.d11_7_2 ? req.body.d11_7_2 : null ,req.body.d11_8_2 ? req.body.d11_8_2 : null ,req.body.d11_9_2 ? req.body.d11_9_2 : null ,req.body.d11_10_2? req.body.d11_10_2 : null ,req.body.d11_11_2? req.body.d11_11_2 : null ,req.body.d11_12_2? req.body.d11_12_2 : null ,req.body.d11_1_3 ? req.body.d11_1_3 : null ,req.body.d11_2_3 ? req.body.d11_2_3 : null ,req.body.d11_3_3 ? req.body.d11_3_3 : null ,req.body.d11_4_3 ? req.body.d11_4_3 : null ,req.body.d11_5_3 ? req.body.d11_5_3 : null ,req.body.d11_6_3 ? req.body.d11_6_3 : null ,req.body.d11_7_3 ? req.body.d11_7_3 : null ,req.body.d11_8_3 ? req.body.d11_8_3 : null ,req.body.d11_9_3 ? req.body.d11_9_3 : null ,req.body.d11_10_3? req.body.d11_10_3 : null ,req.body.d11_11_3? req.body.d11_11_3 : null ,req.body.d11_12_3? req.body.d11_12_3 : null ,req.body.d11_1_4 ? req.body.d11_1_4 : null ,req.body.d11_2_4 ? req.body.d11_2_4 : null ,req.body.d11_3_4 ? req.body.d11_3_4 : null ,req.body.d11_4_4 ? req.body.d11_4_4 : null ,req.body.d11_5_4 ? req.body.d11_5_4 : null ,req.body.d11_6_4 ? req.body.d11_6_4 : null ,req.body.d11_7_4 ? req.body.d11_7_4 : null ,req.body.d11_8_4 ? req.body.d11_8_4 : null ,req.body.d11_9_4 ? req.body.d11_9_4 : null ,req.body.d11_10_4? req.body.d11_10_4 : null ,req.body.d11_11_4? req.body.d11_11_4 : null ,req.body.d11_12_4? req.body.d11_12_4 : null ,req.body.d11_1_5 ? req.body.d11_1_5 : null ,req.body.d11_2_5 ? req.body.d11_2_5 : null ,req.body.d11_3_5 ? req.body.d11_3_5 : null ,req.body.d11_4_5 ? req.body.d11_4_5 : null ,req.body.d11_5_5 ? req.body.d11_5_5 : null ,req.body.d11_6_5 ? req.body.d11_6_5 : null ,req.body.d11_7_5 ? req.body.d11_7_5 : null ,req.body.d11_8_5 ? req.body.d11_8_5 : null ,req.body.d11_9_5 ? req.body.d11_9_5 : null ,req.body.d11_10_5 ? req.body.d11_10_5 : null ,req.body.d11_11_5 ? req.body.d11_11_5 : null ,req.body.d11_12_5 ? req.body.d11_12_5 : null, id ];
            con.query(equipos_bienes_sql, equipos_bienes, function (err, result) { if (err) { console.log(err); return; } });

            /* 17 HONORARIOS */ 
            var honorarios_sql = `UPDATE  honorarios SET d12_1_1= ? , d12_2_1= ? , d12_3_1= ? , d12_4_1= ? , d12_5_1= ? , d12_6_1= ? , d12_7_1= ? , d12_8_1= ? , d12_9_1= ? , d12_10_1= ? , d12_1_2= ? , d12_2_2= ? , d12_3_2= ? , d12_4_2= ? , d12_5_2= ? , d12_6_2= ? , d12_7_2= ? , d12_8_2= ? , d12_9_2= ? , d12_10_2= ? , d12_1_3= ? , d12_2_3= ? , d12_3_3= ? , d12_4_3= ? , d12_5_3= ? , d12_6_3= ? , d12_7_3= ? , d12_8_3= ? , d12_9_3= ? , d12_10_3= ? , d12_1_4= ? , d12_2_4= ? , d12_3_4= ? , d12_4_4= ? , d12_5_4= ? , d12_6_4= ? , d12_7_4= ? , d12_8_4= ? , d12_9_4= ? , d12_10_4= ? , d12_1_5= ? , d12_2_5= ? , d12_3_5= ? , d12_4_5= ? , d12_5_5= ? , d12_6_5= ? , d12_7_5= ? , d12_8_5= ? , d12_9_5= ? , d12_10_5= ? WHERE  id_proyecto= ?;`;
            var honorarios = [ req.body.d12_1_1 ? req.body.d12_1_1 : null ,req.body.d12_2_1 ? req.body.d12_2_1 : null ,req.body.d12_3_1 ? req.body.d12_3_1 : null ,req.body.d12_4_1 ? req.body.d12_4_1 : null ,req.body.d12_5_1 ? req.body.d12_5_1 : null ,req.body.d12_6_1 ? req.body.d12_6_1 : null ,req.body.d12_7_1 ? req.body.d12_7_1 : null ,req.body.d12_8_1 ? req.body.d12_8_1 : null ,req.body.d12_9_1 ? req.body.d12_9_1 : null ,req.body.d12_10_1? req.body.d12_10_1 : null ,req.body.d12_1_2 ? req.body.d12_1_2 : null ,req.body.d12_2_2 ? req.body.d12_2_2 : null ,req.body.d12_3_2 ? req.body.d12_3_2 : null ,req.body.d12_4_2 ? req.body.d12_4_2 : null ,req.body.d12_5_2 ? req.body.d12_5_2 : null ,req.body.d12_6_2 ? req.body.d12_6_2 : null ,req.body.d12_7_2 ? req.body.d12_7_2 : null ,req.body.d12_8_2 ? req.body.d12_8_2 : null ,req.body.d12_9_2 ? req.body.d12_9_2 : null ,req.body.d12_10_2? req.body.d12_10_2 : null ,req.body.d12_1_3 ? req.body.d12_1_3 : null ,req.body.d12_2_3 ? req.body.d12_2_3 : null ,req.body.d12_3_3 ? req.body.d12_3_3 : null ,req.body.d12_4_3 ? req.body.d12_4_3 : null ,req.body.d12_5_3 ? req.body.d12_5_3 : null ,req.body.d12_6_3 ? req.body.d12_6_3 : null ,req.body.d12_7_3 ? req.body.d12_7_3 : null ,req.body.d12_8_3 ? req.body.d12_8_3 : null ,req.body.d12_9_3 ? req.body.d12_9_3 : null ,req.body.d12_10_3? req.body.d12_10_3 : null ,req.body.d12_1_4 ? req.body.d12_1_4 : null ,req.body.d12_2_4 ? req.body.d12_2_4 : null ,req.body.d12_3_4 ? req.body.d12_3_4 : null ,req.body.d12_4_4 ? req.body.d12_4_4 : null ,req.body.d12_5_4 ? req.body.d12_5_4 : null ,req.body.d12_6_4 ? req.body.d12_6_4 : null ,req.body.d12_7_4 ? req.body.d12_7_4 : null ,req.body.d12_8_4 ? req.body.d12_8_4 : null ,req.body.d12_9_4 ? req.body.d12_9_4 : null ,req.body.d12_10_4? req.body.d12_10_4 : null ,req.body.d12_1_5 ? req.body.d12_1_5 : null ,req.body.d12_2_5 ? req.body.d12_2_5 : null ,req.body.d12_3_5 ? req.body.d12_3_5 : null ,req.body.d12_4_5 ? req.body.d12_4_5 : null ,req.body.d12_5_5 ? req.body.d12_5_5 : null ,req.body.d12_6_5 ? req.body.d12_6_5 : null ,req.body.d12_7_5 ? req.body.d12_7_5 : null ,req.body.d12_8_5 ? req.body.d12_8_5 : null ,req.body.d12_9_5 ? req.body.d12_9_5 : null ,req.body.d12_10_5 ? req.body.d12_10_5 : null, id ];
            con.query(honorarios_sql, honorarios, function (err, result) { if (err) { console.log(err); return; } });

            /* 18 CONSULTORIAS */ 
            var consultorias_sql = `UPDATE  consultorias SET d13_1_1=? , d13_2_1=? , d13_3_1=? , d13_4_1=? , d13_5_1=? , d13_6_1=? , d13_7_1=? , d13_8_1=? , d13_9_1=? , d13_1_2=? , d13_2_2=? , d13_3_2=? , d13_4_2=? , d13_5_2=? , d13_6_2=? , d13_7_2=? , d13_8_2=? , d13_9_2=? , d13_1_3=? , d13_2_3=? , d13_3_3=? , d13_4_3=? , d13_5_3=? , d13_6_3=? , d13_7_3=? , d13_8_3=? , d13_9_3=? , d13_1_4=? , d13_2_4=? , d13_3_4=? , d13_4_4=? , d13_5_4=? , d13_6_4=? , d13_7_4=? , d13_8_4=? , d13_9_4=? , d13_1_5=? , d13_2_5=? , d13_3_5=? , d13_4_5=? , d13_5_5=? , d13_6_5=? , d13_7_5=? , d13_8_5=? , d13_9_5=? WHERE id_proyecto=?;`;
            var  consultorias = [ req.body.d13_1_1 ? req.body.d13_1_1 : null ,req.body.d13_2_1 ? req.body.d13_2_1 : null ,req.body.d13_3_1 ? req.body.d13_3_1 : null ,req.body.d13_4_1 ? req.body.d13_4_1 : null ,req.body.d13_5_1 ? req.body.d13_5_1 : null ,req.body.d13_6_1 ? req.body.d13_6_1 : null ,req.body.d13_7_1 ? req.body.d13_7_1 : null ,req.body.d13_8_1 ? req.body.d13_8_1 : null ,req.body.d13_9_1 ? req.body.d13_9_1 : null ,req.body.d13_1_2 ? req.body.d13_1_2 : null ,req.body.d13_2_2 ? req.body.d13_2_2 : null ,req.body.d13_3_2 ? req.body.d13_3_2 : null ,req.body.d13_4_2 ? req.body.d13_4_2 : null ,req.body.d13_5_2 ? req.body.d13_5_2 : null ,req.body.d13_6_2 ? req.body.d13_6_2 : null ,req.body.d13_7_2 ? req.body.d13_7_2 : null ,req.body.d13_8_2 ? req.body.d13_8_2 : null ,req.body.d13_9_2 ? req.body.d13_9_2 : null ,req.body.d13_1_3 ? req.body.d13_1_3 : null ,req.body.d13_2_3 ? req.body.d13_2_3 : null ,req.body.d13_3_3 ? req.body.d13_3_3 : null ,req.body.d13_4_3 ? req.body.d13_4_3 : null ,req.body.d13_5_3 ? req.body.d13_5_3 : null ,req.body.d13_6_3 ? req.body.d13_6_3 : null ,req.body.d13_7_3 ? req.body.d13_7_3 : null ,req.body.d13_8_3 ? req.body.d13_8_3 : null ,req.body.d13_9_3 ? req.body.d13_9_3 : null ,req.body.d13_1_4 ? req.body.d13_1_4 : null ,req.body.d13_2_4 ? req.body.d13_2_4 : null ,req.body.d13_3_4 ? req.body.d13_3_4 : null ,req.body.d13_4_4 ? req.body.d13_4_4 : null ,req.body.d13_5_4 ? req.body.d13_5_4 : null ,req.body.d13_6_4 ? req.body.d13_6_4 : null ,req.body.d13_7_4 ? req.body.d13_7_4 : null ,req.body.d13_8_4 ? req.body.d13_8_4 : null ,req.body.d13_9_4 ? req.body.d13_9_4 : null ,req.body.d13_1_5 ? req.body.d13_1_5 : null ,req.body.d13_2_5 ? req.body.d13_2_5 : null ,req.body.d13_3_5 ? req.body.d13_3_5 : null ,req.body.d13_4_5 ? req.body.d13_4_5 : null ,req.body.d13_5_5 ? req.body.d13_5_5 : null ,req.body.d13_6_5 ? req.body.d13_6_5 : null ,req.body.d13_7_5 ? req.body.d13_7_5 : null ,req.body.d13_8_5 ? req.body.d13_8_5 : null ,req.body.d13_9_5 ? req.body.d13_9_5 : null, id ];
            con.query(consultorias_sql, consultorias, function (err, result) { if (err) { console.log(err); return; } });

            /* 19 SERVICIOS DE TERCEROS */ 
            var servicios_de_terceros_sql = `UPDATE  servicios_de_terceros SET d14_1_1=? , d14_2_1=? , d14_3_1=? , d14_4_1=? , d14_5_1=? , d14_6_1=? , d14_7_1=? , d14_8_1=? , d14_9_1=? , d14_1_2=? , d14_2_2=? , d14_3_2=? , d14_4_2=? , d14_5_2=? , d14_6_2=? , d14_7_2=? , d14_8_2=? , d14_9_2=? , d14_1_3=? , d14_2_3=? , d14_3_3=? , d14_4_3=? , d14_5_3=? , d14_6_3=? , d14_7_3=? , d14_8_3=? , d14_9_3=? , d14_1_4=? , d14_2_4=? , d14_3_4=? , d14_4_4=? , d14_5_4=? , d14_6_4=? , d14_7_4=? , d14_8_4=? , d14_9_4=? , d14_1_5=? , d14_2_5=? , d14_3_5=? , d14_4_5=? , d14_5_5=? , d14_6_5=? , d14_7_5=? , d14_8_5=? , d14_9_5=? WHERE id_proyecto=?;`;
            var  servicios_de_terceros = [ req.body.d14_1_1 ? req.body.d14_1_1 : null ,req.body.d14_2_1 ? req.body.d14_2_1 : null ,req.body.d14_3_1 ? req.body.d14_3_1 : null ,req.body.d14_4_1 ? req.body.d14_4_1 : null ,req.body.d14_5_1 ? req.body.d14_5_1 : null ,req.body.d14_6_1 ? req.body.d14_6_1 : null ,req.body.d14_7_1 ? req.body.d14_7_1 : null ,req.body.d14_8_1 ? req.body.d14_8_1 : null ,req.body.d14_9_1 ? req.body.d14_9_1 : null ,req.body.d14_1_2 ? req.body.d14_1_2 : null ,req.body.d14_2_2 ? req.body.d14_2_2 : null ,req.body.d14_3_2 ? req.body.d14_3_2 : null ,req.body.d14_4_2 ? req.body.d14_4_2 : null ,req.body.d14_5_2 ? req.body.d14_5_2 : null ,req.body.d14_6_2 ? req.body.d14_6_2 : null ,req.body.d14_7_2 ? req.body.d14_7_2 : null ,req.body.d14_8_2 ? req.body.d14_8_2 : null ,req.body.d14_9_2 ? req.body.d14_9_2 : null ,req.body.d14_1_3 ? req.body.d14_1_3 : null ,req.body.d14_2_3 ? req.body.d14_2_3 : null ,req.body.d14_3_3 ? req.body.d14_3_3 : null ,req.body.d14_4_3 ? req.body.d14_4_3 : null ,req.body.d14_5_3 ? req.body.d14_5_3 : null ,req.body.d14_6_3 ? req.body.d14_6_3 : null ,req.body.d14_7_3 ? req.body.d14_7_3 : null ,req.body.d14_8_3 ? req.body.d14_8_3 : null ,req.body.d14_9_3 ? req.body.d14_9_3 : null ,req.body.d14_1_4 ? req.body.d14_1_4 : null ,req.body.d14_2_4 ? req.body.d14_2_4 : null ,req.body.d14_3_4 ? req.body.d14_3_4 : null ,req.body.d14_4_4 ? req.body.d14_4_4 : null ,req.body.d14_5_4 ? req.body.d14_5_4 : null ,req.body.d14_6_4 ? req.body.d14_6_4 : null ,req.body.d14_7_4 ? req.body.d14_7_4 : null ,req.body.d14_8_4 ? req.body.d14_8_4 : null ,req.body.d14_9_4 ? req.body.d14_9_4 : null ,req.body.d14_1_5 ? req.body.d14_1_5 : null ,req.body.d14_2_5 ? req.body.d14_2_5 : null ,req.body.d14_3_5 ? req.body.d14_3_5 : null ,req.body.d14_4_5 ? req.body.d14_4_5 : null ,req.body.d14_5_5 ? req.body.d14_5_5 : null ,req.body.d14_6_5 ? req.body.d14_6_5 : null ,req.body.d14_7_5 ? req.body.d14_7_5 : null ,req.body.d14_8_5 ? req.body.d14_8_5 : null ,req.body.d14_9_5 ? req.body.d14_9_5 : null, id ];
            con.query(servicios_de_terceros_sql, servicios_de_terceros, function (err, result) { if (err) { console.log(err); return; } });

            /* 20 PASAJES - VIATICOS */ 
            var pasajes_viaticos_sql = `UPDATE  pasajes_viaticos SET d15_1_1=? , d15_2_1=? , d15_3_1=? , d15_4_1=? , d15_5_1=? , d15_6_1=? , d15_7_1=? , d15_8_1=? , d15_9_1=? , d15_10_1=? , d15_11_1=? , d15_12_1=? , d15_13_1=? , d15_1_2=? , d15_2_2=? , d15_3_2=? , d15_4_2=? , d15_5_2=? , d15_6_2=? , d15_7_2=? , d15_8_2=? , d15_9_2=? , d15_10_2=? , d15_11_2=? , d15_12_2=? , d15_13_2=? , d15_1_3=? , d15_2_3=? , d15_3_3=? , d15_4_3=? , d15_5_3=? , d15_6_3=? , d15_7_3=? , d15_8_3=? , d15_9_3=? , d15_10_3=? , d15_11_3=? , d15_12_3=? , d15_13_3=? , d15_1_4=? , d15_2_4=? , d15_3_4=? , d15_4_4=? , d15_5_4=? , d15_6_4=? , d15_7_4=? , d15_8_4=? , d15_9_4=? , d15_10_4=? , d15_11_4=? , d15_12_4=? , d15_13_4=? , d15_1_5=? , d15_2_5=? , d15_3_5=? , d15_4_5=? , d15_5_5=? , d15_6_5=? , d15_7_5=? , d15_8_5=? , d15_9_5=? , d15_10_5=? , d15_11_5=? , d15_12_5=? , d15_13_5=? WHERE id_proyecto=?;`;
            var  pasajes_viaticos = [req.body.d15_1_1 ? req.body.d15_1_1 : null ,req.body.d15_2_1 ? req.body.d15_2_1 : null ,req.body.d15_3_1 ? req.body.d15_3_1 : null ,req.body.d15_4_1 ? req.body.d15_4_1 : null ,req.body.d15_5_1 ? req.body.d15_5_1 : null ,req.body.d15_6_1 ? req.body.d15_6_1 : null ,req.body.d15_7_1 ? req.body.d15_7_1 : null ,req.body.d15_8_1 ? req.body.d15_8_1 : null ,req.body.d15_9_1 ? req.body.d15_9_1 : null ,req.body.d15_10_1 ? req.body.d15_10_1 : null ,req.body.d15_11_1 ? req.body.d15_11_1 : null ,req.body.d15_12_1 ? req.body.d15_12_1 : null ,req.body.d15_13_1 ? req.body.d15_13_1 : null ,req.body.d15_1_2 ? req.body.d15_1_2 : null ,req.body.d15_2_2 ? req.body.d15_2_2 : null ,req.body.d15_3_2 ? req.body.d15_3_2 : null ,req.body.d15_4_2 ? req.body.d15_4_2 : null ,req.body.d15_5_2 ? req.body.d15_5_2 : null ,req.body.d15_6_2 ? req.body.d15_6_2 : null ,req.body.d15_7_2 ? req.body.d15_7_2 : null ,req.body.d15_8_2 ? req.body.d15_8_2 : null ,req.body.d15_9_2 ? req.body.d15_9_2 : null ,req.body.d15_10_2 ? req.body.d15_10_2 : null ,req.body.d15_11_2 ? req.body.d15_11_2 : null ,req.body.d15_12_2 ? req.body.d15_12_2 : null ,req.body.d15_13_2 ? req.body.d15_13_2 : null ,req.body.d15_1_3 ? req.body.d15_1_3 : null ,req.body.d15_2_3 ? req.body.d15_2_3 : null ,req.body.d15_3_3 ? req.body.d15_3_3 : null ,req.body.d15_4_3 ? req.body.d15_4_3 : null ,req.body.d15_5_3 ? req.body.d15_5_3 : null ,req.body.d15_6_3 ? req.body.d15_6_3 : null ,req.body.d15_7_3 ? req.body.d15_7_3 : null ,req.body.d15_8_3 ? req.body.d15_8_3 : null ,req.body.d15_9_3 ? req.body.d15_9_3 : null ,req.body.d15_10_3 ? req.body.d15_10_3 : null ,req.body.d15_11_3 ? req.body.d15_11_3 : null ,req.body.d15_12_3 ? req.body.d15_12_3 : null ,req.body.d15_13_3 ? req.body.d15_13_3 : null ,req.body.d15_1_4 ? req.body.d15_1_4 : null ,req.body.d15_2_4 ? req.body.d15_2_4 : null ,req.body.d15_3_4 ? req.body.d15_3_4 : null ,req.body.d15_4_4 ? req.body.d15_4_4 : null ,req.body.d15_5_4 ? req.body.d15_5_4 : null ,req.body.d15_6_4 ? req.body.d15_6_4 : null ,req.body.d15_7_4 ? req.body.d15_7_4 : null ,req.body.d15_8_4 ? req.body.d15_8_4 : null ,req.body.d15_9_4 ? req.body.d15_9_4 : null ,req.body.d15_10_4 ? req.body.d15_10_4 : null ,req.body.d15_11_4 ? req.body.d15_11_4 : null ,req.body.d15_12_4 ? req.body.d15_12_4 : null ,req.body.d15_13_4 ? req.body.d15_13_4 : null ,req.body.d15_1_5 ? req.body.d15_1_5 : null ,req.body.d15_2_5 ? req.body.d15_2_5 : null ,req.body.d15_3_5 ? req.body.d15_3_5 : null ,req.body.d15_4_5 ? req.body.d15_4_5 : null ,req.body.d15_5_5 ? req.body.d15_5_5 : null ,req.body.d15_6_5 ? req.body.d15_6_5 : null ,req.body.d15_7_5 ? req.body.d15_7_5 : null ,req.body.d15_8_5 ? req.body.d15_8_5 : null ,req.body.d15_9_5 ? req.body.d15_9_5 : null ,req.body.d15_10_5 ? req.body.d15_10_5 : null ,req.body.d15_11_5 ? req.body.d15_11_5 : null ,req.body.d15_12_5 ? req.body.d15_12_5 : null ,req.body.d15_13_5 ? req.body.d15_13_5 : null, id ];
            con.query(pasajes_viaticos_sql, pasajes_viaticos, function (err, result) { if (err) { console.log(err); return; } });

            /* 21 MATERIALES */ 
            var materiales_sql = `UPDATE  materiales SET d16_1_1=? , d16_2_1=? , d16_3_1=? , d16_4_1=? , d16_5_1=? , d16_6_1=? , d16_7_1=? , d16_8_1=? , d16_9_1=? , d16_10_1=? , d16_11_1=? , d16_12_1=? , d16_1_2=? , d16_2_2=? , d16_3_2=? , d16_4_2=? , d16_5_2=? , d16_6_2=? , d16_7_2=? , d16_8_2=? , d16_9_2=? , d16_10_2=? , d16_11_2=? , d16_12_2=? , d16_1_3=? , d16_2_3=? , d16_3_3=? , d16_4_3=? , d16_5_3=? , d16_6_3=? , d16_7_3=? , d16_8_3=? , d16_9_3=? , d16_10_3=? , d16_11_3=? , d16_12_3=? , d16_1_4=? , d16_2_4=? , d16_3_4=? , d16_4_4=? , d16_5_4=? , d16_6_4=? , d16_7_4=? , d16_8_4=? , d16_9_4=? , d16_10_4=? , d16_11_4=? , d16_12_4=? , d16_1_5=? , d16_2_5=? , d16_3_5=? , d16_4_5=? , d16_5_5=? , d16_6_5=? , d16_7_5=? , d16_8_5=? , d16_9_5=? , d16_10_5=? , d16_11_5=? , d16_12_5=? WHERE id_proyecto=?;`;
            var materiales = [ req.body.d16_1_1 ? req.body.d16_1_1 : null ,req.body.d16_2_1 ? req.body.d16_2_1 : null ,req.body.d16_3_1 ? req.body.d16_3_1 : null ,req.body.d16_4_1 ? req.body.d16_4_1 : null ,req.body.d16_5_1 ? req.body.d16_5_1 : null ,req.body.d16_6_1 ? req.body.d16_6_1 : null ,req.body.d16_7_1 ? req.body.d16_7_1 : null ,req.body.d16_8_1 ? req.body.d16_8_1 : null ,req.body.d16_9_1 ? req.body.d16_9_1 : null ,req.body.d16_10_1 ? req.body.d16_10_1 : null ,req.body.d16_11_1 ? req.body.d16_11_1 : null ,req.body.d16_12_1 ? req.body.d16_12_1 : null ,req.body.d16_1_2 ? req.body.d16_1_2 : null ,req.body.d16_2_2 ? req.body.d16_2_2 : null ,req.body.d16_3_2 ? req.body.d16_3_2 : null ,req.body.d16_4_2 ? req.body.d16_4_2 : null ,req.body.d16_5_2 ? req.body.d16_5_2 : null ,req.body.d16_6_2 ? req.body.d16_6_2 : null ,req.body.d16_7_2 ? req.body.d16_7_2 : null ,req.body.d16_8_2 ? req.body.d16_8_2 : null ,req.body.d16_9_2 ? req.body.d16_9_2 : null ,req.body.d16_10_2 ? req.body.d16_10_2 : null ,req.body.d16_11_2 ? req.body.d16_11_2 : null ,req.body.d16_12_2 ? req.body.d16_12_2 : null ,req.body.d16_1_3 ? req.body.d16_1_3 : null ,req.body.d16_2_3 ? req.body.d16_2_3 : null ,req.body.d16_3_3 ? req.body.d16_3_3 : null ,req.body.d16_4_3 ? req.body.d16_4_3 : null ,req.body.d16_5_3 ? req.body.d16_5_3 : null ,req.body.d16_6_3 ? req.body.d16_6_3 : null ,req.body.d16_7_3 ? req.body.d16_7_3 : null ,req.body.d16_8_3 ? req.body.d16_8_3 : null ,req.body.d16_9_3 ? req.body.d16_9_3 : null ,req.body.d16_10_3 ? req.body.d16_10_3 : null ,req.body.d16_11_3 ? req.body.d16_11_3 : null ,req.body.d16_12_3 ? req.body.d16_12_3 : null ,req.body.d16_1_4 ? req.body.d16_1_4 : null ,req.body.d16_2_4 ? req.body.d16_2_4 : null ,req.body.d16_3_4 ? req.body.d16_3_4 : null ,req.body.d16_4_4 ? req.body.d16_4_4 : null ,req.body.d16_5_4 ? req.body.d16_5_4 : null ,req.body.d16_6_4 ? req.body.d16_6_4 : null ,req.body.d16_7_4 ? req.body.d16_7_4 : null ,req.body.d16_8_4 ? req.body.d16_8_4 : null ,req.body.d16_9_4 ? req.body.d16_9_4 : null ,req.body.d16_10_4 ? req.body.d16_10_4 : null ,req.body.d16_11_4 ? req.body.d16_11_4 : null ,req.body.d16_12_4 ? req.body.d16_12_4 : null ,req.body.d16_1_5 ? req.body.d16_1_5 : null ,req.body.d16_2_5 ? req.body.d16_2_5 : null ,req.body.d16_3_5 ? req.body.d16_3_5 : null ,req.body.d16_4_5 ? req.body.d16_4_5 : null ,req.body.d16_5_5 ? req.body.d16_5_5 : null ,req.body.d16_6_5 ? req.body.d16_6_5 : null ,req.body.d16_7_5 ? req.body.d16_7_5 : null ,req.body.d16_8_5 ? req.body.d16_8_5 : null ,req.body.d16_9_5 ? req.body.d16_9_5 : null ,req.body.d16_10_5 ? req.body.d16_10_5 : null ,req.body.d16_11_5 ? req.body.d16_11_5 : null ,req.body.d16_12_5 ? req.body.d16_12_5 : null, id ];
            con.query(materiales_sql, materiales, function (err, result) { if (err) { console.log(err); return; } });

            /* 22 OTROS GASTOS */ 
            var otros_gastos_sql = `UPDATE  otros_gastos SET d17_1_1=? , d17_2_1=? , d17_3_1=? , d17_4_1=? , d17_5_1=? , d17_6_1=? , d17_7_1=? , d17_8_1=? , d17_9_1=? , d17_10_1=? , d17_1_2=? , d17_2_2=? , d17_3_2=? , d17_4_2=? , d17_5_2=? , d17_6_2=? , d17_7_2=? , d17_8_2=? , d17_9_2=? , d17_10_2=? , d17_1_3=? , d17_2_3=? , d17_3_3=? , d17_4_3=? , d17_5_3=? , d17_6_3=? , d17_7_3=? , d17_8_3=? , d17_9_3=? , d17_10_3=? , d17_1_4=? , d17_2_4=? , d17_3_4=? , d17_4_4=? , d17_5_4=? , d17_6_4=? , d17_7_4=? , d17_8_4=? , d17_9_4=? , d17_10_4=? , d17_1_5=? , d17_2_5=? , d17_3_5=? , d17_4_5=? , d17_5_5=? , d17_6_5=? , d17_7_5=? , d17_8_5=? , d17_9_5=? , d17_10_5=? WHERE id_proyecto=?;`;
            var  otros_gastos = [ req.body.d17_1_1 ? req.body.d17_1_1 : null ,req.body.d17_2_1 ? req.body.d17_2_1 : null ,req.body.d17_3_1 ? req.body.d17_3_1 : null ,req.body.d17_4_1 ? req.body.d17_4_1 : null ,req.body.d17_5_1 ? req.body.d17_5_1 : null ,req.body.d17_6_1 ? req.body.d17_6_1 : null ,req.body.d17_7_1 ? req.body.d17_7_1 : null ,req.body.d17_8_1 ? req.body.d17_8_1 : null ,req.body.d17_9_1 ? req.body.d17_9_1 : null ,req.body.d17_10_1 ? req.body.d17_10_1 : null ,req.body.d17_1_2 ? req.body.d17_1_2 : null ,req.body.d17_2_2 ? req.body.d17_2_2 : null ,req.body.d17_3_2 ? req.body.d17_3_2 : null ,req.body.d17_4_2 ? req.body.d17_4_2 : null ,req.body.d17_5_2 ? req.body.d17_5_2 : null ,req.body.d17_6_2 ? req.body.d17_6_2 : null ,req.body.d17_7_2 ? req.body.d17_7_2 : null ,req.body.d17_8_2 ? req.body.d17_8_2 : null ,req.body.d17_9_2 ? req.body.d17_9_2 : null ,req.body.d17_10_2 ? req.body.d17_10_2 : null ,req.body.d17_1_3 ? req.body.d17_1_3 : null ,req.body.d17_2_3 ? req.body.d17_2_3 : null ,req.body.d17_3_3 ? req.body.d17_3_3 : null ,req.body.d17_4_3 ? req.body.d17_4_3 : null ,req.body.d17_5_3 ? req.body.d17_5_3 : null ,req.body.d17_6_3 ? req.body.d17_6_3 : null ,req.body.d17_7_3 ? req.body.d17_7_3 : null ,req.body.d17_8_3 ? req.body.d17_8_3 : null ,req.body.d17_9_3 ? req.body.d17_9_3 : null ,req.body.d17_10_3 ? req.body.d17_10_3 : null ,req.body.d17_1_4 ? req.body.d17_1_4 : null ,req.body.d17_2_4 ? req.body.d17_2_4 : null ,req.body.d17_3_4 ? req.body.d17_3_4 : null ,req.body.d17_4_4 ? req.body.d17_4_4 : null ,req.body.d17_5_4 ? req.body.d17_5_4 : null ,req.body.d17_6_4 ? req.body.d17_6_4 : null ,req.body.d17_7_4 ? req.body.d17_7_4 : null ,req.body.d17_8_4 ? req.body.d17_8_4 : null ,req.body.d17_9_4 ? req.body.d17_9_4 : null ,req.body.d17_10_4 ? req.body.d17_10_4 : null ,req.body.d17_1_5 ? req.body.d17_1_5 : null ,req.body.d17_2_5 ? req.body.d17_2_5 : null ,req.body.d17_3_5 ? req.body.d17_3_5 : null ,req.body.d17_4_5 ? req.body.d17_4_5 : null ,req.body.d17_5_5 ? req.body.d17_5_5 : null ,req.body.d17_6_5 ? req.body.d17_6_5 : null ,req.body.d17_7_5 ? req.body.d17_7_5 : null ,req.body.d17_8_5 ? req.body.d17_8_5 : null ,req.body.d17_9_5 ? req.body.d17_9_5 : null ,req.body.d17_10_5 ? req.body.d17_10_5 : null, id ];
            con.query(otros_gastos_sql, otros_gastos, function (err, result) { if (err) { console.log(err); return; } });

            /* 23 GASTOS DE GESTION */ 
            var gastos_de_gestion_sql = `UPDATE  gastos_de_gestion SET d18_1_1=? , d18_2_1=? , d18_3_1=? , d18_4_1=? , d18_5_1=? , d18_6_1=? , d18_7_1=? , d18_8_1=? , d18_9_1=? , d18_1_2=? , d18_2_2=? , d18_3_2=? , d18_4_2=? , d18_5_2=? , d18_6_2=? , d18_7_2=? , d18_8_2=? , d18_9_2=? , d18_1_3=? , d18_2_3=? , d18_3_3=? , d18_4_3=? , d18_5_3=? , d18_6_3=? , d18_7_3=? , d18_8_3=? , d18_9_3=? , d18_1_4=? , d18_2_4=? , d18_3_4=? , d18_4_4=? , d18_5_4=? , d18_6_4=? , d18_7_4=? , d18_8_4=? , d18_9_4=? , d18_1_5=? , d18_2_5=? , d18_3_5=? , d18_4_5=? , d18_5_5=? , d18_6_5=? , d18_7_5=? , d18_8_5=? , d18_9_5=? WHERE id_proyecto=?;`;
            var  gastos_de_gestion = [ req.body.d18_1_1 ? req.body.d18_1_1 : null ,req.body.d18_3_1 ? req.body.d18_3_1 : null ,req.body.d18_2_1 ? req.body.d18_2_1 : null ,req.body.d18_5_1 ? req.body.d18_5_1 : null ,req.body.d18_4_1 ? req.body.d18_4_1 : null ,req.body.d18_7_1 ? req.body.d18_7_1 : null ,req.body.d18_6_1 ? req.body.d18_6_1 : null ,req.body.d18_9_1 ? req.body.d18_9_1 : null ,req.body.d18_8_1 ? req.body.d18_8_1 : null ,req.body.d18_2_2 ? req.body.d18_2_2 : null ,req.body.d18_1_2 ? req.body.d18_1_2 : null ,req.body.d18_4_2 ? req.body.d18_4_2 : null ,req.body.d18_3_2 ? req.body.d18_3_2 : null ,req.body.d18_6_2 ? req.body.d18_6_2 : null ,req.body.d18_5_2 ? req.body.d18_5_2 : null ,req.body.d18_8_2 ? req.body.d18_8_2 : null ,req.body.d18_7_2 ? req.body.d18_7_2 : null ,req.body.d18_1_3 ? req.body.d18_1_3 : null ,req.body.d18_9_2 ? req.body.d18_9_2 : null ,req.body.d18_3_3 ? req.body.d18_3_3 : null ,req.body.d18_2_3 ? req.body.d18_2_3 : null ,req.body.d18_5_3 ? req.body.d18_5_3 : null ,req.body.d18_4_3 ? req.body.d18_4_3 : null ,req.body.d18_7_3 ? req.body.d18_7_3 : null ,req.body.d18_6_3 ? req.body.d18_6_3 : null ,req.body.d18_9_3 ? req.body.d18_9_3 : null ,req.body.d18_8_3 ? req.body.d18_8_3 : null ,req.body.d18_2_4 ? req.body.d18_2_4 : null ,req.body.d18_1_4 ? req.body.d18_1_4 : null ,req.body.d18_4_4 ? req.body.d18_4_4 : null ,req.body.d18_3_4 ? req.body.d18_3_4 : null ,req.body.d18_6_4 ? req.body.d18_6_4 : null ,req.body.d18_5_4 ? req.body.d18_5_4 : null ,req.body.d18_8_4 ? req.body.d18_8_4 : null ,req.body.d18_7_4 ? req.body.d18_7_4 : null ,req.body.d18_1_5 ? req.body.d18_1_5 : null ,req.body.d18_9_4 ? req.body.d18_9_4 : null ,req.body.d18_3_5 ? req.body.d18_3_5 : null ,req.body.d18_2_5 ? req.body.d18_2_5 : null ,req.body.d18_5_5 ? req.body.d18_5_5 : null ,req.body.d18_4_5 ? req.body.d18_4_5 : null ,req.body.d18_7_5 ? req.body.d18_7_5 : null ,req.body.d18_6_5 ? req.body.d18_6_5 : null ,req.body.d18_9_5 ? req.body.d18_9_5 : null ,req.body.d18_8_5 ? req.body.d18_8_5 : null, id ];
            con.query(gastos_de_gestion_sql, gastos_de_gestion, function (err, result) { if (err) { console.log(err); return; } });

            /* 24 EQUIPO FORMULADOR */ 
            var equipo_formulador_sql = `UPDATE  equipo_formulador SET d19_1_1=? , d19_2_1=? , d19_3_1=? , d19_4_1=? , d19_5_1=? , d19_6_1=? , d19_7_1=? , d19_1_2=? , d19_2_2=? , d19_3_2=? , d19_4_2=? , d19_5_2=? , d19_6_2=? , d19_7_2=? , d19_1_3=? , d19_2_3=? , d19_3_3=? , d19_4_3=? , d19_5_3=? , d19_6_3=? , d19_7_3=? , d19_1_4=? , d19_2_4=? , d19_3_4=? , d19_4_4=? , d19_5_4=? , d19_6_4=? , d19_7_4=? , d19_1_5=? , d19_2_5=? , d19_3_5=? , d19_4_5=? , d19_5_5=? , d19_6_5=? , d19_7_5=? WHERE id_proyecto=?;`;
            var  equipo_formulador = [ req.body.d19_1_1 ? req.body.d19_1_1 : null ,req.body.d19_2_1 ? req.body.d19_2_1 : null ,req.body.d19_3_1 ? req.body.d19_3_1 : null ,req.body.d19_4_1 ? req.body.d19_4_1 : null ,req.body.d19_5_1 ? req.body.d19_5_1 : null ,req.body.d19_6_1 ? req.body.d19_6_1 : null ,req.body.d19_7_1 ? req.body.d19_7_1 : null ,req.body.d19_1_2 ? req.body.d19_1_2 : null ,req.body.d19_2_2 ? req.body.d19_2_2 : null ,req.body.d19_3_2 ? req.body.d19_3_2 : null ,req.body.d19_4_2 ? req.body.d19_4_2 : null ,req.body.d19_5_2 ? req.body.d19_5_2 : null ,req.body.d19_6_2 ? req.body.d19_6_2 : null ,req.body.d19_7_2 ? req.body.d19_7_2 : null ,req.body.d19_1_3 ? req.body.d19_1_3 : null ,req.body.d19_2_3 ? req.body.d19_2_3 : null ,req.body.d19_3_3 ? req.body.d19_3_3 : null ,req.body.d19_4_3 ? req.body.d19_4_3 : null ,req.body.d19_5_3 ? req.body.d19_5_3 : null ,req.body.d19_6_3 ? req.body.d19_6_3 : null ,req.body.d19_7_3 ? req.body.d19_7_3 : null ,req.body.d19_1_4 ? req.body.d19_1_4 : null ,req.body.d19_2_4 ? req.body.d19_2_4 : null ,req.body.d19_3_4 ? req.body.d19_3_4 : null ,req.body.d19_4_4 ? req.body.d19_4_4 : null ,req.body.d19_5_4 ? req.body.d19_5_4 : null ,req.body.d19_6_4 ? req.body.d19_6_4 : null ,req.body.d19_7_4 ? req.body.d19_7_4 : null ,req.body.d19_1_5 ? req.body.d19_1_5 : null ,req.body.d19_2_5 ? req.body.d19_2_5 : null ,req.body.d19_3_5 ? req.body.d19_3_5 : null ,req.body.d19_4_5 ? req.body.d19_4_5 : null ,req.body.d19_5_5 ? req.body.d19_5_5 : null ,req.body.d19_6_5 ? req.body.d19_6_5 : null ,req.body.d19_7_5 ? req.body.d19_7_5 : null, id ];
            con.query(equipo_formulador_sql, equipo_formulador, function (err, result) { if (err) { console.log(err); return; } });

            /* 25 ADJUNTO */
            if (req.files.flujoDeCaja) {
                var dirflujoDeCaja = './public/upload/proyecto/flujo_de_caja_'+id+'.pdf';
                req.files.flujoDeCaja.mv(dirflujoDeCaja , function(err) { if (err) console.log(err); });
            }

            if (req.files.planAdjunto) {
                var dirplanAdjunto = './public/upload/proyecto/plan_adjunto_'+id+'.pdf';
                req.files.planAdjunto.mv(dirplanAdjunto , function(err) { if (err) console.log(err); });
            }

            var adjunto_sql = `UPDATE adjunto SET nombre_flujodecaja = ? , nombre_planadjunto = ? WHERE id_proyecto = ?`;
            var adjunto = [ req.files.flujoDeCaja ? 'flujo_de_caja_'+id+'.pdf' : req.body.nombre_flujodecaja ? req.body.nombre_flujodecaja : null , req.files.planAdjunto ? 'plan_adjunto_'+id+'.pdf' : req.body.nombre_planadjunto ? req.body.nombre_planAdjunto : null , id];  
            con.query(adjunto_sql, adjunto, function (err, result) { 
                if (err) { console.log(err); return; } 
                res.redirect('/administrar'); 
            });
            con.end();
        });
    } else {
        res.redirect("/");
    }
});

/*** LISTO ***/
router.post('/enviar', function(req, res) {
    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) console.log(err);
    
            var id = req.body.id_proyecto;

            var proyecto_sql = `UPDATE  proyecto SET enviado = ? WHERE id_proyecto = ?`;
            var proyecto = [ req.body.enviado, id ]
            con.query(proyecto_sql, proyecto, function (err, result) { 
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
router.get('/validation/change-password' ,function(req, res, next) {
    res.redirect("/");
});

/*** LISTO NO MODIFICADO ***/
router.get('/editar-proyecto' ,function(req, res, next) {
    res.redirect("/");
});

/*** LISTO NO MODIFICADO ***/
router.get('/validation/nuevo', function(req, res) {
    res.redirect("/");
});

/*** LISTO NO MODIFICADO ***/
router.get('/validation/editar-proyecto', function(req, res) {
    res.redirect("/");
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

/*** LISTO ***/
router.get('/descargar/:id', function(req,res){
    res.download('./public/upload/proyecto/'+req.params.id,
    req.params.id,function(err){
        if(err) console.log(err);
    });
});

/*** LISTO ***/
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
      , adjunto.*
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
      INNER JOIN equipo_formulador ON equipo_formulador.id_proyecto = proyecto.id_proyecto
      INNER JOIN adjunto ON adjunto.id_proyecto = proyecto.id_proyecto`;
        
        var values = [ req.session.user.id, req.body.idproyecto];

        con.connect(function(err) {
            if (err) console.log(err);

            con.query(sql, values, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                if(!req.session.user){
                    console.log(req.session.user);
                    res.redirect("/");
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
        res.redirect("/");
    }
});


module.exports = router;