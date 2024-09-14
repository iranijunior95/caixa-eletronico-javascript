(function() {
    const $btns = document.querySelectorAll('.btns');
    const $tbodyConteudoInfo = document.querySelector('#tbodyConteudoInfo');

    $btns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            if(event.target.innerHTML !== '') {

                if(Number.isInteger(Number(event.target.innerText))) {
                    console.log(event.target.innerText);
                }
                
                if(event.target.innerText === 'enter' || event.target.innerText === 'cancel' || event.target.innerText === 'clean') {
                    console.log(event.target.innerText);
                }

                if(event.target.innerText.match(/func/)) {
                    console.log(event.target.innerText);
                }
            }
        });
    });

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

    renderizarListaDadosContas();
})();



