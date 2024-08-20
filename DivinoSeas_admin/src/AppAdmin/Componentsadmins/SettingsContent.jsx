import React from 'react';
import '../styles/UserProfile.css'; 

const users = [
  { id: "#1", image: "", user: "Fernando", mail: "Fernando@gmail.com", role: "Administrador" },
  { id: "#2", image: "", user: "Pablo", mail: "Pablo@gmail.com", role: "Gerente de Inventario" },
  { id: "#3", image: "", user: "Julio", mail: "Julio@gmail.com", role: "Encargado de Almacén" },
  { id: "#4", image: "", user: "Sofia", mail: "Sofia@gmail.com", role: "Supervisora de Tienda" },
  { id: "#5", image: "", user: "Joaquin", mail: "Joaquin@gmail.com", role: "Planificador de Compras" }
];

const UserProfile = () => {
  const userId = "#4"; // ID del usuario actual
  const user = users.find(u => u.id === userId); // Filtramos el usuario con el ID 4

  const handleLogout = () => {
    // Cerrar sesion
    console.log("Cerrando sesión...");
  };

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img src={user.image || "path_to_default_profile_image.jpg"} alt="Perfil" />
        </div>
        <div className="profile-divider"></div>
        <div className="profile-details">
          <p><strong>Correo:</strong> {user.mail}</p>
          <p><strong>Usuario:</strong> {user.user}</p>
          <p><strong>Rol:</strong> {user.role}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default UserProfile;
