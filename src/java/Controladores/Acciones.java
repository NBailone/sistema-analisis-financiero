
package Controladores;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import modelo.Accion;
import modelo_Dao.*;

public class Acciones extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
            AccionDao adao = new AccionDaoImpl();
            

            HttpSession sesion = request.getSession();
            String solicitud = (String)sesion.getAttribute("tipo");
            List <Accion>acciones = new ArrayList();
            try {
                acciones = adao.listarAcciones(solicitud);
                
            if (acciones == null || acciones.isEmpty()) {
                request.setAttribute("mensajeError", "No hay datos para mostrar.");
                request.setAttribute("tipo", solicitud);
                request.getRequestDispatcher("error.jsp").forward(request, response);
                return;
            }                
  
            sesion.setAttribute("acciones", acciones);
            if (solicitud.equals("Cedears")) {
                request.getRequestDispatcher("WEB-INF/paginas/cedears.jsp").forward(request, response); 
            }else{
                request.getRequestDispatcher("WEB-INF/paginas/acciones.jsp").forward(request, response);  
            }
                  
            } catch (SQLException ex) {
                request.setAttribute("mensajeError", "Error al consultar las cotizaciones.");
                request.setAttribute("tipo", solicitud);
                request.getRequestDispatcher("error.jsp").forward(request, response);
            } catch (Exception ex) {
                request.setAttribute("mensajeError", "Error al consultar las cotizaciones.");
                request.setAttribute("tipo", solicitud);
                request.getRequestDispatcher("error.jsp").forward(request, response);
        }

    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }


    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
