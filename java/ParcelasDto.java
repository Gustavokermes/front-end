package br.com.gustavo.dto;

public class ParcelasDto {
    public ParcelasDto(){

    }

    private Integer numero;
    private Double valorAmortizacao;
    private Double valorJuros;
    private Double valorPrestacao;

    public void setNumero(Integer numero){
        this.numero = numero;

    }
    public Integer getNumero(){
        return this.numero;

    }

    public void setValorAmortizacao(Double valorAmortizacao){
        this.valorAmortizacao = valorAmortizacao;
    
    }
    public Double getValorAmortizacao(){
        return this.valorAmortizacao;

    }

    public void setValorJuros(Double valorJuros){
        this.valorJuros = valorJuros;
    }
    public Double getValorJuros(){
        return this.valorJuros;
    }

    public void setValorPrestacao(Double valorPrestacao){
        this.valorPrestacao = valorPrestacao;

    }
    public Double getValorPrestacao(){
        return this.valorPrestacao;
    }
    
}
