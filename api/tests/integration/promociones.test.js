import request from 'supertest';
import app from '../../index.js';
import pool from '../../connection.js';

let server;

beforeAll(async () => {
  server = app.listen(0, () => {
    console.log(`Servidor escuchando en http://127.0.0.1:${server.address().port}`);
  });

  await pool.query('DELETE FROM Promociones;');
});

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve));
  console.log('Servidor cerrado');
  await pool.end();
});

describe('Promociones API', () => {
  let createdPromotionId;

  it('debería crear una nueva promoción', async () => {
    const res = await request(app)
      .post('/promociones')
      .set('Content-Type', 'application/json')
      .send({
        descripcion: 'Promoción de verano',
        descuento: 10.0,
        fechaInicio: '2024-08-01',
        fechaFin: '2024-08-31',
      });

    console.log('Promoción creada:', res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_promocion');
    createdPromotionId = res.body.id_promocion;
  });

  it('debería actualizar una promoción existente', async () => {
    console.log('Actualizando la promoción con ID:', createdPromotionId);

    const res = await request(app)
      .put(`/promociones/${createdPromotionId}`)
      .set('Content-Type', 'application/json')
      .send({
        descripcion: 'Promoción de verano extendida',
        descuento: 15.0,
        fechaInicio: '2024-08-01', // Mantén las fechas originales
        fechaFin: '2024-08-31',    // Mantén las fechas originales
      });

    console.log('Respuesta de actualización:', res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Promoción actualizada con éxito');
  });

  it('debería obtener todas las promociones', async () => {
    const res = await request(app).get('/promociones');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería eliminar una promoción', async () => {
    const res = await request(app)
      .delete(`/promociones/${createdPromotionId}`);

    expect(res.statusCode).toEqual(204);
  });
});
