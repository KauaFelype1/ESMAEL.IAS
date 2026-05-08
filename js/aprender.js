// ===================================================
// ESMAEL.IAS — aprender.js
// Diagnóstico + Trilha Adaptativa + Conteúdo das Aulas
// ===================================================

// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
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

// ===== DETECTAR LINGUAGEM DA URL =====
const params = new URLSearchParams(window.location.search);
const LANG = params.get('lang') || 'python';

const LANG_NAMES = {
  java: 'Java', python: 'Python', c: 'C',
  cpp: 'C++', javascript: 'JavaScript', csharp: 'C#'
};

const langName = LANG_NAMES[LANG] || 'Python';
document.getElementById('navLangName').textContent = langName;
document.title = `Aprender ${langName} — ESMAEL.IAS`;
const trainLink = document.getElementById('cmGoTrain');
if (trainLink) trainLink.href = `treino.html?lang=${encodeURIComponent(LANG)}`;

// ===== ESTADO GLOBAL =====
const state = {
  answers: {},
  multiAnswers: [],
  currentQ: 1,
  totalQ: 5,
  level: 'iniciante', // iniciante | intermediario | avancado
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  completedLessons: new Set(),
};

// ===================================================
// BANCO DE CONTEÚDO — AULAS POR LINGUAGEM E NÍVEL
// ===================================================

function getTrail(lang, level) {
  const trails = {
    iniciante: getBeginnerTrail(lang),
    intermediario: getIntermediateTrail(lang),
    avancado: getAdvancedTrail(lang),
  };
  return trails[level] || trails.iniciante;
}

function getBeginnerTrail(lang) {
  const ln = LANG_NAMES[lang];
  return [
    {
      title: 'Introdução à Programação',
      lessons: [
        {
          title: `O que é programação?`,
          content: buildLesson_Intro(lang),
        },
        {
          title: 'Variáveis e Tipos de Dados',
          content: buildLesson_Variables(lang),
        },
        {
          title: 'Entrada e Saída de Dados',
          content: buildLesson_IO(lang),
        },
      ],
    },
    {
      title: 'Controle de Fluxo',
      lessons: [
        { title: 'Condicionais (if/else)', content: buildLesson_Conditionals(lang) },
        { title: 'Laços de Repetição', content: buildLesson_Loops(lang) },
      ],
    },
    {
      title: 'Funções',
      lessons: [
        { title: 'O que são funções?', content: buildLesson_Functions(lang) },
        { title: 'Parâmetros e Retorno', content: buildLesson_FuncParams(lang) },
      ],
    },
    {
      title: 'Estruturas de Dados Básicas',
      lessons: [
        { title: 'Arrays e Listas', content: buildLesson_Arrays(lang) },
      ],
    },
  ];
}

function getIntermediateTrail(lang) {
  return [
    {
      title: 'Revisão Rápida',
      lessons: [
        { title: 'Variáveis e Tipos', content: buildLesson_Variables(lang) },
        { title: 'Funções Avançadas', content: buildLesson_FuncParams(lang) },
      ],
    },
    {
      title: 'Orientação a Objetos',
      lessons: [
        { title: 'Classes e Objetos', content: buildLesson_OOP(lang) },
        { title: 'Encapsulamento', content: buildLesson_Encapsulation(lang) },
        { title: 'Herança', content: buildLesson_Inheritance(lang) },
      ],
    },
    {
      title: 'Estruturas Avançadas',
      lessons: [
        { title: 'Listas, Dicionários e Sets', content: buildLesson_Arrays(lang) },
        { title: 'Tratamento de Erros', content: buildLesson_Errors(lang) },
      ],
    },
  ];
}

function getAdvancedTrail(lang) {
  return [
    {
      title: 'OOP Avançado',
      lessons: [
        { title: 'Polimorfismo', content: buildLesson_Polymorphism(lang) },
        { title: 'Interfaces e Abstrações', content: buildLesson_Interfaces(lang) },
      ],
    },
    {
      title: 'Padrões e Boas Práticas',
      lessons: [
        { title: 'Design Patterns', content: buildLesson_Patterns(lang) },
        { title: 'Clean Code', content: buildLesson_CleanCode(lang) },
      ],
    },
  ];
}

// ===================================================
// BUILDERS DE AULAS — conteúdo real adaptado
// ===================================================

function codeBlock(lang, code) {
  return `
<div class="code-block">
  <div class="cb-header">
    <span class="cb-lang">${LANG_NAMES[lang] || lang}</span>
    <button class="cb-copy" onclick="copyCode(this)">Copiar</button>
  </div>
  <div class="cb-code">${code}</div>
</div>`;
}

function infoBox(type, icon, title, text) {
  return `<div class="info-box ${type}"><div class="ib-icon">${icon}</div><div class="ib-text"><strong>${title}</strong><br>${text}</div></div>`;
}

function getAdaptiveQuizConfig(lessonKey) {
  const quizzes = {
    intro: {
      python: {
        question: 'No Python, qual comando voce usa para exibir texto no terminal?',
        opts: ['input()', 'print()', 'int()', 'return'],
        correctIndex: 1,
        feedback: { ok: 'Boa! Em Python usamos print() para saida.', no: 'A correta e print(), que exibe dados na tela.' },
      },
      javascript: {
        question: 'No JavaScript, qual comando mostra uma mensagem no console?',
        opts: ['prompt()', 'console.log()', 'alert()', 'parseInt()'],
        correctIndex: 1,
        feedback: { ok: 'Exato! console.log() escreve no console.', no: 'A resposta correta e console.log().' },
      },
      java: {
        question: 'Em Java, qual comando imprime uma linha na saida padrao?',
        opts: ['System.in.read()', 'System.out.println()', 'Scanner.nextLine()', 'print()'],
        correctIndex: 1,
        feedback: { ok: 'Perfeito! System.out.println() imprime na tela.', no: 'Use System.out.println() para saida em Java.' },
      },
    },
    variaveis: {
      python: {
        question: 'Qual destas declaracoes cria uma variavel numerica em Python?',
        opts: ['idade = 25', 'int idade = 25', 'let idade = 25', 'idade := int(25)'],
        correctIndex: 0,
        feedback: { ok: 'Correto! Python nao exige declaracao de tipo.', no: 'Em Python, basta usar idade = 25.' },
      },
      javascript: {
        question: 'Qual forma moderna e recomendada para criar variavel em JavaScript?',
        opts: ['var nome = "Ana"', 'const nome = "Ana"', 'string nome = "Ana"', 'nome := "Ana"'],
        correctIndex: 1,
        feedback: { ok: 'Boa! const e o padrao para valores que nao mudam.', no: 'A opcao mais recomendada aqui e const nome = "Ana".' },
      },
    },
    condicionais: {
      python: {
        question: 'Qual palavra-chave do Python representa o "senao se"?',
        opts: ['elseif', 'elif', 'else if', 'then'],
        correctIndex: 1,
        feedback: { ok: 'Isso! Python usa elif.', no: 'No Python usamos elif.' },
      },
      javascript: {
        question: 'No JavaScript, qual sintaxe esta correta para condicional?',
        opts: ['if idade > 18:', 'if (idade > 18) { }', 'if idade > 18 then', 'if {idade > 18}'],
        correctIndex: 1,
        feedback: { ok: 'Correto! JS usa parenteses e chaves.', no: 'A forma correta e if (condicao) { ... }.' },
      },
    },
  };

  const byLesson = quizzes[lessonKey];
  if (!byLesson) return null;
  return byLesson[LANG] || byLesson.python || byLesson.javascript || byLesson.java || null;
}

function quiz(lessonKey, baseConfig, legacyCorrectIndex, legacyFeedback) {
  let cfg = null;
  if (Array.isArray(baseConfig)) {
    cfg = {
      question: lessonKey,
      opts: baseConfig,
      correctIndex: legacyCorrectIndex,
      feedback: legacyFeedback,
    };
  } else {
    cfg = getAdaptiveQuizConfig(lessonKey) || baseConfig;
  }
  const optsHTML = cfg.opts.map((o, i) =>
    `<button class="iq-opt" data-index="${i}" onclick="selectQuizOption(this, ${i})">${o}</button>`
  ).join('');

  return `
<div class="inline-quiz" data-correct-index="${cfg.correctIndex}" data-confirmed="false">
  <div class="iq-title">// MINI-QUIZ</div>
  <div class="iq-question">${cfg.question}</div>
  <div class="iq-opts">${optsHTML}</div>
  <button class="iq-confirm" onclick="confirmQuiz(this)" disabled>Confirmar resposta</button>
  <div class="iq-feedback ok">✅ ${cfg.feedback.ok}</div>
  <div class="iq-feedback no">❌ ${cfg.feedback.no}</div>
</div>`;
}

