const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

if (cursor && cursorDot) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  (function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  })();
}

const aiTools = [
  {
    name: 'ChatGPT (OpenAI)',
    rank: 'TOP 1',
    description: 'Excelente para gerar codigo, revisar bugs, explicar conceitos e apoiar arquitetura.',
    bestFor: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Java'],
    strengths: ['Refatoracao', 'Debug guiado', 'Explicacao didatica'],
    url: 'https://chatgpt.com/',
  },
  {
    name: 'Claude (Anthropic)',
    rank: 'TOP 2',
    description: 'Muito forte para analise de codigo longo, revisao de PRs e melhoria de qualidade.',
    bestFor: ['Python', 'TypeScript', 'Go', 'Rust', 'Java'],
    strengths: ['Code review', 'Raciocinio em contexto longo', 'Arquitetura'],
    url: 'https://claude.ai/',
  },
  {
    name: 'GitHub Copilot',
    rank: 'TOP 3',
    description: 'Assistente integrado no editor para autocompletar, snippets e produtividade diaria.',
    bestFor: ['JavaScript', 'TypeScript', 'Python', 'C#', 'Java'],
    strengths: ['Autocompletar', 'Produtividade no IDE', 'Boilerplate rapido'],
    url: 'https://github.com/features/copilot',
  },
  {
    name: 'Gemini',
    rank: 'TOP 4',
    description: 'Boa alternativa para gerar e explicar codigo, com bom suporte multi linguagem.',
    bestFor: ['Java', 'Python', 'Kotlin', 'JavaScript', 'C++'],
    strengths: ['Explicacoes', 'Exemplos', 'Integracao Google'],
    url: 'https://gemini.google.com/',
  },
  {
    name: 'Perplexity',
    rank: 'TOP 5',
    description: 'Excelente para pesquisa tecnica com fontes quando voce precisa validar informacao.',
    bestFor: ['Pesquisa geral', 'APIs', 'Documentacao', 'Stack trace'],
    strengths: ['Busca com fontes', 'Atualizacoes recentes', 'Comparativos'],
    url: 'https://www.perplexity.ai/',
  },
];

const youtubers = [
  {
    name: 'Filipe Deschamps',
    rank: 'BR',
    description: 'Conteudo de programacao, carreira e tecnologia com linguagem clara.',
    bestFor: ['JavaScript', 'Web', 'Carreira'],
    strengths: ['Didatica', 'Visao de mercado', 'Projetos'],
    url: 'https://www.youtube.com/@FilipeDeschamps',
  },
  {
    name: 'Curso em Video (Gustavo Guanabara)',
    rank: 'BR',
    description: 'Uma das referencias mais completas para iniciantes em programacao.',
    bestFor: ['Python', 'Algoritmos', 'Logica'],
    strengths: ['Passo a passo', 'Base solida', 'Didatica para iniciantes'],
    url: 'https://www.youtube.com/@CursoemVideo',
  },
  {
    name: 'Codigo Fonte TV',
    rank: 'BR',
    description: 'Noticias, boas praticas e carreira para quem ja esta evoluindo como dev.',
    bestFor: ['Carreira', 'Tecnologia', 'Boas praticas'],
    strengths: ['Atualidades', 'Panorama tech', 'Conteudo pratico'],
    url: 'https://www.youtube.com/@codigofontetv',
  },
  {
    name: 'Traversy Media',
    rank: 'EN',
    description: 'Projetos completos e tutoriais diretos para web e backend.',
    bestFor: ['JavaScript', 'Node.js', 'React'],
    strengths: ['Hands-on', 'Projetos reais', 'Conteudo objetivo'],
    url: 'https://www.youtube.com/@TraversyMedia',
  },
  {
    name: 'freeCodeCamp.org',
    rank: 'EN',
    description: 'Biblioteca gigante de cursos longos e gratuitos em varias stacks.',
    bestFor: ['Python', 'JavaScript', 'Data Science', 'Web'],
    strengths: ['Cursos completos', 'Variedade', 'Gratuito'],
    url: 'https://www.youtube.com/@freecodecamp',
  },
];

function renderCards(containerId, items, ctaLabel) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map((item) => `
    <article class="card">
      <div class="card-top">
        <h3 class="card-title">${item.name}</h3>
        <span class="card-badge">${item.rank}</span>
      </div>
      <p class="card-desc">${item.description}</p>

      <p class="label">Melhor para:</p>
      <div class="tags">
        ${item.bestFor.map((tag) => `<span class="tag">${tag}</span>`).join('')}
      </div>

      <p class="label">Pontos fortes:</p>
      <div class="tags">
        ${item.strengths.map((tag) => `<span class="tag">${tag}</span>`).join('')}
      </div>

      <div class="card-actions">
        <a class="action-btn primary" href="${item.url}" target="_blank" rel="noopener noreferrer">${ctaLabel}</a>
      </div>
    </article>
  `).join('');
}

renderCards('aiCards', aiTools, 'Acessar IA');
renderCards('ytCards', youtubers, 'Ir para canal');
