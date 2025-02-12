const userRepository = require('../repositories/userRepository');

const getUserById = async (id) => {
  return userRepository.getUserById(id);
};