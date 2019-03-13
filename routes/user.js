var express = require('express') ;
var router = new express.Router();
var userController = require('../controllers/user.controller');

const validateToken = require('../middleware/validateToken');

// add a user
router.post('/user/add', userController.addUser);

// Sign in
router.post('/user/login', userController.authenticate);

// list users
router.get('/user/list', validateToken.validateUser, userController.listUsers);

module.exports = app => {
    app.use('/',router) ;
};