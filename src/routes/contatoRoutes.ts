import express from 'express';
import { getAllContatos, addContato } from '../controllers/ContactControllers';

const router = express.Router();

/**
 * Rota para listar todos os contatos.
 * Método: GET
 * Endpoint: /contatos
 */
router.get('/', getAllContatos);

/**
 * Rota para adicionar um novo contato.
 * Método: POST
 * Endpoint: /contatos
 */
router.post('/', addContato);

export default router;  