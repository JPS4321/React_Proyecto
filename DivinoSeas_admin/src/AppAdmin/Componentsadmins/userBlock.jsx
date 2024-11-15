import React from 'react';
import { Navigate } from 'react-router-dom';
import {
  puedeAdministrarUsuarios,
  puedeVerReportes,
  puedeEditarInventario,
  puedeCrear,
} from '../../Roles'; 

const UserBlock = ({ element, requiredPermission, role }) => {
  const hasPermission = (() => {
    switch (requiredPermission) {
      case 'administrarUsuarios':
        return puedeAdministrarUsuarios(role);
      case 'verReportes':
        return puedeVerReportes(role);
      case 'editarInventario':
        return puedeEditarInventario(role);
      case 'crear':
        return puedeCrear(role);
      default:
        return false;
    }
  })();

  // Si no tiene permiso, redirige a una página de acceso denegado o inicio
  return hasPermission ? element : <Navigate to="/Home" />;
};

export default UserBlock;
