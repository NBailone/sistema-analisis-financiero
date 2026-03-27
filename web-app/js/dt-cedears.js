$('#ventanaActualizar').modal({
  modal: 'show',
  keyboard: false,
  focus:false,
  backdrop: 'static'
});     
var t; //Varaible global DATATABLE
var data;
var pieChart;
var idintervalo = null;
$(document).ready(function () {
       
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
      window.g2 = g2;
    ///////////////////////////TABLA COTIZACIONES Y PRONÓSTICOS//////////////////////////////////      
   
  
    //Inicialización del DATATABLE
  
    t = $('#tabla').DataTable({
        
        responsive: {
            details: false,
            responsive: true
        },
        columnDefs: [
            { responsivePriority: 1, targets: [0,2,8] },
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
            },
            {
             "targets": 8,
                "createdCell": function (td, cellData, rowData, row, col) {
                    if ( rowData[8].includes('Compra') ) {
                        $(td).css('color', '#00E8AD');
                    }
                    else if ( rowData[8].includes('Venta') ) {
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
        ordering: false,
        scrollY: '600px',
        scrollCollapse: true,
        searching: false,
        paging: false,             
        processing: true,
        serverSide: true,
        ajax: {
            "url": "RecargarCedears",
            "data": function ( d ) {
                return $.extend( {}, d, {
                    "search_keywords": $("#searchInput").val()
                } ); 
            },
            error: function() {
                     const contextPath = window.location.origin + "/PROYECTO_FB";
                     const tipo = document.getElementById("tipo").value;
                     window.location.href = contextPath + "/error.jsp?tipo=" + encodeURIComponent(tipo);
                }
        },
        //Para traducir el DataTable
        language: {
            processing:     "Procesando...",
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
        },
        "initComplete": function(settings, json) {
             $('#ventanaActualizar').modal('hide');  //Se esconde el modal actualizando al cargar el datatable
        }
    });

    
   //Consulto y muestro el grafico de torta 
    $.ajax({
            url: "PronosticoGeneral",
            dataType: 'json',
            data: { Tipo: "Cedear"},
            dataSrc: "",
            success: function( result ){
                var d = result;
                graficoTorta(d[0], d[1], d[2], d[3],d[4]);    
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


    //Se busca la consulta ingresada por el ususario 
    let debounceTimer;
    $('#searchInput').on("input", function(){
        clearTimeout(debounceTimer);
        $('#cargando-busqueda').show(); // Mostrar "Cargando..."
        debounceTimer = setTimeout(function() { 
            t = $('#tabla').DataTable({
                responsive: {
                        details: false,
                        responsive: true
                },
                columnDefs: [
                        { responsivePriority: 1, targets: [0,2,8] },
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
                        },
                        {
                         "targets": 8,
                            "createdCell": function (td, cellData, rowData, row, col) {
                                if ( rowData[8].includes('Compra') ) {
                                    $(td).css('color', '#00E8AD');
                                }
                                else if ( rowData[8].includes('Venta') ) {
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
            ordering: false,
            scrollCollapse: true,
            searching: false,
            paging: false,             
            processing: true,
            serverSide: true,
            ajax: {
                    "url": "RecargarCedears",
                    "data": function ( d ) {
                        return $.extend( {}, d, {
                            "search_keywords": $("#searchInput").val()
                        } ); 
                    },
                     error: function() {
                        const contextPath = window.location.origin + "/PROYECTO_FB";
                        const tipo = document.getElementById("tipo").value;
                        window.location.href = contextPath + "/error.jsp?tipo=" + encodeURIComponent(tipo);
                    }             
            },
            //Para traducir el DataTable
            language: {
                    processing:     "Procesando...",
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
         $('#cargando-busqueda').hide();
        }, 400); // 400 ms de espera
        //t.clear();

    }); 
                     
    //Se Actualizan los pronosticos y cotizaciones cada cierto tiempo                     
    setInterval(function(){
         actualizarCotizaciones();
        //Consulto y muestro el grafico de torta 
         $.ajax({
                 url: "PronosticoGeneral",
                 dataType: 'json',
                 data: { Tipo: "Cedear"},
                 dataSrc: "",
                 success: function( result ){
                     var d = result;  
                     pieChart.data.datasets[0].data[0] = d[0];
                     pieChart.data.datasets[0].data[1] = d[1];
                     pieChart.data.datasets[0].data[2] = d[2];
                     pieChart.data.datasets[0].data[3] = d[3];
                     pieChart.data.datasets[0].data[4] = d[4];
                     pieChart.update();                     
                 },
                    error: function() {
                        const contextPath = window.location.origin + "/PROYECTO_FB";
                        const tipo = document.getElementById("tipo").value;
                        window.location.href = contextPath + "/error.jsp?tipo=" + encodeURIComponent(tipo);
                }
            });           
        },300000);  

function actualizarCotizaciones(){
        var scrollPos = $(".dataTables_scrollBody").scrollTop(); //Guardo la posición actual del scroll
        //t.clear();//al poner clear no me guarda el scroll de la tabla 
        //console.log(scrollPos);
        t = $('#tabla').DataTable({
            responsive: {
                    details: false,
                    responsive: true
            },
            columnDefs: [
                    { responsivePriority: 1, targets: [0,2,8] },
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
            },
            {
             "targets": 8,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        if ( rowData[8].includes('Compra') ) {
                            $(td).css('color', '#00E8AD');
                        }
                        else if ( rowData[8].includes('Venta') ) {
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
            ordering: false,
            scrollY: '600px',
            scrollCollapse: true,
            searching: false,
            paging: false,             
            processing: true,
            serverSide: true,
            ajax: {
                   "url": "RecargarCedears",
                   "data": function ( d ) {
                        return $.extend( {}, d, {
                            "search_keywords": $("#searchInput").val()
                        } ); 
                    },
                    error: function() {
                             const contextPath = window.location.origin + "/PROYECTO_FB";
                             const tipo = document.getElementById("tipo").value;
                             window.location.href = contextPath + "/error.jsp?tipo=" + encodeURIComponent(tipo);
                        }             
            },
            //Para traducir el DataTable
            language: {
                processing:     "Actualizando Cotizaciones...",
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
        $(".dataTables_scrollBody").scrollTop(scrollPos); //asigno la posición anterior del scroll, porque con draw vuelve arriba    
};

    //Se inicializa la tabla de los indicadores. 
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
    

    //Con esta funcion puedo recuperar los datos de la tabla al hacer clic y mostrar los indicadores.

    $('#tabla tbody').on('click', 'tr', function () {
        data = t.row(this).data();
      //Limpio todo si el usuario toca la tabla vacia
        if (!data || !data[0]) {
            // Limpia el intervalo si existe
            if (idintervalo) {
                clearInterval(idintervalo);
                idintervalo = null;
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
                window.myChart.destroy();
                window.myChart = null;
            }
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
           $('#activo_financiero').text('Seleccione un Cedear de la tabla');

            // Mostrar mensaje en el título de gráficos
            $('#titulo_graficos').text('GRAFICOS: << Seleccione un Cedear de la tabla >>');            

        return;
        }else{        

            $('#activo_financiero').text(data[0]+": ( "+data[1]+" )"); // Se muestra el nombre y descripción de la acción seleccionada 
            indicadores();
            $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');
            $('#mensaje-error-graficos').hide();        
            graficos(data[0],data[1]);
            $('#30').attr('disabled', false); 
            $('#80').attr('disabled', true);   
            $('#180').attr('disabled', false);  
            $('#365').attr('disabled', false);

            $('#30').css("color", "white");
            $('#80').css("color", "yellow");
            $('#180').css("color", "white");
            $('#365').css("color", "white");         
            clearInterval(idintervalo);
            idintervalo = setInterval(function(){indicadores();},300000); 
            
        }
    });        

    
    //Se muestran los indicadores de la fila seleccionada y se les da formato y color según el pronóstiico    
    function indicadores(){
        var datos;
        $.ajax({
            url: "BuscarIndicadores",
            dataType: 'json',
            data: { Activo: data[0]},
            dataSrc: "",
            success: function( result ){
                datos = result; //Asigno los datos a la variable globa
   
        var tempScrollTop = $(window).scrollTop(); // Guardo la posición actual del scroll de la página
        tIndicadores.clear();       
                var pronMacd;
                var pronRsi;
                var pronRoc;
                var pronEstoc;
                var pronCci;
                var pronDx;
                var proncmm2;
                if(datos.Pronostico.pronMacd==="Compra"){
                     pronMacd = "<span style='color: #00E8AD;'>"+ datos.Pronostico.pronMacd +"</span>";
                }else if(datos.Pronostico.pronMacd==="Venta"){
                   pronMacd = "<span style='color: red;'>"+ datos.Pronostico.pronMacd +"</span>";
                }else{
                    pronMacd = datos.Pronostico.pronMacd;
                }
                if(datos.Pronostico.pronRsi==="Compra"){
                     pronRsi = "<span style='color: #00E8AD;'>"+ datos.Pronostico.pronRsi +"</span>";
                }else if(datos.Pronostico.pronRsi==="Venta"){
                   pronRsi = "<span style='color: red;'>"+ datos.Pronostico.pronRsi +"</span>";
                }else{
                    pronRsi = datos.Pronostico.pronRsi;
                }
                if(datos.Pronostico.pronRoc==="Compra"){
                     pronRoc = "<span style='color: #00E8AD;'>"+ datos.Pronostico.pronRoc +"</span>";
                }else if(datos.Pronostico.pronRoc==="Venta"){
                   pronRoc = "<span style='color: red;'>"+ datos.Pronostico.pronRoc +"</span>";
                }else{
                    pronRoc = datos.Pronostico.pronRoc;
                }                
                if(datos.Pronostico.pronEstoc==="Compra"){
                    pronEstoc = "<span style='color: #00E8AD;'>"+ datos.Pronostico.pronEstoc +"</span>";
                }else if(datos.Pronostico.pronEstoc==="Venta"){
                   pronEstoc = "<span style='color: red;'>"+ datos.Pronostico.pronEstoc +"</span>";
                }else{
                    pronEstoc = datos.Pronostico.pronEstoc;
                }
                if(datos.Pronostico.pronCci==="Compra"){
                    pronCci = "<span style='color: #00E8AD;'>"+ datos.Pronostico.pronCci +"</span>";
                }else if(datos.Pronostico.pronCci==="Venta"){
                   pronCci = "<span style='color: red;'>"+ datos.Pronostico.pronCci +"</span>";
                }else{
                    pronCci = datos.Pronostico.pronCci;
                }
                if(datos.Pronostico.pronDx==="Compra"){
                    pronDx = "<span style='color: #00E8AD;'>"+ datos.Pronostico.pronDx +"</span>";
                }else if(datos.Pronostico.pronDx==="Venta"){
                   pronDx = "<span style='color: red;'>"+ datos.Pronostico.pronDx +"</span>";
                }else{
                    pronDx = datos.Pronostico.pronDx;
                }  
                if(datos.Pronostico.proncmm2==="Compra"){
                    proncmm2 = "<span style='color: #00E8AD;'>"+ datos.Pronostico.proncmm2 +"</span>";
                }else if(datos.Pronostico.proncmm2==="Venta"){
                   proncmm2 = "<span style='color: red;'>"+ datos.Pronostico.proncmm2 +"</span>";
                }else{
                   proncmm2 = datos.Pronostico.proncmm2;
                }                 
                tIndicadores.row.add(["MACD(12,26)",datos.Pronostico.macd, pronMacd]).draw(false);
                tIndicadores.row.add(["ROC",datos.Pronostico.roc, pronRoc]).draw(false); 
                tIndicadores.row.add(["ESTOCASTICO",datos.Pronostico.estocastico, pronEstoc]).draw(false); 
                tIndicadores.row.add(["CCI",datos.Pronostico.cci, pronCci]).draw(false); 
                tIndicadores.row.add(["DX",datos.Pronostico.dx, pronDx]).draw(false); 
                tIndicadores.row.add(["ATR",datos.Pronostico.atr, datos.Pronostico.pronAtr]).draw(false); 
                tIndicadores.row.add(["CRUCE MEDIA MOVIL(12,20)",datos.Pronostico.cmm20, proncmm2]).draw(false);
                $(window).scrollTop(tempScrollTop); // Asigno la posición anterior del scroll a la página 
                g2.refresh(datos.Pronostico.total);
                if(datos.Pronostico.pronostico==="Venta"||datos.Pronostico.pronostico==="Venta Fuerte"){
                    document.getElementById('pronostico').style.color = "red";
                }else if(datos.Pronostico.pronostico==="Neutral"){
                    document.getElementById('pronostico').style.color = "black";
                }else{
                    document.getElementById('pronostico').style.color = "green";
                }                
                $('#pronostico').text(datos.Pronostico.pronostico);
                },
                error: function() {
                         const contextPath = window.location.origin + "/PROYECTO_FB";
                         const tipo = document.getElementById("tipo").value;
                         window.location.href = contextPath + "/error.jsp?tipo=" + encodeURIComponent(tipo);
                    }  
        });                  
    }    
    //Se muestra el histórico de 80 días del Cedear seleccionado. 
    function graficos(cedear, desc){
       var datosHistoricos;
       var datos;
       var tiempografLinea;
       var valoresGrafLinea;
       
       $.ajax({
           url: "DatosHistoricos",
           dataType: 'json',
           //Se envía el tipo y el simbolo a buscar
           data: { Tipo: $("#tipo").val(),
                   Simbolo: cedear,
                   Dias : 80
           },
           dataSrc: "",
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
               $('#titulo_graficos').text('GRAFICOS: << '+cedear+" >>"); //Se muestra el nombre del activo y su descripción
               $('#myChart').show();
               $('#myLineChart').show();
                               
           },
            error: function(xhr, status, error) {
                $('#myChart').hide();
                $('#myLineChart').hide();
                if (datos && datos[0]) {
                    $('#texto-error-grafico').html('No pudimos mostrar los gráficos históricos de: <strong>' + datos[0] + '</strong>');
                    $('#mensaje-error-graficos').show();
                    $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + datos[0] + ' &gt;&gt;');
                } else {
                    $('#texto-error-grafico').html('No pudimos mostrar los gráficos históricos.');
                    $('#mensaje-error-graficos').show();
                    $('#titulo_graficos').html('GRAFICOS:');
                }

        }
       });     
    }
 
});        



 function treintaDiasc() {
   $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');  
   graficosHistorico(data[0], 30);
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
function ochentaDiasc() {
    $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');  
   graficosHistorico(data[0], 80);
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

function cientoOchentaDiasc() {
   $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');  
   graficosHistorico(data[0], 180);
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

function unoc() {
  $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + data[0] + ' &gt;&gt; <span id="cargando-grafico" style="font-size:16px; color:#00E8AD;">Cargando...</span>');  
  graficosHistorico(data[0], 365);
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



function graficosHistorico(cedear, dias){
       var datosHistoricos;
       var datos;
       var tiempografLinea;
       var valoresGrafLinea;
       
       $.ajax({
           url: "DatosHistoricos",
           dataType: 'json',
           //Se envía el tipo y el simbolo a buscar
           data: { Tipo: $("#tipo").val(),
                   Simbolo: cedear,
                   Dias : dias
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
               $('#titulo_graficos').text('GRAFICOS: << '+cedear+' >>'); //Se muestra el nombre del activo y su descripción
               $('#myChart').show();
               $('#myLineChart').show();               
           },
            error: function(xhr, status, error) {
                $('#myChart').hide();
                $('#myLineChart').hide();
                if (datos && datos[0]) {
                    $('#texto-error-grafico').html('No pudimos mostrar los gráficos históricos de: <strong>' + cedear + '</strong>');
                    $('#mensaje-error-graficos').show();
                    $('#titulo_graficos').html('GRAFICOS: &lt;&lt; ' + cedear + ' &gt;&gt;');
                } else {
                    $('#texto-error-grafico').html('No pudimos mostrar los gráficos históricos.');
                    $('#mensaje-error-graficos').show();
                    $('#titulo_graficos').html('GRAFICOS:');
                }
        }
       });     
    }    