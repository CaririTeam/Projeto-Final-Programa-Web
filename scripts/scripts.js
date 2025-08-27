// Capturar dados do formulário -> criar um objeto com os dados -> salvar no LocalStorage

import {Contato} from './Contato.js'

const form = document.getElementById('formulario');
const elementoFormulario = document.getElementById('formulario');
const elementoLista = document.getElementById('lista-contatos');

// salva os dados no localStorage
elementoFormulario.addEventListener('submit', (event) =>{
    event.preventDefault();

    //captura dos dados do formulario
    let ID = document.getElementById('input-ID').value;

    

    if(ID === ""){
        ID = Date.now();
    }
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value; 
    
    //recupera os dados ou recebe uma lista vazia
    const listaSalva = JSON.parse(localStorage.getItem('contatos')) || [];

    const indice = listaSalva.findIndex(x => String(x.ID ) === String(ID));  //verifica se dentro da lista existe um ID igual

    if(indice === -1){
        //instanciação de um novo objeto
        const novoContato = new Contato(ID, nome, email, telefone);

        //adiciona o novo objeto na lista
        listaSalva.push(novoContato.toJSON());

    } else {
       
        //instanciação de um novo objeto
        const novoContato = new Contato(ID, nome, email, telefone);

        //adiciona o novo objeto na lista
        listaSalva[indice] = (novoContato.toJSON());
    }    

    //salva os dados no localStorage
    localStorage.setItem('contatos', JSON.stringify(listaSalva));

    alert('Dados salvos com sucesso!');

    elementoFormulario.reset();
    location.reload();
});


//Botões de Novo contato e Lista de contatos
const btnNovoContato = document.getElementById('botao-novo');
btnNovoContato.addEventListener("click", inserirDados);

const btnListaContato = document.getElementById('botao-lista');
btnListaContato.addEventListener("click", listarDados);


//abre o formulário para inserção de dados
function inserirDados(){

    //limpa o container dos botões e cria um botõ salvar
    const containerBtn = document.getElementById('container-btn-form');
    containerBtn.innerHTML = ""; 
    const btnSalvar= document.createElement('button');
    btnSalvar.innerHTML = "Salvar";
    btnSalvar.style.backgroundColor = "green";

    const btnCancelar= document.createElement('button');
    btnCancelar.innerHTML = "Cancelar";
    btnCancelar.style.backgroundColor = "red";
    btnCancelar.addEventListener("click", (event) => {
        location.href = "./index.html"
    });

    containerBtn.style.display = "flex";
    containerBtn.style.flexDirection = "row";
    containerBtn.style.justifyContent = "space-around";
    containerBtn.style.gridColumn = "3";
    containerBtn.style.gridRow = "2";

    containerBtn.appendChild(btnSalvar);
    containerBtn.appendChild(btnCancelar);
    
    const elementoFormulario = document.getElementById('formulario');
    const elementoLista = document.getElementById('lista-contatos');
    document.getElementById('texto-inicial').style.display = "none";;
    document.getElementById('imagem-fundo').style.display = "none";
    document.getElementById('titulo').innerHTML = "Novo Contato";
    document.getElementById('img-home').style.display = "block";

    //adiciona caminho atual ao breadcrum
    document.getElementById('separador-caminho').innerHTML = "|"; 
    document.getElementById('refAtual').innerHTML = "Novo contato"; 

    
    elementoFormulario.style.display = "grid";
    elementoLista.style.display = "none";
    elementoFormulario.reset();
}

