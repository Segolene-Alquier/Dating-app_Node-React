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
  getMyUserInfo,
} = require('./controller');

// list of all users - user
router.get('/', checkToken, getUsers);
// username already exists ? - user
router.get('/verification/username', usernameExists);
// email already exists ? - user
router.get('/verification/email', emailExists);
// get my profile info
router.get('/profile', checkToken, getMyUserInfo);
// get user by id - user
router.get('/:id', checkToken, getUserById);
// create user - user
router.post('/', createUser);
// update user - user
router.put('/', checkToken, updateUser);
// delete user - user
router.delete('/:id', deleteUser);

module.exports = router;
