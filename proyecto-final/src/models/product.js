const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nombre del producto (obligatorio)
  description: { type: String }, // Descripción del producto
  price: { type: Number, required: true }, // Precio del producto (obligatorio)
  stock: { type: Number, required: true }, // Cantidad en stock (obligatorio)
  category: { type: String }, // Categoría del producto
  // Otros campos que puedas necesitar
});

module.exports = mongoose.model('Product', productSchema);

newProduct.save()
  .then(product => console.log('Producto guardado:', product))
  .catch(err => console.error('Error al guardar el producto:', err));