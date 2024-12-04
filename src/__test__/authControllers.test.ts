import request from 'supertest';
import express from 'express';
import { register, login } from '../controllers/authController'; // Ajuste conforme a localização do seu arquivo de controlador

// Crie uma instância do app Express
const app = express();
app.use(express.json()); // Middleware para parsear o corpo da requisição
app.post('/register', register); // Definindo a rota de registro
app.post('/login', login); // Definindo a rota de login

describe('Auth Controller', () => {

  // Teste para o registro de um novo usuário
  it('should register a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securepassword'
    };

    const response = await request(app)
      .post('/register')
      .send(newUser);

    // Verifique se a resposta é um código 201 e se o nome do usuário está correto
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  // Teste para o login de um usuário existente
  it('should log in an existing user', async () => {
    const existingUser = {
      email: 'john.doe@example.com',
      password: 'securepassword'
    };

    const response = await request(app)
      .post('/login')
      .send(existingUser);

    // Verifique se a resposta é um código 200 e se o email do usuário está correto
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(existingUser.email);
  });

  // Teste para login com credenciais inválidas
  it('should return error for invalid login credentials', async () => {
    const invalidUser = {
      email: 'nonexistent@example.com',
      password: 'wrongpassword'
    };

    const response = await request(app)
      .post('/login')
      .send(invalidUser);

    // Verifique se a resposta é um código 401 de erro de autenticação
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid email or password'); // Ajuste a mensagem de erro conforme sua implementação
  });

  // Teste para registro com dados inválidos
  it('should return error when required fields are missing', async () => {
    const invalidUser = {
      email: 'missingname@example.com',
      password: 'securepassword'
    };

    const response = await request(app)
      .post('/register')
      .send(invalidUser);

    // Verifique se a resposta é um código 400 de erro de requisição inválida
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Name is required'); // Ajuste a mensagem de erro conforme sua implementação
  });

});
