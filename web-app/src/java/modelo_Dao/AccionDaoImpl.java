
package modelo_Dao;

import config.ConnectionPool;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import modelo.Accion;
import modelo.IndicadoresAccion;

public class AccionDaoImpl implements AccionDao{
   @Override
   public List listarAcciones(String tipo) throws SQLException{
       
       List<Accion> listaAcciones = new ArrayList();
       ResultSet rs = null;
       java.sql.CallableStatement cl = null;
       Connection con = null;
        try {
            con =  ConnectionPool.getInstance().getConnection();
            if(tipo.equals("Merval")){
                cl = con.prepareCall("{CALL cotizacionMerval()}");
                rs = cl.executeQuery();
            }else if(tipo.equals("Merval25")){
                cl = con.prepareCall("{CALL cotizacionMerval25()}");
                rs = cl.executeQuery();                
            }else if(tipo.equals("PanelGeneral")){
                cl = con.prepareCall("{CALL cotizacionPanelGeneral()}");
                rs = cl.executeQuery();                
            }else if(tipo.equals("MervalArgentina")){
                cl = con.prepareCall("{CALL cotizacionMervalArgentina()}");
                rs = cl.executeQuery();                
            }else if(tipo.equals("Burcap")){
                cl = con.prepareCall("{CALL cotizacionBurcap()}");
                rs = cl.executeQuery();                
            }else if(tipo.equals("Cedears")){
                cl = con.prepareCall("{CALL cotizacionCedears()}");
                rs = cl.executeQuery();                
            }

            while (rs.next()) {
                Accion a = new Accion();
                IndicadoresAccion iacc = new IndicadoresAccion();
                a.setSimbolo(rs.getString(1));
                a.setDescripcion(rs.getString(2));
                a.setCotizacion(rs.getDouble(3));           
                a.setVariacion(rs.getDouble(4));
                a.setApertura(rs.getDouble(5));
                a.setMaximo(rs.getDouble(6));
                a.setMinimo(rs.getDouble(7));
                a.setUltimo_cierre(rs.getDouble(8));
                a.setCant_oper(rs.getDouble(9));
                a.setFecha(rs.getTimestamp(10));                
                iacc.setMacd(rs.getDouble(11));
                iacc.setPronMacd(rs.getString(12));
                iacc.setRsi(rs.getDouble(13));
                iacc.setPronRsi(rs.getString(14));
                iacc.setCmm20(rs.getDouble(15));
                iacc.setProncmm2(rs.getString(16));
                iacc.setRoc(rs.getDouble(17));
                iacc.setPronRoc(rs.getString(18));                
                iacc.setEstocastico(rs.getDouble(19));                
                iacc.setPronEstoc(rs.getString(20));
                iacc.setCci(rs.getDouble(21));
                iacc.setPronCci(rs.getString(22));
                iacc.setDx(rs.getDouble(23));
                iacc.setPronDx(rs.getString(24));
                iacc.setAtr(rs.getDouble(25));                
                iacc.setPronAtr(rs.getString(26));
                iacc.setPronostico(rs.getString(27));
                iacc.setTotal(rs.getInt(28));
                a.setPronostico(iacc);

                listaAcciones.add(a);
                
            }
            return listaAcciones;
            
        } catch (SQLException e) {
            if(e.getMessage().equals("No se pudo conectar a la base de datos")){
                throw e;
            }else{
                throw new SQLException("Error al consultar" + tipo);
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
    public List<Accion> historicoAccion(String tipo, String simbolo, int dias) throws SQLException {
       List<Accion> historico = new ArrayList();
       ResultSet rs = null;
       java.sql.CallableStatement cl = null;
       Connection con = null;
       
        try {
            con =  ConnectionPool.getInstance().getConnection();
            if(tipo.equals("Merval")){
                cl = con.prepareCall("{CALL historicoMerval(?,?)}");
                cl.setString(1, simbolo);
                cl.setInt(2, dias);
                rs = cl.executeQuery();
            }else if(tipo.equals("Merval25")){
                cl = con.prepareCall("{CALL historicoMerval25(?,?)}");
                cl.setString(1, simbolo);
                cl.setInt(2, dias);
                rs = cl.executeQuery();                
            }else if(tipo.equals("MervalArgentina")){
                cl = con.prepareCall("{CALL historicoMervalArgentina(?,?)}");
                cl.setString(1, simbolo);
                cl.setInt(2, dias);
                rs = cl.executeQuery();                
            }else if(tipo.equals("PanelGeneral")){
                cl = con.prepareCall("{CALL historicoPanelGeneral(?,?)}");
                cl.setString(1, simbolo);
                cl.setInt(2, dias);
                rs = cl.executeQuery();                
            }else if(tipo.equals("Burcap")){
                cl = con.prepareCall("{CALL historicoBurcap(?,?)}");
                cl.setString(1, simbolo);
                cl.setInt(2, dias);
                rs = cl.executeQuery();                
            }else if(tipo.equals("Cedears")){
                cl = con.prepareCall("{CALL historicoCedears(?,?)}");
                cl.setString(1, simbolo);
                cl.setInt(2, dias);
                rs = cl.executeQuery();                
            }

            while (rs.next()) {
                Accion a = new Accion();         
                a.setApertura(rs.getDouble(1));
                a.setMaximo(rs.getDouble(2));
                a.setMinimo(rs.getDouble(3));
                a.setUltimo_cierre(rs.getDouble(4));
                a.setFecha(rs.getTimestamp(5));                
                historico.add(a);
                
            }
            return historico;
            
        } catch (SQLException e) {
            if(e.getMessage().equals("No se pudo conectar a la base de datos")){
                throw e;
            }else{
                throw new SQLException("Error al consultar" + tipo);
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
    //Se buscan las acciones por nombre 
    @Override
    public List<Accion> buscarAcciones(String tipo, String texto) throws SQLException {
       List<Accion> listaAcciones = new ArrayList();
       ResultSet rs = null;
       java.sql.CallableStatement cl = null;
       Connection con = null;
        try {
            con =  ConnectionPool.getInstance().getConnection();
            if(tipo.equals("Cedears")){
                cl = con.prepareCall("{CALL buscarCedears(?)}");
                cl.setString(1, texto);
                rs = cl.executeQuery(); 
            }

            while (rs.next()) {
                Accion a = new Accion();
                IndicadoresAccion iacc = new IndicadoresAccion();
                a.setSimbolo(rs.getString(1));
                a.setDescripcion(rs.getString(2));
                a.setCotizacion(rs.getDouble(3));           
                a.setVariacion(rs.getDouble(4));
                a.setApertura(rs.getDouble(5));
                a.setMaximo(rs.getDouble(6));
                a.setMinimo(rs.getDouble(7));
                a.setUltimo_cierre(rs.getDouble(8));
                a.setCant_oper(rs.getDouble(9));
                a.setFecha(rs.getTimestamp(10));                
                iacc.setMacd(rs.getDouble(11));
                iacc.setPronMacd(rs.getString(12));
                iacc.setRsi(rs.getDouble(13));
                iacc.setPronRsi(rs.getString(14));
                iacc.setCmm20(rs.getDouble(15));
                iacc.setProncmm2(rs.getString(16));
                iacc.setRoc(rs.getDouble(17));
                iacc.setPronRoc(rs.getString(18));                
                iacc.setEstocastico(rs.getDouble(19));                
                iacc.setPronEstoc(rs.getString(20));
                iacc.setCci(rs.getDouble(21));
                iacc.setPronCci(rs.getString(22));
                iacc.setDx(rs.getDouble(23));
                iacc.setPronDx(rs.getString(24));
                iacc.setAtr(rs.getDouble(25));                
                iacc.setPronAtr(rs.getString(26));
                iacc.setPronostico(rs.getString(27));
                iacc.setTotal(rs.getInt(28));
                a.setPronostico(iacc);

                listaAcciones.add(a);
                
            }
            return listaAcciones;
            
        } catch (SQLException e) {
            if(e.getMessage().equals("No se pudo conectar a la base de datos")){
                throw e;
            }else{
                throw new SQLException("Error al consultar" + tipo);
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
    public Accion buscarAccion(String texto) throws SQLException {
       ResultSet rs = null;
       java.sql.CallableStatement cl = null;
       Connection con = null;
        try {
            con =  ConnectionPool.getInstance().getConnection();
            cl = con.prepareCall("{CALL buscarCedear(?)}");
            cl.setString(1, texto);
            rs = cl.executeQuery(); 
            Accion a = new Accion();
            
            while (rs.next()) {
                IndicadoresAccion iacc = new IndicadoresAccion();
                a.setSimbolo(rs.getString(1));
                a.setDescripcion(rs.getString(2));
                a.setCotizacion(rs.getDouble(3));           
                a.setVariacion(rs.getDouble(4));
                a.setApertura(rs.getDouble(5));
                a.setMaximo(rs.getDouble(6));
                a.setMinimo(rs.getDouble(7));
                a.setUltimo_cierre(rs.getDouble(8));
                a.setCant_oper(rs.getDouble(9));
                a.setFecha(rs.getTimestamp(10));                
                iacc.setMacd(rs.getDouble(11));
                iacc.setPronMacd(rs.getString(12));
                iacc.setRsi(rs.getDouble(13));
                iacc.setPronRsi(rs.getString(14));
                iacc.setCmm20(rs.getDouble(15));
                iacc.setProncmm2(rs.getString(16));
                iacc.setRoc(rs.getDouble(17));
                iacc.setPronRoc(rs.getString(18));                
                iacc.setEstocastico(rs.getDouble(19));                
                iacc.setPronEstoc(rs.getString(20));
                iacc.setCci(rs.getDouble(21));
                iacc.setPronCci(rs.getString(22));
                iacc.setDx(rs.getDouble(23));
                iacc.setPronDx(rs.getString(24));
                iacc.setAtr(rs.getDouble(25));                
                iacc.setPronAtr(rs.getString(26));
                iacc.setPronostico(rs.getString(27));
                iacc.setTotal(rs.getInt(28));
                a.setPronostico(iacc);
                
            }
            return a;
            
        } catch (SQLException e) {
            if(e.getMessage().equals("No se pudo conectar a la base de datos")){
                throw e;
            }else{
                throw new SQLException("Error al consultar" +texto);
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
    public List<Integer> pronosticoGeneral() throws SQLException {
       ResultSet rs = null;
       java.sql.CallableStatement cl = null;
       Connection con = null;
        int compra = 0;
        int compraF = 0;
        int neutral = 0;
        int venta = 0;
        int ventaF = 0;         
        try {
            con =  ConnectionPool.getInstance().getConnection();
            cl = con.prepareCall("{CALL pronosticoGeneral()}");
            rs = cl.executeQuery(); 
            List<Integer> list = new ArrayList<>();
            
            while (rs.next()) {
                switch (rs.getString(1)) { 
                    case "Compra":
                        compra = rs.getInt(2);
                     break;
                    case "Compra Fuerte":
                        compraF = rs.getInt(2);
                     break;
                    case "Neutral":
                        neutral = rs.getInt(2);
                     break;
                    case "Venta":
                        venta = rs.getInt(2);
                     break;
                    case "Venta Fuerte":
                        ventaF = rs.getInt(2);
                     break;                        
                    default:
                     // Default secuencia de sentencias.
                  }                
            }
            list.add(ventaF);
            list.add(venta);
            list.add(neutral);
            list.add(compra);
            list.add(compraF);
            return list;
            
        } catch (SQLException e) {
            if(e.getMessage().equals("No se pudo conectar a la base de datos")){
                throw e;
            }else{
                throw new SQLException("Error al consultar el pronostico general");
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
