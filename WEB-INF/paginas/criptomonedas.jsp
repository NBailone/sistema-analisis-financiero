<%@page import="Controladores.Criptomonedas"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="modelo.Criptomoneda"%>
<%@page import="java.text.DecimalFormat"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>   
<!DOCTYPE html>
<html class="h-100">
<head>
        <%@include file="/WEB-INF/include/head.jsp" %>
       <!--Datatable ccs agrego el cdn porque no me funciona con los archivos-->
        <link rel="stylesheet" type="text/css" href="css/datatables.min.css"/> 
        <link rel="stylesheet" type="text/css" href="datatables/responsive.bootstrap.min.css"/>  
        


</head>

<body class="d-flex flex-column h-100">
    <!---------------------------HEADER------------------------------------------------------------------------->
	<% String home = "active"; %>
      
       
       <%@include file="/WEB-INF/include/header.jsp" %>
       <%@include file="/WEB-INF/include/ventanas/actualizando.jsp" %>
       
        <%
            DecimalFormat formateador = new DecimalFormat("#,##0.00");
            List<Criptomoneda> criptos = new ArrayList();
            HttpSession sesion = request.getSession();
            String tipo = (String)sesion.getAttribute("tipo");

       
         %>  
    <!---------------------------FIN HEADER--------------------------------------------------------------------->
    
    <!------------------------CARTEL TIPO DE ACTIVO FININCIERO------------------------------->
  		
    <div class="thumbnail container cartel d-flex justify-content-center">		
        <div class="input-group mb-2 mr-sm-2 justify-content-center">
            <h1 class="h1" ><%=tipo%></h1>
        </div>	
    </div>
	
    <!------------------------FIN CARTEL------------------------------------------------------>    
    <input id="tipo" name="tipo" value="<%=tipo%>" type="hidden">
    <!--Tabla-->
     <div class="container-fluid">
	<ol class="breadcrumb align-items-center">
            <h3 style="font-size:  2.5vh;">COTIZACIONES - PRONÓSTICOS</h3>
	</ol> 
         <div class="row justify-content-md-center">
            <div class="col col-lg-6" style="margin-bottom: 50px;">                      
                <div class="chartBox pie" >
                    <canvas id="PieChart" class="can" ></canvas>
                </div>   
            </div>             
         </div>          
        <div class="row align-items-center">
            <div class="col col-lg-8">
                <div class="table-responsive">
                        <table id="tabla" class="table  table-dark table-hover display" style="cursor:pointer" cellspacing="0" style="width: 100%">
                            <thead class="table table-warning">
                                <tr>
                                    <th class="">Simbolo</th>
                                    <th class="">Descripción</th>
                                    <th class="">CotizaciónArg</th>
                                    <th class="">CotizaciónUsd</th>
                                    <th class="">CotizaciónEur</th>
                                    <th class="">Pronóstico</th>
                                </tr>
                            </thead>
           
                        </table>                                                  
                    </div>
            </div>
              <div class="col col-lg-4">
                <div class="wrapper">
                    <div class="flexbox">
                      <div class="box">
                        <div id="g2" class="gauge"></div>
                      </div>
                    </div>
                </div>                    
                <div class="table-responsive">
                        <table id="tablaind" class="table  table-dark  display table-bordered"  cellspacing="0" style="width: 100%">
                            <thead class="table table-warning">
                                <tr>
                                    <th class="text-center h5" id="activo_financiero" colspan="3"></th>
                                </tr>
                                <tr>
                                    <th class="">Indicador</th>
                                    <th class="">Valor</th>
                                    <th class="">Pronóstico</th>
                                </tr>
                            </thead>
                            <tbody id="resultado">
                                <tr>
                                    <td class="" >MACD(12,26)</td>
                                    <td class="">-</td>
                                    <td class="">-</td>
                                </tr>
                                <tr>
                                    <td class="">RSI(14)</td>
                                    <td class="">-</td>
                                    <td class="">-</td>
                                </tr>
                                <tr>
                                    <td class="">ROC</td>
                                    <td class="">-</td>
                                    <td class="">-</td>
                                </tr> 
                                <tr>
                                    <td class="">CRUCE MEDIA MOVIL(20)</td>
                                    <td class="">-</td>
                                    <td class="">-</td>
                                </tr>                                
                            </tbody>  
                            <tfoot class="table table-warning">
                                <tr>
                                    <th class="text-center h5"  colspan="1">Resumen: </th>
                                    <th class="text-center h4" id="pronostico" colspan="2"></th>
                                </tr>
                            </tfoot>                            
                        </table>                                                  
                </div>                 
            </div>          
        </div>       
        <div class="container mt-5 d-flex justify-content-center">
            <div class="alert alert-danger w-75 text-center" role="alert" id="mensaje-error-graficos" style="display:none;">
                <h4 class="alert-heading">Lo sentimos</h4>
                <p id="texto-error-grafico">
                    No pudimos mostrar los gráficos históricos de: <strong>Criptomoneda</strong>
                </p>
                <hr>
                <p class="mb-0">Por favor, intente nuevamente.</p>
            </div>
        </div>                
                                         
        <ol class="breadcrumb align-items-center" style="margin-bottom: 0px;">
            <h3  id="titulo_graficos" style="font-size:  2.5vh;">GRÁFICOS (Seleccione uno de la tabla)</h3>
        </ol>
        <div class="row d-flex justify-content-center"style="margin-bottom: 1px;">
            <div class="btn-group" role="group" aria-label="Basic example">
                <input type="button" id="peso" value="Peso" disabled onclick="peso();"class="btn btn-secondary ">
                <input type="button" id="usd" value="Dolar" disabled onclick="dolar();"class="btn btn-secondary">
                <input type="button" id="euro" value="Euro" disabled onclick="euro();"class="btn btn-secondary">
                <input type="hidden" id="moneda">
            </div> 
        </div>       
        <div class="row d-flex justify-content-center"style="margin-bottom: 30px;">
            <div class="btn-group" role="group" aria-label="Basic example">
                <input type="button" id="30" value="30 Días" disabled onclick="treintaDiascrip();"class="btn btn-secondary ">
                <input type="button" id="80" value="80 Días" disabled onclick="ochentaDiascrip();"class="btn btn-secondary">
                <input type="button" id="180" value="180 Días" disabled onclick="cientoOchentaDiascrip();"class="btn btn-secondary">
                <input type="button" id="365" value="1 Año" disabled onclick="unocrip();"class="btn btn-secondary">
            </div> 
        </div> 
            <div class="row justify-content-md-center">
                <div class="col col-lg-8" style="margin-bottom: 50px;">                      
                    <div class="chartBox"  >
                      <canvas id="myLineChart"></canvas>
                    </div>   
                </div>             
            </div>
      
    </div>
