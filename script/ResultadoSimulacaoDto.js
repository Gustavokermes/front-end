class ResultadoSimulacaoDto {
    constructor() {
      this.tipo = null;
      this.parcelas = []; // Use an array to represent the list of ParcelasDto
    }
  
    setTipo(tipo) {
      this.tipo = tipo;
    }
  
    getTipo() {
      return this.tipo;
    }
  
    setParcelas(parcelas) {
      this.parcelas = parcelas;
    }
  
    getParcelas() {
      return this.parcelas;
    }
  }
  