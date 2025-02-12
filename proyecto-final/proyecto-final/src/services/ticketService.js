const Ticket = require('../models/ticket');
const generateUniqueCode = require('../utils/codeGenerator'); // Función para generar códigos únicos

const createTicket = async (amount, purchaser, products) => {
  try {
    const ticket = new Ticket({
      code: generateUniqueCode(),
      amount,
      purchaser,
      products
    });
    const savedTicket = await ticket.save();
    return savedTicket;
  } catch (error) {
    throw new Error('Error al crear el ticket: ' + error.message);
  }
};

const getTicketById = async (id) => {
  try {
    const ticket = await Ticket.findById(id).populate('products');
    return ticket;
  } catch (error) {
    throw new Error('Error al obtener el ticket: ' + error.message);
  }
};

const getAllTickets = async () => {
  try {
    const tickets = await Ticket.find().populate('products');
    return tickets;
  } catch (error) {
    throw new Error('Error al obtener los tickets: ' + error.message);
  }
};

const deleteTicket = async (id) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    return deletedTicket;
  } catch (error) {
    throw new Error('Error al eliminar el ticket: ' + error.message);
  }
};

module.exports = {
  createTicket,
  getTicketById,
  getAllTickets,
  deleteTicket
};