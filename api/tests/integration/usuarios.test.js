import path from 'path';
import { fileURLToPath } from 'url';
import request from 'supertest';
import app from '../../index.js';
import pool from '../../connection.js';

// Definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let server;

beforeAll(async () => {
    server = app.listen(0, () => {
        console.log(`Servidor escuchando en http://127.0.0.1:${server.address().port}`);
    });

    // Limpiar la tabla de usuarios antes de las pruebas
    await pool.query('DELETE FROM Users;');
});

afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
    console.log('Servidor cerrado');
    await pool.end();
});

describe('Usuarios API', () => {
    let createdUserId;

    it('debería crear un nuevo usuario con imagen de perfil', async () => {
        const res = await request(app)
            .post('/usuarios')
            .set('Content-Type', 'multipart/form-data')
            .field('username', 'usuario_prueba')
            .field('password_hashed', 'password123')
            .field('is_admin', '0')  // Se pasa '0' como string para MySQL
            .field('role', 'user')
            .attach('imagen', path.resolve(__dirname, '../fixtures/hola.jpg'));

        console.log(res.body);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('userId');
        createdUserId = res.body.userId;
    });

    it('debería obtener todos los usuarios', async () => {
        const res = await request(app).get('/usuarios');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('debería obtener un usuario por su ID', async () => {
        if (!createdUserId) {
            throw new Error('El usuario no fue creado correctamente en la prueba anterior.');
        }

        const res = await request(app).get(`/usuarios/${createdUserId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id_user');
        expect(res.body.id_user).toEqual(createdUserId);
    });

    it('debería actualizar un usuario existente con una nueva imagen', async () => {
        if (!createdUserId) {
            throw new Error('El usuario no fue creado correctamente en la prueba anterior.');
        }

        const res = await request(app)
            .put(`/usuarios/${createdUserId}`)
            .set('Content-Type', 'multipart/form-data')
            .field('username', 'usuario_prueba_actualizado')
            .field('password_hashed', 'password1234')
            .field('is_admin', '1')  // Se pasa '1' como string para MySQL
            .field('role', 'admin')
            .attach('imagen', path.resolve(__dirname, '../fixtures/panda.jpg'));

        console.log(res.body);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Usuario actualizado con éxito');
    });

    it('debería eliminar un usuario', async () => {
        if (!createdUserId) {
            throw new Error('El usuario no fue creado correctamente en la prueba anterior.');
        }

        const res = await request(app).delete(`/usuarios/${createdUserId}`);
        expect(res.statusCode).toEqual(204);

        const resCheck = await request(app).get(`/usuarios/${createdUserId}`);
        expect(resCheck.statusCode).toEqual(404);
        expect(resCheck.body.message).toEqual('Usuario no encontrado');
    });
});
