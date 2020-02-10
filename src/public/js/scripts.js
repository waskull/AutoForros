async function totalSemanales () {
        const response = await $.ajax('/venta/api/semanal/');
        const num = await parseInt(response);
        return num;
}
async function ventaDia (dia) {
        const response = await $.ajax(`/venta/api/${dia}`);
        const num = await parseInt(response);
        return num;
}


function dibujarGrafica(semanal,mayor,semana,ctx){
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';
    const D = ['Hoy','Ayer','Hace 2 dias','Hace 3 dias','Hace 4 dias','Hace 5 dias','Hace 6 dias'];
        const myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: D.reverse(),
          datasets: [{
            label: "Ventas",
            lineTension: 0.3,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: semana.reverse(),
          }],
        },
        options: {
          scales: {
            xAxes: [{
              time: {
                unit: 'date'
              },
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 7
              }
            }],
            yAxes: [{
              ticks: {
                callback: function(value) {if (value % 1 === 0) {return value;}},
                min: 0,
                max: mayor,
                maxTicksLimit: 5
              },
              gridLines: {
                color: "rgba(0, 0, 0, .125)",
              }
            }],
          },
          legend: {
            display: false
          }
        }
      });
}
async function pintarGrafica(){
    const semanal = await totalSemanales();
    var semana = [];
    var mayor = 0;
    for(i = 0; i < 7; i++){
        semana[i] = await ventaDia(i);
        if(semana[i] > mayor){mayor = semana[i];}
    }
    var ctx = document.getElementById("grafica");
    $("#ventas").text("Ventas totales de la semana: "+semanal);
    dibujarGrafica(semanal,mayor,semana,ctx);
}
function tabla() {
    $('#tabla').DataTable({
        "language": {
            "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla =(",
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad"
                }
    }
    });
}

function totalPago(){
    if($("#cantidad").val()<=0){$("#cantidad").val(1);}
    var n = $("#cantidad").val();
    n=n*20;
    $("#total").text(n+"$");
}
function table(tabla) {
    $(tabla).DataTable({
        "language": {
            "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla =(",
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad"
                }
    }
    });
}
const getDatos = function () {
    const URI = '/vehiculos/usuario';
    var user = $('#usuario').children("option:selected").val();
    console.log(user);
    $.ajax({
        url:`${URI}/${user}`,
        type: 'GET',
        success: function (vehiculos){
            //console.log(vehiculos);
            vehiculos.forEach(vehiculo => {
                $('#autos').append(`<option value="${vehiculo.idAutomovil}">${vehiculo.placa} ${vehiculo.marca} ${vehiculo.modelo}</option>`);
            });
        }
    });
}

const getColores = function () {
    const URI = '/material/colorMaterial';
    var material = $('#id_material').children("option:selected").val();
    $.ajax({
        url:`${URI}/${material}`,
        type: 'POST',
        success: function (colores){
            colores.forEach(color => {
                $('#colores').append(`<option value="${color.color}">${color.descripcion}</option>`);
                setImagenMaterial();
            });
        }
    });
}

const setImagenBordado = function () {
    const URI = '/bordado/imagen';
    var idbordado = $('#id_bordado').children("option:selected").val();
    $.ajax({
        url:`${URI}/${idbordado}`,
        type: 'POST',
        success: function (bordados){
            $("#bordado").attr("src", "/static/img/"+bordados[0].img_url);

        }
    });
}

const setImagenMaterial = function () {
    const URI = '/material/imagenMaterial';
    var result = [];
    result[0] = $('#id_material').children("option:selected").val();
    result[1] = $('#colores').children("option:selected").val();
    var json = JSON.stringify(result);
    $.ajax({
        url:`${URI}/`,
        type: 'post',
        contentType: "application/json; charset=UTF-8",
        dataType: 'json',
        data: json,
        success: function (material){
            $("#imgmaterial").attr("src", "/static/img/"+material[0].url_img);
        }
    });
}

let verDatos = function (modal, custom){
    var id,nombre,placa,estado,material,color,nombre,bordado,costura,cantidad,fecha,metodo,referencia;
    $('.'+custom).click(function(e){
        id = $(this).parents('tr').find("td:eq(0)").text();
        nombre = $(this).parents('tr').find("td:eq(1)").text();
        placa = $(this).parents('tr').find("td:eq(2)").text();
        estado = $(this).parents('tr').find("td:eq(3)").text();
        referencia = $(this).parents('tr').find("td:eq(5)").text();
        metodo = $(this).parents('tr').find("td:eq(4)").text();
        material = $(this).parents('tr').find("td:eq(6)").text();
        color = $(this).parents('tr').find("td:eq(7)").text();
        bordado = $(this).parents('tr').find("td:eq(11)").text();
        costura = $(this).parents('tr').find("td:eq(12)").text();
        cantidad = $(this).parents('tr').find("td:eq(8)").text();
        fecha = $(this).parents('tr').find("td:eq(9)").text();
        e.preventDefault();
        var mymodal = $('#'+modal);
        var html = '  <b>'+'Solicitud #: </b>'+id+'<br>';
        html += '  <b>'+'Nombre: </b>'+nombre+'<br>';
        html += '  <b>'+'Placa: </b>'+placa+'<br>';
        html += '  <b>'+'Status: </b>'+estado+'<br>';
        html += '  <b>'+'Referencia de Pago: </b>'+referencia+'<br>';
        html += '  <b>'+'Metodo de Pago: </b>'+metodo+'<br>';
        html += '  <b>'+'Material: </b>'+material+'<br>';
        html += '  <b>'+'Color: </b>'+color+'<br>';
        html += '  <b>'+'Bordado: </b>'+bordado+'<br>';
        html += '  <b>'+'Costura: </b>'+costura+'<br>';
        html += '  <b>'+'Cantidad: </b>'+cantidad+'<br>';
        html += '  <b>'+'Fecha de Solicitud: </b>'+fecha+'<br>';
        mymodal.find('.modal-body').html(html);
        mymodal.modal('show');
    });
}

