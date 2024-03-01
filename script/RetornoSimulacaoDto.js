class RetornoSimulacaoDto {
    constructor() {
      this._codigoProduto = null;
      this._descricaoProduto = null;
      this._taxaJuros = null;
      this._resultadoSimulacao = []; // Use an array for the list of ResultadoSimulacaoDto
    }
  
    // Getters
    get codigoProduto() {
      return this._codigoProduto;
    }
  
    get descricaoProduto() {
      return this._descricaoProduto;
    }
  
    get taxaJuros() {
      return this._taxaJuros;
    }
  
    get resultadoSimulacao() {
      return this._resultadoSimulacao;
    }
  
    // Setters
    set codigoProduto(codigoProduto) {
      this._codigoProduto = codigoProduto;
    }
  
    set descricaoProduto(descricaoProduto) {
      this._descricaoProduto = descricaoProduto;
    }
  
    set taxaJuros(taxaJuros) {
      this._taxaJuros = taxaJuros;
    }
  
    set resultadoSimulacao(resultadoSimulacao) {
      this._resultadoSimulacao = resultadoSimulacao;
    }
  }