// ------- AULA: INTRODUÇÃO -------
function buildLesson_Intro(lang) {
  const snippets = {
    python: `<span class="cc"># Meu primeiro programa em Python</span>\n<span class="cf">print</span>(<span class="cs">"Olá, Mundo!"</span>)`,
    javascript: `<span class="cc">// Meu primeiro programa em JavaScript</span>\n<span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">"Olá, Mundo!"</span>);`,
    java: `<span class="cc">// Meu primeiro programa em Java</span>\n<span class="ck">public class</span> <span class="cf">OlaMundo</span> {\n  <span class="ck">public static void</span> <span class="cf">main</span>(<span class="ck">String</span>[] args) {\n    <span class="cf">System.out.println</span>(<span class="cs">"Olá, Mundo!"</span>);\n  }\n}`,
    c: `<span class="cc">/* Meu primeiro programa em C */</span>\n<span class="ck">#include</span> <span class="cs">&lt;stdio.h&gt;</span>\n\n<span class="ck">int</span> <span class="cf">main</span>() {\n  <span class="cf">printf</span>(<span class="cs">"Olá, Mundo!\\n"</span>);\n  <span class="ck">return</span> <span class="cn">0</span>;\n}`,
    cpp: `<span class="cc">// Meu primeiro programa em C++</span>\n<span class="ck">#include</span> <span class="cs">&lt;iostream&gt;</span>\n\n<span class="ck">int</span> <span class="cf">main</span>() {\n  <span class="cf">std::cout</span> <span class="co">&lt;&lt;</span> <span class="cs">"Olá, Mundo!"</span> <span class="co">&lt;&lt;</span> <span class="cf">std::endl</span>;\n  <span class="ck">return</span> <span class="cn">0</span>;\n}`,
    csharp: `<span class="cc">// Meu primeiro programa em C#</span>\n<span class="ck">using</span> System;\n\n<span class="ck">class</span> <span class="cf">OlaMundo</span> {\n  <span class="ck">static void</span> <span class="cf">Main</span>() {\n    <span class="cf">Console.WriteLine</span>(<span class="cs">"Olá, Mundo!"</span>);\n  }\n}`,
  };
  return `
<h1>O que é Programação?</h1>
<p class="lesson-intro">Programar é dar instruções a um computador para que ele execute tarefas. É como escrever uma receita — você define os passos e o computador os segue à risca.</p>

<h2>Por que aprender ${LANG_NAMES[lang]}?</h2>
<p>${getLangWhy(lang)}</p>

<h2>Seu primeiro programa</h2>
<p>A tradição em programação é começar com um programa que exibe "Olá, Mundo!" na tela. É simples, mas carrega um significado: você está se comunicando com a máquina pela primeira vez.</p>

${codeBlock(lang, snippets[lang] || snippets.python)}

${infoBox('tip', '💡', 'O que acontece aqui?', `O programa acima instrui o computador a <strong>exibir uma mensagem</strong> na tela. Em ${LANG_NAMES[lang]}, isso é feito com um comando específico de saída.`)}

<h2>Como o computador entende isso?</h2>
<p>O código que você escreve é chamado de <em>código-fonte</em>. O computador não entende texto diretamente — ele precisa que esse código seja <strong>compilado</strong> ou <strong>interpretado</strong> para se tornar instruções que o processador executa.</p>

${infoBox('', '📘', 'Compilado vs Interpretado', `<strong>Compilado</strong> (C, C++, Java): o código é transformado em um executável antes de rodar. <strong>Interpretado</strong> (Python, JavaScript): o código é lido e executado linha por linha em tempo real.`)}

<h2>Ciclo basico de um programa</h2>
<p>Quase todo programa segue o mesmo fluxo: <strong>entrada -> processamento -> saida</strong>. Voce recebe dados, aplica alguma logica e mostra um resultado.</p>

${codeBlock(lang, {
  python: `nome <span class="co">=</span> <span class="cf">input</span>(<span class="cs">"Seu nome: "</span>)\n<span class="cf">print</span>(<span class="cs">f"Bem-vindo, {nome}!"</span>)`,
  javascript: `<span class="ck">const</span> nome <span class="co">=</span> <span class="cf">prompt</span>(<span class="cs">"Seu nome:"</span>);\n<span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">\`Bem-vindo, \${nome}!\`</span>);`,
  java: `<span class="cc">// entrada -> processamento -> saida</span>\n<span class="cf">System.out.println</span>(<span class="cs">"Bem-vindo ao ESMAEL.IAS!"</span>);`,
  c: `<span class="cf">printf</span>(<span class="cs">"Bem-vindo ao ESMAEL.IAS!\\n"</span>);`,
  cpp: `<span class="cf">std::cout</span> <span class="co">&lt;&lt;</span> <span class="cs">"Bem-vindo ao ESMAEL.IAS!"</span> <span class="co">&lt;&lt;</span> <span class="cf">std::endl</span>;`,
  csharp: `<span class="cf">Console.WriteLine</span>(<span class="cs">"Bem-vindo ao ESMAEL.IAS!"</span>);`,
}[lang] || `<span class="cf">print</span>(<span class="cs">"Bem-vindo ao ESMAEL.IAS!"</span>)`)}

${quiz('intro', {
  question: 'O que o comando de saída (print/console.log/printf) faz?',
  opts: ['Lê dados do usuário', 'Exibe informações na tela', 'Cria uma variável', 'Compila o programa'],
  correctIndex: 1,
  feedback: { ok: 'Exato! Ele exibe informações na tela do usuário.', no: 'Não exatamente. Esse comando serve para exibir (mostrar) algo na tela.' },
})}`;
}

function getLangWhy(lang) {
  const why = {
    python: 'Python é uma das linguagens mais populares do mundo. Sua sintaxe é <strong>limpa e próxima do inglês</strong>, tornando-a ideal para iniciantes. É usada em Inteligência Artificial, Data Science, automação e desenvolvimento web.',
    javascript: 'JavaScript é a linguagem da web. <strong>Todo site interativo</strong> usa JavaScript. Você pode criar desde animações simples até aplicações completas rodando no navegador e no servidor (Node.js).',
    java: 'Java é robusta e amplamente usada em sistemas <strong>corporativos e no Android</strong>. Aprende-se bem orientação a objetos com Java, o que é uma base sólida para qualquer linguagem.',
    c: 'C é a base de tudo. <strong>Sistemas operacionais, drivers e hardware</strong> são escritos em C. Aprender C te dá uma compreensão profunda de como os computadores funcionam de verdade.',
    cpp: 'C++ combina o poder do C com recursos modernos. É a escolha número um para <strong>games, engines e sistemas de alta performance</strong>. Empresas como Epic Games e Adobe a usam extensivamente.',
    csharp: 'C# é elegante e moderna, criada pela Microsoft. É a linguagem principal do <strong>Unity (game engine)</strong> e do ecossistema .NET, sendo ótima para desktop, web e jogos.',
  };
  return why[lang] || why.python;
}

// ------- AULA: VARIÁVEIS -------
function buildLesson_Variables(lang) {
  const examples = {
    python: `<span class="cc"># Declarando variáveis em Python</span>\nnome <span class="co">=</span> <span class="cs">"Ana"</span>          <span class="cc"># string (texto)</span>\nidade <span class="co">=</span> <span class="cn">25</span>            <span class="cc"># int (inteiro)</span>\naltura <span class="co">=</span> <span class="cn">1.68</span>          <span class="cc"># float (decimal)</span>\nativo <span class="co">=</span> <span class="ck">True</span>           <span class="cc"># bool (verdadeiro/falso)</span>\n\n<span class="cf">print</span>(nome, idade, altura, ativo)`,
    javascript: `<span class="cc">// Declarando variáveis em JavaScript</span>\n<span class="ck">let</span> nome <span class="co">=</span> <span class="cs">"Ana"</span>;         <span class="cc">// string</span>\n<span class="ck">let</span> idade <span class="co">=</span> <span class="cn">25</span>;           <span class="cc">// number</span>\n<span class="ck">let</span> altura <span class="co">=</span> <span class="cn">1.68</span>;        <span class="cc">// number (decimal)</span>\n<span class="ck">let</span> ativo <span class="co">=</span> <span class="ck">true</span>;         <span class="cc">// boolean</span>\n\n<span class="cf">console</span>.<span class="cf">log</span>(nome, idade);`,
    java: `<span class="cc">// Declarando variáveis em Java</span>\n<span class="ck">String</span> nome <span class="co">=</span> <span class="cs">"Ana"</span>;\n<span class="ck">int</span> idade <span class="co">=</span> <span class="cn">25</span>;\n<span class="ck">double</span> altura <span class="co">=</span> <span class="cn">1.68</span>;\n<span class="ck">boolean</span> ativo <span class="co">=</span> <span class="ck">true</span>;\n\n<span class="cf">System.out.println</span>(nome <span class="co">+</span> <span class="cs">" tem "</span> <span class="co">+</span> idade <span class="co">+</span> <span class="cs">" anos"</span>);`,
    c: `<span class="cc">/* Declarando variáveis em C */</span>\n<span class="ck">char</span> nome[] <span class="co">=</span> <span class="cs">"Ana"</span>;\n<span class="ck">int</span> idade <span class="co">=</span> <span class="cn">25</span>;\n<span class="ck">float</span> altura <span class="co">=</span> <span class="cn">1.68</span>;\n<span class="ck">int</span> ativo <span class="co">=</span> <span class="cn">1</span>;  <span class="cc">/* 1 = true, 0 = false */</span>\n\n<span class="cf">printf</span>(<span class="cs">"%s tem %d anos\\n"</span>, nome, idade);`,
    cpp: `<span class="cc">// Declarando variáveis em C++</span>\n<span class="ck">string</span> nome <span class="co">=</span> <span class="cs">"Ana"</span>;\n<span class="ck">int</span> idade <span class="co">=</span> <span class="cn">25</span>;\n<span class="ck">double</span> altura <span class="co">=</span> <span class="cn">1.68</span>;\n<span class="ck">bool</span> ativo <span class="co">=</span> <span class="ck">true</span>;\n\n<span class="cf">cout</span> <span class="co">&lt;&lt;</span> nome <span class="co">&lt;&lt;</span> <span class="cs">" tem "</span> <span class="co">&lt;&lt;</span> idade <span class="co">&lt;&lt;</span> <span class="cs">" anos"</span> <span class="co">&lt;&lt;</span> <span class="cf">endl</span>;`,
    csharp: `<span class="cc">// Declarando variáveis em C#</span>\n<span class="ck">string</span> nome <span class="co">=</span> <span class="cs">"Ana"</span>;\n<span class="ck">int</span> idade <span class="co">=</span> <span class="cn">25</span>;\n<span class="ck">double</span> altura <span class="co">=</span> <span class="cn">1.68</span>;\n<span class="ck">bool</span> ativo <span class="co">=</span> <span class="ck">true</span>;\n\n<span class="cf">Console.WriteLine</span>(<span class="cs">$"{nome} tem {idade} anos"</span>);`,
  };

  return `
<h1>Variáveis e Tipos de Dados</h1>
<p class="lesson-intro">Uma variável é um espaço na memória do computador onde você guarda um valor. Pense nela como uma caixinha com um nome — você pode colocar algo dentro e recuperar depois.</p>

<h2>Como criar uma variável</h2>
<p>Em ${LANG_NAMES[lang]}, criar uma variável é simples. Você dá um <strong>nome</strong> e atribui um <strong>valor</strong> a ela.</p>

${codeBlock(lang, examples[lang] || examples.python)}

<h2>Tipos de dados fundamentais</h2>
<p>Cada valor tem um tipo. Os mais comuns são:</p>

${infoBox('', '🔤', 'String (texto)', 'Sequência de caracteres. Sempre entre aspas. Ex: <code>"Olá"</code>, <code>"123"</code>')}
${infoBox('', '🔢', 'Inteiro (int)', 'Números sem casa decimal. Ex: <code>25</code>, <code>-10</code>, <code>0</code>')}
${infoBox('', '📊', 'Decimal (float/double)', 'Números com casa decimal. Ex: <code>3.14</code>, <code>1.68</code>')}
${infoBox('tip', '✅', 'Boolean (bool)', 'Só dois valores possíveis: <code>true</code> (verdadeiro) ou <code>false</code> (falso). Fundamental para condicionais.')}

<h2>Boas práticas ao nomear variáveis</h2>
<p>Use nomes <strong>descritivos</strong> — o código precisa ser legível. Evite nomes como <em>x</em>, <em>a</em>, ou <em>dados1</em> sem contexto.</p>

${infoBox('warn', '⚠️', 'Atenção', 'Nomes de variáveis não podem ter espaços, começar com números, ou usar caracteres especiais (exceto underscore _).')}

<h2>Exemplo prático com atualização de valor</h2>
<p>Variaveis mudam durante a execucao. Esse processo e chamado de atribuicao e reatribuicao.</p>
${codeBlock(lang, {
  python: `pontos <span class="co">=</span> <span class="cn">10</span>\npontos <span class="co">=</span> pontos <span class="co">+</span> <span class="cn">5</span>\n<span class="cf">print</span>(pontos) <span class="cc"># 15</span>`,
  javascript: `<span class="ck">let</span> pontos <span class="co">=</span> <span class="cn">10</span>;\npontos <span class="co">=</span> pontos <span class="co">+</span> <span class="cn">5</span>;\n<span class="cf">console</span>.<span class="cf">log</span>(pontos); <span class="cc">// 15</span>`,
  java: `<span class="ck">int</span> pontos <span class="co">=</span> <span class="cn">10</span>;\npontos <span class="co">=</span> pontos <span class="co">+</span> <span class="cn">5</span>;\n<span class="cf">System.out.println</span>(pontos); <span class="cc">// 15</span>`,
  c: `<span class="ck">int</span> pontos <span class="co">=</span> <span class="cn">10</span>;\npontos <span class="co">=</span> pontos <span class="co">+</span> <span class="cn">5</span>;\n<span class="cf">printf</span>(<span class="cs">"%d\\n"</span>, pontos);`,
  cpp: `<span class="ck">int</span> pontos <span class="co">=</span> <span class="cn">10</span>;\npontos <span class="co">=</span> pontos <span class="co">+</span> <span class="cn">5</span>;\n<span class="cf">cout</span> <span class="co">&lt;&lt;</span> pontos <span class="co">&lt;&lt;</span> <span class="cf">endl</span>;`,
  csharp: `<span class="ck">int</span> pontos <span class="co">=</span> <span class="cn">10</span>;\npontos <span class="co">=</span> pontos <span class="co">+</span> <span class="cn">5</span>;\n<span class="cf">Console.WriteLine</span>(pontos);`,
}[lang] || `valor <span class="co">=</span> <span class="cn">10</span>\nvalor <span class="co">=</span> valor <span class="co">+</span> <span class="cn">5</span>`)}

