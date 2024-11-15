import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming "Bearer <token>"
  console.log("Received token:", token); // Add this line to check the token value

  if (!token) {
    return res.status(401).json({ message: "Token de autenticación no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token data:", decoded); // Debugging output
    req.user = { id_user: decoded.id_user, username: decoded.username, email: decoded.email };
    next();
  } catch (error) {
    console.error("Error de autenticación:", error);
    return res.status(403).json({ message: "Token de autenticación inválido" });
  }
};

export default authMiddleware;
