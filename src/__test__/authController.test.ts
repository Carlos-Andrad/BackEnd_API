import request from 'supertest';
import express, { Application } from 'express';
import { register, login } from '../controllers/authController';
import { AuthService } from '../services/AuthService';

jest.mock('../services/AuthService');

const app: Application = express();
app.use(express.json());

// Configura rotas para testes
app.post('/register', register);
app.post('/login', login);

describe('AuthController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user and return 201 status', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      (AuthService.prototype.registerUser as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/register')
        .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
      expect(AuthService.prototype.registerUser).toHaveBeenCalledWith('John Doe', 'john@example.com', 'password123');
    });

    it('should return 400 status and error message when registration fails', async () => {
      const errorMessage = 'User registration failed';
      (AuthService.prototype.registerUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post('/register')
        .send({ name: 'Jane Doe', email: 'jane@example.com', password: 'password123' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
      expect(AuthService.prototype.registerUser).toHaveBeenCalledWith('Jane Doe', 'jane@example.com', 'password123');
    });
  });

  describe('login', () => {
    it('should login a user and return 200 status', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', token: 'fake-jwt-token' };
      (AuthService.prototype.loginUser as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/login')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
      expect(AuthService.prototype.loginUser).toHaveBeenCalledWith('john@example.com', 'password123');
    });

    it('should return 401 status and error message when login fails', async () => {
      const errorMessage = 'Invalid credentials';
      (AuthService.prototype.loginUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post('/login')
        .send({ email: 'jane@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: errorMessage });
      expect(AuthService.prototype.loginUser).toHaveBeenCalledWith('jane@example.com', 'wrongpassword');
    });
  });
});
