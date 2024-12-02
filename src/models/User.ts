// src/models/User.ts

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
  }

  const users: User[] = []; // Simulação de banco de dados em memória

  export const userModel = {
    findOne: (email: string) => users.find(user => user.email === email),
    save: (user: User) => {
      users.push(user);
      return user;
    }
  };