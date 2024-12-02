// Seleciona o botão "Salvar" pelo ID no DOM
const botaoSalvar = document.getElementById('salvar');

// Função para criar um novo contato na API
const postContato = async function () {
    // URL da API para criar um novo contato
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/novo/contato';

    // Captura os valores dos campos do formulário
    let nome = document.getElementById('nome').value.trim();
    let telefone = document.getElementById('telefone').value.trim();
    let foto = document.getElementById('image').value.trim();
    let email = document.getElementById('email').value.trim();

    // Verifica se os campos obrigatórios estão preenchidos
    if (!nome || !telefone || !email) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Cria um objeto JSON com os dados do contato
    let contatoJSON = {
        nome: nome,
        telefone: telefone,
        image: foto,
        email: email
    };

    try {
        // Envia a requisição POST para a API
        let response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(contatoJSON)
        });

        if (response.ok) {
            // Exibe mensagem de sucesso e atualiza a lista de contatos
            alert('Registro inserido com sucesso');
            getContatos();
        } else {
            // Trata erros de resposta da API
            let dados = await response.json();
            alert(`Erro ao inserir registro: ${dados.message || 'Erro desconhecido.'}`);
        }
    } catch (error) {
        // Trata erros de conexão
        console.error('Erro ao inserir contato:', error);
        alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    }
};

// Função para excluir um contato pelo ID
const deleteContato = async function (idContato) {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/excluir/contato/' + idContato;

    try {
        // Envia a requisição DELETE para a API
        let response = await fetch(url, {
            method: 'DELETE'
        });

        if (response.status === 200) {
            // Exibe mensagem de sucesso e atualiza a lista de contatos
            alert('Registro excluído com sucesso!');
            getContatos();
        } else {
            alert('Não foi possível realizar a exclusão do registro.');
        }
    } catch (error) {
        // Trata erros de conexão
        console.error('Erro ao excluir o contato:', error);
    }
};

// Função para listar todos os contatos
const getContatos = async function () {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/listar/contatos';

    try {
        // Faz a requisição GET para a API
        let response = await fetch(url);
        let dados = await response.json();

        // Limpa a lista existente antes de atualizar
        let divListDados = document.getElementById('listDados');
        divListDados.innerText = '';

        // Itera sobre cada contato e cria os elementos dinamicamente
        dados.contatos.forEach(function (contato) {
            let divDados = document.createElement('div');
            let divNome = document.createElement('div');
            let divTelefone = document.createElement('div');
            let divEmail = document.createElement('div');
            let divOpcoes = document.createElement('div');
            let spanEditar = document.createElement('span');
            let imgEditar = document.createElement('img');
            let spanExcluir = document.createElement('span');
            let imgExcluir = document.createElement('img');

            // Define atributos e insere dados
            divDados.setAttribute('id', 'dados');
            divDados.setAttribute('class', 'linha dados');
            imgEditar.setAttribute('src', 'icones/editar.png');
            imgEditar.setAttribute('idContato', contato.id);
            imgExcluir.setAttribute('src', 'icones/excluir.png');
            imgExcluir.setAttribute('idContato', contato.id);

            divNome.innerText = contato.nome;
            divTelefone.innerText = contato.telefone;
            divEmail.innerText = contato.email;

            // Adiciona os elementos ao DOM
            divListDados.appendChild(divDados);
            divDados.appendChild(divNome);
            divDados.appendChild(divTelefone);
            divDados.appendChild(divEmail);
            divDados.appendChild(divOpcoes);
            divOpcoes.appendChild(spanEditar);
            spanEditar.appendChild(imgEditar);
            divOpcoes.appendChild(spanExcluir);
            spanExcluir.appendChild(imgExcluir);

            // Adiciona eventos de clique para excluir e editar
            imgExcluir.addEventListener('click', function () {
                if (confirm('Deseja realmente excluir esse item?')) {
                    deleteContato(contato.id);
                }
            });

            imgEditar.addEventListener('click', function () {
                getBuscarContato(contato.id);
            });
        });
    } catch (error) {
        // Trata erros de conexão
        console.error('Erro ao buscar contatos:', error);
    }
};

// Função para buscar um contato específico pelo ID
const getBuscarContato = async function (idContato) {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/buscar/contato/' + idContato;

    try {
        let response = await fetch(url);
        if (response.ok) {
            let dados = await response.json();

            // Preenche o formulário com os dados do contato
            document.getElementById('nome').value = dados.nome;
            document.getElementById('telefone').value = dados.telefone;
            document.getElementById('image').value = dados.image;
            document.getElementById('email').value = dados.email;

            // Altera o texto do botão para "Atualizar"
            document.getElementById('salvar').innerText = 'Atualizar';

            // Armazena o ID para uso na atualização
            sessionStorage.setItem('idContato', idContato);
        } else {
            alert('Contato não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao buscar contato:', error);
    }
};

// Função para atualizar um contato existente
const putContato = async function () {
    let id = sessionStorage.getItem('idContato');
    if (!id) {
        alert('ID do contato não encontrado.');
        return;
    }

    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/atualizar/contato/' + id;

    // Captura os valores do formulário
    let nome = document.getElementById('nome').value;
    let telefone = document.getElementById('telefone').value;
    let foto = document.getElementById('image').value;
    let email = document.getElementById('email').value;

    let contatoJSON = {
        nome: nome,
        telefone: telefone,
        image: foto,
        email: email
    };

    try {
        let response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(contatoJSON)
        });

        if (response.ok) {
            alert('Registro atualizado com sucesso');
            getContatos();
            document.getElementById('salvar').innerText = 'Salvar';
        } else {
            alert('Erro ao atualizar o contato.');
        }
    } catch (error) {
        console.error('Erro ao atualizar o contato:', error);
    }
};

// Adiciona o evento de clique ao botão "Salvar"
botaoSalvar.addEventListener('click', function () {
    if (document.getElementById('salvar').innerText === 'Salvar') {
        postContato();
    } else if (document.getElementById('salvar').innerText === 'Atualizar') {
        putContato();
    }
});

// Carrega a lista de contatos ao carregar a página
window.addEventListener('load', getContatos);