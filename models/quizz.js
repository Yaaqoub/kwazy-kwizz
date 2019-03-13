var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizzSchema = new Schema({
    mutltiple:  Boolean, // multiple answers or single answer
    question: 'string', // question to ask
    answers: [{ answer: 'string', isCorrect: 'boolean' }]
}); 

quizzSchema.methods.hasCorrectAnswer = function(){
    let hasCorrectAnswer = false; 
    for (let answer of this.answers){
        if (answer.isCorrect){
            hasCorrectAnswer = true; 
            return hasCorrectAnswer; 
        }
    }
    return hasCorrectAnswer ;
}


quizzSchema.methods.populate = function(object){
    this.mutltiple = object.mutltiple;
    this.question = object.question;
    this.object = object.answers;
    return this;
}

quizzSchema.methods.isValid = function(){
    let isValid = true ;

    if (this.answers < 2){
        isValid = false ;
        return isValid; 
    }
    let hasFalseAnswer = false; 
    let hasTrueAnswer = false;     
    for (let answer of this.answers){

        if (answer.isCorrect === true){
            hasTrueAnswer = true; 
        }

        if (answer.isCorrect === false){
            hasFalseAnswer = true;
        }
    }

    if (hasTrueAnswer && hasFalseAnswer){
        return isValid; 
    } else {
        isValid = false ;
        return isValid;
    }
}

module.exports =  mongoose.model('Quizz',quizzSchema);