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
  await pool.query('DELETE FROM Inventarios;');
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

describe('Inventarios API', () => {
  let createdProductId;
  let createdInventoryId;

  beforeAll(async () => {
    // Crear una categoría para el producto
    const categoryRes = await request(app)
      .post('/categorias')
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Accesorios', descripcion: 'Accesorios de moda' });

    const categoryId = categoryRes.body.id_categoria;

    // Crear un producto antes de los tests
    const productRes = await request(app)
      .post('/productos')
      .set('Content-Type', 'application/json')
      .send({
        nombre: 'Sombrero de playa',
        descripcion: 'Sombrero de playa hecho de paja',
        precio: 19.99,
        id_categoria: categoryId,
      });

    createdProductId = productRes.body.id_producto;
  });

  it('debería crear un nuevo inventario', async () => {
    const res = await request(app)
      .post('/inventarios')
      .set('Content-Type', 'application/json')
      .send({
        cantidad: 100,
        id_producto: createdProductId,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_inventario');
    createdInventoryId = res.body.id_inventario; // Guardar el ID del inventario creado
  });

  it('debería obtener todos los inventarios', async () => {
    const res = await request(app).get('/inventarios');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería actualizar un inventario existente', async () => {
    const res = await request(app)
      .put(`/inventarios/${createdInventoryId}`) // Usar el inventario creado
      .set('Content-Type', 'application/json')
      .send({ cantidad: 150 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Inventario actualizado con éxito');
  });

  it('debería eliminar un inventario', async () => {
    const res = await request(app)
      .delete(`/inventarios/${createdInventoryId}`); // Usar el inventario creado

    expect(res.statusCode).toEqual(204); // Ajuste al código de estado esperado
  });
});
