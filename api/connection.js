import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    port: 13021,
    user: 'DivinoSeas_user',
    database: 'DivinoSeas_db',
    password: 'DivinoSeas_password',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})
export default pool