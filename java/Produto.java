package br.com.gustavo.dto;

public class Produto {
    private int CO_PRODUTO;
    private String NO_PRODUTO;
    private double PC_TAXA_JUROS;
    private int NU_MINIMO_MESES;
    private int NU_MAXIMO_MESES;
    private double VR_MINIMO;
    private double VR_MAXIMO;

    // Métodos getters
    public int getCO_PRODUTO() {
        return CO_PRODUTO;
    }

    public String getNO_PRODUTO() {
        return NO_PRODUTO;
    }

    public double getPC_TAXA_JUROS() {
        return PC_TAXA_JUROS;
    }

    public int getNU_MINIMO_MESES() {
        return NU_MINIMO_MESES;
    }

    public int getNU_MAXIMO_MESES() {
        return NU_MAXIMO_MESES;
    }

    public double getVR_MINIMO() {
        return VR_MINIMO;
    }

    public double getVR_MAXIMO() {
        return VR_MAXIMO;
    }

    // Métodos setters
    public void setCO_PRODUTO(int CO_PRODUTO) {
        this.CO_PRODUTO = CO_PRODUTO;
    }

    public void setNO_PRODUTO(String NO_PRODUTO) {
        this.NO_PRODUTO = NO_PRODUTO;
    }

    public void setPC_TAXA_JUROS(double PC_TAXA_JUROS) {
        this.PC_TAXA_JUROS = PC_TAXA_JUROS;
    }

    public void setNU_MINIMO_MESES(int NU_MINIMO_MESES) {
        this.NU_MINIMO_MESES = NU_MINIMO_MESES;
    }

    public void setNU_MAXIMO_MESES(int NU_MAXIMO_MESES) {
        this.NU_MAXIMO_MESES = NU_MAXIMO_MESES;
    }

    public void setVR_MINIMO(double VR_MINIMO) {
        this.VR_MINIMO = VR_MINIMO;
    }

    public void setVR_MAXIMO(double VR_MAXIMO) {
        this.VR_MAXIMO = VR_MAXIMO;
    }
}