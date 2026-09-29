// Funções pequenas usadas por mais de uma página.
function lerDados(chave) {
    return JSON.parse(localStorage.getItem(chave) || '[]');
}

function salvarDados(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
        return true;
    } catch (erro) {
        mostrarMensagem('Não foi possível salvar. Verifique o espaço e as permissões do navegador.', 'danger');
        return false;
    }
}

function novoId(dados) {
    let maior = 0;
    for (const item of dados) {
        if (item.id > maior) maior = item.id;
    }
    return maior + 1;
}

function valor(id) {
    return document.getElementById(id).value.trim();
}

function mostrarMensagem(texto, tipo = 'success') {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = texto;
    mensagem.className = 'alert alert-' + tipo;
    mensagem.hidden = false;
}

function adicionarOpcao(select, id, texto) {
    const opcao = document.createElement('option');
    opcao.value = id;
    opcao.textContent = texto;
    select.appendChild(opcao);
}

function formatarData(data) {
    return new Date(data).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

function formatarPreco(preco) {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Relacionamos as entidades pelos IDs, sem repetir todos os dados.
function dadosDaSessao(sessao) {
    const filme = lerDados('filmes').find(item => item.id === sessao.filmeId);
    const sala = lerDados('salas').find(item => item.id === sessao.salaId);
    return { filme, sala };
}

function vagasDaSessao(sessao) {
    const sala = dadosDaSessao(sessao).sala;
    const vendidos = lerDados('ingressos').filter(item => item.sessaoId === sessao.id).length;
    return sala ? sala.capacidade - vendidos : 0;
}

function sessaoDisponivel(sessao) {
    const dados = dadosDaSessao(sessao);
    return dados.filme && dados.sala && new Date(sessao.dataHora) > new Date() && vagasDaSessao(sessao) > 0;
}
