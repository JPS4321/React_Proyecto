import React, { useState } from 'react';
import '../styles/UserProfile.css'; 

const users = [
  { id: "#1", image: "", user: "Fernando", mail: "Fernando@gmail.com", role: "Administrador" },
  { id: "#2", image: "", user: "Pablo", mail: "Pablo@gmail.com", role: "Gerente de Inventario" },
  { id: "#3", image: "https://via.placeholder.com/80", user: "Julio", mail: "Julio@gmail.com", role: "Encargado de Almacén" },
  { id: "#4", image: "https://via.placeholder.com/80", user: "Sofia", mail: "Sofia@gmail.com", role: "Supervisora de Tienda" },
  { id: "#5", image: "https://via.placeholder.com/80", user: "Joaquin", mail: "Joaquin@gmail.com", role: "Planificador de Compras" }
];

const UserProfile = () => {
  const userId = "#4"; 
  const user = users.find(u => u.id === userId); 
  const [permissions, setPermissions] = useState({
    canEditInventory: false,
    canViewReports: true,
    canManageUsers: false,
  });

  const handleLogout = () => {
    console.log("Cerrando sesión...");
  };

  const handlePermissionChange = (e) => {
    setPermissions({
      ...permissions,
      [e.target.name]: e.target.checked
    });
  };

  const isEditable = user.role === "Administrador" || user.role === "Supervisora de Tienda";

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img src={user.image || "https://via.placeholder.com/80"} alt="Perfil" />
        </div>
        <div className="profile-details">
          <p><strong>Correo:</strong> {user.mail}</p>
          <p><strong>Usuario:</strong> {user.user}</p>
          <p><strong>Rol:</strong> {user.role}</p>
        </div>
        <div className="permissions-section">
          <h3>Permisos:</h3>
          <label>
            <input 
              type="checkbox" 
              name="canEditInventory" 
              checked={permissions.canEditInventory} 
              onChange={handlePermissionChange} 
              disabled={!isEditable} 
            />
            Editar Inventario
          </label>
          <label>
            <input 
              type="checkbox" 
              name="canViewReports" 
              checked={permissions.canViewReports} 
              onChange={handlePermissionChange} 
              disabled={!isEditable} 
            />
            Ver Reportes
          </label>
          <label>
            <input 
              type="checkbox" 
              name="canManageUsers" 
              checked={permissions.canManageUsers} 
              onChange={handlePermissionChange} 
              disabled={!isEditable} 
            />
            Gestionar Usuarios
          </label>
        </div>
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default UserProfile;
