import request from 'supertest';
import app from '../../index.js';
import pool from '../../connection.js';

let server;
let createdOrderId;
let createdEnvioId;
let createdPagoId;

beforeAll(async () => {
  server = app.listen(0, () => {
    console.log(`Servidor escuchando en http://127.0.0.1:${server.address().port}`);
  });

  // Crear un cliente para asociar con las órdenes
  const clientResult = await pool.query(
    "INSERT INTO Clientes (nombre, email, direccion, contra) VALUES ('John Doe', 'johndoe@example.com', '123 Main St', 'password123')"
  );
  const clientId = clientResult[0].insertId;

  // Crear una orden para asociar con envíos y pagos
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

describe('Envios API', () => {
  it('debería crear un nuevo envío', async () => {
    const res = await request(app)
      .post('/envios')
      .set('Content-Type', 'application/json')
      .send({
        fechaEnvio: '2024-01-01',
        estado: 'en camino',
        id_orden: createdOrderId
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_envio');
    createdEnvioId = res.body.id_envio;
  });

  it('debería obtener todos los envíos', async () => {
    const res = await request(app).get('/envios');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería actualizar un envío existente con todos los campos necesarios', async () => {
    const res = await request(app)
      .put(`/envios/${createdEnvioId}`)
      .set('Content-Type', 'application/json')
      .send({
        fechaEnvio: '2024-01-02',  // Actualizando también la fecha
        estado: 'entregado',
        id_orden: createdOrderId
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Envío actualizado con éxito');
  });

  it('debería eliminar un envío y verificar que ya no existe', async () => {
    const deleteRes = await request(app)
      .delete(`/envios/${createdEnvioId}`);

    expect(deleteRes.statusCode).toEqual(204);

    // Intentar obtener el envío eliminado
    const getRes = await request(app)
      .get(`/envios/${createdEnvioId}`);

    expect(getRes.statusCode).toEqual(404);
  });
});

describe('Pagos API', () => {
  it('debería crear un nuevo pago', async () => {
    const res = await request(app)
      .post('/pagos')
      .set('Content-Type', 'application/json')
      .send({
        monto: 100.00,
        id_orden: createdOrderId
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_pago');
    createdPagoId = res.body.id_pago;
  });

  it('debería obtener todos los pagos', async () => {
    const res = await request(app).get('/pagos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería actualizar un pago existente', async () => {
    const res = await request(app)
      .put(`/pagos/${createdPagoId}`)
      .set('Content-Type', 'application/json')
      .send({
        monto: 150.00,
        id_orden: createdOrderId
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Pago actualizado con éxito');
  });

  it('debería eliminar un pago y verificar que ya no existe', async () => {
    const deleteRes = await request(app)
      .delete(`/pagos/${createdPagoId}`);

    expect(deleteRes.statusCode).toEqual(204);

    // Intentar obtener el pago eliminado
    const getRes = await request(app)
      .get(`/pagos/${createdPagoId}`);

    expect(getRes.statusCode).toEqual(404);
  });
});
