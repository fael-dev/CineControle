const formulario = document.getElementById('formulario');

function listarSalas() {
    const lista = document.getElementById('lista');
    const salas = lerDados('salas');
    lista.textContent = '';
    if (salas.length === 0) lista.textContent = 'Nenhuma sala cadastrada.';
    for (const sala of salas) {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.textContent = sala.nome + ' · ' + sala.capacidade + ' lugares · ' + sala.tipo;
        lista.appendChild(item);
    }
}

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    if (!valor('nome')) {
        mostrarMensagem('Informe o nome da sala.', 'danger');
        return;
    }
    const salas = lerDados('salas');
    const sala = {
        id: novoId(salas),
        nome: valor('nome'),
        capacidade: Number(valor('capacidade')),
        tipo: valor('tipo')
    };
    salas.push(sala);
    if (salvarDados('salas', salas)) {
        formulario.reset();
        listarSalas();
        mostrarMensagem('Sala salva com sucesso!');
    }
});
listarSalas();
