// Função para calcular o empréstimo
async function calcularEmprestimo() {
    // Obter valores de entrada do formulário
    var valorEmprestimo = parseFloat(document.getElementById('valorEmprestimo').value);
    var prazoMeses = parseInt(document.getElementById('prazoMeses').value);

    // Verificar se os campos de entrada estão vazios
    if (isNaN(valorEmprestimo) || isNaN(prazoMeses)) {
        alert("Por favor, preencha todos os campos antes de calcular.");
        return;
    }

    // Mostrar a animação de carregamento
    document.getElementById('loader').style.display = 'block';

    // Preparar dados para envio
    var dados = {
        valorDesejado: valorEmprestimo,
        prazo: prazoMeses
    };
    async function conectarBancoDados() {
        try {
            // configuração da conexão
            const config = {
                user: 'hack',
                password: 'Password23',
                server: 'dbhackathon.database.windows.net',
                database: 'hack',
                options: {
                    encrypt: true,
                    enableArithAbort: true
                }
            };
    
            // estabelecer uma conexão com o banco de dados
            await sql.connect(config);
    
            // agora você pode executar consultas SQL
            const result = await sql.query`SELECT * FROM Tabela`;
    
            console.log(result);
        } catch (err) {
            console.error(err);
        }
    }
    

    // Esconder a animação de carregamento
    document.getElementById('loader').style.display = 'none';

    // Verificar se a solicitação foi bem-sucedida
    if (response.ok) {
        const resultado = await response.json();

        // Exibir o resultado
        var elementoResultado = document.getElementById('resultado');
        elementoResultado.innerHTML = `<p>Descrição do Produto: ${resultado.descricaoProduto}</p>`;
        elementoResultado.innerHTML += `<p>Taxa de Juros: ${resultado.taxaJuros}%</p>`;

        // Exibir as parcelas do empréstimo
        resultado.resultadoSimulacao.forEach(function (tipo) {
            elementoResultado.innerHTML += `<h3>${tipo.tipo}</h3>`;

            tipo.parcelas.forEach(function (parcela) {
                elementoResultado.innerHTML += `<p>Parcela ${parcela.numero}:<br>
                Amortização: R$ ${parcela.valorAmortizacao.toFixed(2)}<br>
                Juros: R$ ${parcela.valorJuros.toFixed(2)}<br>
                Prestação: R$ ${parcela.valorPrestacao.toFixed(2)}</p>`;
            });
        });
    } else {
        // Se a solicitação falhar, exibir uma mensagem de erro
        elementoResultado.innerHTML = `<p>Ocorreu um erro ao calcular o empréstimo.</p>`;
    }
}
