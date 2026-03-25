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

    <!---------------------------COTIZACIONES----------------------------------------------------------------------->
	    <section>	
                <div class="d-flex justify-content-center">
                    <div class="col-md-12 productos nov" style="max-width: 1700px;">
				<ol class="breadcrumb align-items-center">
			 		<h3>ACCIONES</h3>
		  		</ol>
					
			  <div class="album py-5 al ">
			    <div class="container-fluid cont-novedades ">

			      <div class="row justify-content-center">             
                                    <!---------Merval -->
                                    
                                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 coll ">
                                        <div class="card mb-3 shadow-sm">
                                            <form id='merval' action="Controlador" method="post">
                                                <a href="javascript:;" onclick="document.getElementById('merval').submit();">
                                                    <img src="img/MERVAL.jpg" class="w-100 img-articulo"></a>
                                                <div class="card-body">
                                                    <a href="javascript:;" onclick="document.getElementById('merval').submit();"><h6 class="text-center">MERVAL</h6></a> 
                                                </div>
                                                <input type="hidden" name="accion" value=CotizacionAcciones>
                                                <input type="hidden" name="tipo" value=Merval>
                                            </form>
                                        </div>
                                    </div>
                                    
                                    <!---------Merval25 -->
                                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 coll ">
                                        <div class="card mb-3 shadow-sm">
                                            <form id='merval25' action="Controlador" method="post">
                                                <a href="javascript:;" onclick="document.getElementById('merval25').submit();">
                                                    <img src="img/MERVAL25.jpg" class="w-100 img-articulo"></a>
                                                <div class="card-body">
                                                    <a href="javascript:;" onclick="document.getElementById('merval25').submit();"><h6 class="text-center">MERVAL 25</h6></a> 
                                                </div>
                                                <input type="hidden" name="accion" value=CotizacionAcciones>
                                                <input type="hidden" name="tipo" value=Merval25>
                                            </form>
                                        </div>
                                    </div>                                   

                                    <!---------Mervalargentina -->
                                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 coll ">
                                        <div class="card mb-3 shadow-sm">
                                            <form id='MervalArgentina' action="Controlador" method="post">
                                                <a href="javascript:;" onclick="document.getElementById('MervalArgentina').submit();">
                                                    <img src="img/MERVAL ARGENTINA.jpg" class="w-100 img-articulo"></a>
                                                <div class="card-body">
                                                    <a href="javascript:;" onclick="document.getElementById('MervalArgentina').submit();"><h6 class="text-center">MERVAL ARGENTINA</h6></a> 
                                                </div>
                                                <input type="hidden" name="accion" value=CotizacionAcciones>
                                                <input type="hidden" name="tipo" value=MervalArgentina>
                                            </form>
                                        </div>
                                    </div>                                 
                                </div>
                                <BR>
			      <div class="row justify-content-center">             
                                    <!---------Panel general -->
                                    
                                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 coll ">
                                        <div class="card mb-3 shadow-sm">
                                            <form id='panelgeneral' action="Controlador" method="post">
                                                <a href="javascript:;" onclick="document.getElementById('panelgeneral').submit();">
                                                    <img src="img/PANEL GENERAL.jpg" class="w-100 img-articulo"></a>
                                                <div class="card-body">
                                                    <a href="javascript:;" onclick="document.getElementById('panelgeneral').submit();"><h6 class="text-center">PANEL GENERAL</h6></a> 
                                                </div>
                                                <input type="hidden" name="accion" value=CotizacionAcciones>
                                                <input type="hidden" name="tipo" value=PanelGeneral>
                                            </form>
                                        </div>
                                    </div>
                                    
                                    <!---------Burcap -->
                                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 coll ">
                                        <div class="card mb-3 shadow-sm">
                                            <form id='Burcap' action="Controlador" method="post">
                                                <a href="javascript:;" onclick="document.getElementById('Burcap').submit();">
                                                    <img src="img/BURCAP.jpg" class="w-100 img-articulo"></a>
                                                <div class="card-body">
                                                    <a href="javascript:;" onclick="document.getElementById('Burcap').submit();"><h6 class="text-center">BURCAP</h6></a> 
                                                </div>
                                                <input type="hidden" name="accion" value=CotizacionAcciones>
                                                <input type="hidden" name="tipo" value=Burcap>
                                            </form>
                                        </div>
                                    </div>                                   

                                    <!---------Cedears -->
                                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 coll ">
                                        <div class="card mb-3 shadow-sm">
                                            <form id='Cedears' action="Controlador" method="post">
                                                <a href="javascript:;" onclick="document.getElementById('Cedears').submit();">
                                                    <img src="img/CEDEARS.jpg" class="w-100 img-articulo"></a>
                                                <div class="card-body">
                                                    <a href="javascript:;" onclick="document.getElementById('Cedears').submit();"><h6 class="text-center">CEDEARS</h6></a> 
                                                </div>
                                                <input type="hidden" name="accion" value=CotizacionAcciones>
                                                <input type="hidden" name="tipo" value=Cedears>
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