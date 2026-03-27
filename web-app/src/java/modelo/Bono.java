
package modelo;

import java.sql.Timestamp;

public class Bono {

    private String simbolo;
    private String descripcion;
    private double cotizacion;
    private double apertura;
    private double maximo;
    private double minimo;
    private double volumen;
    private double variacion;
    private double ultimo_cierre;
    private Timestamp fecha;

    public String getSimbolo() {
        return simbolo;
    }

    public void setSimbolo(String simbolo) {
        this.simbolo = simbolo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getCotizacion() {
        return cotizacion;
    }

    public void setCotizacion(double cotizacion) {
        this.cotizacion = cotizacion;
    }

    public double getApertura() {
        return apertura;
    }

    public void setApertura(double apertura) {
        this.apertura = apertura;
    }

    public double getMaximo() {
        return maximo;
    }

    public void setMaximo(double maximo) {
        this.maximo = maximo;
    }

    public double getMinimo() {
        return minimo;
    }

    public void setMinimo(double minimo) {
        this.minimo = minimo;
    }

    public double getVolumen() {
        return volumen;
    }

    public void setVolumen(double volumen) {
        this.volumen = volumen;
    }

    public double getVariacion() {
        return variacion;
    }

    public void setVariacion(double variacion) {
        this.variacion = variacion;
    }

    public double getUltimo_cierre() {
        return ultimo_cierre;
    }

    public void setUltimo_cierre(double ultimo_cierre) {
        this.ultimo_cierre = ultimo_cierre;
    }


    public Timestamp getFecha() {
        return fecha;
    }

    public void setFecha(Timestamp fecha) {
        this.fecha = fecha;
    }
    
    
    
    
}
