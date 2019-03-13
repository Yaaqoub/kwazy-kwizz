var express = require('express') ; 
var router = new express.Router();
var quizzController = require('../controllers/quizz.controller');

const validateToken = require('../middleware/validateToken');

// add a quizz
router.post('/quizz/add', validateToken.validateUser, quizzController.addQuizz);

// list quizzes
router.get('/quizz/list', validateToken.validateUser, quizzController.listQuizzes);

// remove quizzes
router.post('/quizz/remove', validateToken.validateUser, quizzController.removeQuizz);

// get quizz
router.get('/quizz/get/:quizz_id', validateToken.validateUser, quizzController.getQuizz);


// Edit quizz
router.post('/quizz/edit/:quizz_id', validateToken.validateUser, quizzController.editQuizz);

// answer quizz
router.post('/quizz/answer', validateToken.validateUser, quizzController.answerQuizz);


module.exports = app => {
    app.use('/',router) ;
};