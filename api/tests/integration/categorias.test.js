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
  await pool.query('DELETE FROM DivinoSeas_Productos;');
  await pool.query('DELETE FROM Categorias;');
});

afterAll(async () => {
  // Cerrar el servidor después de las pruebas
  await new Promise((resolve) => server.close(resolve));
  console.log('Servidor cerrado');

  // Cerrar el pool de conexiones a la base de datos
  await pool.end();
});

describe('Categorías API', () => {
  let createdCategoryId;

  it('debería crear una nueva categoría', async () => {
    const res = await request(app)
      .post('/categorias')
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Swimwear', descripcion: 'Bikini collections' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_categoria');
    createdCategoryId = res.body.id_categoria; // Guardar el ID de la categoría creada
  });

  it('debería obtener todas las categorías', async () => {
    const res = await request(app).get('/categorias');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería actualizar una categoría existente', async () => {
    const res = await request(app)
      .put(`/categorias/${createdCategoryId}`) // Usar la categoría creada
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Lingerie', descripcion: 'Lingerie collections' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Categoría actualizada con éxito');
  });

  it('debería eliminar una categoría', async () => {
    const res = await request(app)
      .delete(`/categorias/${createdCategoryId}`); // Usar la categoría creada

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Categoría eliminada con éxito');
  });
});
