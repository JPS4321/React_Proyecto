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
  await pool.query('DELETE FROM ProductoColores;');
  await pool.query('DELETE FROM Colores;');
});

afterAll(async () => {
  // Cerrar el servidor después de las pruebas
  await new Promise((resolve) => server.close(resolve));
  console.log('Servidor cerrado');

  // Cerrar el pool de conexiones a la base de datos
  await pool.end();
});

describe('Colores API', () => {
  let createdColorId;

  it('debería crear un nuevo color', async () => {
    const res = await request(app)
      .post('/colores')
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Rojo' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_color');
    createdColorId = res.body.id_color; // Guardar el ID del color creado
  });

  it('debería obtener todos los colores', async () => {
    const res = await request(app).get('/colores');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería actualizar un color existente', async () => {
    const res = await request(app)
      .put(`/colores/${createdColorId}`) // Usar el color creado
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Verde' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Color actualizado con éxito');
  });

  it('debería eliminar un color', async () => {
    const res = await request(app)
      .delete(`/colores/${createdColorId}`); // Usar el color creado

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Color eliminado con éxito');
  });
});
