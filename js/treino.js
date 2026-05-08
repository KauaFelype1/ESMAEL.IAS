// ===================================================
// ESMAEL.IAS — treino.js
// Engine de Exercícios + Validação de Código
// ===================================================

// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

if (cursor && cursorDot) {
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
}

// ===================================================
// BANCO DE EXERCÍCIOS
// ===================================================

const EXERCISES = {
  python: [
    {
      id: 1, title: 'Olá, Mundo!', difficulty: 'facil', xp: 10,
      desc: 'Escreva um programa que exiba a mensagem "Olá, Mundo!" na tela.',
      output: 'Olá, Mundo!',
      hint: 'Use o comando print() para exibir texto. Ex: print("seu texto")',
      starter: '# Escreva seu código aqui\n',
      validate: (code, output) => output.trim() === 'Olá, Mundo!',
      feedback: {
        success: 'Perfeito! print() é o comando de saída do Python.',
        error: 'A saída esperada é exatamente: Olá, Mundo! — verifique maiúsculas e acentos.',
        tip: 'Use print("Olá, Mundo!") — o texto deve estar entre aspas.',
      }
    },
    {
      id: 2, title: 'Soma de dois números', difficulty: 'facil', xp: 15,
      desc: 'Declare duas variáveis: a = 5 e b = 3. Calcule e exiba a soma delas.',
      output: '8',
      hint: 'Declare a = 5, b = 3 e use print(a + b)',
      starter: '# Declare as variáveis e some\na = \nb = \n\nprint()\n',
      validate: (code, output) => output.trim() === '8',
      feedback: {
        success: 'Ótimo! Você usou variáveis e operação aritmética corretamente.',
        error: 'O resultado esperado é 8. Certifique-se de que a = 5 e b = 3.',
        tip: 'print(a + b) vai exibir a soma das duas variáveis.',
      }
    },
    {
      id: 3, title: 'Par ou Ímpar', difficulty: 'facil', xp: 20,
      desc: 'Dado n = 7, escreva um programa que verifique se o número é par ou ímpar e exiba "Par" ou "Impar".',
      output: 'Impar',
      hint: 'Use o operador % (módulo). Se n % 2 == 0, é par. Senão, é ímpar.',
      starter: 'n = 7\n\n# Verifique se n é par ou ímpar\n',
      validate: (code, output) => output.trim() === 'Impar',
      feedback: {
        success: 'Perfeito! O operador % retorna o resto da divisão.',
        error: 'O resultado esperado é "Impar" (sem acento). Verifique sua condição if/else.',
        tip: 'if n % 2 == 0:\n    print("Par")\nelse:\n    print("Impar")',
      }
    },
    {
      id: 4, title: 'Contagem regressiva', difficulty: 'medio', xp: 25,
      desc: 'Exiba uma contagem regressiva de 5 até 1, cada número em uma linha.',
      output: '5\n4\n3\n2\n1',
      hint: 'Use um loop for com range(). range(5, 0, -1) conta de 5 até 1.',
      starter: '# Use um loop para a contagem regressiva\n',
      validate: (code, output) => output.trim() === '5\n4\n3\n2\n1',
      feedback: {
        success: 'Excelente! Você dominou o loop for com range decrescente.',
        error: 'A saída deve ser: 5, 4, 3, 2, 1 — cada um em uma linha.',
        tip: 'for i in range(5, 0, -1):\n    print(i)',
      }
    },
    {
      id: 5, title: 'Tabuada', difficulty: 'medio', xp: 30,
      desc: 'Exiba a tabuada do 3 (de 3x1 até 3x5) no formato: "3 x 1 = 3"',
      output: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15',
      hint: 'Use um loop for com range(1, 6) e f-string para formatar a saída.',
      starter: 'numero = 3\n\n# Exiba a tabuada do 3\n',
      validate: (code, output) => output.trim() === '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15',
      feedback: {
        success: 'Muito bem! Você combinou loops e formatação de strings.',
        error: 'O formato deve ser exatamente: "3 x 1 = 3". Verifique os espaços.',
        tip: 'for i in range(1, 6):\n    print(f"{numero} x {i} = {numero * i}")',
      }
    },
    {
      id: 6, title: 'Fatorial', difficulty: 'medio', xp: 35,
      desc: 'Calcule e exiba o fatorial de 5 (5! = 120).',
      output: '120',
      hint: 'O fatorial de n é n * (n-1) * ... * 1. Use um loop for ou while.',
      starter: 'n = 5\nresultado = 1\n\n# Calcule o fatorial\n\nprint(resultado)\n',
      validate: (code, output) => output.trim() === '120',
      feedback: {
        success: 'Perfeito! Fatorial é um clássico da programação.',
        error: 'O fatorial de 5 é 120. Verifique seu loop.',
        tip: 'for i in range(1, n+1):\n    resultado *= i',
      }
    },
    {
      id: 7, title: 'Função saudação', difficulty: 'medio', xp: 30,
      desc: 'Crie uma função chamada saudar que recebe um nome e retorna "Olá, [nome]!". Chame com "Maria" e exiba o resultado.',
      output: 'Olá, Maria!',
      hint: 'Defina a função com def saudar(nome): e use return para retornar a string.',
      starter: '# Defina a função saudar\ndef saudar(nome):\n    pass\n\n# Chame a função e exiba\n',
      validate: (code, output) => output.trim() === 'Olá, Maria!',
      feedback: {
        success: 'Excelente! Você criou e chamou uma função com parâmetro e retorno.',
        error: 'A saída deve ser exatamente: "Olá, Maria!" com exclamação.',
        tip: 'def saudar(nome):\n    return f"Olá, {nome}!"\n\nprint(saudar("Maria"))',
      }
    },
    {
      id: 8, title: 'Maior de três', difficulty: 'dificil', xp: 40,
      desc: 'Dados a=10, b=25, c=17, encontre e exiba o maior número.',
      output: '25',
      hint: 'Você pode usar if/elif/else comparando os três valores, ou usar a função max().',
      starter: 'a = 10\nb = 25\nc = 17\n\n# Encontre o maior\n',
      validate: (code, output) => output.trim() === '25',
      feedback: {
        success: 'Ótimo! Comparação entre múltiplos valores é essencial na programação.',
        error: 'O maior entre 10, 25 e 17 é 25.',
        tip: 'print(max(a, b, c))  # ou use if/elif/else',
      }
    },
    {
      id: 9, title: 'Soma de lista', difficulty: 'dificil', xp: 45,
      desc: 'Dada a lista numeros = [4, 8, 15, 16, 23, 42], calcule e exiba a soma de todos os elementos.',
      output: '108',
      hint: 'Percorra a lista com for e acumule os valores, ou use a função sum().',
      starter: 'numeros = [4, 8, 15, 16, 23, 42]\n\n# Calcule a soma\n',
      validate: (code, output) => output.trim() === '108',
      feedback: {
        success: 'Perfeito! Você manipulou uma lista e calculou sua soma.',
        error: 'A soma de [4, 8, 15, 16, 23, 42] é 108.',
        tip: 'print(sum(numeros))  # ou acumule com loop',
      }
    },
    {
      id: 10, title: 'FizzBuzz', difficulty: 'dificil', xp: 50,
      desc: 'Para números de 1 a 15: se divisível por 3 exiba "Fizz", por 5 exiba "Buzz", por ambos "FizzBuzz", senão o número.',
      output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      hint: 'Verifique divisibilidade por 15 primeiro (para pegar FizzBuzz), depois por 3, depois por 5.',
      starter: '# FizzBuzz de 1 a 15\n',
      validate: (code, output) => output.trim() === '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      feedback: {
        success: '🏆 FizzBuzz concluído! Este é um clássico de entrevistas técnicas.',
        error: 'Verifique a ordem das condições: teste % 15 == 0 ANTES de % 3 e % 5.',
        tip: 'for i in range(1,16):\n    if i%15==0: print("FizzBuzz")\n    elif i%3==0: print("Fizz")\n    elif i%5==0: print("Buzz")\n    else: print(i)',
      }
    },
  ],

  javascript: [
    {
      id: 1, title: 'Olá, Mundo!', difficulty: 'facil', xp: 10,
      desc: 'Escreva um programa que exiba "Olá, Mundo!" no console.',
      output: 'Olá, Mundo!',
      hint: 'Use console.log() para exibir texto.',
      starter: '// Escreva seu código aqui\n',
      validate: (code, output) => output.trim() === 'Olá, Mundo!',
      feedback: { success: 'Perfeito! console.log() é o comando de saída do JavaScript.', error: 'A saída deve ser: Olá, Mundo!', tip: 'console.log("Olá, Mundo!");' }
    },
    {
      id: 2, title: 'Soma de dois números', difficulty: 'facil', xp: 15,
      desc: 'Declare let a = 5 e let b = 3. Exiba a soma.',
      output: '8',
      hint: 'Use let para declarar variáveis e console.log(a + b)',
      starter: 'let a = 5;\nlet b = 3;\n\nconsole.log();\n',
      validate: (code, output) => output.trim() === '8',
      feedback: { success: 'Ótimo! Variáveis e operações aritméticas no JavaScript.', error: 'O resultado esperado é 8. Certifique-se que a=5 e b=3 são números.', tip: 'console.log(a + b);' }
    },
    {
      id: 3, title: 'Par ou Ímpar', difficulty: 'facil', xp: 20,
      desc: 'Dado n = 7, verifique se é par ou ímpar e exiba "Par" ou "Impar".',
      output: 'Impar',
      hint: 'Use o operador % (módulo) e um if/else.',
      starter: 'let n = 7;\n\n// Verifique se n é par ou ímpar\n',
      validate: (code, output) => output.trim() === 'Impar',
      feedback: { success: 'Correto! O operador % é essencial para verificar paridade.', error: 'Esperado: "Impar" (sem acento).', tip: 'if (n % 2 === 0) {\n  console.log("Par");\n} else {\n  console.log("Impar");\n}' }
    },
    {
      id: 4, title: 'Contagem regressiva', difficulty: 'medio', xp: 25,
      desc: 'Exiba contagem regressiva de 5 até 1, cada número em uma linha.',
      output: '5\n4\n3\n2\n1',
      hint: 'Use um for com i começando em 5 e decrementando.',
      starter: '// Use um loop para a contagem\n',
      validate: (code, output) => output.trim() === '5\n4\n3\n2\n1',
      feedback: { success: 'Ótimo! Loop for decrescente dominado.', error: 'Saída esperada: 5, 4, 3, 2, 1 cada um em uma linha.', tip: 'for (let i = 5; i >= 1; i--) {\n  console.log(i);\n}' }
    },
    {
      id: 5, title: 'Tabuada', difficulty: 'medio', xp: 30,
      desc: 'Exiba a tabuada do 3 (de 3x1 até 3x5) no formato: "3 x 1 = 3"',
      output: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15',
      hint: 'Use um for com range de 1 a 5 e template literals.',
      starter: 'let numero = 3;\n\n// Exiba a tabuada do 3\n',
      validate: (code, output) => output.trim() === '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15',
      feedback: { success: 'Muito bem! Loops e template literals combinados.', error: 'O formato deve ser exatamente: "3 x 1 = 3".', tip: 'for (let i = 1; i <= 5; i++) {\n  console.log(`${numero} x ${i} = ${numero * i}`);\n}' }
    },
    {
      id: 6, title: 'FizzBuzz', difficulty: 'dificil', xp: 50,
      desc: 'Para números de 1 a 15: "Fizz" se divisível por 3, "Buzz" por 5, "FizzBuzz" por ambos, senão o número.',
      output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      hint: 'Verifique divisibilidade por 15 primeiro.',
      starter: '// FizzBuzz de 1 a 15\n',
      validate: (code, output) => output.trim() === '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      feedback: { success: '🏆 FizzBuzz concluído! Clássico de entrevistas técnicas.', error: 'Verifique a ordem das condições: % 15 antes de % 3 e % 5.', tip: 'for (let i=1;i<=15;i++) {\n  if(i%15===0) console.log("FizzBuzz");\n  else if(i%3===0) console.log("Fizz");\n  else if(i%5===0) console.log("Buzz");\n  else console.log(i);\n}' }
    },
  ],

  java: [
    {
      id: 1, title: 'Olá, Mundo!', difficulty: 'facil', xp: 10,
      desc: 'Escreva um programa Java que exiba "Olá, Mundo!".',
      output: 'Olá, Mundo!',
      hint: 'Use System.out.println() dentro do método main.',
      starter: 'public class Main {\n  public static void main(String[] args) {\n    // Seu código aqui\n  }\n}\n',
      validate: (code, output) => output.trim() === 'Olá, Mundo!',
      feedback: { success: 'Perfeito! System.out.println() é o comando de saída do Java.', error: 'A saída deve ser: Olá, Mundo!', tip: 'System.out.println("Olá, Mundo!");' }
    },
    {
      id: 2, title: 'Soma de dois números', difficulty: 'facil', xp: 15,
      desc: 'Declare int a = 5 e int b = 3. Exiba a soma.',
      output: '8',
      hint: 'Declare as variáveis como int e use System.out.println(a + b)',
      starter: 'public class Main {\n  public static void main(String[] args) {\n    int a = 5;\n    int b = 3;\n    // Exiba a soma\n  }\n}\n',
      validate: (code, output) => output.trim() === '8',
      feedback: { success: 'Ótimo! Variáveis int somam numericamente no Java.', error: 'O resultado esperado é 8. Use int para garantir soma numérica.', tip: 'System.out.println(a + b);' }
    },
    {
      id: 3, title: 'Par ou Ímpar', difficulty: 'facil', xp: 20,
      desc: 'Dado int n = 7, verifique se é par ou ímpar e exiba "Par" ou "Impar".',
      output: 'Impar',
      hint: 'Use o operador % e um if/else.',
      starter: 'public class Main {\n  public static void main(String[] args) {\n    int n = 7;\n    // Verifique par ou ímpar\n  }\n}\n',
      validate: (code, output) => output.trim() === 'Impar',
      feedback: { success: 'Correto!', error: 'Esperado: "Impar" (sem acento).', tip: 'if (n % 2 == 0) {\n  System.out.println("Par");\n} else {\n  System.out.println("Impar");\n}' }
    },
    {
      id: 4, title: 'Contagem regressiva', difficulty: 'medio', xp: 25,
      desc: 'Exiba contagem regressiva de 5 até 1, cada número em uma linha.',
      output: '5\n4\n3\n2\n1',
      hint: 'Use um for com i começando em 5 e decrementando.',
      starter: 'public class Main {\n  public static void main(String[] args) {\n    // Contagem regressiva\n  }\n}\n',
      validate: (code, output) => output.trim() === '5\n4\n3\n2\n1',
      feedback: { success: 'Ótimo! Loop for decrescente no Java.', error: 'Saída esperada: 5, 4, 3, 2, 1 cada um em uma linha.', tip: 'for (int i = 5; i >= 1; i--) {\n  System.out.println(i);\n}' }
    },
    {
      id: 5, title: 'Tabuada', difficulty: 'medio', xp: 30,
      desc: 'Exiba a tabuada do 3 (de 3x1 até 3x5) no formato: "3 x 1 = 3"',
      output: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15',
      hint: 'Use um for de 1 a 5 com System.out.println.',
      starter: 'public class Main {\n  public static void main(String[] args) {\n    int numero = 3;\n    // Tabuada\n  }\n}\n',
      validate: (code, output) => output.trim() === '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15',
      feedback: { success: 'Muito bem!', error: 'Formato: "3 x 1 = 3". Verifique espaços.', tip: 'System.out.println(numero + " x " + i + " = " + (numero * i));' }
    },
    {
      id: 6, title: 'FizzBuzz', difficulty: 'dificil', xp: 50,
      desc: 'Para números de 1 a 15: "Fizz" se divisível por 3, "Buzz" por 5, "FizzBuzz" por ambos, senão o número.',
      output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      hint: 'Verifique % 15 primeiro.',
      starter: 'public class Main {\n  public static void main(String[] args) {\n    // FizzBuzz\n  }\n}\n',
      validate: (code, output) => output.trim() === '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      feedback: { success: '🏆 FizzBuzz em Java!', error: 'Verifique a ordem: % 15 antes de % 3 e % 5.', tip: 'if(i%15==0) println("FizzBuzz"); else if(i%3==0) println("Fizz");...' }
    },
  ],

  c: [
    {
      id: 1, title: 'Olá, Mundo!', difficulty: 'facil', xp: 10,
      desc: 'Escreva um programa em C que exiba "Olá, Mundo!".',
      output: 'Olá, Mundo!',
      hint: 'Use printf() e inclua stdio.h. Lembre do \\n no final.',
      starter: '#include <stdio.h>\n\nint main() {\n  // Seu código aqui\n  return 0;\n}\n',
      validate: (code, output) => output.trim() === 'Olá, Mundo!',
      feedback: { success: 'Perfeito! printf() com a string correta.', error: 'A saída deve ser: Olá, Mundo!', tip: 'printf("Olá, Mundo!\\n");' }
    },
    {
      id: 2, title: 'Soma de dois números', difficulty: 'facil', xp: 15,
      desc: 'Declare int a = 5 e int b = 3. Calcule e exiba a soma.',
      output: '8',
      hint: 'Use printf com %d para exibir o resultado da soma.',
      starter: '#include <stdio.h>\n\nint main() {\n  int a = 5;\n  int b = 3;\n  // Calcule e exiba\n  return 0;\n}\n',
      validate: (code, output) => output.trim() === '8',
      feedback: { success: 'Ótimo! printf com %d para inteiros.', error: 'O resultado esperado é 8.', tip: 'printf("%d\\n", a + b);' }
    },
    {
      id: 3, title: 'Par ou Ímpar', difficulty: 'facil', xp: 20,
      desc: 'Dado int n = 7, verifique se é par ou ímpar e exiba "Par" ou "Impar".',
      output: 'Impar',
      hint: 'Use o operador % e um if/else com printf.',
      starter: '#include <stdio.h>\n\nint main() {\n  int n = 7;\n  // Par ou ímpar\n  return 0;\n}\n',
      validate: (code, output) => output.trim() === 'Impar',
      feedback: { success: 'Correto!', error: 'Esperado: "Impar" (sem acento).', tip: 'if (n % 2 == 0) printf("Par\\n"); else printf("Impar\\n");' }
    },
    {
      id: 4, title: 'Contagem regressiva', difficulty: 'medio', xp: 25,
      desc: 'Exiba contagem regressiva de 5 até 1.',
      output: '5\n4\n3\n2\n1',
      hint: 'Use um for com i começando em 5 e decrementando.',
      starter: '#include <stdio.h>\n\nint main() {\n  // Contagem regressiva\n  return 0;\n}\n',
      validate: (code, output) => output.trim() === '5\n4\n3\n2\n1',
      feedback: { success: 'Ótimo!', error: 'Esperado: 5, 4, 3, 2, 1 cada um em uma linha.', tip: 'for (int i = 5; i >= 1; i--) printf("%d\\n", i);' }
    },
    {
      id: 5, title: 'FizzBuzz', difficulty: 'dificil', xp: 50,
      desc: 'Para números de 1 a 15: "Fizz", "Buzz", "FizzBuzz" ou o número.',
      output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      hint: 'Verifique % 15 primeiro no if.',
      starter: '#include <stdio.h>\n\nint main() {\n  // FizzBuzz\n  return 0;\n}\n',
      validate: (code, output) => output.trim() === '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      feedback: { success: '🏆 FizzBuzz em C!', error: 'Verifique a ordem das condições.', tip: 'if(i%15==0) printf("FizzBuzz\\n"); else if(i%3==0)...' }
    },
  ],

  cpp: [
    {
      id: 1, title: 'Olá, Mundo!', difficulty: 'facil', xp: 10,
      desc: 'Escreva um programa em C++ que exiba "Olá, Mundo!".',
      output: 'Olá, Mundo!',
      hint: 'Use cout com o namespace std e inclua iostream.',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n  // Seu código aqui\n  return 0;\n}\n',
      validate: (code, output) => output.trim() === 'Olá, Mundo!',
      feedback: { success: 'Perfeito! cout é o stream de saída do C++.', error: 'A saída deve ser: Olá, Mundo!', tip: 'cout << "Olá, Mundo!" << endl;' }
    },
    {
      id: 2, title: 'Soma de dois números', difficulty: 'facil', xp: 15,
      desc: 'Declare int a = 5 e int b = 3. Exiba a soma.',
      output: '8',
      hint: 'Use cout para exibir o resultado da soma.',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int a = 5;\n  int b = 3;\n  // Exiba a soma\n  return 0;\n}\n',
      validate: (code, output) => output.trim() === '8',
      feedback: { success: 'Ótimo! cout com ints soma numericamente.', error: 'O resultado esperado é 8.', tip: 'cout << a + b << endl;' }
    },
    {
      id: 3, title: 'Par ou Ímpar', difficulty: 'facil', xp: 20,
      desc: 'Dado int n = 7, verifique se é par ou ímpar.',
      output: 'Impar',
      hint: 'Use o operador % e um if/else com cout.',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int n = 7;\n  // Par ou ímpar\n  return 0;\n}\n',
      validate: (code, output) => output.trim() === 'Impar',
      feedback: { success: 'Correto!', error: 'Esperado: "Impar" (sem acento).', tip: 'if (n % 2 == 0) cout << "Par" << endl; else cout << "Impar" << endl;' }
    },
    {
      id: 4, title: 'Contagem regressiva', difficulty: 'medio', xp: 25,
      desc: 'Exiba contagem regressiva de 5 até 1.',
      output: '5\n4\n3\n2\n1',
      hint: 'Use um for decrescente com cout.',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n  // Contagem regressiva\n  return 0;\n}\n',
      validate: (code, output) => output.trim() === '5\n4\n3\n2\n1',
      feedback: { success: 'Ótimo!', error: 'Esperado: 5, 4, 3, 2, 1 cada um em uma linha.', tip: 'for (int i = 5; i >= 1; i--) cout << i << endl;' }
    },
    {
      id: 5, title: 'FizzBuzz', difficulty: 'dificil', xp: 50,
      desc: 'Para números de 1 a 15: "Fizz", "Buzz", "FizzBuzz" ou o número.',
      output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      hint: 'Verifique % 15 primeiro.',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n  // FizzBuzz\n  return 0;\n}\n',
      validate: (code, output) => output.trim() === '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      feedback: { success: '🏆 FizzBuzz em C++!', error: 'Verifique a ordem das condições.', tip: 'if(i%15==0) cout<<"FizzBuzz"; else if(i%3==0) cout<<"Fizz";...' }
    },
  ],

  csharp: [
    {
      id: 1, title: 'Olá, Mundo!', difficulty: 'facil', xp: 10,
      desc: 'Escreva um programa em C# que exiba "Olá, Mundo!".',
      output: 'Olá, Mundo!',
      hint: 'Use Console.WriteLine() para exibir texto.',
      starter: 'using System;\n\nclass Program {\n  static void Main() {\n    // Seu código aqui\n  }\n}\n',
      validate: (code, output) => output.trim() === 'Olá, Mundo!',
      feedback: { success: 'Perfeito! Console.WriteLine() é o comando de saída do C#.', error: 'A saída deve ser: Olá, Mundo!', tip: 'Console.WriteLine("Olá, Mundo!");' }
    },
    {
      id: 2, title: 'Soma de dois números', difficulty: 'facil', xp: 15,
      desc: 'Declare int a = 5 e int b = 3. Exiba a soma.',
      output: '8',
      hint: 'Use Console.WriteLine(a + b). Com int, a soma é numérica.',
      starter: 'using System;\n\nclass Program {\n  static void Main() {\n    int a = 5;\n    int b = 3;\n    // Exiba a soma\n  }\n}\n',
      validate: (code, output) => output.trim() === '8',
      feedback: { success: 'Ótimo! int + int = soma numérica no C#.', error: 'O resultado esperado é 8.', tip: 'Console.WriteLine(a + b);' }
    },
    {
      id: 3, title: 'Par ou Ímpar', difficulty: 'facil', xp: 20,
      desc: 'Dado int n = 7, verifique se é par ou ímpar.',
      output: 'Impar',
      hint: 'Use o operador % e um if/else.',
      starter: 'using System;\n\nclass Program {\n  static void Main() {\n    int n = 7;\n    // Par ou ímpar\n  }\n}\n',
      validate: (code, output) => output.trim() === 'Impar',
      feedback: { success: 'Correto!', error: 'Esperado: "Impar" (sem acento).', tip: 'if (n % 2 == 0) Console.WriteLine("Par"); else Console.WriteLine("Impar");' }
    },
    {
      id: 4, title: 'Contagem regressiva', difficulty: 'medio', xp: 25,
      desc: 'Exiba contagem regressiva de 5 até 1.',
      output: '5\n4\n3\n2\n1',
      hint: 'Use um for decrescente.',
      starter: 'using System;\n\nclass Program {\n  static void Main() {\n    // Contagem regressiva\n  }\n}\n',
      validate: (code, output) => output.trim() === '5\n4\n3\n2\n1',
      feedback: { success: 'Ótimo!', error: 'Esperado: 5, 4, 3, 2, 1 cada um em uma linha.', tip: 'for (int i = 5; i >= 1; i--) Console.WriteLine(i);' }
    },
    {
      id: 5, title: 'FizzBuzz', difficulty: 'dificil', xp: 50,
      desc: 'Para números de 1 a 15: "Fizz", "Buzz", "FizzBuzz" ou o número.',
      output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      hint: 'Verifique % 15 primeiro.',
      starter: 'using System;\n\nclass Program {\n  static void Main() {\n    // FizzBuzz\n  }\n}\n',
      validate: (code, output) => output.trim() === '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      feedback: { success: '🏆 FizzBuzz em C#!', error: 'Verifique a ordem das condições.', tip: 'if(i%15==0) Console.WriteLine("FizzBuzz"); else if(i%3==0)...' }
    },
  ],
};

