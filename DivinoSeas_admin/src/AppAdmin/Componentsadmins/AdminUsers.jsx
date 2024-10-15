import React from 'react';
import AdminCard from './AdminCard'; 
import '../styles/AdminUsers.css'; 

const AdminUsers = () => {
  const users = [
    { id: 1, username: 'JuanPerez', email: 'juan.perez@example.com', role: 'Administrador' },
    { id: 2, username: 'MariaLopez', email: 'maria.lopez@example.com', role: 'Supervisora de Tienda' },
    { id: 3, username: 'CarlosGomez', email: 'carlos.gomez@example.com', role: 'Vendedor' },
  ];

  return (
    <div className="admin-users-container">
      <h2>Administración de Usuarios</h2>
      <div className="users-list">
        {users.map((user) => (
          <AdminCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
