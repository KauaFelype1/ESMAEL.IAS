ESMAEL.IAS
Plataforma educacional web para aprendizado de programação com diagnóstico de nível, trilha adaptativa por linguagem, conteúdo didático progressivo, treino prático com feedback e hub de recomendações de IAs e criadores de conteúdo.

Status Frontend Licença

Sobre o projeto
O ESMAEL.IAS foi criado para tornar o aprendizado de programação mais orientado e eficiente.
Em vez de oferecer conteúdo genérico, a plataforma identifica o perfil inicial do usuário e entrega uma trilha mais coerente com seu nível, com foco em prática e evolução contínua.

Problema que o projeto resolve
Muitos iniciantes travam por:

excesso de conteúdo sem ordem clara;
dificuldade em saber o que estudar primeiro;
pouca prática aplicada com feedback imediato.
O ESMAEL.IAS organiza o processo de aprendizagem em etapas objetivas:

Diagnosticar;
Ensinar com progressão;
Praticar;
Reforçar com recursos externos de qualidade.
Funcionalidades principais
Diagnóstico inicial inteligente

Questionário para classificar o nível do usuário.
Trilha adaptativa

Módulos e aulas ajustados para:
Iniciante
Intermediário
Avançado
Aulas por linguagem

Explicações, exemplos e mini-quizzes no contexto da linguagem escolhida.
Mini-quiz com confirmação

O usuário seleciona a resposta e confirma antes de receber feedback.
Conclusão de trilha

Ao finalizar os módulos, o sistema exibe mensagem de conquista e oferece próximos passos.
Modo treino

Ambiente para praticar exercícios com dinâmica de execução/feedback.
Página de recomendações

Melhores IAs para programação e melhores canais de conteúdo com links diretos.
Linguagens suportadas
Python
JavaScript
Java
C
C++
C#
Stack e arquitetura
Tecnologias
HTML5
CSS3
JavaScript (Vanilla)
Organização do projeto
index.html — landing + entrada para trilhas
pages/aprender.html — diagnóstico + conteúdo adaptativo
pages/treino.html — prática
pages/ias.html — recomendações externas
css/ — estilos por página e estilo global
js/ — scripts de interação e lógica de aprendizado
Decisões técnicas
Estrutura modular por página para facilitar manutenção.
Conteúdo e renderização orientados por estado no front-end.
Foco em experiência visual, feedback instantâneo e clareza pedagógica.
Diferenciais
Progressão orientada por nível (não linear e genérica).
Conteúdo em português com abordagem didática.
Integração de estudo guiado + prática + recomendação de ferramentas.
UX pensada para reduzir fricção de iniciantes.
Preview (Screenshots)
Recomenda-se armazenar as imagens em assets/screenshots/.

Home
Home
Diagnóstico e Trilha
Diagnóstico
Aula + Mini-Quiz
Aula e Quiz
Modo Treino
Treino
Hub de IAs e Youtubers
IAs e Youtubers
Como executar localmente
# 1) Clone
git clone <URL_DO_REPOSITORIO>
# 2) Entre na pasta
cd <NOME_DO_REPOSITORIO>
# 3) Rode com servidor local (recomendado)
# Exemplo: Live Server (VS Code) ou outro servidor estático
Também é possível abrir index.html diretamente no navegador, mas o ideal é usar servidor local para ambiente mais consistente.

Roadmap

 Filtros por linguagem na página de IAs

 Persistência de progresso do usuário (localStorage/API)

 Sistema de autenticação

 Trilha com métricas e analytics de aprendizado

 Mais exercícios práticos por linguagem

 Gamificação (pontuação, conquistas e sequência de estudos)
Contribuição
Contribuições são bem-vindas.
Sugestões de melhoria podem ser enviadas via Issues e Pull Requests.

Equipe de desenvolvimento
Kauã Felype
Marina Feitoza
Pedro César
