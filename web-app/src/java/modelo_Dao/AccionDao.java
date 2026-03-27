
package modelo_Dao;

import modelo.Accion;
import java.sql.SQLException;
import java.util.List;

public interface AccionDao {
    public List<Accion> listarAcciones(String tipo) throws SQLException;
    public List<Accion> buscarAcciones(String tipo, String texto) throws SQLException;
    public List<Accion> historicoAccion(String tipo, String simbolo, int dias) throws SQLException;
    public Accion buscarAccion(String texto) throws SQLException;
    public List<Integer> pronosticoGeneral() throws SQLException;
    
}