${quiz('variaveis', {
  question: 'Qual desses é um exemplo correto de nome de variável?',
  opts: ['2nome', 'meu nome', 'meu_nome', 'meu-nome'],
  correctIndex: 2,
  feedback: { ok: 'Correto! Underscore (_) é permitido em nomes de variáveis.', no: 'Nomes de variáveis não podem começar com número, ter espaços ou hífens. Use underscore (_) para separar palavras.' },
})}`;
}

// ------- AULA: ENTRADA E SAÍDA -------
function buildLesson_IO(lang) {
  const examples = {
    python: `<span class="cc"># Lendo entrada do usuário</span>\nnome <span class="co">=</span> <span class="cf">input</span>(<span class="cs">"Qual é o seu nome? "</span>)\nidade <span class="co">=</span> <span class="cf">int</span>(<span class="cf">input</span>(<span class="cs">"Qual é a sua idade? "</span>))\n\n<span class="cf">print</span>(<span class="cs">f"Olá, {nome}! Você tem {idade} anos."</span>)`,
    javascript: `<span class="cc">// No navegador (prompt)</span>\n<span class="ck">let</span> nome <span class="co">=</span> <span class="cf">prompt</span>(<span class="cs">"Qual é o seu nome?"</span>);\n<span class="ck">let</span> idade <span class="co">=</span> <span class="cf">parseInt</span>(<span class="cf">prompt</span>(<span class="cs">"Qual é a sua idade?"</span>));\n\n<span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">\`Olá, \${nome}! Você tem \${idade} anos.\`</span>);`,
    java: `<span class="ck">import</span> java.util.Scanner;\n\n<span class="ck">public class</span> <span class="cf">EntradaDados</span> {\n  <span class="ck">public static void</span> <span class="cf">main</span>(<span class="ck">String</span>[] args) {\n    <span class="ck">Scanner</span> sc <span class="co">=</span> <span class="ck">new</span> <span class="cf">Scanner</span>(System.in);\n    <span class="cf">System.out.print</span>(<span class="cs">"Qual é o seu nome? "</span>);\n    <span class="ck">String</span> nome <span class="co">=</span> sc.<span class="cf">nextLine</span>();\n    <span class="cf">System.out.println</span>(<span class="cs">"Olá, "</span> <span class="co">+</span> nome <span class="co">+</span> <span class="cs">"!"</span>);\n  }\n}`,
    c: `<span class="ck">#include</span> <span class="cs">&lt;stdio.h&gt;</span>\n\n<span class="ck">int</span> <span class="cf">main</span>() {\n  <span class="ck">char</span> nome[<span class="cn">50</span>];\n  <span class="ck">int</span> idade;\n\n  <span class="cf">printf</span>(<span class="cs">"Qual é o seu nome? "</span>);\n  <span class="cf">scanf</span>(<span class="cs">"%s"</span>, nome);\n\n  <span class="cf">printf</span>(<span class="cs">"Olá, %s!\\n"</span>, nome);\n  <span class="ck">return</span> <span class="cn">0</span>;\n}`,
    cpp: `<span class="ck">#include</span> <span class="cs">&lt;iostream&gt;</span>\n<span class="ck">#include</span> <span class="cs">&lt;string&gt;</span>\n\n<span class="ck">int</span> <span class="cf">main</span>() {\n  <span class="ck">string</span> nome;\n  <span class="cf">cout</span> <span class="co">&lt;&lt;</span> <span class="cs">"Qual é o seu nome? "</span>;\n  <span class="cf">cin</span> <span class="co">&gt;&gt;</span> nome;\n  <span class="cf">cout</span> <span class="co">&lt;&lt;</span> <span class="cs">"Olá, "</span> <span class="co">&lt;&lt;</span> nome <span class="co">&lt;&lt;</span> <span class="cs">"!"</span> <span class="co">&lt;&lt;</span> <span class="cf">endl</span>;\n  <span class="ck">return</span> <span class="cn">0</span>;\n}`,
    csharp: `<span class="cf">Console.Write</span>(<span class="cs">"Qual é o seu nome? "</span>);\n<span class="ck">string</span> nome <span class="co">=</span> <span class="cf">Console.ReadLine</span>();\n\n<span class="cf">Console.Write</span>(<span class="cs">"Qual é a sua idade? "</span>);\n<span class="ck">int</span> idade <span class="co">=</span> <span class="cf">int.Parse</span>(<span class="cf">Console.ReadLine</span>());\n\n<span class="cf">Console.WriteLine</span>(<span class="cs">$"Olá, {nome}! Você tem {idade} anos."</span>);`,
  };

  return `
<h1>Entrada e Saída de Dados</h1>
<p class="lesson-intro">Todo programa útil precisa se comunicar com o usuário: receber informações (entrada) e mostrar resultados (saída). Essa é a base de qualquer interação.</p>

<h2>Saída de dados</h2>
<p>Você já viu como exibir texto na aula anterior. Vamos reforçar: o comando de saída imprime valores na tela.</p>

<h2>Entrada de dados</h2>
<p>Para receber dados do usuário, ${LANG_NAMES[lang]} oferece um comando específico que "pausa" o programa e aguarda o usuário digitar algo.</p>

${codeBlock(lang, examples[lang] || examples.python)}

${infoBox('warn', '⚠️', 'Conversão de tipos', `O que o usuário digita é sempre texto (string). Se precisar de um número, você deve <strong>converter</strong> explicitamente — como <code>int(input())</code> em Python ou <code>int.Parse()</code> em C#.`)}

<h2>Formatação de saída</h2>
<p>É possível misturar texto e variáveis na saída de forma elegante usando <strong>interpolação de strings</strong> ou concatenação.</p>

${infoBox('tip', '💡', 'Dica profissional', 'Prefira interpolação de strings (f-strings em Python, template literals em JS) para evitar erros e deixar o código mais legível.')}

<h2>Exemplo completo: calculando ano de nascimento</h2>
<p>Este exemplo une entrada, conversao de tipo e saida formatada em um fluxo real de programa.</p>
${codeBlock(lang, {
  python: `nome <span class="co">=</span> <span class="cf">input</span>(<span class="cs">"Nome: "</span>)\nidade <span class="co">=</span> <span class="cf">int</span>(<span class="cf">input</span>(<span class="cs">"Idade: "</span>))\nano_atual <span class="co">=</span> <span class="cn">2026</span>\n<span class="cf">print</span>(<span class="cs">f"{nome}, voce nasceu em {ano_atual - idade}"</span>)`,
  javascript: `<span class="ck">const</span> nome <span class="co">=</span> <span class="cf">prompt</span>(<span class="cs">"Nome:"</span>);\n<span class="ck">const</span> idade <span class="co">=</span> <span class="cf">parseInt</span>(<span class="cf">prompt</span>(<span class="cs">"Idade:"</span>), <span class="cn">10</span>);\n<span class="ck">const</span> anoAtual <span class="co">=</span> <span class="cn">2026</span>;\n<span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">\`\${nome}, voce nasceu em \${anoAtual - idade}\`</span>);`,
}[lang] || `<span class="cc">// Leia dados e converta para numero antes de calcular</span>`)}

