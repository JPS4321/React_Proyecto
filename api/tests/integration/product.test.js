import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Estas dos líneas definen __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

    // Crear una categoría de prueba para usar en las pruebas de productos
    const [result] = await pool.query("INSERT INTO Categorias (nombre, descripcion) VALUES ('Categoria de Prueba', 'Descripción de prueba')");
    global.testCategoriaId = result.insertId;  // Guardar el id_categoria creado
});

afterAll(async () => {
    // Cerrar el servidor después de las pruebas
    await new Promise((resolve) => server.close(resolve));
    console.log('Servidor cerrado');

    // Cerrar el pool de conexiones a la base de datos
    await pool.end();
});

describe('Productos API', () => {
    let createdProductId;

    it('debería crear un nuevo producto con imagen', async () => {
        const res = await request(app)
            .post('/productos')
            .set('Content-Type', 'multipart/form-data')
            .field('nombre', 'Bikini')
            .field('descripcion', 'Bikini rojo para la playa')
            .field('precio', 29.99)
            .field('id_categoria', global.testCategoriaId)  // Usar un id_categoria válido
            .attach('imagen', path.resolve(__dirname, '../fixtures/panda.jpg'));  // Ruta a una imagen de prueba

        console.log(res.body);  // Log para depuración

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('productId');
        createdProductId = res.body.productId; // Guarda el ID del producto creado
    });

    it('debería obtener todos los productos', async () => {
        const res = await request(app).get('/productos');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('debería obtener un producto por su ID', async () => {
        if (!createdProductId) {
            throw new Error('El producto no fue creado correctamente en la prueba anterior.');
        }

        const res = await request(app).get(`/productos/${createdProductId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id_producto');
        expect(res.body.id_producto).toEqual(createdProductId);
    });

    it('debería actualizar un producto existente con una nueva imagen', async () => {
        if (!createdProductId) {
            throw new Error('El producto no fue creado correctamente en la prueba anterior.');
        }

        const res = await request(app)
            .put(`/productos/${createdProductId}`)
            .set('Content-Type', 'multipart/form-data')
            .field('nombre', 'Bikini Actualizado')
            .field('descripcion', 'Bikini rojo actualizado')
            .field('precio', 34.99)
            .field('id_categoria', global.testCategoriaId)  // Usar un id_categoria válido
            .attach('imagen', path.resolve(__dirname, '../fixtures/hola.jpg'));  // Ruta a una imagen actualizada

        console.log(res.body);  // Log para depuración

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Producto actualizado con éxito');
    });

    it('debería eliminar un producto', async () => {
        if (!createdProductId) {
            throw new Error('El producto no fue creado correctamente en la prueba anterior.');
        }

        const res = await request(app)
            .delete(`/productos/${createdProductId}`);

        expect(res.statusCode).toEqual(204);

        const resCheck = await request(app).get(`/productos/${createdProductId}`);
        expect(resCheck.statusCode).toEqual(404);
        expect(resCheck.body.message).toEqual('Producto no encontrado');
    });
});
