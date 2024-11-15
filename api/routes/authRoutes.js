import jwt from 'jsonwebtoken';
import { getUserByUsername, verifyPassword } from '../services/userService'; // Asegúrate de que estas funciones existan y funcionen correctamente

const loginController = async (req, res) => {
  const { username, password } = req.body;

  // Verifica el usuario y la contraseña en la base de datos
  const user = await getUserByUsername(username);
  if (!user || !verifyPassword(password, user.password)) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  // Genera el token JWT
  const token = jwt.sign(
    { id_user: user.id_user, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // Configura el tiempo de expiración que prefieras
  );

  res.json({ token });
};

export default loginController;
