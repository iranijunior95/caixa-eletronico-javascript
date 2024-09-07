(function() {
    const contaPrincipal = { titular: 'Usuario Pessoa', agencia: '0033', conta: '0122-0', senha: '1234', saldo: '500.00', historico: [] };

    const listaContas = [
        { titular: 'Jose Antonio', agencia: '0033', conta: '0123-0', saldo: '100.00' },
        { titular: 'Maria Fernanda', agencia: '0033', conta: '0124-0', saldo: '200.00' },
        { titular: 'Marcos Almeida', agencia: '0033', conta: '0125-0', saldo: '300.00' }
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

    function retornaListaDeContas() {
        return {
            contaPrincipal: contaPrincipal,
            listaContas: listaContas
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
                conta: contaPrincipal.conta,
                saldo: contaPrincipal.saldo  
            };
        }else {
            return { 
                index: indexContaSelecionada,
                titular: listaContas[indexContaSelecionada].titular, 
                agencia: listaContas[indexContaSelecionada].agencia, 
                conta: listaContas[indexContaSelecionada].conta,
                saldo: listaContas[indexContaSelecionada].saldo  
            };
        }
    }

    function depositar(idConta, valor) {
        if(valor === '' || valor === undefined || valor === 0 || valor === '0') {
            console.log('valor invalido');
            return;
        }

        if(idConta === -1) {
            contaPrincipal.saldo = String(parseFloat(contaPrincipal.saldo) + parseFloat(valor));
        }else {
            listaContas[idConta].saldo = String(parseFloat(listaContas[idConta].saldo) + parseFloat(valor));
        }

        return idConta === -1 ? contaPrincipal.saldo : listaContas[idConta].saldo;
    }

    function transferir(idContaDestino, valor) {
        if(valor === '' || valor === undefined || valor === 0 || valor === '0') {
            console.log('valor invalido');
            return;
        }

        if(idContaDestino !== -1) {
            listaContas[idContaDestino].saldo = String(parseFloat(listaContas[idContaDestino].saldo) + parseFloat(valor));
        }

        return listaContas[idContaDestino].saldo;
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
        retornaListaDeContas,
        buscarConta,
        depositar,
        transferir
    };
})();