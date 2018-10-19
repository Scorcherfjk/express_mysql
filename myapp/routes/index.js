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

/*** EN PROCESO ******************************************************************************************************/
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
        , impactos.*
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
        INNER JOIN impactos ON impactos.id_proyecto = proyecto.id_proyecto`;
        
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

/*** EN PROCESO *******************************************************************************************************/
router.post('/validation/nuevo', function(req, res) {
    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) console.log(err);
            
            /* 1 PROYECTO */
            var proyecto =  `INSERT INTO proyecto (id_usuario, titulo) VALUES ( ? , ? )`;
            var values = [ req.session.user.id , req.body.titulo ];
            con.query(proyecto, values, function (err, result) { if (err) { console.log(err); return; } });

            /* 2 DATOS GENERALES */
            var datos_generales = `INSERT INTO datos_generales (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
            con.query(datos_generales, function (err, result) { if (err) { console.log(err); return; } });

            /* 3 ENTIDADES PARTICIPANTES */
            var entidades_participantes = `INSERT INTO entidades_participantes (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
            con.query(entidades_participantes, function (err, result) { if (err) { console.log(err); return; } });

            /* 4 ENTIDADES ASOCIADAS */
            var entidades_asociadas = `INSERT INTO entidades_asociadas (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
            con.query(entidades_asociadas, function (err, result) { if (err) { console.log(err); return; } });

            /* 5 TABLAS ACTIVIDADES - INFRAESTRUCTURA - BENEFICIOS */
            var actividades_infraestructura_beneficios = `INSERT INTO actividades_infraestructura_beneficios (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
            con.query(actividades_infraestructura_beneficios, function (err, result) { if (err) { console.log(err); return; } });

            /* 6 TABLAS FONDOS RECIBIDOS DEL ESTADO */
            var fondos_recibidos_del_estado = `INSERT INTO fondos_recibidos_del_estado (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
            con.query(fondos_recibidos_del_estado, function (err, result) { if (err) { console.log(err); return; } });
            

            /* 7 TABLA PROYECTO FINANCIADOS INNOVATE PERU */
            var proyectos_financiados_ip = `INSERT INTO proyectos_financiados_ip (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
            con.query(proyectos_financiados_ip, function (err, result) { if (err) { console.log(err); return; } });

            /* 8 COMPETITIVIDAD EMPRESARIAL */
            var competitividad_empresarial = `INSERT INTO competitividad_empresarial (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
            con.query(competitividad_empresarial, function (err, result) { if (err) { console.log(err); return; } });

            /* 9 DIAGNOSTICO */
            var diagnostico = `INSERT INTO diagnostico (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
            con.query(diagnostico, function (err, result) { if (err) { console.log(err); return; } });

            /* 10 CARACTERISTICAS */
            var caracateristicas = `INSERT INTO caracateristicas (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
            con.query(caracateristicas, function (err, result) { if (err) { console.log(err); return; } });

            /* 11 ANTECEDENTES */
            var antecedentes = `INSERT INTO antecedentes (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
            con.query(antecedentes, function (err, result) { if (err) { console.log(err); return; } });
            
            /* 12 OBJETIVOS */
            var objetivos = `INSERT INTO objetivos (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
            con.query(objetivos, function (err, result) { if (err) { console.log(err); return; } });

            /* 14 IMPACTOS */
            var impactos = `INSERT INTO impactos (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
            con.query(impactos, function (err, result) { if (err) { console.log(err); return; } });

            /* 25 ADJUNTO */
            var adjunto = `INSERT INTO adjunto (id_proyecto) VALUES ( (SELECT MAX(id_proyecto) FROM proyecto) )`;
            con.query(adjunto, function (err, result) { if (err) { console.log(err); return; }
                res.redirect('/administrar');
            });

            con.end();
        });
    } else {
        res.redirect("/");
    }
});

/*** EN PROCESO ********************************************************************************************************/
router.post('/validation/editar-proyecto', function(req, res) {
    if(req.session.user){

        if (con) con.destroy();
        var con = mysql.createConnection(config());

        con.connect(function(err) {
            if (err) console.log(err);
    
            var id = req.body.id_proyecto;

            /* 1 PROYECTO */
            var proyecto_sql = `UPDATE proyecto SET titulo = ? WHERE id_proyecto = ?`;
            var proyecto = [ req.body.titulo, id ]
            con.query(proyecto_sql, proyecto, function (err, result) { if (err) { console.log(err); return; } });

            /* 2 DATOS GENERALES */
            var datos_generales_sql = `UPDATE datos_generales SET palabras_clave = ?, ai_area = ?, ai_subarea = ?, ai_tematica = ?, aplicacion_area = ?, aplicacion_subarea = ?, loc_departamento = ?, loc_provincia = ?, loc_distrito = ?, loc_ubigeo = ?, duracion_proyecto = ?, fecha_estimada_inicio = ?, cgp_tipo_documento = ?, cgp_nro_documento = ?, cgp_ruc = ?, cgp_nombre = ?, cgp_fecha_nac = ?, cgp_sexo = ?, cgp_email = ?, cgp_telefono = ?, cgp_celular = ?, cap_tipo_documento = ?, cap_nro_documento = ?, cap_ruc = ?, cap_nombre = ?, cap_fecha_nac = ?, cap_sexo = ?, cap_email = ?, cap_telefono = ?, cap_celular = ? WHERE id_proyecto = ?`;
            var datos_generales = [ req.body.palabrasClave ? req.body.palabrasClave : null, req.body.area_innovacion_area ? req.body.area_innovacion_area : null, req.body.area_innovacion_subarea ? req.body.area_innovacion_subarea : null, req.body.area_innovacion_tematica ? req.body.area_innovacion_tematica : null, req.body.aplicacion_area ? req.body.aplicacion_area : null, req.body.aplicacion_subarea ? req.body.aplicacion_subarea : null, req.body.localizacion_departamento ? req.body.localizacion_departamento : null, req.body.localizacion_provincia ? req.body.localizacion_provincia : null, req.body.localizacion_distrito ? req.body.localizacion_distrito : null, req.body.localizacion_ubigeo ? req.body.localizacion_ubigeo : null, req.body.duracionDelProyecto ? req.body.duracionDelProyecto : null, req.body.fechaEstimadaDeInicioDelProyecto ? req.body.fechaEstimadaDeInicioDelProyecto : null, req.body.cgptipoDeDocumento ? req.body.cgptipoDeDocumento : null, req.body.cgpnumeroDeDocumento ? req.body.cgpnumeroDeDocumento : null, req.body.cgpruc ? req.body.cgpruc : null, req.body.cgpnombresYApellidos ? req.body.cgpnombresYApellidos : null, req.body.cgpfechaDeNacimiento ? req.body.cgpfechaDeNacimiento : null, req.body.cgpsexo ? req.body.cgpsexo : null, req.body.cgpemail ? req.body.cgpemail : null, req.body.cgptelefono ? req.body.cgptelefono : null, req.body.cgpcelular ? req.body.cgpcelular : null, req.body.captipoDeDocumento ? req.body.captipoDeDocumento : null, req.body.capnumeroDeDocumento ? req.body.capnumeroDeDocumento : null, req.body.capruc ? req.body.capruc : null, req.body.capnombresYApellidos ? req.body.capnombresYApellidos : null, req.body.capfechaDeNacimiento ? req.body.capfechaDeNacimiento : null, req.body.capsexo ? req.body.capsexo : null, req.body.capemail ? req.body.capemail : null, req.body.captelefono ? req.body.captelefono : null, req.body.capcelular ? req.body.capcelular : null, id ];
            con.query(datos_generales_sql, datos_generales, function (err, result) { if (err) { console.log(err); return; } }); 

            /* 3 ENTIDADES PARTICIPANTES */
            var entidades_participantes_sql = `UPDATE entidades_participantes SET es_tipo = ?, es_tamano = ?, es_nro_trabajadores = ?, es_ruc = ?, es_ciiu = ?, es_direccion = ?, es_fecha_constitucion = ?, es_inicio_actividades = ?, es_nro_partida = ?, es_oficina_registral = ?, es_telefono = ?, es_correo = ?, es_pagina_web = ?, es_ventas2016 = ?, es_ventas2017 = ?, rl_tipo_documento = ?, rl_nro_documento = ?, rl_ruc = ?, rl_nombre = ?, rl_sexo = ?, rl_email = ?, rl_telefono = ?, rl_productos_comercializados = ?, rl_actividades_relacionadas = ?, rl_infraestructura_es = ? WHERE id_proyecto = ?`;
            var entidades_participantes = [ req.body.estipoDeEntidad ? req.body.estipoDeEntidad : null, req.body.estamañoDeLaEmpresa ? req.body.estamañoDeLaEmpresa : null, req.body.esnroDeTrabajadores ? req.body.esnroDeTrabajadores : null, req.body.esrucRazonSocial ? req.body.esrucRazonSocial : null, req.body.esciiu ? req.body.esciiu : null, req.body.esdireccion ? req.body.esdireccion : null, req.body.esfechaDeConstitucion ? req.body.esfechaDeConstitucion : null, req.body.esinicioDeActividades ? req.body.esinicioDeActividades : null, req.body.esnumeroDePartida ? req.body.esnumeroDePartida : null, req.body.esoficinaRegistral ? req.body.esoficinaRegistral : null, req.body.estelefonoCelular ? req.body.estelefonoCelular : null, req.body.esemail ? req.body.esemail : null, req.body.espaginaWeb ? req.body.espaginaWeb : null, req.body.esventas2016 ? req.body.esventas2016 : null, req.body.esventas2017 ? req.body.esventas2017 : null, req.body.rptipoDeDocumento ? req.body.rptipoDeDocumento : null, req.body.rpnumeroDeDocumento ? req.body.rpnumeroDeDocumento : null, req.body.rpruc ? req.body.rpruc : null, req.body.rpnombresYApellidos ? req.body.rpnombresYApellidos : null, req.body.rpsexo ? req.body.rpsexo : null, req.body.rpemail ? req.body.rpemail : null, req.body.rptelefono ? req.body.rptelefono : null, req.body.rpproductosComerciales ? req.body.rpproductosComerciales : null, req.body.rpactividadesRelacionadas ? req.body.rpactividadesRelacionadas : null, req.body.rpinfraestructuraDelSolicitante ? req.body.rpinfraestructuraDelSolicitante : null, id ];
            con.query(entidades_participantes_sql, entidades_participantes, function (err, result) { if (err) { console.log(err); return; } });

            /* 4 ENTIDADES ASOCIADAS */
            var entidades_asociadas_sql = `UPDATE entidades_asociadas SET a22_1_1 = ?, a22_2_1 = ?, a22_3_1 = ?, a22_4_1 = ?, a22_5_1 = ?, a22_1_2 = ?, a22_2_2 = ?, a22_3_2 = ?, a22_4_2 = ?, a22_5_2 = ?, a22_1_3 = ?, a22_2_3 = ?, a22_3_3 = ?, a22_4_3 = ?, a22_5_3 = ? WHERE id_proyecto = ?`;
            var entidades_asociadas = [ req.body.a22_1_1 ? req.body.a22_1_1 : null , req.body.a22_2_1 ? req.body.a22_2_1 : null , req.body.a22_3_1 ? req.body.a22_3_1 : null , req.body.a22_4_1 ? req.body.a22_4_1 : null , req.body.a22_5_1 ? req.body.a22_5_1 : null , req.body.a22_1_2 ? req.body.a22_1_2 : null , req.body.a22_2_2 ? req.body.a22_2_2 : null , req.body.a22_3_2 ? req.body.a22_3_2 : null , req.body.a22_4_2 ? req.body.a22_4_2 : null , req.body.a22_5_2 ? req.body.a22_5_2 : null , req.body.a22_1_3 ? req.body.a22_1_3 : null , req.body.a22_2_3 ? req.body.a22_2_3 : null , req.body.a22_3_3 ? req.body.a22_3_3 : null , req.body.a22_4_3 ? req.body.a22_4_3 : null , req.body.a22_5_3 ? req.body.a22_5_3 : null , id ];
            con.query(entidades_asociadas_sql, entidades_asociadas, function (err, result) { if (err) { console.log(err); return; } });
            
            /* 5 TABLAS ACTIVIDADES - INFRAESTRUCTURA - BENEFICIOS */
            var actividades_infraestructura_beneficios_sql = `UPDATE actividades_infraestructura_beneficios SET a31_1_1 = ?, a31_2_1 = ?, a31_1_2 = ?, a31_2_2 = ?, a31_1_3 = ?, a31_2_3 = ?, a32_1_1 = ?, a32_2_1 = ?, a32_1_2 = ?, a32_2_2 = ?, a32_1_3 = ?, a32_2_3 = ?, a33_1_1 = ?, a33_2_1 = ?, a33_1_2 = ?, a33_2_2 = ?, a33_1_3 = ?, a33_2_3 = ? WHERE id_proyecto = ?`;
            var actividades_infraestructura_beneficios  = [ req.body.a31_1_1 ? req.body.a31_1_1 : null, req.body.a31_2_1 ? req.body.a31_2_1 : null, req.body.a31_1_2 ? req.body.a31_1_2 : null, req.body.a31_2_2 ? req.body.a31_2_2 : null, req.body.a31_1_3 ? req.body.a31_1_3 : null, req.body.a31_2_3 ? req.body.a31_2_3 : null, req.body.a32_1_1 ? req.body.a32_1_1 : null, req.body.a32_2_1 ? req.body.a32_2_1 : null, req.body.a32_1_2 ? req.body.a32_1_2 : null, req.body.a32_2_2 ? req.body.a32_2_2 : null, req.body.a32_1_3 ? req.body.a32_1_3 : null, req.body.a32_2_3 ? req.body.a32_2_3 : null, req.body.a33_1_1 ? req.body.a33_1_1 : null, req.body.a33_2_1 ? req.body.a33_2_1 : null, req.body.a33_1_2 ? req.body.a33_1_2 : null, req.body.a33_2_2 ? req.body.a33_2_2 : null, req.body.a33_1_3 ? req.body.a33_1_3 : null, req.body.a33_2_3 ? req.body.a33_2_3 : null, id ];
            con.query( actividades_infraestructura_beneficios_sql, actividades_infraestructura_beneficios, function (err, result) { if (err) { console.log(err); return; } });

            /* 6 TABLAS FONDOS RECIBIDOS DEL ESTADO */
            var fondos_recibidos_del_estado_sql = `UPDATE fondos_recibidos_del_estado SET a34_1_1 = ?, a34_2_1 = ?, a34_3_1 = ?, a34_4_1 = ?, a34_5_1 = ?, a34_1_2 = ?, a34_2_2 = ?, a34_3_2 = ?, a34_4_2 = ?, a34_5_2 = ?, a34_1_3 = ?, a34_2_3 = ?, a34_3_3 = ?, a34_4_3 = ?, a34_5_3 = ? WHERE id_proyecto = ?`;
            var fondos_recibidos_del_estado = [ req.body.a34_1_1 ? req.body.a34_1_1 : null,req.body.a34_2_1 ? req.body.a34_2_1 : null,req.body.a34_3_1 ? req.body.a34_3_1 : null,req.body.a34_4_1 ? req.body.a34_4_1 : null,req.body.a34_5_1 ? req.body.a34_5_1 : null,req.body.a34_1_2 ? req.body.a34_1_2 : null,req.body.a34_2_2 ? req.body.a34_2_2 : null,req.body.a34_3_2 ? req.body.a34_3_2 : null,req.body.a34_4_2 ? req.body.a34_4_2 : null,req.body.a34_5_2 ? req.body.a34_5_2 : null,req.body.a34_1_3 ? req.body.a34_1_3 : null,req.body.a34_2_3 ? req.body.a34_2_3 : null,req.body.a34_3_3 ? req.body.a34_3_3 : null,req.body.a34_4_3 ? req.body.a34_4_3 : null,req.body.a34_5_3 ? req.body.a34_5_3 : null,id ];
            con.query( fondos_recibidos_del_estado_sql, fondos_recibidos_del_estado, function (err, result) { if (err) { console.log(err); return; } });

            /* 7 TABLA PROYECTO FINANCIADOS INNOVATE PERU */
            var proyectos_financiados_ip_sql = `UPDATE proyectos_financiados_ip SET a35_1_1 = ?, a35_2_1 = ?, a35_3_1 = ?, a35_4_1 = ?, a35_5_1 = ?, a35_6_1 = ?, a35_7_1 = ?, a35_1_2 = ?, a35_2_2 = ?, a35_3_2 = ?, a35_4_2 = ?, a35_5_2 = ?, a35_6_2 = ?, a35_7_2 = ?, a35_1_3 = ?, a35_2_3 = ?, a35_3_3 = ?, a35_4_3 = ?, a35_5_3 = ?, a35_6_3 = ?, a35_7_3 = ? WHERE id_proyecto = ?`;
            var proyectos_financiados_ip =[ req.body.a35_1_1 ? req.body.a35_1_1 : null, req.body.a35_2_1 ? req.body.a35_2_1 : null, req.body.a35_3_1 ? req.body.a35_3_1 : null, req.body.a35_4_1 ? req.body.a35_4_1 : null, req.body.a35_5_1 ? req.body.a35_5_1 : null, req.body.a35_6_1 ? req.body.a35_6_1 : null, req.body.a35_7_1 ? req.body.a35_7_1 : null, req.body.a35_1_2 ? req.body.a35_1_2 : null, req.body.a35_2_2 ? req.body.a35_2_2 : null, req.body.a35_3_2 ? req.body.a35_3_2 : null, req.body.a35_4_2 ? req.body.a35_4_2 : null, req.body.a35_5_2 ? req.body.a35_5_2 : null, req.body.a35_6_2 ? req.body.a35_6_2 : null, req.body.a35_7_2 ? req.body.a35_7_2 : null, req.body.a35_1_3 ? req.body.a35_1_3 : null, req.body.a35_2_3 ? req.body.a35_2_3 : null, req.body.a35_3_3 ? req.body.a35_3_3 : null, req.body.a35_4_3 ? req.body.a35_4_3 : null, req.body.a35_5_3 ? req.body.a35_5_3 : null, req.body.a35_6_3 ? req.body.a35_6_3 : null, req.body.a35_7_3 ? req.body.a35_7_3 : null, id ];
            con.query( proyectos_financiados_ip_sql, proyectos_financiados_ip, function (err, result) { if (err) { console.log(err); return; } });


            /* 8 COMPETITIVIDAD EMPRESARIAL */
            var competitividad_empresarial_sql = `UPDATE competitividad_empresarial SET entorno_empresarial = ?, situacion_actual = ?, identificacion_mercado = ?, competidores = ?, modelo_negocio = ?, capacidad_financiera = ?, rentabilidad_economica = ? WHERE id_proyecto = ?`;
            var competitividad_empresarial = [ req.body.entornoEmpresarial ? req.body.entornoEmpresarial : null, req.body.situacionActual ? req.body.situacionActual : null, req.body.identificacionDelMercado ? req.body.identificacionDelMercado : null, req.body.competidores ? req.body.competidores : null, req.body.modeloDeNegocio ? req.body.modeloDeNegocio : null, req.body.capacidadFinanciera ? req.body.capacidadFinanciera : null, req.body.rentabilidadEconomica ? req.body.rentabilidadEconomica : null, id ];
            con.query(competitividad_empresarial_sql, competitividad_empresarial, function (err, result) {  if (err) { console.log(err); return; } });

            /* 9 DIAGNOSTICO */
            var diagnostico_sql = `UPDATE diagnostico SET problemas_identificados = ? , consecuencias_efectos = ? , causas = ? , tipo_innovacion = ? , funcion_innovacion = ? , tecnologia = ? , forma_resultado = ? WHERE id_proyecto = ?`;
            var diagnostico = [ req.body.problemaIdentificado ? req.body.problemaIdentificado : null, req.body.consecuenciasEfectos ? req.body.consecuenciasEfectos : null, req.body.causas ? req.body.causas : null, req.body.tipoDeInnovacion ? req.body.tipoDeInnovacion : null, req.body.describirFuncion ? req.body.describirFuncion : null, req.body.describirTecnologia ? req.body.describirTecnologia : null, req.body.describirForma ? req.body.describirForma : null,  id ];
            con.query(diagnostico_sql, diagnostico, function (err, result) { if (err) { console.log(err); return; } });

            /* 10 CARACTERISTICAS */
            var caracateristicas_sql = `UPDATE caracateristicas SET c2_1_1 = ? , c2_2_1 = ? , c2_3_1 = ? , c2_4_1 = ? , c2_5_1 = ? , c2_1_2 = ? , c2_2_2 = ? , c2_3_2 = ? , c2_4_2 = ? , c2_5_2 = ? , c2_1_3 = ? , c2_2_3 = ? , c2_3_3 = ? , c2_4_3 = ? , c2_5_3 = ? WHERE id_proyecto = ?`;
            var caracateristicas = [ req.body.c2_1_1 ? req.body.c2_1_1 : null, req.body.c2_2_1 ? req.body.c2_2_1 : null, req.body.c2_3_1 ? req.body.c2_3_1 : null, req.body.c2_4_1 ? req.body.c2_4_1 : null, req.body.c2_5_1 ? req.body.c2_5_1 : null, req.body.c2_1_2 ? req.body.c2_1_2 : null, req.body.c2_2_2 ? req.body.c2_2_2 : null, req.body.c2_3_2 ? req.body.c2_3_2 : null, req.body.c2_4_2 ? req.body.c2_4_2 : null, req.body.c2_5_2 ? req.body.c2_5_2 : null, req.body.c2_1_3 ? req.body.c2_1_3 : null, req.body.c2_2_3 ? req.body.c2_2_3 : null, req.body.c2_3_3 ? req.body.c2_3_3 : null, req.body.c2_4_3 ? req.body.c2_4_3 : null, req.body.c2_5_3 ? req.body.c2_5_3 : null, id ];
            con.query(caracateristicas_sql, caracateristicas, function (err, result) { if (err) { console.log(err); return; } });

            /* 11 ANTECEDENTES */
            var antecedentes_sql = `UPDATE antecedentes SET antecedentes = ? , tipo_conocimiento = ? , plan_metodologico = ? , propiedad_intelectual = ? WHERE id_proyecto = ?`;
            var antecedentes = [ req.body.antecedentes ? req.body.antecedentes : null , req.body.libreRestrigido ? req.body.libreRestrigido : null , req.body.planMetodologico ? req.body.planMetodologico : null , req.body.propiedadIntelectual ? req.body.propiedadIntelectual : null , id ];
            con.query(antecedentes_sql, antecedentes, function (err, result) { if (err) { console.log(err); return; } });

            /* 12 OBJETIVOS */
            var objetivos_sql = `UPDATE objetivos SET c41og_1   = ? , c41og_2   = ? , c41og_3   = ? , c41oe_1_1 = ? , c41oe_2_1 = ? , c41oe_3_1 = ? , c41oe_1_2 = ? , c41oe_2_2 = ? , c41oe_3_2 = ? , c41oe_1_3 = ? , c41oe_2_3 = ? , c41oe_3_3 = ? , c41oe_1_4 = ? , c41oe_2_4 = ? , c41oe_3_4 = ? , c41oe_1_5 = ? , c41oe_2_5 = ? , c41oe_3_5 = ? WHERE id_proyecto = ?`;
            var objetivos = [ req.body.c41og_1   ? req.body.c41og_1   : null, req.body.c41og_2   ? req.body.c41og_2   : null, req.body.c41og_3   ? req.body.c41og_3   : null, req.body.c41oe_1_1 ? req.body.c41oe_1_1 : null, req.body.c41oe_2_1 ? req.body.c41oe_2_1 : null, req.body.c41oe_3_1 ? req.body.c41oe_3_1 : null, req.body.c41oe_1_2 ? req.body.c41oe_1_2 : null, req.body.c41oe_2_2 ? req.body.c41oe_2_2 : null, req.body.c41oe_3_2 ? req.body.c41oe_3_2 : null, req.body.c41oe_1_3 ? req.body.c41oe_1_3 : null, req.body.c41oe_2_3 ? req.body.c41oe_2_3 : null, req.body.c41oe_3_3 ? req.body.c41oe_3_3 : null, req.body.c41oe_1_4 ? req.body.c41oe_1_4 : null, req.body.c41oe_2_4 ? req.body.c41oe_2_4 : null, req.body.c41oe_3_4 ? req.body.c41oe_3_4 : null, req.body.c41oe_1_5 ? req.body.c41oe_1_5 : null, req.body.c41oe_2_5 ? req.body.c41oe_2_5 : null, req.body.c41oe_3_5 ? req.body.c41oe_3_5 : null, id ];
            con.query(objetivos_sql, objetivos, function (err, result) { if (err) { console.log(err); return; } });

            /* 14 IMPACTOS */
            var impactos_sql = `UPDATE impactos SET impactos_economicos = ?, impactos_sociales = ?, impactos_formacion = ?, potencialidad = ?, impactos_tecnologico = ?, impactos_ambientales = ?, medidas_mitigacion = ?, impactos_empresa = ? WHERE id_proyecto = ?`;
            var impactos = [ req.body.impactosEconomicos ? req.body.impactosEconomicos : null, req.body.impactosSociales ? req.body.impactosSociales : null, req.body.impactosEnLaFormacion ? req.body.impactosEnLaFormacion : null, req.body.pontencialidad ? req.body.pontencialidad : null, req.body.impactosDeLaTecnologia ? req.body.impactosDeLaTecnologia : null, req.body.impactosAmbientales ? req.body.impactosAmbientales : null, req.body.medidasDeMitigacion ? req.body.medidasDeMitigacion : null, req.body.impactosEnLaEmpresa ? req.body.impactosEnLaEmpresa : null, id ];
            con.query(impactos_sql, impactos, function (err, result) { if (err) { console.log(err); return; } });

            /* 25 ADJUNTO */
            var adjunto_sql = `UPDATE adjunto SET flujoDeCaja = ? , planAdjunto = ? WHERE id_proyecto = ?`;
            var adjunto = [req.body.flujoDeCaja ? req.body.flujoDeCaja : null, req.body.planAdjunto ? req.body.planAdjunto : null, id];
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

/*** EN PROCESO ***********************************************************************************************************/
router.post('/visualizar', function(req, res, next) {
    if(req.session.user){
        
        var conversion = require("phantom-html-to-pdf")();
        var pdf = require('../models/pdf').pdf;
        
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
      , impactos.*
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
      INNER JOIN impactos ON impactos.id_proyecto = proyecto.id_proyecto`;
        
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