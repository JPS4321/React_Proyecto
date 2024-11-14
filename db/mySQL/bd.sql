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

-- Tabla de Colecciones
CREATE TABLE IF NOT EXISTS Colecciones (
    id_coleccion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Tabla de Promociones
CREATE TABLE IF NOT EXISTS Promociones (
    id_promocion INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT,
    descuento DECIMAL(5,2) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL
);

-- Tabla DivinoSeas_Productos (incluye referencias a colores, colecciones y promociones por ID)
CREATE TABLE IF NOT EXISTS DivinoSeas_Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    imagen LONGBLOB, 
    secondimage LONGBLOB,
    id_categoria INT,
    id_color INT,  -- Almacena el ID del color
    id_coleccion INT,  -- Almacena el ID de la colección
    id_promocion INT,  -- Almacena el ID de la promoción
    cantidad_xs INT DEFAULT 0,
    cantidad_s INT DEFAULT 0,
    cantidad_m INT DEFAULT 0,
    cantidad_l INT DEFAULT 0,
    FOREIGN KEY (id_categoria) REFERENCES Categorias (id_categoria) ON DELETE SET NULL,
    FOREIGN KEY (id_color) REFERENCES Colores (id_color) ON DELETE SET NULL,
    FOREIGN KEY (id_coleccion) REFERENCES Colecciones (id_coleccion) ON DELETE SET NULL,
    FOREIGN KEY (id_promocion) REFERENCES Promociones (id_promocion) ON DELETE SET NULL
);

-- Tabla de Clientes
CREATE TABLE IF NOT EXISTS Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    direccion TEXT NOT NULL,
    contra VARCHAR(255) NOT NULL
);

-- Tabla de Usuarios
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

-- Tabla de Auditoría de Inventario
CREATE TABLE IF NOT EXISTS InventoryAudit (
    id_audit INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    id_user INT,
    accion VARCHAR(50), -- "suma" o "resta"
    cantidad INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_producto) REFERENCES DivinoSeas_Productos(id_producto) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE SET NULL
);
