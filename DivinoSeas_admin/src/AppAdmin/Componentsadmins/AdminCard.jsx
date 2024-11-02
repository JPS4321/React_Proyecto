import React from 'react';
import '../styles/AdminCard.css';

const AdminCard = ({ user }) => {
  const handleEdit = () => {
    console.log(`Editar usuario: ${user.username}`);
  };

  const handleDelete = () => {
    console.log(`Eliminar usuario: ${user.username}`);
  };

  return (
    <div className="custom-admin-card">
      <div className="custom-profile-image">
        <img src="https://via.placeholder.com/80" alt="Perfil" />
      </div>
      <div className="custom-profile-details">
        <p><strong>Usuario:</strong> {user.username}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
      </div>
      <div className="custom-action-buttons">
        <button className="custom-edit-button" onClick={handleEdit}>EDITAR USUARIO</button>
        <button className="custom-delete-button" onClick={handleDelete}>ELIMINAR USUARIO</button>
      </div>
    </div>
  );
};

export default AdminCard;
