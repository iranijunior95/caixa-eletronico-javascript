(function() {
    const $btns = document.querySelectorAll('.btns');
    const $telaCaixa = document.querySelector('#telaCaixaEletronico');
    const $tbodyConteudoInfo = document.querySelector('#tbodyConteudoInfo');

    let statusSistema = 'inicio';
    let opcoesDeTelas = {
            inicio: `<div class="tela-vazia">
                        <p>CAIXA ELETRÔNICO</p> <p>JAVASCRIPT</p>
                    </div>`,
            
            operacoes: `<div class="tela-opcoes">
                        <div></div>

                        <div>
                            <div>
                                <p>SALDO & EXTRATO</p>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>

                            <div>
                                <p>SAQUE</p>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>

                            <div>
                                <p>DEPÓSITO</p>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>

                            <div>
                                <p>TRANFERÊNCIA</p>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>`,

            saldoExtrato: `<div class="tela-saldo-extrato">
                            <div></div>

                            <div>
                                <div>
                                    <p>SALDO</p>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>

                                <div>
                                    <p>EXTRATO</p>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>

                                <div>
                                    <p>VAZIO</p>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>

                                <div>
                                    <p>VAZIO</p>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>`,

            saldo: `<div class="tela-saldo"> 
                        <div>
                        ${retornarSaldo()}
                        </div>

                        <div>
                            <div>
                                <i class="fa-solid fa-chevron-left"></i>
                                <p>VOLTAR</p>
                            </div>

                            <div>
                                <p>SAQUE</p>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>`
    };

    //Capturar o clique de todos os botões
    $btns.forEach(btn => {
        btn.addEventListener('click', function(event) {

            if(event.target.innerHTML !== '') {
                validaOperacoes(event.target.innerText);
            }

        });
    });

    function validaOperacoes(func) {
        switch (statusSistema) {
            case 'inicio':
                if(func === 'func1' || func === 'func2' || func === 'func3' || func === 'func4' ||
                    func === 'func5' || func === 'func6' || func === 'func7' || func === 'func8') {
                
                        statusSistema = 'operacoes';
                        renderizarTelaCaixa(opcoesDeTelas.operacoes);
                }
                break;

            case 'operacoes': 
                if(func === 'func5') {
                    statusSistema = 'saldoExtrato';
                    renderizarTelaCaixa(opcoesDeTelas.saldoExtrato);
                }

                if(func === 'cancel' || func === 'clean') {
                    statusSistema = 'inicio';
                    renderizarTelaCaixa(opcoesDeTelas.inicio);
                }
                break;

            case 'saldoExtrato':
                if(func === 'cancel') {
                    statusSistema = 'inicio';
                    renderizarTelaCaixa(opcoesDeTelas.inicio);
                }

                if(func === 'clean') {
                    statusSistema = 'operacoes';
                    renderizarTelaCaixa(opcoesDeTelas.operacoes);
                }

                if(func === 'func5') {
                    statusSistema = 'saldo';
                    renderizarTelaCaixa(opcoesDeTelas.saldo);
                }
                break;

            case 'saldo':
                if(func === 'func4') {
                    statusSistema = 'saldoExtrato';
                    renderizarTelaCaixa(opcoesDeTelas.saldoExtrato);
                }
                break;
        
            default:
                break;
        }
    }

    function renderizarTelaCaixa(tela = '') {
        if(tela === '') {
            $telaCaixa.innerHTML = opcoesDeTelas.inicio;
        }else {
            $telaCaixa.innerHTML = tela;
        }
    }

    function renderizarListaDadosContas() {
        const dadosContas = caixaEletronico.retornaListaDeContas();
        let lista = ``;

        lista += `<tr>
                    <td>${dadosContas.contaPrincipal.titular}</td>
                    <td>${dadosContas.contaPrincipal.agencia}</td>
                    <td>${dadosContas.contaPrincipal.conta}</td>
                    <td>R$ ${dadosContas.contaPrincipal.saldo.toLocaleString('pt-br', {minimumFractionDigits: 2})}</td>
                </tr>`;

        dadosContas.listaContas.forEach(conta => {
            lista += `<tr>
                        <td>${conta.titular}</td>
                        <td>${conta.agencia}</td>
                        <td>${conta.conta}</td>
                        <td>R$ ${conta.saldo.toLocaleString('pt-br', {minimumFractionDigits: 2})}</td>
                    </tr>`;
        });

        $tbodyConteudoInfo.innerHTML = lista;
    }

    function retornarSaldo() {
        const saldo = caixaEletronico.saldo();
        
        return `<h3>SALDO CONTA PRINCIPAL</h3>

                <div>
                    <p>DATA: <small>${saldo.dataHora.data}</small></p>
                    <p>HORA: <small>${saldo.dataHora.hora}</small></p>
                </div>

                <div>
                    <p>TITULAR: <small>${saldo.titular}</small></p>
                    <p>AG: <small>${saldo.agencia}</small></p>
                    <p>CC: <small>${saldo.conta}</small></p>
                </div>
                
                <h1>${saldo.saldo}</h1>`;
    }

    renderizarTelaCaixa();
    renderizarListaDadosContas();
})();



