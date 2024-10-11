const formularioProdutos = document.getElementById('formulario__produtos');
const inputNome = document.getElementById('nome');
const inputPreco = document.getElementById('preco');
const inputImagem = document.getElementById('imagem');
const produtosContainer = document.getElementById('produtos__container');
const tituloProdutos = document.getElementById('meus__produtos__titulo');
const botaoAdicionar = document.getElementById('guardar');

formularioProdutos.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const nome = inputNome.value.trim();
    const preco = inputPreco.value.trim();
    const imagem = inputImagem.value.trim();

    if (nome && preco && imagem) {
        adicionarProduto(nome, preco, imagem);
        verificarExibicaoTitulo();
    }

    formularioProdutos.reset();
    atualizarBotaoAdicionar();
});

function validarPreco(event) {
    const inputPreco = event.target;
    const valorAtual = inputPreco.value;
    const regex = /^[0-9.,]*$/;

    if (!regex.test(valorAtual)) {
        inputPreco.value = valorAtual.slice(0, -1);
    }
}

inputPreco.addEventListener('input', function(event) {
    validarPreco(event);
    atualizarBotaoAdicionar(); 
});

function adicionarProduto(nome, preco, imagem) {
    const card = document.createElement('div');
    card.classList.add('card');

    const precoFormatado = formatarPreco(preco);
    card.innerHTML = `
        <img src="${imagem}" alt="${nome}" class="imagem__card">
        <h3>${nome}</h3>
        <div class="lixeira">
            <p>R$ ${precoFormatado}</p>
            <button class="btn-excluir">
                <img src="trash.png" alt="Ícone de lixeira" class="icone__lixeira">
            </button>
        </div>
    `;

    produtosContainer.appendChild(card);

    const btnExcluir = card.querySelector('.btn-excluir');
    btnExcluir.addEventListener('click', function() {
        card.remove(); 
        verificarExibicaoTitulo(); 
    });
}

function formatarPreco(preco) {
    preco = preco.replace(',', '.');
    return parseFloat(preco).toFixed(2).replace('.', ',');
}

function verificarExibicaoTitulo() {
    tituloProdutos.style.display = produtosContainer.children.length > 0 ? 'block' : 'none';
}

function atualizarBotaoAdicionar() {
    const nome = inputNome.value.trim();
    const preco = inputPreco.value.trim();
    const imagem = inputImagem.value.trim();

    botaoAdicionar.disabled = !(nome && preco && imagem);
}

inputNome.addEventListener('input', atualizarBotaoAdicionar);
inputImagem.addEventListener('input', atualizarBotaoAdicionar);

verificarExibicaoTitulo();
atualizarBotaoAdicionar();
