import { Pool } from 'pg';
import pool from '../config/database';
import { Contato } from '../models/contatoModel';

export class ContactRepository {
  private pool: Pool = pool;

  /**
   * Obtém todos os contatos do banco de dados.
   * @returns Uma promessa que resolve para um array de livros.
   */
  async getAllContatos(): Promise<Contato[]> {
    try {
      const { rows } = await this.pool.query<Contato>('SELECT * FROM contatos');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
      throw new Error('Não foi possível buscar os contatos.');
    }
  }

  /**
   * Adiciona um novo contato ao banco de dados.
   * @param name - Nome do contato.
   * @param telefone - Telefone do contato.
   * @param image - URL da imagem do contato.
   * @param email - Email do contato.
   * @returns Uma promessa que resolve para o contato adicionado.
   */
  async addContato(name: string, telefone: string, image: string, email: string): Promise<Contato> {
    const query = `
      INSERT INTO contatos (name, telefone, image, email)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    try {
      const { rows } = await this.pool.query<Contato>(query, [name, telefone, image, email]);
      return rows[0];
    } catch (error) {
      console.error('Erro ao adicionar o contato:', error);
      throw new Error('Não foi possível adicionar o contato.');
    }
  }
}