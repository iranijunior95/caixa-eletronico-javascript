(function() {
    const configuracoesCaixa = {
        tela: '/',
        telaAnterior: '',
        autenticado: false,
        btnPressionado: '',
        btnPressionadoAnterior: ''
    };

    const contaPrincipal = {titular: 'Joao Cliente Principal', agencia: '0001-1', conta: '9090-1', saldo: '500,00', senha: '8990'};

    const dadosContas = [
        {titular: 'Jose Stark Silva', agencia: '0001-1', conta: '0012-1', saldo: '100,00'},
        {titular: 'Maria Silva Sauro', agencia: '0001-1', conta: '1234-1', saldo: '200,00'},
        {titular: 'Robert Medeiros', agencia: '0001-1', conta: '3489-1', saldo: '300,00'}
    ];

    //Evitar iteração do usuario com o tecado
    document.addEventListener('keydown', (e) => {
        e.preventDefault();
    });

    function renderizarTela(tela = '') {
        const $telas = document.querySelectorAll('.telas');

        $telas.forEach((elementeTela) => {
            elementeTela.style.display = 'none';
        });

        if(tela === '' & configuracoesCaixa.tela === '/') {
            const $telaCaixaVazia = document.querySelector('#tela-caixa-vazia');

            $telaCaixaVazia.style.display = 'block';
        }else {
            tela.style.display = 'block';
        }
    }

    function capturaAcoesBtns() {
        const $btns = document.querySelectorAll('button');
    
        $btns.forEach(($btn) => {
            $btn.addEventListener('click', (event) => {

                if(event.target.innerHTML === '.') {
                    return;
                }
                
                configuracoesCaixa.btnPressionado = event.target.innerHTML;
                processarOperacoes();
            });
        });
    }

    function processarOperacoes() {
        const listaBtnsFunc = ['func1', 'func2', 'func3', 'func4', 'func5', 'func6', 'func7', 'func8'];
        const listaBtnsEspeciais = ['ENTER', 'CLEAR', 'CANCEL'];

            switch (configuracoesCaixa.tela) {
                case '/':
                    //Navega para tela de Operaçoes
                    if(listaBtnsFunc.indexOf(configuracoesCaixa.btnPressionado) > -1) {
                        const $tela = document.querySelector('#tela-caixa-operacoes');

                        configuracoesCaixa.tela = '/operacoes';
                        renderizarTela($tela);
                    }
                    break;
                
                case '/operacoes':
                    //Navega para tela de Saldos & Extratos
                    if(configuracoesCaixa.btnPressionado === 'func5') {
                        const $tela = document.querySelector('#tela-caixa-saldo-extrato');

                        configuracoesCaixa.tela = '/operacoes/saldoExtrato';
                        renderizarTela($tela);
                    }
                    //Cancela tela Operaçoes
                    if(configuracoesCaixa.btnPressionado === 'CANCEL') {
                        configuracoesCaixa.telaAnterior = '';
                        configuracoesCaixa.btnPressionadoAnterior = '';
                        configuracoesCaixa.autenticado = false;
                        configuracoesCaixa.tela = '/';
                        renderizarTela();
                    }
                    break;

                case '/operacoes/saldoExtrato':
                    //Navega para tela de Saldo
                    if(configuracoesCaixa.btnPressionado === 'func5') {
                        if(!configuracoesCaixa.autenticado) {
                            configuracoesCaixa.telaAnterior = '/operacoes/saldoExtrato';
                            configuracoesCaixa.btnPressionadoAnterior = 'func5';

                            const $tela = document.querySelector('#tela-senha');
                            const $inputTelaSenha = document.querySelector('#inputTelaSenha');
                                            
                            configuracoesCaixa.tela = '/senha';
                            renderizarTela($tela);
                            $inputTelaSenha.focus();
                        }else {
                            const $tela = document.querySelector('#tela-saldo');
                            const $saldoData = document.querySelector('#saldo-data');
                            const $saldoAgencia = document.querySelector('#saldo-agencia');
                            const $saldoConta = document.querySelector('#saldo-conta');
                            const $saldoTitular = document.querySelector('#saldo-titular');
                            const $saldoAtual = document.querySelector('#saldo-saldo-atual');

                            $saldoData.innerHTML = new Date(Date.now()).toLocaleString().split(',')[0];
                            $saldoAgencia.innerHTML = contaPrincipal.agencia;
                            $saldoConta.innerHTML = contaPrincipal.conta;
                            $saldoTitular.innerHTML = contaPrincipal.titular;
                            $saldoAtual.innerHTML = `R$ ${contaPrincipal.saldo}`;

                            configuracoesCaixa.tela = '/operacoes/saldoExtrato/saldo';
                            renderizarTela($tela);
                        }
                    }
                    break;

                case '/operacoes/saldoExtrato/saldo':
                    //Retornar a Tela Saldo e Estrato
                    if(configuracoesCaixa.btnPressionado === 'func4') {
                        const $tela = document.querySelector('#tela-caixa-saldo-extrato');
                        const $inputTelaSenha = document.querySelector('#inputTelaSenha');
                        const $smallErroSenha = document.querySelector('#small-erro-senha');

                        $inputTelaSenha.value = ''
                        configuracoesCaixa.telaAnterior = '';
                        configuracoesCaixa.btnPressionadoAnterior = '';
                        $smallErroSenha.innerHTML = '';
                        configuracoesCaixa.autenticado = false;
                        configuracoesCaixa.tela = '/operacoes/saldoExtrato';
                        renderizarTela($tela);
                    }
                    break;

                case '/senha':
                    const $inputTelaSenha = document.querySelector('#inputTelaSenha');
                    const $smallErroSenha = document.querySelector('#small-erro-senha');

                    if(listaBtnsFunc.indexOf(configuracoesCaixa.btnPressionado) <= -1) {
                        $inputTelaSenha.focus();

                        if(listaBtnsEspeciais.indexOf(configuracoesCaixa.btnPressionado) <= -1) {
                            $inputTelaSenha.value += $inputTelaSenha.value.length < 4 ? configuracoesCaixa.btnPressionado : '';
                        }else {
                            if(configuracoesCaixa.btnPressionado === 'ENTER') {
                                if($inputTelaSenha.value.length === 4) {  
                                    
                                    if(autenticaSenha($inputTelaSenha.value)) {
                                        configuracoesCaixa.tela = configuracoesCaixa.telaAnterior;
                                        document.querySelectorAll('button')[listaBtnsFunc.indexOf(configuracoesCaixa.btnPressionadoAnterior)].click();
                                    }else {
                                        $smallErroSenha.innerHTML = 'SENHA INCORRETA';
                                    }
                                }
                            }

                            if(configuracoesCaixa.btnPressionado === 'CLEAR') {
                                $inputTelaSenha.value.length > 0 ? $inputTelaSenha.value = '' : '';
                                $smallErroSenha.innerHTML = '';
                            }

                            if(configuracoesCaixa.btnPressionado === 'CANCEL') {
                                $inputTelaSenha.value = '';
                                configuracoesCaixa.telaAnterior = '';
                                configuracoesCaixa.btnPressionadoAnterior = '';
                                $smallErroSenha.innerHTML = '';
                                configuracoesCaixa.autenticado = false;
                                configuracoesCaixa.tela = '/';
                                renderizarTela();
                            }
                        }
                    }else {
                        $inputTelaSenha.focus();
                    }
                    break;

                default:
                    break;
            }
    }

    function autenticaSenha(senha) {
        if(senha === contaPrincipal.senha) {
            configuracoesCaixa.autenticado = true;

            return true;
        }

        return false;
    }

    renderizarTela();
    capturaAcoesBtns();
})();