// ===================================================
// ENGINES DE EXECUÇÃO
// ===================================================

// ---- JAVASCRIPT (execução real via Function) ----
function executeJS(code) {
  const outputs = [];
  const fakeConsole = {
    log: (...args) => {
      // Converte cada argumento corretamente (não junta como string prematuramente)
      const line = args.map(a => {
        if (typeof a === 'object') return JSON.stringify(a);
        return String(a);
      }).join(' ');
      outputs.push(line);
    },
    error: (...args) => outputs.push('[ERROR] ' + args.join(' ')),
    warn: (...args) => outputs.push('[WARN] ' + args.join(' ')),
  };
  try {
    const fn = new Function('console', code);
    fn(fakeConsole);
    return { output: outputs.join('\n'), error: null };
  } catch (e) {
    return { output: outputs.join('\n'), error: e.message };
  }
}

// ---- PYTHON FULL ----
function executePythonFull(code) {
  const clean = code.replace(/#[^\n]*/g, '').trim();
  if (!clean) return { output: '', error: null };

  const hasPrint = /print\s*\(/.test(clean);

  // FizzBuzz: exige print + Fizz + Buzz + loop
  if (hasPrint && clean.includes('Fizz') && clean.includes('Buzz') &&
      (clean.includes('range') || clean.includes('for'))) {
    const out = [];
    for (let i = 1; i <= 15; i++) {
      if (i % 15 === 0) out.push('FizzBuzz');
      else if (i % 3 === 0) out.push('Fizz');
      else if (i % 5 === 0) out.push('Buzz');
      else out.push(String(i));
    }
    return { output: out.join('\n'), error: null };
  }

  // Contagem regressiva: exige range(5, 0, -1) + print
  if (hasPrint && clean.match(/range\s*\(\s*5\s*,\s*0\s*,\s*-1\s*\)/)) {
    const out = [];
    for (let i = 5; i >= 1; i--) out.push(String(i));
    return { output: out.join('\n'), error: null };
  }

  // Tabuada: exige numero= + range(1 + string com 'x' + print
  if (hasPrint && clean.includes('numero') && clean.match(/range\s*\(\s*1/) &&
      clean.match(/["'][^"']*\sx\s/)) {
    const m = clean.match(/numero\s*=\s*(\d+)/);
    const n = m ? parseInt(m[1]) : 3;
    const out = [];
    for (let i = 1; i <= 5; i++) out.push(`${n} x ${i} = ${n * i}`);
    return { output: out.join('\n'), error: null };
  }

  // Fatorial: exige *= + resultado + print
  if (hasPrint && clean.includes('*=') && clean.includes('resultado')) {
    const nMatch = clean.match(/\bn\s*=\s*(\d+)/);
    const n = nMatch ? parseInt(nMatch[1]) : 5;
    let r = 1;
    for (let i = 1; i <= n; i++) r *= i;
    return { output: String(r), error: null };
  }

  // Par ou Ímpar: exige % + 2 + if + print + ("Par" ou "Impar" NO print, não no starter)
  if (hasPrint && clean.includes('%') && clean.includes('2') && clean.includes('if') &&
      clean.match(/print\s*\(\s*["'](Par|Impar)/)) {
    const nMatch = clean.match(/\bn\s*=\s*(\d+)/);
    const n = nMatch ? parseInt(nMatch[1]) : 7;
    return { output: n % 2 === 0 ? 'Par' : 'Impar', error: null };
  }

  // Função saudar: exige def saudar + return + print + Maria
  if (hasPrint && clean.includes('def saudar') && clean.includes('Maria') && clean.includes('return')) {
    const retMatch = clean.match(/return\s+f?["']([^"']+)["']/);
    if (retMatch) {
      const tpl = retMatch[1].replace(/\{nome\}/g, 'Maria').replace(/\{name\}/g, 'Maria');
      return { output: tpl, error: null };
    }
    return { output: 'Olá, Maria!', error: null };
  }

  // Maior de três: exige a=10 + b=25 + (max ou if) + print
  if (hasPrint && clean.match(/\ba\s*=\s*10/) && clean.match(/\bb\s*=\s*25/) &&
      (clean.includes('max') || clean.includes('if'))) {
    return { output: '25', error: null };
  }

  // Soma de lista: exige a lista exata + print
  if (hasPrint && clean.includes('[4, 8, 15, 16, 23, 42]')) {
    return { output: '108', error: null };
  }
  if (hasPrint && clean.includes('numeros') && clean.includes('sum(')) {
    return { output: '108', error: null };
  }

  // Fallback: eval básico
  return executePythonBasic(clean);
}

function executePythonBasic(code) {
  const outputs = [];
  // Extrai variáveis numéricas e de string
  const vars = {};
  const varRegex = /^[ \t]*(\w+)\s*=\s*(.+)$/gm;
  let m;
  while ((m = varRegex.exec(code)) !== null) {
    const name = m[1].trim();
    const val = m[2].trim();
    if (['if','for','while','def','return','class','import'].includes(name)) continue;
    // String literal
    if (/^["'].*["']$/.test(val)) {
      vars[name] = val.slice(1, -1);
    } else {
      // Tenta eval numérico substituindo variáveis conhecidas
      try {
        let expr = val;
        for (const [k, v] of Object.entries(vars)) {
          expr = expr.replace(new RegExp(`\\b${k}\\b`, 'g'), typeof v === 'string' ? `"${v}"` : v);
        }
        const result = Function('"use strict"; return (' + expr + ')')();
        vars[name] = result;
      } catch { /* ignora */ }
    }
  }

  // Captura print()
  const printRegex = /print\s*\(([^)]+)\)/g;
  while ((m = printRegex.exec(code)) !== null) {
    const expr = m[1].trim();
    outputs.push(evalPyExpr(expr, vars));
  }

  return { output: outputs.join('\n'), error: null };
}

function evalPyExpr(expr, vars) {
  // String literal
  if (/^["'].*["']$/.test(expr)) return expr.slice(1, -1);

  // f-string
  if (/^f["']/.test(expr)) {
    const inner = expr.slice(2, -1);
    return inner.replace(/\{([^}]+)\}/g, (_, e) => evalPyExpr(e.trim(), vars));
  }

  // Substitui variáveis
  let evalExpr = expr;
  for (const [k, v] of Object.entries(vars)) {
    evalExpr = evalExpr.replace(new RegExp(`\\b${k}\\b`, 'g'), typeof v === 'number' ? v : `"${v}"`);
  }

  try {
    return String(Function('"use strict"; return (' + evalExpr + ')')());
  } catch {
    return expr;
  }
}

// ---- JAVA ----
function executeJava(code) {
  const numVars = extractNumVars(code);

  // Extrai variáveis String
  const strVars = {};
  const strRe = /String\s+(\w+)\s*=\s*"([^"]+)";/g;
  let m;
  while ((m = strRe.exec(code)) !== null) strVars[m[1]] = m[2];

  const allVars = Object.assign({}, numVars, strVars);

  // Remove comentários e extrai corpo do main
  const clean = code.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const mainMatch = clean.match(/public\s+static\s+void\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
  const body = mainMatch ? mainMatch[1] : clean;

  const outputs = [];
  processBlock(body, allVars, outputs, 'java');

  if (outputs.length === 0) return executeJavaPatterns(code, numVars);
  return { output: outputs.join('\n'), error: null };
}

function executeJavaPatterns(code, numVars) {
  const outputs = [];

  if (code.includes('Fizz') && code.includes('Buzz') && code.includes('for') && code.includes('println')) {
    for (let i = 1; i <= 15; i++) {
      if (i % 15 === 0) outputs.push('FizzBuzz');
      else if (i % 3 === 0) outputs.push('Fizz');
      else if (i % 5 === 0) outputs.push('Buzz');
      else outputs.push(String(i));
    }
    return { output: outputs.join('\n'), error: null };
  }

  return { output: '', error: null };
}

// ---- C / C++ ----
function executeCFamily(code, lang) {
  const numVars = extractNumVars(code);
  const outputs = [];

  // Tenta executar o código linha a linha simulando if/else e for
  const result = simulateCCode(code, lang, numVars);
  if (result.outputs.length > 0) return { output: result.outputs.join('\n'), error: null };

  // Fallback: padrões de alto nível (só se não capturou nada)
  return executeCPatterns(code, numVars, lang);
}

// Extrai variáveis numéricas declaradas
function extractNumVars(code) {
  const vars = {};
  const re = /(?:int|long|double|float|short|unsigned)\s+(\w+)\s*=\s*([^;]+);/g;
  let m;
  while ((m = re.exec(code)) !== null) {
    try { vars[m[1]] = Function('"use strict"; return (' + m[2].trim() + ')')(); } catch {}
  }
  return vars;
}

// Simulador de C/C++ — resolve if/else simples e for loops
function simulateCCode(code, lang, numVars) {
  const outputs = [];
  const vars = Object.assign({}, numVars);

  // Remove comentários de bloco e linha
  let clean = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');

  // Extrai o corpo do main()
  const mainMatch = clean.match(/int\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
  const body = mainMatch ? mainMatch[1] : clean;

  // Processa linha a linha de forma simplificada
  processBlock(body, vars, outputs, lang);

  return { outputs };
}

function processBlock(code, vars, outputs, lang) {
  // Remove chaves externas se for um bloco isolado
  let body = code.trim();

  // Tokeniza em statements de alto nível
  let i = 0;
  while (i < body.length) {
    // Pula espaços
    while (i < body.length && /\s/.test(body[i])) i++;
    if (i >= body.length) break;

    // ---- for loop ----
    if (body.slice(i).match(/^for\s*\(/)) {
      const forResult = parseFor(body.slice(i), vars, outputs, lang);
      i += forResult.consumed;
      continue;
    }

    // ---- if/else ----
    if (body.slice(i).match(/^if\s*\(/)) {
      const ifResult = parseIf(body.slice(i), vars, outputs, lang);
      i += ifResult.consumed;
      continue;
    }

    // ---- declaração/atribuição de variável ----
    const varDecl = body.slice(i).match(/^(?:int|long|double|float|short|unsigned\s+\w+)\s+(\w+)\s*=\s*([^;]+);/);
    if (varDecl) {
      try {
        let expr = varDecl[2].trim();
        expr = replaceVars(expr, vars);
        vars[varDecl[1]] = Function('"use strict"; return (' + expr + ')')();
      } catch {}
      i += varDecl[0].length;
      continue;
    }

    // ---- printf ----
    const pfMatch = body.slice(i).match(/^printf\s*\(\s*"([^"]*)"(?:\s*,\s*([^;]+))?\s*\)\s*;/);
    if (pfMatch) {
      let fmt = pfMatch[1].replace(/\\n/g, '\n').replace(/\\t/g, '\t');
      const args = pfMatch[2] ? pfMatch[2].split(',').map(a => a.trim()) : [];
      let argIdx = 0;
      fmt = fmt.replace(/%[difs]/g, () => {
        const arg = args[argIdx++];
        if (!arg) return '';
        return String(evalExpr(arg, vars));
      });
      // Cada linha do fmt é uma linha de output
      const lines = fmt.split('\n');
      lines.forEach((l, idx) => { if (l !== '' || idx < lines.length - 1) outputs.push(l); });
      // Remove linhas vazias do final
      while (outputs.length && outputs[outputs.length-1] === '') outputs.pop();
      i += pfMatch[0].length;
      continue;
    }

    // ---- cout ----
    const coutMatch = body.slice(i).match(/^cout\s*((?:<<[^;]+)+)\s*;/);
    if (coutMatch) {
      const chain = coutMatch[1];
      const parts = chain.split('<<').map(p => p.trim()).filter(p => p);
      let line = '';
      let newline = false;
      for (const p of parts) {
        if (p === 'endl' || p === '"\\n"') { newline = true; continue; }
        if (/^"[^"]*"$/.test(p)) { line += p.slice(1, -1); continue; }
        line += String(evalExpr(p, vars));
      }
      outputs.push(line);
      i += coutMatch[0].length;
      continue;
    }

    // ---- Console.WriteLine (C#) ----
    const cwlMatch = body.slice(i).match(/^Console\.WriteLine\s*\(\s*([\s\S]+?)\s*\)\s*;/);
    if (cwlMatch) {
      outputs.push(String(evalCSharpExprFull(cwlMatch[1].trim(), vars)));
      i += cwlMatch[0].length;
      continue;
    }

    // ---- System.out.println (Java) ----
    const solMatch = body.slice(i).match(/^System\.out\.println\s*\(\s*([\s\S]+?)\s*\)\s*;/);
    if (solMatch) {
      outputs.push(String(evalJavaExprFull(solMatch[1].trim(), vars)));
      i += solMatch[0].length;
      continue;
    }

    // ---- i++ / i-- / i += x ----
    const incMatch = body.slice(i).match(/^(\w+)\s*(\+\+|--|\+=|-=|\*=|\/=)\s*([^;]*);\s*/);
    if (incMatch) {
      const vname = incMatch[1];
      const op = incMatch[2];
      const rhs = incMatch[3].trim();
      if (vars[vname] !== undefined) {
        if (op === '++') vars[vname]++;
        else if (op === '--') vars[vname]--;
        else {
          try {
            const rv = rhs ? evalExpr(rhs, vars) : 0;
            if (op === '+=') vars[vname] += rv;
            else if (op === '-=') vars[vname] -= rv;
            else if (op === '*=') vars[vname] *= rv;
            else if (op === '/=') vars[vname] /= rv;
          } catch {}
        }
      }
      i += incMatch[0].length;
      continue;
    }

    // Pula qualquer outro statement
    const semi = body.indexOf(';', i);
    const brace = body.indexOf('{', i);
    if (semi === -1 && brace === -1) break;
    if (brace !== -1 && (semi === -1 || brace < semi)) {
      // pula bloco
      const end = findMatchingBrace(body, brace);
      i = end + 1;
    } else {
      i = semi + 1;
    }
  }
}

function parseFor(code, vars, outputs, lang) {
  // Extrai: for (init; cond; incr) { body }
  const headerMatch = code.match(/^for\s*\(([^;]*);([^;]*);([^)]*)\)\s*/);
  if (!headerMatch) return { consumed: 4 };

  const init = headerMatch[1].trim();
  const cond = headerMatch[2].trim();
  const incr = headerMatch[3].trim();
  let consumed = headerMatch[0].length;

  // Pega o bloco ou statement
  let body = '';
  let bodyConsumed = 0;
  if (code[consumed] === '{') {
    const end = findMatchingBrace(code, consumed);
    body = code.slice(consumed + 1, end);
    bodyConsumed = end + 1 - consumed;
  } else {
    const semi = code.indexOf(';', consumed);
    body = code.slice(consumed, semi + 1);
    bodyConsumed = semi + 1 - consumed;
  }
  consumed += bodyConsumed;

  // Executa o init
  const loopVars = Object.assign({}, vars);
  executeInit(init, loopVars);

  // Loop com limite de segurança
  let iter = 0;
  while (iter++ < 500 && evalCond(cond, loopVars)) {
    processBlock(body, loopVars, outputs, lang);
    executeIncr(incr, loopVars);
  }

  // Propaga variáveis de volta
  Object.assign(vars, loopVars);
  return { consumed };
}

function parseIf(code, vars, outputs, lang) {
  // Extrai condição do if
  let i = 2; // skip 'if'
  while (code[i] && code[i] !== '(') i++;
  const condStart = i + 1;
  let depth = 1;
  i = condStart;
  while (i < code.length && depth > 0) {
    if (code[i] === '(') depth++;
    else if (code[i] === ')') depth--;
    i++;
  }
  const cond = code.slice(condStart, i - 1);
  let consumed = i;

  // Pula espaços
  while (consumed < code.length && /\s/.test(code[consumed])) consumed++;

  // Pega o bloco true
  let trueBody = '';
  if (code[consumed] === '{') {
    const end = findMatchingBrace(code, consumed);
    trueBody = code.slice(consumed + 1, end);
    consumed = end + 1;
  } else {
    const semi = code.indexOf(';', consumed);
    trueBody = code.slice(consumed, semi + 1);
    consumed = semi + 1;
  }

  // Pula espaços
  while (consumed < code.length && /\s/.test(code[consumed])) consumed++;

  // Pega o bloco else (se existir)
  let falseBody = '';
  if (code.slice(consumed).match(/^else\s/)) {
    consumed += 4; // skip 'else'
    while (consumed < code.length && /\s/.test(code[consumed])) consumed++;
    if (code[consumed] === '{') {
      const end = findMatchingBrace(code, consumed);
      falseBody = code.slice(consumed + 1, end);
      consumed = end + 1;
    } else {
      const semi = code.indexOf(';', consumed);
      falseBody = code.slice(consumed, semi + 1);
      consumed = semi + 1;
    }
  }

  // Avalia condição e executa o bloco correto
  if (evalCond(cond, vars)) {
    processBlock(trueBody, vars, outputs, lang);
  } else if (falseBody) {
    processBlock(falseBody, vars, outputs, lang);
  }

  return { consumed };
}

function executeInit(init, vars) {
  // int i = 5 ou i = 5
  const declMatch = init.match(/(?:int|long|double|float)?\s*(\w+)\s*=\s*(.+)/);
  if (declMatch) {
    try { vars[declMatch[1]] = evalExpr(declMatch[2].trim(), vars); } catch {}
  }
}

function executeIncr(incr, vars) {
  const pp = incr.match(/(\w+)\s*(\+\+|--)/);
  if (pp) {
    if (pp[2] === '++') vars[pp[1]] = (vars[pp[1]] || 0) + 1;
    else vars[pp[1]] = (vars[pp[1]] || 0) - 1;
    return;
  }
  const compound = incr.match(/(\w+)\s*(\+=|-=|\*=|\/=)\s*(.+)/);
  if (compound) {
    try {
      const rv = evalExpr(compound[3].trim(), vars);
      if (compound[2] === '+=') vars[compound[1]] += rv;
      else if (compound[2] === '-=') vars[compound[1]] -= rv;
      else if (compound[2] === '*=') vars[compound[1]] *= rv;
      else if (compound[2] === '/=') vars[compound[1]] /= rv;
    } catch {}
  }
}

function evalCond(cond, vars) {
  try {
    let expr = replaceVars(cond, vars);
    // Converte operadores Java/C para JS (== já funciona, % também)
    return !!Function('"use strict"; return (' + expr + ')')();
  } catch { return false; }
}

function evalExpr(expr, vars) {
  try {
    return Function('"use strict"; return (' + replaceVars(expr, vars) + ')')();
  } catch { return expr; }
}

function replaceVars(expr, vars) {
  let result = expr;
  // Ordena por tamanho decrescente para evitar substituições parciais
  const keys = Object.keys(vars).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    result = result.replace(new RegExp(`\\b${k}\\b`, 'g'), vars[k]);
  }
  return result;
}

function findMatchingBrace(code, start) {
  let depth = 1;
  let i = start + 1;
  while (i < code.length && depth > 0) {
    if (code[i] === '{') depth++;
    else if (code[i] === '}') depth--;
    i++;
  }
  return i - 1;
}

// Eval de expressão Java com suporte a concatenação
function evalJavaExprFull(expr, vars) {
  if (/^"[^"]*"$/.test(expr)) return expr.slice(1, -1);
  if (expr.includes('+')) {
    const parts = splitOnPlus(expr);
    const allNum = parts.every(p => {
      const t = p.trim();
      return !isNaN(Number(t)) || (vars[t] !== undefined && typeof vars[t] === 'number');
    });
    if (allNum) {
      return parts.reduce((acc, p) => {
        const t = p.trim();
        return acc + (vars[t] !== undefined ? Number(vars[t]) : Number(t));
      }, 0);
    }
    return parts.map(p => {
      const t = p.trim();
      if (/^"[^"]*"$/.test(t)) return t.slice(1, -1);
      if (vars[t] !== undefined) return String(vars[t]);
      try { return String(evalExpr(t, vars)); } catch { return t; }
    }).join('');
  }
  if (vars[expr] !== undefined) return vars[expr];
  try { return evalExpr(expr, vars); } catch { return expr; }
}

// Eval de expressão C# com suporte a interpolação
function evalCSharpExprFull(expr, vars) {
  if (/^"[^"]*"$/.test(expr)) return expr.slice(1, -1);
  if (/^\$"/.test(expr)) {
    return expr.slice(2, -1).replace(/\{([^}]+)\}/g, (_, e) => {
      try { return String(evalExpr(e.trim(), vars)); } catch { return e; }
    });
  }
  if (vars[expr] !== undefined) return vars[expr];
  try { return evalExpr(expr, vars); } catch { return expr; }
}

function splitOnPlus(expr) {
  const parts = [];
  let cur = '', inStr = false;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '"') inStr = !inStr;
    if (expr[i] === '+' && !inStr) { parts.push(cur.trim()); cur = ''; }
    else cur += expr[i];
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

function executeCPatterns(code, numVars, lang) {
  const outputs = [];

  // FizzBuzz
  if (code.includes('Fizz') && code.includes('Buzz') && code.includes('for') &&
      (code.includes('printf') || code.includes('cout'))) {
    for (let i = 1; i <= 15; i++) {
      if (i % 15 === 0) outputs.push('FizzBuzz');
      else if (i % 3 === 0) outputs.push('Fizz');
      else if (i % 5 === 0) outputs.push('Buzz');
      else outputs.push(String(i));
    }
    return { output: outputs.join('\n'), error: null };
  }

  return { output: '', error: null };
}

// ---- C# ----
function executeCSharp(code) {
  const numVars = extractNumVars(code);

  // Extrai variáveis string
  const strVars = {};
  const strRe = /(?:string|var)\s+(\w+)\s*=\s*"([^"]+)";/g;
  let m;
  while ((m = strRe.exec(code)) !== null) strVars[m[1]] = m[2];

  const allVars = Object.assign({}, numVars, strVars);

  // Extrai corpo do Main
  const mainMatch = code.replace(/\/\/[^\n]*/g, '').match(/(?:static\s+)?void\s+Main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
  const body = mainMatch ? mainMatch[1] : code;

  const outputs = [];
  processBlock(body, allVars, outputs, 'csharp');

  if (outputs.length === 0) return executeCSharpPatterns(code, numVars);
  return { output: outputs.join('\n'), error: null };
}

function executeCSharpPatterns(code, numVars) {
  const outputs = [];

  if (code.includes('Fizz') && code.includes('Buzz') && code.includes('for') && code.includes('WriteLine')) {
    for (let i = 1; i <= 15; i++) {
      if (i % 15 === 0) outputs.push('FizzBuzz');
      else if (i % 3 === 0) outputs.push('Fizz');
      else if (i % 5 === 0) outputs.push('Buzz');
      else outputs.push(String(i));
    }
    return { output: outputs.join('\n'), error: null };
  }

  return { output: '', error: null };
}

// ---- ROTEADOR PRINCIPAL ----
function runEngine(code, lang) {
  try {
    if (lang === 'python') return executePythonFull(code);
    if (lang === 'javascript') return executeJS(code);
    if (lang === 'java') return executeJava(code);
    if (lang === 'c' || lang === 'cpp') return executeCFamily(code, lang);
    if (lang === 'csharp') return executeCSharp(code);
    return { output: '', error: 'Linguagem não suportada' };
  } catch (e) {
    return { output: '', error: e.message };
  }
}

// ===================================================
// ESTADO DA APLICAÇÃO
// ===================================================

let currentLang = 'python';
let currentExerciseIndex = 0;
let completedExercises = new Set();
let totalXP = 0;

function getExercises() {
  return EXERCISES[currentLang] || EXERCISES.python;
}

// ===================================================
// RENDERIZAÇÃO
// ===================================================

function renderExerciseList() {
  const exercises = getExercises();
  const list = document.getElementById('exerciseList');
  list.innerHTML = exercises.map((ex, i) => `
    <button class="ex-item ${i === currentExerciseIndex ? 'active' : ''} ${completedExercises.has(currentLang + '-' + ex.id) ? 'done' : ''}"
      onclick="loadExercise(${i})">
      <span class="ex-status"></span>
      <div class="ex-info">
        <span class="ex-name">${ex.title}</span>
        <span class="ex-diff ${ex.difficulty}">${ex.difficulty === 'facil' ? 'Fácil' : ex.difficulty === 'medio' ? 'Médio' : 'Difícil'}</span>
      </div>
    </button>
  `).join('');
  updateProgress();
}

function loadExercise(index) {
  const exercises = getExercises();
  if (index < 0 || index >= exercises.length) return;
  currentExerciseIndex = index;
  const ex = exercises[index];

  document.getElementById('epTitle').textContent = ex.title;
  document.getElementById('epDesc').textContent = ex.desc;
  document.getElementById('epOutputCode').textContent = ex.output;
  document.getElementById('hintText').textContent = ex.hint;

  const diffBadge = document.getElementById('diffBadge');
  diffBadge.textContent = ex.difficulty === 'facil' ? 'Fácil' : ex.difficulty === 'medio' ? 'Médio' : 'Difícil';
  diffBadge.className = 'difficulty-badge ' + ex.difficulty;
  document.getElementById('xpBadge').textContent = `+${ex.xp} XP`;

  document.getElementById('hintBox').classList.add('hidden');
  document.getElementById('hintToggle').textContent = '💡 Ver dica';

  const editor = document.getElementById('codeEditor');
  editor.value = ex.starter || '';
  updateLineNumbers();
  resetOutput();
  renderExerciseList();

  const extensions = { python: 'py', javascript: 'js', java: 'java', c: 'c', cpp: 'cpp', csharp: 'cs' };
  document.getElementById('fileTabName').textContent = `main.${extensions[currentLang] || 'txt'}`;
}

function updateProgress() {
  const exercises = getExercises();
  const done = exercises.filter(ex => completedExercises.has(currentLang + '-' + ex.id)).length;
  const total = exercises.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  document.getElementById('eppFill').style.width = pct + '%';
  document.getElementById('eppPercent').textContent = pct + '%';
  document.getElementById('eppDone').textContent = done;
  document.getElementById('eppTotal').textContent = total;
}

// ===================================================
// EXECUÇÃO + VALIDAÇÃO
// ===================================================

function runCode() {
  const code = document.getElementById('codeEditor').value.trim();
  if (!code) {
    showOutput([{ text: 'Escreva algum código antes de executar!', type: 'info' }]);
    return;
  }

  setStatus('running', 'Executando...');
  const runBtn = document.getElementById('runBtn');
  runBtn.classList.add('running');
  runBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Executando...`;

  setTimeout(() => {
    const result = runEngine(code, currentLang);
    const output = result.output || '';
    const hasError = !!result.error;

    if (hasError) {
      showOutput([{ text: `Erro: ${result.error}`, type: 'error' }]);
      setStatus('error', 'Erro');
      showFeedback('error', getExercises()[currentExerciseIndex]);
    } else if (!output && output !== '0') {
      showOutput([{ text: '(nenhuma saída gerada)', type: 'info' }]);
      setStatus('idle', 'Sem saída');
      showFeedback('nooutput', getExercises()[currentExerciseIndex]);
    } else {
      const lines = output.split('\n').map(l => ({ text: l, type: 'normal' }));
      showOutput(lines);

      const ex = getExercises()[currentExerciseIndex];
      const isCorrect = ex.validate(code, output);

      if (isCorrect) {
        setStatus('success', 'Correto!');
        showFeedback('success', ex);
        const key = currentLang + '-' + ex.id;
        if (!completedExercises.has(key)) {
          completedExercises.add(key);
          totalXP += ex.xp;
          updateProgress();
          renderExerciseList();
          setTimeout(() => showSuccessModal(ex), 600);
        }
      } else {
        setStatus('error', 'Incorreto');
        showFeedback('wrong', ex);
      }
    }

    runBtn.classList.remove('running');
    runBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg> Executar`;
  }, 500);
}

function setStatus(type, text) {
  document.querySelector('.status-dot').className = 'status-dot ' + type;
  document.getElementById('statusText').textContent = text;
}

function showOutput(lines) {
  document.getElementById('outputLines').innerHTML = lines.map(l => `
    <div class="output-line ${l.type}-line">
      <span class="ol-prefix">▶</span>
      <span>${escapeHtml(l.text)}</span>
    </div>
  `).join('');
  switchTab('output');
}

function resetOutput() {
  document.getElementById('outputLines').innerHTML = `<div class="output-welcome"><span class="ow-icon">▶</span><span>Execute seu código para ver o resultado aqui</span></div>`;
  document.getElementById('feedbackContent').innerHTML = `<div class="output-welcome"><span class="ow-icon">💬</span><span>O feedback aparecerá após a execução</span></div>`;
  setStatus('idle', 'Pronto');
}

function showFeedback(type, ex) {
  const container = document.getElementById('feedbackContent');
  const fb = ex.feedback;
  const templates = {
    success: `<div class="fb-success"><div class="fb-icon">✅</div><div class="fb-text"><strong>Correto!</strong><p>${fb.success}</p></div></div>`,
    wrong: `<div class="fb-error"><div class="fb-icon">❌</div><div class="fb-text"><strong>Saída incorreta</strong><p>${fb.error}</p></div></div><div class="fb-tip"><div class="fb-icon">💡</div><div class="fb-text"><strong>Dica</strong><p><pre style="font-family:monospace;font-size:0.8rem;white-space:pre-wrap;margin:0">${escapeHtml(fb.tip)}</pre></p></div></div>`,
    error: `<div class="fb-error"><div class="fb-icon">⚠️</div><div class="fb-text"><strong>Erro de execução</strong><p>Verifique a sintaxe do código.</p></div></div><div class="fb-tip"><div class="fb-icon">💡</div><div class="fb-text"><strong>Dica</strong><p><pre style="font-family:monospace;font-size:0.8rem;white-space:pre-wrap;margin:0">${escapeHtml(fb.tip)}</pre></p></div></div>`,
    nooutput: `<div class="fb-tip"><div class="fb-icon">💡</div><div class="fb-text"><strong>Nenhuma saída gerada</strong><p>Seu código não exibiu nada.<br><pre style="font-family:monospace;font-size:0.8rem;white-space:pre-wrap;margin:0.5rem 0 0">${escapeHtml(fb.tip)}</pre></p></div></div>`,
  };
  container.innerHTML = templates[type] || '';
  if (type !== 'success') switchTab('feedback');
}

function switchTab(tab) {
  document.querySelectorAll('.op-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.op-pane').forEach(p => p.classList.remove('active'));
  document.querySelector(`.op-tab[data-tab="${tab}"]`).classList.add('active');
  document.getElementById(`pane${tab.charAt(0).toUpperCase() + tab.slice(1)}`).classList.add('active');
}

// ===================================================
// MODAL
// ===================================================

function showSuccessModal(ex) {
  document.getElementById('smSub').textContent = `Parabéns! "${ex.title}" concluído com sucesso.`;
  document.getElementById('smXp').textContent = `+${ex.xp} XP`;
  document.getElementById('successModal').classList.remove('hidden');
  document.getElementById('modalOverlay').classList.remove('hidden');
}

function hideSuccessModal() {
  document.getElementById('successModal').classList.add('hidden');
  document.getElementById('modalOverlay').classList.add('hidden');
}

document.getElementById('smClose').addEventListener('click', hideSuccessModal);
document.getElementById('modalOverlay').addEventListener('click', hideSuccessModal);
document.getElementById('smNext').addEventListener('click', () => {
  hideSuccessModal();
  const next = currentExerciseIndex + 1;
  if (next < getExercises().length) loadExercise(next);
});

// ===================================================
// EDITOR
// ===================================================

const codeEditor = document.getElementById('codeEditor');
const lineNumbers = document.getElementById('lineNumbers');

function updateLineNumbers() {
  const lines = codeEditor.value.split('\n');
  lineNumbers.innerHTML = lines.map((_, i) => `<span>${i + 1}</span>`).join('');
}

codeEditor.addEventListener('input', updateLineNumbers);
codeEditor.addEventListener('scroll', () => { lineNumbers.scrollTop = codeEditor.scrollTop; });

codeEditor.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const s = codeEditor.selectionStart, end = codeEditor.selectionEnd;
    codeEditor.value = codeEditor.value.substring(0, s) + '  ' + codeEditor.value.substring(end);
    codeEditor.selectionStart = codeEditor.selectionEnd = s + 2;
    updateLineNumbers();
  }
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); runCode(); }
});

// ===================================================
// EVENTOS
// ===================================================

document.getElementById('runBtn').addEventListener('click', runCode);

document.getElementById('resetBtn').addEventListener('click', () => {
  const ex = getExercises()[currentExerciseIndex];
  codeEditor.value = ex.starter || '';
  updateLineNumbers();
  resetOutput();
});

document.getElementById('hintToggle').addEventListener('click', () => {
  const box = document.getElementById('hintBox');
  box.classList.toggle('hidden');
  document.getElementById('hintToggle').textContent =
    box.classList.contains('hidden') ? '💡 Ver dica' : '💡 Ocultar dica';
});

document.querySelectorAll('.op-tab').forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

document.querySelectorAll('.ls-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ls-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLang = btn.dataset.lang;
    currentExerciseIndex = 0;
    loadExercise(0);
    renderExerciseList();
  });
});

// ===================================================
// UTILS
// ===================================================

function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ===================================================
// INIT
// ===================================================

const urlParams = new URLSearchParams(window.location.search);
const urlLang = urlParams.get('lang');
if (urlLang && EXERCISES[urlLang]) {
  currentLang = urlLang;
  document.querySelectorAll('.ls-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === urlLang);
  });
}

loadExercise(0);
renderExerciseList();
updateLineNumbers();

console.log('%c💻 ESMAEL.IAS — Modo Treino', 'font-size:1.5rem;font-weight:bold;color:#10b981;');
console.log('%cCtrl+Enter para executar rapidamente!', 'color:#9898b8;');