import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const { user: userData, loading, error } = useUser(user?.id);
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState({
    canEditInventory: false,
    canViewReports: true,
    canManageUsers: false,
  });

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem('user'); 
    navigate('/login');
  };

  const handleAdmin = () => {
    navigate('/Adminusers');
  };

  const handlePermissionChange = (e) => {
    if (userData?.role === "Administrador" || userData?.role === "Supervisora de Tienda") {
      setPermissions({
        ...permissions,
        [e.target.name]: e.target.checked
      });
    }
  };

  const isEditable = userData?.role === "Administrador" || userData?.role === "Supervisora de Tienda";

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
          <img src={userData?.imagen || "https://via.placeholder.com/80"} alt="Perfil" />
        </div>
        <div className="profile-details">
          <p><strong>Correo:</strong> {userData?.email}</p>
          <p><strong>Usuario:</strong> {userData?.username}</p>
          <p><strong>Rol:</strong> {userData?.role}</p>
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
        <button className="admin-button" onClick={handleAdmin}>ADMINISTRAR USUARIOS</button>
      </div>
    </div>
  );
};

export default UserProfile;
