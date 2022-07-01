const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
  // CRIA O "LI" QUE SERÁ EXIBIDO NA TELA
  const li = document.createElement('li');
  return li;
}

inputTarefa.addEventListener('keypress', function (e) {
  // ADICIONA EVENTO PARA CAPTURAR O TEXTO DO INPUT TODA A VEZ QUE A TECLA "ENTER" (DE CÓDIGO 13) FOR PRESSIONADA
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
    // console.log('enter');
  }
});

function limpaInput() {
  // LIMPA O INPUT APÓS A CRIAÇÃO DA TAREFA
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criaBotãoApagar(li) {
  // CRIA UM BOTÃO DE APAGAR QUE SERÁ EXIBIDO ASSIM QUE A TAREFA FOR CRIADA
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar esta tarefa'); // ADICIONA UM ATRIBUTO CLASS AO BOTÃO
  li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
  // CRIAR A TAREFA E EXIBE NA TELA
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotãoApagar(li);
  salvarTarefas();
  // console.log(textoInput);
}

btnTarefa.addEventListener('click', function () {
  // CAPTURA O EVENTO DE CLICK NO BOTÃO
  if (!inputTarefa.value) return; // SÓ PERMITE A CAPTURA DO EVENTO DE CLICK SE HOUVER ALGUM CONTEUDO DENTRO DO INPUT
  criaTarefa(inputTarefa.value); // ENVIA O TEXTO PARA A FUNÇÃO QUE VAI CRIÁ-LO
  // console.log(inputTarefa.value);
});

document.addEventListener('click', function (e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove(); // REMOVE O ITEM DA LISTA
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas); // CRIA UMA ARQUIVO JSON COMO BANCO DE DADOS E CONVERTE OS DADOS ENVIADOS COMO STRING
  localStorage.setItem('tarefas', tarefasJSON); // SALVA OS DADOS NO LOCAL DE ARMAZENAMENTO DO NAVEGADOR
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas); // CONVERTER OS DADOS DE STRING PARA ARRAY NOVAMENTE

  // console.log(listaDeTarefas);

  for (let tarefa of listaDeTarefas) {
    // EXIBE AS TAREFAS JÁ CRIADAS QUE FORAM SALVAS NO LOCALSTORAGE
    criaTarefa(tarefa);
  }
}

adicionaTarefasSalvas();
