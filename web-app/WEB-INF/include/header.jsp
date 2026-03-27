            <%  
                //Para reconocer en que menu estoy
                int sep = request.getServletPath().lastIndexOf("/");
                int dot = request.getServletPath().lastIndexOf(".");
                String activo=(request.getServletPath().substring(sep +1,dot));
                
                
            %> 
<header>
    <nav class="nav sticky-top navbar navbar-expand-lg my-nav">
				
	<a href="index.jsp" class="navbar-brand"><i class="fab fa-battle-net"></i>PROYECTO FB</a>
	<!--Botón que aparece cuando la pagina se ve en dispositivos pequeños--> 	
	<button class="navbar-toggler navbar-toggler-right custom-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
  	</button>
        <!--fin-->
				
					
	<div class="login navbar-collapse collapse justify-content-center" id="navegacion">
            <ul class="navbar-nav">
		<li class="nav-item ">
                    <a href="index.jsp" class=" nav-link <%if(activo.equals("index")){%> active<%}%>"><i class="fa-solid fa-house-user"></i>  HOME</a>
                </li>
            </ul> 

           
            <ul class="navbar-nav">
		<li class="nav-item dropdown">
                    <a class="nav-link  dropdown-toggle <%if(activo.equals("acciones")){%> active<%}%> " href="#" id="dropdown-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa-solid fa-chart-bar"></i> ACCIONES</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown-2">
                        <form id='acciones' action="Controlador" method="post">
                            <a class="dropdown-item" href="javascript:;" onclick="document.getElementById('acciones').submit();">TODAS</a>
                            <input type="hidden" name="accion" value=MenuAcciones>
                        </form>
			<div class="dropdown-divider"></div>
                        <form id='merval' action="Controlador" method="post">
                            <a class="dropdown-item" href="javascript:;" onclick="document.getElementById('merval').submit();">MERVAL</a>
                            <input type="hidden" name="accion" value=CotizacionAcciones>
                            <input type="hidden" name="tipo" value=Merval>
                        </form>
                        <form id='merval25' action="Controlador" method="post">
                            <a class="dropdown-item" href="javascript:;" onclick="document.getElementById('merval25').submit();">MERVAL 25</a>
                            <input type="hidden" name="accion" value=CotizacionAcciones>
                            <input type="hidden" name="tipo" value=Merval25>
                        </form>
                        <form id='mervalArgentina' action="Controlador" method="post">
                            <a class="dropdown-item" href="javascript:;" onclick="document.getElementById('mervalArgentina').submit();">MERVAL ARGENTINA</a>
                            <input type="hidden" name="accion" value=CotizacionAcciones>
                            <input type="hidden" name="tipo" value=MervalArgentina>
                        </form>                        
                        <form id='panelgeneral' action="Controlador" method="post">
                            <a class="dropdown-item" href="javascript:;" onclick="document.getElementById('panelgeneral').submit();">PANEL GENERAL</a>
                            <input type="hidden" name="accion" value=CotizacionAcciones>
                            <input type="hidden" name="tipo" value=PanelGeneral>
                        </form>    
                        <form id='burcap' action="Controlador" method="post">
                            <a class="dropdown-item" href="javascript:;" onclick="document.getElementById('burcap').submit();">BURCAP</a>
                            <input type="hidden" name="accion" value=CotizacionAcciones>
                            <input type="hidden" name="tipo" value=Burcap>
                        </form>
                         
                        <div class="dropdown-divider"></div>
                        <form id='cedears' action="Controlador" method="post">  
                            <a class="dropdown-item" href="javascript:;" onclick="document.getElementById('cedears').submit();">CEDEARS</a>
                            <input type="hidden" name="accion" value=CotizacionAcciones>
                            <input type="hidden" name="tipo" value=Cedears>
                        </form>    
                    </div>
     		</li>
            </ul>

            <ul class="navbar-nav">
                <form id='bonos' action="Controlador" method="post">
                    <li class="nav-item ">
                       <a href="javascript:;" onclick="document.getElementById('bonos').submit();" class="nav-link <%if(activo.equals("bonos")){%> active<%}%>"><i class="fa-solid fa-chart-line"></i> BONOS</a>
                    </li>
                    <input type="hidden" name="accion" value=CotizacionBonos>
                    <input type="hidden" name="tipo" value=Bonos>
                </form>
            </ul>
                    
            <ul class="navbar-nav">
                <form id='criptos' action="Controlador" method="post">
                    <li class="nav-item ">
                       <a href="javascript:;" onclick="document.getElementById('criptos').submit();" class="nav-link <%if(activo.equals("criptomonedas")){%> active<%}%>"><i class="fab fa-bitcoin"></i> CRIPTOMONEDAS</a>
                    </li>
                    <input type="hidden" name="accion" value=CotizacionCriptomonedas>
                    <input type="hidden" name="tipo" value=Criptomonedas>
                </form>    
            </ul> 
                    
                       
            <ul class="navbar-nav">
                <form id='dolar' action="Controlador" method="post">   
                    <li class="nav-item ">
                       <a href="javascript:;" onclick="document.getElementById('dolar').submit();" class="nav-link <%if(activo.equals("dolar")){%> active<%}%>"><i class="fa-solid fa-dollar-sign"></i> DOLAR</a>
                    </li>
                    <input type="hidden" name="accion" value=CotizacionDolar>
                    <input type="hidden" name="tipo" value=Dolar>
                </form>    
            </ul>                 

            <ul class="navbar-nav">
                <form id='ayuda' action="Controlador" method="post">   
                    <li class="nav-item ">
                       <a href="javascript:;" onclick="document.getElementById('ayuda').submit();" class="nav-link <%if(activo.equals("ayuda")){%> active<%}%>"><i class="fa-solid fa-circle-info"></i> AYUDA</a>
                    </li>
                    <input type="hidden" name="accion" value=Ayuda>
                </form>    
            </ul>                         

	</div>
    </nav>
</header>