${quiz(
  'Por que precisamos converter o resultado do input() ao pedir um número?',
  ['Para deixar o código mais rápido', 'Porque o input sempre retorna texto (string)', 'Para o programa não travar', 'Não é necessário converter'],
  1,
  { ok: 'Perfeito! Funções de entrada sempre retornam texto. Precisamos converter para operar matematicamente.', no: 'A resposta certa é: funções de entrada sempre retornam texto (string), então precisamos converter para o tipo correto.' }
)}`;
}

// ------- AULA: CONDICIONAIS -------
function buildLesson_Conditionals(lang) {
  const examples = {
    python: `<span class="cc"># Estrutura if/elif/else</span>\nidade <span class="co">=</span> <span class="cn">18</span>\n\n<span class="ck">if</span> idade <span class="co">&gt;=</span> <span class="cn">18</span>:\n    <span class="cf">print</span>(<span class="cs">"Maior de idade"</span>)\n<span class="ck">elif</span> idade <span class="co">&gt;=</span> <span class="cn">12</span>:\n    <span class="cf">print</span>(<span class="cs">"Adolescente"</span>)\n<span class="ck">else</span>:\n    <span class="cf">print</span>(<span class="cs">"Criança"</span>)`,
    javascript: `<span class="cc">// Estrutura if/else if/else</span>\n<span class="ck">let</span> idade <span class="co">=</span> <span class="cn">18</span>;\n\n<span class="ck">if</span> (idade <span class="co">&gt;=</span> <span class="cn">18</span>) {\n  <span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">"Maior de idade"</span>);\n} <span class="ck">else if</span> (idade <span class="co">&gt;=</span> <span class="cn">12</span>) {\n  <span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">"Adolescente"</span>);\n} <span class="ck">else</span> {\n  <span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">"Criança"</span>);\n}`,
    java: `<span class="ck">int</span> idade <span class="co">=</span> <span class="cn">18</span>;\n\n<span class="ck">if</span> (idade <span class="co">&gt;=</span> <span class="cn">18</span>) {\n  <span class="cf">System.out.println</span>(<span class="cs">"Maior de idade"</span>);\n} <span class="ck">else if</span> (idade <span class="co">&gt;=</span> <span class="cn">12</span>) {\n  <span class="cf">System.out.println</span>(<span class="cs">"Adolescente"</span>);\n} <span class="ck">else</span> {\n  <span class="cf">System.out.println</span>(<span class="cs">"Criança"</span>);\n}`,
    c: `<span class="ck">int</span> idade <span class="co">=</span> <span class="cn">18</span>;\n\n<span class="ck">if</span> (idade <span class="co">&gt;=</span> <span class="cn">18</span>) {\n  <span class="cf">printf</span>(<span class="cs">"Maior de idade\\n"</span>);\n} <span class="ck">else if</span> (idade <span class="co">&gt;=</span> <span class="cn">12</span>) {\n  <span class="cf">printf</span>(<span class="cs">"Adolescente\\n"</span>);\n} <span class="ck">else</span> {\n  <span class="cf">printf</span>(<span class="cs">"Criança\\n"</span>);\n}`,
    cpp: `<span class="ck">int</span> idade <span class="co">=</span> <span class="cn">18</span>;\n\n<span class="ck">if</span> (idade <span class="co">&gt;=</span> <span class="cn">18</span>) {\n  <span class="cf">cout</span> <span class="co">&lt;&lt;</span> <span class="cs">"Maior de idade"</span> <span class="co">&lt;&lt;</span> <span class="cf">endl</span>;\n} <span class="ck">else if</span> (idade <span class="co">&gt;=</span> <span class="cn">12</span>) {\n  <span class="cf">cout</span> <span class="co">&lt;&lt;</span> <span class="cs">"Adolescente"</span> <span class="co">&lt;&lt;</span> <span class="cf">endl</span>;\n} <span class="ck">else</span> {\n  <span class="cf">cout</span> <span class="co">&lt;&lt;</span> <span class="cs">"Criança"</span> <span class="co">&lt;&lt;</span> <span class="cf">endl</span>;\n}`,
    csharp: `<span class="ck">int</span> idade <span class="co">=</span> <span class="cn">18</span>;\n\n<span class="ck">if</span> (idade <span class="co">&gt;=</span> <span class="cn">18</span>) {\n  <span class="cf">Console.WriteLine</span>(<span class="cs">"Maior de idade"</span>);\n} <span class="ck">else if</span> (idade <span class="co">&gt;=</span> <span class="cn">12</span>) {\n  <span class="cf">Console.WriteLine</span>(<span class="cs">"Adolescente"</span>);\n} <span class="ck">else</span> {\n  <span class="cf">Console.WriteLine</span>(<span class="cs">"Criança"</span>);\n}`,
  };
  return `
<h1>Condicionais — if / else</h1>
<p class="lesson-intro">Condicionais permitem que o programa tome <em>decisões</em>. Com base em uma condição, o código segue caminhos diferentes — como uma encruzilhada.</p>

<h2>Estrutura básica</h2>
<p>A lógica é: <strong>se</strong> (if) algo for verdadeiro, faça X. <strong>Senão</strong> (else), faça Y.</p>

${codeBlock(lang, examples[lang] || examples.python)}

<h2>Operadores de comparação</h2>
${infoBox('', '🔍', 'Operadores', '<code>==</code> igual · <code>!=</code> diferente · <code>&gt;</code> maior · <code>&lt;</code> menor · <code>&gt;=</code> maior ou igual · <code>&lt;=</code> menor ou igual')}

<h2>Operadores lógicos</h2>
${infoBox('tip', '🔗', 'Combinando condições', '<code>and / &&</code> — ambas verdadeiras · <code>or / ||</code> — pelo menos uma verdadeira · <code>not / !</code> — inverte o resultado')}

<h2>Exemplo com duas condicoes</h2>
<p>Voce pode combinar condicoes para tomar decisoes mais inteligentes no seu programa.</p>
${codeBlock(lang, {
  python: `idade <span class="co">=</span> <span class="cn">20</span>\ntem_carteira <span class="co">=</span> <span class="ck">True</span>\n\n<span class="ck">if</span> idade <span class="co">&gt;=</span> <span class="cn">18</span> <span class="ck">and</span> tem_carteira:\n    <span class="cf">print</span>(<span class="cs">"Pode dirigir"</span>)\n<span class="ck">else</span>:\n    <span class="cf">print</span>(<span class="cs">"Nao pode dirigir"</span>)`,
  javascript: `<span class="ck">const</span> idade <span class="co">=</span> <span class="cn">20</span>;\n<span class="ck">const</span> temCarteira <span class="co">=</span> <span class="ck">true</span>;\n\n<span class="ck">if</span> (idade <span class="co">&gt;=</span> <span class="cn">18</span> <span class="co">&amp;&amp;</span> temCarteira) {\n  <span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">"Pode dirigir"</span>);\n} <span class="ck">else</span> {\n  <span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">"Nao pode dirigir"</span>);\n}`,
}[lang] || `<span class="cc">// Combine condicoes com AND/OR</span>`)}

${quiz('condicionais', {
  question: 'Se idade = 15, o que o código acima imprime?',
  opts: ['Maior de idade', 'Adolescente', 'Criança', 'Nada'],
  correctIndex: 1,
  feedback: { ok: 'Certo! 15 >= 12 é verdadeiro, então entra no elif/else if.', no: '15 não é >= 18, mas é >= 12. Então cai no bloco "Adolescente".' },
})}`;
}

// ------- AULA: LOOPS -------
function buildLesson_Loops(lang) {
  const forEx = {
    python: `<span class="cc"># Loop for — percorre uma sequência</span>\n<span class="ck">for</span> i <span class="ck">in</span> <span class="cf">range</span>(<span class="cn">5</span>):\n    <span class="cf">print</span>(<span class="cs">f"Contagem: {i}"</span>)\n\n<span class="cc"># Loop while — enquanto condição for verdadeira</span>\ncontador <span class="co">=</span> <span class="cn">0</span>\n<span class="ck">while</span> contador <span class="co">&lt;</span> <span class="cn">5</span>:\n    <span class="cf">print</span>(<span class="cs">f"Valor: {contador}"</span>)\n    contador <span class="co">+=</span> <span class="cn">1</span>`,
    javascript: `<span class="cc">// Loop for</span>\n<span class="ck">for</span> (<span class="ck">let</span> i <span class="co">=</span> <span class="cn">0</span>; i <span class="co">&lt;</span> <span class="cn">5</span>; i<span class="co">++</span>) {\n  <span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">\`Contagem: \${i}\`</span>);\n}\n\n<span class="cc">// Loop while</span>\n<span class="ck">let</span> contador <span class="co">=</span> <span class="cn">0</span>;\n<span class="ck">while</span> (contador <span class="co">&lt;</span> <span class="cn">5</span>) {\n  <span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">\`Valor: \${contador}\`</span>);\n  contador<span class="co">++</span>;\n}`,
    java: `<span class="cc">// Loop for</span>\n<span class="ck">for</span> (<span class="ck">int</span> i <span class="co">=</span> <span class="cn">0</span>; i <span class="co">&lt;</span> <span class="cn">5</span>; i<span class="co">++</span>) {\n  <span class="cf">System.out.println</span>(<span class="cs">"Contagem: "</span> <span class="co">+</span> i);\n}\n\n<span class="cc">// Loop while</span>\n<span class="ck">int</span> contador <span class="co">=</span> <span class="cn">0</span>;\n<span class="ck">while</span> (contador <span class="co">&lt;</span> <span class="cn">5</span>) {\n  <span class="cf">System.out.println</span>(<span class="cs">"Valor: "</span> <span class="co">+</span> contador);\n  contador<span class="co">++</span>;\n}`,
    c: `<span class="cc">/* Loop for */</span>\n<span class="ck">for</span> (<span class="ck">int</span> i <span class="co">=</span> <span class="cn">0</span>; i <span class="co">&lt;</span> <span class="cn">5</span>; i<span class="co">++</span>) {\n  <span class="cf">printf</span>(<span class="cs">"Contagem: %d\\n"</span>, i);\n}\n\n<span class="cc">/* Loop while */</span>\n<span class="ck">int</span> contador <span class="co">=</span> <span class="cn">0</span>;\n<span class="ck">while</span> (contador <span class="co">&lt;</span> <span class="cn">5</span>) {\n  <span class="cf">printf</span>(<span class="cs">"Valor: %d\\n"</span>, contador);\n  contador<span class="co">++</span>;\n}`,
    cpp: `<span class="cc">// Loop for</span>\n<span class="ck">for</span> (<span class="ck">int</span> i <span class="co">=</span> <span class="cn">0</span>; i <span class="co">&lt;</span> <span class="cn">5</span>; i<span class="co">++</span>) {\n  <span class="cf">cout</span> <span class="co">&lt;&lt;</span> <span class="cs">"Contagem: "</span> <span class="co">&lt;&lt;</span> i <span class="co">&lt;&lt;</span> <span class="cf">endl</span>;\n}\n\n<span class="cc">// Loop while</span>\n<span class="ck">int</span> contador <span class="co">=</span> <span class="cn">0</span>;\n<span class="ck">while</span> (contador <span class="co">&lt;</span> <span class="cn">5</span>) {\n  <span class="cf">cout</span> <span class="co">&lt;&lt;</span> <span class="cs">"Valor: "</span> <span class="co">&lt;&lt;</span> contador <span class="co">&lt;&lt;</span> <span class="cf">endl</span>;\n  contador<span class="co">++</span>;\n}`,
    csharp: `<span class="cc">// Loop for</span>\n<span class="ck">for</span> (<span class="ck">int</span> i <span class="co">=</span> <span class="cn">0</span>; i <span class="co">&lt;</span> <span class="cn">5</span>; i<span class="co">++</span>) {\n  <span class="cf">Console.WriteLine</span>(<span class="cs">$"Contagem: {i}"</span>);\n}\n\n<span class="cc">// Loop while</span>\n<span class="ck">int</span> contador <span class="co">=</span> <span class="cn">0</span>;\n<span class="ck">while</span> (contador <span class="co">&lt;</span> <span class="cn">5</span>) {\n  <span class="cf">Console.WriteLine</span>(<span class="cs">$"Valor: {contador}"</span>);\n  contador<span class="co">++</span>;\n}`,
  };
  return `
<h1>Laços de Repetição</h1>
<p class="lesson-intro">Laços (loops) permitem executar o mesmo bloco de código várias vezes — evitando que você copie e cole a mesma linha dezenas de vezes.</p>

<h2>for e while</h2>
<p>O <strong>for</strong> é usado quando sabemos quantas vezes repetir. O <strong>while</strong> repete enquanto uma condição for verdadeira.</p>

${codeBlock(lang, forEx[lang] || forEx.python)}

${infoBox('warn', '⚠️', 'Loop infinito', 'Cuidado com o <code>while</code>! Se a condição nunca se tornar falsa, o programa trava. Sempre garanta que o valor muda a cada iteração.')}

${infoBox('tip', '💡', 'break e continue', '<code>break</code> interrompe o loop imediatamente. <code>continue</code> pula para a próxima iteração sem executar o restante do bloco.')}

${quiz(
  'Um loop for com range(5) em Python executa quantas vezes?',
  ['4 vezes', '5 vezes', '6 vezes', '1 vez'],
  1,
  { ok: 'Correto! range(5) gera: 0, 1, 2, 3, 4 — cinco valores.', no: 'range(5) gera os valores 0, 1, 2, 3, 4 — são 5 iterações no total.' }
)}`;
}

