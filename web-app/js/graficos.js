var t; //Varaible global DATATABLE
var d; // Variable global para almacenar datos de la fila seleccionada
var myChart = null;
var myLineChart = null;
// Evento click en filas de la tabla principal
$('#tabla tbody').on('click', 'tr', function () {
    d = t.row(this).data();
    //Limpio todo si el usuario toca la tabla vacia
        if (!d || !d[0]) {
            // Limpia el intervalo si existe
            if (window.intervalIndicadores) {
                clearInterval(window.intervalIndicadores);
                window.intervalIndicadores = null;
            }
            // Desactivar los botones de periodo
            $('#30').prop('disabled', true);
            $('#80').prop('disabled', true);
            $('#180').prop('disabled', true);
            $('#365').prop('disabled', true);
                
            $('#30').css("color", "white");
            $('#80').css("color", "white");
            $('#180').css("color", "white");
            $('#365').css("color", "white");   
            // Destruir los gráficos si existen
            if (window.myChart) {
                myChart.destroy();
                window.myChart = null;
            }
            if (window.myLineChart) {
                myLineChart.destroy();
                window.myLineChart = null;
            }  
            if (window.g2) {
                window.g2.refresh(-6);
            }
            // Limpia el pronóstico/resumen
            $('#pronostico').text('');

            // poné los valores de la tabla en "-"
            $('#resultado tr').each(function() {
                $(this).find('td').eq(1).text('-'); // Valor
                $(this).find('td').eq(2).text('-'); // Pronóstico
            });

            // Mostrar mensaje en el título de indicadores
           $('#activo_financiero').text('Seleccione un activo de la tabla');

            // Mostrar mensaje en el título de gráficos
            $('#titulo_graficos').text('GRAFICOS: << Seleccione un activo de la tabla >>');            

            return;
        }      
    //Se muestra el nombre del activo y su descripción
    $('#titulo_graficos').text('GRAFICOS: << '+d[0]+" >>"); 
    // Variables locales para procesamiento de datos
    var datosHistoricos;
    var datos;
    var tiempografLinea;
    var valoresGrafLinea;
    
    $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + d[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
    $('#mensaje-error-graficos').hide();
    
    // Solicitud AJAX para obtener datos históricos
    $.ajax({
        url: "DatosHistoricos",
        dataType: 'json',        // Formato de respuesta esperado
        data: { Tipo: $("#tipo").val(), //Se envía el tipo y el simbolo a buscar
                Simbolo: d[0],
                Dias: 80    
        },
        success: function( result ){
            $('#mensaje-error-graficos').hide();       
            datos = result;  
            // Preparar datos para gráfico de velas (formato OHLC)
            datosHistoricos = datos.map(d => { return { x:new Date(d.fecha).setHours(0,0,0,0),
                                                        o:d.apertura,
                                                        h:d.maximo,
                                                        l:d.minimo,
                                                        c:d.ultimo_cierre}; 
                                             });
            // Preparar datos para gráfico de línea                                 
            tiempografLinea = datos.map(function(elem){
                var t = new Date(elem.fecha).setHours(0,0,0,0); // Eje X: fechas
                return t;
            });
            valoresGrafLinea = datos.map(function(elem){
                return elem.ultimo_cierre;   // Eje Y: precios de cierre
            });                    
            
            // Configuración gráfico de velas
            const data = {
                datasets: [{
                    label: 'GRÁFICO DE VELAS',
                    data: datosHistoricos   // Datos OHLC
                }]
            };

            // Configuración gráfico de velas
                const config = {
                    type: 'candlestick',
                    data,
                    options: {
                        scales: {
                            x: {
                                type: 'time',
                                time: { unit: 'day' }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const ohlc = context.raw;
                                        return [
                                              'Apertura: ' + ohlc.o,
                                            'Máximo: ' + ohlc.h,
                                            'Mínimo: ' + ohlc.l,
                                            'Último Cierre: ' + ohlc.c
                                        ];
                                    }
                                }
                            }
                        }
                    }
                };
             // Configuración gráfico de línea
            const da = {
                labels: tiempografLinea,          // Fechas en eje X
                datasets: [{
                    label: 'GRÁFICO DE LINEA',
                    data: valoresGrafLinea,           // Valores en eje Y
                    fill: false,                      // Sin relleno bajo la línea
                    borderColor: 'rgb(75, 192, 192)', // Color turquesa
                    tension: 0.2                      // Suavizado de la línea
                }]
            };                   

            
            const config2 = {
                type: 'line',   // Tipo de gráfico
                data: da,
                options: { 
                    scales: {
                        x: {
                            type: 'time',
                            time: { unit: 'day'},                            
                            ticks: {              // Configuración de marcas temporales
                                autoSkip: false,  // Mostrar todas las fechas
                                maxRotation: 0,   // Sin rotación de texto
                                minRotation: 0,                                
                                maxTicksLimit: 10 // Máximo 10 marcas
                            }
                        }
                    },                         
                    responsive: true,   // Gráfico adaptable
                    plugins: {
                        legend: {position: 'top' }, // Leyenda arriba
                        title: { display: false  }   // Sin título
                    }
                }
            };
            //Se controla si los gráficos ya fueron creados        
            var chartStatus = Chart.getChart("myChart");
            if (chartStatus !== undefined) {
                myChart.destroy(); // Eliminar instancia de velas previa
            }
            var chartStatus2 = Chart.getChart("myLineChart");
            if (chartStatus2 !== undefined) {
                myLineChart.destroy(); // Eliminar instancia de línea previa
            }                    
            // Renderizar nuevos gráficos
            myChart = new Chart(document.getElementById('myChart'),config);                    
            myLineChart = new Chart(document.getElementById('myLineChart'),config2);  
            //Activo los botones históricos 
            $('#30').attr('disabled', false); 
            $('#80').attr('disabled', true);   // Se realza el periodo actual 
            $('#180').attr('disabled', false);  
            $('#365').attr('disabled', false);

            $('#30').css("color", "white");
            $('#80').css("color", "yellow");
            $('#180').css("color", "white");
            $('#365').css("color", "white");  
            
            $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + d[0] + ' &gt;&gt;');
            $('#myChart').show();
            $('#myLineChart').show();            
        },
        error: function(xhr, status, error) {
            $('#myChart').hide();
            $('#myLineChart').hide();
            $('#texto-error-grafico').html('No pudimos mostrar los gráficos históricos de: <strong>' + d[0] + '</strong>');
            $('#mensaje-error-graficos').show();
            $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + d[0] + ' &gt;&gt;');

        }
    }); 
                
 });
 
 
 function treintaDias() {
   $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + d[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
   $('#mensaje-error-graficos').hide();     
   graficos(d[0], 30);
   $('#30').attr('disabled', true); 
   $('#80').attr('disabled', false);   
   $('#180').attr('disabled', false);  
   $('#365').attr('disabled', false);

   
   $('#30').css("color", "yellow");
   $('#80').css("color", "white");
   $('#180').css("color", "white");
   $('#365').css("color", "white");

  
};  

function ochentaDias() {
   $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + d[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
   $('#mensaje-error-graficos').hide();
   graficos(d[0], 80);
   $('#30').attr('disabled', false); 
   $('#80').attr('disabled', true);   
   $('#180').attr('disabled', false);  
   $('#365').attr('disabled', false);

   
   $('#30').css("color", "white");
   $('#80').css("color", "yellow");
   $('#180').css("color", "white");
   $('#365').css("color", "white");

  
};

function cientoOchentaDias() {
   $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + d[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
   $('#mensaje-error-graficos').hide();    
   graficos(d[0], 180);
   $('#30').attr('disabled', false); 
   $('#80').attr('disabled', false);   
   $('#180').attr('disabled', true);  
   $('#365').attr('disabled', false);

   
   $('#30').css("color", "white");
   $('#80').css("color", "white");
   $('#180').css("color", "yellow");
   $('#365').css("color", "white");

  
 
};

function uno() {
    
   $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + d[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
   $('#mensaje-error-graficos').hide();    
   graficos(d[0], 365);
   $('#30').attr('disabled', false); 
   $('#80').attr('disabled', false);   
   $('#180').attr('disabled', false);  
   $('#365').attr('disabled', true);

   
   $('#30').css("color", "white");
   $('#80').css("color", "white");
   $('#180').css("color", "white");
   $('#365').css("color", "yellow");

  
};



function graficos(simbolo,dias){
    var datosHistoricos;
    var datos;
    var tiempografLinea;
    var valoresGrafLinea;
    
    $.ajax({
        url: "DatosHistoricos",
        dataType: 'json',
        //Se envía el tipo y el simbolo a buscar
        data: { Tipo: $("#tipo").val(),
                Simbolo: simbolo,
                Dias: dias    
        },
        success: function( result ){
           $('#mensaje-error-graficos').hide();
           $('#myChart').show();
           $('#myLineChart').show();           
            datos = result;
            datosHistoricos = datos.map(d => { return { x:new Date(d.fecha).setHours(0,0,0,0), o:d.apertura,h:d.maximo,l:d.minimo,c:d.ultimo_cierre}; });
            tiempografLinea = datos.map(function(elem){
                var t = new Date(elem.fecha).setHours(0,0,0,0);
                return t;
            });
            valoresGrafLinea = datos.map(function(elem){
                return elem.ultimo_cierre;
            });                    
            
            //Datos gráfico de velas
            const data = {
                datasets: [{
                    label: 'GRÁFICO DE VELAS',
                    data: datosHistoricos 
                }]
            };

            // Configuración gráfico de velas
                const config = {
                    type: 'candlestick',
                    data,
                    options: {
                        scales: {
                            x: {
                                type: 'time',
                                time: { unit: 'day' }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const ohlc = context.raw;
                                        return [
                                            'Apertura: ' + ohlc.o,
                                            'Máximo: ' + ohlc.h,
                                            'Mínimo: ' + ohlc.l,
                                            'Último Cierre: ' + ohlc.c
                                        ];
                                    }
                                }
                            }
                        }
                    }
                };
            //Datos gráfico de de línea
            const da = {
                labels: tiempografLinea,
                datasets: [{
                    label: 'GRÁFICO DE LINEA',
                    data: valoresGrafLinea,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.2
                }]
            };                   

            // Configuración gráfico de linea
            const config2 = {
                type: 'line',
                data: da,
                options: { 
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                   unit: 'day'
                                 },                            
                            ticks: {
                                autoSkip: false,
                                maxRotation: 0,
                                minRotation: 0,                                
                                maxTicksLimit: 10
                            }
                        }
                    },                         
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: false
                        }
                    }
                }
            };
            //Se controla si los gráficos ya fueron creados        
            var chartStatus = Chart.getChart("myChart");
            if (chartStatus !== undefined) {
                myChart.destroy();
            }
            var chartStatus2 = Chart.getChart("myLineChart");
            if (chartStatus2 !== undefined) {
                myLineChart.destroy();
            }                    
            // render init block
            myChart = new Chart(document.getElementById('myChart'),config);                    
            myLineChart = new Chart(document.getElementById('myLineChart'),config2);            
            $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + d[0] + ' &gt;&gt;');  
            $('#myChart').show();
            $('#myLineChart').show();            
        },
        error: function(xhr, status, error) {
            $('#myChart').hide();
            $('#myLineChart').hide();
            $('#mensaje-error-graficos').show();
            let periodoTexto = (dias == 365) ? "1 año" : dias + " días";
            $('#texto-error-grafico').html('No pudimos mostrar los gráficos históricos de: <strong>' + d[0] + '</strong>. Periodo: ' + periodoTexto);
            $('#mensaje-error-graficos').show();
            $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + d[0] + ' &gt;&gt;');            
        }
    });     
}