let verDatosUsuario = function (modal, custom){
    var id,nombre,placa,estado,material,color,nombre,costura,bordado,cantidad,fecha,metodo,referencia;
    $('.'+custom).click(function(e){
        id = $(this).parents('tr').find("td:eq(0)").text();
        placa = $(this).parents('tr').find("td:eq(1)").text();
        estado = $(this).parents('tr').find("td:eq(2)").text();
        referencia = $(this).parents('tr').find("td:eq(4)").text();
        metodo = $(this).parents('tr').find("td:eq(3)").text();
        material = $(this).parents('tr').find("td:eq(5)").text();
        color = $(this).parents('tr').find("td:eq(6)").text();
        bordado = $(this).parents('tr').find("td:eq(10)").text();
        costura = $(this).parents('tr').find("td:eq(11)").text();
        cantidad = $(this).parents('tr').find("td:eq(7)").text();
        fecha = $(this).parents('tr').find("td:eq(8)").text();
        e.preventDefault();
        var mymodal = $('#'+modal);
        var html = '  <b>'+'Solicitud #: </b>'+id+'<br>';
        html += '  <b>'+'Placa: </b>'+placa+'<br>';
        html += '  <b>'+'Status: </b> '+estado+'<br>';
        html += '  <b>'+'Referencia de Pago: </b>'+referencia+'<br>';
        html += '  <b>'+'Metodo de Pago: </b>'+metodo+'<br>';
        html += '  <b>'+'Material: </b>'+material+'<br>';
        html += '  <b>'+'Color: </b>'+color+'<br>';
        html += '  <b>'+'Bordado: </b>'+bordado+'<br>';
        html += '  <b>'+'Costura: </b>'+costura+'<br>';
        html += '  <b>'+'Cantidad: </b>'+cantidad+'<br>';
        html += '  <b>'+'Fecha de Solicitud: </b>'+fecha+'<br>';
        mymodal.find('.modal-body').html(html);
        mymodal.modal('show');
    });
}

let verDatosProceso = function (modal, custom){
    var id,placa,estado,material,color,nombre,costura,bordado,cantidad,fecha,fechaTentativa,metodo,referencia;
    $('.'+custom).click(function(e){
        id = $(this).parents('tr').find("td:eq(0)").text();
        placa = $(this).parents('tr').find("td:eq(1)").text();
        estado = $(this).parents('tr').find("td:eq(2)").text();
        material = $(this).parents('tr').find("td:eq(3)").text();
        color = $(this).parents('tr').find("td:eq(4)").text();
        bordado = $(this).parents('tr').find("td:eq(6)").text();
        costura = $(this).parents('tr').find("td:eq(7)").text();
        cantidad = $(this).parents('tr').find("td:eq(5)").text();
        nombre = $(this).parents('tr').find("td:eq(9)").text();
        fechaTentativa = $(this).parents('tr').find("td:eq(10)").text();
        e.preventDefault();
        var mymodal = $('#'+modal);
        var html = '  <b>'+'Solicitud #: </b>'+id+'<br>';
        html += '  <b>'+'Placa del Vehiculo: </b>'+placa+'<br>';
        html += '  <b>'+'Estado: </b> '+estado+'<br>';
        html += '  <b>'+'Material: </b>'+material+'<br>';
        html += '  <b>'+'Color: </b>'+color+'<br>';
        html += '  <b>'+'Bordado: </b>'+bordado+'<br>';
        html += '  <b>'+'Costura: </b>'+costura+'<br>';
        html += '  <b>'+'Cantidad: </b>'+cantidad+'<br>';
        html += '  <b>'+'Cliente: </b>'+nombre+'<br>';
        html += '  <b>'+'Fecha Tentativa: </b>'+fechaTentativa+'<br>';
        mymodal.find('.modal-body').html(html);
        mymodal.modal('show');
    });
}

async function graficaUsuario(){
const response = await $.ajax('/solicitud/api/tipos/');
const cuero = await JSON.parse(response.cuero);
var semicuero = await JSON.parse(response.semicuero);
var maximo = cuero;
if(semicuero>cuero){maximo=semicuero}
var ctx = document.getElementById('graficaUsuario');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['Cuero', 'SemiCuero'],
        datasets: [{
            label: 'Cantidad',
            data: [cuero, semicuero],
            backgroundColor: [
                'rgba(154, 18, 179, 0.4)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(128, 0, 128, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
               ticks: {
                   beginAtZero: true,
                   min: 0
               }
            }],
            yAxes: [{
                stacked:true,
            }]
        },legend: {
            display: false
          }
    }
});
}
