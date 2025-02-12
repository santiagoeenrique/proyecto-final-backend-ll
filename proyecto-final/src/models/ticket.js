const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    code: 'CODIGO_UNICO', // Reemplaza con un código único
    amount: 100,
    purchaser: 'correo@ejemplo.com',
    products: ['ID_DEL_PRODUCTO_1', 'ID_DEL_PRODUCTO_2'] // Reemplaza con los IDs de los productos
  });

module.exports = mongoose.model('Ticket', ticketSchema);
newTicket.save()
  .then(ticket => console.log('Ticket guardado:', ticket))
  .catch(err => console.error('Error al guardar el ticket:', err));