const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

//route to get all users
router.get('/', userController.getUsersList);

//route to get user by id
router.get('/:id', userController.getUserByID);

//route to create a new user
router.post('/', userController.createNewUser);

//route to update a user
router.put('/:id', userController.updateUser);

//delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;