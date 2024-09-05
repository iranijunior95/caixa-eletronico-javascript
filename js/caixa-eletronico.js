(function() {
    const contaPrincipal = { titular: 'Usuario Pessoa', agencia: '0033', conta: '0122-0', senha: '12345', saldo: '500,00', historico: [] };

    const listaContas = [
        { titular: 'Jose Antonio', agencia: '0033', conta: '0123-0', saldo: '100,00' },
        { titular: 'Maria Fernanda', agencia: '0033', conta: '0124-0', saldo: '200,00' },
        { titular: 'Marcos Almeida', agencia: '0033', conta: '0125-0', saldo: '300,00' }
    ];

    function saldo() {
        return `R$ ${contaPrincipal.saldo}`;
    }

    function extrato() {
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

    function buscarConta(agencia, conta) {
        if(contaPrincipal.agencia !== agencia & listaContas.findIndex((con) => con.agencia === agencia) === -1) {
            console.log('agencia não localizada');
            return;
        }
        
        if(contaPrincipal.conta !== conta & listaContas.findIndex((con) => con.conta === conta) === -1) {
            console.log('conta não localizada');
            return;
        }

        const indexContaSelecionada = listaContas.findIndex((con) => con.agencia === agencia & con.conta === conta);

        if (indexContaSelecionada === -1) {
            return { 
                index: indexContaSelecionada,
                titular: contaPrincipal.titular, 
                agencia: contaPrincipal.agencia, 
                conta: contaPrincipal.conta 
            };
        }else {
            return { 
                index: indexContaSelecionada,
                titular: listaContas[indexContaSelecionada].titular, 
                agencia: listaContas[indexContaSelecionada].agencia, 
                conta: listaContas[indexContaSelecionada].conta 
            };
        }
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
        saldo,
        extrato,
        buscarConta
    };
})();