// ------- AULA: FUNÇÕES -------
function buildLesson_Functions(lang) {
  const ex = {
    python: `<span class="cc"># Definindo e chamando uma função</span>\n<span class="ck">def</span> <span class="cf">saudar</span>():\n    <span class="cf">print</span>(<span class="cs">"Olá! Bem-vindo ao ESMAEL.IAS!"</span>)\n\n<span class="cc"># Chamando a função</span>\n<span class="cf">saudar</span>()`,
    javascript: `<span class="cc">// Definindo e chamando uma função</span>\n<span class="ck">function</span> <span class="cf">saudar</span>() {\n  <span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">"Olá! Bem-vindo ao ESMAEL.IAS!"</span>);\n}\n\n<span class="cc">// Chamando a função</span>\n<span class="cf">saudar</span>();`,
    java: `<span class="ck">public static void</span> <span class="cf">saudar</span>() {\n  <span class="cf">System.out.println</span>(<span class="cs">"Olá! Bem-vindo ao ESMAEL.IAS!"</span>);\n}\n\n<span class="cc">// Chamando no main:</span>\n<span class="cf">saudar</span>();`,
    c: `<span class="ck">void</span> <span class="cf">saudar</span>() {\n  <span class="cf">printf</span>(<span class="cs">"Olá! Bem-vindo ao ESMAEL.IAS!\\n"</span>);\n}\n\n<span class="cc">// Chamando no main:</span>\n<span class="cf">saudar</span>();`,
    cpp: `<span class="ck">void</span> <span class="cf">saudar</span>() {\n  <span class="cf">cout</span> <span class="co">&lt;&lt;</span> <span class="cs">"Olá! Bem-vindo ao ESMAEL.IAS!"</span> <span class="co">&lt;&lt;</span> <span class="cf">endl</span>;\n}\n\n<span class="cc">// Chamando no main:</span>\n<span class="cf">saudar</span>();`,
    csharp: `<span class="ck">static void</span> <span class="cf">Saudar</span>() {\n  <span class="cf">Console.WriteLine</span>(<span class="cs">"Olá! Bem-vindo ao ESMAEL.IAS!"</span>);\n}\n\n<span class="cc">// Chamando:</span>\n<span class="cf">Saudar</span>();`,
  };
  return `
<h1>O que são Funções?</h1>
<p class="lesson-intro">Funções são blocos de código com nome que executam uma tarefa específica. Em vez de repetir código, você define uma vez e chama quantas vezes precisar.</p>

<h2>Criando sua primeira função</h2>
${codeBlock(lang, ex[lang] || ex.python)}

${infoBox('', '🧱', 'Por que usar funções?', 'Funções tornam o código <strong>organizado, reutilizável e fácil de corrigir</strong>. Se há um erro, você corrige em um só lugar.')}

<h2>Anatomia de uma função</h2>
<p>Uma função tem: <strong>nome</strong>, <strong>parâmetros</strong> (opcional) e <strong>corpo</strong> (o código que executa). Ela pode também <strong>retornar</strong> um valor.</p>

${infoBox('tip', '💡', 'Princípio da responsabilidade única', 'Uma boa função faz <em>uma coisa só</em> e faz bem. Evite funções com 50 linhas que fazem tudo ao mesmo tempo.')}

<h2>Exemplo prático: reaproveitando função</h2>
<p>Com funcoes, voce evita repeticao. Repare como a mesma funcao pode ser chamada com dados diferentes.</p>
${codeBlock(lang, {
  python: `<span class="ck">def</span> <span class="cf">boas_vindas</span>(nome):\n    <span class="cf">print</span>(<span class="cs">f"Bem-vindo, {nome}!"</span>)\n\n<span class="cf">boas_vindas</span>(<span class="cs">"Ana"</span>)\n<span class="cf">boas_vindas</span>(<span class="cs">"Carlos"</span>)`,
  javascript: `<span class="ck">function</span> <span class="cf">boasVindas</span>(nome) {\n  <span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">\`Bem-vindo, \${nome}!\`</span>);\n}\n\n<span class="cf">boasVindas</span>(<span class="cs">"Ana"</span>);\n<span class="cf">boasVindas</span>(<span class="cs">"Carlos"</span>);`,
}[lang] || `<span class="cc">// Defina uma funcao e chame mais de uma vez</span>`)}

${quiz(
  'Qual a principal vantagem de usar funções?',
  ['Deixar o código mais colorido', 'Reutilizar código e evitar repetições', 'Tornar o programa mais lento', 'Aumentar o número de variáveis'],
  1,
  { ok: 'Exato! Funções permitem escrever o código uma vez e reutilizá-lo várias vezes.', no: 'A principal vantagem é a reutilização de código — você escreve uma vez e chama quantas vezes precisar.' }
)}`;
}

// ------- AULA: PARÂMETROS E RETORNO -------
function buildLesson_FuncParams(lang) {
  const ex = {
    python: `<span class="cc"># Função com parâmetros e retorno</span>\n<span class="ck">def</span> <span class="cf">somar</span>(a, b):\n    <span class="ck">return</span> a <span class="co">+</span> b\n\n<span class="ck">def</span> <span class="cf">apresentar</span>(nome, idade<span class="co">=</span><span class="cn">0</span>):\n    <span class="cf">print</span>(<span class="cs">f"Sou {nome} e tenho {idade} anos."</span>)\n\nresultado <span class="co">=</span> <span class="cf">somar</span>(<span class="cn">3</span>, <span class="cn">7</span>)\n<span class="cf">print</span>(resultado)  <span class="cc"># 10</span>\n<span class="cf">apresentar</span>(<span class="cs">"Ana"</span>, <span class="cn">25</span>)`,
    javascript: `<span class="cc">// Função com parâmetros e retorno</span>\n<span class="ck">function</span> <span class="cf">somar</span>(a, b) {\n  <span class="ck">return</span> a <span class="co">+</span> b;\n}\n\n<span class="ck">function</span> <span class="cf">apresentar</span>(nome, idade <span class="co">=</span> <span class="cn">0</span>) {\n  <span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">\`Sou \${nome} e tenho \${idade} anos.\`</span>);\n}\n\n<span class="ck">let</span> resultado <span class="co">=</span> <span class="cf">somar</span>(<span class="cn">3</span>, <span class="cn">7</span>);\n<span class="cf">console</span>.<span class="cf">log</span>(resultado); <span class="cc">// 10</span>`,
    java: `<span class="ck">public static int</span> <span class="cf">somar</span>(<span class="ck">int</span> a, <span class="ck">int</span> b) {\n  <span class="ck">return</span> a <span class="co">+</span> b;\n}\n\n<span class="ck">public static void</span> <span class="cf">apresentar</span>(<span class="ck">String</span> nome, <span class="ck">int</span> idade) {\n  <span class="cf">System.out.println</span>(<span class="cs">"Sou "</span> <span class="co">+</span> nome <span class="co">+</span> <span class="cs">" e tenho "</span> <span class="co">+</span> idade <span class="co">+</span> <span class="cs">" anos."</span>);\n}\n\n<span class="ck">int</span> resultado <span class="co">=</span> <span class="cf">somar</span>(<span class="cn">3</span>, <span class="cn">7</span>); <span class="cc">// 10</span>`,
    c: `<span class="ck">int</span> <span class="cf">somar</span>(<span class="ck">int</span> a, <span class="ck">int</span> b) {\n  <span class="ck">return</span> a <span class="co">+</span> b;\n}\n\n<span class="ck">void</span> <span class="cf">apresentar</span>(<span class="ck">char</span>* nome, <span class="ck">int</span> idade) {\n  <span class="cf">printf</span>(<span class="cs">"Sou %s e tenho %d anos.\\n"</span>, nome, idade);\n}\n\n<span class="ck">int</span> resultado <span class="co">=</span> <span class="cf">somar</span>(<span class="cn">3</span>, <span class="cn">7</span>); <span class="cc">/* 10 */</span>`,
    cpp: `<span class="ck">int</span> <span class="cf">somar</span>(<span class="ck">int</span> a, <span class="ck">int</span> b) {\n  <span class="ck">return</span> a <span class="co">+</span> b;\n}\n\n<span class="ck">void</span> <span class="cf">apresentar</span>(<span class="ck">string</span> nome, <span class="ck">int</span> idade <span class="co">=</span> <span class="cn">0</span>) {\n  <span class="cf">cout</span> <span class="co">&lt;&lt;</span> <span class="cs">"Sou "</span> <span class="co">&lt;&lt;</span> nome <span class="co">&lt;&lt;</span> <span class="cs">" e tenho "</span> <span class="co">&lt;&lt;</span> idade <span class="co">&lt;&lt;</span> <span class="cs">" anos."</span> <span class="co">&lt;&lt;</span> <span class="cf">endl</span>;\n}\n\n<span class="ck">int</span> resultado <span class="co">=</span> <span class="cf">somar</span>(<span class="cn">3</span>, <span class="cn">7</span>); <span class="cc">// 10</span>`,
    csharp: `<span class="ck">static int</span> <span class="cf">Somar</span>(<span class="ck">int</span> a, <span class="ck">int</span> b) {\n  <span class="ck">return</span> a <span class="co">+</span> b;\n}\n\n<span class="ck">static void</span> <span class="cf">Apresentar</span>(<span class="ck">string</span> nome, <span class="ck">int</span> idade <span class="co">=</span> <span class="cn">0</span>) {\n  <span class="cf">Console.WriteLine</span>(<span class="cs">$"Sou {nome} e tenho {idade} anos."</span>);\n}\n\n<span class="ck">int</span> resultado <span class="co">=</span> <span class="cf">Somar</span>(<span class="cn">3</span>, <span class="cn">7</span>); <span class="cc">// 10</span>`,
  };
  return `
<h1>Parâmetros e Retorno</h1>
<p class="lesson-intro">Funções ficam muito mais poderosas quando podem <em>receber dados</em> (parâmetros) e <em>devolver resultados</em> (retorno).</p>

<h2>Parâmetros</h2>
<p>Parâmetros são variáveis que a função recebe quando é chamada. Você define os nomes na declaração e passa os valores na chamada.</p>

${codeBlock(lang, ex[lang] || ex.python)}

${infoBox('', '↩️', 'Retorno (return)', 'O comando <code>return</code> finaliza a função e devolve um valor. Esse valor pode ser guardado em uma variável ou usado diretamente.')}
${infoBox('tip', '💡', 'Parâmetros com valor padrão', 'Você pode definir um valor padrão para parâmetros opcionais. Se não for passado um valor, o padrão é usado automaticamente.')}

${quiz(
  'O que acontece quando uma função usa "return"?',
  ['O programa para de rodar', 'A função termina e devolve um valor', 'Um novo loop começa', 'Cria uma variável nova'],
  1,
  { ok: 'Correto! O return encerra a função e envia de volta um valor para quem a chamou.', no: 'O return encerra a execução da função e devolve um valor — como uma resposta da função.' }
)}`;
}

