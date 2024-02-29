package br.com.gustavo.dto;

import java.util.List;

public class RetornoSimulacaoDto {
    public RetornoSimulacaoDto() {

    }
    
    private Integer codigoProduto;
    private String descricaoProduto;
    private Double taxaJuros;
    private List<ResultadoSimulacaoDto> resultadoSimulacao;

    public void setCodigoProduto(Integer codigoProduto){
        this.codigoProduto = codigoProduto;

    }
    public Integer getCodigoProduto(){
        return this.codigoProduto;
    }

    public void setDescricaoProduto(String descricaoProduto) {
        this.descricaoProduto = descricaoProduto;

    }
    public String getDescricaoProduto() {
        return this.descricaoProduto;
    }

    public void setTaxaJuros(Double taxaJuros) {
        this.taxaJuros = taxaJuros;
    }
    public Double getTaxaJuros(){
        return this.taxaJuros;
    }

    public void setResultadoSimulacao(List<ResultadoSimulacaoDto> resultadoSimulacaoDtos){
        this.resultadoSimulacao = resultadoSimulacaoDtos;

    }
    public List<ResultadoSimulacaoDto> getResultadoSimulacao(){
        return this.resultadoSimulacao;
        
    }
    
}
