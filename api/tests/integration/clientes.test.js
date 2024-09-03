import request from 'supertest';
import app from '../../index.js';
import pool from '../../connection.js';

let server;

beforeAll(async () => {
  server = app.listen(0, () => { 
    console.log(`Servidor escuchando en http://127.0.0.1:${server.address().port}`);
  });

  await pool.query('DELETE FROM Clientes;');
});

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve));
  await pool.end();
});

describe('Clientes API', () => {
  let createdClientId;

  it('debería crear un nuevo cliente', async () => {
    const res = await request(app)
      .post('/clientes')
      .set('Content-Type', 'application/json')
      .send({
        nombre: 'John Doe',
        email: 'johndoe@example.com',
        direccion: '123 Main St',
        contra: 'password123',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_cliente');
    createdClientId = res.body.id_cliente;
  });

  it('debería obtener todos los clientes', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería actualizar un cliente existente', async () => {
    const res = await request(app)
      .put(`/clientes/${createdClientId}`)
      .set('Content-Type', 'application/json')
      .send({
        nombre: 'Jane Doe',
        email: 'janedoe@example.com',
        direccion: '456 Elm St',
        contra: 'newpassword456',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Cliente actualizado con éxito');
  });

  it('debería eliminar un cliente', async () => {
    const res = await request(app)
      .delete(`/clientes/${createdClientId}`);

    expect(res.statusCode).toEqual(204);
});

});