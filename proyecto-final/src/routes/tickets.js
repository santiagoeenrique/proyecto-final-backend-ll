const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticación
const ticketService = require('../services/ticketService');

// Ejemplo de uso en una ruta
router.post('/', async (req, res) => {
  try {
    const newTicket = await ticketService.createTicket(req.body.amount, req.body.purchaser, req.body.products);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Obtener todos los tickets (solo para administradores)
router.get('/', authMiddleware.checkRole('admin'), async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('products'); // Incluir los detalles de los productos
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un ticket por ID (solo para administradores)
router.get('/:id', authMiddleware.checkRole('admin'), async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('products'); // Incluir los detalles de los productos
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eliminar un ticket (solo para administradores)
router.delete('/:id', authMiddleware.checkRole('admin'), async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;