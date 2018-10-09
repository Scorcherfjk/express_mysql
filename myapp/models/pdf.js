var hoy = new Date();
function addZero(i) { 
    if (i < 10) { 
        i = '0' + i; 
    } return i; 
}
function fecha(i){ 
    if (i != null) { 
        var dd = i.getDate(); 
        var mm = i.getMonth()+1; 
        var yyyy = i.getFullYear(); 
        dd = addZero(dd); 
        mm = addZero(mm); 
        return dd+'-'+mm+'-'+yyyy; 
    }else { 
        return i;
    } 
}
  

exports.pdf = (lista) => {
    var html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
        body { font-family: Arial, Helvetica, sans-serif; }
        h1,h2,h3,h4,h5,h6 { text-transform: capitalize; }
    p {
        border: 2px solid black;
        padding-left: 4px;
        font-size: .8em;
    }
    table, td, th {
        border: 2px solid black;
        font-size: .8em;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th {
        text-align: center;
        text-transform: capitalize;
    }
    td {
        padding: 5px;
        text-align: left;
    }
        img{
            width:400px;
            height:120px;
    }
    .centrado{
        margin: auto;
        text-align: center;
    }
    img{
        width:400px;
        height:120px;
    }
    .datos{
        margin: auto;
    }
</style>
</head>`;

html += `<body><img src="http://127.0.0.1:3000/images/presentacion.png" alt="logo de la universidad">
<h2 class="centrado">FORMATO DEL PROYECTO</h2>
<h3 class="centrado"> `+   fecha(hoy)  +`  </h3>
<hr>
<h3 class="datos">Fecha de Registro:  `+   fecha(lista.fecha_creacion) +`</h3>
<h3 class="datos">Solicitante:  `+ lista.nombres +` `+ lista.apellido_paterno +`</h3>
<h3 class="datos">Telefono:  `+ lista.telefono_movil +`</h3>
<h3 class="datos">Correo:  `+ lista.email + `</h3>
`;

html+=`<h2>SECCIÓN A: IDENTIFICACIÓN DE LAS ENTIDADES PARTICIPANTES</h2>
<h3>A.1 - Datos generales del proyecto</h3>
<h4>A.1.1 - Título</h4>
<p> `+   lista.titulo  +`  </p>

<h4>A.1.2 - Palabras clave</h4>
<p> `+   lista.palabras_clave  +`  </p>

<h4>A.1.3 - Area de innovación</h4>
<br>
<table border="1">
    <thead>
        <tr>
            <th>Area</th>
            <th>Sub-area</th>
            <th>Area tematica</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> `+   lista.area_innovacion_area  +`  </td>
            <td> `+   lista.area_innovacion_subarea  +`  </td>
            <td> `+   lista.area_innovacion_tematica  +`  </td>
        </tr>
    </tbody>
</table>
<h4>A.1.4 - actividad economica en la que se aplicara la innovacion</h4>
<br>
<table border="1">
    <thead>
        <tr>
            <th>Area de aplicacion</th>
            <th>Sub-area de aplicacion</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> `+   lista.aplicacion_area  +`  </td>
            <td> `+   lista.aplicacion_subarea  +`  </td>
        </tr>
    </tbody>
</table>
<h4>A.1.5 - localizacion del proyecto</h4>
<br>
<table border="1">
    <thead>
        <tr>
            <th>Departamento</th>
            <th>Provincia</th>
            <th>Distrito</th>
            <th>Ubigeo</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> `+   lista.localizacion_departamento  +`  </td>
            <td> `+   lista.localizacion_provincia  +`  </td>
            <td> `+   lista.localizacion_distrito  +`  </td>
            <td> `+   lista.localizacion_ubigeo  +`  </td>
        </tr>
    </tbody>
</table>

<h5>A.1.6 - Duracion del proyecto</h5>
<p> `+   lista.duracion_proyecto  +`  </p>

<h5>A.1.7 - Fecha estimada de inicio del proyecto</h5>
<p>  `+   fecha(lista.fecha_estimada_inicio)  +`   </p>

<h4>A.1.8 - Datos del coordinador general del proyecto</h4>

<h5>Tipo de documento</h5>
<p>  `+   lista.cgp_tipo_documento  +`   </p>

<h5>Numero de documento</h5>
<p>  `+   lista.cgp_nro_documento  +`   </p>

<h5>RUC</h5>
<p>  `+   lista.cgp_ruc  +`   </p>

<h5>Nombres y Apellidos</h5>
<p>  `+   lista.cgp_nombre  +`   </p>

<h5>fecha de nacimiento</h5>
<p>  `+   fecha(lista.cgp_fecha_nac)  +`   </p>

<h5>sexo</h5>
<p>  `+   lista.cgp_sexo  +`   </p>

<h5>Correo electronico</h5>
<p>  `+   lista.cgp_email  +`   </p>

<h5>Telefono</h5>
<p>  `+   lista.cgp_telefono  +`   </p>

<h5>Celular</h5>
<p>  `+   lista.cgp_celular  +`   </p>


<h4>A.1.9 - Datos del coordinador administrativo del proyecto</h4>

<h5>Tipo de documento</h5>
<p>  `+   lista.cap_tipo_documento  +`   </p>

<h5>Numero de documento</h5>
<p>  `+   lista.cap_nro_documento  +`   </p>

<h5>RUC</h5>
<p>  `+   lista.cap_ruc  +`   </p>

<h5>Nombres y Apellidos</h5>
<p>  `+   lista.cap_nombre  +`   </p>

<h5>fecha de nacimiento</h5>
<p>  `+   fecha(lista.cap_fecha_nac)  +`   </p>

<h5>sexo</h5>
<p>  `+   lista.cap_sexo  +`   </p>

<h5>Correo electronico</h5>
<p>  `+   lista.cap_email  +`   </p>

<h5>Telefono</h5>
<p>  `+   lista.cap_telefono  +`   </p>

<h5>Celular</h5>
<p>  `+   lista.cap_celular  +`   </p>


<h3>A.2 - Datos de las entidades participantes</h3>

<h4>A.2.1 - Entidad solicitante</h4>

<h5>Tipo de entidad</h5>
<p>  `+   lista.es_tipo  +`   </p>

<h5>Tamaño de la empresa</h5>
<p>  `+   lista.es_tamano  +`   </p>

<h5>Numero de Trabajadores</h5>
<p>  `+   lista.es_nro_trabajadores  +`   </p>

<h5>RUC y Razon social</h5>
<p>  `+   lista.es_ruc  +`   </p>

<h5>CIIU</h5>
<p>  `+   lista.es_ciiu  +`   </p>

<h5>Direccion</h5>
<p>  `+   lista.es_direccion  +`   </p>

<h5>Fecha de Constitucion</h5>
<p>  `+   fecha(lista.es_fecha_constitucion)  +`   </p>

<h5>Inicio de actividades</h5>
<p>  `+   fecha(lista.es_inicio_actividades)  +`   </p>

<h5>Numero de partida</h5>
<p>  `+   lista.es_nro_partida  +`   </p>

<h5>Oficina registral</h5>
<p>  `+   lista.es_oficina_registral  +`   </p>

<h5>Telefono / Celular</h5>
<p>  `+   lista.es_telefono  +`   </p>

<h5>Correo electronico</h5>
<p>  `+   lista.es_correo  +`   </p>

<h5>Pagina Web</h5>
<p>  `+   lista.es_pagina_web  +`   </p>

<h5>Ventas del año 2016</h5>
<p>  `+   lista.es_ventas2016  +`   </p>

<h5>Ventas del año 2017</h5>
<p>  `+   lista.es_ventas2017  +`   </p>

<h4>Representante legal</h4>

<h5>Tipo de documento</h5>
<p>  `+   lista.rl_tipo_documento  +`   </p>

<h5>Numero de documento</h5>
<p>  `+   lista.rl_nro_documento  +`   </p>

<h5>RUC</h5>
<p>  `+   lista.rl_ruc  +`   </p>

<h5>Nombres y Apellidos</h5>
<p>  `+   lista.rl_nombre  +`   </p>

<h5>sexo</h5>
<p>  `+   lista.rl_sexo  +`   </p>

<h5>Correo electronico</h5>
<p>  `+   lista.rl_email  +`   </p>

<h5>Telefonos</h5>
<p>  `+   lista.rl_telefono  +`   </p>

<h5>Indicar los productos ( Bienes y Servicios ) que en en la actualidad comercializa</h5>
<p>  `+   lista.rl_productos_comercializados  +`   </p>

<h5>Principales actividades, investigaciones, tecnologias relacionadas con el proyecto</h5>
<p>  `+   lista.rl_actividades_relacionadas  +`   </p>

<h5>Infraestructura fisica, equipamiento, tecnologias y procesos de la entidad solicitante</h5>
<p>  `+   lista.rl_infraestructura_es  +`   </p>`;

html+=`<h4> A.2.2 - entidades asociadas</h4>
<br>
<table border="1">
    <thead>
        <tr>
            
            <th>ruc</th>
            <th>nombre de la entidad</th>
            <th>tipo de entidad</th>
            <th>tipo de relacion</th>
            <th>nombre completo</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> `+  lista.a22_1_1 +`  </td>
            <td> `+  lista.a22_2_1 +`  </td>
            <td> `+  lista.a22_3_1 +`  </td>
            <td> `+  lista.a22_4_1 +`  </td>
            <td> `+  lista.a22_5_1 +`  </td>
        </tr>`;
if (lista.a22_1_2 || lista.a22_2_2 || lista.a22_3_2 || lista.a22_4_2 || lista.a22_5_2 ){
    html += `<tr>
            <td> `+  lista.a22_1_2 +`  </td>
            <td> `+  lista.a22_2_2 +`  </td>
            <td> `+  lista.a22_3_2 +`  </td>
            <td> `+  lista.a22_4_2 +`  </td>
            <td> `+  lista.a22_5_2 +`  </td>
        </tr>`;
}
if (lista.a22_1_3 || lista.a22_2_3 || lista.a22_3_3 || lista.a22_4_3 || lista.a22_5_3 ){
    html += `<tr>
            <td> `+  lista.a22_1_3 +`  </td>
            <td> `+  lista.a22_2_3 +`  </td>
            <td> `+  lista.a22_3_3 +`  </td>
            <td> `+  lista.a22_4_3 +`  </td>
            <td> `+  lista.a22_5_3 +`  </td>
        </tr>`;
}
html += `</tbody>
</table>

<h3>A.3 - antecedentes de las entidades participantes</h3>
<h4>A.3.1 - Principales actividades, investigaciones, tecnologias relacionadas con el proyecto</h4>
<br>
<table border="1">
    <thead>
        <tr>
            <th>nombre de la entidad</th>
            <th>principales actividades y experiencia</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> `+  lista.a31_1_1 +`  </td>
            <td> `+  lista.a31_2_1 +`  </td>
        </tr>`;
if (lista.a31_1_2 || lista.a31_2_2){
    html += `<tr>
            <td> `+  lista.a31_1_2 +`  </td>
            <td> `+  lista.a31_2_2 +`  </td>
        </tr>`;
}
if (lista.a31_1_3 || lista.a31_2_3){
    html += `<tr>
            <td> `+  lista.a31_1_3 +`  </td>
            <td> `+  lista.a31_2_3 +`  </td>
        </tr>`;
}
html += `</tbody>
</table>

<h4>A.3.2 - Principales actividades, investigaciones, tecnologias y procesos que se aportaran al proyecto</h4>
<br>
<table border="1">
    <thead>
        <tr>
            
            <th>nombre de la entidad</th>
            <th>principal infraestructura fisica</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> `+  lista.a32_1_1 +`  </td>
            <td> `+  lista.a32_2_1 +`  </td>
        </tr>`;
if (lista.a32_1_2 || lista.a32_2_2){
    html += `<tr>
            <td> `+  lista.a32_1_2 +`  </td>
            <td> `+  lista.a32_2_2 +`  </td>
        </tr>`;
}
if (lista.a32_1_3 || lista.a32_2_3){
    html += `<tr>
            <td> `+  lista.a32_1_3 +`  </td>
            <td> `+  lista.a32_2_3 +`  </td>
        </tr>`;
}
html += `</tbody>
</table>

<h4>A.3.3 - Principales aspectos que evidencien que la entidad se beneficiara con los resultados</h4>
<br>
<table border="1">
    <thead>
        <tr>
            
            <th>nombre de la entidad</th>
            <th>justificacion para contar con la entidad</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td> `+  lista.a33_1_1 +`  </td>
        <td> `+  lista.a33_2_1 +`  </td>
    </tr>`;
    if (lista.a33_1_2 || lista.a33_2_2){
        html += `<tr>
                <td> `+  lista.a33_1_2 +`  </td>
                <td> `+  lista.a33_2_2 +`  </td>
            </tr>`;
    }
    if (lista.a33_1_3 || lista.a33_2_3){
        html += `<tr>
                <td> `+  lista.a33_1_3 +`  </td>
                <td> `+  lista.a33_2_3 +`  </td>
            </tr>`;
    }
html += `</tbody>
</table>

<h4>A.3.4 - Fondos recibidos por alguna entidad del estado hacia la entidad solicitante</h4>
<br>
<table border="1">
    <thead>
        <tr>
            
            <th>nombre del otorgante</th>
            <th>nombre del proyecto</th>
            <th>monto</th>
            <th>fecha de reposicion</th>
            <th>fecha de finalizacion</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> `+  lista.a34_1_1 +`  </td>
            <td> `+  lista.a34_2_1 +`  </td>
            <td> `+  lista.a34_3_1 +`  </td>
            <td> `+ fecha(lista.a34_4_1) +`  </td>
            <td> `+ fecha(lista.a34_5_1) +`  </td>
        </tr>`;
    if (lista.a34_1_2 || lista.a34_2_2 || lista.a34_3_2 || lista.a34_4_2 || lista.a34_5_2 ){
        html += `<tr>
                <td> `+  lista.a34_1_2 +`  </td>
                <td> `+  lista.a34_2_2 +`  </td>
                <td> `+  lista.a34_3_2 +`  </td>
                <td> `+ fecha(lista.a34_4_2) +`  </td>
                <td> `+ fecha(lista.a34_5_2) +`  </td>
            </tr>`;
    }
    if (lista.a34_1_3 || lista.a34_2_3 || lista.a34_3_3 || lista.a34_4_3 || lista.a34_5_3 ){
        html += `<tr>
                <td> `+  lista.a34_1_3 +`  </td>
                <td> `+  lista.a34_2_3 +`  </td>
                <td> `+  lista.a34_3_3 +`  </td>
                <td> `+ fecha(lista.a34_4_3) +`  </td>
                <td> `+ fecha(lista.a34_5_3) +`  </td>
            </tr>`;
    }
html += `</tbody>
</table>

<h4>A.3.5 - Situacion de los proyectos financiados por innovate peru ( PIMEN, PIPEI, PITEI, PIPEA )</h4>
<br>
<table border="1">
    <thead>
        <tr>
            
            <th>contrato</th>
            <th>titulo</th>
            <th>aporte RNR</th>
            <th>fecha inicio</th>
            <th>fecha fin</th>
            <th>estado</th>
            <th>situacion actual</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td> `+ lista.a35_1_1  +` </td>
        <td> `+ lista.a35_2_1  +` </td>
        <td> `+ lista.a35_3_1  +` </td>
        <td> `+ fecha(lista.a35_4_1)  +` </td>
        <td> `+ fecha(lista.a35_5_1)  +` </td>
        <td> `+ lista.a35_6_1  +` </td>
        <td> `+ lista.a35_7_1  +` </td>
    </tr>`;
    if (lista.a35_1_2 || lista.a35_2_2 || lista.a35_3_2 || lista.a35_4_2 || lista.a35_5_2 || lista.a35_6_2 || lista.a35_7_2){
    html += `<tr>
            <td> `+ lista.a35_1_2 +` </td>
            <td> `+ lista.a35_2_2 +` </td>
            <td> `+ lista.a35_3_2 +` </td>
            <td> `+ fecha(lista.a35_4_2) +` </td>
            <td> `+ fecha(lista.a35_5_2) +` </td>
            <td> `+ lista.a35_6_2 +` </td>
            <td> `+ lista.a35_7_2 +` </td>
        </tr>`;
    }
    if (lista.a35_1_3 || lista.a35_2_3 || lista.a35_3_3 || lista.a35_4_3 || lista.a35_5_3 || lista.a35_6_3 || lista.a35_7_3){
    html += `<tr>
            <td> `+ lista.a35_1_3 +` </td>
            <td> `+ lista.a35_2_3 +` </td>
            <td> `+ lista.a35_3_3 +` </td>
            <td> `+ fecha(lista.a35_4_3) +` </td>
            <td> `+ fecha(lista.a35_5_3) +` </td>
            <td> `+ lista.a35_6_3 +` </td>
            <td> `+ lista.a35_7_3 +` </td>
        </tr>`;
    }
html += `</tbody>
</table>`;




html +=`<h2>SECCIÓN B: MERCADO - COMPETITIVIDAD EMPRESARIAL</h2>

<h3>B.1 - situacion actual de mercado del producto y/o servicio y de la empresarial</h3>



<h4>B.1.1 - situacion del entorno empresarial</h4>
<p>   `+   lista.entorno_empresarial  +`   </p>
<h4>B.1.2 - situacion actual de la empresa respecto a su negocio y participacion en el mercado</h4>
<p>  `+   lista.situacion_actual  +`   </p>


<h3>B.2 - Identificación del mercado potencial de la innovación y sustentación de la oportunidad comercial</h3>

<h4>B.2.1 Identificación del mercado potencial, donde se implementará a escala comercial los resultados del proyecto</h4>
<p>  `+   lista.identificacion_mercado  +`   </p>
<h4>B.2.2 Competidores</h4>
<p>  `+   lista.competidores  +`   </p>



<h3>B.3 Modelo de negocio y la estrategia empresarial para el ingreso de la innovación al mercado</h3>
<h4>B.3.1 Modelo de negocio y la estrategia empresarial para el ingreso de la innovación al mercado</h4>
<p>  `+   lista.modelo_negocio  +`   </p>

<h3>B.4 Capacidad financiera para el escalamiento de los resultados esperados y la implantación</h3>
<h4>B.4.1 Capacidad financiera para el escalamiento de los resultados esperados y la implantación</h4>
<p>  `+   lista.capacidad_financiera  +`   </p>

<h3>B.5 Rentabilidad Económica y Financiera</h3>
<h4>B.5.1 Rentabilidad Económica y Financiera</h4>
<p>  `+   lista.rentabilidad_econimica  +`   </p>

<!---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->

<h2>SECCIÓN C: MEMORIA TÉCNICA</h2>

<h3>C.1 Diagnóstico</h3>
<h4>C.1.1 Problema identificado que limita la competitividad de la empresa u oportunidad de mercado</h4>
<p>  `+   lista.problemas_identificados  +`   </p>
<h4>C.1.2 Consecuencias o efectos</h4>
<p>  `+   lista.consecuencias_efectos  +`   </p>
<h4>C.1.3 Causas</h4>
<p>  `+   lista.causas  +`   </p>
<h4>C.1.4. Tipo de innovación y descripción</h4>
<p>  `+   lista.tipo_innovacion  +`   </p>


<h5>Tipo de Innovación</h5>
<h5>1. Describir la función que realizará la innovación</h5>
<p>  `+   lista.funcion_innovacion  +`   </p>
<h5>2. Describir la tecnología que se empleará para construir la innovación</h5>
<p>  `+   lista.tecnologia  +`   </p>
<h5>3. Describa la forma en que se entregará el resultado</h5>
<p>  `+   lista.forma_resultado  +`   </p>

<h3>C.2 Descripción de las características de producto o proceso de la innovación presentada</h3>
<br>
<table border="1">
    <thead>
        <tr>
            <th>atributo</th>
            <th>competidor 1</th>
            <th>competidor 2</th>
            <th>competidor 3</th>
            <th>propuesta de proyecto</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>atributo</td>
            <td>competidor 1</td>
            <td>competidor 2</td>
            <td>competidor 3</td>
            <td>propuesta de proyecto</td>
        </tr>
    </tbody>
</table>



C.3 Antecedentes e Investigaciones recientes sobre la innovación a desarrollar

<h4>C.3.1 Antecedentes e investigaciones recientes sobre el problema a resolver</h4>
<p>  `+   lista.antecedentes  +`   </p>

<h4>C.3.2 Indicar si el conocimiento o la tecnología que se utilizará son de uso libre o restringido</h4>
<p>  `+   lista.tipo_conocimiento  +`   </p>


C.4 Objetivos

<h4>C.4.1 Objetivo general, específicos y resultados del proyecto</h4>

<h5>Objetivo General</h5>
<br>
<table border="1">
    <thead>
        <tr>
            <th>objetivo general - proposito del proyecto</th>
            <th>resultados finales</th>
            <th>medios de verificacion</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>atributo</td>
            <td>competidor 1</td>
            <td>competidor 2</td>
        </tr>
    </tbody>
</table>


<h5>Objetivo Especifico</h5>
<br>
<table border="1">
    <thead>
        <tr>
            <th>objetivo específico - componentes</th>
            <th>resultados intermedios</th>
            <th>medios de verificacion</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>atributo</td>
            <td>competidor 1</td>
            <td>competidor 2</td>
        </tr>
    </tbody>
</table>

<h4>C.4.2.Cronograma de actividades</h4>
<br>
<table border="1">
    <thead>
        <tr>
            <th rowspan="2">actividad</th>
            <th rowspan="2">unidad de medida</th>
            <th rowspan="2">meta fisica</th>
            <th colspan="6">año 1</th>
        </tr>
        <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>atributo</td>
            <td>competidor 1</td>
            <td>competidor 2</td>
            <td>año 1</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
        </tr>
    </tbody>
</table>

<h3>C.5 Descripción de la Metodología</h3>

<h4>C.5.1. Plan Metodológico del proyecto</h4>
<p>  `+   lista.plan_metodologico  +`   </p>

<h3>C.6. Propiedad Intelectual</h3>

<h4>C.6.1 Propiedad Intelectual</h4>
<p>  `+   lista.propiedad_intelectual  +`   </p>

<h3>C.7 Impactos Esperados</h3>

<h4>C.7.1 Impactos económicos</h4>
<p>  `+   lista.impactos_economicos  +`   </p>

<h4>C.7.2 Impactos sociales</h4>
<p>  `+   lista.impactos_sociales  +`   </p>

<h4>C.7.3 Impactos en la formación de cadenas productivas o clústeres y otras externalidades</h4>
<p>  `+   lista.impactos_formacion  +`   </p>

<h4>C.7.4 Potencialidad de ser replicado por empresas similares</h4>
<p>  `+   lista.potencialidad  +`   </p>

<h4>C.7.5 Impactos en Tecnología</h4>
<p>  `+   lista.impactos_tecnologico  +`   </p>

<h4>C.7.6 Impactos ambientales</h4>
<p>  `+   lista.impactos_ambientales  +`   </p>

<h4>C.7.7 Medidas de mitigación para los impactos ambientales identificados como negativos y permanentes (o
    temporales)</h4>
<p>  `+   lista.medidas_mitigacion  +`   </p>

<h4>C.7.8 Impactos en la capacidad interna de innovación de la empresa</h4>
<p>  `+   lista.impactos_empresa  +`   </p>




<h3>C.8. Recursos Necesarios</h3>


<h5>datos del equipo tecnico</h5>

<br>
<table border="1">
    <thead>
        <tr>
            <th>Es Investigador</th>
            <th>Nombre</th>
            <th>Ap. Paterno</th>
            <th>Ap. Materno</th>
            <th>Especialidad</th>
            <th>Función Técnica</th>
            <th>Porcentaje de Dedicación</th>
            <th>Investigador Principal</th>
            <th>Coordinador General</th>
            <th>Coordinador Administrativo</th>
            <th>Entidad a la que pertenecen</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`+ lista.c8_1_1 +`</td>
            <td>`+ lista.c8_2_1 +`</td>
            <td>`+ lista.c8_3_1 +`</td>
            <td>`+ lista.c8_4_1 +`</td>
            <td>`+ lista.c8_5_1 +`</td>
            <td>`+ lista.c8_6_1 +`</td>
            <td>`+ lista.c8_7_1 +`</td>
            <td>`+ lista.c8_8_1 +`</td>
            <td>`+ lista.c8_9_1 +`</td>
            <td>`+ lista.c8_10_1 +`</td>
            <td>`+ lista.c8_11_1 +`</td>
        </tr>
        <tr>
            <td>`+ lista.c8_1_2 +`</td>
            <td>`+ lista.c8_2_2 +`</td>
            <td>`+ lista.c8_3_2 +`</td>
            <td>`+ lista.c8_4_2 +`</td>
            <td>`+ lista.c8_5_2 +`</td>
            <td>`+ lista.c8_6_2 +`</td>
            <td>`+ lista.c8_7_2 +`</td>
            <td>`+ lista.c8_8_2 +`</td>
            <td>`+ lista.c8_9_2 +`</td>
            <td>`+ lista.c8_10_2 +`</td>
            <td>`+ lista.c8_11_2 +`</td>
        </tr>
        <tr>
            <td>`+ lista.c8_1_3 +`</td>
            <td>`+ lista.c8_2_3 +`</td>
            <td>`+ lista.c8_3_3 +`</td>
            <td>`+ lista.c8_4_3 +`</td>
            <td>`+ lista.c8_5_3 +`</td>
            <td>`+ lista.c8_6_3 +`</td>
            <td>`+ lista.c8_7_3 +`</td>
            <td>`+ lista.c8_8_3 +`</td>
            <td>`+ lista.c8_9_3 +`</td>
            <td>`+ lista.c8_10_3 +`</td>
            <td>`+ lista.c8_11_3 +`</td>
        </tr>
        <tr>
            <td>`+ lista.c8_1_4 +`</td>
            <td>`+ lista.c8_2_4 +`</td>
            <td>`+ lista.c8_3_4 +`</td>
            <td>`+ lista.c8_4_4 +`</td>
            <td>`+ lista.c8_5_4 +`</td>
            <td>`+ lista.c8_6_4 +`</td>
            <td>`+ lista.c8_7_4 +`</td>
            <td>`+ lista.c8_8_4 +`</td>
            <td>`+ lista.c8_9_4 +`</td>
            <td>`+ lista.c8_10_4 +`</td>
            <td>`+ lista.c8_11_4 +`</td>
        </tr>
        <tr>
            <td>`+ lista.c8_1_5 +`</td>
            <td>`+ lista.c8_2_5 +`</td>
            <td>`+ lista.c8_3_5 +`</td>
            <td>`+ lista.c8_4_5 +`</td>
            <td>`+ lista.c8_5_5 +`</td>
            <td>`+ lista.c8_6_5 +`</td>
            <td>`+ lista.c8_7_5 +`</td>
            <td>`+ lista.c8_8_5 +`</td>
            <td>`+ lista.c8_9_5 +`</td>
            <td>`+ lista.c8_10_5 +`</td>
            <td>`+ lista.c8_11_5 +`</td>
        </tr>
    </tbody>
</table>

<h2>SECCIÓN D: PRESUPUESTO DEL PROYECTO</h2>

<h3>D.1 Moneda y Presupuesto del Proyecto</h3>
<h5>Moneda del Proyecto</h5>
<p>  `+   lista.tipo_moneda  +`   </p>

<h4>D.1.1 CUADRO Nº 1: Equipos y Bienes duraderos</h4>
<br>
<table border="1">
    <thead>
        <tr>
            <th>Valorizable </th>
            <th>Equipos y Bienes duraderos </th>
            <th>Especificación técnica </th>
            <th>Proforma </th>
            <th>Unidad de medida </th>
            <th>Costo Unitario </th>
            <th>Cantidad </th>
            <th>Costo Total </th>
            <th>RNR </th>
            <th>Cofinanciamiento monetario </th>
            <th>Cofinanciamiento NO monetario </th>
            <th>Entidad Aportante </th>
        </tr>
    </thead>
    <tbody>
        <tr> 
            <td>`+ lista.d11_1_1 +`</td>
            <td>`+ lista.d11_2_1 +`</td>
            <td>`+ lista.d11_3_1 +`</td>
            <td>`+ lista.d11_4_1 +`</td>
            <td>`+ lista.d11_5_1 +`</td>
            <td>`+ lista.d11_6_1 +`</td>
            <td>`+ lista.d11_7_1 +`</td>
            <td>`+ lista.d11_8_1 +`</td>
            <td>`+ lista.d11_9_1 +`</td>
            <td>`+ lista.d11_10_1 +`</td>
            <td>`+ lista.d11_11_1 +`</td>
            <td>`+ lista.d11_12_1 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d11_1_2 +`</td>
            <td>`+ lista.d11_2_2 +`</td>
            <td>`+ lista.d11_3_2 +`</td>
            <td>`+ lista.d11_4_2 +`</td>
            <td>`+ lista.d11_5_2 +`</td>
            <td>`+ lista.d11_6_2 +`</td>
            <td>`+ lista.d11_7_2 +`</td>
            <td>`+ lista.d11_8_2 +`</td>
            <td>`+ lista.d11_9_2 +`</td>
            <td>`+ lista.d11_10_2 +`</td>
            <td>`+ lista.d11_11_2 +`</td>
            <td>`+ lista.d11_12_2 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d11_1_3 +`</td>
            <td>`+ lista.d11_2_3 +`</td>
            <td>`+ lista.d11_3_3 +`</td>
            <td>`+ lista.d11_4_3 +`</td>
            <td>`+ lista.d11_5_3 +`</td>
            <td>`+ lista.d11_6_3 +`</td>
            <td>`+ lista.d11_7_3 +`</td>
            <td>`+ lista.d11_8_3 +`</td>
            <td>`+ lista.d11_9_3 +`</td>
            <td>`+ lista.d11_10_3 +`</td>
            <td>`+ lista.d11_11_3 +`</td>
            <td>`+ lista.d11_12_3 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d11_1_4 +`</td>
            <td>`+ lista.d11_2_4 +`</td>
            <td>`+ lista.d11_3_4 +`</td>
            <td>`+ lista.d11_4_4 +`</td>
            <td>`+ lista.d11_5_4 +`</td>
            <td>`+ lista.d11_6_4 +`</td>
            <td>`+ lista.d11_7_4 +`</td>
            <td>`+ lista.d11_8_4 +`</td>
            <td>`+ lista.d11_9_4 +`</td>
            <td>`+ lista.d11_10_4 +`</td>
            <td>`+ lista.d11_11_4 +`</td>
            <td>`+ lista.d11_12_4 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d11_1_5 +`</td>
            <td>`+ lista.d11_2_5 +`</td>
            <td>`+ lista.d11_3_5 +`</td>
            <td>`+ lista.d11_4_5 +`</td>
            <td>`+ lista.d11_5_5 +`</td>
            <td>`+ lista.d11_6_5 +`</td>
            <td>`+ lista.d11_7_5 +`</td>
            <td>`+ lista.d11_8_5 +`</td>
            <td>`+ lista.d11_9_5 +`</td>
            <td>`+ lista.d11_10_5 +`</td>
            <td>`+ lista.d11_11_5 +`</td>
            <td>`+ lista.d11_12_5 +`</td>
        </tr>
    </tbody>
</table>
<h4>D.1.2 CUADRO Nº 2: Honorarios de los Recursos Humanos - Valorización del equipo Técnico</h4>
<br>
<table border="1">
    <thead>
        <tr>
            <th>Nombre </th>
            <th>Entidad </th>
            <th>Porcentaje de dedicación </th>
            <th>Honorario mensual </th>
            <th>No. Meses </th>
            <th>Costo Total </th>
            <th>RNR </th>
            <th>Cofinanciamiento monetario </th>
            <th>Cofinanciamiento no monetario </th>
            <th>Entidad Aportante</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`+ lista.d12_1_1 +`</td>
            <td>`+ lista.d12_2_1 +`</td>
            <td>`+ lista.d12_3_1 +`</td>
            <td>`+ lista.d12_4_1 +`</td>
            <td>`+ lista.d12_5_1 +`</td>
            <td>`+ lista.d12_6_1 +`</td>
            <td>`+ lista.d12_7_1 +`</td>
            <td>`+ lista.d12_8_1 +`</td>
            <td>`+ lista.d12_9_1 +`</td>
            <td>`+ lista.d12_10_1 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d12_1_2 +`</td>
            <td>`+ lista.d12_2_2 +`</td>
            <td>`+ lista.d12_3_2 +`</td>
            <td>`+ lista.d12_4_2 +`</td>
            <td>`+ lista.d12_5_2 +`</td>
            <td>`+ lista.d12_6_2 +`</td>
            <td>`+ lista.d12_7_2 +`</td>
            <td>`+ lista.d12_8_2 +`</td>
            <td>`+ lista.d12_9_2 +`</td>
            <td>`+ lista.d12_10_2 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d12_1_3 +`</td>
            <td>`+ lista.d12_2_3 +`</td>
            <td>`+ lista.d12_3_3 +`</td>
            <td>`+ lista.d12_4_3 +`</td>
            <td>`+ lista.d12_5_3 +`</td>
            <td>`+ lista.d12_6_3 +`</td>
            <td>`+ lista.d12_7_3 +`</td>
            <td>`+ lista.d12_8_3 +`</td>
            <td>`+ lista.d12_9_3 +`</td>
            <td>`+ lista.d12_10_3 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d12_1_4 +`</td>
            <td>`+ lista.d12_2_4 +`</td>
            <td>`+ lista.d12_3_4 +`</td>
            <td>`+ lista.d12_4_4 +`</td>
            <td>`+ lista.d12_5_4 +`</td>
            <td>`+ lista.d12_6_4 +`</td>
            <td>`+ lista.d12_7_4 +`</td>
            <td>`+ lista.d12_8_4 +`</td>
            <td>`+ lista.d12_9_4 +`</td>
            <td>`+ lista.d12_10_4 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d12_1_5 +`</td>
            <td>`+ lista.d12_2_5 +`</td>
            <td>`+ lista.d12_3_5 +`</td>
            <td>`+ lista.d12_4_5 +`</td>
            <td>`+ lista.d12_5_5 +`</td>
            <td>`+ lista.d12_6_5 +`</td>
            <td>`+ lista.d12_7_5 +`</td>
            <td>`+ lista.d12_8_5 +`</td>
            <td>`+ lista.d12_9_5 +`</td>
            <td>`+ lista.d12_10_5 +`</td>
        </tr>
    </tbody>
</table>
<h4>D.1.3 CUADRO Nº 3: Consultorías</h4>
<br>
<table border="1">
    <thead>
        <tr>
            <th>Descripción </th>
            <th>Unidad Medida </th>
            <th>Costo unitario </th>
            <th>Cantidad </th>
            <th>Costo Total </th>
            <th>RNR </th>
            <th>Cofinanciamiento monetario </th>
            <th>Cofinanciamiento no monetario </th>
            <th>Entidad Aportante</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`+ lista.d13_1_1 +`</td>
            <td>`+ lista.d13_2_1 +`</td>
            <td>`+ lista.d13_3_1 +`</td>
            <td>`+ lista.d13_4_1 +`</td>
            <td>`+ lista.d13_5_1 +`</td>
            <td>`+ lista.d13_6_1 +`</td>
            <td>`+ lista.d13_7_1 +`</td>
            <td>`+ lista.d13_8_1 +`</td>
            <td>`+ lista.d13_9_1 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d13_1_2 +`</td>
            <td>`+ lista.d13_2_2 +`</td>
            <td>`+ lista.d13_3_2 +`</td>
            <td>`+ lista.d13_4_2 +`</td>
            <td>`+ lista.d13_5_2 +`</td>
            <td>`+ lista.d13_6_2 +`</td>
            <td>`+ lista.d13_7_2 +`</td>
            <td>`+ lista.d13_8_2 +`</td>
            <td>`+ lista.d13_9_2 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d13_1_3 +`</td>
            <td>`+ lista.d13_2_3 +`</td>
            <td>`+ lista.d13_3_3 +`</td>
            <td>`+ lista.d13_4_3 +`</td>
            <td>`+ lista.d13_5_3 +`</td>
            <td>`+ lista.d13_6_3 +`</td>
            <td>`+ lista.d13_7_3 +`</td>
            <td>`+ lista.d13_8_3 +`</td>
            <td>`+ lista.d13_9_3 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d13_1_4 +`</td>
            <td>`+ lista.d13_2_4 +`</td>
            <td>`+ lista.d13_3_4 +`</td>
            <td>`+ lista.d13_4_4 +`</td>
            <td>`+ lista.d13_5_4 +`</td>
            <td>`+ lista.d13_6_4 +`</td>
            <td>`+ lista.d13_7_4 +`</td>
            <td>`+ lista.d13_8_4 +`</td>
            <td>`+ lista.d13_9_4 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d13_1_5 +`</td>
            <td>`+ lista.d13_2_5 +`</td>
            <td>`+ lista.d13_3_5 +`</td>
            <td>`+ lista.d13_4_5 +`</td>
            <td>`+ lista.d13_5_5 +`</td>
            <td>`+ lista.d13_6_5 +`</td>
            <td>`+ lista.d13_7_5 +`</td>
            <td>`+ lista.d13_8_5 +`</td>
            <td>`+ lista.d13_9_5 +`</td>
        </tr>
    </tbody>
</table>
<h4>D.1.4 CUADRO Nº 4: Servicios de terceros</h4>
<br>
<table border="1">
    <thead>
        <tr>
            <th>Descripción </th>
            <th>Unidad de medida </th>
            <th>Costo Unitario </th>
            <th>Cantidad </th>
            <th>Costo Total </th>
            <th>RNR </th>
            <th>Cofinanciamiento monetario </th>
            <th>Cofinanciamiento NO monetario </th>
            <th>Entidad Aportante</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`+ lista.d14_1_1 +`</td>
            <td>`+ lista.d14_2_1 +`</td>
            <td>`+ lista.d14_3_1 +`</td>
            <td>`+ lista.d14_4_1 +`</td>
            <td>`+ lista.d14_5_1 +`</td>
            <td>`+ lista.d14_6_1 +`</td>
            <td>`+ lista.d14_7_1 +`</td>
            <td>`+ lista.d14_8_1 +`</td>
            <td>`+ lista.d14_9_1 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d14_1_2 +`</td>
            <td>`+ lista.d14_2_2 +`</td>
            <td>`+ lista.d14_3_2 +`</td>
            <td>`+ lista.d14_4_2 +`</td>
            <td>`+ lista.d14_5_2 +`</td>
            <td>`+ lista.d14_6_2 +`</td>
            <td>`+ lista.d14_7_2 +`</td>
            <td>`+ lista.d14_8_2 +`</td>
            <td>`+ lista.d14_9_2 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d14_1_3 +`</td>
            <td>`+ lista.d14_2_3 +`</td>
            <td>`+ lista.d14_3_3 +`</td>
            <td>`+ lista.d14_4_3 +`</td>
            <td>`+ lista.d14_5_3 +`</td>
            <td>`+ lista.d14_6_3 +`</td>
            <td>`+ lista.d14_7_3 +`</td>
            <td>`+ lista.d14_8_3 +`</td>
            <td>`+ lista.d14_9_3 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d14_1_4 +`</td>
            <td>`+ lista.d14_2_4 +`</td>
            <td>`+ lista.d14_3_4 +`</td>
            <td>`+ lista.d14_4_4 +`</td>
            <td>`+ lista.d14_5_4 +`</td>
            <td>`+ lista.d14_6_4 +`</td>
            <td>`+ lista.d14_7_4 +`</td>
            <td>`+ lista.d14_8_4 +`</td>
            <td>`+ lista.d14_9_4 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d14_1_5 +`</td>
            <td>`+ lista.d14_2_5 +`</td>
            <td>`+ lista.d14_3_5 +`</td>
            <td>`+ lista.d14_4_5 +`</td>
            <td>`+ lista.d14_5_5 +`</td>
            <td>`+ lista.d14_6_5 +`</td>
            <td>`+ lista.d14_7_5 +`</td>
            <td>`+ lista.d14_8_5 +`</td>
            <td>`+ lista.d14_9_5 +`</td>
        </tr>
    </tbody>
</table>
<h4>D.1.5 CUADRO Nº 5: Pasajes y viáticos</h4>
<br>
<table border="1">
    <thead>
        <tr>
            <th>Tipo </th>
            <th>Tipo de viático </th>
            <th>Tipo de Actividad </th>
            <th>Destino </th>
            <th>Descripción </th>
            <th>Unidad de medida </th>
            <th>Costo Unitario </th>
            <th>Cantidad </th>
            <th>Costo Total </th>
            <th>RNR </th>
            <th>Cofinanciamiento monetario </th>
            <th>Cofinanciamiento NO monetario </th>
            <th>Entidad Aportante</th>
        </tr>
    </thead>
    <tbody>
        <tr> 
            <td>`+ lista.d15_1_1 +`</td>
            <td>`+ lista.d15_2_1 +`</td>
            <td>`+ lista.d15_3_1 +`</td>
            <td>`+ lista.d15_4_1 +`</td>
            <td>`+ lista.d15_5_1 +`</td>
            <td>`+ lista.d15_6_1 +`</td>
            <td>`+ lista.d15_7_1 +`</td>
            <td>`+ lista.d15_8_1 +`</td>
            <td>`+ lista.d15_9_1 +`</td>
            <td>`+ lista.d15_10_1 +`</td>
            <td>`+ lista.d15_11_1 +`</td>
            <td>`+ lista.d15_12_1 +`</td>
            <td>`+ lista.d15_13_1 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d15_1_2 +`</td>
            <td>`+ lista.d15_2_2 +`</td>
            <td>`+ lista.d15_3_2 +`</td>
            <td>`+ lista.d15_4_2 +`</td>
            <td>`+ lista.d15_5_2 +`</td>
            <td>`+ lista.d15_6_2 +`</td>
            <td>`+ lista.d15_7_2 +`</td>
            <td>`+ lista.d15_8_2 +`</td>
            <td>`+ lista.d15_9_2 +`</td>
            <td>`+ lista.d15_10_2 +`</td>
            <td>`+ lista.d15_11_2 +`</td>
            <td>`+ lista.d15_12_2 +`</td>
            <td>`+ lista.d15_13_2 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d15_1_3 +`</td>
            <td>`+ lista.d15_2_3 +`</td>
            <td>`+ lista.d15_3_3 +`</td>
            <td>`+ lista.d15_4_3 +`</td>
            <td>`+ lista.d15_5_3 +`</td>
            <td>`+ lista.d15_6_3 +`</td>
            <td>`+ lista.d15_7_3 +`</td>
            <td>`+ lista.d15_8_3 +`</td>
            <td>`+ lista.d15_9_3 +`</td>
            <td>`+ lista.d15_10_3 +`</td>
            <td>`+ lista.d15_11_3 +`</td>
            <td>`+ lista.d15_12_3 +`</td>
            <td>`+ lista.d15_13_3 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d15_1_4 +`</td>
            <td>`+ lista.d15_2_4 +`</td>
            <td>`+ lista.d15_3_4 +`</td>
            <td>`+ lista.d15_4_4 +`</td>
            <td>`+ lista.d15_5_4 +`</td>
            <td>`+ lista.d15_6_4 +`</td>
            <td>`+ lista.d15_7_4 +`</td>
            <td>`+ lista.d15_8_4 +`</td>
            <td>`+ lista.d15_9_4 +`</td>
            <td>`+ lista.d15_10_4 +`</td>
            <td>`+ lista.d15_11_4 +`</td>
            <td>`+ lista.d15_12_4 +`</td>
            <td>`+ lista.d15_13_4 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d15_1_5 +`</td>
            <td>`+ lista.d15_2_5 +`</td>
            <td>`+ lista.d15_3_5 +`</td>
            <td>`+ lista.d15_4_5 +`</td>
            <td>`+ lista.d15_5_5 +`</td>
            <td>`+ lista.d15_6_5 +`</td>
            <td>`+ lista.d15_7_5 +`</td>
            <td>`+ lista.d15_8_5 +`</td>
            <td>`+ lista.d15_9_5 +`</td>
            <td>`+ lista.d15_10_5 +`</td>
            <td>`+ lista.d15_11_5 +`</td>
            <td>`+ lista.d15_12_5 +`</td>
            <td>`+ lista.d15_13_5 +`</td>
        </tr>
    </tbody>
</table>
<h4>D.1.6 CUADRO Nº 6: Materiales e insumos</h4>
<br>
<table border="1">
    <thead>
        <tr>
            <th>Valorizable </th>
            <th>Descripción </th>
            <th>Especificación técnica </th>
            <th>Proforma </th>
            <th>Unidad Medida </th>
            <th>Costo unitario </th>
            <th>Cantidad </th>
            <th>Costo Total </th>
            <th>RNR </th>
            <th>Cofinanciamiento monetario </th>
            <th>Cofinanciamiento no monetario </th>
            <th>Entidad Aportante</th>
        </tr>
    </thead>
    <tbody>
        <tr> 
            <td>`+ lista.d16_1_1 +`</td>
            <td>`+ lista.d16_2_1 +`</td>
            <td>`+ lista.d16_3_1 +`</td>
            <td>`+ lista.d16_4_1 +`</td>
            <td>`+ lista.d16_5_1 +`</td>
            <td>`+ lista.d16_6_1 +`</td>
            <td>`+ lista.d16_7_1 +`</td>
            <td>`+ lista.d16_8_1 +`</td>
            <td>`+ lista.d16_9_1 +`</td>
            <td>`+ lista.d16_10_1 +`</td>
            <td>`+ lista.d16_11_1 +`</td>
            <td>`+ lista.d16_12_1 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d16_1_2 +`</td>
            <td>`+ lista.d16_2_2 +`</td>
            <td>`+ lista.d16_3_2 +`</td>
            <td>`+ lista.d16_4_2 +`</td>
            <td>`+ lista.d16_5_2 +`</td>
            <td>`+ lista.d16_6_2 +`</td>
            <td>`+ lista.d16_7_2 +`</td>
            <td>`+ lista.d16_8_2 +`</td>
            <td>`+ lista.d16_9_2 +`</td>
            <td>`+ lista.d16_10_2 +`</td>
            <td>`+ lista.d16_11_2 +`</td>
            <td>`+ lista.d16_12_2 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d16_1_3 +`</td>
            <td>`+ lista.d16_2_3 +`</td>
            <td>`+ lista.d16_3_3 +`</td>
            <td>`+ lista.d16_4_3 +`</td>
            <td>`+ lista.d16_5_3 +`</td>
            <td>`+ lista.d16_6_3 +`</td>
            <td>`+ lista.d16_7_3 +`</td>
            <td>`+ lista.d16_8_3 +`</td>
            <td>`+ lista.d16_9_3 +`</td>
            <td>`+ lista.d16_10_3 +`</td>
            <td>`+ lista.d16_11_3 +`</td>
            <td>`+ lista.d16_12_3 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d16_1_4 +`</td>
            <td>`+ lista.d16_2_4 +`</td>
            <td>`+ lista.d16_3_4 +`</td>
            <td>`+ lista.d16_4_4 +`</td>
            <td>`+ lista.d16_5_4 +`</td>
            <td>`+ lista.d16_6_4 +`</td>
            <td>`+ lista.d16_7_4 +`</td>
            <td>`+ lista.d16_8_4 +`</td>
            <td>`+ lista.d16_9_4 +`</td>
            <td>`+ lista.d16_10_4 +`</td>
            <td>`+ lista.d16_11_4 +`</td>
            <td>`+ lista.d16_12_4 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d16_1_5 +`</td>
            <td>`+ lista.d16_2_5 +`</td>
            <td>`+ lista.d16_3_5 +`</td>
            <td>`+ lista.d16_4_5 +`</td>
            <td>`+ lista.d16_5_5 +`</td>
            <td>`+ lista.d16_6_5 +`</td>
            <td>`+ lista.d16_7_5 +`</td>
            <td>`+ lista.d16_8_5 +`</td>
            <td>`+ lista.d16_9_5 +`</td>
            <td>`+ lista.d16_10_5 +`</td>
            <td>`+ lista.d16_11_5 +`</td>
            <td>`+ lista.d16_12_5 +`</td>
        </tr>
    </tbody>
</table>
<h4>D.1.7 CUADRO Nº 7: Otros gastos elegibles</h4>
<br>
<table border="1">
    <thead>
        <tr>
            <th>Valorizable </th>
            <th>Descripción </th>
            <th>Unidad Medida </th>
            <th>Costo unitario </th>
            <th>Cantidad </th>
            <th>Costo Total </th>
            <th>RNR </th>
            <th>Cofinanciamiento monetario </th>
            <th>Cofinanciamiento no monetario </th>
            <th>Entidad Aportante</th>
        </tr>
    </thead>
    <tbody>
        <tr> 
            <td>`+ lista.d17_1_1 +`</td>
            <td>`+ lista.d17_2_1 +`</td>
            <td>`+ lista.d17_3_1 +`</td>
            <td>`+ lista.d17_4_1 +`</td>
            <td>`+ lista.d17_5_1 +`</td>
            <td>`+ lista.d17_6_1 +`</td>
            <td>`+ lista.d17_7_1 +`</td>
            <td>`+ lista.d17_8_1 +`</td>
            <td>`+ lista.d17_9_1 +`</td>
            <td>`+ lista.d17_10_1 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d17_1_2 +`</td>
            <td>`+ lista.d17_2_2 +`</td>
            <td>`+ lista.d17_3_2 +`</td>
            <td>`+ lista.d17_4_2 +`</td>
            <td>`+ lista.d17_5_2 +`</td>
            <td>`+ lista.d17_6_2 +`</td>
            <td>`+ lista.d17_7_2 +`</td>
            <td>`+ lista.d17_8_2 +`</td>
            <td>`+ lista.d17_9_2 +`</td>
            <td>`+ lista.d17_10_2 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d17_1_3 +`</td>
            <td>`+ lista.d17_2_3 +`</td>
            <td>`+ lista.d17_3_3 +`</td>
            <td>`+ lista.d17_4_3 +`</td>
            <td>`+ lista.d17_5_3 +`</td>
            <td>`+ lista.d17_6_3 +`</td>
            <td>`+ lista.d17_7_3 +`</td>
            <td>`+ lista.d17_8_3 +`</td>
            <td>`+ lista.d17_9_3 +`</td>
            <td>`+ lista.d17_10_3 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d17_1_4 +`</td>
            <td>`+ lista.d17_2_4 +`</td>
            <td>`+ lista.d17_3_4 +`</td>
            <td>`+ lista.d17_4_4 +`</td>
            <td>`+ lista.d17_5_4 +`</td>
            <td>`+ lista.d17_6_4 +`</td>
            <td>`+ lista.d17_7_4 +`</td>
            <td>`+ lista.d17_8_4 +`</td>
            <td>`+ lista.d17_9_4 +`</td>
            <td>`+ lista.d17_10_4 +`</td>
        </tr>
        <tr> 
            <td>`+ lista.d17_1_5 +`</td>
            <td>`+ lista.d17_2_5 +`</td>
            <td>`+ lista.d17_3_5 +`</td>
            <td>`+ lista.d17_4_5 +`</td>
            <td>`+ lista.d17_5_5 +`</td>
            <td>`+ lista.d17_6_5 +`</td>
            <td>`+ lista.d17_7_5 +`</td>
            <td>`+ lista.d17_8_5 +`</td>
            <td>`+ lista.d17_9_5 +`</td>
            <td>`+ lista.d17_10_5 +`</td>
        </tr>
    </tbody>
</table>
<h4>D.1.8 CUADRO Nº8: Gastos de gestión</h4>
<br>
<table border="1">
    <thead>
        <tr>      
            <th>Descripción </th>
            <th>Unidad Medida </th>
            <th>Costo unitario </th>
            <th>Cantidad </th>
            <th>Costo Total </th>
            <th>RNR </th>
            <th>Cofinanciamiento monetario </th>
            <th>Cofinanciamiento no monetario </th>
            <th>Entidad Aportante </th>
        </tr>
    </thead>
    <tbody>
        <tr>      
            <td>`+ lista.d18_1_1 +`</td>
            <td>`+ lista.d18_2_1 +`</td>
            <td>`+ lista.d18_3_1 +`</td>
            <td>`+ lista.d18_4_1 +`</td>
            <td>`+ lista.d18_5_1 +`</td>
            <td>`+ lista.d18_6_1 +`</td>
            <td>`+ lista.d18_7_1 +`</td>
            <td>`+ lista.d18_8_1 +`</td>
            <td>`+ lista.d18_9_1 +`</td>
        </tr>
        <tr>      
            <td>`+ lista.d18_1_2 +`</td>
            <td>`+ lista.d18_2_2 +`</td>
            <td>`+ lista.d18_3_2 +`</td>
            <td>`+ lista.d18_4_2 +`</td>
            <td>`+ lista.d18_5_2 +`</td>
            <td>`+ lista.d18_6_2 +`</td>
            <td>`+ lista.d18_7_2 +`</td>
            <td>`+ lista.d18_8_2 +`</td>
            <td>`+ lista.d18_9_2 +`</td>
        </tr>
        <tr>      
            <td>`+ lista.d18_1_3 +`</td>
            <td>`+ lista.d18_2_3 +`</td>
            <td>`+ lista.d18_3_3 +`</td>
            <td>`+ lista.d18_4_3 +`</td>
            <td>`+ lista.d18_5_3 +`</td>
            <td>`+ lista.d18_6_3 +`</td>
            <td>`+ lista.d18_7_3 +`</td>
            <td>`+ lista.d18_8_3 +`</td>
            <td>`+ lista.d18_9_3 +`</td>
        </tr>
        <tr>      
            <td>`+ lista.d18_1_4 +`</td>
            <td>`+ lista.d18_2_4 +`</td>
            <td>`+ lista.d18_3_4 +`</td>
            <td>`+ lista.d18_4_4 +`</td>
            <td>`+ lista.d18_5_4 +`</td>
            <td>`+ lista.d18_6_4 +`</td>
            <td>`+ lista.d18_7_4 +`</td>
            <td>`+ lista.d18_8_4 +`</td>
            <td>`+ lista.d18_9_4 +`</td>
        </tr>
        <tr>      
            <td>`+ lista.d18_1_5 +`</td>
            <td>`+ lista.d18_2_5 +`</td>
            <td>`+ lista.d18_3_5 +`</td>
            <td>`+ lista.d18_4_5 +`</td>
            <td>`+ lista.d18_5_5 +`</td>
            <td>`+ lista.d18_6_5 +`</td>
            <td>`+ lista.d18_7_5 +`</td>
            <td>`+ lista.d18_8_5 +`</td>
            <td>`+ lista.d18_9_5 +`</td>
        </tr>
    </tbody>
</table>
<h4>D.1.9 Equipo Formulador del Proyecto</h4>
<br>
<table border="1">
    <thead>
        <tr>          
            <th>Tipo de Documento </th>
            <th>Número de Documento </th>
            <th>Nombres </th>
            <th>Apellidos </th>
            <th>Correo </th>
            <th>Teléfono </th>
            <th>Celular </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`+ lista.d19_1_1 +`</td>
            <td>`+ lista.d19_2_1 +`</td>
            <td>`+ lista.d19_3_1 +`</td>
            <td>`+ lista.d19_4_1 +`</td>
            <td>`+ lista.d19_5_1 +`</td>
            <td>`+ lista.d19_6_1 +`</td>
            <td>`+ lista.d19_7_1 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d19_1_2 +`</td>
            <td>`+ lista.d19_2_2 +`</td>
            <td>`+ lista.d19_3_2 +`</td>
            <td>`+ lista.d19_4_2 +`</td>
            <td>`+ lista.d19_5_2 +`</td>
            <td>`+ lista.d19_6_2 +`</td>
            <td>`+ lista.d19_7_2 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d19_1_3 +`</td>
            <td>`+ lista.d19_2_3 +`</td>
            <td>`+ lista.d19_3_3 +`</td>
            <td>`+ lista.d19_4_3 +`</td>
            <td>`+ lista.d19_5_3 +`</td>
            <td>`+ lista.d19_6_3 +`</td>
            <td>`+ lista.d19_7_3 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d19_1_4 +`</td>
            <td>`+ lista.d19_2_4 +`</td>
            <td>`+ lista.d19_3_4 +`</td>
            <td>`+ lista.d19_4_4 +`</td>
            <td>`+ lista.d19_5_4 +`</td>
            <td>`+ lista.d19_6_4 +`</td>
            <td>`+ lista.d19_7_4 +`</td>
        </tr>
        <tr>
            <td>`+ lista.d19_1_5 +`</td>
            <td>`+ lista.d19_2_5 +`</td>
            <td>`+ lista.d19_3_5 +`</td>
            <td>`+ lista.d19_4_5 +`</td>
            <td>`+ lista.d19_5_5 +`</td>
            <td>`+ lista.d19_6_5 +`</td>
            <td>`+ lista.d19_7_5 +`</td>
        </tr>
    </tbody>
</table>
</body>
</html>`;
return html;
}