import conn from '../connection.js';
import bcrypt from "bcrypt";

export async function getAllUsers() {
    try {
        const [rows] = await conn.query('SELECT * FROM Users');
        return rows;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export async function getUserById(id_user) {
    try {
        const [rows] = await conn.query('SELECT * FROM Users WHERE id_user = ?', [id_user]);
        return rows[0] || null;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export async function createUser(username, email, password_hashed, is_admin, role, imagen) {
    try {
        // Verificar si el correo ya existe
        const [existingUser] = await conn.query('SELECT * FROM Users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return { success: false, error: 'El correo ya está registrado' };
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password_hashed, 10);

        const [result] = await conn.query(
            'INSERT INTO Users (username, email, password_hashed, is_admin, role, imagen) VALUES (?, ?, ?, ?, ?, ?)', 
            [username, email, hashedPassword, is_admin, role, imagen]
        );
        return { success: true, result };
    } catch (e) {
        console.log(e);
        return { success: false, error: e };
    }
}

export async function getUserByEmail(email) {
    try {
        const [rows] = await conn.query('SELECT * FROM Users WHERE email = ?', [email]);
        return rows[0] || null; // Retorna el usuario si lo encuentra, o null si no
    } catch (e) {
        console.log(e);
        return e;
    }
}


export async function updateUser(id_user, username, email, password_hashed, is_admin, role, imagen) {
    try {
        const [result] = await conn.query(
            'UPDATE Users SET username = ?, email = ?, password_hashed = ?, is_admin = ?, role = ?, imagen = ? WHERE id_user = ?',
            [username, email, password_hashed, is_admin, role, imagen, id_user]
        );
        return result;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export async function deleteUser(id_user) {
    try {
        await conn.query('DELETE FROM Users WHERE id_user = ?', [id_user]);
    } catch (e) {
        console.log(e);
        return e;
    }
}
