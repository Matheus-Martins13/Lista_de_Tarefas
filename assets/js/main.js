(function() {
    const inputTarefa = document.querySelector('.input-tarefa');
    const btnTarefa = document.querySelector('.btn-tarefa');
    const tarefas = document.querySelector('.tarefas');

    function criaElemento(elemento) {
        return document.createElement(elemento);
    }

    function criaTarefa(textoInput) {
        const li = criaElemento('li');
        li.innerText = textoInput;
        tarefas.appendChild(li);
        criaBotaoApagar(li);
        salvarTarefas();
    }

    function criaBotaoApagar(li) {
        li.innerText += ' ';
        const btnApagar = criaElemento('button');
        btnApagar.innerText = 'Apagar';
        // btnApagar.classList.add('apagar');
        btnApagar.setAttribute('class', 'apagar');
        btnApagar.setAttribute('title', 'Apagar esta tarefa');
        li.appendChild(btnApagar);
    }

    function salvarTarefas(){
        const liTarefas = tarefas.querySelectorAll('li');
        const listaDeTarefas = [];

        for (let tarefa of liTarefas) {
            let tarefaTexto = tarefa.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
            listaDeTarefas.push(tarefaTexto);
        }
        const tarefasJSON = JSON.stringify(listaDeTarefas);
        localStorage.setItem('tarefas', tarefasJSON);  // recuperaremos pelo nome 'tarefas'. Só salva strings
    }

    function adicionaTarefasSalvas() {
        const tarefas = localStorage.getItem('tarefas');
        const listaDeTarefas = JSON.parse(tarefas);

        for (let tarefa of listaDeTarefas) {
            criaTarefa(tarefa);
        }
    }

    function limpaInput() {
        inputTarefa.value = '';
        inputTarefa.focus();
    }


    btnTarefa.addEventListener('click', function () {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
        limpaInput();
    })

    inputTarefa.addEventListener('keypress',function (e) {
        if (e.keyCode === 13){
            if (!inputTarefa.value) return;
            criaTarefa(inputTarefa.value);
            limpaInput();
        }
    });

    document.addEventListener('click', function(e) {
        const el = e.target;
        
        if (el.classList.contains('apagar')){
            el.parentElement.remove();
            salvarTarefas();
        }
    })

    adicionaTarefasSalvas();
})();
