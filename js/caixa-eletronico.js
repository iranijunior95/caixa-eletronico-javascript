(function() {
    const configuracoesCaixa = {
        tela: 'telaInicial',
        clientePrincipal: {titular: 'Usuario Silva', senha: '6789', saldo: '1.000,00'},
        dadosContas: [
            {agencia: '001-1', conta: '12345-0', titular: 'Francisco Junior', saldo: '1.000,00'},
            {agencia: '001-1', conta: '67890-0', titular: 'Maria de Fatima', saldo: '1.000,00'},
            {agencia: '001-1', conta: '54321-0', titular: 'Isaac Netero', saldo: '1.000,00'}
        ]
    };

    function renderizarTela(tela = '') {
        const $telaCaixa = document.querySelector('#tela-caixa');

        if(tela === '' & configuracoesCaixa.tela === 'telaInicial') {
            $telaCaixa.innerHTML = `<div id="tela-caixa-vazia">
                                        <p>CAIXA ELETRÔNICO</p>
                                        <P>JAVASCRIPT</P>
                                    </div>`;
        }else {
            $telaCaixa.innerHTML = tela;
        }
    }

    function capturaAcoesBtns() {
        const $btns = document.querySelectorAll('button');
    
        $btns.forEach(($btn) => {
            $btn.addEventListener('click', (event) => {
                if(event.target.innerHTML === '.') {
                    return;
                }

                identificaOperacoesCaixa(event.target.innerHTML);
            });
        });
    }

    function identificaOperacoesCaixa(btnPressionado) {

        switch (configuracoesCaixa.tela) {
            case 'telaInicial':
                
                //Navega para tela de Operações
                if(btnPressionado === 'func1' || btnPressionado === 'func2' || btnPressionado === 'func3' || btnPressionado === 'func4' || 
                    btnPressionado === 'func5' || btnPressionado === 'func6' || btnPressionado === 'func7' || btnPressionado === 'func8') {

                    const tela = `<div id="tela-caixa-operacoes">
                                        <h1>TELA DE OPERAÇÕES</h1>

                                        <div>
                                            <div></div>

                                            <div>
                                                <div><p>SALDO & EXTRATO</p></div>
                                                <div><p>DEPÓSITOS</p></div>
                                                <div><p>TRANSFERÊNCIAS</p></div>
                                                <div><p>SAQUES</p></div>
                                            </div>
                                        </div>
                                    </div>`;
            
                    renderizarTela(tela);
                    configuracoesCaixa.tela = 'telaDeOperacoes';
                }

                break;

            case 'telaDeOperacoes':

                //Navega para tela de Saldo & Extrato
                if(btnPressionado === 'func5') {
                    const tela = `<div id="tela-caixa-saldo-extrato">
                                        <h1>SALDO & EXTRATO</h1>

                                        <div>
                                            <div></div>

                                            <div>
                                                <div><p>SALDO</p></div>
                                                <div><p>EXTRATO</p></div>
                                            </div>
                                        </div>
                                    </div>`;
            
                    renderizarTela(tela);
                    configuracoesCaixa.tela = 'telaSaldoExtrato';
                }

                //Navega para tela de Depositos
                if(btnPressionado === 'func6') {
                    console.log('tela de depositos');
                }

                //Navega para tela de Transferencias
                if(btnPressionado === 'func7') {
                    console.log('tela de transferencias');
                }

                //Navega para tela de Saques
                if(btnPressionado === 'func8') {
                    console.log('tela de saques');
                }

                //Sair da Tela de Operações e Voltar para Tela Inicial
                if(btnPressionado === 'CANCEL') {
                    configuracoesCaixa.tela = 'telaInicial';
                    renderizarTela();
                }

                break;

            case 'telaSaldoExtrato':

                //Navega para tela de Saldos
                if(btnPressionado === 'func5') {
                    console.log('tela de saldos');
                }

                //Navega para tela de Extrato
                if(btnPressionado === 'func6') {
                    console.log('tela de extratos');
                }

                //Sair da Tela de Saldo & Extrato e Voltar para Tela Inicial
                if(btnPressionado === 'CANCEL') {
                    configuracoesCaixa.tela = 'telaInicial';
                    renderizarTela();
                }

                break;
        
            default:
                break;
        }
    }

    renderizarTela();
    capturaAcoesBtns();
})();