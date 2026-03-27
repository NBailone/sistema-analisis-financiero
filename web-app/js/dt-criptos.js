    var t; //Varaible global DATATABLE
    var datos;
    var moneda = "Peso";
    var dias = 80;
    var pieChart;
    var data; //Variable donde se guardan los datos de una fila de la tabla 
    window.myLineChart = null;    
    $('#ventanaActualizar').modal({
      modal: 'show',
      keyboard: false,
      focus:false,
      backdrop: 'static'
    });  
    $(document).ready(function(){   
        //JustGage indicador gráfico de compra y venta. 
        var g2 = new JustGage({
            id: 'g2',
            value: -6,
            min: -6,
            max: 6,
            pointer: true,
            minTxt:"Venta",
            maxTxt:"Compra",
            hideValue:true,
            refreshAnimationTime:1000,
            levelColors: ["FB0000", "#FB7E00","#44D554", "#00E8AD"],
            labelFontColor: "black",
            pointerOptions: {
              toplength: -15,
              bottomlength: 10,
              bottomwidth: 12,
              color: 'black',
              stroke: '#ffffff',
              stroke_width: 3,
              stroke_linecap: 'round'
            },
            gaugeWidthScale: 0.6,
            counter: true,
            relativeGaugeSize: true,
            donut: false
          });    
            window.g2 = g2; // para poder verlo desde gráficos y borrarlo.      
        ///////////////////////////TABLA COTIZACIONES Y PRONÓSTICOS//////////////////////////////////


        //Inicialización del DATATABLE
        t = $('#tabla').DataTable({
                responsive: {
                    details: false,
                    responsive: true
                },
                columnDefs: [
                    { responsivePriority: 1, targets: [0,2,5] },
                    { className: "dt-head-center", targets: [0, 1, 2, 3, 4, 5] },
                    { className: "dt-body-center", targets: [0, 1, 2, 3, 4, 5] },
                    { className: "align-middle", targets: [0, 1, 2, 3, 4, 5] },
                    {
                     "targets": 5,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            if ( rowData[5].includes('Compra') ) {
                                $(td).css('color', '#00E8AD');
                            }
                            else if ( rowData[5].includes('Venta') ) {
                                $(td).css('color', 'red');
                            }else{
                                $(td).css('color', 'white');
                            }
                        }
                    }              
                ],                  
                bDestroy: true,
                stateSave: true,
                order: [[0, 'asc']],
                scrollY: '600px',
                scrollCollapse: true,
                paging: false,
                processing: true,
                //Para traducir el DataTable
                language: {
                    processing:     "Actualizando...",
                    search:         "Buscar",
                    lengthMenu:    "Mostrar _MENU_ &eacute;l&eacute;registros",
                    info:           "Mostrando _TOTAL_ registros de un total de _MAX_ registros",
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

        var compra = 0;
        var compraF = 0;
        var neutral = 0;
        var venta = 0;
        var ventaF = 0;
        scrollPos = $(".dataTables_scrollBody").scrollTop(); //Guardo la posición actual del scroll
        $('.dataTables_processing', $('#tabla').closest('.dataTables_wrapper')).show();
        $.ajax({
                url: "RecargarCriptos",
                dataType: 'json',
                dataSrc: "",
                success: function( result ){
                    var data = result;
                    datos = result; //Asigno los datos a la variable global
                    t.clear();               
                    for (var i=0; i<data.length; i++){         
                        if(data[i].Pronostico.pronostico==="Venta"){
                            venta += 1;
                        }else if(data[i].Pronostico.pronostico==="Venta Fuerte"){
                            ventaF +=1;
                        }else if(data[i].Pronostico.pronostico==="Neutral"){
                            neutral+=1;
                        }else if(data[i].Pronostico.pronostico==="Compra"){
                            compra+=1;
                        }else{
                            compraF+=1;
                        }    
                        t.row.add([data[i].simbolo, 
                            data[i].descripcion,
                            "$ "+data[i].cotizacionArg.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                            "$ "+data[i].cotizacionUsd.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                            "$ "+data[i].cotizacionEur.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                            data[i].Pronostico.pronostico
                        ]).draw(false);
                    }
                    $(".dataTables_scrollBody").scrollTop(scrollPos); //asigno la posición anterior del scroll, porque con draw vuelve arriba
                    $('.dataTables_processing', $('#tabla').closest('.dataTables_wrapper')).hide();
                    $('#ventanaActualizar').modal('hide');  //Se esconde el modal actualizando al cargar el datatable 
                    graficoTorta(ventaF, venta, neutral, compra,compraF);                   
                },
                error: function() {
                       const contextPath = window.location.origin + "/PROYECTO_FB";
                       const tipo = document.getElementById("tipo").value;
                       window.location.href = contextPath + "/error.jsp?tipo=" + encodeURIComponent(tipo);
                    }
        }); 


        //Indicador gráfico que mide la tendecia de todos los activos juntos (compra, venta, compra fuerte, venta fuerte, neutral)
        function graficoTorta(ventaF, venta, neutral, compra,compraF){
            setTimeout(function(){
                const d = {
                  labels: [
                    'Venta fuerte',
                    'Venta',
                    'Neutral',
                    'Compra',
                    'Compra fuerte' 
                  ],
                  datasets: [{
                    label: 'My First Dataset',
                    data: [ventaF, venta, neutral,compra,compraF],
                    backgroundColor: [
                      'rgb(157, 11, 11)',
                      'rgb(255, 2, 0)',
                      'rgb(223, 223, 223)',
                      '#00E8AD',
                      '#44D554'
                    ],
                    hoverOffset: 10
                  }]
                };      
                const config = {
                    type: 'pie',
                    data: d,
                    options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'PRONOSTICO GENERAL'
                        }
                    }            
                    }
                 };

                pieChart = new Chart(document.getElementById('PieChart'),config);       
             }, 350);            
        }



        //Cada 30 segundos se actualiza la información de las cotizaciones y pronóstico mediante ajax
        setInterval(
            function(){
                var compra = 0;
                var compraF = 0;
                var neutral = 0;
                var venta = 0;
                var ventaF = 0;            
                var tempScrollTop = $(window).scrollTop(); // Guardo la posición actual del scroll de la página
                scrollPos = $(".dataTables_scrollBody").scrollTop(); //Guardo la posición actual del scroll del DATATABLE
                $('.dataTables_processing', $('#tabla').closest('.dataTables_wrapper')).show();
                $.ajax({
                    url: "RecargarCriptos",
                    dataType: 'json',
                    dataSrc: "",
                    success: function( result ){
                        var data = result;
                        datos = result; //Asigno los datos a la variable global
                        t.clear();               
                        for (var i=0; i<data.length; i++){
                            if(data[i].Pronostico.pronostico==="Venta"){
                                 venta += 1;
                             }else if(data[i].Pronostico.pronostico==="Venta Fuerte"){
                                 ventaF +=1;
                             }else if(data[i].Pronostico.pronostico==="Neutral"){
                                 neutral+=1;
                             }else if(data[i].Pronostico.pronostico==="Compra"){
                                 compra+=1;
                             }else{
                                 compraF+=1;
                             }                            
                            t.row.add([
                                    data[i].simbolo, 
                                    data[i].descripcion,
                                    "$ "+data[i].cotizacionArg.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    "$ "+data[i].cotizacionUsd.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    "$ "+data[i].cotizacionEur.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    data[i].Pronostico.pronostico
                                ]).draw(false);
                        }
                        $(".dataTables_scrollBody").scrollTop(scrollPos); //Asigno la posición anterior del scroll al datatable, porque con draw vuelve arriba
                        $(window).scrollTop(tempScrollTop); // Asigno la posición anterior del scroll a la página   
                        $('.dataTables_processing', $('#tabla').closest('.dataTables_wrapper')).hide();//Oculto el cartel de actulizando
                        pieChart.data.datasets[0].data[0] = ventaF;
                        pieChart.data.datasets[0].data[1] = venta;
                        pieChart.data.datasets[0].data[2] = neutral;
                        pieChart.data.datasets[0].data[3] = compra;
                        pieChart.data.datasets[0].data[4] = compraF;
                        pieChart.update();                      
                    },
                    error: function() {
                           const contextPath = window.location.origin + "/PROYECTO_FB";
                           const tipo = document.getElementById("tipo").value;
                           window.location.href = contextPath + "/error.jsp?tipo=" + encodeURIComponent(tipo);
                    }
                });            
        },120000);

    ////////////////////////////////////////////////////////////   TABLA INDICADORES  /////////////////////////////////////////////////////////////////////////////////////////

        var tIndicadores = $('#tablaind').DataTable({
            searching: false,
            scrollY:false,
            responsive: {
                details: false,
                responsive: true
            },    
            columnDefs: [
                { className: "dt-head-center", targets: [0, 1, 2 ] },
                { className: "dt-body-center", targets: [0,1,2] },
                { className: "align-middle", targets: [0, 1, 2] },
                { "width": "33%", "targets": [0, 1, 2] }
            ],                  
            bDestroy: true,
            stateSave: true,
            ordering: false,
            scrollCollapse: true,
            paging: false,
            //Para traducir el DataTable
            language: {
                processing:     "Procesando...",
                search:         "",
                lengthMenu:    "",
                info:           "",
                infoEmpty:      "",
                infoFiltered:   "",
                infoPostFix:    "",
                zeroRecords:    "No se encontraron resultados",
                emptyTable:     "No se encontraron resultados",
                decimal: ',',
                thousands: '.'
            }                       
        }); 

        //Con esta funcion puedo recuperar los datos de la tabla al hacer clic y volver a cargar los indicadores cada 5 segundos 

        $('#tabla tbody').on('click', 'tr', function () {
            data = t.row(this).data();
    //Limpio todo si el usuario toca la tabla vacia
            if (!data || !data[0]) {
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

                $('#usd').attr('disabled', true);
                $('#peso').attr('disabled', true);   
                $('#euro').attr('disabled', true);

                $('#usd').css("color", "white");
                $('#peso').css("color", "white");
                $('#euro').css("color", "white");
                if (window.myLineChart) {
                    window.myLineChart.destroy();
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
               $('#activo_financiero').text('Seleccione una Criptomoneda de la tabla');

                // Mostrar mensaje en el título de gráficos
                $('#titulo_graficos').text('GRAFICOS: << Seleccione una Criptomoneda de la tabla >>');            

            return;
            }else{
            $('#mensaje-error-graficos').hide(); 
            $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
            $('#activo_financiero').text(data[0]+": ( "+data[1]+" )"); // Se muestra el nombre y descrición de la acción seleccionada 
            indicadores();
            graficos(data[0]);

            $('#peso').attr('disabled', true); 
            $('#usd').attr('disabled', false);   
            $('#euro').attr('disabled', false);     

            $('#peso').css("color", "yellow");
            $('#usd').css("color", "white");
            $('#euro').css("color", "white");

            $('#30').attr('disabled', false); 
            $('#80').attr('disabled', true);   
            $('#180').attr('disabled', false);  
            $('#365').attr('disabled', false);


            $('#30').css("color", "white");
            $('#80').css("color", "yellow");
            $('#180').css("color", "white");
            $('#365').css("color", "white");        
            window.intervalIndicadores = setInterval(function(){indicadores();},120000);                
            }              

        });


        //Se muestran los indicadores de la fila seleccionada y se les da formato y color según el pronóstiico     
        function indicadores(){
            var tempScrollTop = $(window).scrollTop(); // Guardo la posición actual del scroll de la página
            tIndicadores.clear();  
            for (var i=0; i<datos.length; i++){
                if(datos[i].simbolo===data[0]){
                    var pronMacd;
                    var pronRsi;
                    var pronRoc;
                    var proncmm2;
                    if(datos[i].Pronostico.pronMacd==="Compra"){
                         pronMacd = "<span style='color: #00E8AD;'>"+ datos[i].Pronostico.pronMacd +"</span>";
                    }else if(datos[i].Pronostico.pronMacd==="Venta"){
                       pronMacd = "<span style='color: red;'>"+ datos[i].Pronostico.pronMacd +"</span>";
                    }else{
                        pronMacd = datos[i].Pronostico.pronMacd;
                    }
                    if(datos[i].Pronostico.pronRsi==="Compra"){
                         pronRsi = "<span style='color: #00E8AD;'>"+ datos[i].Pronostico.pronRsi +"</span>";
                    }else if(datos[i].Pronostico.pronRsi==="Venta"){
                       pronRsi = "<span style='color: red;'>"+ datos[i].Pronostico.pronRsi +"</span>";
                    }else{
                        pronRsi = datos[i].Pronostico.pronRsi;
                    }
                    if(datos[i].Pronostico.pronRoc==="Compra"){
                         pronRoc = "<span style='color: #00E8AD;'>"+ datos[i].Pronostico.pronRoc +"</span>";
                    }else if(datos[i].Pronostico.pronRoc==="Venta"){
                       pronRoc = "<span style='color: red;'>"+ datos[i].Pronostico.pronRoc +"</span>";
                    }else{
                        pronRoc = datos[i].Pronostico.pronRoc;
                    }                 
                    if(datos[i].Pronostico.proncmm2==="Compra"){
                        proncmm2 = "<span style='color: #00E8AD;'>"+ datos[i].Pronostico.proncmm2 +"</span>";
                    }else if(datos[i].Pronostico.proncmm2==="Venta"){
                       proncmm2 = "<span style='color: red;'>"+ datos[i].Pronostico.proncmm2 +"</span>";
                    }else{
                       proncmm2 = datos[i].Pronostico.proncmm2;
                    }                 
                    tIndicadores.row.add(["MACD(12,26)",datos[i].Pronostico.macd, pronMacd]).draw(false);
                    tIndicadores.row.add(["RSI(14)",datos[i].Pronostico.rsi, pronRsi]).draw(false); 
                    tIndicadores.row.add(["ROC",datos[i].Pronostico.roc, pronRoc]).draw(false); 
                    tIndicadores.row.add(["CRUCE MEDIA MOVIL(20)",datos[i].Pronostico.cmm20, proncmm2]).draw(false);
                    $(window).scrollTop(tempScrollTop); // Asigno la posición anterior del scroll a la página 
                    g2.refresh(datos[i].Pronostico.total);
                    if(datos[i].Pronostico.pronostico==="Venta"||datos[i].Pronostico.pronostico==="Venta Fuerte"){
                        document.getElementById('pronostico').style.color = "red";
                    }else if(datos[i].Pronostico.pronostico==="Neutral"){
                        document.getElementById('pronostico').style.color = "black";
                    }else{
                        document.getElementById('pronostico').style.color = "green";
                    }                
                    $('#pronostico').text(datos[i].Pronostico.pronostico);

                }
            }         
        }


        //Se muestra el histórico de 80 días de la criptomoneda seleccionada. 
        function graficos(cripto){
           var datos;
           var tiempografLinea;
           var valoresGrafLinea;

           $.ajax({
               url: "DatosHistoricos",
               dataType: 'json',
               //Se envía el tipo y el simbolo a buscar
               data: { Tipo: "Criptomonedas",
                       Simbolo: cripto,
                       Moneda: "Peso",
                       Dias: 80
               },
               success: function( result ){
                   datos = result;
                   tiempografLinea = datos.map(function(elem){
                       var t = new Date(elem.fecha).setHours(0,0,0,0);
                       return t;
                   });
                    valoresGrafLinea = datos.map(function(elem){
                            return elem.cotizacionArg;
                    });                      
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
                   var chartStatus2 = Chart.getChart("myLineChart");
                   if (chartStatus2 !== undefined) {
                       myLineChart.destroy();
                   }                    
                   // render init block                   
                   myLineChart = new Chart(document.getElementById('myLineChart'),config2);    
                   $('#titulo_graficos').text('GRAFICOS: << '+cripto+" >>"); //Se muestra el nombre del activo y su descripción
                   $('#myLineChart').show();
               },
                error: function(xhr, status, error) {
                    $('#myLineChart').hide();
                    $('#texto-error-grafico').html('No pudimos mostrar los gráficos históricos de: <strong>' + data[0] + '</strong>');
                    $('#mensaje-error-graficos').show();
                    $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt;');

                }
           });     
        }    

    });

    function peso() {
       $('#mensaje-error-graficos').hide();   
       $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');   
       graficos(data[0], "Peso", dias);

       moneda = "Peso";
       $('#peso').attr('disabled', true); 
       $('#usd').attr('disabled', false);   
       $('#euro').attr('disabled', false);   

       $('#peso').css("color", "yellow");
       $('#usd').css("color", "white");
       $('#euro').css("color", "white");


    };    

    function dolar() {
       $('#mensaje-error-graficos').hide();           
       $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');    
       graficos(data[0], "Dolar", dias);

       moneda = "Dolar";
       $('#usd').attr('disabled', true);
       $('#peso').attr('disabled', false);   
       $('#euro').attr('disabled', false);

       $('#usd').css("color", "yellow");
       $('#peso').css("color", "white");
       $('#euro').css("color", "white");


    };

    function euro() {
       $('#mensaje-error-graficos').hide();           
       $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
       graficos(data[0], "Euro", dias);
       moneda = "Euro";
       $('#usd').attr('disabled', false);
       $('#peso').attr('disabled', false);   
       $('#euro').attr('disabled', true);

       $('#usd').css("color", "white");
       $('#peso').css("color", "white");
       $('#euro').css("color", "yellow");   
    };  


     function treintaDiascrip() {
       $('#mensaje-error-graficos').hide();            
       $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');     
       dias = 30;
       graficos(data[0], moneda, dias);  


       $('#30').attr('disabled', true); 
       $('#80').attr('disabled', false);   
       $('#180').attr('disabled', false);  
       $('#365').attr('disabled', false);


       $('#30').css("color", "yellow");
       $('#80').css("color", "white");
       $('#180').css("color", "white");
       $('#365').css("color", "white");


    };  
    function ochentaDiascrip() {
       $('#mensaje-error-graficos').hide();          
       $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');    
       dias = 80; 
       graficos(data[0], moneda, dias);  

       $('#30').attr('disabled', false); 
       $('#80').attr('disabled', true);   
       $('#180').attr('disabled', false);  
       $('#365').attr('disabled', false);


       $('#30').css("color", "white");
       $('#80').css("color", "yellow");
       $('#180').css("color", "white");
       $('#365').css("color", "white");


    };

    function cientoOchentaDiascrip() {
       $('#mensaje-error-graficos').hide();    
       $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');  
       dias = 180;  
       graficos(data[0], moneda, dias);   

       $('#30').attr('disabled', false); 
       $('#80').attr('disabled', false);   
       $('#180').attr('disabled', true);  
       $('#365').attr('disabled', false);


       $('#30').css("color", "white");
       $('#80').css("color", "white");
       $('#180').css("color", "yellow");
       $('#365').css("color", "white");


    };

    function unocrip() {
       $('#mensaje-error-graficos').hide();
       $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');  
       dias = 365;   
       graficos(data[0], moneda, dias);  

       $('#30').attr('disabled', false); 
       $('#80').attr('disabled', false);   
       $('#180').attr('disabled', false);  
       $('#365').attr('disabled', true);


       $('#30').css("color", "white");
       $('#80').css("color", "white");
       $('#180').css("color", "white");
       $('#365').css("color", "yellow");


    };


     //Se muestra el histórico de 80 días de la criptomoneda seleccionada eliginedo la divisa 
        function graficos(cripto, moneda, dias){
           $('#mensaje-error-graficos').hide();
           var datosHistoricos;
           var datos;
           var tiempografLinea;
           var valoresGrafLinea;

           $.ajax({
               url: "DatosHistoricos",
               dataType: 'json',
               //Se envía el tipo y el simbolo a buscar
               data: { Tipo: "Criptomonedas",
                       Simbolo: cripto,
                       Moneda: moneda,
                       Dias: dias
               },
               success: function( result ){
                   datos = result;
                    tiempografLinea = datos.map(function(elem){
                        var t = new Date(elem.fecha);
                        t.setHours(0,0,0,0);
                        return t;
                    });
                    valoresGrafLinea = datos.map(function(elem){
                        if (moneda === "Peso") {
                            return elem.cotizacionArg;
                        } else if (moneda === "Dolar") {
                            return elem.cotizacionUsd;
                        } else { //Euro
                            return elem.cotizacionEur;
                        }
                    });              
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
                   var chartStatus2 = Chart.getChart("myLineChart");
                   if (chartStatus2 !== undefined) {
                       myLineChart.destroy();
                   }                    
                   // render init block                   
                   myLineChart = new Chart(document.getElementById('myLineChart'),config2);   
                   $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + cripto + ' &gt;&gt;');
                   $('#myLineChart').show();                   
               },
                error: function(xhr, status, error) {
                    $('#myLineChart').hide();
                    $('#mensaje-error-graficos').show();
                    let periodoTexto = (dias == 365) ? "1 año" : dias + " días";
                    $('#texto-error-grafico').html('No pudimos mostrar los gráficos históricos de: <strong>' + data[0] + '</strong>. Periodo: ' + periodoTexto);
                    $('#mensaje-error-graficos').show();
                    $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt;');            
                }
           });     
    } 