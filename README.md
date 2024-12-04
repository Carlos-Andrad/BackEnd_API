# API para Gerenciamento de Contatos - TypeScript

## **Descrição**

Esta é uma API desenvolvida para um sistema de gerenciamento de contatos. Com ela, os usuários podem obter e cadastrar contatos fornecendo os seguintes campos:

- **Nome**
- **Telefone**
- **Imagem** (URL)
- **Email**

A API foi criada utilizando o padrão MVC (Model-View-Controller) para estruturar o código.

---

## **Recursos da API**

### **1. Listar todos os contatos**

- **Método:** `GET`
- **Endpoint:** `/contatos`
- **Descrição:** Retorna uma lista com todos os contatos cadastrados.

#### Exemplo de Resposta:

```json
[
  {
    "id": 1,
    "name": "Carlos Andrade",
    "telefone": "11983251632",
    "image": "https://exemplo.com/carlos.jpg",
    "email": "carlos.andrade@exemplo.com"
  }
]
```

### **2. Cadastrar um novo contato**

- **Método:** `POST`
- **Endpoint:** `/contatos`
- **Descrição:** Adiciona um novo contato ao sistema.
- **Body:**
  ```json
  {
    "name": "Nome do contato",
    "telefone": "Telefone do contato",
    "image": "URL da imagem",
    "email": "Email do contato"
  
  ```

#### Exemplo de Resposta:

```json
{
  "id": 1,
  "name": "Nome do contato",
  "subtitle": "Telefone do contato",
  "image": "https://exemplo.com/contato.jpg",
  "price": "Email do contato"
}
```

#### Validações:

- `name`: obrigatório, string não vazia.
- `telefone`: obrigatório, string não vazia.
- `image`: obrigatório, deve ser uma URL válida.
- `email`:  obrigatório, string não vazia.

---

## **Como Rodar o Projeto**

### **1. Pré-requisitos**

Certifique-se de ter instalado:

- Node.js (versão mais recente recomendada)
- Banco de dados PostgreSQL

### **2. Configuração**

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados:

   - Crie uma tabela chamada `contatos` com as colunas `id`, `name`, `telefone`, `image` e `email`.
   - Use o seguinte script SQL como exemplo:
     ```sql
     CREATE TABLE contatos (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        telefone VARCHAR(100) NOT NULL,
        image VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      );
     ```

4. Configure as variáveis de ambiente no arquivo `.env`:

   ```env
   DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
   PORT=3000
   ```

### **3. Rodando o projeto**

Para iniciar o servidor:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

---

## **Tecnologias Utilizadas**

- **Node.js**
- **Express**
- **PostgreSQL**
- **TypeScript**
- **Jest** (para testes)

---

## **Contribuindo**

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests para melhorar o projeto!.

---

## **Licença**

Este projeto é licenciado sob a licença MIT.

Autor: Carlos Andrade



