class Produto {
    constructor(
      CO_PRODUTO,
      NO_PRODUTO,
      PC_TAXA_JUROS,
      NU_MINIMO_MESES,
      NU_MAXIMO_MESES,
      VR_MINIMO,
      VR_MAXIMO
    ) {
      this._CO_PRODUTO = CO_PRODUTO;
      this._NO_PRODUTO = NO_PRODUTO;
      this._PC_TAXA_JUROS = PC_TAXA_JUROS;
      this._NU_MINIMO_MESES = NU_MINIMO_MESES;
      this._NU_MAXIMO_MESES = NU_MAXIMO_MESES;
      this._VR_MINIMO = VR_MINIMO;
      this._VR_MAXIMO = VR_MAXIMO;
    }
  
    // Getters
    get CO_PRODUTO() {
      return this._CO_PRODUTO;
    }
  
    get NO_PRODUTO() {
      return this._NO_PRODUTO;
    }
  
    get PC_TAXA_JUROS() {
      return this._PC_TAXA_JUROS;
    }
  
    get NU_MINIMO_MESES() {
      return this._NU_MINIMO_MESES;
    }
  
    get NU_MAXIMO_MESES() {
      return this._NU_MAXIMO_MESES;
    }
  
    get VR_MINIMO() {
      return this._VR_MINIMO;
    }
  
    get VR_MAXIMO() {
      return this._VR_MAXIMO;
    }
  
    // Setters
    set CO_PRODUTO(CO_PRODUTO) {
      this._CO_PRODUTO = CO_PRODUTO;
    }
  
    set NO_PRODUTO(NO_PRODUTO) {
      this._NO_PRODUTO = NO_PRODUTO;
    }
  
    set PC_TAXA_JUROS(PC_TAXA_JUROS) {
      this._PC_TAXA_JUROS = PC_TAXA_JUROS;
    }
  
    set NU_MINIMO_MESES(NU_MINIMO_MESES) {
      this._NU_MINIMO_MESES = NU_MINIMO_MESES;
    }
  
    set NU_MAXIMO_MESES(NU_MAXIMO_MESES) {
      this._NU_MAXIMO_MESES = NU_MAXIMO_MESES;
    }
  
    set VR_MINIMO(VR_MINIMO) {
      this._VR_MINIMO = VR_MINIMO;
    }
  
    set VR_MAXIMO(VR_MAXIMO) {
      this._VR_MAXIMO = VR_MAXIMO;
    }
  }
  