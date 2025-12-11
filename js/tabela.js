// ===================================
// 🔊 SOM DA REAÇÃO
// ===================================
const somReacao = new Audio("sons/reacao.mp3");

// ===================================
// ELEMENTOS BASE
// ===================================
const tabela = document.getElementById('tabela');
const painelDestaque = document.getElementById('painel-destaque');


// ===================================
// CONTROLE
// ===================================
let elementosSelecionados = [];

// ===================================
// CRIAR ELEMENTOS
// ===================================
function criarElemento(simbolo) {
  const info = dadosElementos[simbolo];
  if (!info) return;

  const div = document.createElement('div');
  div.className = `elemento ${formatarCategoria(info.categoria)}`;
  div.style.gridColumn = info.posicao.col;
  div.style.gridRow = info.posicao.row;
  div.tabIndex = 0;

  div.dataset.simbolo = simbolo;

  div.innerHTML = `
    <div class="conteudo">
      <h1 class="numero-atomico">${info.num_atomico}</h1>
      <span class="simbolo">${simbolo}</span>
      <span class="nome-elemento">${info.nome}</span>
    </div>
  `;

  div.onclick = (e) => {
    e.stopPropagation();
    mostrarPainel(info, simbolo);
  };

  div.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    toggleSelecao(simbolo, div);
  });

  tabela.appendChild(div);
}

// ===================================
// FORMATAR CATEGORIA
// ===================================
function formatarCategoria(categoria) {
  return categoria.toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

// ===================================
// PAINEL DE INFORMAÇÃO
// ===================================
function mostrarPainel(info, simbolo) {
  painelDestaque.classList.remove('vazio');

  painelDestaque.innerHTML = `
    <div class="painel-conteudo">
      <button id="fechar-painel" class="fechar-painel">&times;</button>
      <div class="painel-info">
        <div class="painel-simbolo">${simbolo}</div>
        <div class="painel-dados">
          <h1>${info.nome} (${info.num_atomico})</h1>
          <p><strong>Massa Atômica:</strong> ${info.massa_atomica}</p>
          <p><strong>Grupo:</strong> ${info.grupo}</p>
          <p><strong>Período:</strong> ${info.periodo}</p>
          <p>${info.descricao}</p>
        </div>
      </div>
    </div>
  `;

  painelDestaque.classList.add('ativo');
  document.getElementById('fechar-painel').onclick = () => fecharPainel();
}

function fecharPainel() {
  painelDestaque.classList.remove('ativo');
  setTimeout(() => {
    painelDestaque.innerHTML = 'Clique em um elemento para ver os detalhes aqui 👇';
    painelDestaque.classList.add('vazio');
  }, 300);
}

// ===================================
// PAINEL DE REAÇÃO
// ===================================
const painelReacao = document.getElementById("painelReacao");

// ===================================
// SELEÇÃO E TOGGLE
// ===================================
function toggleSelecao(simbolo, div) {
  if (div.classList.contains("selecionado")) {
    div.classList.remove("selecionado");
    elementosSelecionados = elementosSelecionados.filter(s => s !== simbolo);
    return;
  }

  if (elementosSelecionados.length < 2) {
  if (divA) divA.classList.add('reagindo');
  if (divB) divB.classList.add('reagindo');

  // Remove efeito após animação
  setTimeout(() => {
    if (divA) divA.classList.remove('reagindo');
    if (divB) divB.classList.remove('reagindo');
  }, 750);

  mostrarReacaoPainel(reacao);

  elementosSelecionados = [];
    div.classList.add("selecionado");
    elementosSelecionados.push(simbolo);
  }

  if (elementosSelecionados.length === 2) {
    realizarReacao();
  }
}

// ===================================
// REALIZAR REAÇÃO 
// ===================================
function realizarReacao() {
  if (elementosSelecionados.length !== 2) return;

  // Ordena os elementos para criar a chave correta
  const chave = [...elementosSelecionados].sort().join("+");
  const reacao = bancoReacoes[chave];

  // Adiciona efeito visual nos elementos
  const divA = document.querySelector(`.elemento[data-simbolo="${elementosSelecionados[0]}"]`);
  const divB = document.querySelector(`.elemento[data-simbolo="${elementosSelecionados[1]}"]`);

  if (divA) divA.classList.add('reagindo');
  if (divB) divB.classList.add('reagindo');

  // Remove efeito após animação
  setTimeout(() => {
    if (divA) divA.classList.remove('reagindo');
    if (divB) divB.classList.remove('reagindo');
  }, 750);

  mostrarReacaoPainel(reacao);

  elementosSelecionados = [];
  document.querySelectorAll(".selecionado").forEach(el => el.classList.remove("selecionado"));
}

// ===================================
// EXIBIR REAÇÃO
// ===================================
function mostrarReacaoPainel(reacao) {
  painelReacao.classList.remove("vazio");
  painelReacao.classList.add("ativo");

  if (reacao) {
    painelReacao.innerHTML = `
      <h2>⚡ Reação Encontrada</h2>
      <p><strong>Equação:</strong> ${reacao.equacao}</p>
      <p><strong>Produto:</strong> ${reacao.produto}</p>
      <p><strong>Tipo:</strong> ${reacao.tipo}</p>
      <p style="margin:0px">${reacao.descricao}</p>
    `;
  } else {
    painelReacao.innerHTML = `
      <h2>❌ Reação Não Encontrada</h2>
      <p>A combinação escolhida não existe no banco de dados.</p>
    `;
  }
}

// ===================================
// INICIAR TABELA
// ===================================
Object.keys(dadosElementos).forEach(simbolo => criarElemento(simbolo));

// ===================================
// MODO NEON
// ===================================
document.getElementById("toggleNeon").onclick = () => {
  document.body.classList.toggle("neon");
};