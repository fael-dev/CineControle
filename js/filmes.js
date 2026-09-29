const formulario = document.getElementById('formulario');

function listarFilmes() {
    const lista = document.getElementById('lista');
    const filmes = lerDados('filmes');
    lista.textContent = '';
    if (filmes.length === 0) lista.textContent = 'Nenhum filme cadastrado.';
    for (const filme of filmes) {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.textContent = filme.titulo + ' · ' + filme.genero + ' · ' + filme.duracao + ' min · ' + filme.classificacao;
        lista.appendChild(item);
    }
}

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    if (!valor('titulo') || !valor('genero') || !valor('descricao')) {
        mostrarMensagem('Preencha os campos de texto.', 'danger');
        return;
    }
    const filmes = lerDados('filmes');
    const filme = {
        id: novoId(filmes),
        titulo: valor('titulo'),
        genero: valor('genero'),
        descricao: valor('descricao'),
        classificacao: valor('classificacao'),
        duracao: Number(valor('duracao')),
        estreia: valor('estreia')
    };
    filmes.push(filme);
    if (salvarDados('filmes', filmes)) {
        formulario.reset();
        listarFilmes();
        mostrarMensagem('Filme salvo com sucesso!');
    }
});
listarFilmes();
