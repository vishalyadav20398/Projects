const express = require('express');
const server = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const secretKey = "Vishal_Yadav";

exports.auth = async function (req, res, next) {
    try {
        var token = req.cookies['auth_token'];
        if (token) {
            var user =  userjwt.verify(token, secretKey);
            if (user) {
                req.user = user;
                res.locals.user = user;
                return next();
            } else {
                res.redirect('/user/login');
            }
        } else {
            throw "token is missing";
        }
    } catch (e) {
        console.log(e);
        res.redirect('/user/login');
    }
}