(function() {
    const contaPrincipal = { titular: 'Usuario Pessoa', agencia: '0033', conta: '0122-0', senha: '12345', saldo: '500,00', historico: [] };

    const listaContas = [
        { titular: 'Jose Antonio', agencia: '0033', conta: '0123-0', saldo: '100,00' },
        { titular: 'Maria Fernanda', agencia: '0033', conta: '0124-0', saldo: '200,00' },
        { titular: 'Marcos Almeida', agencia: '0033', conta: '0125-0', saldo: '300,00' }
    ];

    function consultarSaldo() {
        return `R$ ${contaPrincipal.saldo}`;
    }

    function consultarExtrato() {
        return {
            dataExtrato: retornaDataHoraAtual().data,
            horaExtrato: retornaDataHoraAtual().hora,
            agencia: contaPrincipal.agencia,
            conta: contaPrincipal.conta,
            titular: contaPrincipal.titular,
            saldoAtual: contaPrincipal.saldo,
            historico: contaPrincipal.historico
        };
    }
    
    //Funções auxiliares
    function retornaDataHoraAtual() {
        const dataHoraAtual = new Date().toLocaleString();

        return {
            data: dataHoraAtual.split(',')[0],
            hora: dataHoraAtual.split(',')[1]
        }; 
    }

    window.caixaEletronico = {
        consultarSaldo,
        consultarExtrato
    };
})();