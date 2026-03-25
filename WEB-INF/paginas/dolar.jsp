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
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.13.1/datatables.min.css"/> 
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
            String tipo = "Dolar";

       
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
            <h3 style="font-size:  2.5vh;">COTIZACIONES</h3>
	</ol>         
        <div class="row justify-content-md-center">
            <div class="col col-lg-6">
                <div class="table-responsive">
                        <table id="tabla" class="table  table-dark table-hover display" style="cursor:pointer" cellspacing="0" style="width: 100%">
                            <thead class="table table-warning">
                                <tr>
                                    <th class="">Simbolo</th>
                                    <th class="">Compra</th>
                                    <th class="">Venta</th>
                                </tr>
                            </thead>
           
                        </table>                                                  
                    </div>
            </div>        
        </div>       
        <div class="container mt-5 d-flex justify-content-center">
            <div class="alert alert-danger w-75 text-center" role="alert" id="mensaje-error-graficos" style="display:none;">
                <h4 class="alert-heading">Lo sentimos</h4>
                <p id="texto-error-grafico">
                    No pudimos mostrar los gráficos históricos de: <strong>Dolar</strong>
                </p>
                <hr>
                <p class="mb-0">Por favor, intente nuevamente.</p>
            </div>
        </div>                
                                         
        <ol class="breadcrumb align-items-center" style="margin-bottom: 0px;">
            <h3  id="titulo_graficos" style="font-size:  2.5vh;">GRÁFICOS (Seleccione uno de la tabla)</h3>
        </ol>      
        <div class="row d-flex justify-content-center"style="margin-bottom: 30px;">
            <div class="btn-group" role="group" aria-label="Basic example">
                <input type="button" id="30" value="30 Días" disabled onclick="treintaDiasd();"class="btn btn-secondary ">
                <input type="button" id="80" value="80 Días" disabled onclick="ochentaDiasd();"class="btn btn-secondary">
                <input type="button" id="180" value="180 Días" disabled onclick="cientoOchentaDiasd();"class="btn btn-secondary">
                <input type="button" id="365" value="1 Año" disabled onclick="unod();"class="btn btn-secondary">
            </div> 
        </div> 
            <div class="row justify-content-md-center">
                <div class="col col-lg-6" style="margin-bottom: 50px;">                      
                    <div class="chartBox"  >
                      <canvas id="myLineChart"></canvas>
                    </div>   
                </div>
                <div class="col col-lg-6" style="margin-bottom: 50px;">                      
                    <div class="chartBox"  >
                      <canvas id="myLineChart2"></canvas>
                    </div>   
                </div>                  
            </div>
      
    </div>
                        
    <!---------------------FOOTER---------------------------------------------------------------------------------->

            
        <%@include file="/WEB-INF/include/footer.jsp" %>
    
    
    <!---------------------FIN FOOTER------------------------------------------------------------------------------>
    <%@include file="/WEB-INF/include/scripts.jsp" %>



    <!--------------------scripts gráfico indicador de fuerza de compra-------------------------------------------->
    <script src="js/raphael-min.js"></script>
    <script src="js/justgage.min.js"></script> 
    <!--------------------scripts carga datos-------------------------------------------->
    <script type="text/javascript" src="js/dt-dolar.js"></script>
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