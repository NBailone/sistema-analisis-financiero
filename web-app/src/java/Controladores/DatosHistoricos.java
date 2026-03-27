
package Controladores;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modelo.*;
import modelo_Dao.*;

public class DatosHistoricos extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8"); 
        try (PrintWriter out = response.getWriter()) {
            
            String tipo = request.getParameter("Tipo");
            String simbolo = request.getParameter("Simbolo");
            ////////////////////////////////// BONOS /////////////////////////////////////////////////////
            if (tipo.equals("Bonos")) {
                BonoDao bdao = new BonoDaoImpl();            
                List <Bono>historicoBono = new ArrayList();
                try {
                    int dias = Integer.parseInt(request.getParameter("Dias"));
                    historicoBono = bdao.historicoBonos(simbolo, dias);
                    Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
                    String jsonconFormato = prettyGson.toJson(historicoBono);
                    out.println(jsonconFormato);
                    //System.out.println(jsonconFormato);

                } catch (SQLException e) {
                    System.out.println("==== ERROR AL CARGAR HISTORICOS BONOS ===="); //Muestro error por consola para Depuración
                    System.out.println("Tipo de error: " + e.getClass().getName());
                    System.out.println("Mensaje: " + e.getMessage());
 
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Código 500
                    out.print("{\"error\":\"" + e.getMessage() + "\"}"); // Mensaje de getConnection()
                }catch (Exception e) {
                    System.out.println("==== ERROR AL CARGAR HISTORICOS BONOS ===="); //Muestro error por consola para Depuración
                    System.out.println("Tipo de error: " + e.getClass().getName());
                    System.out.println("Mensaje: " + e.getMessage());
 
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Código 500
                    out.print("{\"error\":\"" + e.getMessage() + "\"}"); // Mensaje de getConnection()               
                }  
            ////////////////////////////////// CRIPTOMONEDAS/////////////////////////////////////////////////////
            }else if (tipo.equals("Criptomonedas")) {
                CriptoDao cdao = new CriptoDaoImpl();            
                List <Criptomoneda>historicoCripto = new ArrayList();
                String moneda = request.getParameter("Moneda");
                int dias = Integer.parseInt(request.getParameter("Dias"));
                try {
                    historicoCripto = cdao.historicoCripto(simbolo,moneda,dias);
                    Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
                    String jsonconFormato = prettyGson.toJson(historicoCripto);
                    out.println(jsonconFormato);
                    System.out.println(jsonconFormato);

                } catch (SQLException e) {
                    System.out.println("==== ERROR AL CARGAR HISTORICOS CRIPTOMONEDAS ===="); //Muestro error por consola para Depuración
                    System.out.println("Tipo de error: " + e.getClass().getName());
                    System.out.println("Mensaje: " + e.getMessage());
 
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Código 500
                    out.print("{\"error\":\"" + e.getMessage() + "\"}"); // Mensaje de getConnection()
                }catch (Exception e) {
                    System.out.println("==== ERROR AL CARGAR HISTORICOS CRIPTOMONEDAS ===="); //Muestro error por consola para Depuración
                    System.out.println("Tipo de error: " + e.getClass().getName());
                    System.out.println("Mensaje: " + e.getMessage());
 
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Código 500
                    out.print("{\"error\":\"" + e.getMessage() + "\"}"); // Mensaje de getConnection()               
                }  
            ////////////////////////////////// DOLAR/////////////////////////////////////////////////////                
            }else if(tipo.equals("Dolar")){
                int dias = Integer.parseInt(request.getParameter("Dias")); 
                DolarDao ddao = new DolarDaoImpl();            
                List <Dolar> historicoSimbolo = new ArrayList();
                List <Dolar> historicoDolarBlue = new ArrayList();
                List <Dolar> historicoDolarBolsa = new ArrayList();
                List <Dolar> historicoDolarCcl = new ArrayList();
                List <Dolar> historicoDolarOficial = new ArrayList();
                


                try {
                    
                    historicoSimbolo = ddao.historicoDolar(simbolo, dias);
                    Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
                    String jsonSimbolo = prettyGson.toJson(historicoSimbolo);
                    String jsonDolarBlue;
                    String jsonDolarBolsa; 
                    String jsonDolarCcl; 
                    String jsonDolarOficial;
                    String json;
                    switch (simbolo) {
                        case "Dolar Blue":
                            historicoDolarBolsa = ddao.historicoDolar("Dolar Bolsa", dias);
                            historicoDolarCcl = ddao.historicoDolar("Dolar Contado con Liqui", dias);
                            historicoDolarOficial = ddao.historicoDolar("Dolar Oficial", dias);
                            jsonDolarBolsa = prettyGson.toJson(historicoDolarBolsa); 
                            jsonDolarCcl = prettyGson.toJson(historicoDolarCcl); 
                            jsonDolarOficial = prettyGson.toJson(historicoDolarOficial); 
                            
                            
                            json = "{"+
                                        "\"DolarBlue\": "+jsonSimbolo+","+      //donde va datos pongo cada una de las clases que transformo a dolar 
                                        "\"DolarBolsa\": "+jsonDolarBolsa+","+
                                        "\"DolarCcl\": "+jsonDolarCcl+","+
                                        "\"DolarOficial\": "+jsonDolarOficial+
                                      "}";                            
                            out.println(json);
                            //System.out.println(json);
                            break;
                        case "Dolar Bolsa":
                            historicoDolarBlue = ddao.historicoDolar("Dolar Blue", dias);
                            historicoDolarCcl = ddao.historicoDolar("Dolar Contado con Liqui", dias);
                            historicoDolarOficial = ddao.historicoDolar("Dolar Oficial", dias);
                            jsonDolarBlue = prettyGson.toJson(historicoDolarBlue); 
                            jsonDolarCcl = prettyGson.toJson(historicoDolarCcl); 
                            jsonDolarOficial = prettyGson.toJson(historicoDolarOficial); 
                            
                            
                            json = "{"+
                                        "\"DolarBlue\": "+jsonSimbolo+","+      //donde va datos pongo cada una de las clases que transformo a dolar 
                                        "\"DolarBolsa\": "+jsonDolarBlue+","+
                                        "\"DolarCcl\": "+jsonDolarCcl+","+
                                        "\"DolarOficial\": "+jsonDolarOficial+
                                      "}";                            
                            out.println(json);
                            //System.out.println(json);
                            break;                            
                        case "Dolar Contado con Liqui":
                            historicoDolarBlue = ddao.historicoDolar("Dolar Blue", dias);
                            historicoDolarBolsa = ddao.historicoDolar("Dolar Bolsa", dias);
                            historicoDolarOficial = ddao.historicoDolar("Dolar Oficial", dias);
                            jsonDolarBlue = prettyGson.toJson(historicoDolarBlue); 
                            jsonDolarBolsa = prettyGson.toJson(historicoDolarBolsa); 
                            jsonDolarOficial = prettyGson.toJson(historicoDolarOficial); 
                            
                            
                            json = "{"+
                                        "\"DolarBlue\": "+jsonSimbolo+","+      //donde va datos pongo cada una de las clases que transformo a dolar 
                                        "\"DolarBolsa\": "+jsonDolarBlue+","+
                                        "\"DolarCcl\": "+jsonDolarBolsa+","+
                                        "\"DolarOficial\": "+jsonDolarOficial+
                                      "}";                            
                            out.println(json);
                            //System.out.println(json);
                            break; 
                        case "Dolar Oficial":
                            historicoDolarBlue = ddao.historicoDolar("Dolar Blue", dias);
                            historicoDolarBolsa = ddao.historicoDolar("Dolar Bolsa", dias);
                            historicoDolarCcl = ddao.historicoDolar("Dolar Contado con Liqui", dias);
                            jsonDolarBlue = prettyGson.toJson(historicoDolarBlue); 
                            jsonDolarBolsa = prettyGson.toJson(historicoDolarBolsa); 
                            jsonDolarCcl = prettyGson.toJson(historicoDolarCcl); 
                            
                            
                            json = "{"+
                                        "\"DolarBlue\": "+jsonSimbolo+","+      //donde va datos pongo cada una de las clases que transformo a dolar 
                                        "\"DolarBolsa\": "+jsonDolarBlue+","+
                                        "\"DolarCcl\": "+jsonDolarBolsa+","+
                                        "\"DolarOficial\": "+jsonDolarCcl+
                                      "}";                            
                            out.println(json);
                            //System.out.println(json);
                            break; 
                        default:
                            break;
                    } 
                    
                } catch (SQLException e) {
                    System.out.println("==== ERROR AL CARGAR HISTORICOS DOLAR ===="); //Muestro error por consola para Depuración
                    System.out.println("Tipo de error: " + e.getClass().getName());
                    System.out.println("Mensaje: " + e.getMessage());
 
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Código 500
                    out.print("{\"error\":\"" + e.getMessage() + "\"}"); // Mensaje de getConnection()
                }catch (Exception e) {
                    System.out.println("==== ERROR AL CARGAR HISTORICOS DOLAR ===="); //Muestro error por consola para Depuración
                    System.out.println("Tipo de error: " + e.getClass().getName());
                    System.out.println("Mensaje: " + e.getMessage());
 
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Código 500
                    out.print("{\"error\":\"" + e.getMessage() + "\"}"); // Mensaje de getConnection()               
                }  

                /*try {
                    historicoDolar = ddao.historicoDolar(simbolo, dias);
                    Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
                    String jsonconFormato = prettyGson.toJson(historicoDolar);
                    out.println(jsonconFormato);
                    System.out.println(jsonconFormato);
                } catch (SQLException ex) {
                    request.getRequestDispatcher("index.jsp").forward(request, response);
                } */  
            ////////////////////////////////// ACCIONES/////////////////////////////////////////////////////    
            }else{
                int dias = Integer.parseInt(request.getParameter("Dias")); 
                AccionDao adao = new AccionDaoImpl();            
                List <Accion>historicoAccion = new ArrayList();
                try {
                    historicoAccion = adao.historicoAccion(tipo, simbolo, dias);
                    Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
                    String jsonconFormato = prettyGson.toJson(historicoAccion);
                    out.println(jsonconFormato);
                } catch (SQLException e) {
                    System.out.println("==== ERROR AL CARGAR HISTORICOS ACCION ===="); //Muestro error por consola para Depuración
                    System.out.println("Tipo de error: " + e.getClass().getName());
                    System.out.println("Mensaje: " + e.getMessage());
 
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Código 500
                    out.print("{\"error\":\"" + e.getMessage() + "\"}"); // Mensaje de getConnection()
                }catch (Exception e) {
                    System.out.println("==== ERROR AL CARGAR HISTORICOS ACCION ===="); //Muestro error por consola para Depuración
                    System.out.println("Tipo de error: " + e.getClass().getName());
                    System.out.println("Mensaje: " + e.getMessage());
 
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Código 500
                    out.print("{\"error\":\"" + e.getMessage() + "\"}"); // Mensaje de getConnection()               
                }               
            }
            

        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