// Recuperar os dados do localStorage e mostrar no corpo da página, na secção <main>
function listarDados(){

    const elementoFormulario = document.getElementById('formulario');
    const elementoLista = document.getElementById('lista-contatos');  
    const textoInicial = document.getElementById('texto-inicial');
    document.getElementById('imagem-fundo').style.display = "none";
    document.getElementById('img-home').style.display = "block";

    //adiciona um titulo a página da Lista de contatos
    document.getElementById('titulo').innerHTML = "Lista de Contatos";

    //adiciona caminho atual ao breadcrum
    document.getElementById('separador-caminho').innerHTML = "|"; 
    document.getElementById('refAtual').innerHTML = "Lista de contatos"; 

    elementoLista.innerHTML = '';

    //cria o cabeçalho da lista de contatos
    const cabecalhoNome = document.createElement('div');
    cabecalhoNome.innerHTML = "Nome";   
    const cabecalhoEmail = document.createElement('div');
    cabecalhoEmail.innerHTML = "Email";    
    const cabecalhoTelefone = document.createElement('div');
    cabecalhoTelefone.innerHTML = "Telefone";
    const cabecalhoVazio = document.createElement('div');  // cria um espaço vazio no cabaçalho da lista de contatos
    cabecalhoVazio.style.borderBottom = "none";    

    elementoLista.appendChild(cabecalhoNome);
    elementoLista.appendChild(cabecalhoEmail);
    elementoLista.appendChild(cabecalhoTelefone);
    elementoLista.appendChild(cabecalhoVazio);
        
    textoInicial.style.display = "none";
    elementoFormulario.style.display = "none";
    elementoLista.style.display = "grid";

    //Lista os contatos salvos       
    const listaSalva = JSON.parse(localStorage.getItem('contatos')) || [];

    listaSalva.forEach((x) => {

        const novoElementoNome = document.createElement('span');
        novoElementoNome.innerHTML = x.nome;

        const novoElementoEmail = document.createElement('span');
        novoElementoEmail.innerHTML = x.email;

        const novoElementoTelefone = document.createElement('span');
        novoElementoTelefone.innerHTML = x.telefone;

        //cria um botão editar ao lado do contato salvo
        const botaoEditar = document.createElement('button');
        botaoEditar.innerHTML = "Editar";
        botaoEditar.onclick = function(){
            editarContatos(x.ID);
        };

        elementoLista.appendChild(novoElementoNome);
        elementoLista.appendChild(novoElementoEmail);
        elementoLista.appendChild(novoElementoTelefone);
        elementoLista.appendChild(botaoEditar);
                    
    });   
    
}

function editarContatos(ID){

        elementoFormulario.style.display = "grid";
        elementoLista.style.display = "none";

        document.getElementById('separador-caminho').innerHTML = "|"; 
        document.getElementById('refAtual').innerHTML = "Editar contatos"; 
        document.getElementById('titulo').innerHTML = "Editar Contatos";

        const listaSalva = JSON.parse(localStorage.getItem('contatos')) || [];
        const objBuscado = listaSalva.find(x => x.ID === ID);

        //inserindo os valores recuperados nos inputs do formulário
        document.getElementById('input-ID').value = ID;
        document.getElementById('nome').value = objBuscado.nome;
        document.getElementById('email').value = objBuscado.email;
        document.getElementById('telefone').value = objBuscado.telefone;

        //limpar o container dos botões
        const containerBtn = document.getElementById('container-btn-form');
        containerBtn.innerHTML = "";        

        //cria novos botões
        const btnEditar= document.createElement('button');
        const btnCancelar= document.createElement('button');
        const btnExcluir= document.createElement('button');
        
        btnCancelar.innerHTML = "Cancelar";
        btnCancelar.style.backgroundColor = "red"    
        btnCancelar.type = "button";
        btnCancelar.onclick = function(){location.reload()};  
        btnExcluir.innerHTML = "Excluir";
        btnExcluir.style.backgroundColor = "orange";   
        btnExcluir.type = "button";  
        btnEditar.innerHTML = "Editar";
        btnEditar.style.backgroundColor = "green";     
        
        containerBtn.appendChild(btnEditar);
        containerBtn.appendChild(btnCancelar);
        containerBtn.appendChild(btnExcluir);
        
        
        containerBtn.style.display = "flex";     
        containerBtn.style.flexDirection = "row";
        containerBtn.style.justifyContent = "space-around";
        containerBtn.style.gridColumn = "3";
        containerBtn.style.gridRow = "2";

        
        btnExcluir.addEventListener("click", (event) =>{

            elementoFormulario.reset();

            let listaSalva = JSON.parse(localStorage.getItem('contatos')) || [];

            const obj = listaSalva.findIndex(x => String(x.ID) === String(ID));
            

            if (obj !== -1){
                listaSalva.splice(obj,1);                
                localStorage.setItem('contatos', JSON.stringify(listaSalva));
                alert('Cotato excluido com sucesso!');
                location.reload();
            }
        });

        return;
    }