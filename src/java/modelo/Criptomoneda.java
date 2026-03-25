package modelo;

import java.sql.Timestamp;


public class Criptomoneda {
    private String simbolo;
    private String descripcion;
    private Double cotizacionArg;
    private Double cotizacionUsd;
    private Double cotizacionEur;
    private IndicadoresCripto Pronostico;
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

    public Double getCotizacionArg() {
        return cotizacionArg;
    }

    public void setCotizacionArg(Double cotizacionArg) {
        this.cotizacionArg = cotizacionArg;
    }

    public Double getCotizacionUsd() {
        return cotizacionUsd;
    }

    public void setCotizacionUsd(Double cotizacionUsd) {
        this.cotizacionUsd = cotizacionUsd;
    }

    public Double getCotizacionEur() {
        return cotizacionEur;
    }

    public void setCotizacionEur(Double cotizacionEur) {
        this.cotizacionEur = cotizacionEur;
    }

    public IndicadoresCripto getPronostico() {
        return Pronostico;
    }

    public void setPronostico(IndicadoresCripto Pronostico) {
        this.Pronostico = Pronostico;
    }

    public Timestamp getFecha() {
        return fecha;
    }

    public void setFecha(Timestamp fecha) {
        this.fecha = fecha;
    }

    
}
