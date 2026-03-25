package Controladores;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Controlador extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            
            String tipo="";
            HttpSession sesion;
            String solicitud = request.getParameter("accion");
               switch (solicitud) {
            case "MenuAcciones":
                request.getRequestDispatcher("WEB-INF/paginas/menuAcciones.jsp").forward(request, response);    
                break;
            case "CotizacionAcciones":
                tipo = request.getParameter("tipo");
                sesion = request.getSession();
                sesion.setAttribute("tipo", tipo);
                response.sendRedirect("Acciones");
                break;
            case "CotizacionBonos":
                tipo = request.getParameter("tipo");
                sesion = request.getSession();
                sesion.setAttribute("tipo", tipo);                
                response.sendRedirect("Bonos");
                break;
            case "CotizacionCriptomonedas":
                tipo = request.getParameter("tipo");
                sesion = request.getSession();
                sesion.setAttribute("tipo", tipo);                 
                response.sendRedirect("Criptomonedas");
                break;
            case "CotizacionDolar":
                response.sendRedirect("Dolar");
                break;
            case "RecargarTabla":
                response.sendRedirect("recargarTabla");
                break;
            case "Ayuda":
                request.getRequestDispatcher("WEB-INF/paginas/ayuda.jsp").forward(request, response);    
                break;
            default:
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
