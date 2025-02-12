const checkRole = (role) => {
    return (req, res, next) => {
      // 1. Verificar si el usuario está autenticado
      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado. Inicia sesión para continuar.' });
      }
  
      // 2. Verificar si el usuario tiene el rol necesario
      if (req.user.role === role || req.user.role === 'admin') {
        next(); // Permitir acceso si el usuario tiene el rol especificado o es administrador
      } else {
        res.status(403).json({ message: 'No tienes permisos para acceder a este recurso.' });
      }
    };
  };
  
  module.exports = { checkRole };