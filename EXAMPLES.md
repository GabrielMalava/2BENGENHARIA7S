# Exemplos de Requisições para API de Tarefas

## Autenticação

### Registrar Usuário
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "nome": "Usuário Teste",
  "email": "usuario@teste.com",
  "senha": "senha123"
}
```

### Login
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "usuario@teste.com",
  "senha": "senha123"
}
```

## Tarefas

### Criar Tarefa (Requer token JWT)
```
POST http://localhost:3000/api/tasks
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_JWT

{
  "title": "Implementar API",
  "description": "Desenvolver uma API REST para gerenciamento de tarefas",
  "prioridade": "alta",
  "listId": 1
}
```

### Listar Tarefas (Requer token JWT)
```
GET http://localhost:3000/api/tasks
Authorization: Bearer SEU_TOKEN_JWT
```

### Obter Tarefa por ID (Requer token JWT)
```
GET http://localhost:3000/api/tasks/1
Authorization: Bearer SEU_TOKEN_JWT
```

### Atualizar Tarefa (Requer token JWT)
```
PUT http://localhost:3000/api/tasks/1
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_JWT

{
  "title": "Implementar API REST",
  "status": "em_andamento"
}
```

### Excluir Tarefa (Requer token JWT)
```
DELETE http://localhost:3000/api/tasks/1
Authorization: Bearer SEU_TOKEN_JWT
```

## Quadros

### Criar Quadro (Requer token JWT)
```
POST http://localhost:3000/api/boards
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_JWT

{
  "title": "Projeto API REST",
  "description": "Desenvolvimento da API REST para gerenciamento de tarefas"
}
```

### Listar Quadros (Requer token JWT)
```
GET http://localhost:3000/api/boards
Authorization: Bearer SEU_TOKEN_JWT
```

### Obter Quadro por ID (Requer token JWT)
```
GET http://localhost:3000/api/boards/1
Authorization: Bearer SEU_TOKEN_JWT
```

## Listas

### Criar Lista (Requer token JWT)
```
POST http://localhost:3000/api/lists
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_JWT

{
  "title": "Backlog",
  "boardId": 1
}
```

### Mover Tarefa (Requer token JWT)
```
POST http://localhost:3000/api/tasks/move
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_JWT

{
  "taskId": 1,
  "listId": 2,
  "position": 0
}
```

## Dados iniciais para teste

### Criar dados de teste
```
POST http://localhost:3000/api/seed
Content-Type: application/json
```