// ------- AULA: ARRAYS -------
function buildLesson_Arrays(lang) {
  const ex = {
    python: `<span class="cc"># Listas em Python</span>\nfrutas <span class="co">=</span> [<span class="cs">"maçã"</span>, <span class="cs">"banana"</span>, <span class="cs">"laranja"</span>]\nnumeros <span class="co">=</span> [<span class="cn">10</span>, <span class="cn">20</span>, <span class="cn">30</span>, <span class="cn">40</span>]\n\n<span class="cf">print</span>(frutas[<span class="cn">0</span>])    <span class="cc"># "maçã" (índice 0)</span>\nfrutas.<span class="cf">append</span>(<span class="cs">"uva"</span>)  <span class="cc"># adicionar</span>\nfrutas.<span class="cf">remove</span>(<span class="cs">"banana"</span>)  <span class="cc"># remover</span>\n\n<span class="ck">for</span> fruta <span class="ck">in</span> frutas:\n    <span class="cf">print</span>(fruta)`,
    javascript: `<span class="cc">// Arrays em JavaScript</span>\n<span class="ck">let</span> frutas <span class="co">=</span> [<span class="cs">"maçã"</span>, <span class="cs">"banana"</span>, <span class="cs">"laranja"</span>];\n\n<span class="cf">console</span>.<span class="cf">log</span>(frutas[<span class="cn">0</span>]);  <span class="cc">// "maçã"</span>\nfrutas.<span class="cf">push</span>(<span class="cs">"uva"</span>);      <span class="cc">// adicionar no fim</span>\nfrutas.<span class="cf">splice</span>(<span class="cn">1</span>, <span class="cn">1</span>);    <span class="cc">// remover índice 1</span>\n\nfrutas.<span class="cf">forEach</span>(f <span class="co">=&gt;</span> <span class="cf">console</span>.<span class="cf">log</span>(f));`,
    java: `<span class="cc">// Arrays e ArrayList em Java</span>\n<span class="ck">import</span> java.util.ArrayList;\n\n<span class="ck">ArrayList</span>&lt;<span class="ck">String</span>&gt; frutas <span class="co">=</span> <span class="ck">new</span> <span class="cf">ArrayList</span>&lt;&gt;();\nfrutas.<span class="cf">add</span>(<span class="cs">"maçã"</span>);\nfrutas.<span class="cf">add</span>(<span class="cs">"banana"</span>);\n<span class="cf">System.out.println</span>(frutas.<span class="cf">get</span>(<span class="cn">0</span>)); <span class="cc">// "maçã"</span>\n\n<span class="ck">for</span> (<span class="ck">String</span> f : frutas) {\n  <span class="cf">System.out.println</span>(f);\n}`,
    c: `<span class="cc">/* Arrays em C */</span>\n<span class="ck">int</span> numeros[<span class="cn">4</span>] <span class="co">=</span> {<span class="cn">10</span>, <span class="cn">20</span>, <span class="cn">30</span>, <span class="cn">40</span>};\n\n<span class="cf">printf</span>(<span class="cs">"%d\\n"</span>, numeros[<span class="cn">0</span>]); <span class="cc">/* 10 */</span>\n\n<span class="ck">for</span> (<span class="ck">int</span> i <span class="co">=</span> <span class="cn">0</span>; i <span class="co">&lt;</span> <span class="cn">4</span>; i<span class="co">++</span>) {\n  <span class="cf">printf</span>(<span class="cs">"%d\\n"</span>, numeros[i]);\n}`,
    cpp: `<span class="cc">// Vector em C++</span>\n<span class="ck">#include</span> <span class="cs">&lt;vector&gt;</span>\n\n<span class="ck">vector</span>&lt;<span class="ck">string</span>&gt; frutas <span class="co">=</span> {<span class="cs">"maçã"</span>, <span class="cs">"banana"</span>};\nfrutas.<span class="cf">push_back</span>(<span class="cs">"laranja"</span>);\n<span class="cf">cout</span> <span class="co">&lt;&lt;</span> frutas[<span class="cn">0</span>] <span class="co">&lt;&lt;</span> <span class="cf">endl</span>;\n\n<span class="ck">for</span> (<span class="ck">auto</span> f : frutas) {\n  <span class="cf">cout</span> <span class="co">&lt;&lt;</span> f <span class="co">&lt;&lt;</span> <span class="cf">endl</span>;\n}`,
    csharp: `<span class="cc">// List em C#</span>\n<span class="ck">using</span> System.Collections.Generic;\n\n<span class="ck">List</span>&lt;<span class="ck">string</span>&gt; frutas <span class="co">=</span> <span class="ck">new</span> <span class="cf">List</span>&lt;<span class="ck">string</span>&gt;();\nfrutas.<span class="cf">Add</span>(<span class="cs">"maçã"</span>);\nfrutas.<span class="cf">Add</span>(<span class="cs">"banana"</span>);\n<span class="cf">Console.WriteLine</span>(frutas[<span class="cn">0</span>]); <span class="cc">// "maçã"</span>\n\n<span class="ck">foreach</span> (<span class="ck">string</span> f <span class="ck">in</span> frutas) {\n  <span class="cf">Console.WriteLine</span>(f);\n}`,
  };
  return `
<h1>Arrays e Listas</h1>
<p class="lesson-intro">Arrays e listas permitem guardar <em>múltiplos valores</em> em uma única variável — como uma coleção organizada por posição (índice).</p>

<h2>Criando e acessando</h2>
<p>Cada item tem um <strong>índice</strong> que começa em <em>0</em> (não em 1!). O primeiro item é sempre o índice 0.</p>

${codeBlock(lang, ex[lang] || ex.python)}

${infoBox('warn', '⚠️', 'Índice começa em 0!', 'Se uma lista tem 3 itens, os índices são 0, 1 e 2. Acessar o índice 3 causará um erro (out of bounds).')}
${infoBox('tip', '💡', 'Iterando com for', 'Use um loop for para percorrer todos os itens de uma lista de forma automática, sem precisar saber o tamanho.')}

${quiz(
  'Se temos frutas = ["maçã", "banana", "uva"], qual é o valor de frutas[2]?',
  ['"maçã"', '"banana"', '"uva"', 'Erro — índice inválido'],
  2,
  { ok: 'Perfeito! Índice 2 é o terceiro elemento: "uva".', no: 'Lembre: o índice começa em 0. Então índice 0="maçã", 1="banana", 2="uva".' }
)}`;
}

// ------- AULAS AVANÇADAS (stubs) -------
function buildLesson_OOP(lang) {
  const ex = {
    python: `<span class="ck">class</span> <span class="cf">Pessoa</span>:\n    <span class="ck">def</span> <span class="cf">__init__</span>(self, nome, idade):\n        self.nome <span class="co">=</span> nome\n        self.idade <span class="co">=</span> idade\n\n    <span class="ck">def</span> <span class="cf">apresentar</span>(self):\n        <span class="cf">print</span>(<span class="cs">f"Olá, sou {self.nome}!"</span>)\n\n<span class="cc"># Criando instâncias</span>\nana <span class="co">=</span> <span class="cf">Pessoa</span>(<span class="cs">"Ana"</span>, <span class="cn">25</span>)\nana.<span class="cf">apresentar</span>()  <span class="cc"># "Olá, sou Ana!"</span>`,
    javascript: `<span class="ck">class</span> <span class="cf">Pessoa</span> {\n  <span class="cf">constructor</span>(nome, idade) {\n    this.nome <span class="co">=</span> nome;\n    this.idade <span class="co">=</span> idade;\n  }\n\n  <span class="cf">apresentar</span>() {\n    <span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">\`Olá, sou \${this.nome}!\`</span>);\n  }\n}\n\n<span class="ck">const</span> ana <span class="co">=</span> <span class="ck">new</span> <span class="cf">Pessoa</span>(<span class="cs">"Ana"</span>, <span class="cn">25</span>);\nana.<span class="cf">apresentar</span>();`,
    java: `<span class="ck">public class</span> <span class="cf">Pessoa</span> {\n  <span class="ck">String</span> nome;\n  <span class="ck">int</span> idade;\n\n  <span class="cf">Pessoa</span>(<span class="ck">String</span> nome, <span class="ck">int</span> idade) {\n    this.nome <span class="co">=</span> nome;\n    this.idade <span class="co">=</span> idade;\n  }\n\n  <span class="ck">void</span> <span class="cf">apresentar</span>() {\n    <span class="cf">System.out.println</span>(<span class="cs">"Olá, sou "</span> <span class="co">+</span> nome);\n  }\n}\n\n<span class="cf">Pessoa</span> ana <span class="co">=</span> <span class="ck">new</span> <span class="cf">Pessoa</span>(<span class="cs">"Ana"</span>, <span class="cn">25</span>);\nana.<span class="cf">apresentar</span>();`,
    c: `<span class="cc">/* C não tem classes — usa structs */</span>\n<span class="ck">typedef struct</span> {\n  <span class="ck">char</span> nome[<span class="cn">50</span>];\n  <span class="ck">int</span> idade;\n} Pessoa;\n\n<span class="ck">void</span> <span class="cf">apresentar</span>(Pessoa p) {\n  <span class="cf">printf</span>(<span class="cs">"Olá, sou %s!\\n"</span>, p.nome);\n}\n\nPessoa ana <span class="co">=</span> {<span class="cs">"Ana"</span>, <span class="cn">25</span>};\n<span class="cf">apresentar</span>(ana);`,
    cpp: `<span class="ck">class</span> <span class="cf">Pessoa</span> {\n<span class="ck">public</span>:\n  <span class="ck">string</span> nome;\n  <span class="ck">int</span> idade;\n\n  <span class="cf">Pessoa</span>(<span class="ck">string</span> n, <span class="ck">int</span> i) : nome(n), idade(i) {}\n\n  <span class="ck">void</span> <span class="cf">apresentar</span>() {\n    <span class="cf">cout</span> <span class="co">&lt;&lt;</span> <span class="cs">"Olá, sou "</span> <span class="co">&lt;&lt;</span> nome <span class="co">&lt;&lt;</span> <span class="cs">"!"</span> <span class="co">&lt;&lt;</span> <span class="cf">endl</span>;\n  }\n};\n\n<span class="cf">Pessoa</span> ana(<span class="cs">"Ana"</span>, <span class="cn">25</span>);\nana.<span class="cf">apresentar</span>();`,
    csharp: `<span class="ck">class</span> <span class="cf">Pessoa</span> {\n  <span class="ck">public string</span> Nome;\n  <span class="ck">public int</span> Idade;\n\n  <span class="ck">public</span> <span class="cf">Pessoa</span>(<span class="ck">string</span> nome, <span class="ck">int</span> idade) {\n    Nome <span class="co">=</span> nome; Idade <span class="co">=</span> idade;\n  }\n\n  <span class="ck">public void</span> <span class="cf">Apresentar</span>() {\n    <span class="cf">Console.WriteLine</span>(<span class="cs">$"Olá, sou {Nome}!"</span>);\n  }\n}\n\n<span class="ck">var</span> ana <span class="co">=</span> <span class="ck">new</span> <span class="cf">Pessoa</span>(<span class="cs">"Ana"</span>, <span class="cn">25</span>);\nana.<span class="cf">Apresentar</span>();`,
  };
  return `
<h1>Classes e Objetos</h1>
<p class="lesson-intro">Orientação a Objetos (OOP) é uma forma de organizar o código modelando o mundo real. Uma <em>classe</em> é o molde; um <em>objeto</em> é o produto criado a partir desse molde.</p>

<h2>Criando uma Classe</h2>
<p>Uma classe agrupa <strong>atributos</strong> (dados) e <strong>métodos</strong> (ações) relacionados a um conceito.</p>
${codeBlock(lang, ex[lang] || ex.python)}
${infoBox('', '🏭', 'Classe vs Objeto', 'A <strong>classe</strong> é o projeto. O <strong>objeto</strong> (instância) é o produto criado a partir dele. Você pode criar muitos objetos de uma mesma classe.')}
${infoBox('tip', '💡', 'Construtor', 'O construtor (<code>__init__</code>, <code>constructor</code>) é chamado automaticamente quando um objeto é criado. Serve para inicializar os atributos.')}
${quiz('O que é uma instância?', ['Um tipo de loop', 'Um objeto criado a partir de uma classe', 'Uma função especial', 'Um tipo de variável'], 1, { ok: 'Correto! Instância = objeto criado a partir de uma classe.', no: 'Instância é um objeto criado (instanciado) a partir de uma classe.' })}`;
}

