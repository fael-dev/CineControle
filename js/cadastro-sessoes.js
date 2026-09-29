const formulario = document.getElementById('formulario');
const filmes = lerDados('filmes');
const salas = lerDados('salas');

for (const filme of filmes) {
    adicionarOpcao(document.getElementById('filme'), filme.id, filme.titulo);
}
for (const sala of salas) {
    adicionarOpcao(document.getElementById('sala'), sala.id, sala.nome);
}
if (filmes.length === 0 || salas.length === 0) {
    mostrarMensagem('Cadastre pelo menos um filme e uma sala antes de criar uma sessão.', 'warning');
    formulario.querySelector('button').disabled = true;
}

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    if (new Date(valor('dataHora')) <= new Date()) {
        mostrarMensagem('Escolha uma data e hora no futuro.', 'danger');
        return;
    }
    const sessoes = lerDados('sessoes');
    const sessao = {
        id: novoId(sessoes),
        filmeId: Number(valor('filme')),
        salaId: Number(valor('sala')),
        dataHora: valor('dataHora'),
        preco: Number(valor('preco')),
        idioma: valor('idioma'),
        formato: valor('formato')
    };
    sessoes.push(sessao);
    if (salvarDados('sessoes', sessoes)) {
        formulario.reset();
        mostrarMensagem('Sessão salva! Consulte a página Sessões disponíveis.');
    }
});
