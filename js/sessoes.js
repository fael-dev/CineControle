const lista = document.getElementById('lista');
const sessoes = lerDados('sessoes').filter(sessaoDisponivel);
sessoes.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));
document.getElementById('vazio').hidden = sessoes.length > 0;

for (const sessao of sessoes) {
    const dados = dadosDaSessao(sessao);
    const linha = document.createElement('tr');
    const textos = [dados.filme.titulo, dados.sala.nome, formatarData(sessao.dataHora), formatarPreco(sessao.preco)];
    for (const texto of textos) {
        const coluna = document.createElement('td');
        coluna.textContent = texto;
        linha.appendChild(coluna);
    }
    const coluna = document.createElement('td');
    const link = document.createElement('a');
    // A página de venda lê este ID da URL e seleciona a sessão.
    link.href = 'venda-ingressos.html?sessao=' + sessao.id;
    link.textContent = 'Comprar ingresso';
    link.className = 'btn btn-primary btn-sm';
    coluna.appendChild(link);
    linha.appendChild(coluna);
    lista.appendChild(linha);
}
