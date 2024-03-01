const { calcularParcelasSAC, calcularParcelasPrice } = require('./calculoParcelas');

async function simularEmprestimo(entrada) {
  const { prazo, valorDesejado } = entrada;
  const codigoProduto = getCodigoProduto(prazo);
  const produto = await getProduto(codigoProduto);

  const taxaJuros = produto.PC_TAXA_JUROS;
  const valorTotal = valorDesejado + (valorDesejado * taxaJuros);

  const resultadoSimulacao = [];
  resultadoSimulacao.push(criarResultadoSimulacao('SAC', calcularParcelasSAC(prazo, valorTotal, taxaJuros)));
  resultadoSimulacao.push(criarResultadoSimulacao('PRICE', calcularParcelasPrice(prazo, valorTotal, taxaJuros)));

  return {
    codigoProduto: produto.CO_PRODUTO,
    descricaoProduto: produto.NO_PRODUTO,
    taxaJuros,
    valorTotal,
    resultadoSimulacao,
  };
}

async function main() {
  const entrada = {
    prazo: 36,
    valorDesejado: 10000,
  };

  const resultado = await simularEmprestimo(entrada);
  console.log('Resultado da simulação:', resultado);
}

main();
function criarResultadoSimulacaoDto(tipo, parcelas) {
    return {
      tipo,
      parcelas,
    };
  }
  function calcularParcelasSAC(prazo, valorTotal, taxaJuros) {
    const parcelas = [];
    const valorAmortizacao = valorTotal / prazo;
  
    for (let i = 0; i < prazo; i++) {
      const valorJuros = valorTotal * taxaJuros;
      const prestacao = valorAmortizacao + valorJuros;
  
      parcelas.push({
        numero: i + 1,
        valorAmortizacao: Math.round(valorAmortizacao * 100) / 100,
        valorJuros: Math.round(valorJuros * 100) / 100,
        valorPrestacao: Math.round(prestacao * 100) / 100,
      });
  
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
  
      parcelas.push({
        numero: i + 1,
        valorAmortizacao: Math.round(valorAmortizacao * 100) / 100,
        valorJuros: Math.round(valorJuros * 100) / 100,
        valorPrestacao: Math.round(prestacao * 100) / 100,
      });
  
      // Atualizar o valor total
      valorTotal -= valorAmortizacao;
    }
  
    return parcelas;
  }
      