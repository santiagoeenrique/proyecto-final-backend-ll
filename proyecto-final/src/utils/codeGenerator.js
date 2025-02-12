const { v4: uuidv4 } = require('uuid');

const generateUniqueCode = () => {
  return uuidv4();
};

module.exports = generateUniqueCode;