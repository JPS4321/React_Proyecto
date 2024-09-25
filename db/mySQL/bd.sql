-- Creación de base de datos y usuario
CREATE DATABASE IF NOT EXISTS DivinoSeas_db;
USE DivinoSeas_db;

CREATE USER IF NOT EXISTS 'DivinoSeas_user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON DivinoSeas_db.* TO 'DivinoSeas_user'@'%';
FLUSH PRIVILEGES;

-- Tabla de Categorías
CREATE TABLE IF NOT EXISTS Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Tabla de Colores
CREATE TABLE IF NOT EXISTS Colores (
    id_color INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS DivinoSeas_Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    imagen LONGBLOB, 
    secondimage LONGBLOB,
    id_categoria INT,
    cantidad_xs INT DEFAULT 0,
    cantidad_s INT DEFAULT 0,
    cantidad_m INT DEFAULT 0,
    cantidad_l INT DEFAULT 0,
    FOREIGN KEY (id_categoria) REFERENCES Categorias (id_categoria) ON DELETE SET NULL
);

-- Tabla Producto-Colores para asociar DivinoSeas_Productos con varios colores
CREATE TABLE IF NOT EXISTS ProductoColores (
    id_producto INT,
    id_color INT,
    PRIMARY KEY (id_producto, id_color),
    FOREIGN KEY (id_producto) REFERENCES DivinoSeas_Productos (id_producto) ON DELETE CASCADE,
    FOREIGN KEY (id_color) REFERENCES Colores (id_color) ON DELETE CASCADE
);

-- Tabla de Colecciones
CREATE TABLE IF NOT EXISTS Colecciones (
    id_coleccion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Tabla Producto-Colecciones para asociar DivinoSeas_Productos con colecciones
CREATE TABLE IF NOT EXISTS ProductoColecciones (
    id_producto INT,
    id_coleccion INT,
    PRIMARY KEY (id_producto, id_coleccion),
    FOREIGN KEY (id_producto) REFERENCES DivinoSeas_Productos (id_producto) ON DELETE CASCADE,
    FOREIGN KEY (id_coleccion) REFERENCES Colecciones (id_coleccion) ON DELETE CASCADE
);


-- Tabla de Promociones
CREATE TABLE IF NOT EXISTS Promociones (
    id_promocion INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT,
    descuento DECIMAL(5,2) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL
);

-- Relación Producto-Promoción (Para aplicar descuentos a DivinoSeas_Productos específicos)
CREATE TABLE IF NOT EXISTS ProductoPromocion (
    id_producto INT,
    id_promocion INT,
    PRIMARY KEY (id_producto, id_promocion),
    FOREIGN KEY (id_producto) REFERENCES DivinoSeas_Productos (id_producto) ON DELETE CASCADE,
    FOREIGN KEY (id_promocion) REFERENCES Promociones (id_promocion) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    direccion TEXT NOT NULL,
    contra VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hashed VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    role VARCHAR(50) NOT NULL,
    imagen LONGBLOB
);


-- Tabla de Ordenes
CREATE TABLE IF NOT EXISTS Ordenes (
    id_orden INT AUTO_INCREMENT PRIMARY KEY,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50),
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES Clientes (id_cliente) ON DELETE SET NULL
);

-- Tabla de Detalles de Orden
CREATE TABLE IF NOT EXISTS OrdenDetalles (
    id_ordenDetalle INT AUTO_INCREMENT PRIMARY KEY,
    cantidad INT NOT NULL,
    precioPorUnidad DECIMAL(10,2) NOT NULL,
    id_orden INT,
    id_producto INT,
    FOREIGN KEY (id_orden) REFERENCES Ordenes (id_orden) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES DivinoSeas_Productos (id_producto) ON DELETE CASCADE
);

-- Tabla de Envíos
CREATE TABLE IF NOT EXISTS Envios (
    id_envio INT AUTO_INCREMENT PRIMARY KEY,
    fechaEnvio DATE NOT NULL,
    estado VARCHAR(255) NOT NULL,
    id_orden INT,
    FOREIGN KEY (id_orden) REFERENCES Ordenes (id_orden) ON DELETE CASCADE
);

-- Tabla de Pagos
CREATE TABLE IF NOT EXISTS Pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    fechaPago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    monto DECIMAL(10,2) NOT NULL,
    id_orden INT,
    FOREIGN KEY (id_orden) REFERENCES Ordenes (id_orden) ON DELETE SET NULL
);

