import request from 'supertest';
import app from '../../index.js';
import pool from '../../connection.js';

let server;

beforeAll(async () => {
  // Iniciar el servidor antes de las pruebas
  server = app.listen(3000, () => {
    console.log('Servidor escuchando en http://127.0.0.1:3000');
  });

  // Limpiar la base de datos antes de las pruebas
  await pool.query('DELETE FROM DivinoSeas_Productos;');
  await pool.query('DELETE FROM Categorias;');
});

afterAll(async () => {
  // Cerrar el servidor después de las pruebas
  await server.close(() => {
    console.log('Servidor cerrado');
  });
});

describe('Categorías API', () => {
  it('debería crear una nueva categoría', async () => {
    const res = await request(app)
      .post('/categorias')
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Swimwear', descripcion: 'Bikini collections' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_categoria');
  });

  it('debería obtener todas las categorías', async () => {
    const res = await request(app).get('/categorias');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería actualizar una categoría existente', async () => {
    const nuevaCategoria = await request(app)
      .post('/categorias')
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Underwear', descripcion: 'Underwear collections' });

    const res = await request(app)
      .put(`/categorias/${nuevaCategoria.body.id_categoria}`)
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Lingerie', descripcion: 'Lingerie collections' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.nombre).toEqual('Lingerie');
  });

  it('debería eliminar una categoría', async () => {
    const nuevaCategoria = await request(app)
      .post('/categorias')
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Activewear', descripcion: 'Activewear collections' });

    const res = await request(app)
      .delete(`/categorias/${nuevaCategoria.body.id_categoria}`);

    expect(res.statusCode).toEqual(200);
  });
});
