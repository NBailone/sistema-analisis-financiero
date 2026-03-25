
package modelo;

import java.sql.Timestamp;

public class Accion {
    private String simbolo;
    private String descripcion;
    private Double cotizacion;
    private Double variacion;
    private Double apertura;
    private Double maximo;
    private Double minimo;
    private Double ultimo_cierre;
    private Double cant_oper;
    private IndicadoresAccion Pronostico;
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

    public Double getCotizacion() {
        return cotizacion;
    }

    public void setCotizacion(Double cotizacion) {
        this.cotizacion = cotizacion;
    }

    public Double getVariacion() {
        return variacion;
    }

    public void setVariacion(Double variacion) {
        this.variacion = variacion;
    }

    public Double getApertura() {
        return apertura;
    }

    public void setApertura(Double Apertura) {
        this.apertura = Apertura;
    }


    public Double getMaximo() {
        return maximo;
    }

    public void setMaximo(Double maximo) {
        this.maximo = maximo;
    }

    public Double getMinimo() {
        return minimo;
    }

    public void setMinimo(Double minimo) {
        this.minimo = minimo;
    }
    
    public Double getUltimo_cierre() {
        return ultimo_cierre;
    }

    public void setUltimo_cierre(Double ultimo_cierre) {
        this.ultimo_cierre = ultimo_cierre;
    }

    public Double getCant_oper() {
        return cant_oper;
    }

    public void setCant_oper(Double cant_oper) {
        this.cant_oper = cant_oper;
    }

    public Timestamp getFecha() {
        return fecha;
    }

    public IndicadoresAccion getPronostico() {
        return Pronostico;
    }

    public void setPronostico(IndicadoresAccion Pronostico) {
        this.Pronostico = Pronostico;
    }

    
    public void setFecha(Timestamp fecha) {
        this.fecha = fecha;
    }



    
}
