package modelo_Dao;

import java.sql.SQLException;
import java.util.List;
import modelo.Criptomoneda;

public interface CriptoDao {
    public List<Criptomoneda> listarCriptos() throws SQLException;
    public List<Criptomoneda> historicoCripto(String simbolo,String moneda, int dias) throws SQLException;
    
}
