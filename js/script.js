(function() {
    const $tbodyConteudoInfo = document.querySelector('#tbodyConteudoInfo');

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



