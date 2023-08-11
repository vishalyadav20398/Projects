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
            const decode = JSON.parse(atob(token.split('.')[1]));
            if (decode.exp * 1000 < new Date().getTime()) {
                console.log('token expired');
                res.clearCookie('auth_token');
                res.redirect(configs.hostUrl + 'user/login');
            } else {
                var decodedToken =  jwt.verify(token, configs.secretKey);
                if (decodedToken) {
                    req.user = decodedToken.user;
                    res.locals.user = decodedToken.user;
                    return next();
                } else {
                    res.redirect(configs.hostUrl + 'user/login');
                }
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