<!DOCTYPE html>
<html class="h-100">
<head>
        <%@include file="/WEB-INF/include/head.jsp" %>
</head>

<body class="d-flex flex-column h-100">
    <!---------------------------HEADER------------------------------------------------------------------------->
	<% String home = "active"; %>
        
       <%@include file="/WEB-INF/include/header.jsp" %>

    <!---------------------------FIN HEADER--------------------------------------------------------------------->

    <!---------------------------MENSAJE ERROR--------------------------------------------------------------------->
        <%
            String tipo = (String) request.getAttribute("tipo");
            if (tipo == null || tipo.isEmpty()) {
                tipo = request.getParameter("tipo");
            }
            if (tipo != null) {
                tipo = tipo.replace("Merval25", "Merval 25 ")
                           .replace("MervalArgentina", "Merval Argentina")
                           .replace("PanelGeneral", "Panel General ");
                tipo = tipo.trim();
    }
        %>

        <div class="container mt-5">
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Lo sentimos</h4>
                <% if (tipo == null || tipo.isEmpty()) { %>
                    <p>No pudimos mostrar las cotizaciones.</p>
                <% } else { %>
                    <p>No pudimos mostrar las cotizaciones del Panel: <strong><%= tipo %></strong></p>
                <% } %>
                <hr>
                <p class="mb-0">Por favor, intente nuevamente. Abajo tiene los paneles disponibles.</p>
            </div>
        </div>
  <!---------------------------FIN MENSAJE ERROR--------------------------------------------------------------------->
    <!---------------------------COTIZACIONES----------------------------------------------------------------------->
	    <section>	
                <div class="d-flex justify-content-center">
                    <div class="col-md-12 productos nov" style="max-width: 1700px;">
				<ol class="breadcrumb align-items-center">
			 		<h3>COTIZACIONES</h3>
		  		</ol>
					
			  <div class="album py-5 al ">
			    <div class="container-fluid cont-novedades">

			      <div class="row">             
                                    <!---------Producto -->
                                    
                                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 coll ">
                                        <div class="card mb-3 shadow-sm">
                                            <form id='acciones' action="Controlador" method="post">
                                                <a href="javascript:;" onclick="document.getElementById('acciones').submit();">
                                                    <img src="img/acciones.jpg" class="w-100 img-articulo"></a>
                                                <div class="card-body">
                                                    <a href="javascript:;" onclick="document.getElementById('acciones').submit();"><h6 class="text-center">ACCIONES</h6></a> 
                                                </div>
                                                <input type="hidden" name="accion" value=CotizacionAcciones>
                                            </form>
                                        </div>
                                    </div>
                                    
                                    <!---------Producto -->
                                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 coll ">
                                        <div class="card mb-3 shadow-sm">
                                            <form id='bonos' action="Controlador" method="post">
                                                <a href="javascript:;" onclick="document.getElementById('bonos').submit();">
                                                    <img src="img/bonos.jpg" class="w-100 img-articulo"></a>
                                                <div class="card-body">
                                                    <a href="javascript:;" onclick="document.getElementById('bonos').submit();"><h6 class="text-center">BONOS</h6></a> 
                                                </div>
                                                <input type="hidden" name="accion" value=CotizacionBonos>
                                            </form>
                                        </div>
                                    </div>                                   

                                    <!---------Producto -->
                                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 coll ">
                                        <div class="card mb-3 shadow-sm">
                                            <form id='criptos' action="Controlador" method="post">
                                                <a href="javascript:;" onclick="document.getElementById('criptos').submit();">
                                                    <img src="img/criptos.jpg" class="w-100 img-articulo"></a>
                                                <div class="card-body">
                                                    <a href="javascript:;" onclick="document.getElementById('criptos').submit();"><h6 class="text-center">CRIPTOMONEDAS</h6></a> 
                                                </div>
                                                <input type="hidden" name="accion" value=CotizacionCriptomonedas>
                                            </form>
                                        </div>
                                    </div>
                                    <!---------Producto -->
                                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 coll ">
                                        <div class="card mb-3 shadow-sm">
                                            <form id='opciones' action="Controlador" method="post">
                                                <a href="javascript:;" onclick="document.getElementById('dolar').submit();">
                                                    <img src="img/dolar.jpg" class="w-100 img-articulo"></a>
                                                <div class="card-body">
                                                    <a href="javascript:;" onclick="document.getElementById('dolar').submit();"><h6 class="text-center">DOLAR</h6></a> 
                                                </div>
                                                <input type="hidden" name="accion" value=CotizacionDolar>
                                            </form>
                                        </div>
                                    </div>                                   
                                </div>
			    </div>
			  </div>
			</div>
                     </div>           
		</section>
    
	
    <!---------------------------FIN COTIZACIONES-------------------------------------------------------------------->

    

    <!---------------------FOOTER---------------------------------------------------------------------------------->

            
        <%@include file="/WEB-INF/include/footer.jsp" %>
    
    
    <!---------------------FIN FOOTER------------------------------------------------------------------------------>

        <%@include file="/WEB-INF/include/scripts.jsp" %>
        

</body>
</html>