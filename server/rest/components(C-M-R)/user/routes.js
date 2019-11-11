const express = require('express');
const { checkToken } = require('../../middleware/jwt');

const router = express.Router();
const {
  getUserById,
  getUsers,
  usernameExists,
  emailExists,
  createUser,
  updateUser,
  deleteUser,
} = require('./controller');

// list of all users - user
router.get('/', checkToken, getUsers);
// username already exists ? - user
router.get('/verification/username', usernameExists);
// email already exists ? - user
router.get('/verification/email', emailExists);
// get user by id - user
router.get('/:id', getUserById);
// create user - user
router.post('/', createUser);
// update user - user
router.put('/:id', updateUser);
// delete user - user
router.delete('/:id', deleteUser);

module.exports = router;
