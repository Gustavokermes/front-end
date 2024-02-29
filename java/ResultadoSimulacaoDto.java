package br.com.gustavo.dto;

import java.util.List;

public class ResultadoSimulacaoDto {
    public ResultadoSimulacaoDto (){

    }
    private String tipo;
    private List<ParcelasDto> parcelas;
    
    public void setTipo(String tipo){
        this.tipo = tipo;

    }
    public String getTipo(){
        return this.tipo;

    }

    public void setParcelas(List<ParcelasDto> parcelas){
        this.parcelas = parcelas;
    }
    public List<ParcelasDto> getParcelas(){
        return this.parcelas;

    }
  
    

}
