const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticación

const { validateCart } = require('../utils/validation');

router.post('/', (req, res) => {
  const { error } = validateCart(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
});
// Obtener todos los carritos (solo para administradores)
router.get('/', authMiddleware.checkRole('admin'), async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un carrito por ID
router.get('/:id', authMiddleware.checkRole('user'), async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo carrito
router.post('/', authMiddleware.checkRole('user'), async (req, res) => {
  const newCart = new Cart({
    user: req.user._id // Asocia el carrito al usuario autenticado
  });
  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un carrito
router.put('/:id', authMiddleware.checkRole('user'), async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un carrito
router.delete('/:id', authMiddleware.checkRole('admin'), async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Agregar un producto al carrito
router.post('/:id/products', authMiddleware.checkRole('user'), async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.products.push(req.body); // req.body debe contener productId y quantity
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un producto del carrito
router.delete('/:id/products/:productId', authMiddleware.checkRole('user'), async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.products = cart.products.filter(product => product.productId.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;