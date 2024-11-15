import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.headers.authorization?.split(" ")[1]; // Asumiendo "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Token de autenticación no proporcionado" });
  }

  try {
    // Verificar el token usando tu clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de tener `JWT_SECRET` en tus variables de entorno

    // Adjunta los datos del usuario a `req.user`
    req.user = { id_user: decoded.id_user, username: decoded.username, email: decoded.email };
    next();
  } catch (error) {
    console.error("Error de autenticación:", error);
    return res.status(403).json({ message: "Token de autenticación inválido" });
  }
};

export default authMiddleware;
