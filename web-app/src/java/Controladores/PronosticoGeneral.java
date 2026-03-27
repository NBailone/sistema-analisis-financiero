
package Controladores;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modelo.Accion;
import modelo_Dao.AccionDao;
import modelo_Dao.AccionDaoImpl;

public class PronosticoGeneral extends HttpServlet {


    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8"); 
        try (PrintWriter out = response.getWriter()) {
        
           
            //System.out.println(busqueda );
            AccionDao adao = new AccionDaoImpl();            
            List <Integer>pGeneral = new ArrayList();    
            
        try {
            pGeneral = adao.pronosticoGeneral();
 
            String data="";

            data +="["+
                    "\""+pGeneral.get(0)+"\","+
                    "\""+pGeneral.get(1)+"\","+
                    "\""+pGeneral.get(2)+"\","+
                    "\""+pGeneral.get(3)+"\","+
                    "\""+pGeneral.get(4)+"\""+
                   "]";

            out.println(data);
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
