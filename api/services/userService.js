import conn from '../connection.js';

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
        const [result] = await conn.query(
            'INSERT INTO Users (username, email, password_hashed, is_admin, role, imagen) VALUES (?, ?, ?, ?, ?, ?)', 
            [username, email, password_hashed, is_admin, role, imagen]
        );
        return { success: true, result };
    } catch (e) {
        console.log(e);
        return { success: false, error: e };
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
