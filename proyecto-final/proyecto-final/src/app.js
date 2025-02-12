const connectDB = require('./config/db');
const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('./src/middlewares/authMiddleware');
const productRoutes = require('./src/routes/products');
const cartRoutes = require('./src/routes/carts');
const ticketRoutes = require('./src/routes/tickets');
const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a la base de datos')).catch(err => console.error('Error al conectar a la base de datos:', err));

// Middleware
app.use(express.json()); // Habilita el análisis de JSON en las solicitudes
app.use(authMiddleware.authenticate); // Middleware de autenticación (si lo tienes)

// Rutas
app.use('/api/products', productRoutes); // Rutas de productos
app.use('/api/carts', cartRoutes); // Rutas de carritos
app.use('/api/tickets', ticketRoutes); // Rutas de tickets
app.use('/auth', authRoutes);
connectDB();

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));