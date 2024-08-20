import request from 'supertest';
import app from '../../index.js';
import pool from '../../connection.js';

let server;

beforeAll(async () => {
  server = app.listen(0, () => { 
    console.log(`Servidor escuchando en http://127.0.0.1:${server.address().port}`);
  });

  await pool.query('DELETE FROM Ordenes;');
  await pool.query('DELETE FROM Clientes;'); // Es necesario si la orden depende de clientes

  // Crea un cliente para asociarlo a las órdenes
  const [clientResult] = await pool.query(
    "INSERT INTO Clientes (nombre, email, direccion, contra) VALUES ('Test Cliente', 'testcliente@example.com', 'Test Address', 'password123')"
  );
  global.clientId = clientResult.insertId;
});

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve));
  await pool.end();
});

describe('Ordenes API', () => {
  let createdOrderId;

  it('debería crear una nueva orden', async () => {
    const res = await request(app)
      .post('/ordenes')
      .set('Content-Type', 'application/json')
      .send({
        id_cliente: global.clientId,
        fecha: '2023-08-25',
        total: 100.00,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_orden');
    createdOrderId = res.body.id_orden;
  });

  it('debería obtener todas las órdenes', async () => {
    const res = await request(app).get('/ordenes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería actualizar una orden existente', async () => {
    const res = await request(app)
      .put(`/ordenes/${createdOrderId}`)
      .set('Content-Type', 'application/json')
      .send({
        id_cliente: global.clientId,
        fecha: '2023-08-26',
        total: 150.00,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Orden actualizada con éxito');
  });

  it('debería eliminar una orden', async () => {
    const res = await request(app)
      .delete(`/ordenes/${createdOrderId}`);

    expect(res.statusCode).toEqual(204);
  });
});