<style>
    #tabla td.dataTables_empty {
        text-align: center !important;
        vertical-align: middle !important;
    }
</style>                   
    <!---------------------FOOTER---------------------------------------------------------------------------------->

            
        <%@include file="/WEB-INF/include/footer.jsp" %>
    
    
    <!---------------------FIN FOOTER------------------------------------------------------------------------------>
    <%@include file="/WEB-INF/include/scripts.jsp" %>

 
    <!--------------------scripts gráfico indicador de fuerza de compra-------------------------------------------->
    <script src="js/raphael-min.js"></script>
    <script src="js/justgage.min.js"></script> 
    <!--------------------scripts carga datos-------------------------------------------->
    <script type="text/javascript" src="js/dt-criptos.js"></script>
    <!--------------------scripts Datatable---------------------------------------------->
    <script type="text/javascript" src="datatables/dataTables.responsive.min.js"></script>
    
 
    <!--------------------scripts Gráficos de velas y lineas----------------------------->
    <script src="js/chart.js@^3.js"></script>
    <script src="js/luxon@^2.js"></script>
    <script src="js/chartjs-adapter-luxon@^1.js"></script>

    <script  type="text/javascript" src="js/chartjs-chart-financial.min.js"></script>
    <script  type="text/javascript" src="js/chartjs-chart-financial.js"></script>






</body>
</html>