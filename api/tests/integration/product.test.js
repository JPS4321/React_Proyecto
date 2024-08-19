import request from 'supertest';
import app from '../../index.js';
import pool from '../../connection.js';

let server;
const TIMEOUT = 30000;

beforeAll(async () => {
  server = app.listen(3000, () => {
    console.log('Servidor escuchando en http://127.0.0.1:3000');
  });
  
 
  await pool.query('CREATE TABLE IF NOT EXISTS Categorias (id_categoria INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255) NOT NULL, descripcion TEXT);');
  await pool.query('CREATE TABLE IF NOT EXISTS Colores (id_color INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(50) NOT NULL);');
  await pool.query(`CREATE TABLE IF NOT EXISTS DivinoSeas_Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES Categorias (id_categoria) ON DELETE SET NULL
  );`);
  await pool.query(`CREATE TABLE IF NOT EXISTS ProductoColores (
    id_producto INT,
    id_color INT,
    PRIMARY KEY (id_producto, id_color),
    FOREIGN KEY (id_producto) REFERENCES DivinoSeas_Productos (id_producto) ON DELETE CASCADE,
    FOREIGN KEY (id_color) REFERENCES Colores (id_color) ON DELETE CASCADE
  );`);
  await pool.query(`CREATE TABLE IF NOT EXISTS Colecciones (
    id_coleccion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
  );`);
  await pool.query(`CREATE TABLE IF NOT EXISTS ProductoColecciones (
    id_producto INT,
    id_coleccion INT,
    PRIMARY KEY (id_producto, id_coleccion),
    FOREIGN KEY (id_producto) REFERENCES DivinoSeas_Productos (id_producto) ON DELETE CASCADE,
    FOREIGN KEY (id_coleccion) REFERENCES Colecciones (id_coleccion) ON DELETE CASCADE
  );`);
  await pool.query(`CREATE TABLE IF NOT EXISTS Inventarios (
    id_inventario INT AUTO_INCREMENT PRIMARY KEY,
    cantidad INT NOT NULL,
    fechaActualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_producto INT,
    FOREIGN KEY (id_producto) REFERENCES DivinoSeas_Productos (id_producto) ON DELETE CASCADE
  );`);
  await pool.query(`CREATE TABLE IF NOT EXISTS Promociones (
    id_promocion INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT,
    descuento DECIMAL(5,2) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL
  );`);
  await pool.query(`CREATE TABLE IF NOT EXISTS ProductoPromocion (
    id_producto INT,
    id_promocion INT,
    PRIMARY KEY (id_producto, id_promocion),
    FOREIGN KEY (id_producto) REFERENCES DivinoSeas_Productos (id_producto) ON DELETE CASCADE,
    FOREIGN KEY (id_promocion) REFERENCES Promociones (id_promocion) ON DELETE CASCADE
  );`);
}, TIMEOUT);

afterAll((done) => {
  server.close(() => {
    console.log('Servidor cerrado');
    done();
  });
}, TIMEOUT);

describe('Product Endpoints', () => {
  it('should create a new category', async () => {
    const res = await request(app)
      .post('/categorias')
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Swimwear', descripcion: 'Bikini collections' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_categoria');
  }, TIMEOUT);

  it('should create a new product', async () => {
    const categoryRes = await request(app)
      .post('/categorias')
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Swimwear', descripcion: 'Bikini collections' });

    const categoryId = categoryRes.body.id_categoria;

    const res = await request(app)
      .post('/productos')
      .set('Content-Type', 'application/json')
      .send({
        nombre: 'Tropical Bikini',
        descripcion: 'A vibrant tropical bikini set',
        precio: 59.99,
        id_categoria: categoryId
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id_producto');
  }, TIMEOUT);

  it('should fetch all products', async () => {
    const res = await request(app).get('/productos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  }, TIMEOUT);
});
