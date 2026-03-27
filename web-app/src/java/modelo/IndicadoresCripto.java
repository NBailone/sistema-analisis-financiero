package modelo;

import java.sql.Timestamp;

public class IndicadoresCripto {
    private String simbolo;
    private Double macd;
    private String pronMacd;
    private Double rsi;
    private String pronRsi;
    private Double cmm20;
    private String proncmm2;
    private Double roc;
    private String pronRoc;
    private int total;
    private String pronostico;
    private Timestamp feha;  

    public String getSimbolo() {
        return simbolo;
    }

    public void setSimbolo(String simbolo) {
        this.simbolo = simbolo;
    }

    public Double getMacd() {
        return macd;
    }

    public void setMacd(Double macd) {
        this.macd = macd;
    }

    public String getPronMacd() {
        return pronMacd;
    }

    public void setPronMacd(String pronMacd) {
        this.pronMacd = pronMacd;
    }

    public Double getRsi() {
        return rsi;
    }

    public void setRsi(Double rsi) {
        this.rsi = rsi;
    }

    public String getPronRsi() {
        return pronRsi;
    }

    public void setPronRsi(String pronRsi) {
        this.pronRsi = pronRsi;
    }

    public Double getCmm20() {
        return cmm20;
    }

    public void setCmm20(Double cmm20) {
        this.cmm20 = cmm20;
    }

    public String getProncmm2() {
        return proncmm2;
    }

    public void setProncmm2(String proncmm2) {
        this.proncmm2 = proncmm2;
    }

    public Double getRoc() {
        return roc;
    }

    public void setRoc(Double roc) {
        this.roc = roc;
    }

    public String getPronRoc() {
        return pronRoc;
    }

    public void setPronRoc(String pronRoc) {
        this.pronRoc = pronRoc;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String getPronostico() {
        return pronostico;
    }

    public void setPronostico(String pronostico) {
        this.pronostico = pronostico;
    }

    public Timestamp getFeha() {
        return feha;
    }

    public void setFeha(Timestamp feha) {
        this.feha = feha;
    }
    
    
    
    
}
