const express = require('express');
const server = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const secretKey = require('./configs').secretKey;

server.get('', function (req, res) {
    res.render('index');
});

module.exports = server;