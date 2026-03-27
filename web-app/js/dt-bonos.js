var t; //Varaible global DATATABLE
var data;
window.myChart = null;
window.myLineChart = null;
$('#ventanaActualizar').modal({
  modal: 'show',
  keyboard: false,
  focus:false,
  backdrop: 'static'
});  
$(document).ready(function () {

    ///////////////////////////TABLA COTIZACIONES//////////////////////////////////      
        
    //Inicialización del DATATABLE
    t = $('#tabla').DataTable({
        responsive: {
            details: false,
            responsive: true
        },
        columnDefs: [
             { "width": "200%" },
            { responsivePriority: 1, targets: [0,2,3] },
            { className: "dt-head-center", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8 ] },
            { className: "dt-body-center", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8 ] },
            { className: "align-middle", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8 ] },
            {"targets": 3,
                "render": function (data, type, row) {
                    if ( row[3].includes('-') ) {
                        return "<i class='fas fa-sort-down' style='color: red'></i>"+" <span>"+row[3]+"</span>";
                    }else if(row[3].includes('0,00')){
                        return "<i class='fa-solid fa-equals' style='color: white'></i>"+" <span>"+row[3]+"</span>";
                    }else{
                        return "<i class='fas fa-sort-up' style='color: #00E8AD'></i>"+" <span>"+row[3]+"</span>";
                    } 
                }
            },
            {
             "targets": 3,
                "createdCell": function (td, cellData, rowData, row, col) {
                    if ( rowData[3].includes('-') ) {
                        $(td).css('color', 'red');
                    }
                    else if ( rowData[3].includes('0,00') ) {
                         $(td).css('color', 'white');
                    }else{
                         $(td).css('color', '#00E8AD');
                    }
                }
            }],
            
        bDestroy: true,
        stateSave: true,
        order: [[0, 'asc']],
        ordering: true,
        scrollY: '600px',
        scrollCollapse: true,
        searching: true,
        paging: false,             
        processing: true,
        //Para traducir el DataTable
        language: {
            processing:     "Actualizando...",
            search:         "Buscar",
            lengthMenu:    "Mostrar _MENU_ &eacute;l&eacute;registros",
            info:           "Mostrando _TOTAL_ registros",
            infoEmpty:      "",
            infoFiltered:   "",
            infoPostFix:    "",
            zeroRecords:    "No se encontraron resultados",
            emptyTable:     "No se encontraron resultados",
            decimal: ',',
            thousands: '.'
        }                 
    });
    t.search('');//Limpio la busqueda de la tabla, porque al recargar la página quedaba la ultima busqueda
    t.draw();

    scrollPos = $(".dataTables_scrollBody").scrollTop(); //Guardo la posición actual del scroll
    $('.dataTables_processing', $('#tabla').closest('.dataTables_wrapper')).show();
    $.ajax({
            url: "RecargarBonos",
            dataType: 'json',
            dataSrc: "",
            success: function( result ){
                data = result;
                datos = result; //Asigno los datos a la variable global
                t.clear();               
                for (var i=0; i<data.length; i++){         
                        
                    t.row.add([
                        data[i].simbolo, 
                        data[i].descripcion,
                        "$ "+data[i].cotizacion.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                        "$ "+data[i].variacion.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                        "$ "+data[i].apertura.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                        "$ "+data[i].maximo.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                        "$ "+data[i].minimo.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                        "$ "+data[i].ultimo_cierre.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                        data[i].volumen
                    ]).draw(false);
                }
                $(".dataTables_scrollBody").scrollTop(scrollPos); //asigno la posición anterior del scroll, porque con draw vuelve arriba
                $('.dataTables_processing', $('#tabla').closest('.dataTables_wrapper')).hide();
                $('#ventanaActualizar').modal('hide');  //Se esconde el modal actualizando al cargar el datatable
            },
            error: function() {
                   const contextPath = window.location.origin + "/PROYECTO_FB";
                   const tipo = document.getElementById("tipo").value;
                   window.location.href = contextPath + "/error.jsp?tipo=" + encodeURIComponent(tipo);
                }
    });     

    //Cada 5 minutos segundos se actualiza la información de las cotizaciones mediante ajax 
    setInterval(
        function(){
            var tempScrollTop = $(window).scrollTop(); // Guardo la posición actual del scroll de la página
            scrollPos = $(".dataTables_scrollBody").scrollTop(); //Guardo la posición actual del scroll del DATATABLE
            $('.dataTables_processing', $('#tabla').closest('.dataTables_wrapper')).show();
            $.ajax({
                url: "RecargarBonos",
                dataType: 'json',
                dataSrc: "",
                success: function( result ){
                    var data = result;
                    datos = result; //Asigno los datos a la variable global
                    t.clear();               
                    for (var i=0; i<data.length; i++){
                         t.row.add([
                                    data[i].simbolo, 
                                    data[i].descripcion,
                                    "$ "+data[i].cotizacion.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    "$ "+data[i].variacion.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    "$ "+data[i].apertura.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    "$ "+data[i].maximo.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    "$ "+data[i].minimo.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    "$ "+data[i].ultimo_cierre.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    data[i].volumen
                            ]).draw(false);
                    }
                    $(".dataTables_scrollBody").scrollTop(scrollPos); //Asigno la posición anterior del scroll al datatable, porque con draw vuelve arriba
                    $(window).scrollTop(tempScrollTop); // Asigno la posición anterior del scroll a la página   
                    $('.dataTables_processing', $('#tabla').closest('.dataTables_wrapper')).hide();//Oculto el cartel de actulizando
                },
                error: function() {
                       const contextPath = window.location.origin + "/PROYECTO_FB";
                       const tipo = document.getElementById("tipo").value;
                       window.location.href = contextPath + "/error.jsp?tipo=" + encodeURIComponent(tipo);
                }
            });            
    },120000);



  

    //Con esta funcion puedo recuperar los datos de la tabla al hacer clic y mostrar los indicadores.

    $('#tabla tbody').on('click', 'tr', function () {
        data = t.row(this).data();
        $('#mensaje-error-graficos').hide();
   //Limpio todo si el usuario toca la tabla vacia
        if (!data || !data[0]) {
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

            // Mostrar mensaje en el título de gráficos
            $('#titulo_graficos').text('GRAFICOS: << Seleccione un activo de la tabla >>');            

            return;
        }           
        $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
        $('#activo_financiero').text(data[0]+": ( "+data[1]+" )"); // Se muestra el nombre y descripción del bono seleccionado 
        graficos(data[0]);
    });
    
  

    //Se muestra el histórico de 80 días del Bono seleccionado. 
    function graficos(bono){
       var datosHistoricos;
       var datos;
       var tiempografLinea;
       var valoresGrafLinea;
       
       $.ajax({
           url: "DatosHistoricos",
           dataType: 'json',
           //Se envía el tipo y el simbolo a buscar
           data: { Tipo: $("#tipo").val(),
                   Simbolo: bono,
                   Dias: 80
           },
           success: function( result ){
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
                       label: 'Gráfico de velas',
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
               $('#titulo_graficos').text('GRAFICOS: << '+bono+" >>"); //Se muestra el nombre del activo y su descripción
               
               $('#30').attr('disabled', false); 
               $('#80').attr('disabled', true);   
               $('#180').attr('disabled', false);  
               $('#365').attr('disabled', false);     

               $('#30').css("color", "white");
               $('#80').css("color", "yellow");
               $('#180').css("color", "white");
               $('#365').css("color", "white");
               $('#myChart').show();
               $('#myLineChart').show();
               
           },
            error: function(xhr, status, error) {
                $('#texto-error-grafico').html('No pudimos mostrar los gráficos históricos de: <strong>' + data[0] + '</strong>');
                $('#mensaje-error-graficos').show();
                $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt;');
                $('#myChart').hide();
                $('#myLineChart').hide();
            }
       });     
    }
});        
        


 function treintaDiasb() {
   $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
   graficos(data[0], 30);  

   $('#mensaje-error-graficos').hide();  
   $('#30').attr('disabled', true); 
   $('#80').attr('disabled', false);   
   $('#180').attr('disabled', false);  
   $('#365').attr('disabled', false);

   
   $('#30').css("color", "yellow");
   $('#80').css("color", "white");
   $('#180').css("color", "white");
   $('#365').css("color", "white");

  
};  
function ochentaDiasb() {
   $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
   graficos(data[0], 80);  

   $('#mensaje-error-graficos').hide();  
   $('#30').attr('disabled', false); 
   $('#80').attr('disabled', true);   
   $('#180').attr('disabled', false);  
   $('#365').attr('disabled', false);

   
   $('#30').css("color", "white");
   $('#80').css("color", "yellow");
   $('#180').css("color", "white");
   $('#365').css("color", "white");

  
};

