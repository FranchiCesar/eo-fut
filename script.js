let cardContainer = document.querySelector(".card-container");
let buscaInput = document.querySelector("#busca");
let buscaBotao = document.querySelector("#botao-busca");
let banner = document.querySelector(".banner");
let dados = [];

async function iniciarBusca() {  
    // Pega o termo digitado no campo de busca e converte para minúsculas
    const termoBusca = buscaInput.value.toLowerCase();

    // Esconde o banner se houver uma busca, senão, mostra
    if (termoBusca) {
        banner.style.display = 'none';
    } else {
        banner.style.display = 'block';
    }

    // Carrega os dados do JSON apenas se ainda não foram carregados
    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }

    // Filtra os dados com base no termo de busca
    const dadosFiltrados = dados.filter(dado => 
        termoBusca === '' || // Se a busca estiver vazia, mostra tudo
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(itensParaRenderizar) {
    // Limpa o container antes de adicionar os novos cards
    cardContainer.innerHTML = "";

    for (let item of itensParaRenderizar){
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${item.nome}</h2>
            <p>${item.data_criacao}</p>
            <p>${item.descricao}</p>
            <a href="${item.link}" target="_blank">Ver detalhes</a>
        `;
        cardContainer.appendChild(article);
    }
}

// Adiciona um evento para acionar a busca a cada tecla digitada
buscaInput.addEventListener('input', iniciarBusca);
buscaBotao.addEventListener('click', iniciarBusca);

// Chama a função ao carregar a página para exibir todos os cards inicialmente
iniciarBusca();
