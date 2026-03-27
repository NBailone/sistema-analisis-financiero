var t; //Varaible global DATATABLE
var data;
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
            { responsivePriority: 1, targets: [0,1,2] },
            { className: "dt-head-center", targets: [0, 1, 2 ] },
            { className: "dt-body-center", targets: [0, 1, 2 ] },
            { className: "align-middle", targets: [0, 1, 2 ] }
        ],
            
        bDestroy: true,
        stateSave: true,
        order: [[0, 'asc']],
        ordering: true,
        scrollY: '600px',
        scrollCollapse: true,
        searching: false,
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
            url: "RecargarDolar",
            dataType: 'json',
            dataSrc: "",
            success: function( result ){
                var data = result;
                datos = result; //Asigno los datos a la variable global
                t.clear();               
                for (var i=0; i<data.length; i++){         
                        
                    t.row.add([
                        data[i].simbolo, 
                        "$ "+data[i].compra.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                        "$ "+data[i].venta.toLocaleString('de-DE', {minimumFractionDigits: 2})
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

    //Cada 30 segundos se actualiza la información de las cotizaciones mediante ajax 
    setInterval(
        function(){
            var tempScrollTop = $(window).scrollTop(); // Guardo la posición actual del scroll de la página
            scrollPos = $(".dataTables_scrollBody").scrollTop(); //Guardo la posición actual del scroll del DATATABLE
            $('.dataTables_processing', $('#tabla').closest('.dataTables_wrapper')).show();
            $.ajax({
                url: "RecargarDolar",
                dataType: 'json',
                dataSrc: "",
                success: function( result ){
                    var data = result;
                    datos = result; //Asigno los datos a la variable global
                    t.clear();               
                    for (var i=0; i<data.length; i++){
                         t.row.add([
                                data[i].simbolo, 
                              "$ "+data[i].compra.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                              "$ "+data[i].venta.toLocaleString('de-DE', {minimumFractionDigits: 2})
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
    },60000);



    //Con esta funcion puedo recuperar los datos de la tabla al hacer clic y mostrar los datos historicos.

    $('#tabla tbody').on('click', 'tr', function () {
        data = t.row(this).data();
        $('#mensaje-error-graficos').hide(); 
        $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');        
        graficos(data[0]);
    });
    
  

    //Se muestra el histórico de 80 días del Bono seleccionado. 
    function graficos(dolar){
       $('#mensaje-error-graficos').hide(); 
       var datos;
       var tiempografLinea;
       var valoresGraf1;
       var valoresGraf2;
       var valoresGraf3;
       var valoresGraf4;
       var opcion1 = dolar;
       var opcion2;
       var opcion3;
       var opcion4;
       var color1='rgb(75, 192, 192)';//azul
       var color2='rgb(247, 51, 9)';//rojo
       var color3='rgb(18, 20, 17)';//Negro
       var color4='rgb(4, 145, 0)';//Verde
       $.ajax({
           url: "DatosHistoricos",
           dataType: 'json',
           //Se envía el tipo y el simbolo a buscar
           data: { Tipo: "Dolar",
                   Simbolo: dolar,
                   Dias: 80
           },
           success: function( result ){
               datos = result;
                    tiempografLinea = datos.DolarBlue.map(function(elem){
                        var t = new Date(elem.fecha).setHours(0,0,0,0);
                        return t;
                    });                   
                    valoresGraf1 = datos.DolarBlue.map(function(elem){
                        return elem.venta;
                    });
                    valoresGraf2 = datos.DolarBolsa.map(function(elem){
                        return elem.venta;
                    });   
                    valoresGraf3 = datos.DolarCcl.map(function(elem){
                        return elem.venta;
                    });
                    valoresGraf4 = datos.DolarOficial.map(function(elem){
                        return elem.venta;
                    });                 
               
               if(dolar==="Dolar Blue"){
                    opcion2 = "Dolar Bolsa";
                    opcion3 = "Dolar CCL"
                    opcion4 = "Dolar Oficial";

               }else if(dolar==="Dolar Bolsa"){
                    opcion2 = "Dolar Blue";
                    opcion3 = "Dolar CCL"
                    opcion4 = "Dolar Oficial";
                    color1='rgb(247, 51, 9)';
                    color2='rgb(75, 192, 192)'; 
                    
               }else if(dolar==="Dolar Contado con Liqui"){
                    opcion1 = "Dolar CCL";
                    opcion2 = "Dolar Blue";
                    opcion3 = "Dolar Bolsa"
                    opcion4 = "Dolar Oficial";
                    color1 = 'rgb(18, 20, 17)';
                    color2 = 'rgb(75, 192, 192)';
                    color3 = 'rgb(247, 51, 9)'; 
                    
               }else if(dolar==="Dolar Oficial"){
                    opcion2 = "Dolar Blue";
                    opcion3 = "Dolar Bolsa"
                    opcion4 = "Dolar CCL";
                    color1 = 'rgb(4, 145, 0)';
                    color2 = 'rgb(75, 192, 192)';
                    color3 = 'rgb(247, 51, 9)'; 
                    color4 = 'rgb(18, 20, 17)'; 
               }
                 
               //Datos gráfico de línea
               const da = {
                   labels: tiempografLinea,
                   datasets: [{
                       label: opcion1,
                       data: valoresGraf1,
                       fill: false,
                       borderColor: color1,
                       tension: 0.2
                   }]
               }; 
               //Datos gráfico de línea Múltiple
               const d = {
                   labels: tiempografLinea,
                   datasets: [{
                       label: opcion1,
                       data: valoresGraf1,
                       fill: false,
                       borderColor: color1,
                       tension: 0.2
                   },
                   {
                       label: opcion2,
                       data: valoresGraf2,
                       fill: false,
                       borderColor: color2,
                       tension: 0.2                       
                   },
                   {
                       label: opcion3,
                       data: valoresGraf3,
                       fill: false,
                       borderColor: color3,
                       tension: 0.2                       
                   },
                  {
                       label: opcion4,
                       data: valoresGraf4,
                       fill: false,
                       borderColor: color4,
                       tension: 0.2                       
                   }                    
               ]
               
               };                

               // Configuración gráfico de linea
               const config1 = {
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
               // Configuración gráfico de linea Múltiple
               const config2 = {
                   type: 'line',
                   data: d,
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
               var chartStatus1 = Chart.getChart("myLineChart");
               if (chartStatus1 !== undefined) {
                   myLineChart.destroy();
               }
               var chartStatus2 = Chart.getChart("myLineChart2");
               if (chartStatus2 !== undefined) {
                   myLineChart2.destroy();
               }                 
               // render                
               myLineChart = new Chart(document.getElementById('myLineChart'),config1);
               myLineChart2 = new Chart(document.getElementById('myLineChart2'),config2);
               $('#titulo_graficos').text('GRAFICOS: << '+dolar+" >>"); //Se muestra el nombre del activo y su descripción
               
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
                $('#myLineChart').hide();
                $('#myLineChart2').hide();
            }
       });     
    }
});        
          

 function treintaDiasd() {
   $('#mensaje-error-graficos').hide();
   $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
   graficos(data[0], 30);  

   $('#30').attr('disabled', true); 
   $('#80').attr('disabled', false);   
   $('#180').attr('disabled', false);  
   $('#365').attr('disabled', false);

   
   $('#30').css("color", "yellow");
   $('#80').css("color", "white");
   $('#180').css("color", "white");
   $('#365').css("color", "white");

  
};  
function ochentaDiasd() {
    $('#mensaje-error-graficos').hide();
    $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
   graficos(data[0], 80);  

   $('#30').attr('disabled', false); 
   $('#80').attr('disabled', true);   
   $('#180').attr('disabled', false);  
   $('#365').attr('disabled', false);

   
   $('#30').css("color", "white");
   $('#80').css("color", "yellow");
   $('#180').css("color", "white");
   $('#365').css("color", "white");

  
};

function cientoOchentaDiasd() {
    $('#mensaje-error-graficos').hide();
    $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
   graficos(data[0], 180);   

   $('#30').attr('disabled', false); 
   $('#80').attr('disabled', false);   
   $('#180').attr('disabled', true);  
   $('#365').attr('disabled', false);

   
   $('#30').css("color", "white");
   $('#80').css("color", "white");
   $('#180').css("color", "yellow");
   $('#365').css("color", "white");

  
};

function unod() {
    $('#mensaje-error-graficos').hide();
    $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
   graficos(data[0], 365);  

   $('#30').attr('disabled', false); 
   $('#80').attr('disabled', false);   
   $('#180').attr('disabled', false);  
   $('#365').attr('disabled', true);

   
   $('#30').css("color", "white");
   $('#80').css("color", "white");
   $('#180').css("color", "white");
   $('#365').css("color", "yellow");

  
};


    //Se muestra el histórico de 80 días del Bono seleccionado. 
    function graficos(dolar, dias){
       var datos;
       var tiempografLinea;
       var valoresGraf1;
       var valoresGraf2;
       var valoresGraf3;
       var valoresGraf4;
       var opcion1 = dolar;
       var opcion2;
       var opcion3;
       var opcion4;
       var color1='rgb(75, 192, 192)';//azul
       var color2='rgb(247, 51, 9)';//rojo
       var color3='rgb(18, 20, 17)';//Negro
       var color4='rgb(4, 145, 0)';//Verde
       $.ajax({
           url: "DatosHistoricos",
           dataType: 'json',
           //Se envía el tipo y el simbolo a buscar
           data: { Tipo: "Dolar",
                   Simbolo: dolar,
                   Dias: dias
           },
           success: function( result ){
               datos = result;
                    tiempografLinea = datos.DolarBlue.map(function(elem){
                        var t = new Date(elem.fecha).setHours(0,0,0,0);
                        return t;
                    });                   
                    valoresGraf1 = datos.DolarBlue.map(function(elem){
                        return elem.venta;
                    });
                    valoresGraf2 = datos.DolarBolsa.map(function(elem){
                        return elem.venta;
                    });   
                    valoresGraf3 = datos.DolarCcl.map(function(elem){
                        return elem.venta;
                    });
                    valoresGraf4 = datos.DolarOficial.map(function(elem){
                        return elem.venta;
                    });                 
               
               if(dolar==="Dolar Blue"){
                    opcion2 = "Dolar Bolsa";
                    opcion3 = "Dolar CCL"
                    opcion4 = "Dolar Oficial";

               }else if(dolar==="Dolar Bolsa"){
                    opcion2 = "Dolar Blue";
                    opcion3 = "Dolar CCL"
                    opcion4 = "Dolar Oficial";
                    color1='rgb(247, 51, 9)';
                    color2='rgb(75, 192, 192)'; 
                    
               }else if(dolar==="Dolar Contado con Liqui"){
                    opcion1 = "Dolar CCL";
                    opcion2 = "Dolar Blue";
                    opcion3 = "Dolar Bolsa"
                    opcion4 = "Dolar Oficial";
                    color1 = 'rgb(18, 20, 17)';
                    color2 = 'rgb(75, 192, 192)';
                    color3 = 'rgb(247, 51, 9)'; 
                    
               }else if(dolar==="Dolar Oficial"){
                    opcion2 = "Dolar Blue";
                    opcion3 = "Dolar Bolsa"
                    opcion4 = "Dolar CCL";
                    color1 = 'rgb(4, 145, 0)';
                    color2 = 'rgb(75, 192, 192)';
                    color3 = 'rgb(247, 51, 9)'; 
                    color4 = 'rgb(18, 20, 17)'; 
               }
                 
               //Datos gráfico de línea
               const da = {
                   labels: tiempografLinea,
                   datasets: [{
                       label: opcion1,
                       data: valoresGraf1,
                       fill: false,
                       borderColor: color1,
                       tension: 0.2
                   }]
               }; 
               //Datos gráfico de línea Múltiple
               const d = {
                   labels: tiempografLinea,
                   datasets: [{
                       label: opcion1,
                       data: valoresGraf1,
                       fill: false,
                       borderColor: color1,
                       tension: 0.2
                   },
                   {
                       label: opcion2,
                       data: valoresGraf2,
                       fill: false,
                       borderColor: color2,
                       tension: 0.2                       
                   },
                   {
                       label: opcion3,
                       data: valoresGraf3,
                       fill: false,
                       borderColor: color3,
                       tension: 0.2                       
                   },
                  {
                       label: opcion4,
                       data: valoresGraf4,
                       fill: false,
                       borderColor: color4,
                       tension: 0.2                       
                   }                    
               ]
               
               };                

               // Configuración gráfico de linea
               const config1 = {
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
               // Configuración gráfico de linea Múltiple
               const config2 = {
                   type: 'line',
                   data: d,
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
               var chartStatus1 = Chart.getChart("myLineChart");
               if (chartStatus1 !== undefined) {
                   myLineChart.destroy();
               }
               var chartStatus2 = Chart.getChart("myLineChart2");
               if (chartStatus2 !== undefined) {
                   myLineChart2.destroy();
               }                 
               // render                
               myLineChart = new Chart(document.getElementById('myLineChart'),config1);
               myLineChart2 = new Chart(document.getElementById('myLineChart2'),config2);
               $('#titulo_graficos').text('GRAFICOS: << '+dolar+" >>"); //Se muestra el nombre del activo y su descripción   
               $('#myChart').show();
               $('#myLineChart').show();               
           },
            error: function(xhr, status, error) {
                $('#myLineChart').hide();
                $('#myLineChart2').hide();
                $('#mensaje-error-graficos').show();
                let periodoTexto = (dias == 365) ? "1 año" : dias + " días";
                $('#texto-error-grafico').html('No pudimos mostrar los gráficos históricos de: <strong>' + data[0] + '</strong>. Periodo: ' + periodoTexto);
                $('#mensaje-error-graficos').show();
                $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt;');            
            }
       });     
    }          


