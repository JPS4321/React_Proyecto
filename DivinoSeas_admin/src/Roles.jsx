import useUser from './AppAdmin/hooks/useUser';

const roles = {
  Dueño: {
    administrarUsuarios: true,
    verReportes: true,
    editarInventario: true,
    crear: true,
  },
  Administrador: {
    administrarUsuarios: false,
    verReportes: true,
    editarInventario: true,
    crear: true,
  },
  GestorDeVentas: {
    verReportes: true,
    editarInventario: true,
    crear: false,
    administrarUsuarios: false,
  },
  GestorDeInventario: {
    editarInventario: true,
    verReportes: false,
    crear: false,
    administrarUsuarios: false,
  },
};

// Funciones de permisos basadas en el rol
const puedeAdministrarUsuarios = (role) => roles[role]?.administrarUsuarios || false;
const puedeVerReportes = (role) => roles[role]?.verReportes || false;
const puedeEditarInventario = (role) => roles[role]?.editarInventario || false;
const puedeCrear = (role) => roles[role]?.crear || false;

// Función para obtener el rol del usuario actual
const getRole = (userId) => {
  const { role } = useUser(userId);
  return role || 'user'; // Devuelve 'user' como valor predeterminado si no se encuentra el rol
};

// Exporta todas las funciones y constantes
export { puedeAdministrarUsuarios, puedeVerReportes, puedeEditarInventario, puedeCrear, getRole };
