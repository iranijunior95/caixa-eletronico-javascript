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
                                <p>SALDO</p>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>

                            <div>
                                <p>EXTRATO</p>
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
                if(func === 'cancel') {
                    statusSistema = 'inicio';
                    renderizarTelaCaixa(opcoesDeTelas.inicio);
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
                    <td>R$ ${dadosContas.contaPrincipal.saldo}</td>
                </tr>`;

        dadosContas.listaContas.forEach(conta => {
            lista += `<tr>
                        <td>${conta.titular}</td>
                        <td>${conta.agencia}</td>
                        <td>${conta.conta}</td>
                        <td>R$ ${conta.saldo}</td>
                    </tr>`;
        });

        $tbodyConteudoInfo.innerHTML = lista;
    }

    renderizarTelaCaixa();
    renderizarListaDadosContas();
})();



