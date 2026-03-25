
package Controladores;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import modelo_Dao.CriptoDao;
import modelo.Criptomoneda;
import modelo_Dao.CriptoDaoImpl;

public class Criptomonedas extends HttpServlet {


    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
                    CriptoDao cdao = new CriptoDaoImpl();

            HttpSession sesion = request.getSession();
            String solicitud = (String)sesion.getAttribute("tipo");
            List <Criptomoneda> criptos = new ArrayList();
            try {
                criptos = cdao.listarCriptos();
                if (criptos == null || criptos.isEmpty()) {
                    request.setAttribute("mensajeError", "No hay datos para mostrar.");
                    request.setAttribute("tipo", solicitud);
                    request.getRequestDispatcher("error.jsp").forward(request, response);
                    return;
                }                    
                
                sesion.setAttribute("criptos", criptos);
                request.getRequestDispatcher("WEB-INF/paginas/criptomonedas.jsp").forward(request, response); 
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
