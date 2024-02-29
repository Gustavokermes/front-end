package br.com.gustavo;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import br.com.gustavo.dto.EntradaSimuladorDto;
import br.com.gustavo.dto.ParcelasDto;
import br.com.gustavo.dto.ResultadoSimulacaoDto;
import br.com.gustavo.dto.RetornoSimulacaoDto;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;

@Path("/simulador")
public class SimuladorResource {
    @POST
    public RetornoSimulacaoDto simular(EntradaSimuladorDto entrada) {
        String connectionUrl = "jdbc:sqlserver://dbhackathon.database.windows.net:1433;databaseName=hack;user=hack;password=Password23";
        RetornoSimulacaoDto retornoSimulacao = new RetornoSimulacaoDto();
    
        try (Connection con = DriverManager.getConnection(connectionUrl); Statement stmt = con.createStatement();) {
            Integer prazo = entrada.getPrazo();
            Integer codigoProduto;
            if( prazo != null){
            if (prazo >= 0 && prazo <= 24) {
                codigoProduto = 1;
            } else if (prazo >= 25 && prazo <= 48) {
                codigoProduto = 2;
            } else if (prazo >= 49 && prazo<= 96) {
                codigoProduto = 3;
            } else {
                codigoProduto = 4;
            }
        
            String SQL = "SELECT * FROM dbo.PRODUTO WHERE CO_PRODUTO = " + codigoProduto;
        
            ResultSet rs = stmt.executeQuery(SQL);
            
            while (rs.next()) {
                Double valorTotal = rs.getDouble("VR_MAXIMO");
                Double taxaJuros = rs.getDouble("PC_TAXA_JUROS");
        
                // Configurar o produto na simulação
                retornoSimulacao.setCodigoProduto(codigoProduto);
                retornoSimulacao.setDescricaoProduto(rs.getString("NO_PRODUTO"));
                retornoSimulacao.setTaxaJuros(taxaJuros);
        
                // Obter valores da entrada do usuário
                Double valorDesejado = entrada.getValorDesejado();
                taxaJuros = retornoSimulacao.getTaxaJuros();
        
                // Calcular o valor total desejado considerando a taxa de juros
                valorTotal = valorDesejado + (valorDesejado * taxaJuros);
        
                // Criar uma lista para armazenar os resultados das simulações
                List<ResultadoSimulacaoDto> resultadoSimulacao = new ArrayList<>();
        
                // Calcular parcelas usando o método SAC
                resultadoSimulacao.add(criarResultadoSimulacao("SAC", calcularParcelasSAC(prazo, valorTotal, taxaJuros)));
        
                // Calcular parcelas usando o método PRICE
                resultadoSimulacao.add(criarResultadoSimulacao("PRICE", calcularParcelasPrice(prazo, valorTotal, taxaJuros)));
        
                // Configurar os resultados na simulação
                retornoSimulacao.setResultadoSimulacao(resultadoSimulacao);
            }
        }
    }
        catch (SQLException e) {
            e.printStackTrace();
        }
        
        return retornoSimulacao;
    }        
        
    
    private static ResultadoSimulacaoDto criarResultadoSimulacao(String tipo, List<ParcelasDto> parcelas) {
        ResultadoSimulacaoDto resultado = new ResultadoSimulacaoDto();
        resultado.setTipo(tipo);
        resultado.setParcelas(parcelas);
        return resultado;
    }
    

    private List<ParcelasDto> calcularParcelasSAC(Integer prazo, Double valorTotal, Double taxaJuros) {
        List<ParcelasDto> parcelas = new ArrayList<>();

        Double valorAmortizacao = valorTotal / prazo;
        
        for (Integer i = 0; i < prazo; i++) {
            Double valorJuros = valorTotal * taxaJuros;
            Double prestacao = valorAmortizacao + valorJuros;
            ParcelasDto parcela = new ParcelasDto();
            parcela.setNumero(i + 1 );
            parcela.setValorAmortizacao(Math.round(valorAmortizacao * 100.0) / 100.0);
            parcela.setValorJuros(Math.round(valorJuros * 100.0) / 100.0);
            parcela.setValorPrestacao(Math.round(prestacao * 100.0) / 100.0);
            parcelas.add(parcela);
    
            // Atualizar o valor total
            valorTotal -= valorAmortizacao;
        }
        return parcelas;
    }
    
    private List<ParcelasDto> calcularParcelasPrice(Integer prazo, Double valorTotal, Double taxaJuros) {
        List<ParcelasDto> parcelas = new ArrayList<>();

        Double prestacao = (valorTotal * taxaJuros) / (1 - Math.pow(1 + taxaJuros, -prazo));
        
        for (int i = 0; i < prazo; i++) {
            Double valorJuros = valorTotal * taxaJuros;
            Double valorAmortizacao = prestacao - valorJuros;
            ParcelasDto parcela = new ParcelasDto();
            parcela.setNumero(i+1);       
            parcela.setValorAmortizacao(Math.round(valorAmortizacao * 100.0) / 100.0);
            parcela.setValorJuros(Math.round(valorJuros * 100.0) / 100.0);
            parcela.setValorPrestacao(Math.round(prestacao * 100.0) / 100.0);

            parcelas.add(parcela);
    
            // Atualizar o valor total
            valorTotal -= valorAmortizacao;
        }
        return parcelas;
    }
}



  