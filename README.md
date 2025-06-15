# API REST para Gerenciamento de Tarefas (Mini Trello)

API para gerenciamento de tarefas inspirada no Trello, desenvolvida com Node.js, Express, e Sequelize.

## Funcionalidades

- **Autenticação de Usuários**: Registro e login com JWT
- **Gerenciamento de Tarefas**: Criar, listar, atualizar e excluir tarefas
- **Organização em Quadros e Listas**: Organização de tarefas como no Trello
- **Prioridades e Status**: Definição de prioridades e status para cada tarefa

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web para Node.js
- **Sequelize**: ORM para Node.js
- **SQLite**: Banco de dados relacional leve
- **JWT**: JSON Web Token para autenticação

## Estrutura do Projeto

O projeto segue uma arquitetura em camadas:

- **Controllers**: Lógica de negócio e manipulação de requisições
- **Models**: Definição das entidades e relacionamentos
- **Routes**: Definição de rotas da API
- **Middlewares**: Funções intermediárias para processamento de requisições
- **Config**: Configurações do projeto

## Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o servidor:
   ```
   npm start
   ```

## Endpoints da API

### Autenticação

- `POST /api/auth/register`: Registrar novo usuário
- `POST /api/auth/login`: Autenticar usuário

### Tarefas

- `GET /api/tasks`: Listar todas as tarefas do usuário
- `POST /api/tasks`: Criar nova tarefa
- `GET /api/tasks/:id`: Obter detalhes de uma tarefa
- `PUT /api/tasks/:id`: Atualizar tarefa
- `DELETE /api/tasks/:id`: Excluir tarefa

### Quadros

- `GET /api/boards`: Listar todos os quadros do usuário
- `POST /api/boards`: Criar novo quadro
- `GET /api/boards/:id`: Obter detalhes de um quadro
- `PUT /api/boards/:id`: Atualizar quadro
- `DELETE /api/boards/:id`: Excluir quadro

### Listas

- `POST /api/lists`: Criar nova lista
- `PUT /api/lists/:id`: Atualizar lista
- `DELETE /api/lists/:id`: Excluir lista
- `POST /api/tasks/move`: Mover tarefa entre listas

### Dados iniciais

- `POST /api/seed`: Criar dados iniciais para teste
