import request from 'supertest';
import app from '../../index.js';
import pool from '../../connection.js';

let server;
let createdProductId;

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

describe('Productos API', () => {
  let createdCategoryId;

  beforeAll(async () => {
    // Crear una categoría para asociar productos
    const res = await request(app)
      .post('/categorias')
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Swimwear', descripcion: 'Bikini collections' });

    createdCategoryId = res.body.id_categoria;
  });

  afterAll(async () => {
    // Eliminar la categoría creada
    await request(app)
      .delete(`/categorias/${createdCategoryId}`);
  });

  it('debería crear un nuevo producto', async () => {
    const res = await request(app)
      .post('/productos')
      .set('Content-Type', 'application/json')
      .send({
        nombre: 'Bikini',
        descripcion: 'Bikini rojo para la playa',
        picture: 'bikini.jpg',
        existencias: 100,
        id_categoria: createdCategoryId // Asociación con la categoría creada
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('productId');
    createdProductId = res.body.productId; // Guardar el ID del producto creado
  });

  it('debería obtener todos los productos', async () => {
    const res = await request(app).get('/productos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería obtener un producto por su ID', async () => {
    const res = await request(app).get(`/productos/${createdProductId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual(createdProductId);
  });

  it('debería actualizar un producto existente', async () => {
    const res = await request(app)
      .put(`/productos/${createdProductId}`)
      .set('Content-Type', 'application/json')
      .send({
        nombre: 'Bikini Actualizado',
        descripcion: 'Bikini rojo actualizado',
        picture: 'bikini_updated.jpg',
        existencias: 50,
        id_categoria: createdCategoryId
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Producto actualizado con éxito');
  });

  it('debería eliminar un producto', async () => {
    const res = await request(app)
      .delete(`/productos/${createdProductId}`);

    expect(res.statusCode).toEqual(204);
  });

  it('debería devolver 404 al intentar obtener un producto eliminado', async () => {
    const res = await request(app).get(`/productos/${createdProductId}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Producto no encontrado');
  });
});
