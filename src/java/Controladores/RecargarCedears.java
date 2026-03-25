
package Controladores;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import modelo.*;
import modelo_Dao.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.text.DecimalFormat;
import java.util.Arrays;

public class RecargarCedears extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8"); 
        try (PrintWriter out = response.getWriter()) {
            

            String busqueda = "";
            busqueda= request.getParameter("search_keywords");
            //System.out.println(busqueda );
            AccionDao adao = new AccionDaoImpl();            
            List <Accion>acciones = new ArrayList();            
            DecimalFormat formateador = new DecimalFormat("#,##0.00");
            if (busqueda.equals("")) {
                try {
                    acciones = adao.listarAcciones("Cedears");                  
                    String data="";
                    int index = 1;
                    int total = acciones.size();
                    for (Accion a : acciones) {
                        data +="["+
                                "\""+a.getSimbolo()+"\","+
                                "\""+a.getDescripcion()+"\","+
                                "\""+formateador.format(a.getCotizacion())+"\","+
                                "\""+formateador.format(a.getVariacion())+" %\","+
                                "\""+formateador.format(a.getApertura())+"\","+
                                "\""+formateador.format(a.getMaximo())+"\","+
                                "\""+formateador.format(a.getMinimo())+"\","+
                                "\""+formateador.format(a.getUltimo_cierre()) +"\","+
                                "\""+a.getPronostico().getPronostico()  +"\""+
                                "]";
                        if (index < total) {
                            data+=",";
                        }
                        index++;
                    }
                    //System.out.println(jsonconFormato );
                    String json = "{"+
                                    "\"draw\": 1,"+
                                    "\"recordsTotal\": "+acciones.size()+","+
                                    "\"recordsFiltered\":"+acciones.size()+","+
                                    "\"data\": ["+
                                        data+
                                    "]"+
                                  "}";
                    //System.out.println(json);
                    out.println(json);
                } catch (SQLException e) {
                    System.out.println("==== ERROR EN RecargarCedear ===="); //Muestro error por consola para Depuración
                    System.out.println("Tipo de error: " + e.getClass().getName());
                    System.out.println("Mensaje: " + e.getMessage());
 
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Código 500
                    out.print("{\"error\":\"" + e.getMessage() + "\"}"); // Mensaje de getConnection()
                }catch (Exception e) {
                    System.out.println("==== ERROR EN RecargarCedear ===="); //Muestro error por consola para Depuración
                    System.out.println("Tipo de error: " + e.getClass().getName());
                    System.out.println("Mensaje: " + e.getMessage());
 
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Código 500
                    out.print("{\"error\":\"" + e.getMessage() + "\"}"); // Mensaje de getConnection()               
                }                 
 
            }else{                    
                    System.out.println(busqueda);
                try {
                    acciones = adao.buscarAcciones("Cedears",busqueda);
                    //sesion.setAttribute("acciones", acciones);
                    Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
                    String jsonconFormato = prettyGson.toJson(acciones);
                    String prueba = "{"+"\"data\":"+jsonconFormato+"}";
                    //out.println(jsonconFormato);
                    String data="";
                    int index = 1;
                    int total = acciones.size();
                    for (Accion a : acciones) {
                        data +="["+
                                "\""+a.getSimbolo()+"\","+
                                "\""+a.getDescripcion()+"\","+
                                "\""+formateador.format(a.getCotizacion())+"\","+
                                "\""+formateador.format(a.getVariacion())+" %\","+
                                "\""+formateador.format(a.getApertura())+"\","+
                                "\""+formateador.format(a.getMaximo())+"\","+
                                "\""+formateador.format(a.getMinimo())+"\","+
                                "\""+formateador.format(a.getUltimo_cierre()) +"\","+
                                "\""+a.getPronostico().getPronostico()  +"\""+
                                "]";
                        if (index < total) {
                            data+=",";
                        }
                        index++;
                    }
                    //System.out.println(jsonconFormato );
                    String json = "{"+
                                    "\"draw\": 1,"+
                                    "\"recordsTotal\": "+acciones.size()+","+
                                    "\"recordsFiltered\":"+acciones.size()+","+
                                    "\"data\": ["+
                                        data+
                                    "]"+
                                  "}";
                    //System.out.println(json);
                    out.println(json);
                } catch (SQLException e) {
                    System.out.println("==== ERROR EN RecargarCedear ===="); //Muestro error por consola para Depuración
                    System.out.println("Tipo de error: " + e.getClass().getName());
                    System.out.println("Mensaje: " + e.getMessage());
 
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Código 500
                    out.print("{\"error\":\"" + e.getMessage() + "\"}"); // Mensaje de getConnection()
                }catch (Exception e) {
                    System.out.println("==== ERROR EN RecargarCedear ===="); //Muestro error por consola para Depuración
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
