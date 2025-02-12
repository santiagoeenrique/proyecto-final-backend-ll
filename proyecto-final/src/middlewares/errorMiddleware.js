const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Registra el error en la consola
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
  
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // No enviar el stack en producción
    });
  };
  
  module.exports = errorHandler;