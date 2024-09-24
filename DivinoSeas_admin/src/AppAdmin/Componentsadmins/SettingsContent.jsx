import React, { useState } from 'react';
import useUser from '../hooks/useUser'; // Importa el hook
import '../styles/UserProfile.css'; 

const UserProfile = () => {
  const userId = "#5";  // Aquí puedes usar un ID dinámico si lo necesitas
  const { user, loading, error } = useUser(userId); // Usa el hook para obtener los datos del usuario
  const [permissions, setPermissions] = useState({
    canEditInventory: false,
    canViewReports: true,
    canManageUsers: false,
  });

  const handleLogout = () => {
    console.log("Cerrando sesión...");
  };

  const handlePermissionChange = (e) => {
    if (user?.role === "Administrador" || user?.role === "Supervisora de Tienda") {
      setPermissions({
        ...permissions,
        [e.target.name]: e.target.checked
      });
    }
  };

  const isEditable = user?.role === "Administrador" || user?.role === "Supervisora de Tienda";

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img src={user?.imagen || "https://via.placeholder.com/80"} alt="Perfil" />
        </div>
        <div className="profile-details">
          <p><strong>Correo:</strong> {user?.email}</p>
          <p><strong>Usuario:</strong> {user?.username}</p>
          <p><strong>Rol:</strong> {user?.role}</p>
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
