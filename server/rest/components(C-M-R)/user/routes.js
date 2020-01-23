const express = require('express');
const { checkToken } = require('../../middleware/jwt');

const router = express.Router();
const {
  getUserById,
  getUserByUsername,
  getUsers,
  usernameExists,
  emailExists,
  createUser,
  updateUser,
  deleteUser,
  getMyUserInfo,
  search,
} = require('./controller');

// list of all users - user
router.get('/', checkToken, getUsers);
// search for a user
router.post('/search', checkToken, search);
// username already exists ? - user
router.get('/verification/username', usernameExists);
// email already exists ? - user
router.get('/verification/email', emailExists);
// get profile of visited User
router.get('/profile/:username', checkToken, getUserByUsername);
// get my profile info
router.get('/profile', checkToken, getMyUserInfo);
// get user by id - user
router.get('/:id', checkToken, getUserById);
// create user - user
router.post('/', createUser);
// update user - user
router.put('/', checkToken, updateUser);
// delete user - user
router.delete('/', checkToken, deleteUser);

module.exports = router;
