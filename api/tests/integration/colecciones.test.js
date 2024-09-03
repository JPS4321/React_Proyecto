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
  await pool.query('DELETE FROM ProductoColecciones;');
  await pool.query('DELETE FROM Colecciones;');
});

afterAll(async () => {
  // Cerrar el servidor después de las pruebas
  await new Promise((resolve) => server.close(resolve));
  console.log('Servidor cerrado');

  // Cerrar el pool de conexiones a la base de datos
  await pool.end();
});

describe('Colecciones API', () => {
  let createdCollectionId;

  it('debería crear una nueva colección', async () => {
    const res = await request(app)
      .post('/colecciones')
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Verano 2024', descripcion: 'Colección de verano para el año 2024' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_coleccion');
    createdCollectionId = res.body.id_coleccion; // Guardar el ID de la colección creada
  });

  it('debería obtener todas las colecciones', async () => {
    const res = await request(app).get('/colecciones');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería actualizar una colección existente', async () => {
    const res = await request(app)
      .put(`/colecciones/${createdCollectionId}`) // Usar la colección creada
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Primavera 2024', descripcion: 'Colección de primavera para el año 2024' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Colección actualizada con éxito');
  });

  it('debería eliminar una colección', async () => {
    const res = await request(app)
      .delete(`/colecciones/${createdCollectionId}`); // Usar la colección creada

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Colección eliminada con éxito');
  });
});
