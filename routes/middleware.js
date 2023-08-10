const express = require('express');
const server = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const configs = require('./configs');

exports.auth = async function (req, res, next) {
    try {
        var token = req.cookies['auth_token'];
        if (token) {
            var user =  jwt.verify(token, configs.secretKey);
            if (user) {
                req.user = user;
                res.locals.user = user;
                return next();
            } else {
                res.redirect(configs.hostUrl + 'user/login');
            }
        } else {
            throw "token is missing";
        }
    } catch (e) {
        console.log(e);
        res.redirect('/user/login');
    }
    return next();
}

exports.common = function (req, res, next) {
    res.locals.hostUrl = configs.hostUrl;
    next();
}