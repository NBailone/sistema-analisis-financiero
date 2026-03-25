
package config;

import java.sql.Connection;
import java.sql.SQLException;
import org.apache.commons.dbcp2.BasicDataSource;


public class ConnectionPool {
    
    // Configuración de la base de datos
    private final String db="proyectofb"; // Nombre de la base de datos
    private final String user="root";     // Usuario de MySQL
    // URL de conexión
    private final String url="jdbc:mysql://localhost:3306/"+db+"?useUnicode=true&useJDBCCompliant" 
                             + "TimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
    private final String pass="";  // Contraseña  
    
    // Variables para el patrón Singleton y el pool
    private static ConnectionPool dataSource; // Instancia única del pool (Singleton)
    private BasicDataSource basicDataSource=null; // Objeto del pool de DBCP2

//Constructor    
    private ConnectionPool(){
     
        basicDataSource = new BasicDataSource();
        basicDataSource.setDriverClassName("com.mysql.jdbc.Driver"); // Driver de MySQL
        basicDataSource.setUsername(user);
        basicDataSource.setPassword(pass);
        basicDataSource.setUrl(url);
        // Configuración del pool:
        basicDataSource.setMinIdle(5);        // Conexiones mínimas inactivas
        basicDataSource.setMaxIdle(20);       // Conexiones máximas inactivas
        basicDataSource.setMaxTotal(50);      // Conexiones totales permitidas
        basicDataSource.setMaxWaitMillis(-1); // Espera infinita para una conexión
        
    }
    
    public static ConnectionPool getInstance() {
        if (dataSource == null) {
            dataSource = new ConnectionPool(); 
        } 
            return dataSource;
    }

    public Connection getConnection() throws SQLException{
        try {
            return this.basicDataSource.getConnection();
        } catch (SQLException e) {
            throw new SQLException("No se pudo conectar a la base de datos");
        } 
    }
    
    public void closeConnection(Connection connection) throws SQLException {
        connection.close(); // La conexión se devuelve al pool, no se destruye.
    }    
    
}

