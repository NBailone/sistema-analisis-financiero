var t; //Varaible global DATATABLE
var datos;
var pieChart;
$(document).ready(function(){   
    //JustGage indicador gráfico de compra y venta. 
    var g2 = new JustGage({         
        id: 'g2',                  // ID del elemento HTML contenedor 
        value: -6,                 // Valor inicial (posición de la aguja) 
        min: -6,                   // Valor mínimo del rango (extremo izquierdo: "Venta")
        max: 6,                    // Valor máximo del rango (extremo derecho: "Compra")
        pointer: true,             // Habilitar aguja indicadora
        minTxt:"Venta",            // Texto para el valor mínimo
        maxTxt:"Compra",           // Texto para el valor máximo
        hideValue:true,            // Ocultar el valor numérico central
        refreshAnimationTime:1000, // Duración de animación al actualizar (1 segundo)
        levelColors: ["FB0000",    // Rojo (Venta fuerte)
                      "#FB7E00",   // Naranja (Venta moderada)
                      "#44D554",   // Verde claro (Compra moderada)
                      "#00E8AD"],  // Verde agua (Compra fuerte)
        labelFontColor: "black",   // Color del texto de las etiquetas
        pointerOptions: {          // Personalización de la aguja
          toplength: -15,          // Longitud de la parte superior (negativo invierte dirección)
          bottomlength: 10,        // Longitud de la base
          bottomwidth: 12,         // Grosor de la base
          color: 'black',          // Color de la aguja
          stroke: '#ffffff',       // Color del borde
          stroke_width: 3,         // Grosor del borde
          stroke_linecap: 'round'  // Forma de la punta
        },
        gaugeWidthScale: 0.6,      // Escala del ancho del medidor (60% del contenedor)
        counter: true,             // Animación de conteo al inicializar
        relativeGaugeSize: true,   // Ajuste responsivo al tamaño del contenedor
        donut: false               // Desactivar efecto "dona" (medidor completo)
      });    
    window.g2 = g2; // para poder verlo desde gráficos y borrarlo.  
                 
    ///////////////////////////TABLA COTIZACIONES Y PRONÓSTICOS//////////////////////////////////
    

    //Inicialización del DATATABLE
    t = $('#tabla').DataTable({
            responsive: {
                details: false,   // Desactivar filas detalladas en modo responsivo
                responsive: true  // Adaptación a dispositivos móviles
            },
            columnDefs: [  // Definiciones especiales para columnas
                { responsivePriority: 1, targets: [0,2,8] }, // Prioridad 1 para columnas 0,2,8 (se mantendrán visibles primero)
                { className: "dt-head-center", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8 ] },  // Centrar contenido en headers
                { className: "dt-body-center", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8 ] }, // Centrar contenido en celdas
                { className: "align-middle", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8 ] }  // Alinear verticalmente al medio (Bootstrap)
            ],                  
            bDestroy: true,          // Destruye instancia anterior si existe
            stateSave: true,         // Guarda estado de la tabla (paginación, orden, etc.)
            order: [[0, 'asc']],     // Orden inicial ascendente
            scrollY: '600px',        // Altura fija con scroll vertical
            scrollCollapse: true,    // Colapsa altura si hay pocos registros
            paging: false,           // Desactiva paginación
            //Para traducir el DataTable
            language: {
                processing:     "Procesando...",
                search:         "Buscar",
                lengthMenu:    "Mostrar _MENU_ &eacute;l&eacute;registros",
                info:           "Mostrando _TOTAL_ registros de un total de _MAX_ registros",
                infoEmpty:      "",
                infoFiltered:   "",
                infoPostFix:    "",
                zeroRecords:    "No se encontraron resultados",
                emptyTable:     "No se encontraron resultados",
                decimal: ',',     // Separador decimal
                thousands: '.'    // Separador de miles
            }                       
    }); 

    t.search('');//Limpio la busqueda de la tabla, porque al recargar la página quedaba la ultima busqueda
    t.draw();
    var compra = 0;
    var compraF = 0;
    var neutral = 0;
    var venta = 0;
    var ventaF = 0;
    var tipo = document.getElementById("tipo").value; 
    scrollPos = $(".dataTables_scrollBody").scrollTop(); //Guardo la posición actual del scroll
            $.ajax({
                url: "RecargarTabla",
                dataType: 'json',
                data: { Tipo: tipo},
                dataSrc: "",
                success: function( result ){
                    var data = result;
                    datos = result; //Asigno los datos a la variable global
                    t.clear();               
                    for (var i=0; i<data.length; i++){
                        var variacion;
                        if(data[i].variacion > 0)
                        {
                            variacion = "<i class='fas fa-sort-up' style='color: #00E8AD'></i> "+" <span style='color: #00E8AD;'>" +data[i].variacion.toLocaleString('de-DE', {minimumFractionDigits: 2})+" %" +"</span>";
                        }else{
                            variacion = "<i class='fas fa-sort-down' style='color: red'></i> "+" <span style='color: red;'>" +data[i].variacion.toLocaleString('de-DE', {minimumFractionDigits: 2})+" %" +"</span>";
                        }
                        var pronostico;
                        if(data[i].Pronostico.pronostico==="Venta"||data[i].Pronostico.pronostico==="Venta Fuerte"){
                            pronostico =  "<span style='color: red;'>" +data[i].Pronostico.pronostico+"</span>";
                            if(data[i].Pronostico.pronostico==="Venta"){
                                venta= venta + 1;
                            }else{
                                ventaF= ventaF + 1;
                            }
                        }else if(data[i].Pronostico.pronostico==="Neutral"){
                            neutral = neutral + 1;
                            pronostico =  "<span style='color: white;'>" +data[i].Pronostico.pronostico+"</span>";
                        }else{ 
                           pronostico =  "<span style='color: #00E8AD;'>" +data[i].Pronostico.pronostico+"</span>"; 
                           if(data[i].Pronostico.pronostico==="Compra"){
                               compra = compra +1;
                           }else{
                               compraF = compraF + 1;
                           }
                        }
             

                         t.row.add([data[i].simbolo, 
                                    data[i].descripcion,
                                    "$ "+data[i].cotizacion.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    variacion,
                                    "$ "+data[i].apertura.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    "$ "+data[i].maximo.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    "$ "+data[i].minimo.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    "$ "+data[i].ultimo_cierre.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                    pronostico]).draw(false);
                    }
                    graficoTorta(ventaF, venta, neutral, compra,compraF);                   
                    $(".dataTables_scrollBody").scrollTop(scrollPos); //asigno la posición anterior del scroll, porque con draw vuelve arriba
                },
                error: function() {
                    const contextPath = window.location.origin + "/PROYECTO_FB";
                    const tipo = document.getElementById("tipo").value;
                    window.location.href = contextPath + "/error.jsp?tipo=" + encodeURIComponent(tipo);
                }
                
            }); 
     // Función que genera un gráfico de torta con la tendecia de todos los activos juntos
     //(compra, venta, compra fuerte, venta fuerte, neutral)
    function graficoTorta(ventaF, venta, neutral, compra,compraF){
        // Retraso para asegurar que el contenedor del gráfico esté listo
        setTimeout(function(){
            // Datos estructurados para Chart.js
            const d = {
              labels: [
                'Venta fuerte',
                'Venta',
                'Neutral',
                'Compra',
                'Compra fuerte' 
              ], // Configuración del dataset
              datasets: [{
                label: 'Pronóstico general',
                data: [ventaF, venta, neutral,compra,compraF],
                backgroundColor: [
                  'rgb(157, 11, 11)',    // Rojo oscuro (Venta fuerte)
                  'rgb(255, 2, 0)',      // Rojo brillante (Venta)
                  'rgb(223, 223, 223)',  // Gris (Neutral)
                  '#00E8AD',             // Verde agua (Compra)
                  '#44D554'              // Verde claro (Compra fuerte)
                ],
                hoverOffset: 10          // Efecto de desplazamiento al pasar el mouse
              }]
            };
            // Configuración general del gráfico
            const config = {
                type: 'pie',  // Tipo de gráfico (torta/pie)
                data: d,      // Datos a visualizar
                options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'PRONOSTICO GENERAL' // Texto del título
                    }
                }            
                }
             }; // Creación del gráfico en el elemento HTML con id 'PieChart'
            pieChart = new Chart(document.getElementById('PieChart'),config);       
         }, 350); // Retraso de 350ms         
    };
   
            
            
        //Cada 15 segundos se actualiza la información de las cotizaciones y pronóstico mediante ajax 
    window.cotizaciones = setInterval(
                        function(){
                            compra = 0;
                            compraF = 0;
                            neutral = 0;
                            venta = 0;
                            ventaF = 0;            
                            var tempScrollTop = $(window).scrollTop(); // Guardo la posición actual del scroll de la página
                            scrollPos = $(".dataTables_scrollBody").scrollTop(); //Guardo la posición actual del scroll del DATATABLE
                            $.ajax({
                                url: "RecargarTabla",  // Servlet que recibe la solicitud
                                dataType: 'json',     // Tipo de dato esperado
                                data: { Tipo: tipo},  // Parámetro enviado al servidor
                                dataSrc: "",
                                success: function( result ){
                                    var data = result;
                                    datos = result; //Asigno los datos a la variable global
                                    t.clear();     // Vaciar datos actuales de la tabla    
                                    // Formatear variación con icono y color
                                    for (var i=0; i<data.length; i++){
                                        var variacion;
                                        if(data[i].variacion > 0)
                                        {
                                            variacion = "<i class='fas fa-sort-up' style='color: #00E8AD'></i> "
                                                    +" <span style='color: #00E8AD;'>" 
                                                    +data[i].variacion.toLocaleString('de-DE', {minimumFractionDigits: 2})+" %" 
                                                    +"</span>";
                                        }else{
                                            variacion = "<i class='fas fa-sort-down' style='color: red'></i> "
                                                    +" <span style='color: red;'>" 
                                                    +data[i].variacion.toLocaleString('de-DE', {minimumFractionDigits: 2})+" %" 
                                                    +"</span>";
                                        }
                                        var pronostico;
                                         // Formatear pronóstico con colores y contabilizar tipos
                                        if(data[i].Pronostico.pronostico==="Venta"||data[i].Pronostico.pronostico==="Venta Fuerte"){
                                            pronostico =  "<span style='color: red;'>" +data[i].Pronostico.pronostico+"</span>";
                                            if(data[i].Pronostico.pronostico==="Venta"){
                                                venta= venta + 1;
                                            }else{
                                                ventaF= ventaF + 1;
                                            }
                                        }else if(data[i].Pronostico.pronostico==="Neutral"){
                                            neutral = neutral + 1;
                                            pronostico =  "<span style='color: white;'>" +data[i].Pronostico.pronostico+"</span>";
                                        }else{ 
                                           pronostico =  "<span style='color: #00E8AD;'>" +data[i].Pronostico.pronostico+"</span>"; 
                                           if(data[i].Pronostico.pronostico==="Compra"){
                                               compra = compra +1;
                                           }else{
                                               compraF = compraF + 1;
                                           }
                                        }
                                        // Añadir fila a la tabla con datos formateados
                                         t.row.add([data[i].simbolo, 
                                                    data[i].descripcion,
                                                    "$ "+data[i].cotizacion.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                                    variacion,
                                                    "$ "+data[i].apertura.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                                    "$ "+data[i].maximo.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                                    "$ "+data[i].minimo.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                                    "$ "+data[i].ultimo_cierre.toLocaleString('de-DE', {minimumFractionDigits: 2}),
                                                    pronostico]).draw(false);
                                    }
                                    pieChart.data.datasets[0].data[0] = ventaF;
                                    pieChart.data.datasets[0].data[1] = venta;
                                    pieChart.data.datasets[0].data[2] = neutral;
                                    pieChart.data.datasets[0].data[3] = compra;
                                    pieChart.data.datasets[0].data[4] = compraF;
                                    pieChart.update(); //Se actualizan los datos del grafico de torta, 
                                    $(".dataTables_scrollBody").scrollTop(scrollPos); //asigno la posición anterior del scroll.
                                    $(window).scrollTop(tempScrollTop); // Asigno la posición anterior del scroll a la página.   
                                },
                                error: function() {
                                    const contextPath = window.location.origin + "/PROYECTO_FB";
                                    const tipo = document.getElementById("tipo").value;
                                    window.location.href = contextPath + "/error.jsp?tipo=" + encodeURIComponent(tipo);
                                }

                            });          
                    },30000);
         
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

    //Se recuperan los datos de la tabla al hacer clic y volver a cargar los indicadores cada 15 segundos 
    var data;
    $('#tabla tbody').on('click', 'tr', function () {
        data = t.row(this).data();   // Obtener datos de la fila clickead
        // Limpia el intervalo si existe
        if (window.intervalIndicadores) {
            clearInterval(window.intervalIndicadores);
            window.intervalIndicadores = null;
        }  
        if (!data || !data[0]) {
            return;
        }else{
            $('#activo_financiero').text(data[0]+": ( "+data[1]+" )"); // Se  Actualiza cabecera con símbolo y descripción 
            indicadores(); // Mostrar indicadores iniciales
            window.intervalIndicadores = setInterval(function(){indicadores();},30000); // Actualizar cada 15 segundos                     
        }        
   
    });

    
    // Función que formatea y muestra indicadores técnicos del activo seleccionado    
    function indicadores(){
        var tempScrollTop = $(window).scrollTop(); // Guardo la posición actual del scroll de la página
        tIndicadores.clear();  
        // Buscar el activo seleccionado en los datos globales
        for (var i=0; i<datos.length; i++){ 
            if(datos[i].simbolo===data[0]){
                var pronMacd;
                var pronRsi;
                var pronRoc;
                var pronEstoc;
                var pronCci;
                var pronDx;
                var proncmm2;
                // Formatear cada indicador con colores condicionales
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
                if(datos[i].Pronostico.pronEstoc==="Compra"){
                    pronEstoc = "<span style='color: #00E8AD;'>"+ datos[i].Pronostico.pronEstoc +"</span>";
                }else if(datos[i].Pronostico.pronEstoc==="Venta"){
                   pronEstoc = "<span style='color: red;'>"+ datos[i].Pronostico.pronEstoc +"</span>";
                }else{
                    pronEstoc = datos[i].Pronostico.pronEstoc;
                }
                if(datos[i].Pronostico.pronCci==="Compra"){
                    pronCci = "<span style='color: #00E8AD;'>"+ datos[i].Pronostico.pronCci +"</span>";
                }else if(datos[i].Pronostico.pronCci==="Venta"){
                   pronCci = "<span style='color: red;'>"+ datos[i].Pronostico.pronCci +"</span>";
                }else{
                    pronCci = datos[i].Pronostico.pronCci;
                }
                if(datos[i].Pronostico.pronDx==="Compra"){
                    pronDx = "<span style='color: #00E8AD;'>"+ datos[i].Pronostico.pronDx +"</span>";
                }else if(datos[i].Pronostico.pronDx==="Venta"){
                   pronDx = "<span style='color: red;'>"+ datos[i].Pronostico.pronDx +"</span>";
                }else{
                    pronDx = datos[i].Pronostico.pronDx;
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
                tIndicadores.row.add(["ESTOCASTICO",datos[i].Pronostico.estocastico, pronEstoc]).draw(false); 
                tIndicadores.row.add(["CCI",datos[i].Pronostico.cci, pronCci]).draw(false); 
                tIndicadores.row.add(["DX",datos[i].Pronostico.dx, pronDx]).draw(false); 
                tIndicadores.row.add(["ATR",datos[i].Pronostico.atr, datos[i].Pronostico.pronAtr]).draw(false); 
                tIndicadores.row.add(["CRUCE MEDIA MOVIL(12,20)",datos[i].Pronostico.cmm20, proncmm2]).draw(false);
                $(window).scrollTop(tempScrollTop); // Asigno la posición anterior del scroll a la página 
                g2.refresh(datos[i].Pronostico.total); // Actualizar medidor JustGage con el valor total del pronóstico
                // Cambiar color del texto del pronóstico general
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

     
});