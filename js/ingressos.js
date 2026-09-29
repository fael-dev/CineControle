const formulario = document.getElementById('formulario');
const selectSessao = document.getElementById('sessao');

function carregarSessoes() {
    selectSessao.length = 1;
    const sessoes = lerDados('sessoes').filter(sessaoDisponivel);
    for (const sessao of sessoes) {
        const dados = dadosDaSessao(sessao);
        const texto = dados.filme.titulo + ' · ' + dados.sala.nome + ' · ' + formatarData(sessao.dataHora) + ' · ' + formatarPreco(sessao.preco);
        adicionarOpcao(selectSessao, sessao.id, texto);
    }
    formulario.querySelector('button').disabled = sessoes.length === 0;
    if (sessoes.length === 0) mostrarMensagem('Não há sessões disponíveis para venda.', 'warning');
}

carregarSessoes();
const parametros = new URLSearchParams(window.location.search);
if (parametros.has('sessao')) {
    selectSessao.value = parametros.get('sessao');
}

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    const sessaoId = Number(valor('sessao'));
    const sessao = lerDados('sessoes').find(item => item.id === sessaoId);
    if (!sessao || !sessaoDisponivel(sessao)) {
        carregarSessoes();
        mostrarMensagem('Esta sessão não está mais disponível. Escolha outra.', 'danger');
        return;
    }
    const cpf = valor('cpf').replace(/[.\-\s]/g, '');
    if (!valor('cliente') || !/^\d{11}$/.test(cpf)) {
        mostrarMensagem('Informe o nome e um CPF com 11 dígitos.', 'danger');
        return;
    }
    const assento = valor('assento').toUpperCase();
    const ingressos = lerDados('ingressos');
    const ocupado = ingressos.some(item => item.sessaoId === sessaoId && item.assento === assento);
    if (ocupado) {
        mostrarMensagem('Este assento já foi vendido nesta sessão.', 'danger');
        return;
    }
    const ingresso = {
        id: novoId(ingressos),
        sessaoId: sessaoId,
        cliente: valor('cliente'),
        cpf: cpf,
        assento: assento,
        pagamento: valor('pagamento')
    };
    ingressos.push(ingresso);
    if (salvarDados('ingressos', ingressos)) {
        formulario.reset();
        carregarSessoes();
        mostrarMensagem('Venda confirmada! Ingresso nº ' + ingresso.id + ' · Assento ' + assento + '.');
    }
});
