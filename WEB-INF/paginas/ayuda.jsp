
<!DOCTYPE html>
<html class="h-100">
<head>
        <%@include file="/WEB-INF/include/head.jsp" %>
        


</head>

<body class="d-flex flex-column h-100">
    <!---------------------------HEADER------------------------------------------------------------------------->
	<% String home = "active"; %>
      
       
       <%@include file="/WEB-INF/include/header.jsp" %>
       
        <%
            HttpSession sesion = request.getSession();
            String tipo = (String)sesion.getAttribute("tipo");

         %>  
    <!---------------------------FIN HEADER--------------------------------------------------------------------->
    <!------------------------CARTEL AYUDA------------------------------->
  		
    <div class="thumbnail container cartel d-flex justify-content-center">		
        <div class="input-group mb-2 mr-sm-2 justify-content-center">
            <h1 class="h1"  >Manual</h1>
        </div>	
    </div>
  
	
    <!------------------------FIN CARTEL------------------------------------------------------>  
     <div class="container-fluid">
	<ol class="breadcrumb align-items-center">
            <h3 style="font-size:  2.5vh;">INTRODUCCIÓN</h3>
	</ol>

        <div class="accordion" id="accordion1">
          <div class="card">
              <div class="card-header" >
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-middle" type="button" data-toggle="collapse" data-target="#PA" aria-expanded="false" aria-controls="PA">   
                  PROPÓSITO DE LA APLICACIÓN
                </button>
              </h2>
            </div>

            <div id="PA" class="collapse" aria-labelledby="headingOne" data-parent="#accordion1">
              <div class="card-body">
                  Con esta aplicación pretendemos brindarle al inversor información de calidad y herramientas que le permitan tomar una mejor decisión sobre la inversión a realizar.  
                  <p>Brindamos cotizaciones en tiempo real para que pueda seguir minuto a minuto los cambios en los valores de los activos financieros. </p> 
                  <p>Además, ofrecemos el cálculo de un conjunto de indicadores técnicos que permiten determinar cuál podría ser el movimiento futuro de los activos financieros. </p>
                  <p>También se muestran gráficos históricos para que pueda observar cómo fue evolucionando cada activo financiero con el tiempo, pudiendo elegir periodos de distintas amplitudes.    </p>
              </div>
            </div>
          </div>

            
          <div class="card">
              <div class="card-header" >
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-middle" type="button" data-toggle="collapse" data-target="#PG" aria-expanded="false" aria-controls="PG">   
                  PRONÓSTICO GENERAL
                </button>
              </h2>
            </div>

            <div id="PG" class="collapse " aria-labelledby="headingOne" data-parent="#accordion1">
              <div class="card-body">
                  <div class="row justify-content-md-center">
                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                        <div class="card-body">
                            <img src="img/ayuda/ProGeneral_2.jpg" class="w-100 ">
                        </div>				
                    </div>
                  </div>
                      
                  Al calcular el pronóstico por tipo de activo financiero o índice, nos permite observar si existe una tendencia general que está siguiendo el mercado, más allá de la individual de cada activo.      
              </div>
            </div>
          </div>            

            
          <div class="card">
              <div class="card-header" >
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-middle" type="button" data-toggle="collapse" data-target="#COT" aria-expanded="false" aria-controls="COT">   
                  COTIZACIONES
                </button>
              </h2>
            </div>

            <div id="COT" class="collapse " aria-labelledby="headingOne" data-parent="#accordion1">
              <div class="card-body">
                  <div class="row justify-content-md-center">
                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                        <div class="card-body">
                            <img src="img/ayuda/TCotizaciones.jpg" class="w-100 ">
                        </div>				
                    </div>
                  </div>
                      
                  Al calcular el pronóstico por tipo de activo financiero o índice, nos permite observar si existe una tendencia general que está siguiendo el mercado, más allá de la individual de cada activo.      
              </div>
            </div>
          </div>            

            
          <div class="card">
              <div class="card-header" >
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-middle" type="button" data-toggle="collapse" data-target="#IP" aria-expanded="false" aria-controls="IP">   
                  INDICADORES Y PRONÓSTICOS POR ACTIVO FINANCIERO
                </button>
              </h2>
            </div>

            <div id="IP" class="collapse " aria-labelledby="headingOne" data-parent="#accordion1" >
              <div class="card-body">
                  <div class="row justify-content-md-center">
                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                        <div class="card-body">
                            <img src="img/ayuda/indicadores.jpg" class="w-100 ">
                        </div>				
                    </div>
                  </div> 
              </div>
            </div>
          </div>    

            
          <div class="card">
              <div class="card-header" >
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-middle" type="button" data-toggle="collapse" data-target="#GH" aria-expanded="false" aria-controls="GH">   
                  GRÁFICOS HISTÓRICOS
                </button>
              </h2>
            </div>

            <div id="GH" class="collapse " aria-labelledby="headingOne" data-parent="#accordion1">
              <div class="card-body">
                  <div class="row justify-content-md-center">
                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                        <div class="card-body">
                            <img src="img/ayuda/historicos.jpg" class="w-100 ">
                        </div>				
                    </div>
                  </div> 
              </div>
            </div>
          </div>                

            
        </div>      

         
     </div>
     <div class="container-fluid">
	<ol class="breadcrumb align-items-center">
            <h3 style="font-size:  2.5vh;">INDICADORES</h3>
	</ol>         

        <div class="accordion" id="accordion">
          <div class="card">
              <div class="card-header" >
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-middle" type="button" data-toggle="collapse" data-target="#macd" aria-expanded="false" aria-controls="macd">   
                  MACD
                </button>
              </h2>
            </div>

            <div id="macd" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                  Es un indicador utilizado en bolsa que permite observar cambios en el impulso del precio de un activo financiero. El impulso es la velocidad a la que se producen los cambios de precio en una acción o cualquier otro instrumento negociable. Es un indicador técnico que mide la fortaleza del movimiento del precio y ayuda a los inversores a determinar la fuerza de la tendencia.
                  <p>Un valor de MACD positivo se interpreta como una <b>señal de compra (tendencia alcista).</b></p> 
                  <p> Un valor negativo como una <b>señal de venta (tendencia bajista).</b></p>
              </div>
            </div>
          </div>

            
          <div class="card">
              <div class="card-header" >
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-middle" type="button" data-toggle="collapse" data-target="#RSI" aria-expanded="false" aria-controls="RSI">   
                  RSI
                </button>
              </h2>
            </div>

            <div id="RSI" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                  El RSI es un indicador de tipo oscilador que refleja la fuerza relativa de los movimientos alcistas, en comparación con los movimientos bajistas, de los diferentes títulos que cotizan en los mercados bursátiles.
                  El RSI oscila entre 0 y 100. 
                  <p>Se considera como zona de <b>sobreventa</b> la comprendida entre 30 y 0. </p>
                  <p> Y como zona de <b>sobrecompra</b> la comprendida entre 70 y 100. </p>
              </div>
            </div>
          </div>            

            
          <div class="card">
              <div class="card-header" >
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-middle" type="button" data-toggle="collapse" data-target="#ROC" aria-expanded="false" aria-controls="ROC">   
                  ROC
                </button>
              </h2>
            </div>

            <div id="ROC" class="collapse " aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                Este indicador fue diseñado para medir la tasa a la que el precio cambia de un período a otro. La medida del precio actual en relación con un período retrospectivo es la definición típica de la Tasa de cambio.
                <p>Una lectura por encima de cero implicará un <b>sentimiento alcista en el mercado.</b></p>
                <p>Una lectura por debajo de cero implicará un <b>sentimiento bajista en el mercado.</b></p>
                <p>Cercano a cero, <b>mercado lateralizado</b></p>
              </div>
            </div>
          </div>            

            
          <div class="card">
              <div class="card-header" >
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-middle" type="button" data-toggle="collapse" data-target="#ESTOCASTICO" aria-expanded="false" aria-controls="ESTOCASTICO">   
                  ESTOCÁSTICO
                </button>
              </h2>
            </div>

            <div id="ESTOCASTICO" class="collapse " aria-labelledby="headingOne" data-parent="#accordion" >
              <div class="card-body">
                El indicador estocástico determina cuándo puede ocurrir en el mercado un movimiento alcista o bajista, por medio del cruce de dos líneas indicadoras. Por esto, sirve para determinar niveles de sobrecompra y de sobreventa.
                Es un indicador que mide la posición relativa del precio de cierre de un día, respecto de los precios de cierre de los días anteriores, dentro de un intervalo considerado.
                <p><b>Sobrecompra:</b> si la línea estocástica pasa por encima de la marca de 80%.</p>
                <p><b>Sobreventa:</b> cuando la línea estocástica pasa por debajo de la marca de 20%.</p>

              </div>
            </div>
          </div>    

            
          <div class="card">
              <div class="card-header" >
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-middle" type="button" data-toggle="collapse" data-target="#CCI" aria-expanded="false" aria-controls="CCI">   
                  CCI
                </button>
              </h2>
            </div>

            <div id="CCI" class="collapse " aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                Es un indicador versátil que puede ser empleado para identificar una nueva tendencia en el mercado o advertir acerca de condiciones extremas. El valor de este indicador oscila a ambos lados de la línea "cero".
                <p>Un valor superior a 100 indica que el activo financiero esta <b>Sobrecomprado</b></p>
                <p>Un valor inferior a -100 indica que el activo financiero esta <b>sobrevendido</b></p>
              </div>
            </div>
          </div>                

            
          <div class="card">
              <div class="card-header" >
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-middle" type="button" data-toggle="collapse" data-target="#ADX" aria-expanded="false" aria-controls="ADX">   
                  ADX
                </button>
              </h2>
            </div>

            <div id="ADX" class="collapse " aria-labelledby="headingOne" data-parent="#accordion" >
              <div class="card-body">
                El ADX es un indicador técnico que se encuadra dentro de los denominados osciladores. Al ser un oscilador su valor se mueve dentro de un rango definido, entre 0 y 100.
                Se utiliza para determinar si un mercado está en una situación lateral, oscilando en un rango determinado o, por el contrario, si ese mercado está comenzando una nueva tendencia.
                <p>Un valor inferior a 25 nos indica una <b>ausencia de tendencia en en el activo financiero.</b></p>
                <p>Un valor mayor a 25 nos indica una <b>tendencia alcista o basjita.</b> Que es determinada en el calculo del indicador. (VALORES MAS CERCANOS A 100 INDICAN UNA TENDENCIA MAS FUERTE)</p>              
              </div>
            </div>
          </div>  
            
            
          <div class="card">
              <div class="card-header" >
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-middle" type="button" data-toggle="collapse" data-target="#ATR" aria-expanded="false" aria-controls="ATR">   
                  ATR
                </button>
              </h2>
            </div>

            <div id="ATR" class="collapse " aria-labelledby="headingOne" data-parent="#accordion" >
              <div class="card-body">
                El indicador ATR sirve para medir la volatilidad de los precios y así estimar su movimiento. 
                <p>Un valor inferior a 10 nos indica que el activo financiero tiene <b>poca volatilidad.</b></p>
                <p>Un valor mayor a 10 nos indica que el activo financiero presenta <b> mayor volatilidad.</b> (VALORES MÁS GRANDES INDICAN UNA MAYOR VOLATILIDAD)</p>                 
              </div>
            </div>
          </div>  

          <div class="card">
              <div class="card-header" >
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-middle" type="button" data-toggle="collapse" data-target="#CMM20" aria-expanded="false" aria-controls="CMM20">   
                  CRUCE DE MEDIA MÓVIL
                </button>
              </h2>
            </div>

            <div id="CMM20" class="collapse " aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                La función de una media móvil es suavizar las fluctuaciones de los precios. Esto nos ayuda a mirar más allá de las fluctuaciones transitorias o insignificantes en el precio, y en cambio, ver la tendencia a largo plazo del mercado.
                Las medias móviles se utilizan en estrategias tendenciales para reconocer señales de compra y venta.
                <p>Si el precio se encuentra por encima de la media móvil simple, quiere decir que sigue una tendencia <b>alcista, indicando compra.</b></p>
                <p>Si el precio se mantiene por debajo, sucede lo contrario: la tendencia será <b>bajista, indicando venta </b> (VALORES MÁS GRANDES INDICAN UNA MAYOR VOLATILIDAD)</p>                      

              </div>
            </div>
          </div>  
            
        </div>
             
         
         
      
    </div>    
    
    
    
                        

    
    
    
    
    <!---------------------FOOTER---------------------------------------------------------------------------------->

            
        <%@include file="/WEB-INF/include/footer.jsp" %>
    
    
    <!---------------------FIN FOOTER------------------------------------------------------------------------------>
    <%@include file="/WEB-INF/include/scripts.jsp" %>





</body>
</html>