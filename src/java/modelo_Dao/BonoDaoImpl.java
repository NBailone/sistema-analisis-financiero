
package modelo_Dao;

import config.ConnectionPool;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import modelo.Accion;
import modelo.Bono;
import modelo.IndicadoresAccion;

public class BonoDaoImpl implements BonoDao{
    @Override 
   public List listarBonos() throws SQLException{
       
       List<Bono> listaBonos = new ArrayList();
       ResultSet rs = null;
       java.sql.CallableStatement cl = null;
       Connection con = null;
        try {
            con =  ConnectionPool.getInstance().getConnection();
            cl = con.prepareCall("{CALL cotizacionBonos()}");
            rs = cl.executeQuery();


            while (rs.next()) {
                Bono b = new Bono();
                b.setSimbolo(rs.getString(1));
                b.setDescripcion(rs.getString(2));
                b.setCotizacion(rs.getDouble(3));           
                b.setVariacion(rs.getDouble(4));
                b.setApertura(rs.getDouble(5));
                b.setMaximo(rs.getDouble(6));
                b.setMinimo(rs.getDouble(7));
                b.setUltimo_cierre(rs.getDouble(8));
                b.setVolumen(rs.getDouble(9));
                b.setFecha(rs.getTimestamp(10));                

                listaBonos.add(b);
                
            }
            return listaBonos;
            
        } catch (SQLException e) {
            if(e.getMessage().equals("No se pudo conectar a la base de datos")){
                throw e;
            }else{
                throw new SQLException("Error al consultar bonos");
            }
        } finally{
            try{
                if(rs!=null){
                    rs.close();
                }
                if(cl!=null){
                    cl.close();
                }
                if(con!=null){
                   ConnectionPool.getInstance().closeConnection(con);
                }                
            }catch(Exception e){   
            }  
        }   
    }   

    @Override
    public List<Bono> buscarBonos(String texto) throws SQLException {
       List<Bono> listaBonos = new ArrayList();
       ResultSet rs = null;
       java.sql.CallableStatement cl = null;
       Connection con = null;
        try {
            con =  ConnectionPool.getInstance().getConnection();
                cl = con.prepareCall("{CALL buscarBonos(?)}");
                cl.setString(1, texto);
                rs = cl.executeQuery();           
            while (rs.next()) {
                Bono b = new Bono();
                b.setSimbolo(rs.getString(1));
                b.setDescripcion(rs.getString(2));
                b.setCotizacion(rs.getDouble(3));           
                b.setVariacion(rs.getDouble(4));
                b.setApertura(rs.getDouble(5));
                b.setMaximo(rs.getDouble(6));
                b.setMinimo(rs.getDouble(7));
                b.setUltimo_cierre(rs.getDouble(8));
                b.setVolumen(rs.getDouble(9));
                b.setFecha(rs.getTimestamp(10));                

                listaBonos.add(b);
                
            }
            return listaBonos;
            
        } catch (SQLException e) {
            if(e.getMessage().equals("No se pudo conectar a la base de datos")){
                throw e;
            }else{
                throw new SQLException("Error al realizar la busqueda"+texto);
            }
        } finally{
            try{
                if(rs!=null){
                    rs.close();
                }
                if(cl!=null){
                    cl.close();
                }
                if(con!=null){
                   ConnectionPool.getInstance().closeConnection(con);
                }                
            }catch(Exception e){   
            }  
        }   
    }

    @Override
    public List<Bono> historicoBonos(String simbolo, int dias) throws SQLException {
       List<Bono> historico = new ArrayList();
       ResultSet rs = null;
       java.sql.CallableStatement cl = null;
       Connection con = null;
       
        try {
            con =  ConnectionPool.getInstance().getConnection();
            cl = con.prepareCall("{CALL historicoBonos(?,?)}");
            cl.setString(1, simbolo);
            cl.setInt(2, dias);
            rs = cl.executeQuery();           
            while (rs.next()) {
                Bono b = new Bono();
                b.setApertura(rs.getDouble(1));
                b.setMaximo(rs.getDouble(2));
                b.setMinimo(rs.getDouble(3));
                b.setUltimo_cierre(rs.getDouble(4));
                b.setFecha(rs.getTimestamp(5));                
                historico.add(b);                
                
            }
            return historico;
            
        } catch (SQLException e) {
            if(e.getMessage().equals("No se pudo conectar a la base de datos")){
                throw e;
            }else{
                throw new SQLException("Error al consultar" + simbolo);
            }
        } finally{
            try{
                if(rs!=null){
                    rs.close();
                }
                if(cl!=null){
                    cl.close();
                }
                if(con!=null){
                   ConnectionPool.getInstance().closeConnection(con);
                }                
            }catch(Exception e){   
            }  
        } 
    }

}