function cientoOchentaDiasb() {
   $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
   graficos(data[0], 180);   

   $('#mensaje-error-graficos').hide();  
   $('#30').attr('disabled', false); 
   $('#80').attr('disabled', false);   
   $('#180').attr('disabled', true);  
   $('#365').attr('disabled', false);

   
   $('#30').css("color", "white");
   $('#80').css("color", "white");
   $('#180').css("color", "yellow");
   $('#365').css("color", "white");

  
};

function unob() {
   $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');    
   graficos(data[0], 365);  

   $('#mensaje-error-graficos').hide();  
   $('#30').attr('disabled', false); 
   $('#80').attr('disabled', false);   
   $('#180').attr('disabled', false);  
   $('#365').attr('disabled', true);

   
   $('#30').css("color", "white");
   $('#80').css("color", "white");
   $('#180').css("color", "white");
   $('#365').css("color", "yellow");

  
};


    //Se muestra el histórico del Bono seleccionado. 
    function graficos(bono, dias){
       var datosHistoricos;
       var datos;
       var tiempografLinea;
       var valoresGrafLinea;
       var tempScrollTop = $(window).scrollTop(); // Guardo la posición actual del scroll de la página  
       $.ajax({
           url: "DatosHistoricos",
           dataType: 'json',
           //Se envía el tipo y el simbolo a buscar
           data: { Tipo: $("#tipo").val(),
                   Simbolo: bono,
                   Dias: dias
           },
           success: function( result ){
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
                                            'Cierre: ' + ohlc.c,
                                            'Máximo: ' + ohlc.h,
                                            'Mínimo: ' + ohlc.l
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
               $('#titulo_graficos').text('GRAFICOS: << '+bono+" >>"); //Se muestra el nombre del activo y su descripción
               $('#myChart').show();
               $('#myLineChart').show();
              
           },
            error: function(xhr, status, error) {
                $('#myChart').hide();
                $('#myLineChart').hide();
                $('#mensaje-error-graficos').show();
                let periodoTexto = (dias == 365) ? "1 año" : dias + " días";
                $('#texto-error-grafico').html('No pudimos mostrar los gráficos históricos de: <strong>' + bono + '</strong>. Periodo: ' + periodoTexto);
                $('#mensaje-error-graficos').show();
                $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + bono + ' &gt;&gt;');            
            }
            
       }); $(window).scrollTop(tempScrollTop); // Asigno la posición anterior del scroll a la página    
    }