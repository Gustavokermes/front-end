class EntradaSimuladorDto {
    constructor() {
      this.valorDesejado = null;
      this.prazo = null;
    }
  
    setValorDesejado(valorDesejado) {
      this.valorDesejado = valorDesejado;
    }
  
    getValorDesejado() {
      return this.valorDesejado;
    }
  
    setPrazo(prazo) {
      this.prazo = prazo;
    }
  
    getPrazo() {
      return this.prazo;
    }
  }
  