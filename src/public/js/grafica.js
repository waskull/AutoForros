async function totalSemanales () {
    let response = await fetch(`/venta/api/semanal/`);
    let data = await response.json();
    let num = await parseInt(data);
    return num;
}
async function ventaDia (dia) {
    let response = await fetch(`/venta/api/${dia}`);
    let data = await response.json();
    let num = await parseInt(data);
    return num;
}

function dibujarGrafica(semanal,mayor,semana,ctx){
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';
    var $grafica = $('#grafica');
    var myLineChart = new Chart(ctx, {

        type: 'line',
        data: {
          labels: ["Hoy", "Ayer", "Hace 2 dias", "Hace 3 dias", "Hace 4 dias", "Hace 5 dias", "Hace 6 dias"],
          datasets: [{
            label: "Sessions",
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
            data: semana,
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
    console.log(semana);
    var ctx = document.getElementById("grafica");
    dibujarGrafica(semanal,mayor,semana,ctx);
}
