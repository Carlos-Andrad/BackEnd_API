import { Request, Response, NextFunction } from 'express'; 
import { ContactRepository } from '../repositories/ContactRepository'; // Importa a classe responsável pelo gerenciamento de contatos no repositório

// Cria uma instância do repositório de contatos para interação com os dados
const contactRepository = new ContactRepository();

/**
 * Middleware para validação dos dados de entrada de um contato.
 * Valida os campos `name`, `telefone`, `image` e `email` recebidos no corpo da requisição.
 */
const validateContatoData = (req: Request, res: Response, next: NextFunction) => {
  const { name, telefone, image, email } = req.body;

  // Verifica se o nome está presente e é uma string válida
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res
      .status(400)
      .json({ error: 'O campo "name" é obrigatório e deve ser uma string.' });
  }

  // Verifica se o telefone está presente, é uma string e contém apenas números
  if (!telefone || typeof telefone !== 'string' || !/^\d+$/.test(telefone)) {
    return res
      .status(400)
      .json({ error: 'O campo "telefone" é obrigatório e deve conter apenas números.' });
  }

  // Verifica se a imagem é uma URL válida
  if (!image || typeof image !== 'string' || !image.startsWith('http')) {
    return res
      .status(400)
      .json({ error: 'O campo "image" é obrigatório e deve ser uma URL válida.' });
  }

  // Verifica se o e-mail é válido
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res
      .status(400)
      .json({ error: 'O campo "email" é obrigatório e deve ser um e-mail válido.' });
  }

  // Se todas as validações passarem, chama o próximo middleware ou handler
  next();
};

/**
 * Handler para listar todos os contatos.
 * Faz uma chamada ao repositório para buscar os contatos no banco de dados.
 */
export const getAllContatos = async (req: Request, res: Response) => {
  try {
    const contatos = await contactRepository.getAllContatos(); // Busca os contatos no repositório
    res.status(200).json(contatos); // Retorna a lista de contatos com status 200 (OK)
  } catch (error) {
    console.error('Erro ao buscar contatos:', error); // Loga o erro para depuração
    res.status(500).json({ error: 'Erro ao buscar contatos.' }); // Retorna status 500 (erro interno do servidor)
  }
};

/**
 * Handler para adicionar um novo contato.
 * Recebe os dados do contato no corpo da requisição e chama o repositório para salvar.
 */
export const addContato = async (req: Request, res: Response) => {
  const { name, telefone, image, email } = req.body; // Extrai os dados do corpo da requisição

  try {
    const contato = await contactRepository.addContato(name, telefone, image, email); // Adiciona o contato ao repositório
    res.status(201).json(contato); // Retorna o contato criado com status 201 (Criado)
  } catch (error) {
    console.error('Erro ao adicionar o contato:', error); // Loga o erro para depuração
    res.status(500).json({ error: 'Erro ao adicionar o contato.' }); // Retorna status 500 (erro interno do servidor)
  }
};

// Exporta o middleware de validação para ser utilizado em outras partes do código
export { validateContatoData };