function buildLesson_Encapsulation(lang) {
  return `<h1>Encapsulamento</h1>
<p class="lesson-intro">Encapsulamento é o princípio de <em>esconder os detalhes internos</em> de uma classe, expondo apenas o necessário. Protege os dados de acesso indevido.</p>
<h2>Modificadores de acesso</h2>
${infoBox('', '🔒', 'private / public / protected', '<strong>public</strong>: acessível por qualquer código. <strong>private</strong>: acessível apenas dentro da própria classe. <strong>protected</strong>: acessível na classe e subclasses.')}
${infoBox('tip', '💡', 'Getters e Setters', 'São métodos que controlam o acesso aos atributos privados. O <em>getter</em> lê o valor; o <em>setter</em> define, podendo validar antes.')}
${quiz('Por que usamos atributos privados?', ['Para deixar o código mais curto', 'Para proteger os dados de acesso direto indevido', 'Para o código rodar mais rápido', 'Para evitar funções'], 1, { ok: 'Exato! Encapsulamento protege os dados internos da classe.', no: 'Atributos privados protegem os dados — outros códigos não podem alterá-los diretamente.' })}`;
}

function buildLesson_Inheritance(lang) {
  return `<h1>Herança</h1>
<p class="lesson-intro">Herança permite que uma classe <em>herde</em> atributos e métodos de outra — evitando repetição de código e criando hierarquias lógicas.</p>
${infoBox('', '🧬', 'Superclasse e Subclasse', 'A <strong>superclasse</strong> (pai) define o comportamento base. A <strong>subclasse</strong> (filho) herda e pode adicionar ou sobrescrever comportamentos.')}
${infoBox('tip', '💡', 'Override / Sobrescrita', 'A subclasse pode redefinir um método herdado para ter comportamento diferente. Isso é chamado de <em>sobrescrita</em> (override).')}
${quiz('Qual o principal benefício da herança?', ['Tornar o código mais difícil', 'Reutilizar código da classe pai', 'Criar mais variáveis', 'Deixar o programa mais lento'], 1, { ok: 'Perfeito! A herança promove a reutilização de código.', no: 'O principal benefício é reutilizar o código da classe pai sem precisar reescrevê-lo.' })}`;
}

function buildLesson_Errors(lang) {
  return `<h1>Tratamento de Erros</h1>
<p class="lesson-intro">Erros acontecem — o importante é <em>tratar</em> eles de forma elegante, sem deixar o programa travar abruptamente.</p>
${infoBox('', '🛡️', 'try / catch / finally', '<strong>try</strong>: código que pode gerar erro. <strong>catch</strong>: o que fazer se o erro acontecer. <strong>finally</strong>: executa sempre, com ou sem erro.')}
${infoBox('warn', '⚠️', 'Não abuse do try/catch', 'Não use try/catch para esconder bugs. Use para tratar situações <em>esperadas</em> como entrada inválida, arquivo não encontrado, etc.')}
${quiz('O bloco "catch" executa quando...?', ['Sempre', 'Nunca', 'Quando um erro ocorre no bloco try', 'Apenas no final do programa'], 2, { ok: 'Correto! O catch captura e trata os erros que ocorrem no bloco try.', no: 'O catch só executa quando um erro (exceção) é lançado dentro do bloco try.' })}`;
}

function buildLesson_Polymorphism(lang) {
  return `<h1>Polimorfismo</h1>
<p class="lesson-intro">Polimorfismo permite que objetos de classes diferentes respondam ao <em>mesmo método</em> de formas distintas — aumentando a flexibilidade do código.</p>
${infoBox('', '🎭', 'Um nome, muitos comportamentos', 'O mesmo método pode ter comportamentos diferentes dependendo de qual objeto o executa. Isso é polimorfismo.')}
${infoBox('tip', '💡', 'Sobrecarga vs Sobrescrita', '<strong>Sobrescrita</strong> (override): subclasse redefine o método da superclasse. <strong>Sobrecarga</strong> (overload): mesmo nome, parâmetros diferentes.')}
${quiz('O que é polimorfismo?', ['Um tipo de loop', 'Capacidade de objetos diferentes responderem ao mesmo método de formas distintas', 'Um tipo de variável', 'Um erro de compilação'], 1, { ok: 'Exato! Polimorfismo = mesmo método, comportamentos diferentes por objeto.', no: 'Polimorfismo é quando diferentes classes implementam o mesmo método de formas diferentes.' })}`;
}

function buildLesson_Interfaces(lang) {
  return `<h1>Interfaces e Classes Abstratas</h1>
<p class="lesson-intro">Interfaces e abstrações definem <em>contratos</em> — o que uma classe deve implementar — sem definir como. São pilares da arquitetura de software.</p>
${infoBox('', '📋', 'Interface', 'Define métodos que devem ser implementados por quem a "assina". Garante que diferentes classes tenham os mesmos métodos disponíveis.')}
${infoBox('', '🏗️', 'Classe Abstrata', 'Não pode ser instanciada diretamente. Serve como base para outras classes, podendo ter métodos concretos e abstratos.')}
${quiz('Uma interface pode ser instanciada diretamente?', ['Sim, sempre', 'Não, ela é apenas um contrato', 'Depende da linguagem', 'Só em Python'], 1, { ok: 'Correto! Interfaces são contratos — não podem ser instanciadas.', no: 'Não. Interfaces são contratos que outras classes implementam. Você cria objetos das classes que implementam a interface.' })}`;
}

function buildLesson_Patterns(lang) {
  return `<h1>Design Patterns</h1>
<p class="lesson-intro">Design Patterns são soluções reutilizáveis para problemas recorrentes no desenvolvimento de software — receitas testadas por milhares de desenvolvedores.</p>
${infoBox('', '🏛️', 'Categorias principais', '<strong>Criacionais</strong>: como criar objetos (Singleton, Factory). <strong>Estruturais</strong>: como organizar classes (Adapter, Decorator). <strong>Comportamentais</strong>: como as classes interagem (Observer, Strategy).')}
${infoBox('tip', '💡', 'Singleton', 'Garante que uma classe tenha apenas uma instância. Útil para configurações, conexões de banco, logs.')}
${quiz('Design Patterns são...?', ['Erros de programação', 'Soluções reutilizáveis para problemas comuns', 'Tipos de variáveis', 'Frameworks de teste'], 1, { ok: 'Perfeito! São soluções comprovadas para problemas recorrentes.', no: 'Design Patterns são soluções reutilizáveis para problemas comuns de design de software.' })}`;
}

function buildLesson_CleanCode(lang) {
  return `<h1>Clean Code</h1>
<p class="lesson-intro"><em>Código limpo</em> é aquele que qualquer desenvolvedor consegue ler e entender facilmente. É uma das habilidades mais valorizadas no mercado.</p>
${infoBox('', '📖', 'Nomes significativos', 'Use nomes que revelam a intenção. <code>calcularDesconto(preco, percentual)</code> é infinitamente melhor que <code>calc(x, y)</code>.')}
${infoBox('', '🔧', 'Funções pequenas', 'Cada função deve fazer <strong>uma coisa só</strong>. Se você precisar de "e" para descrever o que ela faz, divida em duas.')}
${infoBox('warn', '⚠️', 'Comentários não salvam código ruim', 'Bom código se explica sozinho. Comentários devem explicar o <em>porquê</em>, não o <em>o quê</em> — que o código já mostra.')}
${quiz('Qual é o principal objetivo do Clean Code?', ['Deixar o código mais rápido', 'Tornar o código legível e fácil de manter', 'Reduzir o número de linhas', 'Evitar usar funções'], 1, { ok: 'Exato! Código limpo é sobre legibilidade e manutenibilidade.', no: 'O principal objetivo é tornar o código legível, compreensível e fácil de manter.' })}`;
}

// ===================================================
// ENGINE DE DIAGNÓSTICO
// ===================================================

function calculateLevel() {
  const exp = state.answers[1];
  const conheceVariavel = state.answers[2] === 'certo';
  const conceitos = state.multiAnswers;
  const conheceOOP = conceitos.includes('oop');
  const conheceFuncao = conceitos.includes('funcao') && conceitos.includes('loop') && conceitos.includes('condicional');

  if (exp === 'experiente' || conheceOOP) return 'avancado';
  if (exp === 'medio' || (conheceVariavel && conheceFuncao)) return 'intermediario';
  return 'iniciante';
}

function getLevelInfo(level) {
  const info = {
    iniciante: {
      badge: '🌱 Iniciante',
      title: 'Sua trilha está pronta!',
      sub: 'Vamos construir uma base sólida, começando pelos conceitos fundamentais da programação.',
      color: '#10b981',
    },
    intermediario: {
      badge: '⚡ Intermediário',
      title: 'Ótima base! Vamos avançar.',
      sub: 'Você já conhece o básico. A trilha foca em orientação a objetos e estruturas mais complexas.',
      color: '#f59e0b',
    },
    avancado: {
      badge: '🚀 Avançado',
      title: 'Nível elevado detectado!',
      sub: 'Sua trilha vai direto aos conceitos mais sofisticados: padrões, arquitetura e boas práticas.',
      color: '#a855f7',
    },
  };
  return info[level];
}

