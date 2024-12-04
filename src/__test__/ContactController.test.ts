import request from 'supertest';
import { app } from '../server';

describe('Contact Controller', () => {
  
  it('should return all contacts', async () =>{
    const response = await        
    request(app).get('/contatos');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  
  it('should add a new contact', async () => {
        const newContact = {
          name: 'Test Contact',
          telefone: '11959698592',
          image: 'http://www.ausmotive.com/pics/2015/VW-Golf-VII-GTI-Clubsport-03.jpg',
          email: 'testEmail'
        };

      const response = await request(app).post('/contatos').send(newContact);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(newContact.name);
  });
});
