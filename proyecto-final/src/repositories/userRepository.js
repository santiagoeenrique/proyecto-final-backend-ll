class UserRepository {
    async getAllUsers() {
      throw new Error('getAllUsers() debe ser implementado');
    }
  
    async getUserById(id) {
      throw new Error('getUserById() debe ser implementado');
    }
  
    async createUser(user) {
      throw new Error('createUser() debe ser implementado');
    }
  
    // Otros métodos según necesites
  }
  
  module.exports = UserRepository;
  const UserRepository = require('./userRepository');
const User = require('../models/User'); // Importa tu modelo de usuario

class UserRepositoryImpl extends UserRepository {
  async getAllUsers() {
    return User.find();
  }

  async getUserById(id) {
    return User.findById(id);
  }

  async createUser(user) {
    const newUser = new User(user);
    return newUser.save();
  }

  // Implementa los demás métodos
}

module.exports = new UserRepositoryImpl(); // Exporta una instancia del repositorio
//Usar el repositorio en la lógica de negocio
//En tus servicios o casos de uso, inyecta una instancia del repositorio en lugar del DAO.

//JavaScript

// src/services/userService.js
