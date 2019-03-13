var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

var userSchema = new Schema({
    username:  {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    score: Number,
    quizzesTaken : [{ quizz_id : Number}]
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports =  mongoose.model('User',userSchema);