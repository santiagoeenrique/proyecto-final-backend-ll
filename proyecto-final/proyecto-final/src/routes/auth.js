const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const UserDto = require('../dtos/userDto');


router.get('/current', authMiddleware.authenticate, (req, res) => {
  const userDto = new UserDto(req.user);
  res.json(userDto);
});

module.exports = router;