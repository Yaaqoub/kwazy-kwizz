var express = require('express'); 
var mongoose = require('mongoose');

exports.addQuizz = function(req, res){
    let multiple = req.body.multiple;
    let question = req.body.question;
    let answers = req.body.answers;

    console.log('requested') ;
    if (!multiple || !question || !answers){
        return res.status(500).send('Missing parameters');
    }

    let quizz = Quizz({
        'multipe' : multiple,
        'question' : question,
        'answers' : answers
    });

    if (quizz.isValid()){
        quizz.save();
        return res.status(200).send('Added with success');
    } else {
        return res.status(500).send('The question is unvalid');
    }
};



exports.answerQuizz = function(req, res){
    let question_id = req.body.question_id ; 
    let answer = req.body.answer

    if (!question_id || !answer){
        return res.status(500).send('Missing parameters');
    }
    if (answer.isCorrect){
        res.status(200).send({message: 'You are a fucking genius'});
    } else{
        res.status(200).send({message: 'Kill yourself'});
    }
    

}


exports.editQuizz = function(req,res){
    let multiple = req.body.multiple;
    let question = req.body.question;
    let answers = req.body.answers;

    if (req.params.quizz_id && (multiple || question || answers)){

        Quizz.findOne({ '_id' : req.params.quizz_id}, function(err, quizz){
            if (err){
                return res.status(500).send(err);
            }

            if (multiple) {
                quizz.multiple = multiple;
            }

            if (question) {
                quizz.question = question;
            }

            if (answers) {
                quizz.answers = answers;
            }

            quizz.save((err, updatedQuizz) => {
                if (err) return res.status(500).send(err);
                return res.send(updatedQuizz);
            });
        })
    } else {
        return res.status(500).send({success: false, message: 'Oops! Something went wrong.'});
    }
};


exports.removeQuizz = function(req,res){
    let quizz_id = req.body.quizz_id ; 
    if (!quizz_id){
        return res.status(500).send('Missing parameters');
    }

    Quizz.findOne({ '_id' : quizz_id}, function(err, quizz){
        if (err){
            return res.status(500).send(err);
        }

        quizz.remove((err) => {
            return res.send('removed ' + quizz_id );
        })
    })
};

exports.getQuizz = function(req,res){
    let quizz_id = req.params.quizz_id ; 
    if (!quizz_id){
        return res.status(500).send('Missing parameters');
    }

    Quizz.findOne({ '_id' : quizz_id}, function(err, quizz){
        if (err){
            return res.status(500).send(err);
        }
        return res.send(quizz);
    })
};

exports.listQuizzes = function(req, res){
    Quizz.find({}, function(err,quizzes){
        if (err){
            return res.status(500).send(err);
        }
        console.log(quizzes)
        return res.status(200).send(quizzes);
    })
};
