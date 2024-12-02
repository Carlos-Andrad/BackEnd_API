// src/services/authService.ts

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos
import { UserModel } from '../models/user'; // Importando o modelo de usuário

export class AuthService {
  // Método para registrar um novo usuário
  async registerUser(name: string, email: string, password: string) {
    const existingUser = UserModel.findOne(email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
    };

    UserModel.save(user);
    return { id: user.id, name: user.name, email: user.email }; // Retorna informações do usuário sem a senha
  }

  // Método para fazer login de um usuário
  async loginUser(email: string, password: string) {
    const user = UserModel.findOne(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }

    return { id: user.id, name: user.name, email: user.email }; // Retorna informações do usuário sem a senha
  }
}