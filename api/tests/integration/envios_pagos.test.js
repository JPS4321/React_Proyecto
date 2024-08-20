import request from 'supertest';
import app from '../../index.js';
import pool from '../../connection.js';

let server;
let createdOrderId;
let createdShippingId;
let createdPaymentId;

beforeAll(async () => {
  server = app.listen(0, () => {
    console.log(`Servidor escuchando en http://127.0.0.1:${server.address().port}`);
  });

  // Limpiar la base de datos antes de las pruebas
  await pool.query('DELETE FROM Envios;');
  await pool.query('DELETE FROM Pagos;');
  await pool.query('DELETE FROM Ordenes;');  // Asegúrate de que las órdenes se borren, ya que están relacionadas

  // Crear una orden para asociar con envíos y pagos
  const orderResult = await pool.query(
    "INSERT INTO Ordenes (id_cliente, fecha, total) VALUES (1, NOW(), 100.00)"
  );
  createdOrderId = orderResult[0].insertId;
});

afterAll(async () => {
  // Cerrar el servidor después de las pruebas
  await new Promise((resolve) => server.close(resolve));
  console.log('Servidor cerrado');

  // Cerrar el pool de conexiones a la base de datos
  await pool.end();
});

describe('Envios API', () => {
  it('debería crear un nuevo envío', async () => {
    const res = await request(app)
      .post('/envios')
      .set('Content-Type', 'application/json')
      .send({
        id_orden: createdOrderId,
        direccion_envio: '123 Main St',
        fecha_envio: '2024-08-20',
        estado_envio: 'En camino'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_envio');
    createdShippingId = res.body.id_envio;
  });

  it('debería obtener todos los envíos', async () => {
    const res = await request(app).get('/envios');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería actualizar un envío existente', async () => {
    const res = await request(app)
      .put(`/envios/${createdShippingId}`)
      .set('Content-Type', 'application/json')
      .send({
        direccion_envio: '456 Elm St',
        fecha_envio: '2024-08-21',
        estado_envio: 'Entregado'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Envío actualizado con éxito');
  });

  it('debería eliminar un envío', async () => {
    const res = await request(app)
      .delete(`/envios/${createdShippingId}`);

    expect(res.statusCode).toEqual(204);
  });
});

describe('Pagos API', () => {
  it('debería crear un nuevo pago', async () => {
    const res = await request(app)
      .post('/pagos')
      .set('Content-Type', 'application/json')
      .send({
        id_orden: createdOrderId,
        metodo_pago: 'Tarjeta de Crédito',
        monto: 100.00,
        fecha_pago: '2024-08-20'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_pago');
    createdPaymentId = res.body.id_pago;
  });

  it('debería obtener todos los pagos', async () => {
    const res = await request(app).get('/pagos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería actualizar un pago existente', async () => {
    const res = await request(app)
      .put(`/pagos/${createdPaymentId}`)
      .set('Content-Type', 'application/json')
      .send({
        metodo_pago: 'PayPal',
        monto: 90.00,
        fecha_pago: '2024-08-21'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Pago actualizado con éxito');
  });

  it('debería eliminar un pago', async () => {
    const res = await request(app)
      .delete(`/pagos/${createdPaymentId}`);

    expect(res.statusCode).toEqual(204);
  });
});
