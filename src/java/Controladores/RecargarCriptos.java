
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
import modelo.Criptomoneda;
import modelo_Dao.CriptoDao;
import modelo_Dao.CriptoDaoImpl;


public class RecargarCriptos extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8"); 
        try (PrintWriter out = response.getWriter()) {
            String tipo = request.getParameter("Tipo");
            CriptoDao cdao = new CriptoDaoImpl();            
            List <Criptomoneda> criptos = new ArrayList();
                        
            try {
                criptos = cdao.listarCriptos();
                Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
                String jsonconFormato = prettyGson.toJson(criptos);
                out.println(jsonconFormato);
                System.out.println(jsonconFormato);
 
            } catch (SQLException e) {
                    System.out.println("==== ERROR EN RecargarCriptomonedas ===="); //Muestro error por consola para Depuración
                    System.out.println("Tipo de error: " + e.getClass().getName());
                    System.out.println("Mensaje: " + e.getMessage());
 
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Código 500
                    out.print("{\"error\":\"" + e.getMessage() + "\"}"); // Mensaje de getConnection()
                }catch (Exception e) {
                    System.out.println("==== ERROR EN RecargarCriptomonedas ===="); //Muestro error por consola para Depuración
                    System.out.println("Tipo de error: " + e.getClass().getName());
                    System.out.println("Mensaje: " + e.getMessage());
 
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Código 500
                    out.print("{\"error\":\"" + e.getMessage() + "\"}"); // Mensaje de getConnection()               
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
