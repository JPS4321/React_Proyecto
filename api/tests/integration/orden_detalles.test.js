import request from 'supertest';
import app from '../../index.js';
import pool from '../../connection.js';

let server;
let createdOrderId;
let createdProductId;
let createdOrderDetailId;

beforeAll(async () => {
  server = app.listen(0, () => {
    console.log(`Servidor escuchando en http://127.0.0.1:${server.address().port}`);
  });

  // Crear un cliente para asociar con las órdenes
  const uniqueEmail = `johndoe_${Date.now()}@example.com`;
  const clientResult = await pool.query(
    "INSERT INTO Clientes (nombre, email, direccion, contra) VALUES ('John Doe', ?, '123 Main St', 'password123')",
    [uniqueEmail]
  );
  const clientId = clientResult[0].insertId;

  // Crear un producto para asociar con los detalles de orden
  const productResult = await pool.query(
    "INSERT INTO DivinoSeas_Productos (nombre, descripcion, precio) VALUES ('Producto de Prueba', 'Descripción de prueba', 100.00)"
  );
  createdProductId = productResult[0].insertId;

  // Crear una orden para asociar con los detalles de orden
  const orderResult = await pool.query(
    "INSERT INTO Ordenes (id_cliente, estado) VALUES (?, 'pendiente')",
    [clientId]
  );
  createdOrderId = orderResult[0].insertId;
});

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve));
  console.log('Servidor cerrado');
  await pool.end();
});

describe('OrdenDetalles API', () => {
  it('debería crear un nuevo detalle de orden', async () => {
    const res = await request(app)
      .post('/ordenes-detalles')
      .set('Content-Type', 'application/json')
      .send({
        cantidad: 2,
        precioPorUnidad: 50.00,
        id_orden: createdOrderId,
        id_producto: createdProductId
      });

    console.log('Respuesta al crear detalle de orden:', res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_ordenDetalle');
    createdOrderDetailId = res.body.id_ordenDetalle;

    console.log('ID del detalle de orden creado:', createdOrderDetailId);
  });

  it('debería obtener todos los detalles de orden', async () => {
    const res = await request(app).get('/ordenes-detalles');
    console.log('Detalles de orden obtenidos:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería actualizar un detalle de orden existente', async () => {
    const res = await request(app)
      .put(`/ordenes-detalles/${createdOrderDetailId}`)
      .set('Content-Type', 'application/json')
      .send({
        cantidad: 3,
        precioPorUnidad: 60.00
      });

    console.log('Respuesta al actualizar detalle de orden:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Detalle de orden actualizado con éxito');
  });

  it('debería eliminar un detalle de orden y verificar que ya no existe', async () => {
    const deleteRes = await request(app)
      .delete(`/ordenes-detalles/${createdOrderDetailId}`);

    expect(deleteRes.statusCode).toEqual(204);

    const getRes = await request(app)
      .get(`/ordenes-detalles/${createdOrderDetailId}`);

    expect(getRes.statusCode).toEqual(404);
  });
});
