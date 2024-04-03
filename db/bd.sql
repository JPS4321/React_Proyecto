CREATE DATABASE IF NOT EXISTS DivinoSeas_db;
USE DivinoSeas_db;

CREATE USER IF NOT EXISTS 'DivinoSeas_user'@'%' IDENTIFIED BY 'DivinoSeas_password';
GRANT ALL PRIVILEGES ON DivinoSeas_db.* TO 'DivinoSeas_user'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS DivinoSeas_Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    picture BLOB, 
    existencias INT
);
