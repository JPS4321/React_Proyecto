import express from 'express';
import { getUserByEmail } from '../services/userService.js'; // Asegúrate de que este sea el archivo correcto
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verifica la contraseña
        const isPasswordCorrect = await bcrypt.compare(password, user.password_hashed);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Genera el token JWT
        const token = jwt.sign(
            { id_user: user.id_user, username: user.username, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { id_user: user.id_user, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

export default router;
