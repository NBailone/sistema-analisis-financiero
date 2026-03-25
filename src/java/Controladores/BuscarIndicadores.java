
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
import modelo.Accion;
import modelo_Dao.AccionDao;
import modelo_Dao.AccionDaoImpl;

public class BuscarIndicadores extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8"); 
        try (PrintWriter out = response.getWriter()) {
            String activoFinanciero = request.getParameter("Activo");
            AccionDao adao = new AccionDaoImpl();            
            Accion a = new Accion();
                        
            try {
                a = adao.buscarAccion(activoFinanciero);
                Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
                String jsonconFormato = prettyGson.toJson(a);
                out.println(jsonconFormato);
                //System.out.println(jsonconFormato);
 
            } catch (SQLException ex) {
                request.getRequestDispatcher("error.jsp").forward(request, response);
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
