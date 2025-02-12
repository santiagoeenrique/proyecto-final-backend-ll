const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario asociado al carrito (obligatorio)
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // ID del producto
    quantity: { type: Number, required: true } // Cantidad del producto en el carrito
  }]
});

module.exports = mongoose.model('Cart', cartSchema);

newCart.save()
  .then(cart => console.log('Carrito guardado:', cart))
  .catch(err => console.error('Error al guardar el carrito:', err));