// ===================================================
// RENDERIZAÇÃO
// ===================================================

function renderTrailOverview(trail) {
  const container = document.getElementById('trailOverview');
  container.innerHTML = trail.map((module, i) => `
    <div class="trail-module">
      <div class="tm-number">MÓDULO ${String(i + 1).padStart(2, '0')}</div>
      <div class="tm-title">${module.title}</div>
      <div class="tm-lessons">${module.lessons.length} aula${module.lessons.length > 1 ? 's' : ''}</div>
      <div class="tm-topics">
        ${module.lessons.map(l => `<span class="tm-topic">${l.title}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderSidebarNav(trail) {
  const nav = document.getElementById('sidebarNav');
  nav.innerHTML = trail.map((module, mi) => `
    <div class="sn-module">
      <div class="sn-module-title">${module.title}</div>
      ${module.lessons.map((lesson, li) => `
        <button class="sn-lesson ${mi === 0 && li === 0 ? 'active' : ''}"
          data-module="${mi}" data-lesson="${li}"
          onclick="goToLesson(${mi}, ${li})">
          <span class="sn-dot"></span>
          ${lesson.title}
        </button>
      `).join('')}
    </div>
  `).join('');
}

function renderLesson(trail, moduleIndex, lessonIndex) {
  const module = trail[moduleIndex];
  const lesson = module.lessons[lessonIndex];

  document.getElementById('contentBreadcrumb').textContent =
    `Módulo ${moduleIndex + 1} · Aula ${lessonIndex + 1}`;

  const article = document.getElementById('lessonArticle');
  article.innerHTML = lesson.content;
  article.style.animation = 'none';
  article.offsetHeight;
  article.style.animation = 'fadeSlideUp 0.5s ease both';

  // Update nav buttons
  const prevBtn = document.getElementById('prevLesson');
  const nextBtn = document.getElementById('nextLesson');

  const isFirst = moduleIndex === 0 && lessonIndex === 0;
  const totalLessons = trail.reduce((acc, m) => acc + m.lessons.length, 0);
  const currentFlat = trail.slice(0, moduleIndex).reduce((acc, m) => acc + m.lessons.length, 0) + lessonIndex;
  const isLast = currentFlat === totalLessons - 1;

  prevBtn.disabled = isFirst;
  if (isLast) {
    nextBtn.textContent = '✅ Concluído!';
    nextBtn.style.background = 'var(--green)';
    nextBtn.style.borderColor = 'var(--green)';
  } else {
    nextBtn.innerHTML = `Próxima <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    nextBtn.style.background = '';
    nextBtn.style.borderColor = '';
  }
  document.getElementById('completionModal').classList.add('hidden');

  // Mark completed
  state.completedLessons.add(`${moduleIndex}-${lessonIndex}`);
  updateProgress(trail);

  // Update sidebar active
  document.querySelectorAll('.sn-lesson').forEach(btn => {
    btn.classList.remove('active');
    const done = state.completedLessons.has(`${btn.dataset.module}-${btn.dataset.lesson}`);
    if (done) btn.classList.add('done');
  });

  const activeBtn = document.querySelector(`.sn-lesson[data-module="${moduleIndex}"][data-lesson="${lessonIndex}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  // Bind copy buttons
  document.querySelectorAll('.cb-copy').forEach(btn => {
    btn.onclick = function() { copyCode(this); };
  });

  // Scroll to top
  document.getElementById('learnContent').scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress(trail) {
  const total = trail.reduce((acc, m) => acc + m.lessons.length, 0);
  const done = state.completedLessons.size;
  const pct = Math.round((done / total) * 100);
  document.getElementById('spFill').style.width = pct + '%';
  document.getElementById('spPercent').textContent = pct + '%';
}

function goToLesson(moduleIndex, lessonIndex) {
  state.currentModuleIndex = moduleIndex;
  state.currentLessonIndex = lessonIndex;
  const trail = getTrail(LANG, state.level);
  renderLesson(trail, moduleIndex, lessonIndex);

  // Close sidebar on mobile
  document.getElementById('learnSidebar').classList.remove('open');
}

function navigateLesson(direction, trail) {
  const flat = [];
  trail.forEach((m, mi) => m.lessons.forEach((_, li) => flat.push([mi, li])));
  const currentFlat = flat.findIndex(([mi, li]) => mi === state.currentModuleIndex && li === state.currentLessonIndex);
  const nextFlat = currentFlat + direction;
  if (nextFlat < 0) return;
  if (nextFlat >= flat.length) {
    if (direction > 0) openCompletionModal();
    return;
  }
  const [mi, li] = flat[nextFlat];
  goToLesson(mi, li);
}

// ===================================================
// DIAGNÓSTICO — FLUXO DE PERGUNTAS
// ===================================================

function showQuestion(n) {
  document.querySelectorAll('.question-card').forEach(card => card.classList.remove('active'));
  const target = document.querySelector(`.question-card[data-q="${n}"]`);
  if (target) target.classList.add('active');

  const fill = (n / state.totalQ) * 100;
  document.getElementById('progressFill').style.width = fill + '%';
  document.getElementById('progressLabel').textContent = `${n} de ${state.totalQ}`;
}

function nextQuestion() {
  state.currentQ++;
  if (state.currentQ > state.totalQ) {
    finishDiag();
  } else {
    showQuestion(state.currentQ);
  }
}

function finishDiag() {
  state.level = calculateLevel();
  const info = getLevelInfo(state.level);
  const trail = getTrail(LANG, state.level);

  document.getElementById('resultBadge').textContent = info.badge;
  document.getElementById('resultTitle').textContent = info.title;
  document.getElementById('resultSub').textContent = info.sub;

  renderTrailOverview(trail);

  showPhase('result');
}

// Multi-select Q3
document.querySelectorAll('.q-multi .q-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.value;

    if (val === 'nenhum') {
      document.querySelectorAll('.q-multi .q-opt').forEach(b => {
        b.classList.remove('selected');
        b.querySelector('.opt-check').textContent = '☐';
      });
      btn.classList.add('selected');
      btn.querySelector('.opt-check').textContent = '☑';
      state.multiAnswers = [];
    } else {
      const nenhum = document.getElementById('nenhum-opt');
      nenhum.classList.remove('selected');
      nenhum.querySelector('.opt-check').textContent = '☐';
      state.multiAnswers = state.multiAnswers.filter(v => v !== 'nenhum');

      if (btn.classList.contains('selected')) {
        btn.classList.remove('selected');
        btn.querySelector('.opt-check').textContent = '☐';
        state.multiAnswers = state.multiAnswers.filter(v => v !== val);
      } else {
        btn.classList.add('selected');
        btn.querySelector('.opt-check').textContent = '☑';
        state.multiAnswers.push(val);
      }
    }

    const q3Next = document.getElementById('q3Next');
    const hasSelection = document.querySelector('.q-multi .q-opt.selected');
    q3Next.disabled = !hasSelection;
    q3Next.style.opacity = hasSelection ? '1' : '0.4';
    q3Next.style.pointerEvents = hasSelection ? 'auto' : 'none';
  });
});

document.getElementById('q3Next').addEventListener('click', nextQuestion);

// Single select (Q1, Q2, Q4, Q5)
document.querySelectorAll('.q-opt:not(.multi)').forEach(btn => {
  btn.addEventListener('click', () => {
    const qNum = parseInt(btn.dataset.q);
    const val = btn.dataset.value;

    state.answers[qNum] = val;

    // Feedback visual Q2
    if (qNum === 2) {
      document.querySelectorAll(`.q-opt[data-q="2"]`).forEach(b => {
        b.disabled = true;
        if (b.dataset.value === 'certo') b.classList.add('correct');
        else if (b === btn && val !== 'certo') b.classList.add('wrong');
      });
      setTimeout(nextQuestion, 900);
    } else {
      setTimeout(nextQuestion, 300);
    }
  });
});

// ===================================================
// QUIZ INLINE
// ===================================================
window.selectQuizOption = function(btn, index) {
  const container = btn.closest('.inline-quiz');
  if (container.dataset.confirmed === 'true') return;

  container.querySelectorAll('.iq-opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  container.dataset.selectedIndex = String(index);

  const confirmBtn = container.querySelector('.iq-confirm');
  confirmBtn.disabled = false;
};

window.confirmQuiz = function(btn) {
  const container = btn.closest('.inline-quiz');
  const selected = Number(container.dataset.selectedIndex);
  if (Number.isNaN(selected)) return;

  const correctIndex = Number(container.dataset.correctIndex);
  const isCorrect = selected === correctIndex;
  const options = container.querySelectorAll('.iq-opt');
  options.forEach((opt, i) => {
    opt.disabled = true;
    opt.style.pointerEvents = 'none';
    if (i === correctIndex) opt.classList.add('iq-correct');
    if (i === selected && !isCorrect) opt.classList.add('iq-wrong');
  });

  const feedbackOk = container.querySelector('.iq-feedback.ok');
  const feedbackNo = container.querySelector('.iq-feedback.no');
  if (isCorrect) feedbackOk.classList.add('show');
  else feedbackNo.classList.add('show');

  container.dataset.confirmed = 'true';
  btn.disabled = true;
  btn.textContent = 'Resposta confirmada';
};

function openCompletionModal() {
  const modal = document.getElementById('completionModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===================================================
// FASES
// ===================================================
function showPhase(phase) {
  document.querySelectorAll('.phase').forEach(p => p.classList.add('hidden'));
  document.getElementById(`phase${phase.charAt(0).toUpperCase() + phase.slice(1)}`).classList.remove('hidden');
}

// Start learning button
document.getElementById('startLearnBtn').addEventListener('click', () => {
  const trail = getTrail(LANG, state.level);

  document.getElementById('sidebarLang').textContent = langName;
  document.getElementById('sidebarLevel').textContent =
    ({ iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado' })[state.level];

  renderSidebarNav(trail);
  renderLesson(trail, 0, 0);

  showPhase('learn');
});

// Lesson navigation
document.getElementById('prevLesson').addEventListener('click', () => {
  navigateLesson(-1, getTrail(LANG, state.level));
});

document.getElementById('nextLesson').addEventListener('click', () => {
  navigateLesson(1, getTrail(LANG, state.level));
});

// Sidebar toggle mobile
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('learnSidebar').classList.toggle('open');
});

// ===================================================
// COPY CODE
// ===================================================
window.copyCode = function(btn) {
  const code = btn.closest('.code-block').querySelector('.cb-code');
  const text = code.innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copiado!';
    setTimeout(() => btn.textContent = 'Copiar', 2000);
  });
};

// ===================================================
// INIT
// ===================================================
showQuestion(1);