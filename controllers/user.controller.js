var express = require('express'); 
var mongoose = require('mongoose');

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.addUser = function(req, res){
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    if (!username && !email) {
        return res.status(500).send('Please enter an email and username to register.');
    } else if (!password) {
        return res.status(500).send('Please enter a password to register.');
    } else {
        let userData = {
            username:  username,
            email: email,
            password: password,
            score: 0
        };

        User.findOne({'email' : email}, function(err, result){
            if (err) {
                return res.status(500).json({
                    status: 'failed',
                    message: err
                });
            }

            if (result) {
                return res.send('An account with this email address already exist');
            } else {

                User.create(userData, function (err, result) {
                    if (err) {
                        return res.status(500).send({
                            status: 'failed',
                            message: err
                        });
                    } else {
                        return res.json({status: "success", message: "User added successfully!!!", data: null});
                    }
                });
            }
        });
    }
};

exports.authenticate = function(req, res){
    User.findOne({email:req.body.email}, function(err, userInfo){
        if (err) {
            return res.status(500).json({
                status: 'failed',
                message: err
            });
        } else {
            if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                res.json({status: "success", message: "user found!!!", data: {user: userInfo, token: token}});
            } else {
                res.json({status: "error", message: "Invalid email/password!!!", data: null});
            }
        }
    });
};

exports.listUsers = function(req, res) {
    users = User.find({}, function(err, users) {
        if (err) {
            return res.status(500).send('Something went wrong');
        }

        if (users) {
            return res.status(200).send(users)
        }
    });
};