import pool from '../config/database';

const createUsersTable = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
        senha VARCHAR(100) NOT NULL
      )
      );
    `;
    await client.query(queryText);
    console.log('Tabela "users" criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabela:', err);
  } finally {
    client.release();
  }
};

createUsersTable().then(() => process.exit(0));

const createContatosTable = async () => {
  const contato = await pool.connect();
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS contatos (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        telefone VARCHAR(100) NOT NULL,
        image VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      );
    `;
    await contato.query(queryText);
    console.log('Tabela "contatos" criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabela:', err);
  } finally {
    contato.release();
  }
};

createContatosTable().then(() => process.exit(0));