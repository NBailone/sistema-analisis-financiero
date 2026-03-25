
package modelo_Dao;

import java.sql.SQLException;
import java.util.List;
import modelo.Bono;

public interface BonoDao {
    public List<Bono> listarBonos() throws SQLException;
    public List<Bono> buscarBonos(String texto) throws SQLException;
    public List<Bono> historicoBonos(String simbolo, int dias) throws SQLException; 
}    

