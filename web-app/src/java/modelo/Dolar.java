
package modelo;

import java.sql.Timestamp;

public class Dolar {
    private String simbolo;
    private Double compra;
    private Double venta;
    private int agencia;
    private Timestamp fecha;  

    public String getSimbolo() {
        return simbolo;
    }

    public void setSimbolo(String simbolo) {
        this.simbolo = simbolo;
    }

    public Double getCompra() {
        return compra;
    }

    public void setCompra(Double compra) {
        this.compra = compra;
    }

    public Double getVenta() {
        return venta;
    }

    public void setVenta(Double venta) {
        this.venta = venta;
    }

    public int getAgencia() {
        return agencia;
    }

    public void setAgencia(int agencia) {
        this.agencia = agencia;
    }

    public Timestamp getFecha() {
        return fecha;
    }

    public void setFecha(Timestamp fecha) {
        this.fecha = fecha;
    }
    
    
}
