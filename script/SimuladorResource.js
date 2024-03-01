import { Produto } from "./Produto.js";
import { ResultadoSimulacaoDto } from "./ResultadoSimulacaoDto.js";
import { RetornoSimulacaoDto } from "./RetornoSimulacaoDto.js";

const { calcularParcelasSAC, calcularParcelasPrice } = require('./calculoParcelas');
async function simular(entrada) {
  const { prazo, valorDesejado } = entrada;
  const codigoProduto = getCodigoProduto(prazo);
  const produto = await getProduto(codigoProduto);

  const taxaJuros = produto.PC_TAXA_JUROS;
  const valorTotal = valorDesejado + (valorDesejado * taxaJuros);

  const resultadoSimulacao = [];
  resultadoSimulacao.push(criarResultadoSimulacao('SAC', calcularParcelasSAC(prazo, valorTotal, taxaJuros)));
  resultadoSimulacao.push(criarResultadoSimulacao('PRICE', calcularParcelasPrice(prazo, valorTotal, taxaJuros)));

  const resultadoSimulacaoDto = new RetornoSimulacaoDto();
  resultadoSimulacaoDto.codigoProduto = produto.CO_PRODUTO;
  resultadoSimulacaoDto.descricaoProduto = produto.NO_PRODUTO;
  resultadoSimulacaoDto.taxaJuros = taxaJuros;
  resultadoSimulacaoDto.valorTotal = valorTotal;
  resultadoSimulacaoDto.resultadoSimulacao = resultadoSimulacao;

  return resultadoSimulacaoDto;
}
function getCodigoProduto(prazo) {
  if (prazo >= 0 && prazo <= 24) {
    return 1;
  } else if (prazo >= 25 && prazo <= 48) {
    return 2;
  } else if (prazo >= 49 && prazo <= 96) {
    return 3;
  } else {
    return 4;
  }
}

async function getProduto(codigoProduto) {
  // Implementar lógica para obter o produto da API com base no código
  const response = await fetch(`https://apphackaixades.azurewebsites.net/api/Simulacao/GetProduto/${codigoProduto}`);
  const produto = await response.json();
  return produto;
}

function criarResultadoSimulacao(tipo, parcelas) {
  return {
    tipo,
    parcelas,
  };
}
/*
async function simularEmprestimo(entrada) {
  const resultadoSimulacaoDto = await simular(entrada);

  // Converter o objeto para JSON
  const jsonData = JSON.stringify(resultadoSimulacaoDto);

  // Fazer a requisição
  const response = await fetch(urlAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonData,
  });

  // Tratar a resposta
  if (response.ok) {
    const data = await response.json();
    console.log('Resultado da simulação:', data);
  } else {
    console.error('Erro ao enviar dados para a API:', response.statusText);
  }
}
*/

function criarResultadoSimulacao(tipo, parcelas) {
  const resultado = new ResultadoSimulacaoDto();
  resultado.tipo = tipo;
  resultado.parcelas = parcelas;
  return resultado;
}
function calcularParcelasSAC(prazo, valorTotal, taxaJuros) {
  const parcelas = [];
  const valorAmortizacao = valorTotal / prazo;

  for (let i = 0; i < prazo; i++) {
    const valorJuros = valorTotal * taxaJuros;
    const prestacao = valorAmortizacao + valorJuros;
    const parcela = new ParcelasDto();
    parcela.numero = i + 1;
    parcela.valorAmortizacao = Math.round(valorAmortizacao * 100) / 100;
    parcela.valorJuros = Math.round(valorJuros * 100) / 100;
    parcela.valorPrestacao = Math.round(prestacao * 100) / 100;
    parcelas.push(parcela);

    // Atualizar o valor total
    valorTotal -= valorAmortizacao;
  }

  return parcelas;
}
function calcularParcelasPrice(prazo, valorTotal, taxaJuros) {
  const parcelas = [];
  const prestacao = (valorTotal * taxaJuros) / (1 - Math.pow(1 + taxaJuros, -prazo));

  for (let i = 0; i < prazo; i++) {
    const valorJuros = valorTotal * taxaJuros;
    const valorAmortizacao = prestacao - valorJuros;
    const parcela = new ParcelasDto();
    parcela.numero = i + 1;
    parcela.valorAmortizacao = Math.round(valorAmortizacao * 100) / 100;
    parcela.valorJuros = Math.round(valorJuros * 100) / 100;
    parcela.valorPrestacao = Math.round(prestacao * 100) / 100;
    parcelas.push(parcela);

    // Atualizar o valor total
    valorTotal -= valorAmortizacao;
  }

  return parcelas;
}

