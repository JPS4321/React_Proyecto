import request from 'supertest';
import app from '../../index.js';
import pool from '../../connection.js';

let server;

beforeAll(async () => {
  // Iniciar el servidor antes de las pruebas
  server = app.listen(0, () => {
    console.log(`Servidor escuchando en http://127.0.0.1:${server.address().port}`);
  });

  // Limpiar la base de datos antes de las pruebas
  await pool.query('DELETE FROM Clientes;');
});

afterAll(async () => {
  // Cerrar el servidor después de las pruebas
  await new Promise((resolve) => server.close(resolve));
  console.log('Servidor cerrado');

  // Cerrar el pool de conexiones a la base de datos
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
        telefono: '555-1234',
        direccion: '123 Main St',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_cliente');
    createdClientId = res.body.id_cliente; // Guardar el ID del cliente creado
  });

  it('debería obtener todos los clientes', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería actualizar un cliente existente', async () => {
    const res = await request(app)
      .put(`/clientes/${createdClientId}`) // Usar el cliente creado
      .set('Content-Type', 'application/json')
      .send({
        nombre: 'Jane Doe',
        email: 'janedoe@example.com',
        telefono: '555-5678',
        direccion: '456 Elm St',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Cliente actualizado con éxito');
  });

  it('debería eliminar un cliente', async () => {
    const res = await request(app)
      .delete(`/clientes/${createdClientId}`); // Usar el cliente creado

    expect(res.statusCode).toEqual(204);
  });
});
